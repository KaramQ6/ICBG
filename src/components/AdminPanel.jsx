import React, { useState, useEffect } from 'react';
import { Lock, Unlock, X, Plus, Calendar, Save, Search, Check, Sparkles, Film, Play, Eye, Image as ImageIcon, Trash2 } from 'lucide-react';

export default function AdminPanel({ isOpen, onClose, games, onAddGame, schedule, onUpdateSchedule, galleryImages, onAddGalleryImage, onRemoveGalleryImage }) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('schedule'); // 'schedule', 'addGame', or 'gallery'

  // Schedule form state
  const [nextHangout, setNextHangout] = useState('');
  const [thursdayDate, setThursdayDate] = useState('');
  const [fridayDate, setFridayDate] = useState('');
  const [featuredTitles, setFeaturedTitles] = useState([]);
  const [gameSearch, setGameSearch] = useState('');

  // Add Game form state
  const [newGameTitle, setNewGameTitle] = useState('');
  const [newGameType, setNewGameType] = useState('Light');
  const [newGameComp, setNewGameComp] = useState('Competitive');
  const [newGameTheme, setNewGameTheme] = useState('');
  const [newGamePlayers, setNewGamePlayers] = useState('');
  const [newGameTime, setNewGameTime] = useState('');
  const [newGameYear, setNewGameYear] = useState('');
  const [newGameExpansion, setNewGameExpansion] = useState('None');
  const [newGameHowToPlay, setNewGameHowToPlay] = useState('');
  const [newGameQuickSummary, setNewGameQuickSummary] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Gallery form state
  const [galleryUrl, setGalleryUrl] = useState('');
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCategory, setGalleryCategory] = useState('Play Session');
  const [galleryDesc, setGalleryDesc] = useState('');
  const [galleryAspect, setGalleryAspect] = useState('aspect-square');

  // Sync state with props when open, reset auth when closed
  useEffect(() => {
    if (isOpen) {
      setNextHangout(schedule.nextHangout || '');
      setThursdayDate(schedule.thursdayDate || '');
      setFridayDate(schedule.fridayDate || '');
      setFeaturedTitles(schedule.featuredGameTitles || []);
      setFormSuccess('');
    } else {
      // Reset auth when panel closes so passcode is required again
      setIsAuthenticated(false);
      setPasscode('');
      setAuthError('');
    }
  }, [isOpen, schedule]);

  if (!isOpen) return null;

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (passcode === '1983') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('كلمة المرور غير صحيحة. يرجى المحاولة مجدداً.');
      setPasscode('');
    }
  };

  const handleScheduleSave = (e) => {
    e.preventDefault();
    onUpdateSchedule({
      nextHangout,
      thursdayDate,
      fridayDate,
      featuredGameTitles: featuredTitles
    });
    setFormSuccess('تم تحديث جدول وفعاليات الأسبوع بنجاح!');
    setTimeout(() => setFormSuccess(''), 3000);
  };

  const handleAddGameSubmit = (e) => {
    e.preventDefault();
    if (!newGameTitle) return;

    const gameObj = {
      num: String(games.length + 1),
      title: newGameTitle,
      type: newGameType,
      competition: newGameComp,
      theme: newGameTheme || 'Strategic Board Game',
      players: newGamePlayers || '2-4 Players',
      time: newGameTime || '30-45 Min',
      year: newGameYear || new Date().getFullYear().toString(),
      expansion: newGameExpansion || 'None',
      box_img: '', // monogram fallback
      box_link: '',
      play_img: '',
      play_link: '',
      how_to_play: newGameHowToPlay,
      quick_summary: newGameQuickSummary,
      rating: ''
    };

    onAddGame(gameObj);
    setFormSuccess(`تمت إضافة لعبة "${newGameTitle}" إلى الأرشيف بنجاح!`);
    
    // Reset form
    setNewGameTitle('');
    setNewGameTheme('');
    setNewGamePlayers('');
    setNewGameTime('');
    setNewGameYear('');
    setNewGameExpansion('None');
    setNewGameHowToPlay('');
    setNewGameQuickSummary('');

    setTimeout(() => setFormSuccess(''), 3000);
  };

  const toggleFeaturedGame = (title) => {
    if (featuredTitles.includes(title)) {
      setFeaturedTitles(featuredTitles.filter(t => t !== title));
    } else {
      if (featuredTitles.length >= 4) {
        alert('يمكنك تحديد 4 ألعاب كحد أقصى للجدول الأسبوعي.');
        return;
      }
      setFeaturedTitles([...featuredTitles, title]);
    }
  };

  // Filter games based on search text in the scheduler
  const filteredGamesForSelect = games.filter(game =>
    game.title.toLowerCase().includes(gameSearch.toLowerCase()) ||
    (game.theme && game.theme.toLowerCase().includes(gameSearch.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Dark backdrop overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-obsidian/90 backdrop-blur-md transition-all duration-300"
      />

      {/* Main Admin Card */}
      <div className="relative w-full max-w-3xl bg-[#12121A] border border-champagne/20 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(201,168,76,0.15)] z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne shadow-[0_0_15px_rgba(201,168,76,0.1)]">
              {isAuthenticated ? <Unlock size={18} /> : <Lock size={18} />}
            </div>
            <div className="text-left">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-champagne font-bold block">ICBG CLUB ATELIER</span>
              <h3 className="font-sans font-black text-xl text-ivory">Admin Control Center</h3>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-champagne/40 text-ivory/60 hover:text-champagne transition-all duration-300 flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 md:p-12 flex flex-col items-center justify-center flex-1">
            <div className="w-16 h-16 rounded-full bg-champagne/5 border border-champagne/20 flex items-center justify-center text-champagne mb-6 animate-pulse">
              <Lock size={28} />
            </div>
            <h4 className="font-sans font-bold text-lg text-ivory mb-2 text-center">بوابة الإدارة الخاصة</h4>
            <p className="font-sans font-light text-xs text-ivory/60 text-center max-w-sm mb-8 leading-relaxed">
              يرجى إدخال رمز المرور السري الخاص بنادي إربد لألعاب الطاولة (ICBG) لفتح لوحة التحكم والتعديل.
            </p>

            <form onSubmit={handleAuthSubmit} className="w-full max-w-xs flex flex-col items-center">
              <input
                type="password"
                placeholder="رمز المرور (Passcode)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full py-4 px-6 bg-obsidian border border-ivory/10 focus:border-champagne/50 text-ivory placeholder-ivory/20 rounded-full font-mono text-center text-lg tracking-[0.3em] focus:outline-none transition-all duration-300"
                autoFocus
              />
              {authError && (
                <span className="text-[11px] font-sans text-red-400 mt-3 text-center">{authError}</span>
              )}

              <button
                type="submit"
                className="mt-6 w-full py-4 bg-gradient-to-r from-champagne to-[#E3CD89] text-obsidian rounded-full font-sans font-bold text-xs uppercase tracking-widest shadow-lg shadow-champagne/15 hover:scale-[1.02] transition-all duration-300"
              >
                دخول البوابة
              </button>
            </form>
            <span className="font-mono text-[9px] text-ivory/20 mt-10">HINT: YEAR OF JENGA RELEASE</span>
          </div>
        ) : (
          /* Authenticated Dashboard Panel */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-white/5 bg-obsidian/50 px-6">
              <button
                onClick={() => { setActiveTab('schedule'); setFormSuccess(''); }}
                className={`px-6 py-4 font-mono text-xs uppercase tracking-widest relative transition-all duration-300 ${
                  activeTab === 'schedule' ? 'text-champagne font-bold' : 'text-ivory/40 hover:text-ivory/80'
                }`}
              >
                جدول الفعاليات الأسبوعية
                {activeTab === 'schedule' && (
                  <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-champagne" />
                )}
              </button>
              
              <button
                onClick={() => { setActiveTab('addGame'); setFormSuccess(''); }}
                className={`px-6 py-4 font-mono text-xs uppercase tracking-widest relative transition-all duration-300 ${
                  activeTab === 'addGame' ? 'text-champagne font-bold' : 'text-ivory/40 hover:text-ivory/80'
                }`}
              >
                إضافة لعبة للأرشيف
                {activeTab === 'addGame' && (
                  <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-champagne" />
                )}
              </button>
              
              <button
                onClick={() => { setActiveTab('gallery'); setFormSuccess(''); }}
                className={`px-6 py-4 font-mono text-xs uppercase tracking-widest relative transition-all duration-300 ${
                  activeTab === 'gallery' ? 'text-champagne font-bold' : 'text-ivory/40 hover:text-ivory/80'
                }`}
              >
                معرض الصور
                {activeTab === 'gallery' && (
                  <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-champagne" />
                )}
              </button>
            </div>

            {/* Content Container (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              
              {/* Success Notification Bar */}
              {formSuccess && (
                <div className="bg-emerald-950/40 border border-emerald-500/20 p-4 rounded-2xl flex items-center gap-3 text-emerald-400 font-sans text-xs">
                  <Sparkles size={16} className="text-emerald-400 shrink-0" />
                  <span>{formSuccess}</span>
                </div>
              )}

              {activeTab === 'schedule' ? (
                /* TAB 1: SCHEDULE MANAGER FORM */
                <form onSubmit={handleScheduleSave} className="space-y-6 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Next Gathering Input */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[9px] uppercase tracking-wider text-ivory/40">اللقاء الرئيسي (العنوان)</label>
                      <input
                        type="text"
                        value={nextHangout}
                        onChange={(e) => setNextHangout(e.target.value)}
                        placeholder="مثال: Friday, 22/5/2026 7:30 PM"
                        className="py-3 px-4 bg-obsidian border border-white/5 focus:border-champagne/40 rounded-2xl font-sans text-xs text-ivory focus:outline-none transition-all"
                        required
                      />
                    </div>

                    {/* Thursday Date/Time Input */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[9px] uppercase tracking-wider text-ivory/40">جلسة يوم الخميس (Thursday)</label>
                      <input
                        type="text"
                        value={thursdayDate}
                        onChange={(e) => setThursdayDate(e.target.value)}
                        placeholder="مثال: 28/5/26 7:00 PM"
                        className="py-3 px-4 bg-obsidian border border-white/5 focus:border-champagne/40 rounded-2xl font-sans text-xs text-ivory focus:outline-none transition-all"
                        required
                      />
                    </div>

                    {/* Friday Date/Time Input */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[9px] uppercase tracking-wider text-ivory/40">جلسة يوم الجمعة (Friday)</label>
                      <input
                        type="text"
                        value={fridayDate}
                        onChange={(e) => setFridayDate(e.target.value)}
                        placeholder="مثال: 22/5/26 7:00 PM"
                        className="py-3 px-4 bg-obsidian border border-white/5 focus:border-champagne/40 rounded-2xl font-sans text-xs text-ivory focus:outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Featured Games Selection (Checklist) */}
                  <div className="border-t border-white/5 pt-6 flex flex-col gap-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <h4 className="font-sans font-bold text-sm text-ivory">ألعاب الأسبوع البارزة (Featured Games)</h4>
                        <p className="font-sans text-[10px] text-ivory/40">اختر حتى 4 ألعاب ليتم عرضها في الصفحة الرئيسية</p>
                      </div>
                      <div className="font-mono text-[10px] bg-champagne/10 border border-champagne/20 text-champagne px-3 py-1 rounded-full w-max">
                        تم اختيار {featuredTitles.length} من 4 ألعاب
                      </div>
                    </div>

                    {/* Selector search */}
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-ivory/30">
                        <Search size={14} />
                      </div>
                      <input
                        type="text"
                        placeholder="ابحث عن لعبة لإضافتها للجدول..."
                        value={gameSearch}
                        onChange={(e) => setGameSearch(e.target.value)}
                        className="w-full py-2.5 pl-11 pr-4 bg-obsidian border border-white/5 focus:border-champagne/30 text-ivory placeholder-ivory/30 rounded-xl font-sans text-xs focus:outline-none transition-all"
                      />
                    </div>

                    {/* Selectable grid list */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 max-h-[220px] overflow-y-auto border border-white/5 rounded-2xl p-4 bg-obsidian/30">
                      {filteredGamesForSelect.map((game) => {
                        const isFeatured = featuredTitles.includes(game.title);
                        return (
                          <button
                            type="button"
                            key={game.title}
                            onClick={() => toggleFeaturedGame(game.title)}
                            className={`p-3 rounded-xl border flex items-center justify-between transition-all duration-300 text-left ${
                              isFeatured 
                                ? 'bg-champagne/5 border-champagne text-champagne' 
                                : 'bg-[#15151D] border-white/5 text-ivory/60 hover:border-white/10 hover:text-ivory'
                            }`}
                          >
                            <span className="font-sans font-bold text-xs truncate max-w-[170px]">{game.title}</span>
                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                              isFeatured ? 'bg-champagne border-champagne text-obsidian' : 'border-white/20'
                            }`}>
                              {isFeatured && <Check size={10} strokeWidth={4} />}
                            </div>
                          </button>
                        );
                      })}
                      {filteredGamesForSelect.length === 0 && (
                        <div className="col-span-full py-6 text-center text-ivory/30 font-sans text-xs">
                          لا يوجد ألعاب مطابقة للبحث
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="border-t border-white/5 pt-6 flex justify-end">
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-gradient-to-r from-champagne to-[#E3CD89] text-obsidian rounded-full font-sans font-bold text-xs uppercase tracking-widest shadow-lg shadow-champagne/15 hover:scale-[1.02] transition-all flex items-center gap-2"
                    >
                      <Save size={14} /> حفظ التغييرات والجدول
                    </button>
                  </div>
                </form>
              ) : activeTab === 'addGame' ? (
                /* TAB 2: ADD NEW BOARD GAME FORM */
                <form onSubmit={handleAddGameSubmit} className="space-y-6 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Game Title */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[9px] uppercase tracking-wider text-ivory/40">اسم اللعبة (Game Title) *</label>
                      <input
                        type="text"
                        value={newGameTitle}
                        onChange={(e) => setNewGameTitle(e.target.value)}
                        placeholder="مثال: Scythe"
                        className="py-3 px-4 bg-obsidian border border-white/5 focus:border-champagne/40 rounded-2xl font-sans text-xs text-ivory focus:outline-none transition-all"
                        required
                      />
                    </div>

                    {/* Complexity Type Dropdown */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[9px] uppercase tracking-wider text-ivory/40">مستوى الصعوبة (Complexity Classification)</label>
                      <select
                        value={newGameType}
                        onChange={(e) => setNewGameType(e.target.value)}
                        className="py-3 px-4 bg-obsidian border border-white/5 focus:border-champagne/40 rounded-2xl font-sans text-xs text-ivory focus:outline-none transition-all"
                      >
                        <option value="Social">Social (اجتماعية)</option>
                        <option value="Easy">Easy (سهلة)</option>
                        <option value="Light">Light (خفيفة)</option>
                        <option value="Medium">Medium (متوسطة)</option>
                        <option value="Heavy">Heavy (ثقيلة)</option>
                      </select>
                    </div>

                    {/* Format Strategy (Competition) */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[9px] uppercase tracking-wider text-ivory/40">نمط اللعب (Competition Format)</label>
                      <select
                        value={newGameComp}
                        onChange={(e) => setNewGameComp(e.target.value)}
                        className="py-3 px-4 bg-obsidian border border-white/5 focus:border-champagne/40 rounded-2xl font-sans text-xs text-ivory focus:outline-none transition-all"
                      >
                        <option value="Competitive">Competitive (تنافسي)</option>
                        <option value="Cooperative">Cooperative (تعاوني)</option>
                      </select>
                    </div>

                    {/* Themes */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[9px] uppercase tracking-wider text-ivory/40">موضوع أو تصنيف اللعبة (Theme / Mechanics)</label>
                      <input
                        type="text"
                        value={newGameTheme}
                        onChange={(e) => setNewGameTheme(e.target.value)}
                        placeholder="مثال: Strategy, Resource Management"
                        className="py-3 px-4 bg-obsidian border border-white/5 focus:border-champagne/40 rounded-2xl font-sans text-xs text-ivory focus:outline-none transition-all"
                      />
                    </div>

                    {/* Players count */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[9px] uppercase tracking-wider text-ivory/40">عدد اللاعبين (Players count)</label>
                      <input
                        type="text"
                        value={newGamePlayers}
                        onChange={(e) => setNewGamePlayers(e.target.value)}
                        placeholder="مثال: 1 - 5"
                        className="py-3 px-4 bg-obsidian border border-white/5 focus:border-champagne/40 rounded-2xl font-sans text-xs text-ivory focus:outline-none transition-all"
                      />
                    </div>

                    {/* Playtime */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[9px] uppercase tracking-wider text-ivory/40">مدة اللعب (Playtime)</label>
                      <input
                        type="text"
                        value={newGameTime}
                        onChange={(e) => setNewGameTime(e.target.value)}
                        placeholder="مثال: 90 - 115 Min"
                        className="py-3 px-4 bg-obsidian border border-white/5 focus:border-champagne/40 rounded-2xl font-sans text-xs text-ivory focus:outline-none transition-all"
                      />
                    </div>

                    {/* Year */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[9px] uppercase tracking-wider text-ivory/40">سنة الإصدار (Release Year)</label>
                      <input
                        type="text"
                        value={newGameYear}
                        onChange={(e) => setNewGameYear(e.target.value)}
                        placeholder="مثال: 2016"
                        className="py-3 px-4 bg-obsidian border border-white/5 focus:border-champagne/40 rounded-2xl font-sans text-xs text-ivory focus:outline-none transition-all"
                      />
                    </div>

                    {/* Expansion */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[9px] uppercase tracking-wider text-ivory/40">إصدار التوسعة (Expansion)</label>
                      <input
                        type="text"
                        value={newGameExpansion}
                        onChange={(e) => setNewGameExpansion(e.target.value)}
                        placeholder="مثال: None أو Invaders from Afar"
                        className="py-3 px-4 bg-obsidian border border-white/5 focus:border-champagne/40 rounded-2xl font-sans text-xs text-ivory focus:outline-none transition-all"
                      />
                    </div>

                    {/* How to play video link */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[9px] flex items-center gap-1 uppercase tracking-wider text-ivory/40">
                        <Play size={10} /> فيديو كيفية اللعب (How-to-play Youtube Link)
                      </label>
                      <input
                        type="url"
                        value={newGameHowToPlay}
                        onChange={(e) => setNewGameHowToPlay(e.target.value)}
                        placeholder="رابط فيديو اليوتيوب"
                        className="py-3 px-4 bg-obsidian border border-white/5 focus:border-champagne/40 rounded-2xl font-sans text-xs text-ivory focus:outline-none transition-all"
                      />
                    </div>

                    {/* Quick Summary video link */}
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[9px] flex items-center gap-1 uppercase tracking-wider text-ivory/40">
                        <Film size={10} /> فيديو ملخص سريع (Quick Summary Youtube Link)
                      </label>
                      <input
                        type="url"
                        value={newGameQuickSummary}
                        onChange={(e) => setNewGameQuickSummary(e.target.value)}
                        placeholder="رابط فيديو ملخص اليوتيوب"
                        className="py-3 px-4 bg-obsidian border border-white/5 focus:border-champagne/40 rounded-2xl font-sans text-xs text-ivory focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Form Submission Button */}
                  <div className="border-t border-white/5 pt-6 flex justify-end">
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-gradient-to-r from-champagne to-[#E3CD89] text-obsidian rounded-full font-sans font-bold text-xs uppercase tracking-widest shadow-lg shadow-champagne/15 hover:scale-[1.02] transition-all flex items-center gap-2"
                    >
                      <Plus size={14} /> إضافة اللعبة للأرشيف
                    </button>
                  </div>
                </form>
              ) : activeTab === 'gallery' ? (
                /* TAB 3: GALLERY MANAGEMENT */
                <div className="space-y-6 text-left">
                  {/* Add new image form */}
                  <div className="bg-obsidian/30 border border-white/5 rounded-2xl p-6 space-y-4">
                    <h4 className="font-sans font-bold text-sm text-ivory flex items-center gap-2">
                      <ImageIcon size={14} className="text-champagne" /> إضافة صورة جديدة للمعرض
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[9px] uppercase tracking-wider text-ivory/40">رابط الصورة (Image URL) *</label>
                        <input
                          type="url"
                          value={galleryUrl}
                          onChange={(e) => setGalleryUrl(e.target.value)}
                          placeholder="https://example.com/photo.jpg"
                          className="py-3 px-4 bg-obsidian border border-white/5 focus:border-champagne/40 rounded-2xl font-sans text-xs text-ivory focus:outline-none transition-all"
                        />
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[9px] uppercase tracking-wider text-ivory/40">عنوان الصورة (Title) *</label>
                        <input
                          type="text"
                          value={galleryTitle}
                          onChange={(e) => setGalleryTitle(e.target.value)}
                          placeholder="مثال: Game Night Legends"
                          className="py-3 px-4 bg-obsidian border border-white/5 focus:border-champagne/40 rounded-2xl font-sans text-xs text-ivory focus:outline-none transition-all"
                        />
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[9px] uppercase tracking-wider text-ivory/40">التصنيف (Category)</label>
                        <select
                          value={galleryCategory}
                          onChange={(e) => setGalleryCategory(e.target.value)}
                          className="py-3 px-4 bg-obsidian border border-white/5 focus:border-champagne/40 rounded-2xl font-sans text-xs text-ivory focus:outline-none transition-all"
                        >
                          <option value="Play Session">Play Session</option>
                          <option value="Atelier Vibe">Atelier Vibe</option>
                          <option value="Social Deduction">Social Deduction</option>
                          <option value="Game Night">Game Night</option>
                          <option value="Community">Community</option>
                          <option value="Tournament">Tournament</option>
                        </select>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[9px] uppercase tracking-wider text-ivory/40">شكل الصورة (Aspect Ratio)</label>
                        <select
                          value={galleryAspect}
                          onChange={(e) => setGalleryAspect(e.target.value)}
                          className="py-3 px-4 bg-obsidian border border-white/5 focus:border-champagne/40 rounded-2xl font-sans text-xs text-ivory focus:outline-none transition-all"
                        >
                          <option value="aspect-[3/4]">عمودي (Portrait 3:4)</option>
                          <option value="aspect-square">مربع (Square)</option>
                          <option value="aspect-[4/3]">أفقي (Landscape 4:3)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[9px] uppercase tracking-wider text-ivory/40">الوصف (Description)</label>
                      <textarea
                        value={galleryDesc}
                        onChange={(e) => setGalleryDesc(e.target.value)}
                        placeholder="وصف مختصر للصورة..."
                        rows={2}
                        className="py-3 px-4 bg-obsidian border border-white/5 focus:border-champagne/40 rounded-2xl font-sans text-xs text-ivory focus:outline-none transition-all resize-none"
                      />
                    </div>
                    
                    {/* Preview */}
                    {galleryUrl && (
                      <div className="border border-white/5 rounded-2xl p-3 bg-obsidian/50">
                        <p className="font-mono text-[9px] uppercase tracking-wider text-ivory/40 mb-2">معاينة الصورة</p>
                        <img
                          src={galleryUrl}
                          alt="Preview"
                          className="w-full max-h-40 object-cover rounded-xl border border-white/5"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                    )}
                    
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          if (!galleryUrl || !galleryTitle) {
                            alert('يرجى إدخال رابط الصورة والعنوان.');
                            return;
                          }
                          onAddGalleryImage({
                            src: galleryUrl,
                            title: galleryTitle,
                            category: galleryCategory,
                            aspect: galleryAspect,
                            desc: galleryDesc || 'A captured moment from our community gatherings.'
                          });
                          setGalleryUrl('');
                          setGalleryTitle('');
                          setGalleryDesc('');
                          setGalleryCategory('Play Session');
                          setGalleryAspect('aspect-square');
                          setFormSuccess('تمت إضافة الصورة للمعرض بنجاح!');
                          setTimeout(() => setFormSuccess(''), 3000);
                        }}
                        className="px-8 py-3.5 bg-gradient-to-r from-champagne to-[#E3CD89] text-obsidian rounded-full font-sans font-bold text-xs uppercase tracking-widest shadow-lg shadow-champagne/15 hover:scale-[1.02] transition-all flex items-center gap-2"
                      >
                        <Plus size={14} /> إضافة الصورة
                      </button>
                    </div>
                  </div>
                  
                  {/* Existing admin-added images */}
                  {galleryImages && galleryImages.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-sans font-bold text-sm text-ivory">الصور المضافة ({galleryImages.length})</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {galleryImages.map((img, idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-[#15151D] border border-white/5 rounded-2xl p-3 group">
                            <img
                              src={img.src}
                              alt={img.title}
                              className="w-16 h-16 rounded-xl object-cover border border-white/5 shrink-0"
                              onError={(e) => { e.target.src = ''; e.target.className = 'w-16 h-16 rounded-xl bg-champagne/10 border border-champagne/20 shrink-0'; }}
                            />
                            <div className="flex-1 min-w-0 text-left">
                              <p className="font-sans font-bold text-xs text-ivory truncate">{img.title}</p>
                              <p className="font-mono text-[9px] text-ivory/40">{img.category}</p>
                            </div>
                            <button
                              onClick={() => {
                                onRemoveGalleryImage(idx);
                                setFormSuccess('تم حذف الصورة من المعرض.');
                                setTimeout(() => setFormSuccess(''), 3000);
                              }}
                              className="w-8 h-8 rounded-full border border-white/5 hover:border-red-500/40 text-ivory/30 hover:text-red-400 transition-all flex items-center justify-center shrink-0"
                              title="حذف الصورة"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
