import React from 'react';
import useReveal from '../lib/useReveal';

const craftRows = [
  {
    idx: "१",
    title: "Films & Commercials",
    desc: "Brand films and commercials for real estate, healthcare and consumer brands worldwide — live action fused with our AI pipeline, at a fraction of the budget, none of the compromise.",
    tag: "Veera · Courage"
  },
  {
    idx: "२",
    title: "Trailers & Title Sequences",
    desc: "The first ninety seconds decide everything. We engineer tension to a peak the audience cannot walk away from.",
    tag: "Bhayanaka · Fear"
  },
  {
    idx: "३",
    title: "Series & Branded Storytelling",
    desc: "Episodic worlds for brands and platforms — character-consistent across every frame, every episode, every platform cut.",
    tag: "Shringara · Love"
  },
  {
    idx: "४",
    title: "Originals & Writers' Room",
    desc: "Uncommissioned cinema we believe in — ideas written, visualised and pitched to producers. Plus script doctoring and pitch films that bring a screenplay alive for actors and production houses.",
    tag: "Adbhuta · Wonder"
  }
];

const Craft = () => {
  const [labelRef, labelIn] = useReveal({ threshold: 0.1 });
  const [h2Ref, h2In] = useReveal({ threshold: 0.1 });
  const [introRef, introIn] = useReveal({ threshold: 0.1 });

  return (
    <section id="craft" data-bg="#0d0c10" data-veil=".16">
      <div ref={labelRef} className={`label reveal ${labelIn ? 'in' : ''}`}>The craft</div>
      <h2 ref={h2Ref} className={`craft-h reveal ${h2In ? 'in' : ''}`}>A hybrid studio.<br />Camera and code — one tribe.</h2>
      <p ref={introRef} className={`craft-intro reveal ${introIn ? 'in' : ''}`}>
        We come from traditional filmmaking — sets, lenses, actors — and we fold AI into every stage where it buys control and kills waste: pre-vis, VFX, b-roll, motion capture, enhancement. Live action when the story demands skin and sweat. AI when it demands the impossible. The craft of storytelling decides; the tools obey.
      </p>
      
      <div className="craft-grid">
        {craftRows.map((row, idx) => {
          const [rowRef, rowIn] = useReveal({ threshold: 0.15 });
          return (
            <div 
              key={idx} 
              ref={rowRef} 
              className={`craft-row reveal ${rowIn ? 'in' : ''}`}
            >
              <span className="idx">{row.idx}</span>
              <h3>{row.title}</h3>
              <p>{row.desc}</p>
              <span className="tag">{row.tag}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Craft;
