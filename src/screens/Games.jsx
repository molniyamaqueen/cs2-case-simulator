import React, { useState, useEffect } from 'react';
import { Swords, Timer, Wallet, Loader2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Games = () => {
  const { t } = useLanguage();
  
  // Состояния игры
  const [timeLeft, setTimeLeft] = useState(45);
  const [isRolling, setIsRolling] = useState(false);
  const [myBet, setMyBet] = useState(0);
  
  // Боты (Изначальный пул)
  const [bots, setBots] = useState([
    { id: 'bot1', name: "@whale_trade", bet: 1.5, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", isMe: false },
    { id: 'bot2', name: "@sniper_pro", bet: 0.8, avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100", isMe: false },
  ]);

  // Считаем общий банк (Пот)
  const totalPot = bots.reduce((sum, bot) => sum + bot.bet, 0) + myBet;

  // 1. Главный цикл игры (Таймер и Ролл)
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsRolling(true);
      
      // Имитация прокрутки рулетки (4 секунды), затем рестарт
      setTimeout(() => {
        setIsRolling(false);
        setTimeLeft(45);
        setMyBet(0);
        // Генерируем новые стартовые ставки для ботов в новом раунде
        setBots([
          { id: 'bot1', name: "@whale_trade", bet: Number((Math.random() * 2 + 0.5).toFixed(2)), avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", isMe: false },
          { id: 'bot2', name: "@sniper_pro", bet: Number((Math.random() * 1 + 0.1).toFixed(2)), avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100", isMe: false },
        ]);
      }, 4000);
      return;
    }

    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // 2. Имитация живых ставок от ботов
  useEffect(() => {
    if (timeLeft < 40 && timeLeft > 5 && !isRolling) {
      const botAction = setInterval(() => {
         if (Math.random() > 0.6) { // 40% шанс, что бот докинет денег
            setBots(prev => {
               const newBots = [...prev];
               const randomBot = Math.floor(Math.random() * newBots.length);
               newBots[randomBot].bet = Number((newBots[randomBot].bet + Math.random() * 0.5).toFixed(2));
               return newBots;
            });
         }
      }, 2500); // Каждые 2.5 секунды проверка
      return () => clearInterval(botAction);
    }
  }, [timeLeft, isRolling]);

  // Функция для нашей ставки
  const handleJoin = () => {
    if (isRolling) return;
    try { window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium'); } catch(e) {}
    setMyBet(prev => Number((prev + 0.5).toFixed(2))); // Добавляем 0.5 TON за клик
  };

  // Собираем всех игроков (боты + мы, если мы сделали ставку) и сортируем по убыванию ставки
  const allPlayers = [...bots];
  if (myBet > 0) {
     allPlayers.push({ id: 'me', name: "You (Anonymous)", bet: myBet, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100", isMe: true });
  }
  allPlayers.sort((a, b) => b.bet - a.bet);

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

      {/* MAIN POT CARD */}
      <div className="bg-[#111112] border border-white/5 rounded-[32px] p-8 mb-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
        
        {/* Таймер */}
        <div className={`absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${isRolling ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-white/5 border-white/5 text-white'}`}>
          {isRolling ? <Loader2 size={14} className="animate-spin" /> : <Timer size={14} className="text-zinc-400" />}
          <span className="text-xs font-black">{isRolling ? 'ROLLING...' : `${timeLeft}s`}</span>
        </div>

        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 mt-8 transition-all">Total Pot</p>
        <h2 className="text-6xl font-black text-white italic tracking-tighter mb-8">
          {totalPot.toFixed(2)} <span className="text-2xl text-zinc-600">TON</span>
        </h2>
        
        {/* Кнопка ставки (блокируется во время прокрутки) */}
        <button 
          onClick={handleJoin}
          disabled={isRolling}
          className={`w-full h-16 rounded-full font-black uppercase tracking-wider text-sm flex items-center justify-center gap-3 transition-all ${
            isRolling 
              ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' 
              : 'bg-white text-black active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]'
          }`}
        >
          <Wallet size={18} /> {myBet === 0 ? 'Join Arena (0.5 TON)' : '+0.5 TON'}
        </button>
      </div>

      {/* PLAYERS LIST */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest italic">Contenders</h3>
        <span className="text-xs font-bold text-zinc-600 uppercase">{allPlayers.length} Players</span>
      </div>

      <div className="space-y-3">
        {allPlayers.map((p) => {
          // Математика: считаем шанс на победу для каждого
          const chance = ((p.bet / totalPot) * 100).toFixed(1);
          
          return (
            <div key={p.id} className={`bg-[#111112] border ${p.isMe ? 'border-[#0abab5]/40 shadow-[0_0_15px_rgba(10,186,181,0.1)]' : 'border-white/5'} rounded-[24px] p-4 flex items-center justify-between transition-all duration-500`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 bg-zinc-900 shrink-0">
                  <img src={p.avatar} alt="av" className="w-full h-full object-cover opacity-80" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    {p.name} {p.isMe && <span className="px-2 py-0.5 bg-[#0abab5] text-black text-[8px] font-black uppercase rounded-sm">You</span>}
                  </h4>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${p.isMe ? 'text-[#0abab5]' : 'text-zinc-500'}`}>
                    Chance: {chance}%
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-sm text-white">{p.bet.toFixed(2)} TON</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Games;
