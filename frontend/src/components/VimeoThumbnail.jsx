import React, { useState, useEffect } from 'react';

// This object lives outside the component, so it persists 
// even when the component unmounts and remounts.
const thumbnailCache = {};

const VimeoThumbnail = ({ videoUrl, alt, className }) => {
  // 1. Initialize state with the cached value if it exists
  const [thumb, setThumb] = useState(thumbnailCache[videoUrl] || '');
  const [loading, setLoading] = useState(!thumbnailCache[videoUrl]);

  useEffect(() => {
    // 2. If we already have the thumbnail in cache, don't fetch again
    if (thumbnailCache[videoUrl]) {
      setLoading(false);
      return;
    }

    const fetchThumbnail = async () => {
      try {
        const response = await fetch(
          `https://vimeo.com/api/oembed.json?url=${videoUrl}&width=1280`
        );
        const data = await response.json();
        
        // 3. Save to cache and update state
        thumbnailCache[videoUrl] = data.thumbnail_url;
        setThumb(data.thumbnail_url);
      } catch (error) {
        console.error("Error fetching Vimeo thumbnail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (videoUrl?.includes('vimeo.com')) {
      fetchThumbnail();
    }
  }, [videoUrl]);

  if (loading) {
    return <div className={`${className} bg-white/5 animate-pulse aspect-[4/3]`} />;
  }
  
  return (
    <img 
      src={thumb || 'https://via.placeholder.com/1280x720?text=Video+Thumbnail'} 
      alt={alt} 
      className={`${className} object-cover object-center w-full h-full`} 
    />
  );
};

export default VimeoThumbnail;