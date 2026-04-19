import React, { useState } from 'react';
import { Settings, Wallet, ChevronRight, Plus, Users, WalletCards } from 'lucide-react';

const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('EN');
  
  // Состояния для тумблеров (шторка)
  const [anonMode, setAnonMode] = useState(false);
  const [streamerMode, setStreamerMode] = useState(false);
  const [tactile, setTactile] = useState(true);

  const triggerHaptic = () => {
    try { window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light'); } catch (e) {}
  };

  // Фейковые данные профиля
  const user = {
    username: "@ebaldremal1448",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    games: 0,
    bestWin: "0 TON",
    inventoryCost: "0 TON",
    gifts: 0,
    earned: 0,
    friends: 1,
    level: 1
  };

  return (
    <div className="min-h-full px-5 pt-4 pb-32 animate-in fade-in duration-500">
      
      {/* ВЕРХНЯЯ ПАНЕЛЬ (Только для профиля) */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => { setIsMenuOpen(true); triggerHaptic(); }}
          className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center active:scale-95 transition-all"
        >
          <Settings size={24} className="text-zinc-400" />
        </button>
        <div className="bg-white/5 px-5 py-3 rounded-full flex items-center gap-2 border border-white/5">
          <Wallet size={18} className="text-zinc-300" />
          <span className="text-base font-black tracking-wide">0 TON</span>
        </div>
      </div>

      {/* ГЛАВНАЯ КАРТОЧКА ПРОФИЛЯ */}
      <div className="w-full rounded-[32px] bg-gradient-to-b from-[#3b1d52] via-[#241535] to-[#161618] border border-white/5 p-6 mb-8 shadow-2xl relative overflow-hidden">
        {/* Имитация звездочек на фоне */}
        <div className="absolute top-4 left-10 w-2 h-2 bg-purple-400 rounded-full blur-[1px] opacity-50" />
        <div className="absolute top-20 right-12 w-3 h-3 bg-pink-400 rounded-full blur-[2px] opacity-40" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-[28px] overflow-hidden border-2 border-white/10 mb-4 shadow-xl">
            <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold mb-6 tracking-tight">{user.username}</h2>
          
          <div className="w-full flex gap-3 mb-6">
            <div className="flex-1 bg-white/5 rounded-2xl py-4 flex flex-col items-center justify-center border border-white/[0.02]">
              <span className="text-xl font-bold">{user.games}</span>
              <span className="text-[11px] text-zinc-500 font-bold uppercase mt-1">Games</span>
            </div>
            <div className="flex-1 bg-white/5 rounded-2xl py-4 flex flex-col items-center justify-center border border-white/[0.02]">
              <span className="text-xl font-bold">{user.bestWin}</span>
              <span className="text-[11px] text-zinc-500 font-bold uppercase mt-1">Best win</span>
            </div>
          </div>

          <button className="w-full py-4 flex items-center justify-center gap-1 text-zinc-400 text-sm font-medium hover:text-white transition-colors">
            Inventory cost {user.inventoryCost} • {user.gifts} gifts <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* СЕКЦИЯ РЕФЕРАЛОВ */}
      <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4 px-2">
        Invite friends and earn TON <span className="text-zinc-600 ml-1">💎</span>
      </h3>

      <div className="w-full rounded-[32px] bg-gradient-to-br from-[#4a246b] via-[#2c1345] to-[#18181b] p-5 mb-6 border border-white/5 shadow-2xl relative">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">Level {user.level}</span>
            <span className="bg-white/20 text-white text-[11px] font-black px-2 py-1 rounded-lg">5%</span>
          </div>
          <button className="flex items-center text-sm font-medium text-pink-300">
            More <ChevronRight size={16} />
          </button>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/[0.03]">
            <div className="flex items-center gap-2 text-zinc-400 mb-2">
              <WalletCards size={16} className="text-purple-400"/>
              <span className="text-sm font-medium">Earned</span>
            </div>
            <div className="text-2xl font-bold flex items-center gap-1">
              {user.earned} <span className="text-zinc-500 text-lg">💎</span>
            </div>
          </div>
          <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/[0.03]">
            <div className="flex items-center gap-2 text-zinc-400 mb-2">
              <Users size={16} className="text-cyan-400"/>
              <span className="text-sm font-medium">Friends</span>
            </div>
            <div className="text-2xl font-bold">{user.friends}</div>
          </div>
        </div>
      </div>

      {/* КНОПКА ПРИГЛАШЕНИЯ */}
      <button className="w-full py-5 bg-[#a855f7] rounded-[24px] font-bold text-lg text-white flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-[0_0_30px_rgba(168,85,247,0.3)]">
        Invite friends <Plus size={24} className="bg-white/20 rounded-full p-1" />
      </button>

      {/* ================= ШТОРКА МЕНЮ (BOTTOM SHEET) ================= */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          {/* Темный фон с блюром */}
          <div 
            onClick={() => setIsMenuOpen(false)} 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
          />
          
          {/* Сама панель */}
          <div className="relative w-full bg-[#1c1c1e] rounded-t-[32px] p-6 pb-12 animate-in slide-in-from-bottom-full duration-300 ease-out shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            {/* Полоска (drag handle) */}
            <div className="w-12 h-1.5 bg-zinc-600 rounded-full mx-auto mb-6" />
            
            <h3 className="text-3xl font-bold mb-6 text-white">Menu</h3>

            <div className="space-y-8 overflow-y-auto max-h-[60vh] pr-2 pb-10">
              
              {/* ЯЗЫКИ */}
              <div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Language</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'EN', flag: '🇺🇸', label: 'EN' },
                    { id: 'RU', flag: '🇷🇺', label: 'RU' },
                    { id: 'KR', flag: '🇰🇷', label: '한국' },
                    { id: 'CN', flag: '🇨🇳', label: '繁體' },
                    { id: 'UA', flag: '🇺🇦', label: 'UA' },
                    { id: 'FA', flag: '🇮🇷', label: 'FA' }
                  ].map((l) => (
                    <button 
                      key={l.id}
                      onClick={() => { setLang(l.id); triggerHaptic(); }}
                      className={`py-3 px-2 rounded-[18px] flex items-center justify-center gap-2 text-sm font-bold transition-all ${
                        lang === l.id 
                          ? 'bg-white text-black' 
                          : 'bg-white/5 text-zinc-300 border border-white/5 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-lg">{l.flag}</span> {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ТУМБЛЕРЫ (НАСТРОЙКИ) */}
              <div className="space-y-6">
                
                {/* Anonymous Mode */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1">Anonymous Mode</h4>
                    <p className="text-sm text-zinc-400 leading-snug">Your name and avatar will be hidden in Portals Games</p>
                  </div>
                  <button 
                    onClick={() => { setAnonMode(!anonMode); triggerHaptic(); }}
                    className={`relative w-[52px] h-[30px] rounded-full transition-colors duration-300 shrink-0 ${anonMode ? 'bg-blue-500' : 'bg-zinc-600'}`}
                  >
                    <div className={`absolute top-[2px] w-[26px] h-[26px] bg-white rounded-full transition-transform duration-300 shadow-md ${anonMode ? 'left-[24px]' : 'left-[2px]'}`} />
                  </button>
                </div>

                {/* Streamer Mode */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1">Streamer Mode</h4>
                    <p className="text-sm text-zinc-400 leading-snug">Other players' avatars will be hidden in Portals Games</p>
                  </div>
                  <button 
                    onClick={() => { setStreamerMode(!streamerMode); triggerHaptic(); }}
                    className={`relative w-[52px] h-[30px] rounded-full transition-colors duration-300 shrink-0 ${streamerMode ? 'bg-blue-500' : 'bg-zinc-600'}`}
                  >
                    <div className={`absolute top-[2px] w-[26px] h-[26px] bg-white rounded-full transition-transform duration-300 shadow-md ${streamerMode ? 'left-[24px]' : 'left-[2px]'}`} />
                  </button>
                </div>

                {/* Tactile Response */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1">Tactile Response</h4>
                  </div>
                  <button 
                    onClick={() => { setTactile(!tactile); triggerHaptic(); }}
                    className={`relative w-[52px] h-[30px] rounded-full transition-colors duration-300 shrink-0 ${tactile ? 'bg-blue-500' : 'bg-zinc-600'}`}
                  >
                    <div className={`absolute top-[2px] w-[26px] h-[26px] bg-white rounded-full transition-transform duration-300 shadow-md ${tactile ? 'left-[24px]' : 'left-[2px]'}`} />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;
