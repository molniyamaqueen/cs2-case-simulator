import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  ChevronRight, 
  X, 
  Gem, 
  Wallet, 
  Twitter, 
  Send, 
  Award, 
  Globe, 
  Zap, 
  ShieldCheck, 
  MessageCircle,
  Smartphone
} from 'lucide-react';
import { translations } from '../utils/translations';

const Profile = () => {
  // --- STATE ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('RU');
  const [user, setUser] = useState({ 
    username: 'ebaldremal1448', 
    avatar: '' 
  });
  
  // Toggles for Menu
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const t = (key) => translations[lang]?.[key] || translations['EN'][key];

  // --- TELEGRAM DATA ---
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      const u = tg.initDataUnsafe.user;
      setUser({
        username: u.username || u.first_name,
        avatar: u.photo_url || `https://ui-avatars.com/api/?name=${u.first_name}&background=00d2ff&color=fff`
      });
    }
  }, []);

  const languages = [
    { code: 'EN', flag: '🇺🇸', label: 'English' },
    { code: 'RU', flag: '🇷🇺', label: 'Русский' },
    { code: 'UA', flag: '🇺🇦', label: 'Українська' },
    { code: 'KR', flag: '🇰🇷', label: '한국어' },
    { code: 'ZH', flag: '🇨🇳', label: '中文' },
    { code: 'FA', flag: '🇮🇷', label: 'فارسی' }
  ];

  return (
    <div className="w-full flex flex-col font-sans animate-fadeIn select-none pb-12 bg-black min-h-screen">
      
      {/* --- 1. HEADER AREA --- */}
      <div className="flex items-center justify-between px-4 mt-3 mb-4">
        <button 
          onClick={() => setIsMenuOpen(true)} 
          className="p-2.5 bg-zinc-900/50 active:scale-90 transition-all rounded-2xl border border-white/5 shadow-lg"
        >
          <Settings size={20} className="text-zinc-400" />
        </button>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-white/10 rounded-2xl shadow-xl">
          <Gem size={14} className="text-[#00d2ff] drop-shadow-[0_0_5px_rgba(0,210,255,0.5)]" />
          <span className="text-white font-black text-[11px] uppercase tracking-wider">0 TON</span>
        </div>
      </div>

      {/* --- 2. MAIN PROFILE BLOCK (Edge-to-Edge / Flattened) --- */}
      <div className="w-full relative overflow-hidden bg-white py-4 px-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-y border-white/20 mb-3">
        {/* Background Premium Blobs */}
        <div className="absolute top-0 left-[-10%] w-40 h-full bg-purple-400/15 blur-[45px] rounded-full" />
        <div className="absolute bottom-0 right-[-10%] w-40 h-full bg-blue-400/15 blur-[45px] rounded-full" />
        
        <div className="relative z-10 flex items-center justify-between">
          {/* User Info Group */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={user.avatar || 'https://i.pravatar.cc/150?u=a'} 
                className="w-14 h-14 rounded-[18px] object-cover border border-zinc-100 shadow-sm"
                alt="Profile"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#00d2ff] rounded-full border-2 border-white flex items-center justify-center">
                <Zap size={10} className="text-white" fill="currentColor" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <h2 className="text-xl font-black text-zinc-900 leading-tight tracking-tighter">
                @{user.username}
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Inventory cost 0 TON
                </span>
              </div>
            </div>
          </div>
          
          {/* Flattened Stats */}
          <div className="flex items-center gap-5 pr-2">
            <div className="flex flex-col items-center">
              <span className="text-lg font-black text-zinc-900 leading-none">0</span>
              <span className="text-[8px] font-bold text-zinc-400 uppercase mt-1">{t('games')}</span>
            </div>
            <div className="w-px h-8 bg-zinc-200/80" />
            <div className="flex flex-col items-center">
              <span className="text-lg font-black text-zinc-900 leading-none">0</span>
              <span className="text-[8px] font-bold text-zinc-400 uppercase mt-1">Win</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. SECONDARY ACTION ROW (Inventory & Result) --- */}
      <div className="w-full flex flex-col mb-8">
        <button className="w-full py-3.5 bg-zinc-900/30 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 active:bg-white/5 transition-colors group">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">
              Inventory <span className="text-zinc-700 ml-1">0 gifts</span>
            </span>
          </div>
          <div className="flex items-center gap-1 text-zinc-600 group-active:text-white transition-colors">
            <span className="text-[9px] font-black uppercase tracking-widest">{t('result')}</span>
            <ChevronRight size={14} />
          </div>
        </button>
      </div>

      {/* --- 4. REFERRAL BLOCK (Edge-to-Edge / Flattened) --- */}
      <div className="px-6 mb-2">
        <span className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em]">Referral program</span>
      </div>

      <div className="w-full relative overflow-hidden bg-white py-4 px-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-y border-white/20 mb-3">
         <div className="absolute top-0 left-0 w-32 h-full bg-cyan-300/10 blur-[40px]" />
         <div className="absolute bottom-0 right-0 w-32 h-full bg-purple-300/10 blur-[40px]" />
         
         <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="bg-zinc-900 p-2.5 rounded-2xl shadow-lg border border-white/10">
                 <Award size={18} className="text-white" />
               </div>
               <div className="flex flex-col">
                 <div className="flex items-center gap-2">
                    <span className="text-[17px] font-black text-zinc-900">{t('level')} 1</span>
                    <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[8px] font-black rounded-md border border-blue-100">5%</span>
                 </div>
                 <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Active Friends: 1</span>
               </div>
            </div>

            <div className="flex items-center gap-6 pr-2">
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">Earned</span>
                <span className="text-lg font-black text-zinc-900 leading-none tracking-tighter">0 <span className="text-[9px] text-zinc-400 font-bold ml-0.5">TON</span></span>
              </div>
            </div>
         </div>
      </div>

      {/* --- 5. INVITE BUTTON (Edge-to-Edge) --- */}
      <button className="w-full py-5 bg-zinc-900 border-y border-white/10 text-white font-[900] text-xs uppercase tracking-[0.25em] active:bg-zinc-800 transition-all flex items-center justify-center gap-3 shadow-2xl">
        {t('invite')} 
        <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center text-[10px] border border-white/10 font-black">
          +
        </div>
      </button>

      {/* --- 6. SETTINGS MENU (Full Bottom Sheet / Language Logic) --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          {/* Backdrop Blur Overlay */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fadeIn" 
            onClick={() => setIsMenuOpen(false)} 
          />
          
          {/* Sheet Body */}
          <div className="relative w-full bg-[#0d0d0f] border-t border-white/10 px-8 pt-3 pb-12 animate-slideUp">
            {/* Pull Bar */}
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mt-2 mb-8" />
            
            {/* Header Menu */}
            <div className="flex justify-between items-center mb-10">
               <div className="flex flex-col">
                 <h2 className="text-3xl font-black text-white tracking-tighter uppercase">{t('menu')}</h2>
                 <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Version 3.1.0-Flash</span>
               </div>
               <button 
                 onClick={() => setIsMenuOpen(false)} 
                 className="p-3 bg-white/5 rounded-2xl active:bg-white/10 transition-colors"
               >
                 <X size={24} className="text-zinc-400" />
               </button>
            </div>
            
            {/* Language Selection Grid */}
            <div className="flex flex-col gap-4 mb-10">
              <div className="flex items-center gap-2 text-zinc-500 mb-1">
                <Globe size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">{t('language')}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {languages.map(l => (
                  <button 
                    key={l.code} 
                    onClick={() => setLang(l.code)} 
                    className={`flex flex-col items-center justify-center gap-1.5 py-4 rounded-[22px] border transition-all ${
                      lang === l.code 
                        ? 'bg-white text-black border-white shadow-[0_10px_20px_rgba(255,255,255,0.1)] scale-105' 
                        : 'bg-white/5 text-zinc-500 border-white/5 active:bg-white/10'
                    }`}
                  >
                    <span className="text-xl">{l.flag}</span>
                    <span className="text-[10px] font-black">{l.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles Logic */}
            <div className="flex flex-col gap-5 mb-10">
               <div 
                 className="flex justify-between items-center bg-white/5 p-5 rounded-3xl border border-white/5 cursor-pointer"
                 onClick={() => setHapticEnabled(!hapticEnabled)}
               >
                 <div className="flex items-center gap-3">
                   <Smartphone size={18} className="text-zinc-400" />
                   <span className="text-sm font-bold text-white tracking-tight">{t('tactile')}</span>
                 </div>
                 <div className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${hapticEnabled ? 'bg-[#00d2ff]' : 'bg-zinc-800'}`}>
                   <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${hapticEnabled ? 'right-1' : 'right-6'}`} />
                 </div>
               </div>

               <div 
                 className="flex justify-between items-center bg-white/5 p-5 rounded-3xl border border-white/5 cursor-pointer"
                 onClick={() => setAnimationsEnabled(!animationsEnabled)}
               >
                 <div className="flex items-center gap-3">
                   <ShieldCheck size={18} className="text-zinc-400" />
                   <span className="text-sm font-bold text-white tracking-tight">{t('animated')}</span>
                 </div>
                 <div className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${animationsEnabled ? 'bg-[#00d2ff]' : 'bg-zinc-800'}`}>
                   <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${animationsEnabled ? 'right-1' : 'right-6'}`} />
                 </div>
               </div>
            </div>

            {/* Social & Support */}
            <div className="grid grid-cols-2 gap-4 mb-10">
               <button className="flex items-center justify-center gap-3 py-5 bg-zinc-900 border border-white/5 rounded-3xl active:scale-95 transition-all shadow-xl">
                 <Twitter size={20} className="text-blue-400" />
                 <span className="text-xs font-black text-white uppercase tracking-widest">Twitter</span>
               </button>
               <button className="flex items-center justify-center gap-3 py-5 bg-zinc-900 border border-white/5 rounded-3xl active:scale-95 transition-all shadow-xl">
                 <Send size={20} className="text-cyan-400" />
                 <span className="text-xs font-black text-white uppercase tracking-widest">Support</span>
               </button>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 py-5 bg-white/5 text-zinc-500 font-bold rounded-3xl border border-white/5 uppercase tracking-widest text-[10px] active:bg-white/10 transition-colors">
                {t('privacy')}
              </button>
              <button className="flex-[2] py-5 bg-white text-black font-[900] rounded-3xl uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-white/5 active:scale-95 transition-all">
                {t('contact')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;