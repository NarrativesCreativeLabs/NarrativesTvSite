import React from 'react';
import useReveal from '../lib/useReveal';

const Statement = () => {
  const [ref, inView] = useReveal({ threshold: 0.15 });

  return (
    <section 
      id="statement" 
      ref={ref}
      className={`reveal ${inView ? 'in' : ''}`} 
      data-bg="#120d08" 
      data-veil=".14"
    >
      <div className="stop">
        <span className="strike">Stop Marketing.</span>
        <br />
        <span className="start">Start Storytelling.</span>
      </div>
      <div className="skt-sub">यथा कथा, तथा स्मृतिः — as the story, so the memory.</div>
    </section>
  );
};

export default Statement;
