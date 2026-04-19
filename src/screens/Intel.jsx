import React from 'react';
import { Flame, Clock, Twitter, Bot, AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Intel = () => {
  const { t } = useLanguage();

  const newsFeed = [
    { id: 1, type: 'official', title: "Valve release new CS2 Update: Overpass removed from Active Duty.", source: "Steam News", time: "2 min ago" },
    { id: 2, type: 'ai', title: "AI ALERT: AK-47 Slate volume increased by 400% in last hour. Possible buyout.", source: "OnlySkins AI", time: "15 min ago" },
    { id: 3, type: 'social', title: "s1mple hinted at returning to pro scene on his recent stream.", source: "Twitter / X", time: "1 hr ago" },
    { id: 4, type: 'official', title: "Copenhagen Major Pick'Em Challenge rewards are now distributed.", source: "CS2 Blog", time: "3 hrs ago" },
    { id: 5, type: 'ai', title: "MARKET TREND: Butterfly Knife Doppler dropping in price by 2.4%. Hold sales.", source: "OnlySkins AI", time: "4 hrs ago" },
    { id: 6, type: 'social', title: "Insiders: Next case might feature the long-awaited M4A4 Howl V2.", source: "Reddit / r/cs2", time: "5 hrs ago" },
  ];

  const getStyle = (type) => {
    switch(type) {
      case 'official': return 'shadow-[0_0_20px_rgba(255,255,255,0.15)] border-white/20';
      case 'social': return 'shadow-[0_0_20px_rgba(234,179,8,0.2)] border-yellow-500/40';
      case 'ai': return 'shadow-[0_0_20px_rgba(10,186,181,0.25)] border-[#0abab5]/40';
      default: return 'border-white/10';
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'official': return <AlertCircle size={14} className="text-white" />;
      case 'social': return <Twitter size={14} className="text-yellow-500" />;
      case 'ai': return <Bot size={14} className="text-[#0abab5]" />;
      default: return <Flame size={14} className="text-white" />;
    }
  };

  return (
    <div className="px-5 pt-8 pb-32 animate-in fade-in duration-500">
      <h1 className="text-4xl font-black tracking-tighter mb-2 italic">
        {t('intel')}
      </h1>
      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-8">
        {t('raw_data')}
      </p>

      <div className="space-y-4">
        {newsFeed.map((item) => (
          <div key={item.id} className={`bg-[#111112] rounded-[24px] p-5 border transition-all active:scale-[0.98] ${getStyle(item.type)}`}>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                {getIcon(item.type)}
                <span className={`text-[10px] font-black uppercase tracking-widest ${item.type === 'ai' ? 'text-[#0abab5]' : item.type === 'social' ? 'text-yellow-500' : 'text-white'}`}>
                  {item.source}
                </span>
              </div>
              <div className="flex items-center text-zinc-600 text-[9px] font-bold uppercase">
                <Clock size={10} className="mr-1" /> {item.time}
              </div>
            </div>
            <h3 className="text-sm font-bold leading-snug text-zinc-200">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Intel;
