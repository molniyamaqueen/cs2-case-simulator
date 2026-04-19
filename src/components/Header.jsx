import React from 'react';
import { Menu, MessageCircle, Wallet } from 'lucide-react';

const Header = ({ onMenuClick }) => {
  return (
    <header className="flex items-center justify-between px-6 pt-6 pb-2 z-40 bg-black">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="w-10 h-10 bg-[#111112] border border-white/5 rounded-xl flex items-center justify-center active:scale-90 transition-all shadow-lg"
        >
          <Menu size={20} className="text-zinc-500" />
        </button>
        <button className="w-10 h-10 bg-[#111112] border border-white/5 rounded-xl flex items-center justify-center active:scale-90 transition-all shadow-lg">
          <MessageCircle size={20} className="text-zinc-500" />
        </button>
      </div>
      
      <div className="bg-[#111112] border border-white/5 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-[0_4px_15px_rgba(0,0,0,0.4)]">
        <Wallet size={16} className="text-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.4)]" />
        <span className="text-sm font-black italic tracking-tight">0 TON</span>
      </div>
    </header>
  );
};

export default Header;
