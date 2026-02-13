
import React from 'react';

const projects = [
  { 
    id: '01', 
    title: 'AEROSPACE-X', 
    alignment: 'left',
    meta: { type: 'STRUCTURAL', revision: 'A-22', status: 'LOCKED' } 
  },
  { 
    id: '02', 
    title: 'CORE-KINETICS', 
    alignment: 'right',
    meta: { type: 'MECHANICAL', revision: 'G-14', status: 'PENDING' } 
  },
  { 
    id: '03', 
    title: 'ISO-METRIC', 
    alignment: 'left',
    meta: { type: 'COMPUTATIONAL', revision: 'V-09', status: 'ACTIVE' } 
  },
];

export const EngineeringLog: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-20 bg-[#0a0a0a]">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-32 border-b border-zinc-800 pb-12 gap-8 reveal">
        <div>
          <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-4">
            Archive.01
          </h2>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em]">
            History of mechanical computations and blueprints
          </p>
        </div>
        <div className="flex items-center gap-4 text-[#ccff00] font-mono text-sm">
          <div className="w-12 h-[1px] bg-[#ccff00]" />
          <span>V.2024.REV_04_FINAL</span>
        </div>
      </div>

      <div className="space-y-40">
        {projects.map((project, idx) => (
          <div 
            key={project.id}
            className={`reveal ${project.alignment === 'right' ? 'reveal-right' : 'reveal-left'} group relative flex flex-col ${project.alignment === 'right' ? 'items-end' : 'items-start'}`}
            style={{ transitionDelay: `${idx * 0.2}s` }}
          >
            <div className={`relative max-w-full ${project.alignment === 'right' ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center gap-4 mb-4 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                <span className="text-[#ccff00]">{project.id}</span>
                <span className="w-8 h-[1px] bg-zinc-800" />
                <span>TYPE: {project.meta.type}</span>
                <span className="hidden md:inline">|</span>
                <span className="hidden md:inline">REV: {project.meta.revision}</span>
                <span className="hidden md:inline">|</span>
                <span className={`hidden md:inline ${project.meta.status === 'LOCKED' ? 'text-blue-500' : 'text-[#ccff00]'}`}>
                  STATUS: {project.meta.status}
                </span>
              </div>
              
              <h3 className="text-5xl md:text-[10rem] font-black leading-none tracking-tighter uppercase transition-all duration-700 group-hover:text-[#ccff00] group-hover:translate-x-4 cursor-default">
                {project.title}
              </h3>
              
              <div className="mt-8 flex gap-4 overflow-hidden h-0 group-hover:h-auto transition-all duration-500">
                <div className="px-3 py-1 border border-zinc-800 text-zinc-500 text-[10px] uppercase font-bold tracking-widest cursor-pointer hover:bg-zinc-900 transition-colors">
                  View Specifications
                </div>
                <div className="px-3 py-1 border border-zinc-800 text-zinc-500 text-[10px] uppercase font-bold tracking-widest cursor-pointer hover:bg-zinc-900 transition-colors">
                  Download CAD
                </div>
              </div>
              
              <div className="mt-4 w-full h-px bg-zinc-900 group-hover:bg-[#ccff00]/30 transition-colors duration-500" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
