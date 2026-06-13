import React, { useEffect, useRef } from 'react';
import useReveal from '../lib/useReveal';

const MusicScore = ({ isAmbientPlaying }) => {
  const [ref, inView] = useReveal({ threshold: 0.1 });
  const canvasRef = useRef(null);

  // Audio wave canvas drawing logic matching narratu.html exactly
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const wctx = canvas.getContext('2d');

    const resize = () => {
      const b = canvas.getBoundingClientRect();
      canvas.width = b.width * window.devicePixelRatio;
      canvas.height = 140 * window.devicePixelRatio;
    };
    resize();
    window.addEventListener('resize', resize);

    let animationFrameId;
    const waveTick = () => {
      animationFrameId = requestAnimationFrame(waveTick);
      const W = canvas.width;
      const H = canvas.height;
      if (!W) return;

      const t = performance.now() / 1000;
      wctx.clearRect(0, 0, W, H);
      wctx.strokeStyle = 'rgba(212,171,87,.85)';
      wctx.lineWidth = 1.4 * window.devicePixelRatio;

      wctx.beginPath();
      for (let x = 0; x < W; x += 4) {
        const f = x / W;
        const y = H / 2 + Math.sin(f * 14 + t * 1.6) * Math.sin(f * 3 + t * 0.5) * H * 0.18 * (isAmbientPlaying ? 1 : 0.4);
        if (x === 0) {
          wctx.moveTo(x, y);
        } else {
          wctx.lineTo(x, y);
        }
      }
      wctx.stroke();
    };

    waveTick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [isAmbientPlaying]);

  return (
    <section id="music" data-bg="#10100a" data-veil="0.4">
      <div ref={ref} className={`music-frame reveal ${inView ? 'in' : ''}`}>
        <div>
          <div className="label">The score · संगीत</div>
          <h2>Sound is the first language.<br />We compose in three.</h2>
          <p>
            Before the picture cuts, before the actor breathes — the audience is already being conducted, by frequency. Music sets the soul. Sound sculpts the body. Dialogue carves the meaning. We engineer each layer at the level of physiology: tones that settle the vagus nerve, transients that shock the spine, silences the room steps inside. The craft is not in adding sound. It is in choosing which frequencies to leave inside the listener.
          </p>
          <div className="pillars">
            <div className="pillar">
              <span className="pillar-no">०१</span>
              <div className="pillar-h">Music</div>
              <div className="pillar-p">The emotional elixir. Bespoke scores tuned to breath, heart-rate and exhale — written before the edit locks.</div>
            </div>
            <div className="pillar">
              <span className="pillar-no">०२</span>
              <div className="pillar-h">Sound</div>
              <div className="pillar-p">Foley, design, texture — the skin the picture wears. Sub-bass shudder to silver shimmer.</div>
            </div>
            <div className="pillar">
              <span className="pillar-no">०३</span>
              <div className="pillar-h">Dialogue</div>
              <div className="pillar-p">Voice as instrument. Cadence, breath, intimacy ADR — closer than the lens dares go.</div>
            </div>
          </div>
        </div>
        <canvas ref={canvasRef} id="wave" />
      </div>
    </section>
  );
};

export default MusicScore;
