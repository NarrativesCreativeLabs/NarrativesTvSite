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
    <section id="services" className="py-24 bg-gradient-to-b from-background via-surface/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-textMain">
            Our <span className="text-primary glow-primary">Services</span>
          </h2>
          <p className="text-xl text-textMuted max-w-3xl mx-auto">
            From visual storytelling to <span className="text-primary-soft">AI automation</span>, we bring your creative vision to life with cutting-edge technology
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            
            return (
              <div
                key={service.id}
                className="group relative bg-surface/50 backdrop-blur-sm border border-border rounded-lg p-8 hover:border-primary transition-all duration-300 hover:transform hover:scale-105 hover:box-glow-primary select-none"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className='w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:box-glow-primary'>
                  <IconComponent 
                    size={32} 
                    className='text-primary'
                  />
                </div>

                {/* Content */}
                <h3 className='text-2xl font-bold text-textMain mb-4 transition-colors duration-300 group-hover:text-primary group-hover:glow-primary'>
                  {service.title}
                </h3>
                <p className="text-textMuted leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Effect */}
                <div className='absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-primary/5 to-transparent'></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-textMuted mb-6">Ready to bring your vision to life?</p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="cta-button bg-primary text-background border-primary hover:bg-primary-dark hover:border-primary-dark hover:box-glow-primary hover:scale-105 transition-all duration-300"
          >
            Let's Collaborate
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
