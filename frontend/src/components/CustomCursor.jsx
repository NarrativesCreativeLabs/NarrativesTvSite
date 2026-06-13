import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const [isHot, setIsHot] = useState(false);

  useEffect(() => {
    // Check if pointer is coarse (mobile device) or prefers-reduced-motion
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isMobile || prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      
      // Update dot instantly
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseOver = (e) => {
      // Check if target or ancestor has a class or tag indicating interactiveness
      const target = e.target;
      const isInteractive = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.spoke') || 
        target.closest('.pg-card') || 
        target.closest('.craft-row') || 
        target.closest('.slate-card') ||
        target.closest('.m-tab') ||
        target.closest('.reel-card');
        
      setIsHot(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Easing loop for the ring cursor
    let animId;
    const ease = 0.18; // Lerp factor
    
    const updateRing = () => {
      const dx = mousePos.current.x - ringPos.current.x;
      const dy = mousePos.current.y - ringPos.current.y;
      
      ringPos.current.x += dx * ease;
      ringPos.current.y += dy * ease;
      
      if (cursorRef.current) {
        cursorRef.current.style.left = `${ringPos.current.x}px`;
        cursorRef.current.style.top = `${ringPos.current.y}px`;
      }
      
      animId = requestAnimationFrame(updateRing);
    };
    
    animId = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`cursor ${isHot ? 'hot' : ''}`} 
        style={{ left: '-100px', top: '-100px' }}
      />
      <div 
        ref={dotRef} 
        className="cursor-dot" 
        style={{ left: '-100px', top: '-100px' }}
      />
    </>
  );
};

export default CustomCursor;
