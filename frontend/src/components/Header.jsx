import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav className={scrolled || mobileMenuOpen ? 'scrolled' : ''}>
        <a className="mark" href="#hero" aria-label="Narratives Creative Lab">
          <svg width="50" height="58" viewBox="0 0 60 70" fill="none">
            <rect x="8" y="8" width="44" height="54" stroke="#f0ead9" stroke-width="2.4"/>
            <path d="M15 62 V30 Q15 17 30 17 Q45 17 45 30 V62" stroke="rgba(240,234,217,.4)" stroke-width="1.2"/>
            <line x1="30" y1="8" x2="30" y2="62" stroke="#f0ead9" stroke-width="1.6"/>
            <circle cx="30" cy="33.6" r="4.6" stroke="#d4ab57" stroke-width="2.4" fill="#080812"/>
          </svg>
          <span class="name"><b>Narratives</b><i>Creative Lab</i></span>
        </a>
        
        {/* Desktop Nav Links */}
        <div className="nav-right">
          <a className="nav-link" href="#chakra-sec">Emotions</a>
          <a className="nav-link" href="#portfolio-grid">Work</a>
          <a className="nav-link" href="#craft">Craft</a>
          <a className="nav-link" href="#music">Sound</a>
          <a className="nav-link" href="#door">Contact</a>
          
          {/* Mobile Hamburguer Toggle */}
          <button 
            className="md:hidden block text-white focus:outline-none ml-4" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-90 bg-[#080812] flex flex-col justify-center items-center gap-8 md:hidden"
          style={{
            backdropFilter: 'blur(20px)',
            background: 'rgba(8, 8, 18, 0.98)',
            transition: 'opacity 0.4s ease'
          }}
        >
          <a 
            className="text-2xl font-mono tracking-widest text-[#cfc8b6] hover:text-[#f1d493] uppercase no-underline"
            href="#chakra-sec" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Emotions
          </a>
          <a 
            className="text-2xl font-mono tracking-widest text-[#cfc8b6] hover:text-[#f1d493] uppercase no-underline"
            href="#portfolio-grid" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Work
          </a>
          <a 
            className="text-2xl font-mono tracking-widest text-[#cfc8b6] hover:text-[#f1d493] uppercase no-underline"
            href="#craft" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Craft
          </a>
          <a 
            className="text-2xl font-mono tracking-widest text-[#cfc8b6] hover:text-[#f1d493] uppercase no-underline"
            href="#music" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Sound
          </a>
          <a 
            className="text-2xl font-mono tracking-widest text-[#cfc8b6] hover:text-[#f1d493] uppercase no-underline"
            href="#door" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      )}
    </>
  );
};

export default Header;
