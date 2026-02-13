
import React, { useState, useEffect } from 'react';
import { Cpu, Target, Activity } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export const Hero: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState({ cpu: 14.2, net: 420, temp: 38.5 });

  // Real-time metrics simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.max(0.5, Math.min(99.8, prev.cpu + (Math.random() - 0.5) * 8)),
        net: Math.max(50, Math.min(1200, prev.net + (Math.random() - 0.5) * 150)),
        temp: Math.max(32, Math.min(78, prev.temp + (Math.random() - 0.5) * 3)),
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const generateImage = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ 
              text: 'Ultra high detailed technical CAD blueprint of a futuristic hypersonic jet engine, glowing neon yellow lines on deep black background, technical annotations, hyper-realistic mechanical assembly, wireframe' 
            }]
          }
        });

        const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
        if (part?.inlineData) {
          setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
        }
      } catch (e) {
        console.error("Failed to generate hero image", e);
      } finally {
        setIsLoading(false);
      }
    };

    generateImage();
  }, []);

  return (
    <section className="relative min-h-[100vh] flex flex-col justify-center px-6 md:px-24 pt-32 overflow-hidden border-b border-zinc-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-7 z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 reveal active">
            <div className="flex items-center gap-4">
              <span className="bg-[#ccff00] text-black px-2 py-0.5 text-[10px] font-black uppercase tracking-widest">
                Live Connection
              </span>
              <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-300 uppercase">
                <Cpu size={12} className="text-[#ccff00]" />
                SYS_ID: ALPHA_01_X
              </div>
            </div>
            
            <div className="flex items-center gap-6 font-mono text-[9px] text-zinc-500 uppercase md:border-l md:border-zinc-800 md:pl-6">
              <div className="flex items-center gap-2">
                <Activity size={10} className="text-[#ccff00]/50" />
                <span>CPU <span className="text-white tabular-nums">{metrics.cpu.toFixed(1)}%</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span>NET <span className="text-white tabular-nums">{metrics.net.toFixed(0)}MB/S</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span>TMP <span className="text-white tabular-nums">{metrics.temp.toFixed(1)}°C</span></span>
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase mb-10 reveal active" style={{ transitionDelay: '0.1s' }}>
            Logic<br />
            <span className="text-outline">Defining</span><br />
            Form.
          </h1>

          <div className="max-w-xl reveal active" style={{ transitionDelay: '0.2s' }}>
            <p className="text-zinc-400 text-lg md:text-2xl font-medium leading-tight border-l-4 border-[#ccff00] pl-6 py-2">
              Transforming theoretical mechanics into industrial realities through advanced 
              computational synthesis and multi-axis engineering.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 relative reveal active" style={{ transitionDelay: '0.4s' }}>
          <div className="aspect-square relative border border-zinc-800 bg-zinc-950 p-4">
            {/* Image Frame Elements */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#ccff00]" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#ccff00]" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#ccff00]" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#ccff00]" />
            
            <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
              {isLoading ? (
                <div className="flex flex-col items-center gap-4 text-zinc-700">
                  <div className="w-12 h-12 border-2 border-zinc-800 border-t-[#ccff00] rounded-full animate-spin" />
                  <span className="font-mono text-[10px] animate-pulse">GENERATING_BLUEPRINT_X01...</span>
                </div>
              ) : imageUrl ? (
                <>
                  <img src={imageUrl} alt="Technical Blueprint" className="w-full h-full object-cover opacity-80 mix-blend-screen" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                </>
              ) : (
                <div className="text-zinc-800 font-black text-4xl text-center uppercase">Blueprint_Data_Missing</div>
              )}
            </div>
            
            {/* Metadata Overlay */}
            <div className="absolute bottom-8 right-8 text-right font-mono text-[9px] text-[#ccff00] space-y-1">
              <div>RENDER_QUALITY: ULTRA</div>
              <div>AXIS_SYMMETRY: ENABLED</div>
              <div className="flex justify-end gap-2 items-center">
                <Target size={10} />
                <span>ACTIVE_LOCK</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-zinc-600">
        <span className="font-mono text-[10px] uppercase tracking-widest">Initialization_Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-zinc-800 to-[#ccff00] animate-bounce" />
      </div>
    </section>
  );
};
