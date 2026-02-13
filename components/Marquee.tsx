
import React from 'react';

const keywords = [
  'MODELING', 'PROTOTYPING', 'ENGINEERING', 'SIMULATION', 'DYNAMICS', 
  'AEROSPACE', 'ROBOTICS', 'STRUCTURAL', 'CAD/CAM', 'FEA'
];

export const Marquee: React.FC = () => {
  return (
    <div className="bg-[#ccff00] py-6 md:py-10 border-y border-black overflow-hidden select-none">
      <div className="marquee-container">
        {[0, 1].map((i) => (
          <div key={i} className="marquee-content gap-8 md:gap-16 px-4 md:px-8">
            {keywords.map((word, idx) => (
              <div key={idx} className="flex items-center gap-8 md:gap-16">
                <span className="text-black text-4xl md:text-8xl font-black tracking-tighter leading-none italic">
                  {word}
                </span>
                <div className="w-3 h-3 md:w-6 md:h-6 rounded-full bg-zinc-900/20" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
