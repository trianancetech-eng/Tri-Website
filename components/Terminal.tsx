
import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon, Send, ShieldAlert, UserCheck } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { auth } from '../firebase';
import { signInAnonymously, signOut, onAuthStateChanged, User } from 'firebase/auth';

interface TerminalProps {
  onClose: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['SYS_LOGIN: SUCCESSFUL', 'KERNEL_LOAD: v4.0.2', 'UPLINK: ACTIVE', 'TYPE "HELP" FOR COMMANDS']);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setHistory(prev => [...prev, `[SECURE_AUTH] USER_VERIFIED: ${user.uid.substring(0, 8)}...`]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const cmd = input.toUpperCase().trim();
    setHistory(prev => [...prev, `> ${input}`]);
    setInput('');

    if (cmd === 'HELP') {
      setHistory(prev => [...prev, 
        'SYSTEM_HELP_MANUAL:', 
        '- ANALYZE [topic]: Generate technical specifications', 
        '- AUTH LOGIN: Initialize anonymous session',
        '- AUTH STATUS: Verify security credentials',
        '- AUTH LOGOUT: Terminate session',
        '- STATUS: Display kernel and hardware metrics', 
        '- LOGS: View simulated engineering history',
        '- CLEAR: Reset interface buffer', 
        '- EXIT: Terminate remote connection'
      ]);
      return;
    }

    if (cmd === 'AUTH LOGIN') {
      setIsProcessing(true);
      try {
        await signInAnonymously(auth);
        setHistory(prev => [...prev, 'FIREBASE_AUTH: SESSION_ESTABLISHED', 'UID: ' + auth.currentUser?.uid]);
      } catch (err) {
        setHistory(prev => [...prev, 'FIREBASE_AUTH_ERROR: HANDSHAKE_FAILED']);
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    if (cmd === 'AUTH STATUS') {
      if (currentUser) {
        setHistory(prev => [...prev, `STATUS: AUTHENTICATED`, `UID: ${currentUser.uid}`, `PROVIDER: ANONYMOUS`]);
      } else {
        setHistory(prev => [...prev, 'STATUS: UNAUTHENTICATED', 'RUN "AUTH LOGIN" TO CONNECT']);
      }
      return;
    }

    if (cmd === 'AUTH LOGOUT') {
      await signOut(auth);
      setHistory(prev => [...prev, 'FIREBASE_AUTH: SESSION_TERMINATED']);
      return;
    }

    if (cmd === 'CLEAR') {
      setHistory(['TERMINAL BUFFER PURGED', 'WAITING FOR INPUT...']);
      return;
    }

    if (cmd === 'EXIT') {
      onClose();
      return;
    }

    if (cmd === 'LOGS') {
       setHistory(prev => [...prev, 
        '[2024-05-12] Project AEROSPACE-X stress test completed. Success rate: 98.4%',
        '[2024-06-01] New kinetic core blueprint drafted. Awaiting peer review.',
        '[2024-07-20] System maintenance: Kernel updated to v4.0.2.'
      ]);
      return;
    }

    if (cmd === 'STATUS') {
      setHistory(prev => [...prev, 
        'CPU: 0.2% IDLE | MEM: 4.82GB/16GB | NET: 1.2GB/s', 
        'ENCRYPTION: AES-256-GCM | STATUS: NOMINAL',
        `FIREBASE: ${currentUser ? 'CONNECTED' : 'DISCONNECTED'}`
      ]);
      return;
    }

    // Start Gemini AI Brainstorming
    setIsProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `You are the Trianance Central Processing Unit. Answer technical engineering questions with extreme precision, brevity, and a high-tech "command-line" tone. 
        Question: "${input}"
        Provide your response as a series of short, technical bullet points or log lines. Use uppercase where appropriate for keywords. No pleasantries.`,
      });
      
      const reply = response.text || 'ERROR: UNKNOWN UPLINK ERROR - PACKET LOSS DETECTED';
      setHistory(prev => [...prev, ...reply.split('\n').filter(l => l.trim())]);
    } catch (err) {
      setHistory(prev => [...prev, 'CRITICAL ERROR: AI_COPROCESSOR_OFFLINE']);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-5xl bg-zinc-950 border border-[#ccff00]/20 shadow-2xl shadow-[#ccff00]/10 flex flex-col h-[85vh] overflow-hidden relative">
        {/* Terminal Header */}
        <div className="bg-[#ccff00] text-black px-6 py-3 flex justify-between items-center z-20">
          <div className="flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.3em]">
            <TerminalIcon size={14} />
            TRIANANCE - REMOTE_ACCESS_SHELL
          </div>
          <div className="flex items-center gap-6">
            {currentUser && (
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-black/70">
                <UserCheck size={12} />
                SECURE_ID: {currentUser.uid.substring(0, 8)}
              </div>
            )}
            <span className="hidden md:inline font-mono text-[9px] uppercase tracking-widest opacity-60">ENCRYPTION: ACTIVE</span>
            <button onClick={onClose} className="hover:rotate-90 transition-transform p-1">
              <X size={18} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Terminal History */}
        <div 
          ref={scrollRef}
          className="flex-1 p-8 font-mono text-sm md:text-base overflow-y-auto space-y-3 text-[#ccff00]/90 bg-black/50"
        >
          {history.map((line, i) => (
            <div key={i} className={`flex gap-4 ${line.startsWith('>') ? 'text-white border-l-2 border-[#ccff00] pl-4' : 'opacity-80'}`}>
              <span className="select-none opacity-30 text-[10px] mt-1">[{i.toString().padStart(3, '0')}]</span>
              <span className="whitespace-pre-wrap">{line}</span>
            </div>
          ))}
          {isProcessing && (
            <div className="flex items-center gap-3 text-white">
               <div className="w-4 h-4 bg-[#ccff00] animate-ping rounded-full" />
               <span className="animate-pulse">CPU_ANALYZING_QUERY...</span>
            </div>
          )}
        </div>

        {/* Terminal Input */}
        <form onSubmit={handleCommand} className="p-8 bg-zinc-950 border-t border-zinc-900 flex gap-6 items-center">
          <div className="flex items-center gap-2">
            <ShieldAlert size={14} className="text-[#ccff00]" />
            <span className="text-[#ccff00] font-mono text-xs">ROOT@TRIANANCE:~$</span>
          </div>
          <input 
            autoFocus
            type="text"
            className="flex-1 bg-transparent outline-none font-mono text-white uppercase placeholder:text-zinc-800 text-lg"
            placeholder="AWAITING COMMAND..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" disabled={isProcessing} className="p-2 hover:bg-[#ccff00]/10 rounded-full transition-colors">
            <Send size={20} className={isProcessing ? 'text-zinc-800' : 'text-[#ccff00]'} />
          </button>
        </form>
      </div>
    </div>
  );
};
