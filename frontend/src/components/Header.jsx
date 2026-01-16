import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav
        className={`${
          isMobileMenuOpen ? "bg-black/50 backdrop-blur-xl" : "bg-transparent"
          } fixed w-full z-10 transition-all duration-500 top-0 border-b 
          ${isScrolled
            ? " backdrop-blur-xl border-border shadow-2xl"
            : "bg-transparent border-transparent"
          }
        `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="navbar-logo overflow-hidden h-18 w-18 rounded-sm">
                <img src={logo} alt="Company Logo" />
              </div>
              <div className="flex flex-col">
                <span className="font-[Cinzel] text-3xl tracking-tight text-white">
                  Narratives
                </span>
                <span className="font-[Cinzel] text-sm tracking-wide">
                  {" "}
                  CREATIVE LABS
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex gap-7 items-center ">
              {/* Desktop Menu */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-10">
                  {["Services", "Work", "About"].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="text-lg font-medium text-white/75 hover:text-white transition-colors relative group"
                    >
                      {item}
                      <span className="absolute -bottom-1 py-[1px] left-0 w-0 h-px bg-gradient-to-r from-chart-2 to-chart-3 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  ))}
                </div>
              </div>
              <a href="#contact">
                <span className="transition-all duration-300 px-5 py-2 bg-gradient-to-r from-chart-1 to-chart-3 rounded-full text-black/80 font-bold hover:shadow-[0_0_20px_-5px] hover:shadow-chart-3">
                  Lets talk
                </span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white/75 hover:text-white p-2"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden  border-b border-border  w-full">
            <div className="px-4 pt-2 pb-6 space-y-2 ">
              {["Services", "Work", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-3 py-4 rounded-lg text-lg font-medium text-muted-foreground hover:text-white hover:bg-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
