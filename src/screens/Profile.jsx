import React, { useState, useEffect } from 'react';
import { Settings, ChevronRight, X, Gem, Wallet, Twitter, Video, Send } from 'lucide-react';
import { translations } from '../utils/translations';

const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('RU');
  const [user, setUser] = useState({
    username: 'ebaldremal1448',
    avatar: 'https://i.pravatar.cc/150?u=1' // Заглушка
  });

  const t = (key) => translations[lang]?.[key] || translations['EN'][key];

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
    { code: 'EN', flag: '🇺🇸' }, { code: 'RU', flag: '🇷🇺' }, { code: 'UA', flag: '🇺🇦' },
    { code: 'KR', flag: '🇰🇷' }, { code: 'ZH', flag: '🇨🇳' }, { code: 'FA', flag: '🇮🇷' }
  ];

  return (
    <div className="w-full flex flex-col gap-6 font-sans animate-fadeIn select-none pb-10">
      
      {/* HEADER: Settings & Balance */}
      <div className="flex items-center justify-between px-6 mt-2">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="p-3 bg-[#1c1c1e] active:scale-90 transition-transform rounded-2xl border border-white/5"
        >
          <Settings size={22} className="text-zinc-400" />
        </button>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#1c1c1e] border border-white/10 rounded-2xl shadow-lg">
          <Gem size={16} className="text-[#00d2ff]" />
          <span className="text-white font-black text-xs uppercase tracking-widest">0 TON</span>
        </div>
      </div>

      {/* MAIN PROFILE CARD */}
      <div className="mx-[24px] relative overflow-hidden bg-gradient-to-br from-white/10 via-zinc-900 to-black rounded-[34px] p-8 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Декоративные элементы (шарики и свечение) */}
        <div className="absolute top-[-10%] left-[-5%] w-32 h-32 bg-purple-500/20 blur-[50px] rounded-full" />
        <div className="absolute top-[20%] right-[-10%] w-40 h-40 bg-blue-500/20 blur-[60px] rounded-full" />
        <div className="absolute bottom-[10%] left-[20%] w-20 h-20 bg-pink-500/10 blur-[40px] rounded-full" />
        
        <div className="relative z-10 flex flex-col items-center">
          {/* Square Rounded Avatar */}
          <div className="relative mb-5">
            <div className="absolute inset-0 bg-white/10 blur-xl rounded-[24px]" />
            <img 
              src={user.avatar} 
              className="w-[85px] h-[85px] rounded-[24px] object-cover border-2 border-white/20 relative z-10"
              alt="User Avatar"
            />
          </div>

          {/* Username */}
          <h2 className="text-[30px] font-[800] text-white mb-8 text-center leading-tight tracking-tight">
            @{user.username}
          </h2>
          
          {/* Stats Pill Card */}
          <div className="w-full bg-black/40 backdrop-blur-xl rounded-[24px] border border-white/5 p-5 flex justify-around">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-white leading-none">0</span>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-2">{t('games')}</span>
            </div>
            <div className="w-[1px] h-10 bg-white/10 self-center" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-white leading-none">0 TON</span>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-2">{t('bestWin')}</span>
            </div>
          </div>

          {/* Bottom Row Result Button */}
          <button className="mt-6 flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors border border-white/5">
            <span className="text-xs font-black text-zinc-400 tracking-widest uppercase">{t('result')}</span>
            <ChevronRight size={16} className="text-zinc-600" />
          </button>
        </div>

        {/* Затемнение нижней части */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      </div>

      {/* OPTIONS SECTION */}
      <div className="flex items-center justify-between px-8 mt-2">
        <h3 className="text-xl font-[800] text-white tracking-tight">{t('options')}</h3>
        <button className="px-7 py-3 bg-white text-black font-black rounded-2xl text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95 transition-all">
          {t('deposit')}
        </button>
      </div>

      {/* REFERRAL PROGRAM CARD */}
      <div className="mx-[24px] relative overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-800 to-black rounded-[32px] p-[22px] border border-white/5 shadow-2xl">
        {/* Разноцветные мутные шарики внутри */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-cyan-500/10 blur-[40px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full" />
        
        {/* Тёмная правая часть для глубины */}
        <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-gradient-to-l from-black/60 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6">
          {/* Top Row: Level & More */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-lg font-black text-white">{t('level')} 1</span>
              <span className="px-3 py-1 bg-[#00d2ff]/20 text-[#00d2ff] text-[10px] font-black rounded-lg border border-[#00d2ff]/30">5%</span>
            </div>
            <button className="flex items-center gap-1.5 group">
              <span className="text-xs font-bold text-zinc-500 group-active:text-white transition-colors">{t('more')}</span>
              <ChevronRight size={14} className="text-zinc-600" />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <Wallet size={12} className="text-zinc-500" />
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-tighter">{t('earned')}</span>
              </div>
              <span className="text-base font-black text-white">0 TON</span>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/5">
              <div className="flex items-center gap-2 mb-1 text-zinc-500 font-black text-[9px] uppercase tracking-tighter">
                <span>{t('friends')}</span>
              </div>
              <span className="text-base font-black text-white uppercase">1</span>
            </div>
          </div>

          {/* Huge Invite Button */}
          <button className="w-full py-4.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black text-sm uppercase tracking-widest rounded-[20px] shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            {t('invite')}
            <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">+</div>
          </button>
        </div>
      </div>

      {/* BOTTOM SHEET MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fadeIn" onClick={() => setIsMenuOpen(false)} />
          <div className="relative w-full max-w-md mx-auto bg-[#111112] rounded-t-[36px] px-6 pt-2 pb-12 border-t border-white/10 animate-slideUp shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mt-3 mb-8" />
            
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-[900] text-white tracking-tighter">{t('menu')}</h2>
              <button onClick={() => setIsMenuOpen(false)} className="p-2.5 bg-white/5 rounded-full active:bg-white/10"><X size={20} /></button>
            </div>

            {/* Languages Grid 3x2 */}
            <div className="flex flex-col gap-4 mb-10">
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">{t('language')}</span>
              <div className="grid grid-cols-3 gap-3">
                {languages.map((l) => (
                  <button 
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`flex items-center justify-center gap-2 py-4 rounded-2xl text-[11px] font-black border transition-all ${
                      lang === l.code ? 'bg-white text-black border-white shadow-xl scale-105' : 'bg-white/5 text-zinc-500 border-white/5 active:bg-white/10'
                    }`}
                  >
                    <span className="text-lg">{l.flag}</span>
                    <span>{l.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* iOS Toggles */}
            <div className="flex flex-col gap-6 mb-10">
              <div className="flex justify-between items-center group">
                <span className="text-[15px] font-bold text-white tracking-tight">{t('tactile')}</span>
                <div className="w-12 h-6.5 bg-[#00d2ff] rounded-full relative"><div className="absolute right-1 top-1 w-4.5 h-4.5 bg-white rounded-full shadow-md" /></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[15px] font-bold text-white tracking-tight">{t('animated')}</span>
                <div className="w-12 h-6.5 bg-[#00d2ff] rounded-full relative"><div className="absolute right-1 top-1 w-4.5 h-4.5 bg-white rounded-full shadow-md" /></div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex flex-col gap-3 mb-10">
              <SocialLink icon={<Twitter size={20} />} label="X (Twitter)" color="text-blue-400" />
              <SocialLink icon={<Video size={20} />} label="TikTok" color="text-pink-400" />
              <SocialLink icon={<Send size={20} />} label="Channel" color="text-cyan-400" />
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-4.5 bg-white/5 text-zinc-500 font-bold rounded-[22px] text-xs uppercase tracking-widest">{t('privacy')}</button>
              <button className="flex-[2] py-4.5 bg-[#00d2ff] text-black font-black rounded-[22px] text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20">{t('contact')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SocialLink = ({ icon, label, color }) => (
  <div className="flex items-center justify-between p-4.5 glass-card rounded-[22px] border border-white/5 active:bg-white/5 transition-colors">
    <div className="flex items-center gap-4">
      <div className={`${color} bg-white/5 p-2 rounded-xl`}>{icon}</div>
      <span className="text-[13px] font-black text-white">{label}</span>
    </div>
    <ChevronRight size={18} className="text-zinc-700" />
  </div>
);

export default Profile;