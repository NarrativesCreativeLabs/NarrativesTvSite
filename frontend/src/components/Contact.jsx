import React from 'react';
import useReveal from '../lib/useReveal';

const Contact = () => {
  const [ref, inView] = useReveal({ threshold: 0.1 });

  return (
    <section 
      id="door" 
      ref={ref} 
      data-bg="#060608" 
      data-veil=".8"
    >
      {/* Portal Graphic */}
      <div className={`portal reveal ${inView ? 'in' : ''}`}>
        <svg width="110" height="128" viewBox="0 0 60 70" fill="none">
          <rect x="8" y="8" width="44" height="54" stroke="#d4ab57" strokeWidth="1.4"/>
          <path d="M15 62 V30 Q15 17 30 17 Q45 17 45 30 V62" stroke="rgba(240,234,217,.35)" strokeWidth="1"/>
          <line x1="30" y1="8" x2="30" y2="62" stroke="#d4ab57" strokeWidth="1.2"/>
          <circle cx="30" cy="33.6" r="4.2" stroke="#d4ab57" strokeWidth="2" fill="none">
            <animate attributeName="r" values="3.6;5;3.6" dur="4s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>

      <h2 className={`reveal ${inView ? 'in' : ''}`}>The door is open.<br />Walk in with a story.</h2>
      <p className={`sub reveal ${inView ? 'in' : ''}`}>
        Tell us what your audience must feel. We'll engineer the rest — and you'll see the first frames sooner than you think possible.
      </p>
      
      <a className={`door-cta reveal ${inView ? 'in' : ''}`} href="mailto:Contact@narratives.tv">
        Begin your narrative
      </a>

      <div className={`contact-grid reveal ${inView ? 'in' : ''}`}>
        <div className="contact-cell">
          <div className="k">Write</div>
          <a href="mailto:Contact@narratives.tv">Contact@narratives.tv</a>
          <span className="small">
            <a href="tel:+918341056554">+91 83410 56554</a>
          </span>
        </div>

        <div className="contact-cell">
          <div className="k">Visit</div>
          <div className="v">Narratives Creative Lab Private Limited</div>
          <span className="small">India · Worldwide — truly hybrid storytelling partners</span>
        </div>

        <div className="contact-cell">
          <div className="k">Watch</div>
          <a href="https://vimeo.com/ntusharchowdary" target="_blank" rel="noopener">
            vimeo.com/ntusharchowdary
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;

