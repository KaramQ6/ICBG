import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import WeeklySpotlight from './components/WeeklySpotlight';
import Collection from './components/Collection';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

// Import original games list (used by WeeklySpotlight to resolve featured titles)
import gamesData from './data/board_games.json';

// Default schedule
const DEFAULT_SCHEDULE = {
  nextHangout: "Friday, 22/5/2026 7:30 PM",
  thursdayDate: "28/5/26 7:00 PM",
  fridayDate: "22/5/26 7:00 PM",
  featuredGameTitles: ["Hellapagos", "Outsmarted!", "7 Wonders", "Cascadia"]
};

export default function App() {
  // Admin-added games (stored in localStorage, separate from base JSON)
  const [extraGames, setExtraGames] = useState(() => {
    try {
      const stored = localStorage.getItem('icbg_extra_games');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  // Schedule state
  const [schedule, setSchedule] = useState(() => {
    try {
      const stored = localStorage.getItem('icbg_weekly_schedule');
      return stored ? JSON.parse(stored) : DEFAULT_SCHEDULE;
    } catch { return DEFAULT_SCHEDULE; }
  });
  
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Extra gallery images (stored in localStorage)
  const [extraGalleryImages, setExtraGalleryImages] = useState(() => {
    try {
      const stored = localStorage.getItem('icbg_gallery_images');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  // All games = base JSON + admin-added
  const allGames = [...extraGames, ...gamesData];

  // Handler to add a new board game (admin only)
  const handleAddGame = (newGame) => {
    const updated = [newGame, ...extraGames];
    setExtraGames(updated);
    localStorage.setItem('icbg_extra_games', JSON.stringify(updated));
  };

  // Handler to update the weekly campaign schedule
  const handleUpdateSchedule = (newSchedule) => {
    setSchedule(newSchedule);
    localStorage.setItem('icbg_weekly_schedule', JSON.stringify(newSchedule));
  };

  // Handler to add a gallery image
  const handleAddGalleryImage = (newImage) => {
    const updated = [...extraGalleryImages, newImage];
    setExtraGalleryImages(updated);
    localStorage.setItem('icbg_gallery_images', JSON.stringify(updated));
  };

  // Handler to remove a gallery image by index
  const handleRemoveGalleryImage = (index) => {
    const updated = extraGalleryImages.filter((_, i) => i !== index);
    setExtraGalleryImages(updated);
    localStorage.setItem('icbg_gallery_images', JSON.stringify(updated));
  };

  // Smooth scroll helper
  const handleScrollToCollection = () => {
    const element = document.getElementById('collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-obsidian text-ivory select-none overflow-hidden">
      {/* Global Texture (Noise Overlay) — z-30 so it doesn't block clicks */}
      <div className="pointer-events-none fixed inset-0 z-30 opacity-[0.04] mix-blend-overlay">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.8" 
              numOctaves="3" 
              stitchTiles="stitch" 
            />
            <feColorMatrix 
              type="matrix" 
              values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.07 0" 
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Floating Island Navigation */}
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Experience sections */}
      <main>
        {/* The Opening Shot (Hero) */}
        <Hero />

        {/* The Manifesto (Philosophy) */}
        <Philosophy />

        {/* Weekly Spotlight (Featured Campaign & Gathering Info) */}
        <WeeklySpotlight 
          schedule={schedule} 
          games={allGames} 
          onScrollToCollection={handleScrollToCollection} 
        />

        {/* The Atelier Vault (Collection Archive) */}
        <Collection extraGames={extraGames} />

        {/* Captured Moments (Gallery) */}
        <Gallery extraImages={extraGalleryImages} />
      </main>

      {/* The Rounded Obsidian Footer */}
      <Footer />

      {/* Admin Control Panel (hidden, opened via secret logo clicks) */}
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        games={allGames} 
        onAddGame={handleAddGame}
        schedule={schedule}
        onUpdateSchedule={handleUpdateSchedule}
        galleryImages={extraGalleryImages}
        onAddGalleryImage={handleAddGalleryImage}
        onRemoveGalleryImage={handleRemoveGalleryImage}
      />
    </div>
  );
}
