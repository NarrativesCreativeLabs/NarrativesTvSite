import React from 'react';
import { teamInfo } from '../data/mockData';

const About = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-dark-navy to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white">
                About <span className="text-neon-orange">Narratives</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-neon-orange to-neon-blue"></div>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed">
              {teamInfo.about}
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              {teamInfo.mission}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              {teamInfo.stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-dark-navy/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-neon-orange transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-neon-orange mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider font-mono">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-lg overflow-hidden aspect-square">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
                alt="Narratives Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-neon-orange/20 to-neon-blue/20"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-neon-blue/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-neon-orange/20 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Values/Approach */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Creative Excellence',
              description: 'Every project is crafted with meticulous attention to detail and artistic vision.',
              color: 'neon-orange'
            },
            {
              title: 'Innovation First',
              description: 'We leverage the latest technology and AI to push creative boundaries.',
              color: 'neon-blue'
            },
            {
              title: 'Client Focused',
              description: 'Your story is our priority. We collaborate closely to bring your vision to life.',
              color: 'neon-orange'
            }
          ].map((value, index) => (
            <div
              key={index}
              className="text-center space-y-4 p-6 rounded-lg bg-dark-navy/30 border border-gray-800 hover:border-neon-orange transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center ${
                value.color === 'neon-orange' ? 'bg-neon-orange/10' : 'bg-neon-blue/10'
              }`}>
                <div className={`w-6 h-6 rounded-full ${
                  value.color === 'neon-orange' ? 'bg-neon-orange' : 'bg-neon-blue'
                }`}></div>
              </div>
              <h3 className="text-xl font-bold text-white">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
