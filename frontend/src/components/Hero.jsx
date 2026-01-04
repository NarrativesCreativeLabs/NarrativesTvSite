import React, { useEffect, useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log('Video autoplay prevented'));
    }
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-30"
          loop
          muted
          playsInline
        >
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-orange/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-orange/30 bg-neon-orange/10 backdrop-blur-sm">
            <span className="w-2 h-2 bg-neon-orange rounded-full animate-pulse"></span>
            <span className="text-sm text-neon-orange font-mono uppercase tracking-wider">Creative Storytelling Studio</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
            Crafting Stories
            <br />
            <span className="text-neon-orange">That Inspire</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            We blend visual artistry with AI innovation to create compelling narratives that captivate and transform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button
              onClick={scrollToContact}
              className="cta-button bg-neon-orange text-black border-neon-orange hover:bg-neon-blue hover:border-neon-blue hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
            >
              Start Your Story
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button
              onClick={scrollToPortfolio}
              className="cta-button bg-transparent text-white border-white hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 group"
            >
              <Play size={16} className="group-hover:scale-110 transition-transform duration-300" />
              View Our Work
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 max-w-4xl mx-auto">
            {[
              { value: '150+', label: 'Projects' },
              { value: '80+', label: 'Clients' },
              { value: '8+', label: 'Years' },
              { value: '25+', label: 'Awards' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-neon-orange mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider font-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-neon-orange/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-neon-orange rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
