import React, { useState, useEffect } from 'react';
import { Swords, Timer, Wallet, ChevronRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Games = () => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState(45);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const players = [
    { id: 1, name: "@korablickk", bet: "1.5 TON", chance: "60.0%", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100", isMe: true },
    { id: 2, name: "@whale_trade", bet: "0.8 TON", chance: "32.0%", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", isMe: false },
    { id: 3, name: "@sniper22", bet: "0.2 TON", chance: "8.0%", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100", isMe: false },
  ];

  return (
    <div className="px-6 pt-10 pb-32 animate-in fade-in duration-700 bg-[#0a0a0a] min-h-full">
      
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-5xl font-black tracking-tighter mb-2 text-white uppercase italic">ARENA</h1>
        <div className="flex items-center gap-3 text-zinc-500 font-bold text-[10px] tracking-[0.3em] uppercase">
           <span className="flex items-center gap-1.5"><Swords size={12}/> Live Clash</span>
           <span className="w-1 h-1 bg-zinc-800 rounded-full"/>
           <span>Room #882</span>
        </div>
      </div>

      {/* MAIN POT CARD (Строгий крипто-стиль) */}
      <div className="bg-[#111112] border border-white/5 rounded-[32px] p-8 mb-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
        {/* Пульсирующий таймер */}
        <div className="absolute top-6 right-6 flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
          <Timer size={14} className="text-zinc-400" />
          <span className="text-xs font-black text-white">{timeLeft}s</span>
        </div>

        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 mt-8">Total Pot</p>
        <h2 className="text-6xl font-black text-white italic tracking-tighter mb-8">2.50 <span className="text-2xl text-zinc-600">TON</span></h2>
        
        {/* Кнопка ставки */}
        <button className="w-full bg-white text-black h-16 rounded-full font-black uppercase tracking-wider text-sm flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <Wallet size={18} /> Join Arena
        </button>
      </div>

      {/* PLAYERS LIST (Стиль таблицы) */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest italic">Contenders</h3>
        <span className="text-xs font-bold text-zinc-600 uppercase">3 Players</span>
      </div>

      <div className="space-y-3">
        {players.map((p) => (
          <div key={p.id} className={`bg-[#111112] border ${p.isMe ? 'border-white/20' : 'border-white/5'} rounded-[24px] p-4 flex items-center justify-between transition-all`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 bg-zinc-900 shrink-0">
                <img src={p.avatar} alt="av" className="w-full h-full object-cover opacity-80" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  {p.name} {p.isMe && <span className="px-2 py-0.5 bg-white text-black text-[8px] font-black uppercase rounded-sm">You</span>}
                </h4>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Chance: {p.chance}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-sm text-white">{p.bet}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Games;
