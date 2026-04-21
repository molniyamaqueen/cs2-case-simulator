import React from 'react';
import { Clock, ShieldCheck, Zap, MessageSquare } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Intel = () => {
  const { t } = useLanguage();

  const news = [
    { id: 1, type: 'OFFICIAL', title: "Valve updated Anti-Cheat modules for CS2.", time: "12m", source: "VALVE" },
    { id: 2, type: 'SIGNAL', title: "Butterfly Knife volume is hitting all-time high.", time: "1h", source: "AI CORE" },
    { id: 3, type: 'SOCIAL', title: "Major pros are reporting massive input lag issues.", time: "3h", source: "TWITTER" },
  ];

  return (
    <div className="px-6 pt-10 pb-32 animate-in fade-in duration-700 bg-[#0a0a0a]">
      <div className="mb-12">
        <h1 className="text-5xl font-black tracking-tighter mb-4 text-white uppercase italic">{t('intel_title')}</h1>
        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">{t('raw_data')}</p>
      </div>

      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="bg-[#111112] border border-white/5 rounded-[32px] p-7 flex flex-col gap-5 hover:bg-[#161617] transition-all">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest border ${
                  item.type === 'OFFICIAL' ? 'border-white/20 text-white' : 
                  item.type === 'SIGNAL' ? 'border-[#0abab5]/40 text-[#0abab5]' : 
                  'border-yellow-500/40 text-yellow-500'
                }`}>
                  {item.type}
                </div>
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{item.source}</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-700 text-[10px] font-bold">
                <Clock size={12} /> {item.time}
              </div>
            </div>
            
            <h3 className="text-lg font-bold leading-tight text-zinc-200">
              {item.title}
            </h3>
            
            <div className="flex justify-end pt-4 border-t border-white/5">
               <button className="text-[10px] font-black uppercase text-zinc-500 hover:text-white transition-colors">Read Full Data</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Intel;
