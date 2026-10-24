import React, { useState, useEffect, useRef } from 'react';
import useReveal from '../lib/useReveal';

const VIZ = {
  eq: (
    <svg viewBox="0 0 80 60">
      <g className="vz-eq">
        <rect x="8" y="14" width="6" height="34" rx="2" />
        <rect x="20" y="14" width="6" height="34" rx="2" />
        <rect x="32" y="14" width="6" height="34" rx="2" />
        <rect x="44" y="14" width="6" height="34" rx="2" />
        <rect x="56" y="14" width="6" height="34" rx="2" />
        <rect x="68" y="14" width="6" height="34" rx="2" />
      </g>
    </svg>
  ),
  curve: (
    <svg viewBox="0 0 80 60">
      <path
        className="vz-curve"
        d="M4 48 C 18 8, 32 54, 46 22 S 68 10, 78 28"
        fill="none"
        stroke="#d4ab57"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle className="vz-beat" cx="22" cy="28" r="3" />
      <circle className="vz-beat" cx="46" cy="22" r="3" />
      <circle className="vz-beat" cx="70" cy="18" r="3" />
    </svg>
  ),
  clap: (
    <svg viewBox="0 0 80 60">
      <g className="vz-clapTop">
        <rect x="12" y="8" width="56" height="12" rx="2" fill="none" stroke="#d4ab57" strokeWidth="2" />
        <line x1="22" y1="8" x2="30" y2="20" stroke="#d4ab57" strokeWidth="2" />
        <line x1="40" y1="8" x2="48" y2="20" stroke="#d4ab57" strokeWidth="2" />
        <line x1="58" y1="8" x2="66" y2="20" stroke="#d4ab57" strokeWidth="2" />
      </g>
      <rect x="12" y="24" width="56" height="28" rx="2" fill="none" stroke="#d4ab57" strokeWidth="2" />
    </svg>
  ),
  formats: (
    <svg viewBox="0 0 80 60">
      <rect class="vz-fmt" x="4" y="16" width="42" height="26" rx="2" fill="none" stroke="#d4ab57" strokeWidth="2" />
      <rect class="vz-fmt" x="52" y="8" width="18" height="34" rx="2" fill="none" stroke="#d4ab57" strokeWidth="2" />
      <rect class="vz-fmt" x="30" y="46" width="14" height="14" rx="2" fill="none" stroke="#d4ab57" strokeWidth="2" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 80 60">
      <g className="vz-spark">
        <circle cx="40" cy="30" r="6" fill="#e8c87a" />
        <g stroke="#d4ab57" strokeWidth="2" strokeLinecap="round">
          <line x1="40" y1="10" x2="40" y2="18" />
          <line x1="40" y1="42" x2="40" y2="50" />
          <line x1="20" y1="30" x2="28" y2="30" />
          <line x1="52" y1="30" x2="60" y2="30" />
          <line x1="26" y1="16" x2="31" y2="21" />
          <line x1="49" y1="39" x2="54" y2="44" />
          <line x1="54" y1="16" x2="49" y2="21" />
          <line x1="31" y1="39" x2="26" y2="44" />
        </g>
      </g>
    </svg>
  ),
  type: (
    <svg viewBox="0 0 80 60">
      <rect class="vz-type" x="8" y="14" width="62" height="4" rx="2" />
      <rect class="vz-type" x="8" y="28" width="48" height="4" rx="2" />
      <rect class="vz-type" x="8" y="42" width="56" height="4" rx="2" />
    </svg>
  ),
  board: (
    <svg viewBox="0 0 80 60">
      <rect class="vz-board" x="4" y="16" width="20" height="16" rx="2" fill="none" stroke="#d4ab57" strokeWidth="2" />
      <rect class="vz-board" x="30" y="16" width="20" height="16" rx="2" fill="none" stroke="#d4ab57" strokeWidth="2" />
      <rect class="vz-board" x="56" y="16" width="20" height="16" rx="2" fill="none" stroke="#d4ab57" strokeWidth="2" />
      <line x1="4" y1="42" x2="76" y2="42" stroke="#d4ab57" strokeWidth="1" opacity=".4" />
    </svg>
  ),
  reel: (
    <svg viewBox="0 0 80 60">
      <g className="vz-reel">
        <circle cx="40" cy="30" r="22" fill="none" stroke="#d4ab57" strokeWidth="2" />
        <circle cx="40" cy="30" r="4" fill="#d4ab57" />
        <circle cx="40" cy="16" r="4.5" fill="none" stroke="#d4ab57" strokeWidth="1.6" />
        <circle cx="53" cy="38" r="4.5" fill="none" stroke="#d4ab57" strokeWidth="1.6" />
        <circle cx="27" cy="38" r="4.5" fill="none" stroke="#d4ab57" strokeWidth="1.6" />
      </g>
    </svg>
  )
};

