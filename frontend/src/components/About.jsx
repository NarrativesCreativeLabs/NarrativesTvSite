import React from "react";
import { teamInfo } from "../data/mockData";

const About = () => {
  return (
    <section
      id="about"
      className="relative max-w-7xl mx-auto pt-12 px-4 pb-10 sm:px-6 lg:px-10 overflow-hidden"
    >
      {/* Decoration */}
      <div className="absolute top-[50%] right-20 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary rounded-full blur-[120px] opacity-10 pointer-events-none z-0 mix-blend-screen"></div>
      <div className="absolute bottom-28 right-0 translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[120px] opacity-10 pointer-events-none z-0 mix-blend-screen"></div>

      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-muted-foreground text-xs font-bold uppercase tracking-wider mb-8">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        Since 2018
      </div>
      <div className="flex flex-col md:flex-row gap-3 items-center justify-normal">
        <div className="leftSide w-full md:w-[60%] md:pr-14">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
            About <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-2">
              Narratives
            </span>
          </h2>
          <div className="space-y-6 text-white/65 text-lg font-light leading-relaxed">
            <p>{teamInfo.about}</p>
            <p>{teamInfo.mission}</p>
          </div>
          <div className="mt-10 space-y-6">
            {teamInfo.specials.map((special, indes) => (
              <div className="border-l-2 border-primary/30 pl-6 transition-all hover:border-primary hover:bg-white/5 p-2 rounded-r-lg group">
                <h4 className="text-white font-bold text-xl mb-1 group-hover:text-primary transition-colors">
                  {special.title}
                </h4>
                <p className="text-sm text-zinc-500 group-hover:text-zinc-400">
                  {special.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="rightSide w-full md:w-[40%] flex flex-col items-center space-y-4 place-items-end">
          <div className=" rounded-lg overflow-hidden aspect-square">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
              alt="Narratives Team"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="bg-white/10 px-3 py-1  relative pb-4 rounded-sm">
            "Narratives is build around one simple Idea Every story begins with
            attention The dot represents the moment of focus The vertical line
            is prespective The square is structure which makes a story.
            Narratives isnt about noise it's about clarity."
            <span className="absolute bottom-1 right-3 text-primary">
              ~ Narratives
            </span>
          </p>
        </div>
      </div>
      <div className="pt-10 flex flex-wrap gap-8 items-center justify-evenly">
        {teamInfo.stats.map((stat, index) => (
          <div key={index} className="hover:cursor-default ">
            <div className="text-4xl font-bold text-white hover:text-primary transition-all duration-300">
              {stat.value}
            </div>
            <div className="text-white/65">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
