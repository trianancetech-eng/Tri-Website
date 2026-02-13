
import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const statusText = "System Status: Synchronized";

  return (
    <footer className="px-6 md:px-12 py-8 border-t border-zinc-900 bg-black">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-[#ccff00] animate-pulse rounded-sm" />
          <span className="flex">
            {statusText.split('').map((char, i) => (
              <span 
                key={i} 
                className="wave-char" 
                style={{ 
                  animationDelay: `${i * 0.05}s`,
                  whiteSpace: char === ' ' ? 'pre' : 'normal'
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </div>
        
        <div>
          © 2024 TRIANANCE ENGINEERING. ALL PARAMETERS LOCKED.
        </div>

        <div className="flex items-center gap-2">
          <span>Engineered For Accuracy</span>
          <ShieldCheck size={12} className="text-[#ccff00]" />
        </div>
      </div>
    </footer>
  );
};