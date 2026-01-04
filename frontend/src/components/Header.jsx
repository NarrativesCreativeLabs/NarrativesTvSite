import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-neon-pink/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-display font-bold text-neon-pink glow-pink hover:text-neon-magenta transition-colors duration-300"
          >
            NARRATIVES
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('services')}
              className="nav-link text-white hover:text-neon-pink transition-colors duration-200"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="nav-link text-white hover:text-neon-pink transition-colors duration-200"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="nav-link text-white hover:text-neon-pink transition-colors duration-200"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="cta-button bg-neon-pink text-black border-neon-pink hover:bg-neon-magenta hover:border-neon-magenta hover:box-glow-pink"
            >
              Get in Touch
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-neon-pink transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-neon-pink/20">
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => scrollToSection('services')}
                className="nav-link text-white hover:text-neon-pink transition-colors duration-200 text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="nav-link text-white hover:text-neon-pink transition-colors duration-200 text-left"
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="nav-link text-white hover:text-neon-pink transition-colors duration-200 text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="cta-button bg-neon-pink text-black border-neon-pink hover:bg-neon-magenta hover:border-neon-magenta w-full"
              >
                Get in Touch
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
