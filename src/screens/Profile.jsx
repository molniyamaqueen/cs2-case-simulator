import React, { useState, useEffect } from 'react';
import { Settings, ChevronRight, X, Gem, Wallet, Send, Award } from 'lucide-react';
import { translations } from '../utils/translations';

const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('RU');
  const [user, setUser] = useState({ username: 'Loading...', avatar: '' });

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
    <div className="w-full flex flex-col font-sans animate-fadeIn select-none pb-12">
      
      {/* HEADER: Floating Glass */}
      <div className="flex items-center justify-between px-6 mt-3 mb-6">
        <button 
          onClick={() => setIsMenuOpen(true)} 
          className="p-2.5 bg-white/5 active:scale-90 transition-all rounded-2xl border border-white/10 shadow-lg"
        >
          <Settings size={22} className="text-zinc-400" />
        </button>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#1c1c1e] border border-white/10 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
          <Gem size={16} className="text-[#00d2ff]" />
          <span className="text-white font-black text-xs uppercase tracking-wider">0 TON</span>
        </div>
      </div>

      {/* MAIN CARD: White Premium with Blobs */}
      <div className="mx-5 relative overflow-hidden bg-white rounded-[36px] p-7 shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/40 mb-8">
        <div className="absolute top-[-10%] left-[-10%] w-32 h-32 bg-purple-400/20 blur-[45px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-36 h-36 bg-blue-400/20 blur-[50px] rounded-full" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative p-1 bg-white rounded-[22px] shadow-sm mb-4 border border-zinc-100">
            <img 
              src={user.avatar} 
              className="w-[70px] h-[70px] rounded-[20px] object-cover"
              alt="Avatar"
            />
          </div>

          <h2 className="text-[26px] font-black text-zinc-900 mb-6 tracking-tight">
            @{user.username}
          </h2>
          
          <div className="w-full bg-zinc-900/[0.04] border border-zinc-900/[0.05] rounded-[28px] p-6 flex justify-around mb-6">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-zinc-900 leading-none">0</span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-2">Games</span>
            </div>
            <div className="w-[1px] h-10 bg-zinc-200" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-zinc-900 leading-none">0 TON</span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-2">Best win</span>
            </div>
          </div>

          <button className="flex items-center gap-1.5 px-5 py-2 bg-zinc-100/80 active:bg-zinc-200 rounded-xl transition-all">
            <span className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">Inventory cost 0 TON</span>
            <ChevronRight size={14} className="text-zinc-300" />
          </button>
        </div>
      </div>

      {/* OPTIONS & DEPOSIT */}
      <div className="flex items-center justify-between px-8 mb-8">
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          Inventory <span className="text-zinc-600 text-sm font-bold">0 gifts</span>
        </h3>
        <button className="px-7 py-3 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-widest shadow-lg active:scale-95 transition-all">
          Deposit
        </button>
      </div>

      {/* TOURNAMENT BANNER */}
      <div className="mx-5 h-[100px] relative overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-[30px] border border-white/10 mb-10 flex items-center px-7 justify-between shadow-2xl">
        <div className="flex flex-col">
          <span className="text-lg font-black text-white uppercase italic tracking-tighter">Tournament</span>
          <span className="text-[11px] font-bold text-zinc-500 tracking-wider">1:20:47:15</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-4">
             <div className="w-11 h-11 bg-zinc-700 rounded-2xl border-2 border-zinc-800 shadow-lg flex items-center justify-center text-2xl">🐸</div>
             <div className="w-11 h-11 bg-zinc-700 rounded-2xl border-2 border-zinc-800 shadow-lg flex items-center justify-center text-2xl">🏆</div>
          </div>
          <button className="bg-white text-black px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase">Join</button>
        </div>
      </div>

      {/* REFERRAL CARD (Unified White Style with Blobs) */}
      <div className="mx-5 relative overflow-hidden bg-white rounded-[36px] p-7 shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/40 mb-8">
         <div className="absolute top-0 left-0 w-24 h-24 bg-cyan-300/20 blur-[40px] rounded-full" />
         <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-300/20 blur-[50px] rounded-full" />
         
         <div className="relative z-10 flex flex-col gap-6">
            <div className="flex justify-between items-center px-1">
              <div className="flex items-center gap-3">
                <span className="text-[19px] font-black text-zinc-900 tracking-tight">Уровень 1</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg border border-blue-100 uppercase">5%</span>
              </div>
              <div className="flex items-center gap-1 text-zinc-300">
                <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">More</span>
                <ChevronRight size={16} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-50 p-5 rounded-[24px] border border-zinc-100">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet size={14} className="text-zinc-400" />
                  <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Earned</span>
                </div>
                <span className="text-xl font-black text-zinc-900 uppercase">0 <span className="text-[10px] text-zinc-400">TON</span></span>
              </div>
              <div className="bg-zinc-50 p-5 rounded-[24px] border border-zinc-100">
                <div className="flex items-center gap-2 mb-2 text-zinc-400 font-black text-[9px] uppercase tracking-widest">
                  <Award size={14} /> Friends
                </div>
                <span className="text-xl font-black text-zinc-900">1</span>
              </div>
            </div>

            <button className="w-full py-5 bg-black text-white font-black text-sm uppercase tracking-[0.2em] rounded-[22px] shadow-xl shadow-black/20 active:scale-95 transition-all flex items-center justify-center gap-2">
              Пригласить друзей <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">+</div>
            </button>
         </div>
      </div>

      {/* BOTTOM SHEET MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsMenuOpen(false)} />
          <div className="relative w-full bg-[#0d0d0f]/95 border-t border-white/10 rounded-t-[45px] px-8 pt-3 pb-12 animate-slideUp">
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mt-2 mb-10" />
            <h2 className="text-3xl font-black text-white mb-10 tracking-tighter">Menu</h2>
            <div className="flex gap-4">
              <button className="flex-1 py-4.5 bg-white/5 text-zinc-500 font-bold rounded-3xl border border-white/5 uppercase tracking-widest text-[10px]">Privacy</button>
              <button className="flex-[2] py-4.5 bg-white text-black font-black rounded-3xl uppercase tracking-widest text-[10px] shadow-lg">Contact Team</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;