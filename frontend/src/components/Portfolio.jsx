import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { portfolioVideos } from '../data/mockData';

const Portfolio = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Visual Stories', 'Music Videos', 'AI Stories'];

  const filteredVideos = filter === 'All' 
    ? portfolioVideos 
    : portfolioVideos.filter(video => video.tags.includes(filter));

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-b from-background via-surface/10 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-textMain">
            Our <span className="text-primary glow-primary">Portfolio</span>
          </h2>
          <p className="text-xl text-textMuted max-w-3xl mx-auto">
            Explore our collection of captivating visual stories and creative projects
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300 ${
                filter === category
                  ? 'bg-primary text-background border-2 border-primary box-glow-primary'
                  : 'bg-transparent text-textMuted border-2 border-border hover:border-primary hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <div
              key={video.id}
              className="group relative aspect-video rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-primary hover:box-glow-primary"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedVideo(video)}
            >
              {/* Thumbnail */}
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center mx-auto transform group-hover:scale-110 transition-transform duration-300 box-glow-primary">
                    <Play size={28} className="text-background ml-1" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-textMain mb-1 glow-primary">{video.title}</h3>
                    <p className="text-sm text-textMuted">{video.category}</p>
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/80 backdrop-blur-sm box-glow-primary">
                <span className="text-xs font-mono uppercase tracking-wider text-background font-bold">
                  {video.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div 
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-textMain hover:text-primary transition-colors duration-200"
              >
                <X size={32} />
              </button>

              {/* Video Player */}
              <div className="aspect-video rounded-lg overflow-hidden border-2 border-primary box-glow-primary">
                <video
                  controls
                  autoPlay
                  className="w-full h-full"
                >
                  <source src={selectedVideo.videoUrl} type="video/mp4" />
                </video>
              </div>

              {/* Video Info */}
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-textMain mb-2 glow-primary">{selectedVideo.title}</h3>
                <p className="text-textMuted">{selectedVideo.category}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
