import React from 'react';
import { teamInfo } from '../data/mockData';

const About = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-surface to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-textMain">
                About <span className="text-primary glow-primary">Narratives</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-soft via-primary to-primary-dark"></div>
            </div>

            <p className="text-lg text-textMuted leading-relaxed">
              {teamInfo.about}
            </p>

            <p className="text-lg text-textMuted leading-relaxed">
              {teamInfo.mission}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              {teamInfo.stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-surface/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-primary hover:box-glow-primary transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-primary glow-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-textMuted uppercase tracking-wider font-mono">
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
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-soft/20 via-primary/20 to-primary-dark/20"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl box-glow-primary"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-primary-dark/20 rounded-full blur-3xl box-glow-primary"></div>
          </div>
        </div>

        {/* Values/Approach */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Creative Excellence',
              description: 'Every project is crafted with meticulous attention to detail and artistic vision.',
            },
            {
              title: 'Innovation First',
              description: 'We leverage the latest technology and AI to push creative boundaries.',
            },
            {
              title: 'Client Focused',
              description: 'Your story is our priority. We collaborate closely to bring your vision to life.',
            }
          ].map((value, index) => (
            <div
              key={index}
              className="text-center space-y-4 p-6 rounded-lg bg-surface/30 border border-border hover:border-primary hover:box-glow-primary transition-all duration-300"
            >
              <div className='w-12 h-12 rounded-full mx-auto flex items-center justify-center bg-primary/10 box-glow-primary'>
                <div className='w-6 h-6 rounded-full bg-primary'></div>
              </div>
              <h3 className='text-xl font-bold text-primary'>{value.title}</h3>
              <p className="text-textMuted">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
