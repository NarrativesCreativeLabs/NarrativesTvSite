import React from "react";
import { ArrowUp } from "lucide-react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import { socialLinks } from "@/data/mockData";

const iconComponents = {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-display font-bold text-primary mb-4">
              NARRATIVES
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Crafting compelling stories through visual artistry and AI
              innovation. Let's create something extraordinary together.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => {
                const Icon = iconComponents[link.icon];
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="w-12 h-12 rounded-lg bg-card/50 border border-border hover:border-primary hover:bg-primary/10 hover:box-glow-primary flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300"
                  >
                    {Icon && <Icon size={20} />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-bold mb-4 uppercase tracking-wider text-sm">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Services", "Portfolio", "About", "Contact"].map(
                (link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        const element = document.getElementById(
                          link.toLowerCase()
                        );
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
                    >
                      {link}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-foreground font-bold mb-4 uppercase tracking-wider text-sm">
              Services
            </h4>
            <ul className="space-y-2">
              {[
                "Visual Stories",
                "Music Videos",
                "Originals",
                "AI Automation",
              ].map((service, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Narratives. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-primary text-background hover:bg-chart-2 hover:box-glow-primary transition-all duration-300 flex items-center justify-center hover:scale-110"
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
