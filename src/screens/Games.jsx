import React, { useState, useEffect } from 'react';
import { Trophy, Users, Timer, Star } from 'lucide-react';

const Games = () => {
  const [timeLeft, setTimeLeft] = useState(30);

  // Таймер раунда (30 сек)
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const players = [
    { id: 1, name: "@cocoon303", bet: "0.4 TON", winChance: "66.6%", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" },
    { id: 2, name: "@ebaldremal", bet: "0.1 TON", winChance: "20.1%", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" },
    { id: 3, name: "@major_pro", bet: "0.05 TON", winChance: "13.3%", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100" },
  ];

  return (
    <div className="px-6 pt-4 animate-in fade-in duration-700">
      {/* ВЕРХНЯЯ СТАТИСТИКА (СКРИН 1) */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-[#111112] border border-white/5 rounded-[24px] p-4 text-center">
          <p className="text-[9px] font-black text-zinc-600 uppercase mb-1">Max Win</p>
          <p className="text-sm font-black text-white">12.5 TON</p>
        </div>
        <div className="flex-1 bg-[#111112] border border-white/5 rounded-[24px] p-4 text-center">
          <p className="text-[9px] font-black text-zinc-600 uppercase mb-1">Round Win</p>
          <p className="text-sm font-black text-green-500">2.1 TON</p>
        </div>
      </div>

      {/* ГЛАВНЫЙ ЭКРАН РУЛЕТКИ */}
      <div className="relative w-full aspect-square max-h-[340px] bg-[#111112] rounded-[40px] border border-white/10 overflow-hidden shadow-2xl mb-8">
        {/* Хедер внутри квадрата */}
        <div className="absolute top-5 left-6 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 italic">Live Round</span>
        </div>
        <div className="absolute top-5 right-6 flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/5">
          <Timer size={14} className="text-zinc-500" />
          <span className="text-[11px] font-black italic">{timeLeft}s</span>
        </div>

        {/* БАРАБАН (Имитация) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border-[10px] border-white/5 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full border-t-[10px] border-purple-500 animate-[spin_3s_linear_infinite]" />
            <div className="text-center">
              <Trophy size={40} className="mx-auto mb-2 text-yellow-500/50" />
              <p className="text-2xl font-black italic tracking-tighter">ROLLING</p>
            </div>
          </div>
        </div>
      </div>

      {/* СПИСОК ИГРОКОВ (СКРИН 1) */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-black italic">Players <span className="text-zinc-700 ml-1">3</span></h3>
        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Game #77200</p>
      </div>

      <div className="space-y-3 pb-10">
        {players.map((p) => (
          <div key={p.id} className="bg-[#111112] border border-white/5 rounded-[28px] p-4 flex items-center justify-between active:scale-95 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10">
                <img src={p.avatar} alt="av" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">{p.name}</h4>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                   <span className="text-[10px] font-black text-zinc-500 uppercase">{p.winChance}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-sm text-blue-400 italic">{p.bet}</p>
              <p className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">In pot</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
