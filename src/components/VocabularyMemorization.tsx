import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Brain, 
  TrendingUp, 
  Calendar, 
  Award,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Settings,
  BookOpen,
  Clock,
  BarChart3,
  Mic,
  Volume2,
  Play,
  Square,
  Languages,
  Info,
  Zap,
  PlayCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
  db, 
  auth, 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  serverTimestamp,
  onSnapshot,
  orderBy
} from '../firebase';
import { NCE1_LESSONS } from '../data/lessons';
import { assessPronunciation, generateExampleSentences } from '../services/gemini';

interface WordProgress {
  id?: string;
  word: string;
  meaning: string;
  phonetic: string;
  knownCount: number;
  lastReview: number;
  nextReview: number;
  status: 'learning' | 'mastered' | 'forgotten' | 'vague';
  sentences?: { en: string; zh: string }[];
  mnemonic?: string;
  extended?: { word: string; type: string; meaning: string }[];
}

interface VocabularyMemorizationProps {
  user: any;
  llmConfig: any;
  voiceSettings: {
    selectedVoiceURI: string;
    isJarvisMode: boolean;
    useClonedVoice: boolean;
    availableVoices: SpeechSynthesisVoice[];
  };
}

export default function VocabularyMemorization({ user, llmConfig, voiceSettings }: VocabularyMemorizationProps) {
  const [dailyGoal, setDailyGoal] = useState(20);
  const [progress, setProgress] = useState<WordProgress[]>([]);
  const [sessionWords, setSessionWords] = useState<WordProgress[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [showMeaning, setShowMeaning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'setup' | 'session' | 'stats'>('setup');
  const [accent, setAccent] = useState<'us' | 'uk'>('us');
  const [clonedAudios, setClonedAudios] = useState<Record<string, string>>({}); // target -> blobUrl
  const [isRecording, setIsRecording] = useState(false);
  const [recordingFor, setRecordingFor] = useState<string | null>(null);
  const [assessments, setAssessments] = useState<Record<string, { score: number; feedback: string; accuracyScore?: number; fluencyScore?: number; prosodyScore?: number }>>({});
  const [isAssessing, setIsAssessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const [showCheckInSuccess, setShowCheckInSuccess] = useState(false);
  const [checkInStreak, setCheckInStreak] = useState(0);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  const { selectedVoiceURI, isJarvisMode, useClonedVoice, availableVoices } = voiceSettings;

  // Load progress from Firestore
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'vocabularyProgress'),
      where('uid', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as WordProgress[];
      setProgress(data);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Check if user has checked in today
  useEffect(() => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];
    const q = query(
      collection(db, 'checkIns'),
      where('uid', '==', user.uid),
      where('date', '==', today)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setHasCheckedInToday(!snapshot.empty);
    });

    // Also fetch streak
    const streakQ = query(
      collection(db, 'checkIns'),
      where('uid', '==', user.uid),
      orderBy('date', 'desc')
    );

    const streakUnsubscribe = onSnapshot(streakQ, (snapshot) => {
      const dates = snapshot.docs.map(doc => doc.data().date);
      let streak = 0;
      let checkDate = new Date();
      
      // Check today or yesterday to start the streak
      const todayStr = new Date().toISOString().split('T')[0];
      const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      if (dates.includes(todayStr) || dates.includes(yesterdayStr)) {
        let current = dates.includes(todayStr) ? new Date() : new Date(Date.now() - 86400000);
        while (true) {
          const dStr = current.toISOString().split('T')[0];
          if (dates.includes(dStr)) {
            streak++;
            current.setDate(current.getDate() - 1);
          } else {
            break;
          }
        }
      }
      setCheckInStreak(streak);
    });

    return () => {
      unsubscribe();
      streakUnsubscribe();
    };
  }, [user]);

  // Master word list from NCE1_LESSONS
  const masterWordList = useMemo(() => {
    const words: { word: string; phonetic: string; meaning: string }[] = [];
    const seen = new Set<string>();
    
    NCE1_LESSONS.forEach(lesson => {
      lesson.vocabulary.forEach(v => {
        if (!seen.has(v.word.toLowerCase())) {
          words.push(v);
          seen.add(v.word.toLowerCase());
        }
      });
    });
    return words;
  }, []);

  const playMyRecording = (target: string) => {
    const audioUrl = clonedAudios[target];
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const startSession = async () => {
    const now = Date.now();
    setIsLoading(true);
    
    // 1. Get words due for review (Ebbinghaus)
    const dueWords = progress.filter(p => p.status !== 'mastered' && p.nextReview <= now);
    
    // 2. Get new words if goal not met
    const learnedWordsSet = new Set(progress.map(p => p.word.toLowerCase()));
    const newWordsNeeded = Math.max(0, dailyGoal - dueWords.length);
    const newWords = masterWordList
      .filter(w => !learnedWordsSet.has(w.word.toLowerCase()))
      .slice(0, newWordsNeeded)
      .map(w => ({
        ...w,
        knownCount: 0,
        lastReview: 0,
        nextReview: 0,
        status: 'learning' as const
      }));

    const session: WordProgress[] = [...dueWords, ...newWords].slice(0, dailyGoal);
    
    if (session.length === 0) {
      alert("No words to review! Try increasing your daily goal or wait for the next review cycle.");
      setIsLoading(false);
      return;
    }

    // Pre-fetch sentences for the first word
    const firstWord = session[0];
    if (!firstWord.sentences || firstWord.sentences.length === 0) {
      try {
        const sentences = await generateExampleSentences(firstWord.word, llmConfig);
        firstWord.sentences = sentences.length > 0 ? sentences : [{ en: getExampleSentence(firstWord.word), zh: '' }];
      } catch (err) {
        console.error("Sentence pre-fetch error:", err);
        firstWord.sentences = [{ en: getExampleSentence(firstWord.word), zh: '' }];
      }
    }

    setSessionWords(session);
    setCurrentIndex(0);
    setIsSessionActive(true);
    setView('session');
    setShowMeaning(false);
    setAssessments({});
    setIsLoading(false);
  };

  const playTTS = async (text: string) => {
    // If useClonedVoice is on and we have a recording, play that instead
    if (useClonedVoice && clonedAudios[text]) {
      const audio = new Audio(clonedAudios[text]);
      audio.play();
      return;
    }

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
      } else {
        // Fallback to accent-based selection if selected voice is missing
        const fallbackVoice = availableVoices.find(v => v.lang.startsWith(accent === 'us' ? 'en-US' : 'en-GB'));
        if (fallbackVoice) utterance.voice = fallbackVoice;
      }
      
      // Adjust rate and pitch for "different versions" feel
      utterance.rate = 0.9; 
      utterance.pitch = 1.0;
    }
    
    window.speechSynthesis.speak(utterance);
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
        
        // Basic check for very short/empty recording
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
        
        // Save as "cloned" voice for this target
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

  const handleResponse = async (responseType: 'know' | 'vague' | 'forgot') => {
    const currentWord = sessionWords[currentIndex];
    const now = Date.now();
    
    let updatedWord: WordProgress = { ...currentWord };
    
    if (responseType === 'know') {
      updatedWord.knownCount += 1;
      updatedWord.lastReview = now;
      
      // Ebbinghaus intervals (in days): 1, 2, 4, 7, 15, 30
      const intervals = [1, 2, 4, 7, 15, 30];
      const nextInterval = intervals[Math.min(updatedWord.knownCount - 1, intervals.length - 1)];
      updatedWord.nextReview = now + nextInterval * 24 * 60 * 60 * 1000;
      
      if (updatedWord.knownCount >= 2) {
        updatedWord.status = 'mastered';
      } else {
        updatedWord.status = 'learning';
      }
    } else if (responseType === 'vague') {
      // Vague: don't increment knownCount much, review again soon
      updatedWord.lastReview = now;
      updatedWord.nextReview = now + 0.5 * 24 * 60 * 60 * 1000; // Review in 12 hours
      updatedWord.status = 'vague';
    } else {
      updatedWord.knownCount = 0;
      updatedWord.lastReview = now;
      // Reappear soon (randomly within 1-2 days or next session)
      updatedWord.nextReview = now + (Math.random() * 24 * 60 * 60 * 1000);
      updatedWord.status = 'forgotten';
    }

    // Save to Firestore
    try {
      if (updatedWord.id) {
        await updateDoc(doc(db, 'vocabularyProgress', updatedWord.id), {
          ...updatedWord,
          uid: user.uid,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'vocabularyProgress'), {
          ...updatedWord,
          uid: user.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
    } catch (error) {
      console.error("Error updating word progress:", error);
    }

    if (currentIndex < sessionWords.length - 1) {
      const nextIdx = currentIndex + 1;
      const nextWord = sessionWords[nextIdx];
      
      // Pre-fetch sentences for the next word if not already there
      if (!nextWord.sentences || nextWord.sentences.length === 0) {
        generateExampleSentences(nextWord.word, llmConfig).then(sentences => {
          setSessionWords(prev => {
            const updated = [...prev];
            updated[nextIdx] = { 
              ...updated[nextIdx], 
              sentences: sentences.length > 0 ? sentences : [{ en: getExampleSentence(nextWord.word), zh: '' }] 
            };
            return updated;
          });
        }).catch(err => {
          console.error("Next word sentence pre-fetch error:", err);
          setSessionWords(prev => {
            const updated = [...prev];
            updated[nextIdx] = { 
              ...updated[nextIdx], 
              sentences: [{ en: getExampleSentence(nextWord.word), zh: '' }] 
            };
            return updated;
          });
        });
      }

      setCurrentIndex(nextIdx);
      setShowMeaning(false);
      setAssessments({});
    } else {
      setIsSessionActive(false);
      setView('stats');
    }
  };

  const handleCheckIn = async () => {
    if (!user || hasCheckedInToday) return;

    const today = new Date().toISOString().split('T')[0];
    try {
      await addDoc(collection(db, 'checkIns'), {
        uid: user.uid,
        date: today,
        wordCount: sessionWords.length,
        timestamp: serverTimestamp()
      });
      setShowCheckInSuccess(true);
    } catch (error) {
      console.error("Error checking in:", error);
    }
  };

  const stats = useMemo(() => {
    const mastered = progress.filter(p => p.status === 'mastered').length;
    const learning = progress.filter(p => p.status === 'learning').length;
    const forgotten = progress.filter(p => p.status === 'forgotten').length;
    const total = masterWordList.length;
    
    // Memory durability (average knownCount / 2 * 100)
    const avgDurability = progress.length > 0 
      ? (progress.reduce((acc, p) => acc + Math.min(p.knownCount, 2), 0) / (progress.length * 2)) * 100 
      : 0;

    return { mastered, learning, forgotten, total, avgDurability };
  }, [progress, masterWordList]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <RotateCcw className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header Tabs */}
      <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 transition-colors duration-300">
        <button 
          onClick={() => setView('setup')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all",
            view === 'setup' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-indigo-900/20" : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
          )}
        >
          <Settings size={18} />
          Setup
        </button>
        <button 
          onClick={() => setView('stats')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all",
            view === 'stats' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-indigo-900/20" : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
          )}
        >
          <BarChart3 size={18} />
          Stats
        </button>
      </div>

      {view === 'setup' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-white/5 space-y-8 transition-colors duration-300"
        >
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Brain size={32} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Vocabulary Memorization</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Set your daily goal and start your Ebbinghaus journey.</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">Daily Goal (Words)</label>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 p-1 rounded-xl">
                <button 
                  onClick={() => setAccent('us')}
                  className={cn(
                    "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                    accent === 'us' ? "bg-white dark:bg-white/10 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  US
                </button>
                <button 
                  onClick={() => setAccent('uk')}
                  className={cn(
                    "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                    accent === 'uk' ? "bg-white dark:bg-white/10 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  UK
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="5" 
                max="100" 
                step="5"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(parseInt(e.target.value))}
                className="flex-1 h-2 bg-indigo-100 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <span className="w-12 text-center font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 py-1 rounded-lg">{dailyGoal}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl border border-emerald-100 dark:border-emerald-500/20 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
                <Award size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Mastered</span>
              </div>
              <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300">{stats.mastered}</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-2xl border border-blue-100 dark:border-blue-500/20 shadow-sm">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                <TrendingUp size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Learning</span>
              </div>
              <p className="text-2xl font-black text-blue-700 dark:text-blue-300">{stats.learning}</p>
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-500/10 rounded-2xl border border-amber-100 dark:border-amber-500/20 shadow-sm">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
                <Clock size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Durability</span>
              </div>
              <p className="text-2xl font-black text-amber-700 dark:text-amber-300">{stats.avgDurability.toFixed(0)}%</p>
            </div>
          </div>

          <button 
            onClick={startSession}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-indigo-900/20 flex items-center justify-center gap-2"
          >
            Start Session
            <ChevronRight size={20} />
          </button>
        </motion.div>
      )}

      {view === 'session' && sessionWords.length > 0 && (
        <div className="fixed inset-0 bg-white dark:bg-zinc-950 z-50 flex flex-col overflow-hidden transition-colors duration-300">
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-white/5">
            <button 
              onClick={() => {
                setIsSessionActive(false);
                setView('setup');
              }}
              className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex-1 px-8">
              <div className="w-full h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIndex + 1) / sessionWords.length) * 100}%` }}
                  className="h-full bg-indigo-600"
                />
              </div>
            </div>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 min-w-[60px] text-right">
              {currentIndex + 1} / {sessionWords.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto p-6 space-y-8"
            >
              {/* Word Section */}
              <div className="text-center space-y-4 pt-12">
                <h2 className="text-6xl font-black text-gray-900 dark:text-white tracking-tighter">
                  {sessionWords[currentIndex].word}
                </h2>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xl font-bold">
                    [{sessionWords[currentIndex].phonetic}]
                  </span>
                  <button 
                    onClick={() => playTTS(sessionWords[currentIndex].word)}
                    className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all shadow-sm"
                  >
                    <Volume2 size={24} />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {showMeaning ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8 pb-32"
                  >
                    {/* Meaning */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest">
                        <Languages size={14} />
                        Meaning
                      </div>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                        {sessionWords[currentIndex].meaning}
                      </p>
                    </div>

                    {/* Example Sentences */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest">
                        <BookOpen size={14} />
                        Example Sentences
                      </div>
                      <div className="space-y-4">
                        {(sessionWords[currentIndex].sentences || []).map((s, idx) => (
                          <div key={idx} className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-white/5 space-y-3 group shadow-sm">
                            <div className="flex items-start justify-between gap-4">
                              <p className="text-gray-900 dark:text-zinc-100 leading-relaxed font-bold text-lg">
                                {typeof s === 'string' ? s : s.en}
                              </p>
                              <button 
                                onClick={() => playTTS(typeof s === 'string' ? s : s.en)}
                                className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                              >
                                <Volume2 size={20} />
                              </button>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">
                              {typeof s === 'string' ? '' : s.zh}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mnemonic */}
                    {sessionWords[currentIndex].mnemonic && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest">
                          <Brain size={14} />
                          Mnemonic
                        </div>
                        <div className="bg-indigo-50 dark:bg-indigo-500/10 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
                          <p className="text-indigo-700 dark:text-indigo-300 text-lg leading-relaxed italic font-medium">
                            {sessionWords[currentIndex].mnemonic}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Extended */}
                    {sessionWords[currentIndex].extended && sessionWords[currentIndex].extended!.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">
                          <Zap size={14} />
                          Extended
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {sessionWords[currentIndex].extended!.map((ext, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-white/5">
                              <div className="flex items-center gap-2">
                                <span className="text-zinc-900 dark:text-zinc-100 font-bold">{ext.word}</span>
                                <span className="text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase px-1.5 py-0.5 bg-zinc-100 dark:bg-white/5 rounded">{ext.type}</span>
                              </div>
                              <span className="text-zinc-500 dark:text-zinc-400 text-xs">{ext.meaning}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center py-20">
                    <button 
                      onClick={() => setShowMeaning(true)}
                      className="group relative px-12 py-6 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-3xl border border-zinc-200 dark:border-white/10 transition-all overflow-hidden shadow-sm"
                    >
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <span className="text-zinc-900 dark:text-zinc-100 font-bold text-lg">Recall word meaning</span>
                        <span className="text-zinc-500 dark:text-zinc-400 text-xs">Tap to reveal answer</span>
                      </div>
                      <motion.div 
                        className="absolute inset-0 bg-indigo-500/5 dark:bg-indigo-500/10"
                        animate={{ opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </button>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Action Bar */}
          <div className="p-6 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-t border-gray-200 dark:border-white/5">
            <div className="max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                {showMeaning ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-3 gap-4"
                  >
                    <button 
                      onClick={() => handleResponse('know')}
                      className="flex flex-col items-center gap-2 p-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-500/20 transition-all shadow-sm"
                    >
                      <span className="font-bold">Know</span>
                      <span className="text-[10px] opacity-60 font-bold uppercase tracking-widest">Mastered</span>
                    </button>
                    <button 
                      onClick={() => handleResponse('vague')}
                      className="flex flex-col items-center gap-2 p-4 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-2xl border border-amber-500/20 transition-all shadow-sm"
                    >
                      <span className="font-bold">Vague</span>
                      <span className="text-[10px] opacity-60 font-bold uppercase tracking-widest">Review Soon</span>
                    </button>
                    <button 
                      onClick={() => handleResponse('forgot')}
                      className="flex flex-col items-center gap-2 p-4 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-2xl border border-red-500/20 transition-all shadow-sm"
                    >
                      <span className="font-bold">Forgot</span>
                      <span className="text-[10px] opacity-60 font-bold uppercase tracking-widest">Relearn</span>
                    </button>
                  </motion.div>
                ) : (
                  <div className="h-[84px]" /> // Placeholder to keep layout stable
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {view === 'stats' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          {/* Check-in Section */}
          {!hasCheckedInToday && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white shadow-xl shadow-indigo-200 relative overflow-hidden"
            >
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Daily Check-in</h3>
                    <p className="text-indigo-100 text-sm">Complete your session to check-in today!</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 py-2">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{checkInStreak}</div>
                    <div className="text-[10px] uppercase font-bold tracking-wider opacity-70">Streak</div>
                  </div>
                  <div className="w-px h-8 bg-white/20" />
                  <div className="text-center">
                    <div className="text-3xl font-bold">{stats.mastered + stats.learning}</div>
                    <div className="text-[10px] uppercase font-bold tracking-wider opacity-70">Total Words</div>
                  </div>
                </div>
                <button 
                  onClick={handleCheckIn}
                  className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={20} />
                  Check-in Now
                </button>
              </div>
              <motion.div 
                className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          )}

          {hasCheckedInToday && (
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-100">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-900">Checked in today!</h3>
                  <p className="text-emerald-600 text-sm">Current streak: {checkInStreak} days</p>
                </div>
              </div>
              <button 
                onClick={() => setShowCheckInSuccess(true)}
                className="px-6 py-2 bg-emerald-500 text-white rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all"
              >
                View Card
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#1A1A1A] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 space-y-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="text-indigo-600" size={20} />
                Learning Progress
              </h3>
              <div className="space-y-4">
                <StatRow label="Mastered" value={stats.mastered} total={stats.total} color="bg-emerald-500" />
                <StatRow label="Learning" value={stats.learning} total={stats.total} color="bg-blue-500" />
                <StatRow label="Forgotten" value={stats.forgotten} total={stats.total} color="bg-amber-500" />
                <StatRow label="Remaining" value={stats.total - (stats.mastered + stats.learning)} total={stats.total} color="bg-gray-200 dark:bg-white/10" />
              </div>
            </div>

            <div className="bg-white dark:bg-[#1A1A1A] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 space-y-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Award className="text-indigo-600" size={20} />
                Memory Durability
              </h3>
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      className="text-gray-100 dark:text-white/5"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray={364.4}
                      strokeDashoffset={364.4 - (364.4 * stats.avgDurability) / 100}
                      className="text-indigo-600 transition-all duration-1000"
                    />
                  </svg>
                  <span className="absolute text-2xl font-bold text-gray-900 dark:text-white">{stats.avgDurability.toFixed(0)}%</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Your overall memory retention based on review history.</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1A1A1A] p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Calendar className="text-indigo-600" size={20} />
              Recent Mastered Words
            </h3>
            <div className="flex flex-wrap gap-3">
              {progress.filter(p => p.status === 'mastered').slice(-20).map((p, i) => (
                <div key={i} className="px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 rounded-xl text-sm font-bold border border-emerald-100 dark:border-emerald-500/20">
                  {p.word}
                </div>
              ))}
              {stats.mastered === 0 && (
                <p className="text-gray-400 italic text-sm">No words mastered yet. Keep practicing!</p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Check-in Success Modal */}
      <AnimatePresence>
        {showCheckInSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCheckInSuccess(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[#1a1a1a] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10"
            >
              {/* Card Content */}
              <div className="relative aspect-[3/4] p-8 flex flex-col justify-between overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/20 to-transparent" />
                <motion.div 
                  className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                        <Brain size={20} />
                      </div>
                      <span className="text-white font-bold tracking-tight">MaiMai English</span>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Date</div>
                      <div className="text-white font-mono text-sm">{new Date().toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="pt-8 space-y-2">
                    <h2 className="text-4xl font-bold text-white leading-tight">
                      Persistence is the key to success.
                    </h2>
                    <p className="text-gray-500 italic text-sm">坚持是成功的关键。</p>
                  </div>
                </div>

                <div className="relative z-10 space-y-8">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="text-indigo-400 text-3xl font-bold">{checkInStreak}</div>
                      <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Days Streak</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-white text-3xl font-bold">{sessionWords.length}</div>
                      <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Today Words</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-white text-3xl font-bold">{stats.mastered}</div>
                      <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Mastered</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <img 
                        src={user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.uid}`} 
                        alt="User" 
                        className="w-10 h-10 rounded-full border-2 border-white/10"
                      />
                      <div>
                        <div className="text-white text-sm font-bold">{user?.displayName || 'Learner'}</div>
                        <div className="text-gray-500 text-[10px]">Learning Journey</div>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-white p-1 rounded-lg">
                      {/* Mock QR Code */}
                      <div className="w-full h-full bg-black rounded-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setShowCheckInSuccess(false)}
                className="w-full py-6 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white font-bold transition-all border-t border-white/10"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatRow({ label, value, total, color }: { label: string, value: number, total: number, color: string }) {
  const percentage = (value / total) * 100;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-600 dark:text-gray-400">{label}</span>
        <span className="font-bold text-gray-900 dark:text-white">{value}</span>
      </div>
      <div className="w-full h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className={cn("h-full", color)}
        />
      </div>
    </div>
  );
}

// Simple helper to find an example sentence from NCE1_LESSONS
function getExampleSentence(word: string): string {
  const lowerWord = word.toLowerCase();
  for (const lesson of NCE1_LESSONS) {
    if (lesson.text) {
      const sentences = lesson.text.split(/[.!?\n]/);
      for (const sentence of sentences) {
        if (sentence.toLowerCase().includes(lowerWord)) {
          return sentence.trim();
        }
      }
    }
  }
  return `This is an example sentence with the word "${word}".`;
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
