import React from 'react';
import { Calendar, MapPin, Sparkles, Play, BookOpen, MessageSquare } from 'lucide-react';

export default function WeeklySpotlight({ schedule, games, onScrollToCollection }) {
  // Find featured game objects from the games vault
  const featuredGames = (schedule.featuredGameTitles || []).map(title => {
    const game = games.find(g => g.title.toLowerCase() === title.toLowerCase());
    if (game) return game;
    // Fallback if the game was newly added/custom in schedule
    return {
      title,
      type: 'Spotlight',
      players: '2-6 Players',
      theme: 'Strategic Board Game',
      box_img: '',
      isFallback: true
    };
  });

  return (
    <section id="weekly" className="py-24 relative overflow-hidden w-full bg-[#09090D] border-t border-b border-champagne/10">
      {/* Decorative radial aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-champagne/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-champagne/10 border border-champagne/20 mb-4">
              <Sparkles size={12} className="text-champagne animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-champagne font-bold">This Week's Campaign</span>
            </div>
            <h2 className="font-sans font-black text-4xl md:text-5xl tracking-tight text-ivory">
              Weekly <span className="font-serif italic font-normal text-champagne">Spotlight</span>
            </h2>
            <p className="font-sans font-light text-sm text-ivory/60 max-w-xl mt-3 leading-relaxed">
              Every week, we gather at Cortina.D Cafe to test our wits, forge connections, and master new strategies. Here is what's hitting the table next.
            </p>
          </div>
          
          <button
            onClick={onScrollToCollection}
            className="group relative px-6 py-3 bg-transparent border border-ivory/15 hover:border-champagne rounded-full font-mono text-[10px] uppercase tracking-widest text-ivory/80 hover:text-champagne transition-all duration-300 shadow-md flex items-center gap-2 self-start md:self-end"
          >
            View Full Vault
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Next Hangout Card */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex-1 bg-[#15151D]/60 backdrop-blur-xl border border-white/5 shadow-2xl rounded-[2.5rem] p-8 relative overflow-hidden flex flex-col justify-between group hover:border-champagne/30 transition-all duration-500 hover:border-white/10">
              {/* Highlight bar */}
              <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-champagne/50 to-transparent" />
              
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-champagne/60 font-semibold block mb-2 text-left">Next Gathering</span>
                <h3 className="font-sans font-black text-3xl text-ivory leading-tight mb-6 text-left">
                  {schedule.nextHangout || 'Friday, 7:30 PM'}
                </h3>
                
                <div className="space-y-6">
                  {/* Location Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-champagne/10 flex items-center justify-center border border-champagne/20 shrink-0 mt-0.5">
                      <MapPin size={18} className="text-champagne" />
                    </div>
                    <div className="text-left">
                      <span className="font-sans font-semibold text-sm text-ivory block">Cortina.D Cafe</span>
                      <span className="font-sans text-xs text-ivory/50">University Street, Irbid, Jordan</span>
                    </div>
                  </div>

                  {/* Thursday Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 shrink-0 mt-0.5">
                      <Calendar size={18} className="text-ivory/60" />
                    </div>
                    <div className="text-left">
                      <span className="font-sans font-semibold text-sm text-ivory block">Thursday Session</span>
                      <span className="font-mono text-xs text-champagne">{schedule.thursdayDate || 'Thu @ 7:00 PM'}</span>
                    </div>
                  </div>

                  {/* Friday Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 shrink-0 mt-0.5">
                      <Calendar size={18} className="text-ivory/60" />
                    </div>
                    <div className="text-left">
                      <span className="font-sans font-semibold text-sm text-ivory block">Friday Session</span>
                      <span className="font-mono text-xs text-champagne">{schedule.fridayDate || 'Fri @ 7:00 PM'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 space-y-3">
                <a
                  href="https://chat.whatsapp.com/ICBG" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 group/btn px-6 py-4 bg-gradient-to-r from-champagne to-[#E3CD89] text-obsidian rounded-full font-sans font-bold text-xs uppercase tracking-widest shadow-lg shadow-champagne/15 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(201,168,76,0.3)] transition-all duration-300"
                >
                  <MessageSquare size={14} /> Join Whatsapp Chat
                </a>
                
                <a
                  href="https://maps.app.goo.gl/R6WFBay7Piyfoe1w9?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-obsidian border border-white/10 hover:border-champagne/40 text-ivory/80 hover:text-champagne rounded-full font-sans font-semibold text-xs tracking-wider transition-all duration-300"
                >
                  Google Maps Location
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Games Slider */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              {featuredGames.slice(0, 4).map((game, idx) => {
                const initials = game.title.split(' ').map(n => n[0]).slice(0, 3).join('').toUpperCase();
                return (
                  <div
                    key={game.title + idx}
                    className="group bg-[#12121A] border border-white/5 rounded-[2rem] p-6 flex flex-col justify-between hover:border-champagne/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden text-left"
                  >
                    {/* Background gold gradient indicator */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-champagne/5 rounded-full filter blur-[35px] pointer-events-none group-hover:bg-champagne/10 transition-colors" />

                    <div>
                      {/* Game Header */}
                      <div className="flex items-center gap-4 mb-4">
                        {game.box_img ? (
                          <img
                            src={game.box_img}
                            alt={game.title}
                            className="w-14 h-14 rounded-2xl object-cover border border-white/10 shadow-lg"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-champagne/20 to-[#E3CD89]/5 flex items-center justify-center border border-champagne/25 shadow-lg shadow-champagne/5">
                            <span className="font-mono text-xs font-bold text-champagne tracking-wider">{initials}</span>
                          </div>
                        )}
                        <div className="text-left">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-champagne/80 font-bold block bg-champagne/10 px-2 py-0.5 rounded-full w-max border border-champagne/20 mb-1">
                            {game.type}
                          </span>
                          <h4 className="font-sans font-black text-lg text-ivory group-hover:text-champagne transition-colors duration-300 truncate max-w-[200px]">
                            {game.title}
                          </h4>
                        </div>
                      </div>

                      {/* Game Stats */}
                      <p className="font-sans text-xs text-ivory/50 text-left line-clamp-2 leading-relaxed mb-4">
                        {game.theme || 'Bring your sharpest tactical minds to face off in this strategic tabletop masterpiece.'}
                      </p>
                    </div>

                    {/* Game Metadata Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="font-mono text-[10px] text-ivory/40">
                        {game.players}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        {game.how_to_play && (
                          <a
                            href={game.how_to_play}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-champagne/15 border border-white/5 hover:border-champagne/30 flex items-center justify-center text-ivory/60 hover:text-champagne transition-all duration-300"
                            title="Learn How To Play"
                          >
                            <Play size={12} fill="currentColor" />
                          </a>
                        )}
                        {game.quick_summary && (
                          <a
                            href={game.quick_summary}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-champagne/15 border border-white/5 hover:border-champagne/30 flex items-center justify-center text-ivory/60 hover:text-champagne transition-all duration-300"
                            title="Quick Summary Video"
                          >
                            <BookOpen size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
