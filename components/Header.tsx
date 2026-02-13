
import React from 'react';
import { Settings } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-8 md:px-12 md:py-10 mix-blend-difference">
      <div className="font-black text-xl tracking-tighter uppercase">
        Trianance
      </div>
      
      <button 
        onClick={onMenuClick}
        className="group relative flex items-center gap-2 bg-[#ccff00] text-black px-4 py-1.5 font-bold uppercase text-xs tracking-widest hover:bg-white transition-colors duration-300"
      >
        <span>Menu</span>
        <Settings size={14} className="group-hover:rotate-180 transition-transform duration-500" />
      </button>
    </nav>
  );
};