import React from 'react';
import { CASES_DATA } from '../data/cases';
import { Wallet, Zap } from 'lucide-react';

const Arena = () => {
  return (
    <div className="flex flex-col gap-6 pb-24 animate-fadeIn">
      {/* Header с Балансом */}
      <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
        <div className="flex flex-col">
          <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">Your Balance</span>
          <div className="flex items-center gap-2">
            <Wallet size={16} className="text-blue-500" />
            <span className="text-xl font-black text-white">$1,250.50</span>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 p-3 rounded-xl transition-all active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
          <Zap size={20} fill="white" />
        </button>
      </div>

      {/* Grid с Кейсами */}
      <div className="grid grid-cols-2 gap-4">
        {CASES_DATA.map((item) => (
          <div 
            key={item.id}
            className="relative group bg-[#111112] border border-white/5 rounded-3xl p-4 flex flex-col items-center gap-3 transition-all hover:border-blue-500/50"
          >
            {/* Свечение за кейсом */}
            <div className="absolute top-10 w-20 h-20 bg-blue-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <img src={item.image} alt={item.name} className="w-28 h-28 object-contain z-10 drop-shadow-2xl" />
            
            <div className="flex flex-col items-center">
              <span className="text-white font-bold text-sm text-center line-clamp-1">{item.name}</span>
              <span className="text-blue-500 font-black mt-1">${item.price.toFixed(2)}</span>
            </div>

            <button className="w-full bg-white/5 hover:bg-white/10 py-2 rounded-xl text-[10px] uppercase tracking-tighter font-bold border border-white/5 transition-colors">
              Inspect Case
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Arena;