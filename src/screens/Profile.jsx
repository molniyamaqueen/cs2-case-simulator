import React, { useState, useEffect } from 'react';
import { 
  Settings, ChevronRight, X, Gem, Wallet, 
  Twitter, Send, Award, Globe 
} from 'lucide-react';
import { translations } from '../utils/translations';

const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('RU');
  const [user, setUser] = useState({ username: 'ebaldremal1448', avatar: '' });

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
    { code: 'EN', flag: '🇺🇸' }, { code: 'RU', flag: '🇷🇺' }, { code: 'UA', flag: '🇺🇦' }
  ];

  return (
    <div className="w-full flex flex-col font-sans animate-fadeIn select-none pb-20 bg-black min-h-screen">
      
      {/* HEADER (Settings & Balance) */}
      <div className="flex items-center justify-between px-10 mt-3 mb-5">
        <button onClick={() => setIsMenuOpen(true)} className="p-2 bg-white/5 active:scale-90 transition-all rounded-xl border border-white/5 shadow-lg">
          <Settings size={18} className="text-zinc-500" />
        </button>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl">
          <Gem size={12} className="text-[#00d2ff]" />
          <span className="text-white font-black text-[10px] uppercase tracking-wider">0 TON</span>
        </div>
      </div>

      {/* ОСТРОВ 1: ОСНОВНАЯ КАРТОЧКА (Сжатая по вертикали и горизонтали) */}
      <div className="mx-10 relative overflow-hidden bg-white rounded-[28px] p-5 shadow-[0_15px_35px_rgba(0,0,0,0.5)] border border-white/40">
        <div className="absolute top-[-10%] left-[-10%] w-20 h-20 bg-purple-400/20 blur-[35px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-24 h-24 bg-blue-400/20 blur-[40px] rounded-full" />
        
        <div className="relative z-10 flex flex-col items-center">
          <img src={user.avatar || 'https://i.pravatar.cc/150?u=a'} className="w-[52px] h-[52px] rounded-[14px] object-cover shadow-md mb-2.5 border border-zinc-100" alt="Avatar" />
          <h2 className="text-[20px] font-[900] text-zinc-900 mb-4 tracking-tighter">@{user.username}</h2>
          
          <div className="w-full bg-zinc-900/[0.03] border border-zinc-900/[0.04] rounded-[20px] p-3.5 flex justify-around shadow-inner">
            <div className="flex flex-col items-center">
              <span className="text-lg font-black text-zinc-900 leading-none">0</span>
              <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest mt-1">{t('games')}</span>
            </div>
            <div className="w-[1px] h-6 bg-zinc-200" />
            <div className="flex flex-col items-center">
              <span className="text-lg font-black text-zinc-900 leading-none">0 TON</span>
              <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest mt-1">{t('bestWin')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Строчка под карточкой */}
      <div className="w-full flex justify-center mt-3 mb-5 px-10 text-center">
         <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest opacity-80">
           Inventory cost 0 TON • 0 gifts <ChevronRight size={10} className="inline ml-0.5" />
         </span>
      </div>

      {/* ОСТРОВ 2: РЕЗУЛЬТАТ */}
      <div className="mx-10">
        <button className="w-full py-3.5 bg-white/10 backdrop-blur-md border border-white/5 rounded-[20px] text-[10px] font-black text-zinc-400 uppercase tracking-[0.15em] active:scale-95 transition-all">
          {t('result')} <ChevronRight size={12} className="inline ml-1" />
        </button>
      </div>

      <div className="px-12 mt-8 mb-3">
        <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.25em]">Referral program 💎</span>
      </div>

      {/* ОСТРОВ 3: РЕФЕРАЛКА */}
      <div className="mx-10 relative overflow-hidden bg-white rounded-[28px] p-5 shadow-[0_15px_35px_rgba(0,0,0,0.5)] border border-white/40">
         <div className="absolute top-0 left-0 w-16 h-16 bg-cyan-300/10 blur-[30px] rounded-full" />
         <div className="absolute bottom-0 right-0 w-20 h-20 bg-purple-300/10 blur-[35px] rounded-full" />
         
         <div className="relative z-10 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-[900] text-zinc-900">{t('level')} 1</span>
                <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[8px] font-black rounded-md border border-blue-100">5%</span>
              </div>
              <ChevronRight size={14} className="text-zinc-300" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-50 p-3.5 rounded-[18px] border border-zinc-100">
                <div className="flex items-center gap-1 mb-1 text-[7px] font-black text-zinc-400 uppercase tracking-widest">
                  <Wallet size={10} /> {t('earned')}
                </div>
                <span className="text-base font-black text-zinc-900 uppercase">0 <span className="text-[8px] text-zinc-400">TON</span></span>
              </div>
              <div className="bg-zinc-50 p-3.5 rounded-[18px] border border-zinc-100">
                <div className="flex items-center gap-1 mb-1 text-[7px] font-black text-zinc-400 uppercase tracking-widest">
                  <Award size={10} /> {t('friends')}
                </div>
                <span className="text-base font-black text-zinc-900 uppercase">1</span>
              </div>
            </div>
         </div>
      </div>

      {/* ОСТРОВ 4: ИНВАЙТ */}
      <div className="mx-10 mt-3.5">
        <button className="w-full py-4 bg-black border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-[20px] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">
          {t('invite')} <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center text-[8px] font-bold">+</div>
        </button>
      </div>

      {/* MENU BOTTOM SHEET (С настройками языка) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md animate-fadeIn" onClick={() => setIsMenuOpen(false)} />
          <div className="relative w-full bg-[#0d0d0f] border-t border-white/10 rounded-t-[40px] px-8 pt-3 pb-12 animate-slideUp">
            <div className="w-10 h-1 bg-white/10 rounded-full mx-auto mb-8 mt-1" />
            
            <div className="flex justify-between items-center mb-8">
               <h2 className="text-2xl font-black text-white tracking-tighter">{t('menu')}</h2>
               <button onClick={() => setIsMenuOpen(false)} className="p-3 bg-white/5 rounded-full"><X size={22} className="text-zinc-400" /></button>
            </div>
            
            {/* ВЫБОР ЯЗЫКА (Вернул!) */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-2 text-zinc-600">
                <Globe size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">{t('language')}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {languages.map(l => (
                  <button 
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[11px] font-black border transition-all ${
                      lang === l.code ? 'bg-white text-black border-white shadow-xl' : 'bg-white/5 text-zinc-500 border-white/5'
                    }`}
                  >
                    <span>{l.flag}</span> {l.code}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 py-4.5 bg-white/5 text-zinc-500 font-bold rounded-2xl text-[10px] uppercase tracking-widest">{t('privacy')}</button>
              <button className="flex-[2] py-4.5 bg-white text-black font-black rounded-2xl text-[10px] uppercase shadow-lg tracking-widest">{t('contact')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;