import React, { useState } from 'react';
import { Sparkles, Zap, TrendingUp, TrendingDown, Clock, Gem } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Hub = () => {
  const { t } = useLanguage();
  const [activeTag, setActiveTag] = useState('All');

  // Фейковые жирные сигналы для сетки (Portals style)
  const signals = [
    { name: 'AK-47 Slate', prob: '94%', vol: '$1.2k', trend: 'up', type: 'type_ai' },
    { name: 'AWP Mortis', prob: '88%', vol: '$800', trend: 'up', type: 'type_social' },
    { name: 'Glove Case', prob: '91%', vol: '$4.1k', trend: 'up', type: 'type_ai' },
    { name: 'Butterfly Knife', prob: '82%', vol: '$15k', trend: 'down', type: 'type_ai' },
  ];

  const tags = ['All', 'Knives', 'Gloves', 'Cases', 'AK-47'];

  return (
    <div className="px-5 pt-8 pb-32 animate-in fade-in duration-500 overflow-y-auto">
      
      {/* HEADER (Как в Портале) */}
      <div className="flex justify-between items-center mb-8 pr-1">
          <div>
            <h1 className="text-4xl font-black tracking-tighter italic text-white uppercase">{t('hub_title')}</h1>
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">{t('raw_data')}</p>
          </div>
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/5 shadow-xl text-yellow-400 active:scale-95 transition-all">
             <Gem size={20} />
          </div>
      </div>

      {/* 1. MARKET INDEX (Крупный блок с графиком) */}
      <div className="p-1 rounded-[32px] bg-gradient-to-r from-[#0abab5]/20 to-purple-500/20 mb-8 shadow-2xl">
          <div className="bg-[#111112] rounded-[28px] p-6 border border-white/[0.03]">
              <div className="flex justify-between items-center mb-5 pr-1">
                  <div className="flex items-center gap-2.5 text-[#0abab5]">
                      <Sparkles size={16} /><span className="text-[10px] font-black uppercase tracking-widest">{t('mkt_index')}</span>
                  </div>
                  <div className="text-[11px] font-black uppercase px-4 py-2 bg-black rounded-full border border-green-500/10 text-green-500 flex items-center gap-1.5 shrink-0">
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

              <div className="flex justify-between items-center pr-1">
                  <span className="text-4xl font-black tracking-tighter text-white">418.2 <span className="text-lg text-zinc-600">points</span></span>
                  <p className="text-xs font-bold text-zinc-500">Bullish sentiment</p>
              </div>
          </div>
      </div>

      {/* 2. TAGS FILTER (Таблетки, как в Портале) */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 mb-8 pr-2">
          {tags.map(tag => (
              <button 
                  key={tag} 
                  onClick={() => setActiveTag(tag)}
                  className={`h-10 px-6 rounded-full flex items-center justify-center shrink-0 border transition-all text-[11px] font-black uppercase tracking-wider ${activeTag === tag ? 'bg-white text-black border-white shadow-xl' : 'bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10'}`}
              >
                  {t(`tag_${tag.toLowerCase()}`)}
              </button>
          ))}
      </div>

      {/* 3. SIGNALS GRID (Плотная сетка 2х2 в стиле Портала) */}
      <div className="mb-5 flex justify-between items-center px-2 pr-2">
        <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] italic">{t('signals_title')}</h3>
        <div className="flex items-center gap-1.5 text-zinc-700 text-[10px] font-bold">
            <Clock size={12}/> Live
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 pb-10">
          {signals.map((s, i) => (
            <div key={i} className="bg-[#111112] border border-white/5 rounded-[28px] p-5 flex flex-col gap-4 shadow-lg active:scale-95 transition-all">
                <div className="flex justify-between items-start pr-1">
                    <div className="w-3/4">
                        <h4 className="font-bold text-sm text-white mb-0.5 truncate">{s.name}</h4>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${s.type === 'type_ai' ? 'text-[#0abab5]' : 'text-yellow-500'}`}>
                           {t(s.type)}
                        </span>
                    </div>
                    {s.trend === 'up' ? <TrendingUp size={16} className="text-green-500" /> : <TrendingDown size={16} className="text-red-500" />}
                </div>
                
                <div className="w-full h-px bg-white/5" />
                
                <div className="flex justify-between items-center pr-1">
                   <div className="text-center">
                       <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Vol</p>
                       <span className="text-xs font-bold text-white">{s.vol}</span>
                   </div>
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
