
import React, { useState, useEffect } from 'react';
import { Activity, Layers, PenTool, Database, Box } from 'lucide-react';

const services = [
  {
    id: 'cad',
    icon: <PenTool size={24} />,
    title: "CAD Synthesis",
    desc: "Sub-millimeter precise 3D modeling and assembly for complex mechanical systems.",
    metrics: ["0.001mm Tolerance", "NURBS/ParaSolid", "BIM Support"],
    diagram: (active: boolean) => (
      <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
        <rect x="50" y="50" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="0.5" className={active ? "animate-pulse" : ""} />
        <line x1="50" y1="50" x2="80" y2="20" stroke="currentColor" strokeWidth="0.5" />
        <line x1="150" y1="50" x2="180" y2="20" stroke="currentColor" strokeWidth="0.5" />
        <line x1="150" y1="150" x2="180" y2="120" stroke="currentColor" strokeWidth="0.5" />
        <rect x="80" y="20" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 2" />
        {active && <circle cx="100" cy="100" r="2" fill="#ccff00" className="animate-ping" />}
        <path d="M20,180 L180,180 M20,185 L20,175 M180,185 L180,175" stroke="currentColor" strokeWidth="0.5" />
        <text x="100" y="195" fontSize="8" fill="currentColor" textAnchor="middle" className="font-mono">DIM_X: 150.00mm</text>
      </svg>
    )
  },
  {
    id: 'fea',
    icon: <Activity size={24} />,
    title: "FEA Analysis",
    desc: "Stress, thermal, and fluid dynamics simulation to optimize structural integrity.",
    metrics: ["Static Stress", "Modal Analysis", "CFD Ready"],
    diagram: (active: boolean) => (
      <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id="stressGradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#1a1a1a">
              {active && <animate attributeName="stop-color" values="#1a1a1a;#333333;#1a1a1a" dur="3s" repeatCount="indefinite" />}
            </stop>
            <stop offset="50%" stopColor="#ccff00">
              {active && <animate attributeName="offset" values="30%;70%;30%" dur="4s" repeatCount="indefinite" />}
            </stop>
            <stop offset="100%" stopColor="#ff4400">
              {active && <animate attributeName="stop-color" values="#ff4400;#ffaa00;#ff4400" dur="2s" repeatCount="indefinite" />}
            </stop>
          </linearGradient>
        </defs>
        <path d="M40,150 Q100,20 160,150" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M40,150 Q100,20 160,150" fill="url(#stressGradient)" opacity={active ? 0.8 : 0.2} style={{ transition: 'opacity 0.5s ease' }} />
        {active && [100, 80, 60, 40].map((y, i) => (
          <g key={y}>
            <line x1="70" y1={y} x2="130" y2={y} stroke="#ccff00" strokeWidth="0.5" opacity="0.2" />
            <circle cx="100" cy={y} r="1" fill="#ff4400" className="animate-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
          </g>
        ))}
        <text x="100" y="180" fontSize="8" fill="currentColor" textAnchor="middle" className="font-mono">MAX_STRESS: 450 MPa</text>
      </svg>
    )
  },
  {
    id: 'proto',
    icon: <Layers size={24} />,
    title: "Prototyping",
    desc: "Rapid additive and subtractive manufacturing strategy for functional testing.",
    metrics: ["CNC Paths", "SLS/SLA Optimization", "Dfm Logs"],
    diagram: (active: boolean) => (
      <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
        {[140, 130, 120, 110, 100].map((y, i) => (
          <rect 
            key={y} 
            x="60" y={y} width="80" height="8" 
            fill="none" stroke="currentColor" strokeWidth="0.5" 
            className={active && i === 4 ? "animate-bounce" : ""}
            style={{ opacity: 1 - (i * 0.15) }}
          />
        ))}
        <path d="M100,20 L100,80 M90,80 L110,80" stroke="#ccff00" strokeWidth="1" className={active ? "animate-pulse" : ""} />
        <text x="100" y="180" fontSize="8" fill="currentColor" textAnchor="middle" className="font-mono">LAYER_HT: 0.1mm</text>
      </svg>
    )
  },
  {
    id: 'plm',
    icon: <Database size={24} />,
    title: "PLM Systems",
    desc: "Product Lifecycle Management and technical documentation for scaling production.",
    metrics: ["ISO 9001", "Revision Lock", "Asset Vault"],
    diagram: (active: boolean) => (
      <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
        <circle cx="100" cy="100" r="10" fill="none" stroke="#ccff00" strokeWidth="1" className={active ? "animate-[ping_3s_linear_infinite]" : "opacity-20"} />
        {[0, 72, 144, 216, 288].map((angle, i) => {
          const x = 100 + 60 * Math.cos((angle * Math.PI) / 180);
          const y = 100 + 60 * Math.sin((angle * Math.PI) / 180);
          return (
            <g key={angle}>
              <line x1="100" y1="100" x2={x} y2={y} stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
              <circle 
                cx={x} cy={y} r="5" 
                fill="none" 
                stroke={active ? "#ccff00" : "currentColor"} 
                strokeWidth="0.5" 
                className={active ? "animate-[pulse_2s_ease-in-out_infinite]" : "opacity-40"}
                style={{ animationDelay: `${i * 0.4}s` }}
              />
              {active && (
                <circle 
                  cx={x} cy={y} r="2" 
                  fill="#ccff00" 
                  className="animate-pulse"
                />
              )}
            </g>
          );
        })}
        <text x="100" y="180" fontSize="8" fill="currentColor" textAnchor="middle" className="font-mono">ASSET_NODES: 512</text>
      </svg>
    )
  }
];

export const Capabilities: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [displayId, setDisplayId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (activeId !== displayId) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayId(activeId);
        setIsTransitioning(false);
      }, 300); // Fast enough for cross-fade feel
      return () => clearTimeout(timer);
    }
  }, [activeId, displayId]);

  const activeService = services.find(s => s.id === displayId);

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveId(id);
    }
  };

  return (
    <section 
      className="py-32 px-6 md:px-24 bg-black relative"
      aria-labelledby="capabilities-heading"
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 reveal">
        <div className="max-w-2xl">
          <div className="text-[#ccff00] font-mono text-xs uppercase tracking-[0.4em] mb-4">Functional Modules</div>
          <h2 id="capabilities-heading" className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            Core<br /><span className="text-outline">Capabilities.</span>
          </h2>
        </div>
        <div className="text-zinc-500 font-mono text-xs text-right hidden lg:block uppercase tracking-widest leading-loose" aria-hidden="true">
          [PROCESS_FLOW_VERSION_4.0]<br />
          [SENSORS_ACTIVE_NOMINAL]<br />
          [DATA_STREAM_SYNCHRONIZED]
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Capability Cards */}
        <div 
          className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900"
          role="list"
          aria-label="Engineering services"
        >
          {services.map((s, i) => (
            <div 
              key={s.id} 
              role="listitem"
              tabIndex={0}
              onMouseEnter={() => setActiveId(s.id)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(s.id)}
              onBlur={() => setActiveId(null)}
              onKeyDown={(e) => handleKeyDown(e, s.id)}
              aria-expanded={activeId === s.id}
              aria-controls="capability-viewport"
              className={`group bg-black p-10 hover:bg-zinc-950 transition-all duration-500 cursor-pointer relative overflow-hidden h-full focus:outline-none focus:z-20 ${
                activeId === s.id 
                ? 'bg-zinc-950 ring-1 ring-[#ccff00] shadow-[0_0_30px_rgba(204,255,0,0.15)] z-20 scale-[1.01]' 
                : 'z-10'
              }`}
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-[#ccff00] transition-transform origin-left duration-500 ${activeId === s.id ? 'scale-x-100' : 'scale-x-0'}`} />
              
              <div className={`text-[#ccff00] mb-8 transition-transform duration-500 flex justify-between items-start ${activeId === s.id ? '-translate-y-2' : ''}`}>
                {s.icon}
                <span className="font-mono text-[9px] opacity-20" aria-hidden="true">MOD_{i+1}</span>
              </div>
              
              <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter">{s.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">{s.desc}</p>
              
              <ul className="space-y-2 mb-8" aria-label={`Metrics for ${s.title}`}>
                {s.metrics.map((m, idx) => (
                  <li key={idx} className={`flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest transition-colors ${activeId === s.id ? 'text-zinc-400' : 'text-zinc-700'}`}>
                    <div className={`w-1 h-1 rounded-full transition-colors ${activeId === s.id ? 'bg-[#ccff00]' : 'bg-zinc-800'}`} />
                    {m}
                  </li>
                ))}
              </ul>

              {/* Mobile Diagram */}
              <div className="lg:hidden w-full aspect-video border border-zinc-900 bg-zinc-950/50 p-4 mt-4" aria-hidden="true">
                {s.diagram(activeId === s.id)}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Interactive Diagram Viewer */}
        <div 
          className="hidden lg:block lg:col-span-4 sticky top-32 h-[600px] reveal reveal-right" 
          style={{ transitionDelay: '0.4s' }}
          id="capability-viewport"
          aria-live="polite"
        >
          <div className="w-full h-full border border-zinc-800 bg-zinc-950 p-8 flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-10" aria-hidden="true" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="text-[#ccff00] font-mono text-[10px] uppercase tracking-widest mb-1">Live Viewport</div>
                  <div className="text-white font-black text-xl tracking-tighter uppercase">
                    {activeService ? activeService.title : "Select Module"}
                  </div>
                </div>
                <div className="p-2 border border-zinc-800" aria-hidden="true">
                  <Activity size={16} className={`text-[#ccff00] ${activeId ? 'animate-pulse' : 'opacity-20'}`} />
                </div>
              </div>

              <div 
                className="flex-1 border border-zinc-900 bg-black flex items-center justify-center p-12 relative overflow-hidden transition-all duration-700 group"
                role="img"
                aria-label={activeService ? `Technical diagram demonstrating ${activeService.title}` : "System waiting for module selection"}
              >
                {/* Scanning line animation */}
                {activeId && (
                  <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                    <div className="w-full h-px bg-[#ccff00]/30 shadow-[0_0_15px_rgba(204,255,0,0.5)] absolute top-0 animate-[scan_3s_linear_infinite]" />
                  </div>
                )}

                <div className={`w-full h-full text-[#ccff00] transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
                  {activeService ? (
                    activeService.diagram(true)
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-800 text-center space-y-4">
                      <div className="w-24 h-24 border border-zinc-900 flex items-center justify-center opacity-20">
                        <Box size={40} />
                      </div>
                      <p className="font-mono text-[10px] uppercase tracking-widest">Initialization Required</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4" aria-hidden="true">
                <div className="border border-zinc-900 p-4 space-y-2">
                  <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Resolution</div>
                  <div className="text-xs font-bold font-mono">3840 x 2160 PX</div>
                </div>
                <div className="border border-zinc-900 p-4 space-y-2">
                  <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Frame Rate</div>
                  <div className="text-xs font-bold font-mono">144 FPS</div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono text-[8px] text-zinc-700 uppercase tracking-widest" aria-hidden="true">
                <span>COORD: 37.7749N, 122.4194W</span>
                <span>TIME: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(600px); }
        }
      `}</style>
    </section>
  );
};
