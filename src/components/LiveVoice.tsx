import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, X, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ai, SYSTEM_INSTRUCTION } from '../services/gemini';
import { Modality, LiveServerMessage } from '@google/genai';

interface LiveVoiceProps {
  onClose: () => void;
  onTranscript: (text: string, role: 'user' | 'model') => void;
}

export default function LiveVoice({ onClose, onTranscript }: LiveVoiceProps) {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sessionRef = useRef<any>(null);
  const audioQueue = useRef<Int16Array[]>([]);
  const isPlaying = useRef(false);

  const startSession = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      // 1. Setup Audio Context
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      
      // 2. Connect to Live API
      const session = await ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-09-2025",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction: SYSTEM_INSTRUCTION + " You are now in a real-time voice conversation. Keep your responses concise and natural for spoken dialogue.",
          outputAudioTranscription: {},
          inputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            startMic();
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle audio output
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              const binary = atob(base64Audio);
              const bytes = new Int16Array(binary.length / 2);
              for (let i = 0; i < bytes.length; i++) {
                bytes[i] = (binary.charCodeAt(i * 2) & 0xFF) | (binary.charCodeAt(i * 2 + 1) << 8);
              }
              audioQueue.current.push(bytes);
              if (!isPlaying.current) playNextInQueue();
            }

            // Handle transcriptions
            if (message.serverContent?.modelTurn?.parts?.[0]?.text) {
               onTranscript(message.serverContent.modelTurn.parts[0].text, 'model');
            }
            
            // Handle user transcription (input)
            const userTranscript = (message.serverContent as any)?.userTurn?.parts?.[0]?.text;
            if (userTranscript) {
               onTranscript(userTranscript, 'user');
            }

            if (message.serverContent?.interrupted) {
              audioQueue.current = [];
              isPlaying.current = false;
            }
          },
          onclose: () => {
            stopAll();
            onClose();
          },
          onerror: (err) => {
            console.error("Live API Error:", err);
            setError("Connection error. Please try again.");
            setIsConnecting(false);
          }
        }
      });
      sessionRef.current = session;
    } catch (err) {
      console.error("Failed to start live session:", err);
      setError("Failed to access microphone or connect to server.");
      setIsConnecting(false);
    }
  };

  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const source = audioContextRef.current!.createMediaStreamSource(stream);
      const processor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (e) => {
        if (!sessionRef.current) return;
        
        const inputData = e.inputBuffer.getChannelData(0);
        // Convert Float32 to Int16 PCM
        const pcmData = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7FFF;
        }
        
        // Convert to base64
        const base64Data = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)));
        sessionRef.current.sendRealtimeInput({
          media: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
        });
      };

      source.connect(processor);
      processor.connect(audioContextRef.current!.destination);
    } catch (err) {
      console.error("Mic error:", err);
      setError("Could not access microphone.");
    }
  };

  const playNextInQueue = () => {
    if (audioQueue.current.length === 0 || !audioContextRef.current) {
      isPlaying.current = false;
      return;
    }

    isPlaying.current = true;
    const pcmData = audioQueue.current.shift()!;
    const buffer = audioContextRef.current.createBuffer(1, pcmData.length, 16000);
    const channelData = buffer.getChannelData(0);
    
    for (let i = 0; i < pcmData.length; i++) {
      channelData[i] = pcmData[i] / 0x7FFF;
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextRef.current.destination);
    source.onended = playNextInQueue;
    source.start();
  };

  const stopAll = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(console.error);
    }
    audioContextRef.current = null;

    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    
    setIsActive(false);
  };

  useEffect(() => {
    startSession();
    return () => stopAll();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-zinc-200 dark:border-white/5"
      >
        <div className="p-8 flex flex-col items-center text-center space-y-6">
          <div className="flex justify-between w-full items-center mb-2">
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">Live Conversation</h2>
            <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-full transition-colors">
              <X size={24} className="text-zinc-500 dark:text-zinc-400" />
            </button>
          </div>

          <div className="relative">
            <div className={cn(
              "w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500",
              isActive ? "bg-indigo-600 scale-110 shadow-lg shadow-indigo-200 dark:shadow-indigo-500/20" : "bg-zinc-100 dark:bg-zinc-800"
            )}>
              {isActive ? (
                <div className="flex items-end gap-1 h-8">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [8, 32, 8] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                      className="w-1.5 bg-white rounded-full"
                    />
                  ))}
                </div>
              ) : (
                <MicOff size={48} className="text-zinc-400 dark:text-zinc-600" />
              )}
            </div>
            {isActive && (
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-full bg-indigo-400 dark:bg-indigo-500 -z-10"
              />
            )}
          </div>

          <div className="space-y-2">
            <p className="text-lg font-medium text-zinc-700 dark:text-zinc-200">
              {isConnecting ? "Connecting to AI..." : isActive ? "Listening & Speaking..." : "Ready"}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 px-4">
              Speak naturally in English. I'll listen and respond instantly.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm w-full border border-red-100 dark:border-red-500/20">
              {error}
            </div>
          )}

          <button 
            onClick={onClose}
            className="w-full py-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold rounded-2xl transition-all"
          >
            End Session
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
