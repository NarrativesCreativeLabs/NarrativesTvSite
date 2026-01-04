import React from 'react';
import { Film, Music, Sparkles, Cpu } from 'lucide-react';
import { services } from '../data/mockData';

const iconMap = {
  Film: Film,
  Music: Music,
  Sparkles: Sparkles,
  Cpu: Cpu
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-black to-dark-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white">
            Our <span className="text-neon-orange">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From visual storytelling to AI automation, we bring your creative vision to life with cutting-edge technology
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            const isOrange = service.color === 'neon-orange';
            
            return (
              <div
                key={service.id}
                className="group relative bg-dark-navy/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8 hover:border-neon-orange transition-all duration-300 hover:transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-lg ${isOrange ? 'bg-neon-orange/10' : 'bg-neon-blue/10'} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent 
                    size={32} 
                    className={isOrange ? 'text-neon-orange' : 'text-neon-blue'}
                  />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-neon-orange transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${isOrange ? 'bg-gradient-to-br from-neon-orange/5 to-transparent' : 'bg-gradient-to-br from-neon-blue/5 to-transparent'}`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">Ready to bring your vision to life?</p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="cta-button bg-neon-orange text-black border-neon-orange hover:bg-neon-blue hover:border-neon-blue hover:scale-105 transition-all duration-300"
          >
            Let's Collaborate
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
