import React, { useState, useEffect } from 'react';
import { Trophy, ShieldCheck } from 'lucide-react';

const Games = () => {
  const [gameState, setGameState] = useState('betting'); // 'betting', 'rolling', 'ended'
  const [timeLeft, setTimeLeft] = useState(30);
  const [winner, setWinner] = useState(null);
  const [cursorPos, setCursorPos] = useState(50); // Позиция "рулетки" (0-100%)

  const players = [
    { id: 1, name: "@korablickk", bet: 1.5, color: "#a855f7" },
    { id: 2, name: "@whale_trade", bet: 0.8, color: "#06b6d4" },
    { id: 3, name: "@sniper22", bet: 0.2, color: "#f97316" },
  ];

  // Математика банка
  const totalBank = players.reduce((acc, p) => acc + p.bet, 0);
  const rakeAmount = totalBank * 0.05; // Твоя комиссия 5%
  const prizePool = totalBank - rakeAmount; // Чистый выигрыш победителя

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      
      // Имитация бегающего курсора рулетки во время rolling
      if (gameState === 'rolling') {
        setCursorPos(Math.random() * 100);
      }
      
    } else {
      if (gameState === 'betting') {
        setGameState('rolling');
        setTimeLeft(15);
      } else if (gameState === 'rolling') {
        // Логика победителя
        const rand = Math.random() * totalBank;
        let cumulative = 0;
        let finalPos = 0;
        
        for (const p of players) {
          cumulative += p.bet;
          if (rand <= cumulative) {
            setWinner(p);
            // Высчитываем точку остановки курсора (где-то на отрезке победителя)
            const segmentStart = ((cumulative - p.bet) / totalBank) * 100;
            const segmentEnd = (cumulative / totalBank) * 100;
            finalPos = segmentStart + (Math.random() * (segmentEnd - segmentStart));
            break;
          }
        }
        setCursorPos(finalPos);
        setGameState('ended');
      }
    }
    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  return (
    <div className="px-6 pt-10 pb-32 bg-[#0a0a0a] min-h-full font-sans">
      <h1 className="text-5xl font-black italic text-white mb-8 uppercase tracking-tighter">ARENA</h1>

      {/* ВИЗУАЛЬНАЯ РУЛЕТКА */}
      <div className="relative w-full h-8 bg-zinc-900 rounded-full mb-8 flex overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
        {/* Сегменты игроков */}
        {players.map(p => (
          <div key={p.id} style={{ width: `${(p.bet / totalBank) * 100}%`, backgroundColor: p.color }} className="h-full opacity-80" />
        ))}
        
        {/* Курсор рулетки */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_white] transition-all duration-300 z-10"
          style={{ 
            left: `${cursorPos}%`,
            transitionDuration: gameState === 'rolling' ? '300ms' : '1500ms',
            transitionTimingFunction: gameState === 'ended' ? 'ease-out' : 'linear'
          }}
        />
      </div>

      {/* Таймер и Банк */}
      <div className="bg-[#111112] border border-white/5 rounded-[32px] p-8 mb-6 text-center">
        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">
          {gameState === 'betting' ? 'Time to Bet' : 'Rolling...'}
        </p>
        <h2 className="text-6xl font-black text-white italic mb-4">{timeLeft}s</h2>
        
        <div className="flex justify-center gap-4 text-sm font-bold">
          <div className="text-zinc-400">Pot: <span className="text-white">{totalBank.toFixed(2)} TON</span></div>
          <div className="text-zinc-600">|</div>
          <div className="text-[#0abab5] flex items-center gap-1"><ShieldCheck size={14}/> Rake 5%: {rakeAmount.toFixed(2)} TON</div>
        </div>
      </div>

      {/* КАРТОЧКА ПОБЕДЫ */}
      {gameState === 'ended' && winner && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#111112] border border-white/10 rounded-[40px] p-10 w-full text-center animate-in zoom-in-95">
            <Trophy size={64} className="mx-auto text-yellow-500 mb-6" />
            <h2 className="text-3xl font-black text-white mb-2 uppercase italic">ПОБЕДА!</h2>
            <p className="text-zinc-500 font-bold mb-6">Сорвал куш: {winner.name}</p>
            
            <div className="bg-black border border-white/5 text-white py-4 rounded-2xl text-3xl font-black mb-2 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              +{prizePool.toFixed(2)} <span className="text-lg text-zinc-500">TON</span>
            </div>
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-8">С учетом комиссии системы</p>

            <button 
              onClick={() => { setGameState('betting'); setTimeLeft(30); }}
              className="w-full bg-white text-black h-14 rounded-full font-black uppercase text-xs"
            >
              Следующий раунд
            </button>
          </div>
        </div>
      )}

      {/* Список участников */}
      <div className="space-y-3">
        {players.map(p => (
          <div key={p.id} className="bg-[#111112] border border-white/5 rounded-2xl p-4 flex justify-between items-center">
            <span className="font-bold text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
              {p.name}
            </span>
            <div className="text-right">
              <p className="text-white font-black">{p.bet} TON</p>
              <p className="text-[10px] font-bold text-zinc-500 uppercase">{((p.bet/totalBank)*100).toFixed(1)}% Chance</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
