import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-display font-bold text-neon-orange glow-orange mb-4">
              NARRATIVES
            </h3>
            <p className="text-gray-400 mb-4 max-w-md">
              Crafting compelling stories through visual artistry and AI innovation. 
              Let's create something extraordinary together.
            </p>
            <div className="flex gap-4">
              {['I', 'T', 'L', 'Y'].map((letter, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-dark-navy border border-gray-700 hover:border-neon-orange hover:bg-neon-orange/10 hover:box-glow-orange flex items-center justify-center text-gray-400 hover:text-neon-orange transition-all duration-300"
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Services', 'Portfolio', 'About', 'Contact'].map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(link.toLowerCase());
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-gray-400 hover:text-neon-orange transition-colors duration-200"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">
              Services
            </h4>
            <ul className="space-y-2">
              {['Visual Stories', 'Music Videos', 'AI Stories', 'AI Automation'].map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-neon-pink transition-colors duration-200">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Narratives. All rights reserved.
          </p>
          
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-neon-pink transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-neon-pink transition-colors duration-200">
              Terms of Service
            </a>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-neon-orange text-black hover:bg-fluorescent-orange hover:box-glow-orange transition-all duration-300 flex items-center justify-center hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
