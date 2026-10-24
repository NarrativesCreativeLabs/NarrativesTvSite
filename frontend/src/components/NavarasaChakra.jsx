import React, { useEffect, useRef, useState } from 'react';
import useReveal from '../lib/useReveal';
import { RASA_MEDIA } from '../data/rasaMedia';

const RASAS = [
  { key: 'shringara', emo: 'Love', skt: 'शृंगार', iast: 'Shringara', color: '#d4848c', glyph: 'शृं',
    desc: 'The rasa of love and beauty. Fashion films, wedding cinema, romance-led brand stories — frames that make the viewer fall first and think later.' },
  { key: 'hasya', emo: 'Joy', skt: 'हास्य', iast: 'Hasya', color: '#e0b14b', glyph: 'हा',
    desc: 'The rasa of laughter. Comic timing is mathematics — we cut humour to the frame, because a laugh that lands half a second late never lands at all.' },
  { key: 'karuna', emo: 'Compassion', skt: 'करुण', iast: 'Karuna', color: '#8a9bb0', glyph: 'क',
    desc: 'The rasa of tenderness and loss. Cause films, healthcare stories, the quiet brand films people remember years after the campaign ends.' },
  { key: 'raudra', emo: 'Fury', skt: 'रौद्र', iast: 'Raudra', color: '#c0392b', glyph: 'रौ',
    desc: 'The rasa of fire. Launch films, sports, anthems — energy engineered to detonate exactly when the edit demands it.' },
  { key: 'veera', emo: 'Courage', skt: 'वीर', iast: 'Veera', color: '#e07b28', glyph: 'वी',
    desc: 'The rasa of heroism. Towers shot like monuments, founder stories told like epics. Confidence, engineered.' },
  { key: 'bhayanaka', emo: 'Fear', skt: 'भयानक', iast: 'Bhayanaka', color: '#7a63b8', glyph: 'भ',
    desc: 'The rasa of dread. Trailers and thrillers — we build the silence before the cut, because fear lives in anticipation, not the jump.' },
  { key: 'bibhatsa', emo: 'Aversion', skt: 'बीभत्स', iast: 'Bibhatsa', color: '#7d8a4a', glyph: 'बी',
    desc: 'The rasa of the uncomfortable truth. PSAs and gritty realism — when a story must disturb to be believed.' },
  { key: 'adbhuta', emo: 'Wonder', skt: 'अद्भुत', iast: 'Adbhuta', color: '#d4ab57', glyph: 'अ',
    desc: 'The rasa of awe. Scale, spectacle, the impossible made visible — this is where our AI pipeline does what cameras cannot afford to.' },
  { key: 'shanta', emo: 'Peace', skt: 'शांत', iast: 'Shanta', color: '#e8e1cf', glyph: 'शां',
    desc: 'The rasa of stillness. Meditation brands, slow luxury — films that lower a viewer\'s heart rate by design.' }
];

const RASA_FX = {
  shringara: { speed: 0.5, n: 46 },
  hasya: { speed: 0.95, n: 60 },
  karuna: { speed: 0.3, n: 34 },
  raudra: { speed: 1.9, n: 90 },
  veera: { speed: 1.25, n: 70 },
  bhayanaka: { speed: 0.7, n: 55 },
  bibhatsa: { speed: 0.6, n: 40 },
  adbhuta: { speed: 0.85, n: 78 },
  shanta: { speed: 0.22, n: 28 }
};

