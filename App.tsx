
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Clients } from './components/Clients';
import { Capabilities } from './components/Capabilities';
import { EngineeringLog } from './components/EngineeringLog';
import { Team } from './components/Team';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Terminal } from './components/Terminal';

const App: React.FC = () => {
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Initial check and observation
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    // Handle dynamically rendered reveal elements if any
    const mutationObserver = new MutationObserver(() => {
      const newElements = document.querySelectorAll('.reveal:not(.observed)');
      newElements.forEach(el => {
        el.classList.add('observed');
        observer.observe(el);
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen selection:bg-[#ccff00] selection:text-black">
      <Header onMenuClick={() => setShowTerminal(true)} />
      
      <main className="relative">
        {/* Global Progress Line (Vertical) */}
        <div className="fixed left-6 md:left-12 top-0 w-px h-full bg-zinc-800/50 z-0 pointer-events-none" />
        
        <Hero />
        <Marquee />
        <Clients />
        <Capabilities />
        <EngineeringLog />
        <Team />
        <ContactSection />
      </main>

      <Footer />

      {showTerminal && (
        <Terminal onClose={() => setShowTerminal(false)} />
      )}
    </div>
  );
};

export default App;