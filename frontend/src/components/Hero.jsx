import React from "react";
import useReveal from "../lib/useReveal";

const Hero = () => {
  const [ref1, in1] = useReveal({ threshold: 0.05 });
  const [ref2, in2] = useReveal({ threshold: 0.05 });
  const [ref3, in3] = useReveal({ threshold: 0.05 });

  return (
    <section id="hero" data-bg="#080812" data-veil=".85" className="relative">
      {/* Background Video */}
      <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="/hero-poster.jpg" aria-hidden="true">
        <source src="/hero-section.webm" type="video/webm" />
        <source src="/hero-section-lite.mp4" type="video/mp4" />
      </video>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div ref={ref1} className={`skt-line reveal ${in1 ? "in" : ""}`}>
          कथैव सत्यम् — the story alone is real.
        </div>
        <h1 ref={ref2} className={`reveal ${in2 ? "in" : ""}`}>
          In the end, we are
          <br />
          nothing but <em>stories.</em>
        </h1>
        <p ref={ref3} className={`sub reveal ${in3 ? "in" : ""}`}>
          A story makes you what you are — we build ourselves out of it.
          Narratives Creative Lab is a hybrid film studio from India —
          traditional filmmaking fused with a frontier AI pipeline — crafting ad
          films, trailers, series and original cinema for the world. We give
          meaning to your audience by inspiring, engaging and educating them
          with a visual story.
        </p>
      </div>

      <div className="hero-foot">
        <div className="scroll-cue">
          <span>Enter</span>
          <span className="line"></span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
