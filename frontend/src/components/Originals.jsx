import React from 'react';
import useReveal from '../lib/useReveal';

const Originals = () => {
  const [frameRef, frameIn] = useReveal({ threshold: 0.1 });
  const [card1Ref, card1In] = useReveal({ threshold: 0.15 });
  const [card2Ref, card2In] = useReveal({ threshold: 0.15 });

  return (
    <section id="originals" data-bg="#140909" data-veil=".38">
      <div 
        ref={frameRef} 
        className={`orig-frame reveal ${frameIn ? 'in' : ''}`}
      >
        {/* Sacred Geometry Triangles */}
        <svg className="tri" width="520" height="520" viewBox="0 0 100 100">
          <polygon points="50,6 94,82 6,82" fill="none" stroke="#d4ab57" strokeWidth=".6"/>
          <polygon points="50,94 6,18 94,18" fill="none" stroke="#d4ab57" strokeWidth=".6"/>
          <circle cx="50" cy="50" r="2.4" fill="#a72f27"/>
        </svg>

        <div className="label">Originals · हमारी फ़िल्में</div>
        <h2>Some films we make for clients.<br />These, we make <span className="red">because we must.</span></h2>
        <p className="body">
          We make originals because some stories ask to be told. Everything that leaves this studio — commissioned or not — carries the same DNA: deep thought, high standards and the science of feeling; aesthetics and nuance, carried by an agenda and a storyteller's heart. Because a right message, told right, can change the direction of someone's life.
        </p>

        <div className="orig-slate">
          {/* Slate Card 1 */}
          <div 
            ref={card1Ref} 
            className={`slate-card reveal ${card1In ? 'in' : ''}`} 
            data-testid="orig-slate-1"
          >
            <span className="cl">Original Nº 1 · In development</span>
            <div className="redact">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>Feature. Title and logline sealed until the teaser drops.</p>
            <span className="stamp">Sealed</span>
          </div>

          {/* Slate Card 2 */}
          <div 
            ref={card2Ref} 
            className={`slate-card reveal ${card2In ? 'in' : ''}`} 
            data-testid="orig-slate-2"
          >
            <span className="cl">Original Nº 2 · Pre-production</span>
            <div className="redact">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>Anthology Series. Exploring the thin line between memory and myth in post-digital India.</p>
            <span className="stamp" style={{ color: '#d4ab57', borderColor: 'rgba(212, 171, 87, 0.5)' }}>Pending</span>
          </div>
        </div>
        <p className="orig-wr">Behind the slate sits our Writers' Room — original screenplays, script doctoring, and pitch presentations that bring an idea alive for actors and production houses.</p>
        <div className="skt-tag">पुराणं दग्ध्वा नवं ज्वालयामः — burn the old, light the new.</div>
      </div>
    </section>
  );
};

export default Originals;
