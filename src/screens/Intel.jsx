import React, { useState, useEffect } from 'react';
import { Flame, Clock } from 'lucide-react';

const Intel = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://store.steampowered.com/feeds/news/app/730/');
        const data = await res.json();
        const formatted = data.items.map((item, i) => ({
          id: i,
          title: item.title,
          img: item.enclosure?.link || `https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&sig=${i}`,
          time: new Date(item.pubDate).toLocaleDateString()
        }));
        setNews(formatted);
        setLoading(false);
      } catch (e) { setLoading(false); }
    };
    fetchNews();
  }, []);

  return (
    <div className="px-6 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h1 className="text-4xl font-black tracking-tighter mb-2 italic">INTEL</h1>
      <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-8">Live Feed Analysis</p>

      {loading ? (
        <div className="flex justify-center pt-20 animate-pulse text-zinc-800 font-black uppercase text-[10px]">Syncing with Valve...</div>
      ) : (
        news.map((item) => (
          <div key={item.id} className="relative w-full h-48 rounded-[32px] overflow-hidden mb-6 border border-white/5 active:scale-95 transition-all duration-500 group">
            <img src={item.img} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000" alt="bg" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center text-[9px] font-black uppercase tracking-widest mb-2 text-blue-400">
                <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse" />
                Official News
              </div>
              <h3 className="text-lg font-bold leading-tight mb-2 line-clamp-2">{item.title}</h3>
              <div className="flex items-center text-zinc-500 text-[9px] font-bold uppercase"><Clock size={12} className="mr-1" /> {item.time}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Intel;
