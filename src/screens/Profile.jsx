import React, { useState, useEffect } from 'react';
import { 
  Settings, ChevronRight, X, Gem, Wallet, 
  Twitter, Video, Send, Award 
} from 'lucide-react';
import { translations } from '../utils/translations';

const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('RU');
  const [user, setUser] = useState({ 
    username: 'ebaldremal1448', 
    avatar: '' 
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
    <div className="w-full flex flex-col font-sans animate-fadeIn select-none pb-12">
      
      {/* --- 1. HEADER (Компактный) --- */}
      <div className="flex items-center justify-between px-6 mt-2 mb-4">
        <button 
          onClick={() => setIsMenuOpen(true)} 
          className="p-2 bg-[#1c1c1e] active:scale-90 transition-all rounded-xl border border-white/5"
        >
          <Settings size={20} className="text-zinc-500" />
        </button>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1c1c1e] border border-white/10 rounded-xl shadow-lg">
          <Gem size={14} className="text-[#00d2ff]" />
          <span className="text-white font-black text-[11px] uppercase tracking-wider">0 TON</span>
        </div>
      </div>

      {/* --- 2. MAIN CARD (Сжатый масштаб + Белый премиум) --- */}
      <div className="mx-6 relative overflow-hidden bg-white rounded-[32px] p-6 shadow-[0_15px_35px_rgba(0,0,0,0.2)] border border-white/40 mb-6">
        {/* Шарики-блики */}
        <div className="absolute top-[-15%] left-[-10%] w-24 h-24 bg-purple-400/20 blur-[40px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-28 h-28 bg-blue-400/20 blur-[45px] rounded-full" />
        
        <div className="relative z-10 flex flex-col items-center">
          {/* Avatar (Native Size: 56px-60px) */}
          <div className="relative p-1 bg-white rounded-[18px] shadow-sm mb-3 border border-zinc-100">
            <img 
              src={user.avatar || 'https://i.pravatar.cc/150?u=a'} 
              className="w-[56px] h-[56px] rounded-[16px] object-cover"
              alt="Avatar"
            />
          </div>

          {/* Username (Компактный шрифт) */}
          <h2 className="text-[22px] font-black text-zinc-900 mb-5 tracking-tight">
            @{user.username}
          </h2>
          
          {/* Stats Capsule (Узкая) */}
          <div className="w-full bg-zinc-900/[0.04] border border-zinc-900/[0.05] rounded-[24px] p-4 flex justify-around mb-5">
            <div className="flex flex-col items-center">
              <span className="text-xl font-black text-zinc-900 leading-none">0</span>
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1.5">{t('games')}</span>
            </div>
            <div className="w-[1px] h-8 bg-zinc-200" />
            <div className="flex flex-col items-center">
              <span className="text-xl font-black text-zinc-900 leading-none">0 TON</span>
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1.5">{t('bestWin')}</span>
            </div>
          </div>

          <button className="flex items-center gap-1 group">
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Inventory cost 0 TON</span>
            <ChevronRight size={12} className="text-zinc-300 group-active:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* --- 3. OPTIONS & DEPOSIT --- */}
      <div className="flex items-center justify-between px-8 mb-6">
        <h3 className="text-lg font-black text-white">
          Inventory <span className="text-zinc-600 text-xs font-bold ml-1">0 gifts</span>
        </h3>
        <button className="px-6 py-2 bg-white text-black font-black rounded-xl text-[10px] uppercase tracking-widest shadow-lg active:scale-95 transition-all">
          {t('deposit')}
        </button>
      </div>

      {/* --- 4. REFERRAL CARD (Единый стиль + Сжатый масштаб) --- */}
      <div className="px-8 mb-3">
        <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Earn TON by inviting friends 💎</span>
      </div>

      <div className="mx-6 relative overflow-hidden bg-white rounded-[32px] p-6 shadow-[0_15px_35px_rgba(0,0,0,0.2)] border border-white/40 mb-6">
         <div className="absolute top-0 left-0 w-20 h-20 bg-cyan-300/10 blur-[35px] rounded-full" />
         <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-300/10 blur-[40px] rounded-full" />
         
         <div className="relative z-10 flex flex-col gap-5">
            <div className="flex justify-between items-center px-1">
              <div className="flex items-center gap-2.5">
                <span className="text-[17px] font-black text-zinc-900 tracking-tight">{t('level')} 1</span>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-black rounded-md border border-blue-100 uppercase">5%</span>
              </div>
              <button className="flex items-center gap-1 text-zinc-300">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{t('more')}</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-50 p-4 rounded-[20px] border border-zinc-100">
                <div className="flex items-center gap-1.5 mb-1.5 text-zinc-400 font-black text-[8px] uppercase tracking-widest">
                  <Wallet size={12} /> {t('earned')}
                </div>
                <span className="text-lg font-black text-zinc-900 uppercase">0 <span className="text-[9px] text-zinc-400">TON</span></span>
              </div>
              <div className="bg-zinc-50 p-4 rounded-[20px] border border-zinc-100">
                <div className="flex items-center gap-1.5 mb-1.5 text-zinc-400 font-black text-[8px] uppercase tracking-widest">
                  <Award size={12} /> {t('friends')}
                </div>
                <span className="text-lg font-black text-zinc-900 uppercase">1</span>
              </div>
            </div>

            <button className="w-full py-4 bg-black text-white font-black text-xs uppercase tracking-[0.2em] rounded-[18px] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10">
              {t('invite')} <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center text-[9px] font-bold">+</div>
            </button>
         </div>
      </div>

      {/* --- 5. MENU (BOTTOM SHEET) --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fadeIn" onClick={() => setIsMenuOpen(false)} />
          <div className="relative w-full bg-[#0d0d0f]/95 border-t border-white/10 rounded-t-[40px] px-8 pt-2 pb-12 animate-slideUp">
            <div className="w-10 h-1 bg-white/10 rounded-full mx-auto mt-2 mb-8" />
            
            <div className="flex justify-between items-center mb-8">
               <h2 className="text-2xl font-black text-white tracking-tighter">{t('menu')}</h2>
               <button onClick={() => setIsMenuOpen(false)} className="p-2.5 bg-white/5 rounded-full"><X size={22} /></button>
            </div>
            
            <div className="flex flex-col gap-4 mb-8">
              <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{t('language')}</span>
              <div className="grid grid-cols-3 gap-2.5">
                {languages.map(l => (
                  <button 
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[10px] font-black border transition-all ${
                      lang === l.code ? 'bg-white text-black border-white shadow-lg' : 'bg-white/5 text-zinc-500 border-white/5 active:bg-white/10'
                    }`}
                  >
                    <span>{l.flag}</span> {l.code}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-white/5 text-zinc-500 font-bold rounded-2xl text-[9px] uppercase tracking-widest">{t('privacy')}</button>
              <button className="flex-[2] py-4 bg-white text-black font-black rounded-2xl text-[9px] uppercase tracking-widest shadow-lg">{t('contact')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;