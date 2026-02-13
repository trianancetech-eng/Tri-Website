
import React from 'react';

const clients = [
  { name: 'AEROSPACE' },
  { name: 'QUANTUM' },
  { name: 'ORBITAL' },
  { name: 'KINETIC' },
  { name: 'TITAN' },
];

export const Clients: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-24 bg-black border-b border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-16 reveal">
        {/* Left Side Labels */}
        <div className="flex-shrink-0 space-y-4">
          <div className="text-[#ccff00] font-mono text-[10px] uppercase tracking-[0.4em]">
            Strategic Partnerships
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">
            Trusted_By
          </h2>
        </div>
        
        {/* Right Side Names Grid */}
        <div className="flex-1 w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-8 md:gap-x-24 md:gap-y-12">
            {clients.map((client, idx) => (
              <div 
                key={idx} 
                className="group cursor-default transition-all duration-500"
              >
                <div className="relative">
                  <span className="block font-black text-2xl md:text-4xl tracking-tighter text-zinc-600 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300 uppercase">
                    {client.name}
                  </span>
                  
                  {/* Subtle underline that glows lime on hover */}
                  <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#ccff00] group-hover:w-full transition-all duration-500 shadow-[0_0_10px_#ccff00]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Indicators (optional tech detail) */}
        <div className="hidden xl:block font-mono text-[9px] text-zinc-800 uppercase tracking-widest leading-loose">
          [PARTNERSHIP_STATUS: ACTIVE]<br />
          [COMM_UPLINK: SECURED]
        </div>
      </div>
    </section>
  );
};
