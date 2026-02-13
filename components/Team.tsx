
import React from 'react';
import { User, Shield, Zap, Globe } from 'lucide-react';

const team = [
  {
    name: 'ELIAS VANCE',
    role: 'Lead Systems Architect',
    spec: 'Advanced Computational Fluid Dynamics',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=500&auto=format&fit=crop',
    icon: <Shield size={16} />
  },
  {
    name: 'SARAH KODA',
    role: 'Senior FEA Specialist',
    spec: 'Structural Integrity & Modal Analysis',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=500&auto=format&fit=crop',
    icon: <Zap size={16} />
  },
  {
    name: 'MARCUS THORNE',
    role: 'Robotics Integration',
    spec: 'Kinetic Hardware & Multi-Axis Control',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=500&auto=format&fit=crop',
    icon: <Globe size={16} />
  }
];

export const Team: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-24 bg-black relative">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 reveal">
        <div className="max-w-2xl">
          <div className="text-[#ccff00] font-mono text-xs uppercase tracking-[0.4em] mb-4">Engineering Council</div>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            Human<br /><span className="text-outline">Intelligence.</span>
          </h2>
        </div>
        <div className="text-zinc-500 font-mono text-xs text-right hidden lg:block uppercase tracking-widest leading-loose">
          [STAFFING_LEVEL: OPTIMAL]<br />
          [EXPERTISE_QUOTIENT: 98.2%]<br />
          [OPERATIONAL_READY: TRUE]
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {team.map((member, idx) => (
          <div 
            key={idx} 
            className="reveal group bg-zinc-950 border border-zinc-900 p-1 hover:border-[#ccff00] transition-colors duration-500"
            style={{ transitionDelay: `${idx * 0.1}s` }}
          >
            <div className="relative aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
              />
              
              {/* Technical Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute top-4 left-4 font-mono text-[8px] text-[#ccff00] uppercase tracking-widest bg-black/80 px-2 py-1 border border-[#ccff00]/20">
                AUTH_ID: {member.name.substring(0, 3)}_{idx + 10}
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#ccff00]">
                    {member.icon}
                    <span className="font-mono text-[10px] uppercase tracking-widest">Active_Duty</span>
                  </div>
                  <div className="w-12 h-1 bg-[#ccff00] group-hover:w-full transition-all duration-500" />
                </div>
                <div className="p-2 border border-zinc-800 bg-black/50 backdrop-blur-sm">
                  <User size={14} className="text-zinc-500" />
                </div>
              </div>

              {/* Crosshair Animation */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-1/2 left-0 w-full h-px bg-[#ccff00]/20" />
                <div className="absolute top-0 left-1/2 w-px h-full bg-[#ccff00]/20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-[#ccff00]/40 rounded-full animate-ping" />
              </div>
            </div>

            <div className="p-8 space-y-4">
              <h3 className="text-2xl font-black uppercase tracking-tighter">{member.name}</h3>
              <div className="space-y-1">
                <div className="text-[#ccff00] font-mono text-[10px] uppercase tracking-widest">{member.role}</div>
                <div className="text-zinc-500 text-xs leading-relaxed">{member.spec}</div>
              </div>
              
              <div className="pt-4 border-t border-zinc-900 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-mono text-[9px] text-zinc-700 uppercase">Comm_Access: Open</span>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};