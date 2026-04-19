import React, { useState } from 'react';
import { Info, Shield, Globe, X, ChevronRight } from 'lucide-react';

const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="px-6 pt-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* КАРТОЧКА ПРОФИЛЯ */}
      <div className="relative w-full p-8 rounded-[40px] bg-gradient-to-br from-[#1a1a1c] to-black border border-white/5 text-center overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
        <div className="relative z-10">
          <div className="w-20 h-20 rounded-[24px] mx-auto mb-4 overflow-hidden border-2 border-white/10 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" alt="avatar" />
          </div>
          <h2 className="text-2xl font-black mb-6 tracking-tight italic">@ebaldremal1448</h2>
          <div className="flex justify-around bg-black/40 backdrop-blur-xl rounded-2xl py-4 border border-white/5">
            <div><p className="text-xl font-black">0</p><p className="text-[9px] text-zinc-500 font-bold uppercase">Games</p></div>
            <div className="w-[1px] bg-white/5" />
            <div><p className="text-xl font-black">0 TON</p><p className="text-[9px] text-zinc-500 font-bold uppercase">Best Win</p></div>
          </div>
        </div>
      </div>

      <button onClick={() => setIsMenuOpen(true)} className="w-full mt-6 py-5 bg-[#d946ef] rounded-[24px] font-black text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(217,70,239,0.3)] active:scale-95 transition-all">
        Open Settings
      </button>

      {/* ШТОРКА МЕНЮ (СКРИН 3) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] animate-in fade-in duration-300">
          <div onClick={() => setIsMenuOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <div className="absolute bottom-0 w-full bg-[#111112] rounded-t-[40px] p-10 border-t border-white/10 animate-in slide-in-from-bottom-full duration-500">
            <div className="w-12 h-1 bg-zinc-800 rounded-full mx-auto mb-8" />
            <h3 className="text-3xl font-black mb-8 italic">Menu</h3>
            <div className="space-y-4">
              <div className="flex justify-between p-5 bg-white/5 rounded-2xl items-center">
                <div className="flex items-center gap-3 text-zinc-400"><Globe size={20}/><span className="text-white font-bold">Language</span></div>
                <span className="text-blue-400 font-black">EN</span>
              </div>
              <div className="flex justify-between p-5 bg-white/5 rounded-2xl items-center">
                <div className="flex items-center gap-3 text-zinc-400"><Shield size={20}/><span className="text-white font-bold">Streamer Mode</span></div>
                <div className="w-10 h-5 bg-zinc-800 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"/></div>
              </div>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="w-full mt-8 py-5 bg-white text-black rounded-3xl font-black uppercase tracking-widest">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
