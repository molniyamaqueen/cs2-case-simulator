import React, { useState, useEffect } from 'react';
import { Settings, ChevronRight, X, Gem, Wallet, Twitter, Video, Send } from 'lucide-react';
import { translations } from '../utils/translations';

const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('EN');
  const [user, setUser] = useState({
    username: 'Guest',
    avatar: 'https://ui-avatars.com/api/?name=G&background=333&color=fff'
  });

  const t = (key) => translations[lang]?.[key] || translations['EN'][key];

  // REAL TELEGRAM DATA FETCH
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      const u = tg.initDataUnsafe.user;
      setUser({
        username: u.username || u.first_name || 'User',
        avatar: u.photo_url || `https://ui-avatars.com/api/?name=${u.first_name}&background=random`
      });
    }
  }, []);

  const languages = [
    { code: 'EN', flag: '🇺🇸' }, { code: 'RU', flag: '🇷🇺' }, { code: 'UA', flag: '🇺🇦' },
    { code: 'KR', flag: '🇰🇷' }, { code: 'ZH', flag: '🇨🇳' }, { code: 'FA', flag: '🇮🇷' }
  ];

  return (
    <div className="w-full flex flex-col gap-4 font-sans animate-fadeIn select-none">
      
      {/* HEADER */}
      <div className="flex items-center justify-between px-1">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="p-2.5 bg-white/5 active:scale-90 transition-transform rounded-2xl"
        >
          <Settings size={20} className="text-zinc-400" />
        </button>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1c1c1e] border border-white/5 rounded-xl">
          <Gem size={14} className="text-blue-400" />
          <span className="text-white font-black text-[10px] tracking-wider uppercase">0 TON</span>
        </div>
      </div>

      {/* MAIN CARD (WHITE GRADIENT WITH BLOBS) */}
      <div className="relative overflow-hidden bg-white rounded-[2.5rem] p-5 pt-8 shadow-2xl">
        {/* Subtle Rainbow Blobs */}
        <div className="absolute top-2 left-4 w-12 h-12 bg-pink-300/20 blur-[35px] rounded-full" />
        <div className="absolute bottom-4 right-6 w-16 h-16 bg-blue-300/20 blur-[45px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-200/10 blur-[25px] rounded-full" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-3">
            <img 
              src={user.avatar} 
              className="w-16 h-16 rounded-[1.4rem] object-cover border-2 border-white shadow-md"
            />
          </div>
          <h2 className="text-lg font-black text-zinc-900 mb-6 tracking-tight">@{user.username}</h2>
          
          <div className="flex w-full justify-around mb-6 px-2">
            <div className="flex flex-col items-center">
              <span className="text-xl font-black text-zinc-900 leading-none">0</span>
              <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mt-1.5">{t('requests')}</span>
            </div>
            <div className="w-[1px] h-8 bg-zinc-100 self-center" />
            <div className="flex flex-col items-center">
              <span className="text-xl font-black text-zinc-900 leading-none">0 TON</span>
              <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mt-1.5">{t('bestWin')}</span>
            </div>
          </div>

          <button className="flex items-center gap-1.5 px-4 py-2 bg-zinc-100/80 rounded-xl active:bg-zinc-200/80 transition-colors">
            <span className="text-[11px] font-black text-zinc-800">{t('result')}</span>
            <ChevronRight size={14} className="text-zinc-400" />
          </button>
        </div>
      </div>

      {/* OPTIONS BAR */}
      <div className="flex items-center justify-between px-2 mt-1">
        <h3 className="text-lg font-black text-white">{t('options')}</h3>
        <button className="px-6 py-2.5 bg-white text-black font-black rounded-xl text-[11px] uppercase active:scale-95 transition-all shadow-lg shadow-white/5">
          {t('deposit')}
        </button>
      </div>

      {/* REFERRAL CARD */}
      <div className="relative overflow-hidden bg-white rounded-[2.5rem] p-5 shadow-2xl">
        <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200/30 blur-[40px] rounded-full" />
        
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex justify-between items-center bg-zinc-50 p-3 rounded-xl border border-zinc-100/50">
            <span className="text-xs font-black text-zinc-900">{t('level')} 1</span>
            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">5%</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-100/50">
              <div className="flex items-center gap-1.5 mb-1">
                <Wallet size={12} className="text-zinc-400" />
                <span className="text-[9px] font-black text-zinc-400 uppercase">{t('earned')}</span>
              </div>
              <span className="text-sm font-black text-zinc-900 uppercase">0 TON</span>
            </div>
            <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-100/50">
              <div className="text-[9px] font-black text-zinc-400 uppercase mb-1.5">{t('friends')}</div>
              <span className="text-sm font-black text-zinc-900">1</span>
            </div>
          </div>

          <button className="w-full py-4 bg-zinc-900 text-white font-black text-sm rounded-2xl active:scale-98 transition-all">
            {t('invite')}
          </button>
        </div>
      </div>

      {/* SETTINGS MENU (BOTTOM SHEET) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-[4px] animate-fadeIn" 
            onClick={() => setIsMenuOpen(false)} 
          />
          <div className="relative w-full max-w-md mx-auto bg-[#111112] rounded-t-[2.5rem] px-6 pt-3 pb-12 border-t border-white/5 animate-slideUp max-h-[90vh] overflow-y-auto">
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mt-2 mb-8" />
            
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-white">{t('menu')}</h2>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/5 rounded-full"><X size={20} /></button>
            </div>

            {/* LANGUAGES GRID */}
            <div className="flex flex-col gap-4 mb-8">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">{t('language')}</span>
              <div className="grid grid-cols-3 gap-2.5">
                {languages.map((l) => (
                  <button 
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[11px] font-black transition-all border ${
                      lang === l.code ? 'bg-white text-black border-white shadow-xl scale-105' : 'bg-white/5 text-zinc-500 border-white/5 active:bg-white/10'
                    }`}
                  >
                    <span className="text-base">{l.flag}</span>
                    <span>{l.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* TOGGLES */}
            <div className="flex flex-col gap-6 mb-10">
              <div className="flex justify-between items-center group">
                <span className="text-[13px] font-bold text-white tracking-tight">{t('tactile')}</span>
                <div className="w-11 h-6 bg-blue-500 rounded-full relative shadow-inner"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md" /></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-bold text-white tracking-tight">{t('animated')}</span>
                <div className="w-11 h-6 bg-blue-500 rounded-full relative shadow-inner"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md" /></div>
              </div>
            </div>

            {/* SOCIAL LINKS */}
            <div className="flex flex-col gap-3 mb-8">
              <SocialLink icon={<Twitter size={18} />} label="X (Twitter)" color="text-blue-400" />
              <SocialLink icon={<Video size={18} />} label="TikTok" color="text-pink-400" />
              <SocialLink icon={<Send size={18} />} label="Channel" color="text-cyan-400" />
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl text-[11px] uppercase tracking-widest">{t('privacy')}</button>
              <button className="flex-[2] py-4 bg-blue-500 text-white font-black rounded-2xl text-[11px] uppercase tracking-widest shadow-lg shadow-blue-500/20">{t('contact')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SocialLink = ({ icon, label, color }) => (
  <div className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-2xl active:bg-white/5 transition-colors">
    <div className="flex items-center gap-3">
      <div className={`${color} bg-white/5 p-2 rounded-xl`}>{icon}</div>
      <span className="text-[12px] font-black text-white">{label}</span>
    </div>
    <ChevronRight size={16} className="text-zinc-600" />
  </div>
);

export default Profile;