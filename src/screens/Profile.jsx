import React, { useState, useEffect } from 'react';
import { Settings, ChevronRight, X, Gem, Wallet, Award, Send, Twitter } from 'lucide-react';
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

  return (
    <div className="w-full flex flex-col font-sans animate-fadeIn select-none pb-20 bg-black min-h-screen">
      
      {/* 1. HEADER (Settings & Balance) */}
      <div className="flex items-center justify-between px-6 mt-3 mb-6">
        <button onClick={() => setIsMenuOpen(true)} className="p-2.5 bg-white/5 active:scale-90 transition-all rounded-2xl border border-white/5 shadow-lg">
          <Settings size={20} className="text-zinc-500" />
        </button>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl">
          <Gem size={14} className="text-[#00d2ff]" />
          <span className="text-white font-black text-[11px] uppercase tracking-wider">0 TON</span>
        </div>
      </div>

      {/* 2. ОСНОВНАЯ КАРТОЧКА (Первый желтый блок) */}
      <div className="mx-6 relative overflow-hidden bg-white rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/40">
        <div className="absolute top-[-15%] left-[-10%] w-24 h-24 bg-purple-400/20 blur-[40px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-28 h-28 bg-blue-400/20 blur-[45px] rounded-full" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative p-1 bg-white rounded-[18px] shadow-sm mb-3 border border-zinc-100">
            <img src={user.avatar || 'https://i.pravatar.cc/150?u=a'} className="w-[60px] h-[60px] rounded-[16px] object-cover" alt="Avatar" />
          </div>
          <h2 className="text-[24px] font-black text-zinc-900 mb-5 tracking-tight text-center">@{user.username}</h2>
          
          <div className="w-full bg-zinc-900/[0.04] border border-zinc-900/[0.05] rounded-[24px] p-4 flex justify-around shadow-inner">
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
        </div>
      </div>

      {/* Линия Inventory cost (Как на фото 1) */}
      <div className="w-full flex justify-center mt-3 mb-6">
         <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-1">
           Inventory cost 0 TON • 0 gifts <ChevronRight size={12} />
         </span>
      </div>

      {/* 3. РЕЗУЛЬТАТ (Второй желтый блок) */}
      <div className="mx-6">
        <button className="w-full py-4 bg-white/10 backdrop-blur-md border border-white/5 rounded-[24px] text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] active:scale-95 transition-all">
          {t('result')} <ChevronRight size={14} className="inline ml-1" />
        </button>
      </div>

      {/* Прослойка (Текст перед рефералкой) */}
      <div className="px-9 mt-10 mb-4">
        <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Invite friends and earn TON 💎</span>
      </div>

      {/* 4. РЕФЕРАЛЬНАЯ КАРТОЧКА (Третий желтый блок) */}
      <div className="mx-6 relative overflow-hidden bg-white rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/40">
         <div className="absolute top-0 left-0 w-20 h-20 bg-cyan-300/10 blur-[35px] rounded-full" />
         <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-300/10 blur-[40px] rounded-full" />
         
         <div className="relative z-10 flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <span className="text-[17px] font-black text-zinc-900">{t('level')} 1</span>
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
                <span className="text-lg font-black text-zinc-900 uppercase">0 <span className="text-[9px] text-zinc-400 font-bold">TON</span></span>
              </div>
              <div className="bg-zinc-50 p-4 rounded-[20px] border border-zinc-100">
                <div className="flex items-center gap-1.5 mb-1.5 text-zinc-400 font-black text-[8px] uppercase tracking-widest">
                  <Award size={12} /> {t('friends')}
                </div>
                <span className="text-lg font-black text-zinc-900">1</span>
              </div>
            </div>
         </div>
      </div>

      {/* 5. ИНВАЙТ ФРЕНД (Четвертый желтый блок - Кнопка отдельно) */}
      <div className="mx-6 mt-4">
        <button className="w-full py-5 bg-black border border-white/10 text-white font-black text-xs uppercase tracking-[0.2em] rounded-[24px] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2">
          {t('invite')} <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-[10px] font-bold">+</div>
        </button>
      </div>

      {/* MENU BOTTOM SHEET (Full Style) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsMenuOpen(false)} />
          <div className="relative w-full bg-[#0d0d0f] border-t border-white/10 rounded-t-[40px] px-8 pt-2 pb-12 animate-slideUp">
            <div className="w-10 h-1 bg-white/10 rounded-full mx-auto mt-2 mb-8" />
            <h2 className="text-2xl font-black text-white mb-8">{t('menu')}</h2>
            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-white/5 text-zinc-500 font-bold rounded-2xl text-[10px] uppercase">{t('privacy')}</button>
              <button className="flex-[2] py-4 bg-white text-black font-black rounded-2xl text-[10px] uppercase shadow-lg">{t('contact')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;