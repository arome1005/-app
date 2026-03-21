/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Mic, 
  Send, 
  Volume2, 
  VolumeX, 
  Languages, 
  Sparkles, 
  User as UserIcon, 
  Bot,
  RefreshCw,
  Trash2,
  MessageSquare,
  Zap,
  PlayCircle,
  Play,
  Pause,
  RotateCcw,
  BookMarked,
  Star,
  ChevronRight,
  X as CloseIcon,
  Headphones,
  BookOpen,
  PenTool,
  BrainCircuit,
  LogOut,
  LogIn,
  Menu,
  History,
  Image as ImageIcon,
  FileUp,
  FileText,
  Paperclip,
  Settings,
  LayoutDashboard,
  Calendar,
  CheckCircle2,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { chatWithGemini, Message as GeminiMessage, SYSTEM_INSTRUCTION, assessPronunciation, LLMConfig, ai } from './services/gemini';
import LiveVoice from './components/LiveVoice';
import VocabularyMemorization from './components/VocabularyMemorization';
import { NCE1_LESSONS, Lesson } from './data/lessons';
import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  doc,
  deleteDoc,
  updateDoc,
  limit,
  User,
  firebaseConfig
} from './firebase';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ModuleType = 'chat' | 'listen' | 'speak' | 'read' | 'write' | 'memorize' | 'dashboard';

interface FirestoreMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string; // base64
  file?: {
    name: string;
    type: string;
    data: string; // base64
  };
  timestamp: number;
  uid: string;
  module: ModuleType;
}

interface SavedWord {
  id: string;
  word: string;
  timestamp: number;
  uid: string;
}

const AlpacaIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 21c-3.5 0-6-2.5-6-6 0-1.5.5-3 1.5-4.5.5-.7 1-1.5 1-2.5 0-2 1.5-3.5 3.5-3.5s3.5 1.5 3.5 3.5c0 1 .5 1.8 1 2.5 1 1.5 1.5 3 1.5 4.5 0 3.5-2.5 6-6 6z" />
    <path d="M9 14c.5.5 1 1 2 1s1.5-.5 2-1" />
    <path d="M8 9c-.5-1-1-2.5-1-4a1 1 0 0 1 2 0c0 1 .5 2 1 3" />
    <path d="M16 9c.5-1 1-2.5 1-4a1 1 0 0 0-2 0c0 1-.5 2-1 3" />
    <circle cx="10" cy="11" r="0.5" fill="currentColor" />
    <circle cx="14" cy="11" r="0.5" fill="currentColor" />
  </svg>
);

const SCENARIOS = [
  { id: 'airport', title: 'Airport Check-in', role: 'Ground Staff', task: 'Check in for your flight to London.', icon: '✈️' },
  { id: 'restaurant', title: 'Ordering Food', role: 'Waiter', task: 'Order a three-course meal.', icon: '🍴' },
  { id: 'hotel', title: 'Hotel Reception', role: 'Receptionist', task: 'Book a room for two nights.', icon: '🏨' },
  { id: 'interview', title: 'Job Interview', role: 'Interviewer', task: 'Apply for a position as a teacher.', icon: '💼' },
  { id: 'shopping', title: 'At the Mall', role: 'Shopkeeper', task: 'Buy a gift for a friend.', icon: '🛍️' },
];

const WORD_OF_THE_DAY_LIST = [
  { word: "Enthusiasm", phonetic: "/ɪnˈθjuːziæzəm/", meaning: "n. 热情，热忱", example: "Her enthusiasm for learning English is contagious." },
  { word: "Persistence", phonetic: "/pəˈsɪstəns/", meaning: "n. 坚持不懈，执着", example: "Success requires persistence and hard work." },
  { word: "Curiosity", phonetic: "/ˌkjʊəriˈɒsəti/", meaning: "n. 好奇心", example: "Children have a natural curiosity about the world." },
  { word: "Resilience", phonetic: "/rɪˈzɪliəns/", meaning: "n. 韧性，恢复力", example: "The community showed great resilience after the storm." },
  { word: "Ambition", phonetic: "/æmˈbɪʃn/", meaning: "n. 雄心，抱负", example: "His ambition is to become a world-class chef." },
  { word: "Gratitude", phonetic: "/ˈɡrætɪtjuːd/", meaning: "n. 感激，感谢", example: "She expressed her gratitude for all their help." },
  { word: "Innovation", phonetic: "/ˌɪnəˈveɪʃn/", meaning: "n. 创新，革新", example: "Innovation is key to staying competitive in the market." },
];

