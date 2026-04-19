import React, { useState, useEffect } from 'react';
import { Settings, Wallet, ChevronRight, Plus, Users, WalletCards, Globe, Shield, Smartphone } from 'lucide-react';
import { getTelegramUser, generateRefLink, copyToClipboard } from '../services/api';

const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('EN');
  const [tgUser, setTgUser] = useState(null);
  const [copyStatus, setCopyStatus] = useState("Invite friends");
  
  const [anonMode, setAnonMode] = useState(false);
  const [streamerMode, setStreamerMode] = useState(false);
  const [tactile, setTactile] = useState(true);

  // Подтягиваем реального юзера при загрузке
  useEffect(() => {
    const user = getTelegramUser();
    setTgUser(user);
  }, []);

  const triggerHaptic = () => {
    try { window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light'); } catch (e) {}
  };

  // Механизм рефералки
  const handleInvite = () => {
    if (tgUser?.id) {
      const link = generateRefLink(tgUser.id);
      copyToClipboard(link);
      setCopyStatus("Link Copied!");
      setTimeout(() => setCopyStatus("Invite friends"), 2000);
    }
  };

  if (!tgUser) return <div className="pt-20 text-center font-black">Loading...</div>;

  return (
    <div className="min-h-full px-5 pt-4 pb-32 animate-in fade-in duration-500">
      
      {/* ВЕРХНЯЯ ПАНЕЛЬ */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => { setIsMenuOpen(true); triggerHaptic(); }}
          className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center active:scale-95 transition-all"
        >
          <Settings size={24} className="text-zinc-400" />
        </button>
        <div className="bg-white/5 px-5 py-3 rounded-xl flex items-center gap-2 border border-white/5">
          <Wallet size={18} className="text-zinc-300" />
          <span className="text-base font-black tracking-wide">0 TON</span>
        </div>
      </div>

      {/* ГЛАВНАЯ КАРТОЧКА ПРОФИЛЯ */}
      <div className="w-full rounded-2xl bg-gradient-to-b from-[#3b1d52] via-[#241535] to-[#161618] border border-white/5 p-6 mb-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-4 left-10 w-2 h-2 bg-purple-400 rounded-sm blur-[1px] opacity-50" />
        <div className="absolute top-20 right-12 w-3 h-3 bg-pink-400 rounded-sm blur-[2px] opacity-40" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-white/10 mb-4 shadow-xl bg-black">
            <img src={tgUser.avatar} alt="avatar" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold mb-6 tracking-tight">{tgUser.username}</h2>
          
          <div className="w-full flex gap-3 mb-6">
            <div className="flex-1 bg-white/5 rounded-xl py-4 flex flex-col items-center justify-center border border-white/[0.02]">
              <span className="text-xl font-bold">0</span>
              <span className="text-[11px] text-zinc-500 font-bold uppercase mt-1">Games</span>
            </div>
            <div className="flex-1 bg-white/5 rounded-xl py-4 flex flex-col items-center justify-center border border-white/[0.02]">
              <span className="text-xl font-bold">0 TON</span>
              <span className="text-[11px] text-zinc-500 font-bold uppercase mt-1">Best win</span>
            </div>
          </div>

          <button className="w-full py-4 flex items-center justify-center gap-1 text-zinc-400 text-sm font-medium hover:text-white transition-colors">
            Inventory cost 0 TON • 0 gifts <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* СЕКЦИЯ РЕФЕРАЛОВ */}
      <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4 px-2">
        Invite friends and earn TON <span className="text-zinc-600 ml-1">💎</span>
      </h3>

      <div className="w-full rounded-2xl bg-gradient-to-br from-[#4a246b] via-[#2c1345] to-[#18181b] p-5 mb-6 border border-white/5 shadow-2xl relative">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">Level 1</span>
            <span className="bg-white/20 text-white text-[11px] font-black px-2 py-1 rounded-md">5%</span>
          </div>
          <button className="flex items-center text-sm font-medium text-pink-300">
            More <ChevronRight size={16} />
          </button>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 bg-white/5 rounded-xl p-4 border border-white/[0.03]">
            <div className="flex items-center gap-2 text-zinc-400 mb-2">
              <WalletCards size={16} className="text-purple-400"/>
              <span className="text-sm font-medium">Earned</span>
            </div>
            <div className="text-2xl font-bold flex items-center gap-1">
              0 <span className="text-zinc-500 text-lg">💎</span>
            </div>
          </div>
          <div className="flex-1 bg-white/5 rounded-xl p-4 border border-white/[0.03]">
            <div className="flex items-center gap-2 text-zinc-400 mb-2">
              <Users size={16} className="text-cyan-400"/>
              <span className="text-sm font-medium">Friends</span>
            </div>
            <div className="text-2xl font-bold">0</div>
          </div>
        </div>
      </div>

      {/* КНОПКА ПРИГЛАШЕНИЯ (С МЕХАНИЗМОМ КОПИРОВАНИЯ) */}
      <button 
        onClick={handleInvite}
        className="w-full py-5 bg-[#a855f7] rounded-xl font-bold text-lg text-white flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-[0_0_30px_rgba(168,85,247,0.3)]"
      >
        {copyStatus} <Plus size={24} className="bg-white/20 rounded-lg p-1" />
      </button>

      {/* ШТОРКА МЕНЮ */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div onClick={() => setIsMenuOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" />
          
          <div className="relative w-full bg-[#1c1c1e] rounded-t-2xl p-6 pb-12 animate-in slide-in-from-bottom-full duration-300 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            <div className="w-12 h-1.5 bg-zinc-600 rounded-md mx-auto mb-6" />
            
            <h3 className="text-3xl font-bold mb-6 text-white">Menu</h3>

            <div className="space-y-8 overflow-y-auto max-h-[60vh] pr-2 pb-10">
              
              {/* ЯЗЫКИ (БОЛЕЕ ПРЯМОУГОЛЬНЫЕ) */}
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
                      className={`py-3 px-2 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all ${
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

              {/* ТУМБЛЕРЫ (С иконками) */}
              <div className="space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-3">
                    <Shield className="text-zinc-500 shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-widest mb-1">Anonymous Mode</h4>
                      <p className="text-sm text-zinc-500 leading-snug">Name and avatar will be hidden in Games</p>
                    </div>
                  </div>
                  <button onClick={() => { setAnonMode(!anonMode); triggerHaptic(); }} className={`relative w-[50px] h-[28px] rounded-full transition-colors duration-300 shrink-0 ${anonMode ? 'bg-blue-500' : 'bg-zinc-600'}`}>
                    <div className={`absolute top-[2px] w-[24px] h-[24px] bg-white rounded-full transition-transform duration-300 shadow-md ${anonMode ? 'left-[24px]' : 'left-[2px]'}`} />
                  </button>
                </div>

                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-3">
                    <Globe className="text-zinc-500 shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-widest mb-1">Streamer Mode</h4>
                      <p className="text-sm text-zinc-500 leading-snug">Other players avatars will be hidden</p>
                    </div>
                  </div>
                  <button onClick={() => { setStreamerMode(!streamerMode); triggerHaptic(); }} className={`relative w-[50px] h-[28px] rounded-full transition-colors duration-300 shrink-0 ${streamerMode ? 'bg-blue-500' : 'bg-zinc-600'}`}>
                    <div className={`absolute top-[2px] w-[24px] h-[24px] bg-white rounded-full transition-transform duration-300 shadow-md ${streamerMode ? 'left-[24px]' : 'left-[2px]'}`} />
                  </button>
                </div>

                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-3">
                    <Smartphone className="text-zinc-500 shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-widest mb-1">Tactile Response</h4>
                    </div>
                  </div>
                  <button onClick={() => { setTactile(!tactile); triggerHaptic(); }} className={`relative w-[50px] h-[28px] rounded-full transition-colors duration-300 shrink-0 ${tactile ? 'bg-blue-500' : 'bg-zinc-600'}`}>
                    <div className={`absolute top-[2px] w-[24px] h-[24px] bg-white rounded-full transition-transform duration-300 shadow-md ${tactile ? 'left-[24px]' : 'left-[2px]'}`} />
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
