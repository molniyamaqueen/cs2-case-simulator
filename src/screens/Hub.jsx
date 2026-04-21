import React from 'react';
import { TrendingUp, ArrowUpRight, Zap, BarChart3, Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Hub = () => {
  const { t } = useLanguage();

  const signals = [
    { name: 'AK-47 Slate', prob: '94%', vol: '$1.2k', change: '+2.4%' },
    { name: 'AWP Mortis', prob: '88%', vol: '$800', change: '+1.1%' },
    { name: 'Glove Case', prob: '91%', vol: '$4.1k', change: '-0.5%' },
    { name: 'Karambit', prob: '82%', vol: '$15k', change: '+5.7%' },
  ];

  return (
    <div className="px-6 pt-10 pb-32 animate-in fade-in duration-700 bg-[#0a0a0a]">
      {/* HEADER SECTION */}
      <div className="mb-12">
        <h1 className="text-5xl font-black tracking-tighter mb-4 text-white uppercase italic">
          {t('hub_title')}
        </h1>
        <div className="flex items-center gap-4 text-zinc-500 font-bold text-[10px] tracking-[0.3em] uppercase">
           <span className="flex items-center gap-1.5"><Globe size={12}/> Global Market</span>
           <span className="w-1 h-1 bg-zinc-800 rounded-full"/>
           <span>{t('raw_data')}</span>
        </div>
      </div>

      {/* MARKET INDEX CARD (Cryptomannn Style) */}
      <div className="bg-[#111112] border border-white/5 rounded-[32px] p-8 mb-10 shadow-2xl relative overflow-hidden">
        <div className="flex justify-between items-start mb-10">
          <div>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">{t('mkt_index')}</p>
            <h2 className="text-5xl font-black text-white italic tracking-tighter">418.27</h2>
          </div>
          <div className="bg-green-500/10 text-green-500 px-4 py-2 rounded-full text-xs font-black flex items-center gap-2 border border-green-500/20">
             <TrendingUp size={14}/> +4.12%
          </div>
        </div>
        
        {/* Minimalist Chart Line */}
        <div className="w-full h-24 relative opacity-50">
           <svg viewBox="0 0 100 20" className="w-full h-full stroke-green-500 stroke-[1] fill-none">
              <path d="M0 18 L 20 12 L 40 15 L 60 5 L 80 8 L 100 2" className="animate-pulse" />
           </svg>
        </div>
      </div>

      {/* SIGNALS GRID */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest italic">{t('signals_title')}</h3>
        <BarChart3 size={16} className="text-zinc-700" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {signals.map((s, i) => (
          <div key={i} className="bg-[#111112] border border-white/5 rounded-[28px] p-6 hover:border-white/20 transition-all active:scale-95 group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                <Zap size={20} />
              </div>
              <ArrowUpRight size={16} className="text-zinc-700 group-hover:text-white transition-all" />
            </div>
            <h4 className="text-sm font-black text-white mb-1 uppercase truncate">{s.name}</h4>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
               <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{s.vol}</span>
               <span className="text-xs font-black text-[#0abab5]">{s.prob}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hub;
