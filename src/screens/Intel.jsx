import React, { useState, useEffect } from 'react';
import { Flame, Clock, Twitter, Bot, AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Intel = () => {
  const { t } = useLanguage();
  const [newsFeed, setNewsFeed] = useState([
    { id: 1, typeKey: 'type_official', title: "Valve release new CS2 Update.", sourceKey: "source_steam", time: 0 },
    { id: 2, typeKey: 'type_ai', title: "AK-47 Slate volume increased by 400%.", sourceKey: "source_ai", time: 120 }
  ]);

  // База для генератора (На английском, но типы и источники переводятся)
  const topics = ["M4A4 Howl", "AWP Dragon Lore", "Butterfly Knife", "Source 2", "s1mple", "Donk"];
  const actions = ["price pumping!", "dropped 15%.", "spotted in leaks.", "banned from major.", "going crazy."];
  const typeKeys = ['type_official', 'type_social', 'type_ai'];
  const sourceKeys = ['source_steam', 'source_twitter', 'source_ai'];
  
  useEffect(() => {
    // Каждую секунду увеличиваем время "назад"
    const timer = setInterval(() => {
      setNewsFeed(prev => prev.map(news => ({ ...news, time: news.time + 1 })));
    }, 1000);

    // Каждые 10 секунд рожаем новую новость
    const generator = setInterval(() => {
      const rndIndex = Math.floor(Math.random() * typeKeys.length);
      const newNews = {
        id: Date.now(),
        typeKey: typeKeys[rndIndex],
        title: `${topics[Math.floor(Math.random() * topics.length)]} ${actions[Math.floor(Math.random() * actions.length)]}`,
        sourceKey: sourceKeys[rndIndex],
        time: 0,
        isNew: true // Флаг для анимации
      };
      setNewsFeed(prev => [newNews, ...prev].slice(0, 15)); // Храним только 15 последних
    }, 10000);

    return () => { clearInterval(timer); clearInterval(generator); };
  }, []);

  // Функция глубокого перевода времени
  const formatTimeTranslated = (seconds) => {
    if (seconds < 5) return t('time_just_now');
    if (seconds < 60) return `${seconds}${t('time_seconds')}`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}${t('time_minutes')}`;
  };

  const getStyle = (typeKey) => {
    switch(typeKey) {
      case 'type_official': return 'border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]';
      case 'type_social': return 'border-yellow-500/40 shadow-[0_0_10px_rgba(234,179,8,0.1)]';
      case 'type_ai': return 'border-[#0abab5]/40 shadow-[0_0_10px_rgba(10,186,181,0.15)]';
      default: return 'border-white/10';
    }
  };

  const getIcon = (typeKey) => {
    switch(typeKey) {
      case 'type_official': return <AlertCircle size={14} className="text-white" />;
      case 'type_social': return <Twitter size={14} className="text-yellow-500" />;
      case 'type_ai': return <Bot size={14} className="text-[#0abab5]" />;
      default: return <Flame size={14} className="text-white" />;
    }
  };

  return (
    <div className="px-5 pt-8 pb-32 animate-in fade-in duration-500">
      <h1 className="text-4xl font-black tracking-tighter mb-2 italic text-white uppercase">{t('intel_title')}</h1>
      <div className="flex items-center gap-2 mb-8">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.4em]">{t('raw_data')}</p>
      </div>

      <div className="space-y-4">
        {newsFeed.map((item) => (
          <div key={item.id} className={`bg-[#111112] rounded-[24px] p-5 border transition-all ${item.isNew ? 'animate-in slide-in-from-top-4 fade-in' : ''} ${getStyle(item.typeKey)}`}>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                {getIcon(item.typeKey)}
                <span className={`text-[10px] font-black uppercase tracking-widest ${item.typeKey === 'type_ai' ? 'text-[#0abab5]' : item.typeKey === 'type_social' ? 'text-yellow-500' : 'text-white'}`}>
                  {t(item.sourceKey)}
                </span>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${item.typeKey === 'type_ai' ? 'bg-[#0abab5]/10 text-[#0abab5]' : 'bg-white/5 text-zinc-500'}`}>
                  {t(item.typeKey)}
                </span>
              </div>
              <div className="flex items-center text-zinc-500 text-[9px] font-bold uppercase">
                {item.time < 5 ? <span className="text-green-500 mr-2 animate-pulse">{t('new_tag')}</span> : null}
                <Clock size={10} className="mr-1" /> {formatTimeTranslated(item.time)}
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
