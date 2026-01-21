// src/components/Loader.jsx
import React from 'react';
import loadingWebm from '../assets/loading.webm'; // Adjust path if needed
import { useState } from 'react';
import { useEffect } from 'react';

const Loader = () => {
    
  return (
    // Tailwind v4 classes for a fixed, full-screen overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover" // 'object-cover' fills screen, 'object-contain' keeps aspect ratio
      >
        <source src={loadingWebm} type="video/webm" />
        {/* Your browser does not support the video tag. */}
      </video>
    </div>
  );
};

export default Loader;