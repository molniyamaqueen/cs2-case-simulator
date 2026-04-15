// components/GamesTab.jsx
import React, { useState, useEffect } from 'react';

// Mock Data for the round
const mockPlayers = [
  { id: 1, name: "S1mpleFan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=S1mple", bet: 12.5 },
  { id: 2, name: "NikoGod", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Niko", bet: 5.0 },
  { id: 3, name: "CykaBlyat", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cyka", bet: 15.3 },
];

export default function GamesTab() {
  const [timeLeft, setTimeLeft] = useState(30);
  const totalBets = mockPlayers.reduce((acc, player) => acc + player.bet, 0);

  // Mock Timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  return (
    <div className="animate-fade-in">
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6 px-2">
        <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">Total Bets</p>
          <p className="font-bold text-white">💎 {totalBets.toFixed(1)} TON</p>
        </div>
        <div className={`px-4 py-2 rounded-lg border ${timeLeft < 10 ? 'border-red-500/50 bg-red-500/10' : 'border-emerald-500/50 bg-emerald-500/10'}`}>
          <p className="text-[10px] uppercase tracking-widest text-slate-400">Live Round</p>
          <p className={`font-mono font-bold text-lg ${timeLeft < 10 ? 'text-red-400' : 'text-emerald-400'}`}>
            00:{timeLeft.toString().padStart(2, '0')}
          </p>
        </div>
      </div>

      {/* CENTER STAGE: ROULETTE */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/20 blur-[50px] rounded-full pointer-events-none"></div>
        
        {/* Abstract representation of the wheel (Requires HTML5 Canvas/Framer Motion in prod) */}
        <div className="w-64 h-64 rounded-full border-4 border-slate-700 relative flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.15)] bg-slate-800/50">
          <div className="text-center z-10">
            <p className="text-slate-400 text-xs uppercase tracking-widest">Rolling In</p>
            <p className="text-3xl font-black text-white">{timeLeft}s</p>
          </div>
          {/* Wheel Segments Indicator (Simplified for React mapping) */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
             <circle cx="128" cy="128" r="124" stroke="currentColor" strokeWidth="4" fill="none" className="text-slate-600" />
             {/* In production, calculate stroke-dasharray based on player.bet / totalBets */}
          </svg>
        </div>
      </div>

      {/* ROUND PLAYERS LIST */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 px-2">Round Players</h3>
        {mockPlayers.sort((a, b) => b.bet - a.bet).map((player, index) => {
          const winChance = ((player.bet / totalBets) * 100).toFixed(1);
          return (
            <div key={player.id} className="bg-slate-800/80 border border-slate-700/50 rounded-xl p-3 flex items-center justify-between transition hover:bg-slate-800">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img src={player.avatar} alt={player.name} className="w-10 h-10 rounded-full bg-slate-700" />
                  {index === 0 && <span className="absolute -top-1 -right-1 text-xs">👑</span>}
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-200">{player.name}</p>
                  <p className="text-[10px] text-slate-500 font-mono">{winChance}% Win Chance</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-emerald-400">💎 {player.bet} TON</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
