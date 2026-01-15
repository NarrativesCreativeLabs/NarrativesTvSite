import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import ReactPlayer from 'react-player'

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
  const videoId = 674688232;
  
  return (
    <section id="hero" className="relative pb-5 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      
      <div className='absolute top-0 l-0 w-full h-screen pointer-events-none' >
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?background=1&autopause=0`}
          frameBorder="0"
          allow="autoplay; fullscreen"
          loading="lazy"
          className='opacity-30'
          style={{
            width: '100vw',
            height: '56.25vw', /* 16:9 Aspect Ratio */
            minHeight: '100vh',
            minWidth: '177.77vh', /* 16:9 Aspect Ratio */
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          title="Hero Video Background"
        ></iframe>
      </div>

      

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center pt-20">
        <div className="space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse box-glow-primary"></span>
            <span className="text-sm text-primary font-mono uppercase tracking-wider">Creative Storytelling Studio</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight">
            Crafting Stories
            <br />
            {/* 🌟 Modern Multi-stop Gradient Text 🌟 */}
            <span className="bg-gradient-to-r from-chart-1 via-chart-3 to-chart-5 bg-clip-text text-transparent bg-size[200%_auto] animate-[shine_8s_ease-in-out_infinite]">
              That Inspire
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl md:text-3xl text-white/80 max-w-4xl mx-auto font-light">
            We blend visual artistry with <span className="text-primary border-b border-primary/50 shadow-chart-3 ">AI innovation</span> to create compelling narratives that captivate and transform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button
              onClick={scrollToContact}
              className="cta-button bg-linear-to-r from-primary to-chart-5 text-black font-bold transition-all duration-300 flex items-center gap-2 "
            >
              Start Your Story
              <ArrowRight size={16} className="" />
            </button>
            <button
              onClick={scrollToPortfolio}
              className="cta-button bg-transparent hover:text-chart-2 text-foreground border border-white/40 hover:border-chart-2 hover:box-glow-primary transition-all duration-300 flex items-center gap-2 group"
            >
              <Play size={16} className=" group-hover:text-chart-2 transition-transform duration-300" />
              View Our Work
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between">
            {[
              { value: '150+', label: 'Projects' },
              { value: '80+', label: 'Clients' },
              { value: '8+', label: 'Years' },
              { value: '25+', label: 'Awards' }
            ].map((stat, index) => (
              <div key={index} className="text-center hover:cursor-default">
                <div className="text-3xl md:text-4xl font-bold text-primary glow-primary mb-2 hover:text-chart-2 transition-all duration-300">{stat.value}</div>
                <div className="text-sm text-white/70 uppercase tracking-wider font-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className=" hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse box-glow-primary"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
