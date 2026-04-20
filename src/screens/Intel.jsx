import React from 'react';
import { Flame, Clock, Twitter, Bot, AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Intel = () => {
  const { t } = useLanguage();

  // Статичный список, который не исчезает при переключении вкладок
  const newsFeed = [
    { id: 1, type: 'official', titleKey: "news_1_title", source: "Steam", time: "10:45 AM" },
    { id: 2, type: 'ai', titleKey: "news_2_title", source: "AI Core", time: "09:30 AM" },
    { id: 3, type: 'social', titleKey: "news_3_title", source: "Twitter", time: "Yesterday" },
    { id: 4, type: 'official', titleKey: "news_4_title", source: "CS2 Blog", time: "Yesterday" },
    { id: 5, type: 'ai', titleKey: "news_5_title", source: "AI Core", time: "2 Days ago" },
  ];

  const getStyle = (type) => {
    switch(type) {
      case 'official': return 'border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]';
      case 'social': return 'border-yellow-500/40 shadow-[0_0_10px_rgba(234,179,8,0.1)]';
      case 'ai': return 'border-[#0abab5]/40 shadow-[0_0_10px_rgba(10,186,181,0.15)]';
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
      <h1 className="text-4xl font-black tracking-tighter mb-2 italic text-white uppercase">{t('intel')}</h1>
      <div className="flex items-center gap-2 mb-8">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.4em]">{t('raw_data')}</p>
      </div>

      <div className="space-y-4">
        {newsFeed.map((item) => (
          <div key={item.id} className={`bg-[#111112] rounded-[24px] p-5 border ${getStyle(item.type)}`}>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                {getIcon(item.type)}
                <span className={`text-[10px] font-black uppercase tracking-widest ${item.type === 'ai' ? 'text-[#0abab5]' : item.type === 'social' ? 'text-yellow-500' : 'text-white'}`}>
                  {item.source}
                </span>
              </div>
              <div className="flex items-center text-zinc-500 text-[9px] font-bold uppercase">
                <Clock size={10} className="mr-1" /> {item.time}
              </div>
            </div>
            {/* Если перевода нет в translations.js, покажется дефолтный текст на англ */}
            <h3 className="text-sm font-bold leading-snug text-zinc-200">
              {t(item.titleKey) === item.titleKey ? "Market update recorded. Checking data..." : t(item.titleKey)}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Intel;
