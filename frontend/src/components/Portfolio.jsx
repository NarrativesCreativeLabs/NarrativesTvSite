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
    <section id="portfolio" className="py-24 bg-gradient-to-b from-black via-dark-purple/10 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white">
            Our <span className="text-fluorescent-yellow glow-yellow">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
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
                  ? 'bg-neon-orange text-black border-2 border-neon-orange box-glow-orange'
                  : 'bg-transparent text-gray-400 border-2 border-gray-700 hover:border-neon-orange hover:text-neon-orange'
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
              className="group relative aspect-video rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-neon-orange hover:box-glow-orange"
              onClick={() => setSelectedVideo(video)}
              style={{ animationDelay: `${index * 100}ms` }}
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
                  <div className="w-16 h-16 rounded-full bg-neon-orange/90 flex items-center justify-center mx-auto transform group-hover:scale-110 transition-transform duration-300 box-glow-orange">
                    <Play size={28} className="text-black ml-1" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 glow-orange">{video.title}</h3>
                    <p className="text-sm text-gray-300">{video.category}</p>
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-fluorescent-green/80 backdrop-blur-sm box-glow-green">
                <span className="text-xs font-mono uppercase tracking-wider text-black font-bold">
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
                className="absolute -top-12 right-0 text-white hover:text-neon-orange transition-colors duration-200"
              >
                <X size={32} />
              </button>

              {/* Video Player */}
              <div className="aspect-video rounded-lg overflow-hidden border-2 border-neon-orange box-glow-orange">
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
                <h3 className="text-2xl font-bold text-white mb-2 glow-orange">{selectedVideo.title}</h3>
                <p className="text-gray-400">{selectedVideo.category}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
