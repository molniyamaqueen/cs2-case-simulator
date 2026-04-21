import React, { useState } from 'react';
import { TrendingUp, ArrowUpRight, Zap, BarChart3, Globe, Lock, PlayCircle, BookOpen } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Hub = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('dashboard'); // Переключатель вкладок

  const signals = [
    { name: 'AK-47 Slate', prob: '94%', vol: '$1.2k', change: '+2.4%' },
    { name: 'AWP Mortis', prob: '88%', vol: '$800', change: '+1.1%' },
    { name: 'Glove Case', prob: '91%', vol: '$4.1k', change: '-0.5%' },
    { name: 'Karambit', prob: '82%', vol: '$15k', change: '+5.7%' },
  ];

  const reports = [
    { id: 1, title: 'Q2 Market Whale Movements', type: 'QUANTUM REPORT', price: '50 ⭐' },
    { id: 2, title: 'Top 5 Cases to Hold in 2026', type: 'AI ANALYSIS', price: '30 ⭐' },
  ];

  return (
    <div className="px-6 pt-10 pb-32 animate-in fade-in duration-700 bg-[#0a0a0a] min-h-full">
      
      {/* HEADER & TABS */}
      <div className="mb-10">
        <h1 className="text-5xl font-black tracking-tighter mb-6 text-white uppercase italic">
          {t('hub_title') || 'HUB'}
        </h1>
        
        {/* Переключатель вкладок: Дашборд / Академия */}
        <div className="flex gap-4 border-b border-white/5 pb-4">
          <button 
            onClick={() => setActiveSection('dashboard')} 
            className={`text-sm font-black uppercase tracking-widest transition-colors ${activeSection === 'dashboard' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveSection('academy')} 
            className={`text-sm font-black uppercase tracking-widest transition-colors flex items-center gap-1.5 ${activeSection === 'academy' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
          >
            Academy <Lock size={12} className={activeSection === 'academy' ? 'text-[#0abab5]' : 'text-zinc-600'}/>
          </button>
        </div>
      </div>

      {/* ВЛОЖЕНИЕ 1: ДАШБОРД (Тот, что мы уже сделали) */}
      {activeSection === 'dashboard' && (
        <div className="animate-in fade-in slide-in-from-left-4 duration-500">
          {/* MARKET INDEX CARD */}
          <div className="bg-[#111112] border border-white/5 rounded-[32px] p-8 mb-10 shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-10">
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">{t('mkt_index') || 'MARKET INDEX'}</p>
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

          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest italic">{t('signals_title') || 'LIVE SIGNALS'}</h3>
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
      )}

      {/* ВЛОЖЕНИЕ 2: АКАДЕМИЯ (Решение пункта 2 - Монетизация без стримеров) */}
      {activeSection === 'academy' && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="mb-8">
            <p className="text-sm font-bold text-zinc-500 leading-relaxed">
              Exclusive AI-generated market reports and trading methodologies. Unlock with Telegram Stars.
            </p>
          </div>

          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="bg-[#111112] border border-white/5 rounded-[32px] p-7 flex flex-col hover:border-white/20 transition-all group">
                <div className="flex justify-between items-center mb-6">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                    {report.type}
                  </span>
                  <Lock size={16} className="text-zinc-600 group-hover:text-[#0abab5] transition-colors" />
                </div>
                
                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-6">{report.title}</h3>
                
                {/* Кнопка покупки за Звезды */}
                <button className="w-full bg-[#18181b] border border-white/10 hover:bg-white hover:text-black text-white h-14 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all">
                   Unlock for {report.price}
                </button>
              </div>
            ))}

            {/* Бесплатный базовый гайд (для завлекалова) */}
            <div className="bg-[#111112] border border-white/5 rounded-[32px] p-7 flex flex-col hover:border-white/20 transition-all">
               <div className="flex justify-between items-center mb-6">
                  <span className="px-3 py-1 bg-[#0abab5]/10 border border-[#0abab5]/20 text-[#0abab5] rounded-full text-[9px] font-black uppercase tracking-widest">
                    FREE BASE
                  </span>
                  <BookOpen size={16} className="text-zinc-500" />
               </div>
               <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-6">Trading 101: Basics</h3>
               <button className="w-full bg-white/5 text-white h-14 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all hover:bg-white/10">
                   <PlayCircle size={16}/> Start Reading
               </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Hub;
