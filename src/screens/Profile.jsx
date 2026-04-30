import React, { useState } from 'react';
import { 
  Settings, ChevronRight, X, Gem, Wallet, 
  Twitter, Video, Send, Check
} from 'lucide-react';

const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Моковые данные юзера (потом заменим на данные из Telegram)
  const tgUser = {
    username: 'ebaldremal1448',
    avatar: 'https://i.pravatar.cc/150?img=11'
  };

  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mt-2">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="p-2.5 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors"
        >
          <Settings size={22} className="text-white" />
        </button>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl">
          <Gem size={16} className="text-blue-400" />
          <span className="text-white font-bold text-sm">0 TON</span>
        </div>
      </div>

      {/* MAIN USER CARD */}
      <div className="relative overflow-hidden bg-white rounded-[2rem] p-6 shadow-2xl">
        {/* Радужные мутные шарики (Паттерн) */}
        <div className="absolute top-[-20%] left-[-10%] w-40 h-40 bg-pink-400/40 blur-[40px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-20%] right-[-10%] w-48 h-48 bg-blue-400/40 blur-[40px] rounded-full mix-blend-multiply" />
        <div className="absolute top-[30%] left-[40%] w-32 h-32 bg-yellow-300/40 blur-[40px] rounded-full mix-blend-multiply" />
        
        <div className="relative z-10 flex flex-col items-center">
          <img 
            src={tgUser.avatar} 
            alt="Avatar" 
            className="w-20 h-20 rounded-[1.5rem] object-cover shadow-md border-2 border-white/50 mb-3"
          />
          <h2 className="text-xl font-black text-zinc-900 mb-6">@{tgUser.username}</h2>
          
          <div className="flex w-full justify-between px-4 mb-6">
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-black text-zinc-900">0</span>
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Requests</span>
            </div>
            <div className="w-px h-10 bg-zinc-200" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-black text-zinc-900">0 TON</span>
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Best win</span>
            </div>
          </div>

          <button className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900/5 hover:bg-zinc-900/10 rounded-2xl transition-colors">
            <span className="text-sm font-bold text-zinc-800">Result</span>
            <ChevronRight size={16} className="text-zinc-600" />
          </button>
        </div>
      </div>

      {/* OPTIONS */}
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xl font-bold text-white tracking-tight">Options</h3>
        <button className="px-6 py-2.5 bg-white hover:bg-zinc-200 text-zinc-900 font-black rounded-full text-sm transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          Deposit
        </button>
      </div>

      {/* REFERRAL CARD */}
      <div className="relative overflow-hidden bg-white rounded-[2rem] p-6 shadow-2xl mb-4">
        {/* Радужные шарики */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-400/30 blur-[40px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 bg-orange-400/30 blur-[40px] rounded-full mix-blend-multiply" />
        
        <div className="relative z-10 flex flex-col gap-5">
          <div className="flex justify-between items-center bg-zinc-900/5 px-4 py-3 rounded-2xl">
            <span className="font-bold text-zinc-900">Level 1</span>
            <span className="font-black text-blue-600 bg-blue-100 px-3 py-1 rounded-xl text-sm">5%</span>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 bg-zinc-900/5 p-4 rounded-2xl flex flex-col gap-1">
              <div className="flex items-center gap-1.5 mb-1">
                <Wallet size={14} className="text-zinc-500" />
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Earned</span>
              </div>
              <span className="text-lg font-black text-zinc-900">0 TON</span>
            </div>
            <div className="flex-1 bg-zinc-900/5 p-4 rounded-2xl flex flex-col gap-1">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Friends</span>
              </div>
              <span className="text-lg font-black text-zinc-900">1</span>
            </div>
          </div>

          <button className="w-full py-4 bg-zinc-900 active:scale-95 text-white font-black text-lg rounded-[1.5rem] transition-all shadow-xl">
            Invite friends +
          </button>
        </div>
      </div>

      {/* БОКОВОЕ МЕНЮ (ШТОРКА НАСТРОЕК) */}
      {isMenuOpen && <SettingsBottomSheet onClose={() => setIsMenuOpen(false)} />}

    </div>
  );
};

// --- КОМПОНЕНТ ШТОРКИ НАСТРОЕК ---
const SettingsBottomSheet = ({ onClose }) => {
  const [tactile, setTactile] = useState(true);
  const [animated, setAnimated] = useState(true);
  
  const languages = ['EN', 'RU', 'KR', 'ZH', 'UA', 'FA'];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Затемнение фона */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" 
        onClick={onClose}
      />
      
      {/* Сама шторка */}
      <div className="relative w-full max-w-md mx-auto bg-[#1c1c1e] rounded-t-[2.5rem] px-6 pt-6 pb-12 flex flex-col gap-6 animate-slideUp border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        
        {/* Шапка шторки */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-black text-white">Menu</h2>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full active:bg-white/20">
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Языки */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">Language</span>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <button 
                key={lang}
                className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-colors ${
                  lang === 'EN' 
                    ? 'bg-white text-black shadow-lg' 
                    : 'bg-white/5 text-zinc-400 border border-white/5'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Тумблеры */}
        <div className="flex flex-col gap-5 mt-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-white">Tactile Response</span>
            <button 
              onClick={() => setTactile(!tactile)}
              className={`w-14 h-8 rounded-full relative transition-colors duration-300 ${tactile ? 'bg-blue-500' : 'bg-white/10'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-md ${tactile ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-white">Animated Gifts</span>
            <button 
              onClick={() => setAnimated(!animated)}
              className={`w-14 h-8 rounded-full relative transition-colors duration-300 ${animated ? 'bg-blue-500' : 'bg-white/10'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-md ${animated ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>

        {/* Навигация (Ссылки) */}
        <div className="flex flex-col gap-2 mt-2 bg-white/5 p-2 rounded-[2rem]">
          <button className="flex items-center justify-between p-3 px-4 hover:bg-white/5 active:bg-white/10 rounded-2xl transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-xl"><Twitter size={18} className="text-blue-400" /></div>
              <span className="font-bold text-white">X (Twitter)</span>
            </div>
            <ChevronRight size={20} className="text-zinc-600" />
          </button>
          <button className="flex items-center justify-between p-3 px-4 hover:bg-white/5 active:bg-white/10 rounded-2xl transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-500/10 rounded-xl"><Video size={18} className="text-pink-400" /></div>
              <span className="font-bold text-white">TikTok</span>
            </div>
            <ChevronRight size={20} className="text-zinc-600" />
          </button>
          <button className="flex items-center justify-between p-3 px-4 hover:bg-white/5 active:bg-white/10 rounded-2xl transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 rounded-xl"><Send size={18} className="text-cyan-400" /></div>
              <span className="font-bold text-white">Channel</span>
            </div>
            <ChevronRight size={20} className="text-zinc-600" />
          </button>
        </div>

        {/* Подвал */}
        <div className="flex gap-3 mt-4">
          <button className="flex-1 py-4 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-bold rounded-[1.5rem] transition-colors">
            Privacy
          </button>
          <button className="flex-[2] py-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-black rounded-[1.5rem] shadow-lg shadow-blue-500/20 transition-all">
            Contact the Team
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;