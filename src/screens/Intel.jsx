import React, { useState, useEffect } from 'react';
import { Flame, Clock, Twitter, Bot, AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Intel = () => {
  const { t } = useLanguage();
  const [newsFeed, setNewsFeed] = useState([
    { id: 1, typeKey: 'type_official', titleKey: 'news_1_title', sourceKey: 'source_steam', time: 0 },
    { id: 2, typeKey: 'type_ai', titleKey: 'news_2_title', sourceKey: 'source_ai', time: 120 },
    { id: 3, typeKey: 'type_social', titleKey: 'news_3_title', sourceKey: 'source_twitter', time: 240 }
  ]);

  // База для генератора (Переводы в translations.js)
  const topicKeys = ["news_topic_M4 Howl", "news_topic_AWP DLore", "news_topic_Butterfly", "news_topic_s1mple"];
  const actionKeys = ["news_action_pumping", "news_action_dropped", "news_action_insider"];
  const typeKeys = ['type_official', 'type_social', 'type_ai'];
  const sourceKeys = ['source_steam', 'source_twitter', 'source_ai'];
  
  useEffect(() => {
    // Каждую секунду увеличиваем время "назад" у существующих новостей
    const timer = setInterval(() => {
      setNewsFeed(prev => prev.map(news => ({ ...news, time: news.time + 1 })));
    }, 1000);

    // Каждые 8 секунд рожаем новую фейковую новость
    const generator = setInterval(() => {
      const rndIndex = Math.floor(Math.random() * typeKeys.length);
      const newNews = {
        id: Date.now(),
        typeKey: typeKeys[rndIndex],
        // Мы используем ключи и переводим их, если нет - покажется "слипшийся" текст
        titleKey: `news_gen_${rndIndex}_title`, // Дефолт, если не добавлено в словарь
        title: `${t(topicKeys[Math.floor(Math.random() * topicKeys.length)])} ${t(actionKeys[Math.floor(Math.random() * actionKeys.length)])}`,
        sourceKey: sourceKeys[rndIndex],
        time: 0,
        isNew: true // Флаг для анимации
      };
      setNewsFeed(prev => [newNews, ...prev].slice(0, 15)); // Храним только 15 последних
    }, 8000);

    return () => { clearInterval(timer); clearInterval(generator); };
  }, [t]);

  // Функция глубокого перевода времени (just now, seconds, minutes)
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
      case 'type_ai': return 'border-[#0abab5]/40 shadow-[0_0_10px_rgba(10,186,181,0.15)]'; // Тиффани
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
    <div className="px-5 pt-8 pb-32 animate-in fade-in duration-500 overflow-y-auto">
      {/* 3. Оборачиваем заголовки в функцию перевода t() */}
      <div className="flex justify-between items-center mb-8 pr-1">
        <div>
          <h1 className="text-4xl font-black tracking-tighter italic text-white uppercase">{t('intel_title')}</h1>
          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">{t('raw_data')}</p>
        </div>
        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-zinc-400 border border-white/5 active:scale-95 transition-all">
          <Clock size={22}/>
        </div>
      </div>

      <div className="space-y-4">
        {newsFeed.map((item) => (
          <div key={item.id} className={`bg-[#111112] rounded-[24px] p-5 border transition-all duration-300 ${item.isNew ? 'animate-in slide-in-from-top-4 fade-in' : ''} ${getStyle(item.typeKey)}`}>
            <div className="flex justify-between items-center mb-3 pr-1">
              <div className="flex items-center gap-2">
                {getIcon(item.typeKey)}
                <span className={`text-[10px] font-black uppercase tracking-widest ${item.typeKey === 'type_ai' ? 'text-[#0abab5]' : item.typeKey === 'type_social' ? 'text-yellow-500' : 'text-white'}`}>
                  {t(item.sourceKey)}
                </span>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${item.typeKey === 'type_ai' ? 'bg-[#0abab5]/10 text-[#0abab5]' : 'bg-white/5 text-zinc-500'}`}>
                  {t(item.typeKey)}
                </span>
              </div>
              <div className="flex items-center text-zinc-500 text-[9px] font-bold uppercase shrink-0 gap-1.5">
                {item.time < 5 ? <span className="text-green-500 animate-pulse">{t('new_tag')}</span> : null}
                <Clock size={10}/> {formatTimeTranslated(item.time)}
              </div>
            </div>
            {/* Если ключа нет в translations, покажется дефолт на англ */}
            <h3 className="text-sm font-bold leading-snug text-zinc-200">
              {item.titleKey ? (t(item.titleKey) === item.titleKey ? "AI recorded market movement. Validating data..." : t(item.titleKey)) : item.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Intel;
