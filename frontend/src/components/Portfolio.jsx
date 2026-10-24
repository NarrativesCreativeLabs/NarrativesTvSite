import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { portfolioVideos } from '../data/mockData';
import useReveal from '../lib/useReveal';

const Portfolio = () => {
  const [headRef, headIn] = useReveal({ threshold: 0.1 });
  const [gridRef, gridIn] = useReveal({ threshold: 0.05 });

  const [activePreviewId, setActivePreviewId] = useState(null);
  const [renderedPreviewId, setRenderedPreviewId] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const enterTimerRef = useRef(null);
  const leaveTimerRef = useRef(null);

  const handleMouseEnter = (vimeoId) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    if (enterTimerRef.current) clearTimeout(enterTimerRef.current);

    enterTimerRef.current = setTimeout(() => {
      setActivePreviewId(vimeoId);
      setRenderedPreviewId(vimeoId);
    }, 220);
  };

  const handleMouseLeave = () => {
    if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
    setActivePreviewId(null);

    // Keep iframe mounted for a fade transition duration (650ms)
    leaveTimerRef.current = setTimeout(() => {
      setRenderedPreviewId(null);
    }, 650);
  };

  useEffect(() => {
    return () => {
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  // Listen to Escape key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedVideo(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Manage body scroll and grain opacity class when lightbox is open
  useEffect(() => {
    if (selectedVideo) {
      document.body.classList.add('lightbox-open');
    } else {
      document.body.classList.remove('lightbox-open');
    }
    return () => {
      document.body.classList.remove('lightbox-open');
    };
  }, [selectedVideo]);

  return (
    <>
      <section id="portfolio-grid" data-bg="#0a0d12" data-veil="0.08">
        <div className="pg-wrap">
          <div ref={headRef} className={`pg-head reveal ${headIn ? 'in' : ''}`}>
            <h2>Selected Works</h2>
            <p>Hover any film to preview it. Click to watch in full.</p>
          </div>
          
          <div 
            ref={gridRef}
            className={`pg-grid reveal ${gridIn ? 'in' : ''}`}
            data-testid="pg-grid"
            id="pgGrid"
          >
            {portfolioVideos.map((video, idx) => {
              const isActive = activePreviewId === video.vimeo;
              const isRendered = renderedPreviewId === video.vimeo;
              const formattedIndex = String(idx + 1).padStart(2, '0');

              return (
                <div
                  key={video.vimeo}
                  className="pg-card"
                  role="button"
                  tabIndex="0"
                  data-testid={`pg-card-${idx}`}
                  onMouseEnter={() => handleMouseEnter(video.vimeo)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => setSelectedVideo(video)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedVideo(video);
                    }
                  }}
                >
                  <div className="pgc-media">
                    {/* Static high-res thumbnail */}
                    <div 
                      className="pgc-thumb" 
                      style={{ backgroundImage: `url('${video.thumb}')` }}
                    />

                    {/* Debounced hover iframe video layer */}
                    <div className={`pgc-video ${isActive ? 'on' : ''}`}>
                      {isRendered && (
                        <iframe
                          src={`https://player.vimeo.com/video/${video.vimeo}?background=1&autoplay=1&muted=1&loop=1&autopause=0&quality=540p`}
                          allow="autoplay"
                          tabIndex="-1"
                          loading="lazy"
                          title={`${video.title} Preview`}
                        />
                      )}
                    </div>
                    
                    <div className="pgc-line" />
                  </div>
                  
                  <div className="pgc-cap">
                    <span className="pgc-num">{formattedIndex}</span>
                    <h3 className="pgc-title">{video.title}</h3>
                    <span className="pgc-cat">{video.category}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Video Player Modal */}
      {selectedVideo && createPortal(
        <div 
          id="lightbox" 
          className="open"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="lb-frame" onClick={(e) => e.stopPropagation()}>
            <div className="lb-meta" id="lbMeta">
              {selectedVideo.category} — {selectedVideo.title}
            </div>
            
            <button 
              id="lbClose"
              className="lb-close"
              onClick={() => setSelectedVideo(null)}
              aria-label="Close lightbox"
            >
              ✕
            </button>

            <div id="lbPlayer" style={{ width: '100%', height: '100%' }}>
              {selectedVideo.vimeo ? (
                <iframe
                  src={`https://player.vimeo.com/video/${selectedVideo.vimeo}?autoplay=1&color=d4ab57&title=0&byline=0`}
                  title={selectedVideo.title}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#0a0911' }}>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '26px', color: '#f0ead9' }}>{selectedVideo.title}</div>
                  <a 
                    href="https://vimeo.com/ntusharchowdary" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ 
                      fontFamily: 'var(--mono)', 
                      fontSize: '11px', 
                      letterSpacing: '.3em', 
                      textTransform: 'uppercase', 
                      color: '#d4ab57', 
                      textDecoration: 'none', 
                      border: '1px solid #d4ab57', 
                      borderRadius: '999px', 
                      padding: '14px 28px' 
                    }}
                  >
                    Watch on Vimeo ↗
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Portfolio;
