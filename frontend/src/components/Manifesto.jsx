import React, { useEffect, useRef, useState } from 'react';
import useReveal from '../lib/useReveal';

const Manifesto = () => {
  const [labelRef, labelIn] = useReveal({ threshold: 0.1 });
  const containerRef = useRef(null);
  const [litCount, setLitCount] = useState(0);

  const text = "Brands are remembered the way myths are remembered — not for what they said, but for what they made an audience feel. We fuse ancient story grammar with frontier AI, so a thirty-second film carries the weight of a three-hour epic.";
  const words = text.split(' ');

  // Words that should have the gold color (case-insensitive checks)
  const goldWords = ["myths", "feel.", "ancient", "story", "grammar", "frontier", "AI,", "three-hour", "epic."];

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // We start lighting up when the container top is 85% down the viewport
      // and finish when the top is 25% down the viewport.
      const startTrigger = viewportHeight * 0.85;
      const endTrigger = viewportHeight * 0.25;

      const totalDistance = startTrigger - endTrigger;
      const currentDistance = startTrigger - rect.top;

      const progress = Math.max(0, Math.min(1, currentDistance / totalDistance));
      const countToLit = Math.floor(progress * words.length);
      setLitCount(countToLit);
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to set initial layout
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [words.length]);

  return (
    <section id="manifesto" data-bg="#120d08" data-veil=".14">
      <div ref={labelRef} className={`label reveal ${labelIn ? 'in' : ''}`}>
        The belief
      </div>
      <p className="kinetic" ref={containerRef}>
        {words.map((word, idx) => {
          const isLit = idx <= litCount;
          const cleanWord = word.replace(/[—.,]/g, '').toLowerCase();
          const isGold = goldWords.some(gw => gw.replace(/[—.,]/g, '').toLowerCase() === cleanWord);

          return (
            <React.Fragment key={idx}>
              <span className={`w ${isLit ? 'lit' : ''} ${isGold ? 'gold' : ''}`}>
                {word}
              </span>
              {' '}
            </React.Fragment>
          );
        })}
      </p>
    </section>
  );
};

export default Manifesto;
