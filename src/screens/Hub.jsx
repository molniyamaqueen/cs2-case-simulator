import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

const Hub = () => {
  const [indexValue, setIndexValue] = useState(418.27);
  const [signals, setSignals] = useState([
    { name: 'AK-47 Slate', prob: '94%', vol: 1200, change: 2.4 },
    { name: 'AWP Mortis', prob: '88%', vol: 800, change: 1.1 },
  ]);

  // Оживление цифр (Пункт 11)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndexValue(prev => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(2));
      setSignals(prev => prev.map(s => ({
        ...s,
        vol: Math.floor(s.vol + (Math.random() * 10 - 5)),
        change: +(s.change + (Math.random() * 0.2 - 0.1)).toFixed(2)
      })));
    }, 3000); // Каждые 3 секунды цифры дергаются
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-6 pt-10 pb-32 bg-[#0a0a0a] min-h-full font-sans">
      <h1 className="text-5xl font-black italic text-white mb-6 uppercase tracking-tighter">HUB</h1>

      {/* Индекс с объяснением (Пункт 12) */}
      <div className="bg-[#111112] border border-white/5 rounded-[32px] p-8 mb-6 relative">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Market Index</p>
          <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1 border border-green-500/20">
             <TrendingUp size={12}/> +4.12%
          </div>
        </div>
        
        <h2 className="text-5xl font-black text-white italic tracking-tighter mb-4">{indexValue}</h2>
        
        <div className="flex items-start gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
          <Info size={16} className="text-zinc-500 shrink-0 mt-0.5" />
          <p className="text-[9px] font-bold text-zinc-500 uppercase leading-relaxed">
            Агрегированный показатель стоимости топ-100 самых ликвидных скинов CS2. 
            Показывает общее настроение рынка (бычье/медвежье) в реальном времени.
          </p>
        </div>
      </div>

      {/* Сигналы */}
      <div className="grid grid-cols-2 gap-4">
        {signals.map((s, i) => (
          <div key={i} className="bg-[#111112] border border-white/5 rounded-[24px] p-5">
            <h4 className="text-sm font-black text-white mb-2 uppercase truncate">{s.name}</h4>
            <div className="flex justify-between text-xs font-bold">
              <span className="text-zinc-500">${s.vol}</span>
              <span className={s.change >= 0 ? "text-green-500" : "text-red-500"}>
                {s.change > 0 ? '+' : ''}{s.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hub;
