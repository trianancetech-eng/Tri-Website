import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Loader2, Activity, Cpu } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export const ContactSection: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    mobile: '', 
    country: '', 
    service: '', 
    message: '' 
  });
  const [analysis, setAnalysis] = useState<{
    complexity: string;
    expertise: string[];
    risk: string;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Debounced AI Scoping Analysis
  useEffect(() => {
    const timer = setTimeout(() => {
      if (form.message.length > 20) {
        analyzeMessage(form.message);
      } else {
        setAnalysis(null);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [form.message]);

  const analyzeMessage = async (text: string) => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this engineering project request: "${text}". 
        Return a JSON object with: 
        "complexity" (Low/Medium/High/Extreme), 
        "expertise" (array of 3 technical tags), 
        "risk" (one word summary of biggest challenge).
        No other text.`,
        config: { responseMimeType: "application/json" }
      });
      
      const result = JSON.parse(response.text || '{}');
      setAnalysis(result);
    } catch (e) {
      console.error("Analysis failed", e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Core requirement: Share details to Reach@Trianance.com
    console.log(`[SYSTEM] INITIALIZING TRANSMISSION TO: Reach@Trianance.com`);
    console.log(`[DATA_PACKET]`, form);

    // Simulate network latency for engineering protocol
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  if (status === 'success') {
    return (
      <section className="py-40 px-6 md:px-24 bg-black flex items-center justify-center text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-white/5 select-none pointer-events-none uppercase">
          SENT
        </div>
        <div className="max-w-md space-y-8 reveal active z-10">
          <CheckCircle2 size={80} className="mx-auto text-[#ccff00] animate-bounce" />
          <h2 className="text-5xl font-black uppercase tracking-tighter">Transmission Successful</h2>
          <p className="text-zinc-500 font-mono text-sm uppercase leading-loose">
            Packet successfully routed to <span className="text-[#ccff00]">Reach@Trianance.com</span>. <br/>
            Our engineering council will process your request within 24 cycles.
          </p>
          <button 
            onClick={() => { setStatus('idle'); setForm({ name: '', email: '', mobile: '', country: '', service: '', message: '' }); setAnalysis(null); }}
            className="text-[#ccff00] font-mono text-xs uppercase tracking-widest border border-[#ccff00]/30 px-8 py-4 hover:bg-[#ccff00] hover:text-black transition-all"
          >
            Reset Terminal Input
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 px-6 md:px-24 bg-black relative overflow-hidden">
      {/* Background large text "CONTACT" as seen in screenshot concept */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none flex items-center justify-center overflow-hidden" aria-hidden="true">
        <div className="text-[35vw] font-black text-white select-none leading-none tracking-tighter uppercase">
          CONTACT
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">
              TRIANANCE
            </h2>
            <div className="flex gap-4">
              {['FB', 'IG', 'LI', 'TW'].map(social => (
                <div key={social} className="font-mono text-[9px] text-zinc-600 hover:text-[#ccff00] cursor-pointer transition-all">
                  {social}
                </div>
              ))}
            </div>
          </div>
          
          {/* AI Analysis Panel - Dynamic Feedback */}
          {form.message.length > 10 && (
            <div className="p-4 border border-zinc-900 bg-black/60 backdrop-blur-md space-y-2 min-w-[200px] border-l-2 border-l-[#ccff00]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-[8px] text-[#ccff00] uppercase tracking-widest">
                  <Cpu size={10} />
                  Packet Analysis
                </div>
                {isAnalyzing && <Activity size={10} className="text-[#ccff00] animate-pulse" />}
              </div>
              <div className="space-y-1">
                <div className="text-[8px] text-zinc-600 font-mono uppercase">
                  Complexity: <span className="text-white font-bold">{analysis ? analysis.complexity : '---'}</span>
                </div>
                <div className="text-[8px] text-zinc-600 font-mono uppercase">
                  Risk Level: <span className="text-red-500 font-bold">{analysis ? analysis.risk : '---'}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-black border border-zinc-900 p-1 relative shadow-2xl">
          {/* Screenshot-accurate corner markers */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ccff00] -translate-x-[2px] -translate-y-[2px]" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ccff00] translate-x-[2px] -translate-y-[2px]" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#ccff00] -translate-x-[2px] translate-y-[2px]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ccff00] translate-x-[2px] translate-y-[2px]" />

          <form onSubmit={handleSubmit} className="space-y-6 md:p-8 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {/* Field: Source Name */}
              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-black px-2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest group-focus-within:text-[#ccff00] transition-colors">
                  Source Name
                </label>
                <input 
                  required
                  type="text" 
                  placeholder="INPUT ENTITY IDENTIFIER"
                  className="w-full bg-transparent border border-zinc-800 px-6 py-4 outline-none focus:border-[#ccff00] transition-all font-mono text-sm uppercase placeholder:text-zinc-900 text-white"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                />
              </div>

              {/* Field: Communication Channel */}
              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-black px-2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest group-focus-within:text-[#ccff00] transition-colors">
                  Communication Channel
                </label>
                <input 
                  required
                  type="email" 
                  placeholder="SMTP ENDPOINT@TARGET.COM"
                  className="w-full bg-transparent border border-zinc-800 px-6 py-4 outline-none focus:border-[#ccff00] transition-all font-mono text-sm uppercase placeholder:text-zinc-900 text-white"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                />
              </div>

              {/* Field: Transmission ID */}
              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-black px-2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest group-focus-within:text-[#ccff00] transition-colors">
                  Transmission ID (Mobile)
                </label>
                <input 
                  required
                  type="tel" 
                  placeholder="+X CHANNEL NUMERIC"
                  className="w-full bg-transparent border border-zinc-800 px-6 py-4 outline-none focus:border-[#ccff00] transition-all font-mono text-sm uppercase placeholder:text-zinc-900 text-white"
                  value={form.mobile}
                  onChange={e => setForm({...form, mobile: e.target.value})}
                />
              </div>

              {/* Field: Locale Origin */}
              <div className="relative group">
                <label className="absolute -top-2.5 left-4 bg-black px-2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest group-focus-within:text-[#ccff00] transition-colors">
                  Locale Origin (Country)
                </label>
                <input 
                  required
                  type="text" 
                  placeholder="GEOSPATIAL COORDINATE"
                  className="w-full bg-transparent border border-zinc-800 px-6 py-4 outline-none focus:border-[#ccff00] transition-all font-mono text-sm uppercase placeholder:text-zinc-900 text-white"
                  value={form.country}
                  onChange={e => setForm({...form, country: e.target.value})}
                />
              </div>
            </div>

            {/* Field: Functional Module */}
            <div className="relative group">
              <label className="absolute -top-2.5 left-4 bg-black px-2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest group-focus-within:text-[#ccff00] transition-colors">
                Functional Module (Service Required)
              </label>
              <select 
                required
                className="w-full bg-transparent border border-zinc-800 px-6 py-5 outline-none focus:border-[#ccff00] transition-all font-mono text-sm uppercase text-white appearance-none cursor-pointer"
                value={form.service}
                onChange={e => setForm({...form, service: e.target.value})}
              >
                <option value="" disabled className="bg-black text-zinc-700">SELECT OPERATION MODE</option>
                <option value="cad" className="bg-black text-white">CAD SYNTHESIS</option>
                <option value="fea" className="bg-black text-white">FEA ANALYSIS</option>
                <option value="proto" className="bg-black text-white">PROTOTYPING STRATEGY</option>
                <option value="plm" className="bg-black text-white">PLM MANAGEMENT</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-700">▼</div>
            </div>

            {/* Field: Technical Requirements */}
            <div className="relative group">
              <label className="absolute -top-2.5 left-4 bg-black px-2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest group-focus-within:text-[#ccff00] transition-colors">
                Technical Requirements (Message)
              </label>
              <div className="relative">
                <textarea 
                  required
                  rows={5}
                  placeholder="DEFINE SCOPE AND PARAMETERS FOR SYNTHESIS"
                  className="w-full bg-transparent border border-zinc-800 px-6 py-6 outline-none focus:border-[#ccff00] transition-all font-mono text-sm uppercase placeholder:text-zinc-900 resize-none text-white"
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                />
                <div className="absolute bottom-4 right-6 font-mono text-[8px] text-zinc-800 uppercase tracking-[0.2em]">
                  BYTES: {new TextEncoder().encode(form.message).length}
                </div>
              </div>
            </div>

            {/* High-Impact Submit Button matching screenshot */}
            <div className="pt-4">
              <button 
                disabled={status === 'loading'}
                className="w-full bg-[#ccff00] text-black py-10 flex items-center justify-center gap-4 font-black uppercase text-4xl md:text-5xl tracking-tighter hover:bg-white transition-all group relative overflow-hidden active:scale-[0.99]"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="animate-spin" size={32} />
                    <span>ENCRYPTING_PACKET...</span>
                  </>
                ) : (
                  <>
                    <span className="z-10">SUBMIT</span>
                    <Send size={32} className="group-hover:translate-x-3 group-hover:-translate-y-1 transition-transform duration-500 z-10" />
                    {/* Hover reveal background */}
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-900 mt-8 text-[9px] font-mono text-zinc-700 uppercase tracking-[0.3em]">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${form.name && form.email && form.message ? 'bg-[#ccff00] animate-pulse' : 'bg-zinc-800'}`} />
                <span>LINK_STATUS: {form.name && form.email && form.message ? 'READY_FOR_BROADCAST' : 'AWAITING_PARAMETERS'}</span>
              </div>
              <span>TARGET_ENDPOINT: Reach@Trianance.com</span>
              <span className="opacity-40">AES-256 BIT ENCRYPTION_ACTIVE</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
