import React, { useState, useEffect } from 'react';
import './App.css';

// Floating elements / utilities
import Loader from './components/Loader';
import Grain from './components/Grain';
import CustomCursor from './components/CustomCursor';
import YantraBackground from './components/YantraBackground';
import AmbientAudioToggle from './components/AmbientAudioToggle';

// Layout and Sections
import Header from './components/Header';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Statement from './components/Statement';
import NavarasaChakra from './components/NavarasaChakra';
import Portfolio from './components/Portfolio';
import MusicScore from './components/MusicScore';
import Craft from './components/Craft';
import Originals from './components/Originals';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [loaderGone, setLoaderGone] = useState(false);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);

  // Initial loading timer
  useEffect(() => {
    // Stage 1: Add 'gone' class to fade out loader
    const fadeTimer = setTimeout(() => {
      setLoaderGone(true);
    }, 1800);

    // Stage 2: Completely unmount/disable loader overlay
    const unmountTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  // Background color interpolation based on scroll position (matching zoneTick in narratu.html)
  useEffect(() => {
    const zones = Array.from(document.querySelectorAll('section[data-bg]'));
    if (zones.length === 0) return;

    const zoneTick = () => {
      const mid = window.innerHeight * 0.5;
      let best = zones[0];
      for (const z of zones) {
        const r = z.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          best = z;
          break;
        }
        if (r.top > mid) break;
        best = z;
      }
      if (best && best.dataset.bg) {
        document.body.style.background = best.dataset.bg;
      }
    };

    window.addEventListener('scroll', zoneTick, { passive: true });
    zoneTick(); // run once initially

    // Also toggle header 'scrolled' class on scroll (scrollY > 60)
    const handleHeaderScroll = () => {
      const navEl = document.querySelector('nav');
      if (navEl) {
        navEl.classList.toggle('scrolled', window.scrollY > 60);
      }
    };
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', zoneTick);
      window.removeEventListener('scroll', handleHeaderScroll);
    };
  }, []);

  return (
    <>
      {/* Cinematic Loader */}
      {loading && <Loader gone={loaderGone} />}

      {/* Overlays */}
      <Grain />
      <CustomCursor />
      <YantraBackground />

      <div className="App">
        <Header />
        
        <main>
          <Hero />
          <Manifesto />
          <Statement />
          <NavarasaChakra />
          <Portfolio />
          <MusicScore isAmbientPlaying={isAmbientPlaying} />
          <Craft />
          <Originals />
          <Process />
          <Contact />
        </main>
        
        <Footer />

        {/* Floating audio control loop widget */}
        <AmbientAudioToggle 
          isPlaying={isAmbientPlaying} 
          setIsPlaying={setIsAmbientPlaying} 
        />
      </div>
    </>
  );
}

export default App;
