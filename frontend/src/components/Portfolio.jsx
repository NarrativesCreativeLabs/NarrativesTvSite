import React, { useState } from "react";
import { Play, X } from "lucide-react";
import { portfolioVideos } from "../data/mockData";
import VimeoThumbnail from "./VimeoThumbnail";

const Portfolio = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    "Brand Storytelling",
    "Music Videos",
    "Originals",
  ];

  const filteredVideos =
    filter === "All"
      ? portfolioVideos
      : portfolioVideos.filter((video) => video.tags.includes(filter));

  // Helper to determine if the link is Vimeo
  const isVimeo = (url) => url.includes("vimeo.com");

  // Helper to extract Vimeo ID
  const getVimeoId = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  const handleMouseEnter = () => {
    // Preconnect to Vimeo's player and CDN to warm up the connection
    const playerPreconnect = document.createElement('link');
    playerPreconnect.rel = 'preconnect';
    playerPreconnect.href = 'https://player.vimeo.com';
    document.head.appendChild(playerPreconnect);

    const cdnPreconnect = document.createElement('link');
    cdnPreconnect.rel = 'preconnect';
    cdnPreconnect.href = 'https://i.vimeocdn.com';
    document.head.appendChild(cdnPreconnect);
  };

  return (
    <section
      id="portfolio"
      className="py-24 pt-10 border-y border-border bg-gradient-to-b from-background via-card/10 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground">
            Our <span className="text-primary glow-primary">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our collection of captivating visual stories and creative
            projects
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
                  ? "bg-primary text-background border border-primary box-glow-primary"
                  : "bg-transparent text-muted-foreground border border-border hover:border-primary hover:text-primary"
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
              className="group rounded-lg relative aspect-[4/3] overflow-hidden cursor-pointer bg-black border border-white/5 hover:border-[rgba(var(--primary),0.3)] transition-colors duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedVideo(video)}
              onMouseEnter={handleMouseEnter}
            >
              <VimeoThumbnail
                videoUrl={video.videoUrl}
                alt={video.title}
                className="transition-transform duration-700 ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/70 backdrop-blur-sm flex items-center justify-center mx-auto transform group-hover:scale-110 transition-transform duration-300 box-glow-primary">
                  <Play size={28} className="text-background ml-1" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <span className="text-primary text-s font-bold uppercase tracking-wider mb-2 block">
                    {video.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white group-hover:text-chart-5 transition-colors">
                    {video.title}
                  </h3>
                </div>
                <div className="h-1 w-0 bg-primary mt-4 transition-all duration-500 group-hover:w-36"></div>
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
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-foreground hover:text-primary transition-colors duration-200"
              >
                <X size={32} />
              </button>

              <div className="aspect-video rounded-lg overflow-hidden border-2 border-primary box-glow-primary bg-black">
                {isVimeo(selectedVideo.videoUrl) ? (
                  <iframe
                    src={`https://player.vimeo.com/video/${getVimeoId(
                      selectedVideo.videoUrl
                    )}?autoplay=1&color=ffffff&title=0&byline=0&portrait=0`}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    key={selectedVideo.videoUrl} // Crucial for resetting source
                    controls
                    autoPlay
                    className="w-full h-full"
                  >
                    <source src={selectedVideo.videoUrl} type="video/mp4" />
                  </video>
                )}
              </div>

              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2 glow-primary">
                  {selectedVideo.title}
                </h3>
                <p className="text-muted-foreground">
                  {selectedVideo.category}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