const METHODS = {
  brand: [
    { t: 'Listen', viz: 'eq', d: "The brief, the audience, and the one feeling the film must land — chosen from the nine rasas before anything else." },
    { t: 'Map', viz: 'curve', d: "Script and score direction, emotion plotted beat-by-beat, pre-vis built so you see the film before the film." },
    { t: 'Make', viz: 'clap', d: "Hybrid production — live action where it breathes, AI where it multiplies: VFX, b-roll, motion capture, enhancement. Human taste at every gate." },
    { t: 'Deliver', viz: 'formats', d: "One master becomes a campaign — platform cuts, stills, teasers. Nothing we create works only once." }
  ],
  orig: [
    { t: 'Spark', viz: 'spark', d: "An idea we can't put down. It enters the Writers' Room and earns its place on the slate." },
    { t: 'Write', viz: 'type', d: "Screenplay drafts on classical structure — the same discipline we lend out as script doctoring." },
    { t: 'Visualise', viz: 'board', d: "Pitch films and presentations that let actors, producers and partners see the film before a rupee is spent." },
    { t: 'Produce', viz: 'reel', d: "Independently or with partners — made to the same standard as everything that leaves this studio." }
  ]
};

const Process = () => {
  const [labelRef, labelIn] = useReveal({ threshold: 0.1 });
  const [headRef, headIn] = useReveal({ threshold: 0.1 });
  const [stripRef, stripIn] = useReveal({ threshold: 0.1 });

  const [track, setTrack] = useState('brand'); // 'brand' or 'orig'
  const [activeStep, setActiveStep] = useState(0);
  const timerRef = useRef(null);

  // Restart autoplay timer
  const restartTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3200);
  };

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [track]);

  const handleStepClick = (idx) => {
    setActiveStep(idx);
    restartTimer();
  };

  const handleTrackChange = (newTrack) => {
    setTrack(newTrack);
    setActiveStep(0);
  };

  const stepsList = METHODS[track];

  return (
    <section id="process" data-bg="#0b0b10" data-veil=".2">
      <div ref={labelRef} className={`label reveal ${labelIn ? 'in' : ''}`}>The pipeline · विधि</div>
      <h2 ref={headRef} className={`method-h reveal ${headIn ? 'in' : ''}`}>How we build myths.</h2>
      
      {/* Track switcher tabs */}
      <div className="method-tabs">
        <button 
          className={`m-tab ${track === 'brand' ? 'active' : ''}`} 
          onClick={() => handleTrackChange('brand')}
        >
          <span>Track 01</span>
          Brand Films
        </button>
        <button 
          className={`m-tab ${track === 'orig' ? 'active' : ''}`} 
          onClick={() => handleTrackChange('orig')}
        >
          <span>Track 02</span>
          Original Cinema
        </button>
      </div>

      {/* Filmstrip progress frames */}
      <div 
        ref={stripRef}
        className={`filmstrip reveal ${stripIn ? 'in' : ''}`}
      >
        <div className="fs-line">
          <div 
            className="fs-progress" 
            style={{ width: `${((activeStep + 1) / 4) * 100}%`, transition: 'width 0.8s ease' }}
          />
        </div>

        <div className="fs-frames" id="fsFrames">
          {stepsList.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={step.t}
                className={`fs-frame ${isActive ? 'active' : ''}`}
                onClick={() => handleStepClick(idx)}
                data-testid={`method-frame-${track}-${idx}`}
              >
                <div className="fs-holes" />
                <div className="fs-body">
                  <div className="fs-viz">
                    {VIZ[step.viz]}
                  </div>
                  <div className="fs-tc">Take 0{idx + 1}</div>
                  <h3>{step.t}</h3>
                  <p>{step.d}</p>
                </div>
                <div className="fs-holes bottom" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