const NavarasaChakra = () => {
  const [headRef, headIn] = useReveal({ threshold: 0.1 });
  const [wheelRef, wheelIn] = useReveal({ threshold: 0.1 });
  const [stageRef, stageIn] = useReveal({ threshold: 0.1 });

  const [activeIndex, setActiveIndex] = useState(7); // Adbhuta (index 7) by default
  const [wheelAngle, setWheelAngle] = useState(-90);
  const [holoActive, setHoloActive] = useState(false);
  const [imageFadeClass, setImageFadeClass] = useState("");

  const draggingRef = useRef(false);
  const lastARef = useRef(0);
  const fxCanvasRef = useRef(null);
  const fxParticlesRef = useRef([]);
  const fxColorRef = useRef('#d4ab57');
  const fxSpeedRef = useRef(1);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  // Handle active index changes
  useEffect(() => {
    const r = RASAS[activeIndex];
    document.documentElement.style.setProperty('--rasa', r.color);

    // Notify THREE.js particle background of color change
    window.dispatchEvent(new CustomEvent('rasa-change', { detail: { color: r.color } }));

    // Trigger HUD Hologram scanning
    setHoloActive(true);
    const scanTimer = setTimeout(() => {
      setHoloActive(false);
    }, 1320);

    // Fade in WebP face visuals with two-frame RAF delay
    setImageFadeClass("");
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        setImageFadeClass("in");
      });
      return () => cancelAnimationFrame(raf2);
    });

    // Seed canvas stage particles
    const cfg = RASA_FX[r.key] || { speed: 0.8, n: 50 };
    fxColorRef.current = r.color;
    fxSpeedRef.current = cfg.speed;
    fxParticlesRef.current = Array.from({ length: reduceMotion ? 0 : cfg.n }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 2.1 + 0.6,
      v: Math.random() * 0.6 + 0.4,
      o: Math.random() * 0.45 + 0.15,
      ph: Math.random() * Math.PI * 2
    }));

    return () => {
      clearTimeout(scanTimer);
      cancelAnimationFrame(raf1);
    };
  }, [activeIndex, reduceMotion]);

  // SVG Spoke layout coordinate calculation
  const spokePos = (i, ang) => {
    const a = ((ang + i * 40) * Math.PI) / 180;
    return [Math.cos(a) * 118, Math.sin(a) * 118];
  };

  const getAngleFromEvent = (e) => {
    const b = wheelRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const px = clientX - (b.left + b.width / 2);
    const py = clientY - (b.top + b.height / 2);
    return (Math.atan2(py, px) * 180) / Math.PI;
  };

  // Pointer drag/spin events
  const handlePointerDown = (e) => {
    draggingRef.current = true;
    lastARef.current = getAngleFromEvent(e);
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!draggingRef.current) return;
      const a = getAngleFromEvent(e);
      setWheelAngle((prev) => prev + (a - lastARef.current));
      lastARef.current = a;
    };

    const handlePointerUp = () => {
      draggingRef.current = false;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  // Idle rotation loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (!draggingRef.current && !reduceMotion) {
        setWheelAngle((prev) => prev + 0.05);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [reduceMotion]);

  // Stage FX: Cinematic Ember particle renderer
  useEffect(() => {
    const canvas = fxCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      const b = canvas.getBoundingClientRect();
      canvas.width = Math.max(2, b.width * window.devicePixelRatio);
      canvas.height = Math.max(2, b.height * window.devicePixelRatio);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    let frameId;
    const tick = () => {
      frameId = requestAnimationFrame(tick);
      const W = canvas.width;
      const H = canvas.height;
      if (!W) return;

      ctx.clearRect(0, 0, W, H);
      const t = performance.now() / 1000;

      for (const p of fxParticlesRef.current) {
        p.y -= p.v * fxSpeedRef.current * 0.0018;
        p.x += Math.sin(t * 0.7 + p.ph) * 0.0005;

        if (p.y < -0.05) {
          p.y = 1.05;
          p.x = Math.random();
        }

        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = fxColorRef.current;
        ctx.globalAlpha = p.o * (0.55 + 0.45 * Math.sin(t * 2 + p.ph));
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    tick();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const activeRasa = RASAS[activeIndex];
  const activeMedia = RASA_MEDIA[activeRasa.key];

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return (
    <section id="chakra-sec" data-bg="#0c0a14" data-veil="0.45">
      <div 
        id="rasaStageBg" 
        style={{
          background: `radial-gradient(ellipse 80% 70% at 70% 45%, ${hexToRgba(activeRasa.color, 0.18)}, transparent 70%)`,
          transition: 'background 1s ease'
        }}
      />
      
      <div ref={headRef} className="chakra-head">
        <div>
          <div className={`label reveal ${headIn ? 'in' : ''}`}>नवरस — the nine emotions</div>
          <h2 className={`reveal ${headIn ? 'in' : ''}`}>Nine emotions.<br />One wheel. Turn it.</h2>
        </div>
        <p className={`reveal ${headIn ? 'in' : ''}`}>
          Two thousand years before neuroscience, Indian dramatists mapped every human feeling into nine rasas. Every film we make is engineered to land on one. Choose an emotion — and watch its face.
        </p>
      </div>

      <div className="chakra-wrap">
        {/* Navarasa SVG Wheel */}
        <div 
          id="wheel" 
          ref={wheelRef} 
          className={`reveal-l ${wheelIn ? 'in' : ''}`}
          onPointerDown={handlePointerDown}
          style={{ touchAction: 'none' }}
        >
          <svg viewBox="-150 -150 300 300">
            {/* Center concentric geometric lines */}
            <g className="wheel-core">
              <circle r="118" fill="none" stroke="rgba(240,234,217,.14)" strokeWidth="1"/>
              <circle r="86" fill="none" stroke="rgba(240,234,217,.09)" strokeWidth="1"/>
              <polygon points="0,-62 53.7,31 -53.7,31" fill="none" stroke="rgba(212,171,87,.35)" strokeWidth="0.8"/>
              <polygon points="0,62 53.7,-31 -53.7,-31" fill="none" stroke="rgba(212,171,87,.35)" strokeWidth="0.8"/>
              <polygon points="0,-40 34.6,20 -34.6,20" fill="none" stroke="rgba(212,171,87,.2)" strokeWidth="0.7"/>
              <polygon points="0,40 34.6,-20 -34.6,-20" fill="none" stroke="rgba(212,171,87,.2)" strokeWidth="0.7"/>
              <circle r="4" fill="#a72f27">
                <animate attributeName="r" values="3.4;5;3.4" dur="4s" repeatCount="indefinite"/>
              </circle>
            </g>

            {/* Rotatable Spokes */}
            <g>
              {RASAS.map((r, i) => {
                const [x, y] = spokePos(i, wheelAngle);
                const isActive = activeIndex === i;
                return (
                  <g 
                    key={r.key} 
                    className={`spoke ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveIndex(i)}
                  >
                    <line x1="0" y1="0" x2={x * 0.76} y2={y * 0.76} stroke="rgba(240,234,217,.1)" strokeWidth="1"/>
                    <circle className="node" cx={x} cy={y} r="27"/>
                    <text className="emo" x={x} y={y} dy="-2">{r.emo}</text>
                    <text className="dev" x={x} y={y} dy="12">{r.skt}</text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Cinematic Stage */}
        <div className={`rasa-stage reveal-r ${stageIn ? 'in' : ''}`} ref={stageRef}>
          <div className={`stage-visual ${holoActive ? 'holo-in' : ''}`} id="stageVisual">
            {activeMedia && activeMedia.image ? (
              <img 
                key={activeRasa.key}
                src={activeMedia.image} 
                alt={activeRasa.emo} 
                className={imageFadeClass}
              />
            ) : (
              <div className="stage-poster" id="stagePoster" style={{ display: 'flex' }}>
                <span 
                  className="glyph" 
                  id="stageGlyph"
                  style={{
                    color: activeRasa.color,
                    filter: `drop-shadow(0 0 60px ${activeRasa.color}88)`,
                    transition: 'color 0.8s'
                  }}
                >
                  {activeRasa.glyph}
                </span>
              </div>
            )}

            <div 
              className="stage-grade" 
              id="stageGrade" 
              style={{
                background: `radial-gradient(ellipse at 62% 38%, ${hexToRgba(activeRasa.color, 0.8)}, transparent 72%)`,
                transition: 'background 1s ease'
              }}
            />

            <canvas ref={fxCanvasRef} id="stageFx" aria-hidden="true"></canvas>

            <div className="holo-grid" aria-hidden="true"></div>
            <div className="holo-frame" aria-hidden="true">
              <span className="hf-tr"></span>
              <span className="hf-br"></span>
            </div>
            <div className="holo-beam" aria-hidden="true"></div>
            <div className="holo-tag" id="holoTag" aria-hidden="true">
              SCAN · {String(activeIndex + 1).padStart(2, '0')} / 09 · {activeRasa.iast.toUpperCase()}
            </div>
          </div>

          <div className="stage-info">
            <div className="titlerow">
              <div className="rasa-title">
                <span id="rt" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{activeRasa.emo}</span>
                <span className="dev-inline" id="rskt">{activeRasa.skt}</span>
              </div>
              <div className="rasa-kicker" id="rk">
                {String(activeIndex + 1).padStart(2, '0')} / 09 · {activeRasa.iast}
              </div>
            </div>
            <p className="rasa-desc" id="rd">{activeRasa.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavarasaChakra;
