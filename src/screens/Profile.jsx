import React, { useState, useEffect, useMemo } from 'react';
import { Settings, ChevronRight, X, Gem, Wallet, Twitter, Video, Send } from 'lucide-react';
import { translations } from '../utils/translations';

const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [user, setUser] = useState({
    username: 'Guest',
    avatar: 'https://ui-avatars.com/api/?name=G&background=222&color=fff'
  });

  // Хелпер для перевода
  const t = (key) => translations[currentLang]?.[key] || translations['EN'][key];

  // Тянем реальные данные ТГ
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

  const langOptions = [
    { code: 'EN', flag: '🇺🇸' }, { code: 'RU', flag: '🇷🇺' }, { code: 'UA', flag: '🇺🇦' },
    { code: 'KR', flag: '🇰🇷' }, { code: 'ZH', flag: '🇨🇳' }, { code: 'FA', flag: '🇮🇷' }
  ];

  return (
    <div className="w-full flex flex-col gap-4 font-sans animate-fadeIn select-none">
      
      {/* HEADER: Компактный и чистый */}
      <div className="flex items-center justify-between px-1">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="p-2.5 bg-white/5 active:bg-white/10 rounded-2xl transition-all"
        >
          <Settings size={18} className="text-zinc-400" />
        </button>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1c1c1e] border border-white/5 rounded-xl">
          <Gem size={14} className="text-blue-400" />
          <span className="text-white font-black text-[10px] tracking-wider uppercase">0 TON</span>
        </div>
      </div>

      {/* MAIN CARD: Уменьшенные отступы и тонкие блики */}
      <div className="relative overflow-hidden bg-white rounded-[2.2rem] p-4 shadow-xl">
        <div className="absolute top-2 left-4 w-12 h-12 bg-pink-300/20 blur-[30px] rounded-full" />
        <div className="absolute bottom-2 right-6 w-16 h-16 bg-blue-300/20 blur-[40px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-yellow-200/10 blur-[25px] rounded-full" />
        
        <div className="relative z-10 flex flex-col items-center">
          <img 
            src={user.avatar} 
            alt="Avatar" 
            className="w-14 h-14 rounded-[1.2rem] object-cover border-[1.5px] border-white shadow-sm mb-2"
          />
          <h2 className="text-base font-black text-zinc-900 mb-5 tracking-tight">@{user.username}</h2>
          
          <div className="flex w-full justify-around mb-5">
            <div className="flex flex-col items-center">
              <span className="text-lg font-black text-zinc-900 leading-none">0</span>
              <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mt-1">{t('requests')}</span>
            </div>
            <div className="w-px h-6 bg-zinc-100 self-center" />
            <div className="flex flex-col items-center">
              <span className="text-lg font-black text-zinc-900 leading-none">0 TON</span>
              <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mt-1">{t('bestWin')}</span>
            </div>
          </div>

          <button className="flex items-center gap-1 px-3.5 py-1.5 bg-zinc-100/60 rounded-xl hover:bg-zinc-200/60 transition-colors">
            <span className="text-[10px] font-black text-zinc-800">{t('result')}</span>
            <ChevronRight size={12} className="text-zinc-400" />
          </button>
        </div>
      </div>

      {/* OPTIONS BAR */}
      <div className="flex items-center justify-between px-2 mt-1">
        <h3 className="text-base font-black text-white">{t('options')}</h3>
        <button className="px-5 py-1.5 bg-white text-black font-black rounded-xl text-[10px] uppercase shadow-lg shadow-white/5 active:scale-95 transition-transform">
          {t('deposit')}
        </button>
      </div>

      {/* REFERRAL CARD: Компактная версия */}
      <div className="relative overflow-hidden bg-white rounded-[2.2rem] p-4 shadow-xl">
        <div className="absolute top-0 right-0 w-16 h-16 bg-purple-200/30 blur-[30px] rounded-full" />
        
        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex justify-between items-center bg-zinc-50/80 p-2.5 rounded-xl border border-zinc-100/50">
            <span className="text-[11px] font-black text-zinc-900">{t('level')} 1</span>
            <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">5%</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-zinc-50/80 p-3 rounded-xl border border-zinc-100/50">
              <div className="flex items-center gap-1 mb-0.5">
                <Wallet size={10} className="text-zinc-400" />
                <span className="text-[8px] font-black text-zinc-400 uppercase">{t('earned')}</span>
              </div>
              <span className="text-xs font-black text-zinc-900 uppercase">0 TON</span>
            </div>
            <div className="bg-zinc-50/80 p-3 rounded-xl border border-zinc-100/50">
              <div className="text-[8px] font-black text-zinc-400 uppercase mb-0.5">{t('friends')}</div>
              <span className="text-xs font-black text-zinc-900">1</span>
            </div>
          </div>

          <button className="w-full py-3 bg-zinc-900 text-white font-black text-xs uppercase tracking-wider rounded-xl active:scale-95 transition-all shadow-md">
            {t('invite')}
          </button>
        </div>
      </div>

      {/* BOTTOM SHEET MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={() => setIsMenuOpen(false)} />
          <div className="relative w-full max-w-md mx-auto bg-[#111112] rounded-t-[2.5rem] px-6 pt-4 pb-12 border-t border-white/5 animate-slideUp">
            <div className="w-10 h-1 bg-white/10 rounded-full mx-auto mb-6" />
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-white">{t('menu')}</h2>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/5 rounded-full active:bg-white/10 text-zinc-400">
                <X size={18} />
              </button>
            </div>

            {/* LANGUAGES WITH FLAGS */}
            <div className="flex flex-col gap-3 mb-8">
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">{t('language')}</span>
              <div className="grid grid-cols-3 gap-2">
                {langOptions.map((l) => (
                  <button 
                    key={l.code}
                    onClick={() => setCurrentLang(l.code)}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black transition-all border ${
                      currentLang === l.code 
                        ? 'bg-white text-black border-white shadow-lg' 
                        : 'bg-white/5 text-zinc-500 border-white/5 active:bg-white/10'
                    }`}
                  >
                    <span className="text-sm">{l.flag}</span>
                    <span>{l.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* IOS STYLE SWITCHES */}
            <div className="flex flex-col gap-5 mb-8">
              <SwitchRow label={t('tactile')} active={true} />
              <SwitchRow label={t('animated')} active={true} />
            </div>

            {/* LINKS SECTION */}
            <div className="flex flex-col gap-2 mb-8">
              <SocialLink icon={<Twitter size={16} />} label="X (Twitter)" color="text-blue-400" />
              <SocialLink icon={<Video size={16} />} label="TikTok" color="text-pink-400" />
              <SocialLink icon={<Send size={16} />} label="Channel" color="text-cyan-400" />
            </div>

            {/* FOOTER BUTTONS */}
            <div className="flex gap-2">
              <button className="flex-1 py-3.5 bg-white/5 text-zinc-400 font-bold rounded-2xl text-[10px] uppercase tracking-widest">{t('privacy')}</button>
              <button className="flex-[2] py-3.5 bg-blue-500 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20">{t('contact')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Вспомогательные компоненты для чистоты кода
const SwitchRow = ({ label, active }) => (
  <div className="flex justify-between items-center">
    <span className="text-xs font-bold text-white tracking-tight">{label}</span>
    <div className={`w-10 h-5 rounded-full relative transition-colors ${active ? 'bg-blue-500' : 'bg-zinc-700'}`}>
      <div className={`absolute top-0.5 right-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${active ? 'translate-x-0' : '-translate-x-5'}`} />
    </div>
  </div>
);

const SocialLink = ({ icon, label, color }) => (
  <div className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-2xl active:bg-white/5 transition-colors">
    <div className="flex items-center gap-3">
      <div className={`${color} bg-white/5 p-1.5 rounded-lg`}>{icon}</div>
      <span className="text-[11px] font-bold text-white">{label}</span>
    </div>
    <ChevronRight size={14} className="text-zinc-600" />
  </div>
);

export default Profile;