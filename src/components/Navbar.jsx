import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, MapPin } from 'lucide-react';

export default function Navbar({ onOpenAdmin }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Secret admin access: triple-click the logo to open admin
  const [clickCount, setClickCount] = useState(0);
  const clickTimer = React.useRef(null);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setClickCount(prev => {
      const next = prev + 1;
      if (next >= 5) {
        // 5 rapid clicks opens admin
        if (onOpenAdmin) onOpenAdmin();
        clearTimeout(clickTimer.current);
        return 0;
      }
      // Reset after 1.5s of no clicks
      clearTimeout(clickTimer.current);
      clickTimer.current = setTimeout(() => setClickCount(0), 1500);
      return next;
    });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-5xl py-4 px-6 md:px-8 rounded-full transition-all duration-500 flex items-center justify-between ${
        scrolled
          ? 'bg-obsidian/75 backdrop-blur-xl border border-champagne/30 shadow-2xl py-3 top-4'
          : 'bg-transparent border border-transparent'
      }`}
    >
      {/* Brand Logo */}
      <div 
        onClick={handleLogoClick}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <img 
          src="/assets/images/logo.png" 
          alt="ICBG Logo" 
          className="w-10 h-10 object-contain filter drop-shadow-[0_0_8px_rgba(201,168,76,0.35)] group-hover:scale-105 transition-transform duration-300"
        />
        <span className="font-sans font-black text-lg tracking-widest text-ivory group-hover:text-champagne transition-colors duration-300">
          ICBG<span className="text-champagne">.</span>
        </span>
      </div>

      {/* Navigation Anchors */}
      <div className="hidden md:flex items-center gap-8">
        {['About', 'Collection', 'Gallery'].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className="font-sans font-medium text-sm tracking-wider text-ivory/80 hover:text-champagne transition-colors duration-300 relative py-1 group"
          >
            {item}
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-champagne transition-all duration-300 group-hover:w-full"></span>
          </button>
        ))}
      </div>

      {/* Action CTA Buttons */}
      <div className="flex items-center gap-3">
        <a
          href="https://maps.app.goo.gl/R6WFBay7Piyfoe1w9?g_st=ic"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ivory/60 hover:text-champagne transition-colors duration-300"
        >
          <MapPin size={12} className="text-champagne" />
          Cortina.D Cafe
        </a>
        <button
          onClick={() => window.open('https://maps.app.goo.gl/R6WFBay7Piyfoe1w9?g_st=ic', '_blank')}
          className="group relative px-5 py-2.5 bg-[#0D0D12] border border-[#C9A84C]/30 rounded-full font-sans font-bold text-xs uppercase tracking-widest shadow-lg shadow-champagne/5 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(201,168,76,0.3)] hover:border-[#C9A84C] transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[#C9A84C]/10 to-[#E3CD89]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#C9A84C] to-[#E3CD89] flex items-center gap-1">
            Join Club <Sparkles size={12} className="text-[#C9A84C] group-hover:animate-pulse" />
          </span>
        </button>
      </div>
    </nav>
  );
}
