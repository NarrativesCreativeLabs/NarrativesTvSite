import React, { useEffect, useRef, useState } from 'react';

const AmbientAudioToggle = ({ isPlaying, setIsPlaying }) => {
  const [show, setShow] = useState(false);
  const fadeIntervalRef = useRef(null);

  // Scroll observer to show/hide the floating button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync state with DOM Audio element matching narratu.html logic
  useEffect(() => {
    const audio = document.getElementById('ambientAudio');
    if (!audio) return;

    audio.volume = 0;

    const TARGET_VOL = 0.42;
    let started = false;
    let muted = localStorage.getItem('narratives_ambient_muted') === '1';

    const fadeTo = (target, duration) => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
      const from = audio.volume;
      const start = performance.now();
      fadeIntervalRef.current = setInterval(() => {
        const k = Math.min(1, (performance.now() - start) / duration);
        audio.volume = from + (target - from) * k;
        if (k >= 1) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
      }, 40);
    };

    const tryStart = async () => {
      if (started || muted) return;
      started = true;
      try {
        await audio.play();
        setIsPlaying(true);
        setShow(true);
        fadeTo(TARGET_VOL, 1800);
      } catch (e) {
        started = false;
        // autoplay blocked — wait for any user gesture
        const gestureUnlock = async () => {
          if (muted) return;
          try {
            await audio.play();
            setIsPlaying(true);
            setShow(true);
            fadeTo(TARGET_VOL, 1400);
            started = true;
            window.removeEventListener('pointerdown', gestureUnlock);
            window.removeEventListener('keydown', gestureUnlock);
            window.removeEventListener('touchstart', gestureUnlock);
          } catch (_) {}
        };
        window.addEventListener('pointerdown', gestureUnlock, { once: true, passive: true });
        window.addEventListener('keydown', gestureUnlock, { once: true });
        window.addEventListener('touchstart', gestureUnlock, { once: true, passive: true });
        setShow(true);
      }
    };

    // Kickoff on first scroll, wheel, touchmove OR after 2.4s in case user doesn't scroll
    let kickoff = false;
    const kick = () => {
      if (kickoff) return;
      kickoff = true;
      tryStart();
    };

    window.addEventListener('scroll', kick, { once: true, passive: true });
    window.addEventListener('wheel', kick, { once: true, passive: true });
    window.addEventListener('touchmove', kick, { once: true, passive: true });
    const kickoffTimer = setTimeout(kick, 2400);

    // Reflect persisted muted state initially
    if (muted) {
      setShow(true);
      setIsPlaying(false);
    }

    return () => {
      window.removeEventListener('scroll', kick);
      window.removeEventListener('wheel', kick);
      window.removeEventListener('touchmove', kick);
      clearTimeout(kickoffTimer);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [setIsPlaying]);

  // Handle manual click toggles
  const handleToggle = async () => {
    const audio = document.getElementById('ambientAudio');
    if (!audio) return;

    let muted = localStorage.getItem('narratives_ambient_muted') === '1';
    const TARGET_VOL = 0.42;

    const fadeTo = (target, duration) => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
      const from = audio.volume;
      const start = performance.now();
      fadeIntervalRef.current = setInterval(() => {
        const k = Math.min(1, (performance.now() - start) / duration);
        audio.volume = from + (target - from) * k;
        if (k >= 1) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
      }, 40);
    };

    if (audio.paused || muted) {
      localStorage.setItem('narratives_ambient_muted', '0');
      try {
        await audio.play();
      } catch (e) {}
      setIsPlaying(true);
      fadeTo(TARGET_VOL, 800);
    } else {
      localStorage.setItem('narratives_ambient_muted', '1');
      fadeTo(0, 600);
      setTimeout(() => {
        audio.pause();
        setIsPlaying(false);
      }, 650);
    }
  };

  return (
    <button
      id="ambientToggle"
      className={`${show ? 'show' : ''} ${isPlaying ? 'on' : ''}`}
      onClick={handleToggle}
      aria-label="Toggle background ambient sound"
    >
      <div className="at-eq">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span className="at-label-off">Play Sound</span>
      <span className="at-label-on">Mute Sound</span>
    </button>
  );
};

export default AmbientAudioToggle;
