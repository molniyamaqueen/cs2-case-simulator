import React, { useState } from 'react';
import { Sparkles, Zap, Target, TrendingUp, TrendingDown, Clock, Gem } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Hub = () => {
  const { t } = useLanguage();
  const [activeTag, setActiveTag] = useState('All');

  // Фейковые жирные сигналы для сетки
  const signals = [
    { name: 'AK-47 Slate', prob: '94%', vol: '$1.2k', trend: 'up' },
    { name: 'AWP Mortis', prob: '88%', vol: '$800', trend: 'up' },
    { name: 'Glove Case', prob: '91%', vol: '$4.1k', trend: 'up' },
    { name: 'Karambit Doppler', prob: '82%', vol: '$15k', trend: 'down' },
  ];

  const tags = ['All', 'Knives', 'Gloves', 'Cases', 'AK-47'];

  return (
    <div className="px-5 pt-8 pb-32 animate-in fade-in duration-500">
      
      {/* HEADER (Как в боте) */}
      <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tighter italic text-white uppercase">{t('hub_title') || 'HUB'}</h1>
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">{t('raw_data') || 'Live Stream'}</p>
          </div>
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/5 shadow-xl text-yellow-400">
             <Gem size={20} />
          </div>
      </div>

      {/* 1. MARKET INDEX (Крупный блок, как Индекс в боте) */}
      <div className="p-1 rounded-[32px] bg-gradient-to-r from-[#0abab5]/20 to-purple-500/20 mb-8 shadow-2xl">
          <div className="bg-[#111112] rounded-[28px] p-6 border border-white/[0.03]">
              <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-2.5 text-[#0abab5]">
                      <Sparkles size={16} /><span className="text-[10px] font-black uppercase tracking-widest">{t('mkt_index') || 'MARKET INDEX'}</span>
                  </div>
                  <div className="text-[11px] font-black uppercase px-4 py-2 bg-black rounded-full border border-green-500/10 text-green-500 flex items-center gap-1.5">
                    <TrendingUp size={12} /> +2.4% (1h)
                  </div>
              </div>
              
              {/* Имитация графика-линии */}
              <div className="w-full h-16 relative mb-4">
                  <svg viewBox="0 0 100 20" className="w-full h-full stroke-green-500 stroke-[1.5] fill-none">
                      <path d="M0 15 Q 10 5, 20 12 T 40 8 T 60 14 T 80 5 T 100 10" className="animate-[dash_2s_ease-out]" />
                  </svg>
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>

              <div className="flex justify-between items-center">
                  <span className="text-4xl font-black tracking-tighter text-white">418.2 <span className="text-lg text-zinc-600">points</span></span>
                  <p className="text-sm font-bold text-zinc-500">Bullish sentiment</p>
              </div>
          </div>
      </div>

      {/* 2. TAGS FILTER (Таблетки, как в боте) */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 mb-8 pr-2">
          {tags.map(tag => (
              <button 
                  key={tag} 
                  onClick={() => setActiveTag(tag)}
                  className={`h-10 px-6 rounded-full flex items-center justify-center shrink-0 border transition-all text-[11px] font-black uppercase tracking-wider ${activeTag === tag ? 'bg-white text-black border-white shadow-xl' : 'bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10'}`}
              >
                  {t(`tag_${tag.toLowerCase()}`) || tag}
              </button>
          ))}
      </div>

      {/* 3. SIGNALS GRID (Плотная сетка 2х2) */}
      <div className="mb-5 flex justify-between items-center px-1">
        <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] italic">{t('signals_title') || 'Neural Active Signals'}</h3>
        <div className="flex items-center gap-1.5 text-zinc-700 text-[10px] font-bold">
            <Clock size={12}/> Live
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 pb-10">
          {signals.map((s, i) => (
            <div key={i} className="bg-[#111112] border border-white/5 rounded-[28px] p-5 flex flex-col gap-4 shadow-lg active:scale-95 transition-all">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-bold text-sm text-white mb-0.5 truncate">{s.name}</h4>
                        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{s.vol}</p>
                    </div>
                    {s.trend === 'up' ? <TrendingUp size={16} className="text-green-500" /> : <TrendingDown size={16} className="text-red-500" />}
                </div>
                
                <div className="w-full h-px bg-white/5" />
                
                <div className="flex justify-between items-center">
                   <span className="text-[10px] font-black text-zinc-500 uppercase">{t('games') || 'games'} {s.vol}</span>
                   <div className="text-[12px] font-black uppercase px-3.5 py-1.5 bg-black rounded-full border border-green-500/10 text-green-500">
                      {s.prob}
                   </div>
                </div>
            </div>
          ))}
      </div>

    </div>
  );
};

export default Hub;