const PRACTICE_PHRASES = [
  "Excuse me, is this your handbag?",
  "Is this your umbrella?",
  "My coat and my umbrella please.",
  "Here is your ticket.",
  "Is this your watch?",
  "This is my car.",
  "Are you a teacher?",
  "No, I am not. I am a student.",
  "What is your job?",
  "I am a keyboard operator."
];

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeModule, setActiveModule] = useState<ModuleType>('chat');
  const [messages, setMessages] = useState<FirestoreMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [isTranslationMode, setIsTranslationMode] = useState(false);
  const [wordBank, setWordBank] = useState<SavedWord[]>([]);
  const [showWordBank, setShowWordBank] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | 'system';
      return saved || 'system';
    }
    return 'system';
  });

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const isDark = 
        theme === 'dark' || 
        (theme === 'system' && mediaQuery.matches);
      
      if (isDark) {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      }
    };

    applyTheme();
    localStorage.setItem('theme', theme);

    const listener = () => {
      if (theme === 'system') applyTheme();
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showLessonSelector, setShowLessonSelector] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<{ name: string, type: string, data: string } | null>(null);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [activityData, setActivityData] = useState<Record<string, number>>({});
  const [selectedWordInfo, setSelectedWordInfo] = useState<any>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showTranslationPopup, setShowTranslationPopup] = useState(false);
  const [reviewSeed, setReviewSeed] = useState(0);

  const wordOfTheDay = useMemo(() => {
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return WORD_OF_THE_DAY_LIST[dayOfYear % WORD_OF_THE_DAY_LIST.length];
  }, []);

  const smartReviewWords = useMemo(() => {
    if (wordBank.length <= 3) return wordBank;
    // Use reviewSeed to trigger re-randomization
    return [...wordBank].sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [wordBank, reviewSeed]);
  const [learningStats, setLearningStats] = useState<any[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const [speakTarget, setSpeakTarget] = useState(PRACTICE_PHRASES[0]);
  const [listenTarget, setListenTarget] = useState(PRACTICE_PHRASES[1]);
  const [listenInput, setListenInput] = useState("");
  const [listenResult, setListenResult] = useState<'correct' | 'incorrect' | null>(null);
  const [readLesson, setReadLesson] = useState(NCE1_LESSONS[0]);
  const [writePrompt, setWritePrompt] = useState("Write a short introduction about yourself.");
  const [writeInput, setWriteInput] = useState("");
  const [writeFeedback, setWriteFeedback] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>(() => localStorage.getItem('buddy_voice_uri') || '');
  const [isJarvisMode, setIsJarvisMode] = useState(() => localStorage.getItem('buddy_jarvis_mode') === 'true');
  const [useClonedVoice, setUseClonedVoice] = useState(() => localStorage.getItem('buddy_use_cloned_voice') === 'true');
  
  // Synchronize module-specific states with selectedLesson
  useEffect(() => {
    if (selectedLesson) {
      setReadLesson(selectedLesson);
      
      // For listening and speaking, pick the first sentence or a representative part
      const sentences = selectedLesson.text.split(/[.!?]/).filter(s => s.trim().length > 0);
      const firstSentence = (sentences[0]?.trim() || selectedLesson.text) + '.';
      setListenTarget(firstSentence);
      setSpeakTarget(firstSentence);
      
      // For writing, create a prompt based on the lesson
      setWritePrompt(`Write a short summary or your thoughts about Lesson ${selectedLesson.id}: ${selectedLesson.title}. Try to use some vocabulary from this lesson.`);
      
      // Reset inputs and results
      setListenInput("");
      setListenResult(null);
      setWriteInput("");
      setWriteFeedback("");
    }
  }, [selectedLesson]);

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const lessonAudioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!readLesson.audioUrl) return;
    
    if (!lessonAudioRef.current) {
      lessonAudioRef.current = new Audio(readLesson.audioUrl);
      lessonAudioRef.current.onended = () => setIsAudioPlaying(false);
    } else if (lessonAudioRef.current.src !== readLesson.audioUrl) {
      lessonAudioRef.current.pause();
      lessonAudioRef.current = new Audio(readLesson.audioUrl);
      lessonAudioRef.current.onended = () => setIsAudioPlaying(false);
    }

    if (isAudioPlaying) {
      lessonAudioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      lessonAudioRef.current.play();
      setIsAudioPlaying(true);
    }
  };

  const [showSettings, setShowSettings] = useState(false);
  const [configView, setConfigView] = useState<'gemini' | 'ollama' | 'learning'>('gemini');
  const [llmConfig, setLlmConfig] = useState<LLMConfig>(() => {
    const saved = localStorage.getItem('buddy_llm_config');
    const defaultConfig: LLMConfig = {
      provider: 'gemini',
      ollamaUrl: 'http://localhost:11434',
      ollamaModel: 'llama3',
      correctionIntensity: 'standard'
    };
    if (!saved) return defaultConfig;
    const parsed = JSON.parse(saved);
    return { ...defaultConfig, ...parsed };
  });

  // Auto-check Ollama on startup if active
  useEffect(() => {
    if (llmConfig.provider === 'ollama') {
      fetchOllamaModels();
    }
  }, []);

  useEffect(() => {
    if (showSettings) {
      setConfigView(llmConfig.provider);
    }
  }, [showSettings, llmConfig.provider]);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('buddy_voice_uri', selectedVoiceURI);
    localStorage.setItem('buddy_jarvis_mode', String(isJarvisMode));
    localStorage.setItem('buddy_use_cloned_voice', String(useClonedVoice));
    localStorage.setItem('buddy_llm_config', JSON.stringify(llmConfig));
  }, [selectedVoiceURI, isJarvisMode, useClonedVoice, llmConfig]);
  
  const [assessments, setAssessments] = useState<Record<string, any>>({});
  const [clonedAudios, setClonedAudios] = useState<Record<string, string>>({});
  const [isAssessing, setIsAssessing] = useState(false);
  const [recordingFor, setRecordingFor] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const [ollamaModels, setOllamaModels] = useState<string[]>([]);
  const [ollamaStatus, setOllamaStatus] = useState<{
    status: 'idle' | 'checking' | 'ok' | 'error';
    message?: string;
  }>({ status: 'idle' });

  const fetchOllamaModels = async () => {
    setOllamaStatus({ status: 'checking' });
    try {
      const url = llmConfig.ollamaUrl.replace(/\/$/, '');
      const response = await fetch(`${url}/api/tags`);
      if (!response.ok) throw new Error('Ollama service unreachable');
      
      const data = await response.json();
      const models = (data.models || []).map((m: any) => m.name);
      setOllamaModels(models);
      
      if (models.length > 0) {
        setOllamaStatus({ status: 'ok', message: `Found ${models.length} models. Please select one.` });
        // Auto-select first if current not in list
        if (!models.includes(llmConfig.ollamaModel)) {
          setLlmConfig(prev => ({ ...prev, ollamaModel: models[0] }));
        }
      } else {
        setOllamaStatus({ status: 'error', message: 'No models found in Ollama.' });
      }
    } catch (err) {
      setOllamaStatus({ 
        status: 'error', 
        message: 'Connection failed. Ensure Ollama is running and OLLAMA_ORIGINS="*" is set.' 
      });
    }
  };

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load voices for native TTS
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
      if (voices.length > 0 && !selectedVoiceURI) {
        // Default to a natural sounding English voice if possible
        const defaultVoice = voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) || 
                           voices.find(v => v.lang.startsWith('en')) || 
                           voices[0];
        setSelectedVoiceURI(defaultVoice.voiceURI);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [selectedVoiceURI]);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Messages Listener
  useEffect(() => {
    if (!user) {
      setMessages([]);
      return;
    }

    const q = query(
      collection(db, 'messages'),
      where('uid', '==', user.uid),
      where('module', '==', activeModule),
      orderBy('timestamp', 'asc'),
      limit(100) // Load last 100 for performance, can be expanded
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FirestoreMessage[];
      setMessages(msgs);
    }, (error) => {
      console.error("Firestore messages error:", error);
    });

    return () => unsubscribe();
  }, [user, activeModule]);

  // Activity Listener for Heatmap
  useEffect(() => {
    if (!user) {
      setActivityData({});
      return;
    }

    const q = query(
      collection(db, 'messages'),
      where('uid', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const counts: Record<string, number> = {};
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.timestamp) {
          const date = new Date(data.timestamp).toISOString().split('T')[0];
          counts[date] = (counts[date] || 0) + 1;
        }
      });
      setActivityData(counts);
    }, (error) => {
      console.error("Activity listener error:", error);
    });

    return () => unsubscribe();
  }, [user]);

  // Check-in and Streak Listener
  useEffect(() => {
    if (!user) {
      setHasCheckedInToday(false);
      setStreak(0);
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const q = query(
      collection(db, 'checkIns'),
      where('uid', '==', user.uid),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dates = snapshot.docs.map(doc => doc.data().date);
      setHasCheckedInToday(dates.includes(today));

      let currentStreak = 0;
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      if (dates.includes(today) || dates.includes(yesterday)) {
        let checkDate = dates.includes(today) ? new Date() : new Date(Date.now() - 86400000);
        while (true) {
          const dateStr = checkDate.toISOString().split('T')[0];
          if (dates.includes(dateStr)) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break;
          }
        }
      }
      setStreak(currentStreak);
    }, (error) => {
      console.error("Check-in listener error:", error);
    });

    return () => unsubscribe();
  }, [user]);

  // Word Bank Listener
  useEffect(() => {
    if (!user) {
      setWordBank([]);
      return;
    }

    const q = query(
      collection(db, 'wordBank'),
      where('uid', '==', user.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const words = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SavedWord[];
      setWordBank(words);
      
      // Calculate progress based on unique words learned vs NCE1 total (approx 1000)
      const uniqueWords = new Set(words.map(w => w.word.toLowerCase())).size;
      setOverallProgress(Math.min(100, Math.round((uniqueWords / 1000) * 100)));
    }, (error) => {
      console.error("Firestore wordBank error:", error);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLiveTranscript = (text: string, role: 'user' | 'model') => {
    saveMessageToFirestore(role, text);
  };

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      if (error.code === 'auth/cancelled-popup-request') {
        console.log("Login popup was closed or another request was made.");
      } else {
        console.error("Login error:", error);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const playMyRecording = (target: string) => {
    const audioUrl = clonedAudios[target];
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const startRecording = async (target: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        
        if (audioBlob.size < 1000) {
          setAssessments(prev => ({ 
            ...prev, 
            [target]: { 
              score: 0, 
              accuracyScore: 0, 
              fluencyScore: 0, 
              prosodyScore: 0, 
              feedback: "Recording too short or silent. Please try again." 
            } 
          }));
          return;
        }

        const audioUrl = URL.createObjectURL(audioBlob);
        setClonedAudios(prev => ({ ...prev, [target]: audioUrl }));

        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          setIsAssessing(true);
          const result = await assessPronunciation(target, base64Audio, 'audio/webm', llmConfig);
          setAssessments(prev => ({ ...prev, [target]: result }));
          setIsAssessing(false);
        };
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      setRecordingFor(target);
      setRecordingTime(0);
      timerInterval.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      setRecordingFor(null);
      if (timerInterval.current) clearInterval(timerInterval.current);
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const saveMessageToFirestore = async (role: 'user' | 'model', text: string, image?: string, file?: { name: string, type: string, data: string }) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'messages'), {
        role,
        text,
        image: image || null,
        file: file || null,
        timestamp: Date.now(),
        uid: user.uid,
        module: activeModule
      });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size should be less than 10MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        if (file.type.startsWith('image/')) {
          setSelectedImage(base64Data);
          setSelectedFile(null);
        } else {
          setSelectedFile({
            name: file.name,
            type: file.type || 'application/octet-stream',
            data: base64Data
          });
          setSelectedImage(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSelectedImage(reader.result as string);
            setSelectedFile(null);
          };
          reader.readAsDataURL(blob);
        }
      } else if (items[i].type === 'text/plain') {
        // Standard text paste is handled by default, but we can log it or handle it if needed
      }
    }
  };

  const handleWordClick = async (word: string) => {
    const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (!cleanWord || cleanWord.length <= 1) return;
    
    setSelectedWordInfo({ word: cleanWord });
    setShowTranslationPopup(true);
    setIsTranslating(true);
    
    try {
      const prompt = `Translate the English word "${cleanWord}" to Chinese. Provide phonetic, meaning, and one example sentence. Return as JSON: { "word": "${cleanWord}", "phonetic": "...", "meaning": "...", "example": "..." }`;
      
      let text = "";
      if (llmConfig.provider === 'ollama') {
        const response = await chatWithGemini([{ role: 'user', parts: [{ text: prompt }] }], llmConfig, "You are a helpful dictionary. Return JSON only.");
        text = response.text;
      } else {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt,
          config: { responseMimeType: "application/json" }
        });
        text = response.text;
      }
      
      const data = JSON.parse(text);
      setSelectedWordInfo(data);
    } catch (err) {
      console.error("Translation error:", err);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if ((!textToSend.trim() && !selectedImage && !selectedFile) || isLoading || !user) return;

    const currentImage = selectedImage;
    const currentFile = selectedFile;
    setInput('');
    setSelectedImage(null);
    setSelectedFile(null);
    setIsLoading(true);

    try {
      // Save user message
      await saveMessageToFirestore('user', textToSend, currentImage || undefined, currentFile || undefined);

      const history = messages.map(m => {
        const parts: any[] = [{ text: m.text }];
        if (m.image) {
          const [mimeType, data] = m.image.split(';base64,');
          parts.push({
            inlineData: {
              mimeType: mimeType.replace('data:', ''),
              data: data
            }
          });
        }
        if (m.file) {
          const [mimeType, data] = m.file.data.split(';base64,');
          parts.push({
            inlineData: {
              mimeType: mimeType.replace('data:', ''),
              data: data
            }
          });
        }
        return {
          role: m.role,
          parts: parts
        };
      });

      const userParts: any[] = [{ text: textToSend }];
      if (currentImage) {
        const [mimeType, data] = currentImage.split(';base64,');
        userParts.push({
          inlineData: {
            mimeType: mimeType.replace('data:', ''),
            data: data
          }
        });
      }
      if (currentFile) {
        const [mimeType, data] = currentFile.data.split(';base64,');
        userParts.push({
          inlineData: {
            mimeType: mimeType.replace('data:', ''),
            data: data
          }
        });
      }
      history.push({ role: 'user', parts: userParts });

      let moduleInstruction = SYSTEM_INSTRUCTION;

      if (selectedLesson) {
        moduleInstruction += `\n\nCURRENT LESSON: Lesson ${selectedLesson.id} - ${selectedLesson.title}\nLESSON TEXT: ${selectedLesson.text}\nLESSON VOCABULARY: ${selectedLesson.vocabulary.map(v => `${v.word} (${v.phonetic}): ${v.meaning}`).join(', ')}`;
      }

      if (activeModule === 'listen') {
        moduleInstruction += "\n\nMODULE: LISTENING. Read a short NCE 1 sentence and ask the user to type what they heard.";
      } else if (activeModule === 'read') {
        moduleInstruction += "\n\nMODULE: READING. Provide a short NCE 1 passage and ask comprehension questions.";
      } else if (activeModule === 'write') {
        moduleInstruction += "\n\nMODULE: WRITING. Give the user a simple topic (e.g., 'My Family') and ask them to write 3-5 sentences.";
      }

      if (isTranslationMode) {
        moduleInstruction += "\n\nSTATUS: Translation Mode is ACTIVE.";
      }

      if (currentImage || currentFile) {
        moduleInstruction += `\n\nMULTIMODAL CONTEXT: The user has uploaded an ${currentImage ? 'image' : 'file'}. Please acknowledge it and use it to assist with the current ${activeModule} task.`;
      }

      moduleInstruction += `\n\nCORRECTION INTENSITY: ${llmConfig.correctionIntensity}`;
      if (activeScenario) {
        const scenario = SCENARIOS.find(s => s.id === activeScenario);
        if (scenario) {
          moduleInstruction += `\n\nCURRENT SCENARIO: ${scenario.title}\nYour Role: ${scenario.role}\nUser's Task: ${scenario.task}\nStay in character and help the user complete the task.`;
        }
      }

      const response = await chatWithGemini(history, llmConfig, moduleInstruction);
      const modelText = response.text || "I'm sorry, I couldn't process that.";
      
      // Save model response
      await saveMessageToFirestore('model', modelText);

      if (autoSpeak) {
        playSpeech(modelText);
      }
    } catch (error: any) {
      console.error("Chat error:", error);
      const errorMessage = error.message || "An unexpected error occurred.";
      await saveMessageToFirestore('model', `⚠️ Error: ${errorMessage}\n\nPlease check your settings and connection.`);
    } finally {
      setIsLoading(false);
    }
  };

  const saveWord = async (word: string) => {
    if (!user || !word || wordBank.find(w => w.word.toLowerCase() === word.toLowerCase())) return;
    try {
      await addDoc(collection(db, 'wordBank'), {
        word,
        timestamp: Date.now(),
        uid: user.uid
      });
    } catch (error) {
      console.error("Error saving word:", error);
    }
  };

  const removeWord = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'wordBank', id));
    } catch (error) {
      console.error("Error removing word:", error);
    }
  };

  const playSpeech = async (text: string) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (useClonedVoice && clonedAudios[text]) {
      const audio = new Audio(clonedAudios[text]);
      audio.play();
      return;
    }

    setIsSpeaking(true);
    try {
      // Native Web Speech API for zero latency
      const utterance = new SpeechSynthesisUtterance(text);
      
      if (isJarvisMode) {
        // JARVIS settings: British male voice, lower pitch, steady rate
        const jarvisVoice = availableVoices.find(v => v.lang === 'en-GB' && (v.name.includes('Male') || v.name.includes('George') || v.name.includes('Daniel'))) ||
                           availableVoices.find(v => v.lang.startsWith('en-GB')) ||
                           availableVoices.find(v => v.lang.startsWith('en'));
        if (jarvisVoice) utterance.voice = jarvisVoice;
        utterance.pitch = 0.85;
        utterance.rate = 0.95;
      } else {
        const voice = availableVoices.find(v => v.voiceURI === selectedVoiceURI);
        if (voice) {
          utterance.voice = voice;
        }
      }
      
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.onerror = (e) => {
        console.error("Speech error:", e);
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Speech error:", error);
      setIsSpeaking(false);
    }
  };

  const clearChat = async () => {
    if (!user) return;
    // For safety, we only clear the current module's messages
    const q = query(
      collection(db, 'messages'),
      where('uid', '==', user.uid),
      where('module', '==', activeModule)
    );
    // Note: In a real app, you'd use a batch delete or cloud function for 10k+ messages
    // Here we just clear the view or delete a few for demo
    setMessages([]);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-indigo-600 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full text-center space-y-8"
        >
          <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto">
            <Sparkles size={48} />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-zinc-900">English Buddy</h1>
            <p className="text-zinc-500">Your modularized AI English tutor for New Concept English.</p>
          </div>
          <button 
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingIn ? (
              <RefreshCw className="animate-spin" size={24} />
            ) : (
              <LogIn size={24} />
            )}
            {isLoggingIn ? "Connecting..." : "Login with Google"}
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200/50"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-zinc-400 font-bold">Or</span>
            </div>
          </div>

          <button 
            onClick={() => {
              // Mock a local user for testing
              setUser({
                uid: 'local-user',
                displayName: 'Local Learner',
                email: 'local@example.com',
                photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=local'
              } as any);
            }}
            className="w-full py-3 bg-zinc-100 text-zinc-600 rounded-2xl font-bold text-sm hover:bg-zinc-200 transition-all border border-zinc-200"
          >
            Enter as Guest (Local Mode)
          </button>

          <p className="text-xs text-zinc-400">Securely store your learning progress and 10,000+ messages.</p>
        </motion.div>
      </div>
    );
  }

  const modules = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'bg-slate-800' },
    { id: 'chat', label: 'Daily Chat', icon: MessageSquare, color: 'bg-blue-500' },
    { id: 'listen', label: 'Listening', icon: Headphones, color: 'bg-purple-500' },
    { id: 'speak', label: 'Speaking', icon: Mic, color: 'bg-red-500' },
    { id: 'read', label: 'Reading', icon: BookOpen, color: 'bg-emerald-500' },
    { id: 'write', label: 'Writing', icon: PenTool, color: 'bg-amber-500' },
    { id: 'memorize', label: 'Memorize', icon: BrainCircuit, color: 'bg-indigo-500' },
  ];

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans overflow-hidden transition-colors duration-300">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-white/5 flex flex-col transition-all duration-300 shadow-xl"
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-xl tracking-tighter">
              <Sparkles size={24} />
              <span>Buddy</span>
            </div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-xl transition-colors text-zinc-500 dark:text-zinc-400"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveModule(m.id as ModuleType)}
              className={cn(
                "w-full flex items-center gap-4 p-3 rounded-2xl transition-all group",
                activeModule === m.id 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-indigo-900/20" 
                  : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm transition-colors",
                activeModule === m.id ? "bg-white/20" : "bg-zinc-100 dark:bg-white/5 group-hover:bg-white dark:group-hover:bg-white/10"
              )}>
                <m.icon size={20} />
              </div>
              {isSidebarOpen && <span className="font-bold text-sm tracking-tight">{m.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-100 dark:border-white/5">
          <button 
            onClick={handleLogout}
            className={cn(
              "w-full flex items-center gap-4 p-3 rounded-xl text-zinc-500 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-all font-bold text-sm",
              !isSidebarOpen && "justify-center"
            )}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-white/5 px-8 flex items-center justify-between shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg",
              modules.find(m => m.id === activeModule)?.color
            )}>
              {React.createElement(modules.find(m => m.id === activeModule)!.icon, { size: 24 })}
            </div>
            <div>
              <h2 className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">{modules.find(m => m.id === activeModule)?.label}</h2>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">NCE 1 Learning Module</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsTranslationMode(!isTranslationMode)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm border",
                isTranslationMode 
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-emerald-100 dark:shadow-emerald-900/20" 
                  : "bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border-transparent hover:bg-zinc-200 dark:hover:bg-white/10"
              )}
            >
              <Languages size={18} />
              {isTranslationMode ? "Translation ON" : "Normal Mode"}
            </button>

            <button 
              onClick={() => {
                if (theme === 'light') setTheme('dark');
                else if (theme === 'dark') setTheme('system');
                else setTheme('light');
              }}
              className="p-3 rounded-xl bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10 transition-all shadow-sm border border-transparent"
              title={`Theme: ${theme}`}
            >
              {theme === 'light' && <Sun size={20} />}
              {theme === 'dark' && <Moon size={20} />}
              {theme === 'system' && <Monitor size={20} />}
            </button>

            <button 
              onClick={() => setShowSettings(true)}
              className="p-3 rounded-xl bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10 transition-all shadow-sm border border-transparent"
              title="Settings"
            >
              <Settings size={20} />
            </button>

            <button 
              onClick={() => setShowWordBank(true)}
              className="p-3 rounded-xl bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10 transition-all shadow-sm border border-transparent relative"
            >
              <BookMarked size={20} />
              {wordBank.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white dark:border-zinc-950">
                  {wordBank.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsLiveMode(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 font-bold"
            >
              <Zap size={18} fill="currentColor" />
              Live Mode
            </button>

            <button 
              onClick={() => setShowLessonSelector(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-50 dark:hover:bg-white/5 shadow-sm font-bold transition-all"
            >
              <BookOpen size={18} />
              {selectedLesson ? `L${selectedLesson.id}` : "Select Lesson"}
            </button>
          </div>
        </header>

        <main 
          ref={activeModule !== 'memorize' && activeModule !== 'dashboard' ? scrollRef : null}
          className="flex-1 overflow-y-auto p-8 space-y-8 bg-zinc-50 dark:bg-zinc-950"
        >
          {activeModule === 'dashboard' ? (
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-100 dark:border-white/5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-zinc-400 text-xs uppercase tracking-wider">Overall Progress</h3>
                    <Sparkles size={16} className="text-indigo-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-black text-zinc-900 dark:text-white">{overallProgress}%</div>
                    <div className="w-full bg-zinc-100 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${overallProgress}%` }}
                        className="bg-indigo-600 h-full"
                      />
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Based on 1,000 core NCE 1 words</p>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-100 dark:border-white/5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-zinc-400 text-xs uppercase tracking-wider">Words Learned</h3>
                    <BookMarked size={16} className="text-emerald-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-black text-zinc-900 dark:text-white">{wordBank.length}</div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Unique words in your word bank</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-3xl border border-zinc-100 dark:border-white/5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-zinc-400 text-xs uppercase tracking-wider">Learning Streak</h3>
                    <Zap size={16} className="text-amber-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-black text-zinc-900 dark:text-white">{streak} <span className="text-lg font-bold text-zinc-400">Days</span></div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Keep it up! Consistency is key.</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#1A1A1A] p-6 rounded-3xl border border-zinc-100 dark:border-white/5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-zinc-400 text-xs uppercase tracking-wider">Current Level</h3>
                    <Star size={16} className="text-amber-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-black text-zinc-900 dark:text-white">
                      {overallProgress < 20 ? 'Beginner' : overallProgress < 50 ? 'Elementary' : 'Intermediate'}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">NCE 1 Proficiency Level</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-white/5 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-lg">Learning Heatmap</h3>
                      <div className="text-xs text-zinc-400 font-medium">Last 20 weeks of activity</div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <div className="w-6" /> {/* Spacer for day labels */}
                        <div className="flex flex-1 justify-between text-[10px] text-gray-400 px-1">
                          {Array.from({ length: 5 }).map((_, i) => {
                            const date = new Date();
                            date.setDate(date.getDate() - (4 - i) * 28);
                            return <span key={i}>{date.toLocaleString('default', { month: 'short' })}</span>;
                          })}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <div className="flex flex-col justify-between text-[8px] text-gray-300 py-1 h-32">
                          <span>Mon</span>
                          <span>Wed</span>
                          <span>Fri</span>
                          <span>Sun</span>
                        </div>
                        <div className="grid grid-flow-col grid-rows-7 gap-1.5 flex-1 h-32">
                          {Array.from({ length: 140 }).map((_, i) => {
                            const date = new Date();
                            date.setDate(date.getDate() - (139 - i));
                            const dateStr = date.toISOString().split('T')[0];
                            const count = activityData[dateStr] || 0;
                            
                            return (
                              <div 
                                key={i} 
                                className={cn(
                                  "w-full h-full rounded-sm transition-all duration-500",
                                  count === 0 ? "bg-gray-100" :
                                  count < 3 ? "bg-indigo-200" :
                                  count < 6 ? "bg-indigo-400" :
                                  "bg-indigo-600"
                                )}
                                title={`${dateStr}: ${count} messages`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                      <div className="flex items-center gap-2 text-[10px] text-gray-400">
                        <span>Less</span>
                        <div className="w-3 h-3 bg-gray-100 rounded-sm" />
                        <div className="w-3 h-3 bg-indigo-200 rounded-sm" />
                        <div className="w-3 h-3 bg-indigo-400 rounded-sm" />
                        <div className="w-3 h-3 bg-indigo-600 rounded-sm" />
                        <span>More</span>
                      </div>
                      <div className="text-[10px] text-indigo-600 font-bold">
                        Total Activity: {Object.values(activityData).reduce((a, b) => a + b, 0)} interactions
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                    <h3 className="font-bold text-gray-900 text-lg">NCE 1 Progress Map (144 Lessons)</h3>
                    <div className="grid grid-cols-12 gap-2">
                      {Array.from({ length: 144 }).map((_, i) => (
                        <button 
                          key={i}
                          onClick={() => {
                            const lesson = NCE1_LESSONS.find(l => l.id === i + 1);
                            if (lesson) {
                              setSelectedLesson(lesson);
                              setActiveModule('chat');
                            }
                          }}
                          className={cn(
                            "aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold transition-all",
                            (i < (overallProgress * 1.44)) 
                              ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" 
                              : "bg-gray-50 text-gray-300 hover:bg-gray-100"
                          )}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Daily Check-in Card */}
                  <div className={cn(
                    "p-8 rounded-3xl text-white shadow-xl transition-all",
                    hasCheckedInToday 
                      ? "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-100" 
                      : "bg-gradient-to-br from-indigo-600 to-violet-700 shadow-indigo-200"
                  )}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                          <Calendar size={20} />
                        </div>
                        <h3 className="font-bold text-lg">Daily Goal</h3>
                      </div>
                      <div className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {hasCheckedInToday ? 'Completed' : 'Pending'}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8 mb-8">
                      <div className="text-center">
                        <div className="text-4xl font-black">{streak}</div>
                        <div className="text-[10px] uppercase font-bold tracking-widest opacity-70">Day Streak</div>
                      </div>
                      <div className="w-px h-10 bg-white/20" />
                      <div className="text-center">
                        <div className="text-4xl font-black">{wordBank.length}</div>
                        <div className="text-[10px] uppercase font-bold tracking-widest opacity-70">Total Words</div>
                      </div>
                    </div>

                    {!hasCheckedInToday ? (
                      <button 
                        onClick={() => setActiveModule('memorize')}
                        className="w-full py-4 bg-white text-indigo-600 font-bold rounded-2xl text-sm hover:bg-indigo-50 transition-all shadow-lg flex items-center justify-center gap-2"
                      >
                        <Zap size={16} />
                        Start Daily Review
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-white/90 font-medium text-sm justify-center py-2">
                        <CheckCircle2 className="text-white" size={18} />
                        Goal met! See you tomorrow.
                      </div>
                    )}
                  </div>

                  <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-200 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <Sparkles size={20} />
                      </div>
                      <h3 className="font-bold text-lg">AI Recommendation</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-white/10 rounded-2xl border border-white/20 space-y-2">
                        <p className="text-xs font-bold opacity-60 uppercase tracking-widest">Next Step</p>
                        <p className="text-sm font-medium leading-relaxed">
                          {overallProgress < 10 ? "Start with Lesson 1 to build your foundation." :
                           wordBank.length > 20 ? "Your word bank is growing! Try the 'Smart Review' to consolidate." :
                           overallProgress < 30 ? "Practice daily conversation in the 'Airport' scenario." :
                           "Try the 'Job Interview' scenario to challenge yourself."}
                        </p>
                      </div>
                      <div className="p-4 bg-white/10 rounded-2xl border border-white/20 space-y-2">
                        <p className="text-xs font-bold opacity-60 uppercase tracking-widest">AI Insight</p>
                        <p className="text-xs opacity-80 leading-relaxed">
                          {streak > 3 ? `You're on a ${streak}-day streak! Keep up the momentum.` :
                           wordBank.length === 0 ? "Save your first word to start building your vocabulary." :
                           `You've learned ${wordBank.length} words. Consistency is key to mastery.`}
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          if (wordBank.length > 20 && Math.random() > 0.5) {
                            setActiveModule('memorize');
                          } else if (overallProgress < 10) {
                            setSelectedLesson(NCE1_LESSONS[0]);
                            setActiveModule('chat');
                          } else {
                            setActiveScenario(overallProgress < 30 ? 'airport' : 'interview');
                            setActiveModule('chat');
                          }
                        }}
                        className="w-full py-3 bg-white text-indigo-600 font-bold rounded-xl text-sm hover:bg-indigo-50 transition-all"
                      >
                        Start Now
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-900 text-lg">Word of the Day</h3>
                      <div className="px-2 py-1 bg-indigo-100 text-indigo-600 text-[10px] font-bold rounded-md uppercase">Daily Pick</div>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-2xl border border-indigo-100 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-2xl font-black text-indigo-600">{wordOfTheDay.word}</h4>
                          <p className="text-xs text-gray-400 font-medium italic">{wordOfTheDay.phonetic}</p>
                        </div>
                        <button 
                          onClick={() => playSpeech(wordOfTheDay.word)}
                          className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-indigo-600 hover:scale-110 transition-transform"
                        >
                          <Volume2 size={20} />
                        </button>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-bold text-gray-700">{wordOfTheDay.meaning}</p>
                        <p className="text-xs text-gray-500 leading-relaxed italic">
                          "{wordOfTheDay.example}"
                        </p>
                      </div>
                      <button 
                        onClick={() => saveWord(wordOfTheDay.word)}
                        className="w-full py-2 bg-white border border-indigo-100 text-indigo-600 text-[10px] font-bold rounded-xl hover:bg-indigo-50 transition-all"
                      >
                        Add to Word Bank
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-900 text-lg">Smart Review</h3>
                      <RefreshCw 
                        size={16} 
                        className="text-gray-400 cursor-pointer hover:text-indigo-600 transition-colors" 
                        onClick={() => setReviewSeed(prev => prev + 1)}
                      />
                    </div>
                    <div className="space-y-3">
                      {smartReviewWords.map((word, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-transparent hover:border-indigo-100 transition-all">
                          <span className="font-bold text-gray-700">{word.word}</span>
                          <button 
                            onClick={() => playSpeech(word.word)}
                            className="p-1.5 text-indigo-600 hover:bg-white rounded-lg transition-all"
                          >
                            <Volume2 size={14} />
                          </button>
                        </div>
                      ))}
                      {wordBank.length === 0 && (
                        <p className="text-xs text-gray-400 text-center py-4 italic">No words to review yet.</p>
                      )}
                      <button 
                        onClick={() => setActiveModule('memorize')}
                        className="w-full py-3 border-2 border-dashed border-gray-200 text-gray-400 font-bold rounded-xl text-xs hover:border-indigo-300 hover:text-indigo-600 transition-all"
                      >
                        View All Words
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeModule === 'memorize' ? (
            <VocabularyMemorization 
              user={user} 
              llmConfig={llmConfig}
              voiceSettings={{
                selectedVoiceURI,
                isJarvisMode,
                useClonedVoice,
                availableVoices
              }}
            />
          ) : activeModule === 'speak' ? (
            <div className="max-w-4xl mx-auto p-8 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-xl">Pronunciation Practice</h3>
                  <button 
                    onClick={() => {
                      const random = PRACTICE_PHRASES[Math.floor(Math.random() * PRACTICE_PHRASES.length)];
                      setSpeakTarget(random);
                    }}
                    className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-full transition-all"
                  >
                    <RefreshCw size={14} />
                    New Phrase
                  </button>
                </div>
                
                <div className="p-10 bg-indigo-50 rounded-3xl border border-indigo-100 text-center space-y-6">
                  <p className="text-3xl font-black text-indigo-900 leading-tight">
                    "{speakTarget}"
                  </p>
                  <button 
                    onClick={() => playSpeech(speakTarget)}
                    className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-indigo-600 mx-auto hover:scale-110 transition-transform"
                  >
                    <Volume2 size={24} />
                  </button>
                </div>

                <div className="flex flex-col items-center gap-6">
                  <button 
                    onClick={() => isRecording ? stopRecording() : startRecording(speakTarget)}
                    className={cn(
                      "w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-xl",
                      isRecording 
                        ? "bg-red-500 text-white animate-pulse scale-110" 
                        : "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105"
                    )}
                  >
                    {isRecording ? <div className="text-xs font-black uppercase tracking-widest">Stop</div> : <Mic size={40} />}
                  </button>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    {isRecording ? `Recording... ${recordingTime}s` : "Tap to Speak"}
                  </p>
                </div>

                {isAssessing && (
                  <div className="flex flex-col items-center gap-4 py-8">
                    <RefreshCw size={32} className="text-indigo-600 animate-spin" />
                    <p className="text-sm font-bold text-gray-500 animate-pulse">Analyzing your pronunciation...</p>
                  </div>
                )}

                {assessments[speakTarget] && !isAssessing && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 rounded-3xl p-8 border border-gray-100 space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg",
                          assessments[speakTarget].score >= 80 ? "bg-emerald-500 text-white" :
                          assessments[speakTarget].score >= 60 ? "bg-amber-500 text-white" :
                          "bg-red-500 text-white"
                        )}>
                          {assessments[speakTarget].score}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">Overall Score</h4>
                          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Pronunciation Assessment</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => playMyRecording(speakTarget)}
                          className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-white border border-emerald-100 px-4 py-2 rounded-full hover:bg-emerald-50 transition-all"
                        >
                          <PlayCircle size={14} />
                          My Voice
                        </button>
                        <button 
                          onClick={() => startRecording(speakTarget)}
                          className="p-2 bg-white border border-gray-200 text-gray-400 hover:text-indigo-600 hover:border-indigo-100 rounded-full transition-all"
                        >
                          <RotateCcw size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center space-y-1">
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Accuracy</p>
                        <p className="text-xl font-black text-gray-900">{assessments[speakTarget].accuracyScore}%</p>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center space-y-1">
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Fluency</p>
                        <p className="text-xl font-black text-gray-900">{assessments[speakTarget].fluencyScore}%</p>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center space-y-1">
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Prosody</p>
                        <p className="text-xl font-black text-gray-900">{assessments[speakTarget].prosodyScore}%</p>
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-gray-100">
                      <p className="text-sm text-gray-600 leading-relaxed italic">
                        "{assessments[speakTarget].feedback}"
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          ) : activeModule === 'listen' ? (
            <div className="max-w-4xl mx-auto p-8 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-xl">Listening Practice</h3>
                  <button 
                    onClick={() => {
                      const random = PRACTICE_PHRASES[Math.floor(Math.random() * PRACTICE_PHRASES.length)];
                      setListenTarget(random);
                      setListenInput("");
                      setListenResult(null);
                    }}
                    className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-full transition-all"
                  >
                    <RefreshCw size={14} />
                    New Phrase
                  </button>
                </div>

                <div className="p-10 bg-gray-50 rounded-3xl border border-gray-100 text-center space-y-6">
                  <div className="w-24 h-24 bg-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center mx-auto cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => playSpeech(listenTarget)}
                  >
                    <Volume2 size={48} />
                  </div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Click to Listen</p>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Type what you heard</label>
                  <textarea 
                    value={listenInput}
                    onChange={(e) => setListenInput(e.target.value)}
                    placeholder="Enter the phrase here..."
                    className="w-full p-6 bg-gray-50 border-2 border-transparent focus:border-indigo-300 focus:bg-white rounded-3xl text-lg font-medium transition-all outline-none min-h-[120px]"
                  />
                  <button 
                    onClick={() => {
                      const target = listenTarget.toLowerCase().replace(/[^a-z0-9 ]/g, '');
                      const input = listenInput.toLowerCase().replace(/[^a-z0-9 ]/g, '');
                      const isCorrect = target === input;
                      setListenResult(isCorrect ? 'correct' : 'incorrect');
                    }}
                    className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-700 transition-all"
                  >
                    Check Answer
                  </button>
                </div>

                {listenResult && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={cn(
                      "p-8 rounded-3xl border text-center space-y-4",
                      listenResult === 'correct' 
                        ? "bg-emerald-50 border-emerald-100 text-emerald-900" 
                        : "bg-red-50 border-red-100 text-red-900"
                    )}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {listenResult === 'correct' ? (
                        <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg mb-2">
                          <Zap size={24} />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg mb-2">
                          <CloseIcon size={24} />
                        </div>
                      )}
                      <h4 className="text-2xl font-black uppercase tracking-widest">
                        {listenResult === 'correct' ? "Perfect!" : "Keep Trying!"}
                      </h4>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-xs font-bold opacity-60 uppercase tracking-widest">Correct Phrase</p>
                      <p className="text-xl font-bold italic">"{listenTarget}"</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          ) : activeModule === 'read' ? (
            <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
              <div className="bg-white p-6 md:p-12 rounded-[2rem] border border-gray-100 shadow-xl space-y-10 font-serif relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl pointer-events-none" />
                
                {/* Book Header */}
                <div className="border-b-2 border-zinc-100 pb-8 relative">
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-black text-indigo-600">Lesson {readLesson.id}</span>
                      <h3 className="text-3xl font-bold text-zinc-900 tracking-tight">{readLesson.title}</h3>
                    </div>
                    {readLesson.chineseTitle && (
                      <span className="text-2xl text-zinc-400 font-medium">{readLesson.chineseTitle}</span>
                    )}
                  </div>
                </div>

                {/* Audio & Question Section */}
                <div className="group flex flex-col md:flex-row gap-6 items-center md:items-start bg-zinc-50 p-8 rounded-[1.5rem] border border-zinc-100 hover:border-indigo-200 transition-all duration-300">
                  <button 
                    onClick={toggleAudio}
                    className={cn(
                      "w-20 h-20 rounded-2xl flex items-center justify-center transition-all shadow-lg shrink-0 transform group-hover:scale-105 active:scale-95",
                      isAudioPlaying ? "bg-red-500 text-white animate-pulse" : "bg-zinc-900 text-white hover:bg-indigo-600"
                    )}
                  >
                    {isAudioPlaying ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-1" />}
                  </button>
                  <div className="space-y-3 text-center md:text-left">
                    <div className="flex items-center gap-2 justify-center md:justify-start text-indigo-600">
                      <Headphones size={18} />
                      <p className="text-sm font-bold uppercase tracking-widest">Listen & Answer</p>
                    </div>
                    <p className="text-zinc-600 font-medium italic text-lg">Listen to the tape then answer this question.</p>
                    {readLesson.question && (
                      <div className="space-y-1">
                        <p className="text-2xl font-bold text-zinc-900 leading-tight">{readLesson.question}</p>
                        {readLesson.chineseQuestion && (
                          <p className="text-lg text-zinc-400 font-medium">{readLesson.chineseQuestion}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Dialogue Section */}
                <div className="space-y-8 text-2xl leading-[1.6] py-4">
                  {readLesson.text.split('\n').map((line, i) => {
                    const parts = line.split(': ');
                    if (parts.length > 1) {
                      return (
                        <div key={i} className="flex flex-col md:flex-row gap-2 md:gap-6 group">
                          <span className="w-32 font-black text-indigo-900 shrink-0 uppercase tracking-tighter text-lg md:text-right pt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            {parts[0]}
                          </span>
                          <div className="flex-1 text-zinc-800 font-medium">
                            {parts[1].split(' ').map((word, j) => (
                              <span 
                                key={j} 
                                onClick={() => handleWordClick(word)}
                                className="inline-block cursor-pointer hover:text-indigo-600 hover:bg-indigo-50 px-1 rounded-md transition-all duration-200"
                              >
                                {word}{' '}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return (
                      <p key={i} className="text-zinc-700 md:pl-38 font-medium italic border-l-4 border-indigo-100 pl-4">
                        {line.split(' ').map((word, j) => (
                          <span 
                            key={j} 
                            onClick={() => handleWordClick(word)}
                            className="inline-block cursor-pointer hover:text-indigo-600 hover:bg-indigo-50 px-1 rounded-md transition-all duration-200"
                          >
                            {word}{' '}
                          </span>
                        ))}
                      </p>
                    );
                  })}
                </div>

                {/* Vocabulary Section */}
                <div className="pt-12 border-t-2 border-zinc-50">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                      <BookOpen size={18} />
                    </div>
                    <h5 className="text-sm font-black text-zinc-400 uppercase tracking-[0.3em]">New Words & Expressions</h5>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {readLesson.vocabulary.map((v, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ y: -4 }}
                        onClick={() => playSpeech(v.word)}
                        className="flex flex-col p-5 bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xl font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors">{v.word}</span>
                          <Volume2 size={16} className="text-zinc-300 group-hover:text-indigo-400 transition-colors" />
                        </div>
                        <span className="text-sm text-indigo-400 font-mono font-medium mb-2">{v.phonetic}</span>
                        <span className="text-sm text-zinc-500 leading-relaxed">{v.meaning}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Navigation Controls */}
              <div className="flex justify-between items-center px-4">
                <button 
                  onClick={() => {
                    const currentIndex = NCE1_LESSONS.findIndex(l => l.id === readLesson.id);
                    const prevIndex = (currentIndex - 1 + NCE1_LESSONS.length) % NCE1_LESSONS.length;
                    setSelectedLesson(NCE1_LESSONS[prevIndex]);
                  }}
                  className="flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-indigo-600 transition-colors"
                >
                  <RotateCcw size={16} className="rotate-180" />
                  Previous Lesson
                </button>
                <button 
                  onClick={() => {
                    const currentIndex = NCE1_LESSONS.findIndex(l => l.id === readLesson.id);
                    const nextIndex = (currentIndex + 1) % NCE1_LESSONS.length;
                    setSelectedLesson(NCE1_LESSONS[nextIndex]);
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-bold shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all"
                >
                  Next Lesson
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ) : activeModule === 'write' ? (
            <div className="max-w-4xl mx-auto p-8 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-xl">Writing Practice</h3>
                  <button 
                    onClick={() => {
                      const prompts = [
                        "Describe your favorite hobby.",
                        "Write about your plans for the weekend.",
                        "Describe your best friend.",
                        "Write a short story about a cat.",
                        "Describe your dream job."
                      ];
                      setWritePrompt(prompts[Math.floor(Math.random() * prompts.length)]);
                      setWriteInput("");
                      setWriteFeedback("");
                    }}
                    className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-full transition-all"
                  >
                    <RefreshCw size={14} />
                    New Prompt
                  </button>
                </div>

                <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100 space-y-4">
                  <h5 className="text-xs font-bold text-indigo-900 uppercase tracking-widest">Writing Prompt</h5>
                  <p className="text-2xl font-black text-indigo-900">{writePrompt}</p>
                </div>

                <div className="space-y-4">
                  <textarea 
                    value={writeInput}
                    onChange={(e) => setWriteInput(e.target.value)}
                    placeholder="Start writing here..."
                    className="w-full p-8 bg-gray-50 border-2 border-transparent focus:border-indigo-300 focus:bg-white rounded-3xl text-lg font-medium transition-all outline-none min-h-[250px] leading-relaxed"
                  />
                  <button 
                    onClick={async () => {
                      if (!writeInput.trim()) return;
                      setIsWriting(true);
                      try {
                        const prompt = `Review the following English writing based on the prompt: "${writePrompt}". Provide corrections, suggestions for improvement, and an encouraging comment. Return as Markdown. Writing: "${writeInput}"`;
                        const response = await chatWithGemini([{ role: 'user', parts: [{ text: prompt }] }], llmConfig, "You are a professional English writing tutor.");
                        setWriteFeedback(response.text);
                      } catch (err) {
                        console.error("Writing feedback error:", err);
                      } finally {
                        setIsWriting(false);
                      }
                    }}
                    disabled={isWriting || !writeInput.trim()}
                    className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isWriting ? <RefreshCw size={20} className="animate-spin" /> : <PenTool size={20} />}
                    {isWriting ? "Analyzing..." : "Submit for Review"}
                  </button>
                </div>

                {writeFeedback && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-100 dark:border-white/5 space-y-4"
                  >
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                      <Sparkles size={20} />
                      <h4 className="font-bold">AI Feedback & Corrections</h4>
                    </div>
                    <div className="prose prose-indigo dark:prose-invert max-w-none text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                      <ReactMarkdown>{writeFeedback}</ReactMarkdown>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          ) : (
            <>
              {activeModule === 'chat' && (
                <div className="max-w-4xl mx-auto flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                  <button 
                    onClick={() => setActiveScenario(null)}
                    className={cn(
                      "px-4 py-2 rounded-2xl text-sm font-bold whitespace-nowrap transition-all border",
                      !activeScenario 
                        ? "bg-indigo-600 text-white border-indigo-600" 
                        : "bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/5 hover:border-indigo-300"
                    )}
                  >
                    Free Chat
                  </button>
                  {SCENARIOS.map(s => (
                    <button 
                      key={s.id}
                      onClick={() => {
                        setActiveScenario(s.id);
                        handleSend(`Let's start the ${s.title} scenario. I am the customer/user.`);
                      }}
                      className={cn(
                        "px-4 py-2 rounded-2xl text-sm font-bold whitespace-nowrap transition-all border flex items-center gap-2",
                        activeScenario === s.id 
                          ? "bg-indigo-600 text-white border-indigo-600" 
                          : "bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/5 hover:border-indigo-300"
                      )}
                    >
                      <span>{s.icon}</span>
                      <span>{s.title}</span>
                    </button>
                  ))}
                </div>
              )}

              {selectedLesson && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-indigo-100 dark:border-white/5 rounded-3xl p-6 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold">
                        {selectedLesson.id}
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{selectedLesson.title}</h3>
                    </div>
                    <button 
                      onClick={() => setSelectedLesson(null)}
                      className="text-xs text-zinc-400 hover:text-red-500 font-medium"
                    >
                      Clear Lesson
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Text</h4>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap italic bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-zinc-100 dark:border-white/5">
                        {selectedLesson.text}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Vocabulary</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedLesson.vocabulary.map((v, i) => (
                          <button 
                            key={i}
                            onClick={() => saveWord(v.word)}
                            className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 rounded-full text-xs font-medium hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors flex items-center gap-1"
                          >
                            <span>{v.word}</span>
                            <span className="opacity-50 text-[10px]">{v.phonetic}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {messages.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-40">
                  <History size={64} />
                  <div className="space-y-1">
                    <p className="font-bold text-xl">No history in this module</p>
                    <p className="text-sm">Start a conversation to begin learning!</p>
                  </div>
                </div>
              )}

              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex gap-6 max-w-4xl mx-auto",
                      msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                      msg.role === 'user' ? "bg-indigo-600 text-white" : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5"
                    )}>
                      {msg.role === 'user' ? (
                        <UserIcon size={20} />
                      ) : (
                        llmConfig.provider === 'gemini' ? (
                          <Sparkles size={20} className="text-indigo-600 dark:text-indigo-400" />
                        ) : (
                          <AlpacaIcon size={20} className="text-indigo-600 dark:text-indigo-400" />
                        )
                      )}
                    </div>
                    
                    <div className={cn(
                      "flex flex-col gap-3 max-w-[80%]",
                      msg.role === 'user' ? "items-end" : "items-start"
                    )}>
                        <div className={cn(
                          "px-6 py-4 rounded-3xl text-[15px] leading-relaxed shadow-sm",
                          msg.role === 'user' 
                            ? "bg-indigo-600 text-white rounded-tr-none" 
                            : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 text-zinc-800 dark:text-zinc-200 rounded-tl-none"
                        )}>
                          {msg.image && (
                            <img 
                              src={msg.image} 
                              alt="Uploaded" 
                              className="max-w-full rounded-2xl mb-3 max-h-64 object-contain"
                              referrerPolicy="no-referrer"
                            />
                          )}
                          {msg.file && (
                            <div className="flex items-center gap-3 p-3 bg-white/10 rounded-2xl mb-3 border border-white/20">
                              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <FileText size={20} className={msg.role === 'user' ? "text-white" : "text-indigo-600"} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold truncate">{msg.file.name}</p>
                                <p className="text-[10px] opacity-60 uppercase">{msg.file.type.split('/')[1] || 'FILE'}</p>
                              </div>
                            </div>
                          )}
                          <div className="prose prose-sm max-w-none prose-p:leading-relaxed">
                            <div 
                              onClick={(e) => {
                                const target = e.target as HTMLElement;
                                if (target.tagName === 'P' || target.tagName === 'SPAN' || target.tagName === 'LI') {
                                  const selection = window.getSelection();
                                  const word = selection?.toString().trim();
                                  if (word && word.length > 1 && !word.includes(' ')) {
                                    handleWordClick(word);
                                  }
                                }
                              }}
                              className="cursor-pointer hover:text-indigo-900 dark:hover:text-indigo-300 transition-colors"
                              title="Click to select a word to translate and save"
                            >
                              <ReactMarkdown>{msg.text}</ReactMarkdown>
                            </div>
                          </div>
                        </div>
                      
                      {msg.role === 'model' && (
                        <div className="flex flex-col gap-3 w-full">
                          <div className="flex items-center gap-3 flex-wrap">
                            <button 
                              onClick={() => playSpeech(msg.text)}
                              className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 px-3 py-1.5 rounded-full transition-all"
                            >
                              <Volume2 size={14} />
                              Listen
                            </button>
                            
                            {clonedAudios[msg.text] && (
                              <button 
                                onClick={() => playMyRecording(msg.text)}
                                className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 px-3 py-1.5 rounded-full transition-all"
                              >
                                <PlayCircle size={14} />
                                My Voice
                              </button>
                            )}

                            <button 
                              onClick={() => isRecording && recordingFor === msg.text ? stopRecording() : startRecording(msg.text)}
                              className={cn(
                                "flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full transition-all",
                                isRecording && recordingFor === msg.text
                                  ? "bg-red-500 text-white animate-pulse"
                                  : "text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10"
                              )}
                            >
                              <Mic size={14} />
                              {isRecording && recordingFor === msg.text ? `Recording... ${recordingTime}s` : "Practice"}
                            </button>

                            <button 
                              onClick={() => {
                                const word = window.getSelection()?.toString().trim();
                                if (word) saveWord(word);
                                else saveWord(msg.text.split(' ')[0].replace(/[^a-zA-Z]/g, ''));
                              }}
                              className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 px-3 py-1.5 rounded-full transition-all"
                            >
                              <Star size={14} />
                              Save Word
                            </button>
                          </div>

                          {isAssessing && recordingFor === msg.text && (
                            <div className="flex items-center gap-2 text-[10px] text-zinc-400 dark:text-zinc-500 italic animate-pulse">
                              <RefreshCw size={10} className="animate-spin" />
                              Analyzing pronunciation...
                            </div>
                          )}

                          {assessments[msg.text] && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="bg-zinc-50 dark:bg-white/5 rounded-2xl p-3 border border-zinc-100 dark:border-white/5 space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className={cn(
                                  "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold",
                                  assessments[msg.text].score >= 80 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" :
                                  assessments[msg.text].score >= 60 ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400" :
                                  "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                                )}>
                                  {assessments[msg.text].score}
                                </div>
                                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Pronunciation Score</span>
                              </div>
                              <button 
                                onClick={() => startRecording(msg.text)}
                                className="p-1.5 hover:bg-zinc-200 dark:hover:bg-white/10 rounded-lg text-zinc-400 transition-all"
                                title="Try Again"
                              >
                                <RotateCcw size={12} />
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2">
                              <div className="bg-white dark:bg-zinc-800 p-1.5 rounded-lg border border-zinc-100 dark:border-white/5 text-center">
                                <p className="text-[8px] text-zinc-400 uppercase font-bold">Accuracy</p>
                                <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">{assessments[msg.text].accuracyScore}%</p>
                              </div>
                              <div className="bg-white dark:bg-zinc-800 p-1.5 rounded-lg border border-zinc-100 dark:border-white/5 text-center">
                                <p className="text-[8px] text-zinc-400 uppercase font-bold">Fluency</p>
                                <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">{assessments[msg.text].fluencyScore}%</p>
                              </div>
                              <div className="bg-white dark:bg-zinc-800 p-1.5 rounded-lg border border-zinc-100 dark:border-white/5 text-center">
                                <p className="text-[8px] text-zinc-400 uppercase font-bold">Prosody</p>
                                <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">{assessments[msg.text].prosodyScore}%</p>
                              </div>
                            </div>

                            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                              "{assessments[msg.text].feedback}"
                            </p>
                          </motion.div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <div className="flex gap-6 max-w-4xl mx-auto">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 text-emerald-600 flex items-center justify-center shrink-0">
                    <Bot size={20} />
                  </div>
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 px-6 py-4 rounded-3xl rounded-tl-none shadow-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </>
          )}
        </main>

        {activeModule !== 'memorize' && (
          <footer className="p-8 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-white/5">
          <div className="max-w-4xl mx-auto">
            {(selectedImage || selectedFile) && (
              <div className="mb-4 flex items-end gap-3">
                {selectedImage && (
                  <div className="relative inline-block group">
                    <img 
                      src={selectedImage} 
                      alt="Preview" 
                      className="h-24 w-24 object-cover rounded-2xl border-2 border-indigo-100 dark:border-white/10 shadow-md"
                    />
                    <button 
                      onClick={() => setSelectedImage(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-all"
                    >
                      <CloseIcon size={14} />
                    </button>
                  </div>
                )}
                {selectedFile && (
                  <div className="relative inline-block group">
                    <div className="h-24 w-32 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl border-2 border-indigo-100 dark:border-white/10 shadow-md flex flex-col items-center justify-center p-3 text-center">
                      <FileText size={24} className="text-indigo-600 dark:text-indigo-400 mb-1" />
                      <p className="text-[10px] font-bold text-indigo-900 dark:text-indigo-200 truncate w-full">{selectedFile.name}</p>
                      <p className="text-[8px] text-indigo-400 uppercase">{selectedFile.type.split('/')[1] || 'FILE'}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedFile(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-all"
                    >
                      <CloseIcon size={14} />
                    </button>
                  </div>
                )}
                <button 
                  onClick={() => { setSelectedImage(null); setSelectedFile(null); }}
                  className="mb-2 px-3 py-1.5 bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10 rounded-full text-[10px] font-bold transition-all"
                >
                  Clear All
                </button>
              </div>
            )}
            <div className="flex items-center gap-4 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-transparent focus-within:border-indigo-300 dark:focus-within:border-indigo-500/50 focus-within:bg-white dark:focus-within:bg-zinc-800 transition-all shadow-inner">
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*,.pdf,.docx,.doc,.txt,.md,.csv,.xls,.xlsx,.ppt,.pptx,.js,.py,.cpp,.html,.css,.json"
                className="hidden"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-4 bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-2xl shadow-sm transition-all"
                title="Upload File"
              >
                <Paperclip size={24} />
              </button>
              <button 
                onClick={() => setIsRecording(!isRecording)}
                className={cn(
                  "p-4 rounded-2xl transition-all",
                  isRecording 
                    ? "bg-red-500 text-white animate-pulse" 
                    : "bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm"
                )}
              >
                <Mic size={24} />
              </button>

              <button 
                onClick={() => setShowSettings(true)}
                className="p-4 bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-2xl shadow-sm transition-all flex items-center justify-center"
                title={`Current Model: ${llmConfig.provider === 'gemini' ? 'Google Gemini' : 'Local Ollama'}`}
              >
                {llmConfig.provider === 'gemini' ? (
                  <Sparkles size={24} className="text-indigo-600 dark:text-indigo-400" />
                ) : (
                  <AlpacaIcon size={24} className="text-indigo-600 dark:text-indigo-400" />
                )}
              </button>
              
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                onPaste={handlePaste}
                placeholder={`Type or paste in ${activeModule} module...`}
                className="flex-1 bg-transparent border-none focus:ring-0 text-base py-3 text-zinc-800 dark:text-zinc-200"
              />
              
              <button 
                onClick={() => handleSend()}
                disabled={(!input.trim() && !selectedImage && !selectedFile) || isLoading}
                className={cn(
                  "p-4 rounded-2xl transition-all",
                  (input.trim() || selectedImage || selectedFile) && !isLoading
                    ? "bg-indigo-600 text-white shadow-lg hover:bg-indigo-700"
                    : "bg-zinc-200 dark:bg-white/5 text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
                )}
              >
                <Send size={24} />
              </button>
            </div>
          </div>
        </footer>
        )}
      </div>

      {/* Word Bank Drawer */}
      <AnimatePresence>
        {showLessonSelector && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLessonSelector(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-0 m-auto w-full max-w-2xl h-fit max-h-[80vh] bg-white shadow-2xl z-50 rounded-3xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-indigo-600 text-white">
                <div className="flex items-center gap-3">
                  <BookOpen size={24} />
                  <h2 className="text-xl font-bold">Select NCE 1 Lesson</h2>
                </div>
                <button onClick={() => setShowLessonSelector(false)} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                  <CloseIcon size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {NCE1_LESSONS.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setSelectedLesson(lesson);
                      setShowLessonSelector(false);
                    }}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl border transition-all text-left",
                      selectedLesson?.id === lesson.id
                        ? "bg-indigo-50 border-indigo-200 ring-2 ring-indigo-500 ring-offset-2"
                        : "bg-gray-50 border-transparent hover:border-gray-200 hover:bg-gray-100"
                    )}
                  >
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold text-indigo-600 shadow-sm shrink-0">
                      {lesson.id}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{lesson.title}</h3>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Odd Lesson</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="p-4 bg-gray-50 text-center text-[10px] text-gray-400">
                More lessons coming soon...
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-[70] overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-indigo-600 text-white">
                <div className="flex items-center gap-3">
                  <Settings size={24} />
                  <h2 className="text-xl font-bold">Settings</h2>
                </div>
                <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-white/20 rounded-xl transition-all">
                  <CloseIcon size={24} />
                </button>
              </div>

              <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
                {/* LLM Configuration */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-2xl mb-4">
                    <button 
                      onClick={() => setConfigView('gemini')}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all",
                        configView === 'gemini' ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:bg-gray-200"
                      )}
                    >
                      <Sparkles size={14} />
                      Gemini
                    </button>
                    <button 
                      onClick={() => setConfigView('ollama')}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all",
                        configView === 'ollama' ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:bg-gray-200"
                      )}
                    >
                      <AlpacaIcon size={14} />
                      Ollama
                    </button>
                    <button 
                      onClick={() => setConfigView('learning')}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all",
                        configView === 'learning' ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:bg-gray-200"
                      )}
                    >
                      <Star size={14} />
                      Learning
                    </button>
                  </div>

                  {configView === 'learning' ? (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Correction Intensity</label>
                        <div className="grid grid-cols-3 gap-2">
                          {(['none', 'standard', 'perfectionist'] as const).map(intensity => (
                            <button
                              key={intensity}
                              onClick={() => setLlmConfig(prev => ({ ...prev, correctionIntensity: intensity }))}
                              className={cn(
                                "py-3 rounded-2xl text-[10px] font-bold border-2 transition-all capitalize",
                                llmConfig.correctionIntensity === intensity 
                                  ? "bg-indigo-50 border-indigo-600 text-indigo-600" 
                                  : "bg-white border-gray-100 text-gray-400 hover:border-indigo-200"
                              )}
                            >
                              {intensity}
                            </button>
                          ))}
                        </div>
                        <p className="text-[10px] text-gray-400 italic leading-tight">
                          {llmConfig.correctionIntensity === 'none' && "AI will just chat without correcting you."}
                          {llmConfig.correctionIntensity === 'standard' && "AI will gently correct major mistakes."}
                          {llmConfig.correctionIntensity === 'perfectionist' && "AI will polish every sentence for natural phrasing."}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          onClick={() => {
                            setConfigView('gemini');
                            setLlmConfig(prev => ({ ...prev, provider: 'gemini' }));
                          }}
                          className={cn(
                            "p-4 rounded-2xl border-2 transition-all text-left space-y-1",
                            configView === 'gemini' 
                              ? "border-indigo-600 bg-indigo-50" 
                              : "border-gray-100 hover:border-indigo-200"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-gray-900">Google Gemini</p>
                            {llmConfig.provider === 'gemini' && (
                              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                            )}
                          </div>
                          <p className="text-[10px] text-gray-500">Default cloud model</p>
                        </button>
                        <button 
                          onClick={() => {
                            setConfigView('ollama');
                            setLlmConfig(prev => ({ ...prev, provider: 'ollama' }));
                          }}
                          className={cn(
                            "p-4 rounded-2xl border-2 transition-all text-left space-y-1",
                            configView === 'ollama' 
                              ? "border-indigo-600 bg-indigo-50" 
                              : "border-gray-100 hover:border-indigo-200"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-gray-900">Ollama (Local)</p>
                            {llmConfig.provider === 'ollama' && (
                              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                            )}
                          </div>
                          <p className="text-[10px] text-gray-500">Run model locally</p>
                        </button>
                      </div>

                      {configView === 'ollama' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 mt-4"
                        >
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Ollama URL</label>
                        <input 
                          type="text"
                          value={llmConfig.ollamaUrl}
                          onChange={(e) => setLlmConfig(prev => ({ ...prev, ollamaUrl: e.target.value }))}
                          placeholder="http://localhost:11434"
                          className="w-full bg-white border-gray-200 rounded-xl text-sm focus:ring-indigo-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Model Name</label>
                        {ollamaModels.length > 0 ? (
                          <select 
                            value={llmConfig.ollamaModel}
                            onChange={(e) => setLlmConfig(prev => ({ ...prev, ollamaModel: e.target.value }))}
                            className="w-full bg-white border-gray-200 rounded-xl text-sm focus:ring-indigo-500 p-2.5 appearance-none cursor-pointer"
                          >
                            {ollamaModels.map(m => (
                              <option key={m} value={m}>{m}</option>
                            ))}
                          </select>
                        ) : (
                          <div className="w-full bg-white border border-dashed border-gray-200 rounded-xl p-2.5 text-xs text-gray-400 italic">
                            Click "Detect Models" to load list
                          </div>
                        )}
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={fetchOllamaModels}
                          disabled={ollamaStatus.status === 'checking'}
                          className={cn(
                            "w-full py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 mb-2",
                            "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                          )}
                        >
                          {ollamaStatus.status === 'checking' ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            <RefreshCw className="w-3 h-3" />
                          )}
                          {ollamaModels.length > 0 ? 'Refresh List' : 'Detect Models'}
                        </button>

                        {ollamaModels.length > 0 && (
                          <button
                            onClick={() => {
                              setLlmConfig(prev => ({ ...prev, provider: 'ollama' }));
                              setOllamaStatus({ status: 'ok', message: 'Connected to Ollama!' });
                            }}
                            className="w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200"
                          >
                            <Zap className="w-3 h-3" />
                            Connect & Switch to Ollama
                          </button>
                        )}
                        
                        {ollamaStatus.message && (
                          <p className={cn(
                            "mt-2 text-[10px] px-2 text-center",
                            ollamaStatus.status === 'ok' ? "text-emerald-600" : "text-rose-600"
                          )}>
                            {ollamaStatus.message}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>

                {/* Voice Settings */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <Volume2 size={14} />
                    Voice & Pronunciation
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                          <PlayCircle size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">Use My Voice</p>
                          <p className="text-[10px] text-gray-500">Play your recordings when listening</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setUseClonedVoice(!useClonedVoice)}
                        className={cn(
                          "w-12 h-6 rounded-full transition-all relative",
                          useClonedVoice ? "bg-emerald-500" : "bg-gray-300"
                        )}
                      >
                        <div className={cn(
                          "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                          useClonedVoice ? "right-1" : "left-1"
                        )} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                          <Zap size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">JARVIS Mode</p>
                          <p className="text-[10px] text-gray-500">British male AI assistant vibe</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          const newMode = !isJarvisMode;
                          setIsJarvisMode(newMode);
                          if (newMode) playSpeech("At your service, sir.");
                        }}
                        className={cn(
                          "w-12 h-6 rounded-full transition-all relative",
                          isJarvisMode ? "bg-blue-500" : "bg-gray-300"
                        )}
                      >
                        <div className={cn(
                          "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                          isJarvisMode ? "right-1" : "left-1"
                        )} />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">AI Voice Selection</label>
                      <select 
                        value={selectedVoiceURI}
                        onChange={(e) => setSelectedVoiceURI(e.target.value)}
                        className="w-full bg-gray-50 border-gray-200 rounded-xl text-sm font-bold focus:ring-indigo-500"
                      >
                        {availableVoices
                          .filter(v => v.lang.startsWith('en'))
                          .map(voice => (
                            <option key={voice.voiceURI} value={voice.voiceURI}>
                              {voice.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Project Info (Debug/Help) */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles size={12} />
                    Project Information
                  </h3>
                  <div className="p-3 bg-indigo-50 rounded-xl space-y-2">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-gray-500 font-bold">Project ID:</span>
                      <span className="text-indigo-700 font-mono">{firebaseConfig.projectId}</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-gray-500 font-bold">User Email:</span>
                      <span className="text-indigo-700">{user?.email}</span>
                    </div>
                    <p className="text-[9px] text-gray-400 leading-tight">
                      Note: Your data is tied to this specific project and your Google account. 
                      If you remixed this app, you are in a new project with a fresh database.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50">
                <button 
                  onClick={() => setShowSettings(false)}
                  className="w-full py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-700 transition-all"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </>
        )}

        {showWordBank && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWordBank(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-[400px] bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-indigo-600 text-white">
                <div className="flex items-center gap-3">
                  <BookMarked size={28} />
                  <h2 className="text-2xl font-bold">Word Bank</h2>
                </div>
                <button onClick={() => setShowWordBank(false)} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                  <CloseIcon size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {wordBank.length === 0 ? (
                  <div className="text-center py-20 text-gray-400 space-y-4">
                    <Star size={64} className="mx-auto opacity-10" />
                    <p className="text-lg font-medium">Your word bank is empty</p>
                    <p className="text-sm">Select words in chat to save them here.</p>
                  </div>
                ) : (
                  wordBank.map((item) => (
                    <motion.div 
                      layout
                      key={item.id} 
                      className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl group hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100"
                    >
                      <div className="space-y-1">
                        <span className="text-lg font-bold text-gray-800">{item.word}</span>
                        <p className="text-[10px] text-gray-400">{new Date(item.timestamp).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => playSpeech(item.word)}
                          className="p-2 text-indigo-600 hover:bg-white rounded-xl shadow-sm transition-all"
                        >
                          <Volume2 size={18} />
                        </button>
                        <button 
                          onClick={() => removeWord(item.id)}
                          className="p-2 text-red-500 hover:bg-white rounded-xl shadow-sm transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLiveMode && (
          <LiveVoice 
            onClose={() => setIsLiveMode(false)} 
            onTranscript={handleLiveTranscript}
          />
        )}
      </AnimatePresence>

      {/* Translation Popup */}
      <AnimatePresence>
        {showTranslationPopup && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white rounded-3xl shadow-2xl z-[100] overflow-hidden border border-indigo-100"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-lg">
                    {selectedWordInfo?.word?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 capitalize">{selectedWordInfo?.word}</h3>
                    <p className="text-xs text-indigo-600 font-medium">{selectedWordInfo?.phonetic || '...'}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowTranslationPopup(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-all"
                >
                  <CloseIcon size={20} />
                </button>
              </div>

              {isTranslating ? (
                <div className="py-8 flex flex-col items-center justify-center gap-3 text-gray-400">
                  <RefreshCw className="animate-spin" size={24} />
                  <p className="text-xs font-medium">Translating word...</p>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                    <p className="text-sm font-bold text-indigo-900">{selectedWordInfo?.meaning}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Example Sentence</p>
                    <p className="text-sm text-gray-600 leading-relaxed italic">
                      "{selectedWordInfo?.example}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button 
                      onClick={() => playSpeech(selectedWordInfo?.word)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all"
                    >
                      <Volume2 size={16} />
                      Pronounce
                    </button>
                    <button 
                      onClick={() => {
                        saveWord(selectedWordInfo?.word);
                        setShowTranslationPopup(false);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
                    >
                      <Star size={16} />
                      Save Word
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
