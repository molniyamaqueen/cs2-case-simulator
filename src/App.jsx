import React, { useState, useEffect } from 'react';
import { Gamepad2, Sparkles, Flame, Clock } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('intel');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- АВТОМАТИКА: ПОЛУЧЕНИЕ НОВОСТЕЙ ---
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Используем открытый RSS мост для получения официальных новостей CS2
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://store.steampowered.com/feeds/news/app/730/');
        const data = await response.json();
        
        const formattedNews = data.items.map((item, index) => ({
          id: index,
          tag: "OFFICIAL",
          title: item.title,
          // Берем картинку из новости или ставим заглушку, если её нет
          img: item.enclosure?.link || `https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&sig=${index}`,
          color: "text-blue-400",
          time: new Date(item.pubDate).toLocaleDateString()
        }));
        
        setNews(formattedNews);
        setLoading(false);
      } catch (e) {
        console.error("Ошибка автоматики:", e);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const triggerHaptic = (style = 'medium') => {
    try { window.Telegram?.WebApp?.HapticFeedback?.impactOccurred(style); } catch (e) {}
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden font-sans">
      
      <main className="flex-1 overflow-y-auto pb-32 px-5 pt-8">
        {activeTab === 'intel' ? (
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-700">
            <h1 className="text-4xl font-black tracking-tighter mb-2 italic">INTEL</h1>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] mb-8">Live Feed Analysis</p>

            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 opacity-20">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-[10px] font-bold tracking-widest uppercase">Connecting to Valve API...</p>
              </div>
            ) : (
              news.map((item) => (
                <div key={item.id} className="relative w-full h-48 rounded-[32px] overflow-hidden mb-5 border border-white/5 active:scale-95 transition-all duration-500 group">
                  <img src={item.img} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000" alt="bg" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className={`flex items-center text-[9px] font-black uppercase tracking-widest mb-2 ${item.color}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse" />
                      {item.tag}
                    </div>
                    <h3 className="text-lg font-bold leading-tight mb-2 line-clamp-2">{item.title}</h3>
                    <div className="flex items-center text-zinc-500 text-[10px] font-bold uppercase tracking-tighter">
                      <Clock size={12} className="mr-1" /> {item.time}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            <h2 className="text-2xl font-black uppercase tracking-[0.5em] text-[#1a1a1c]">{activeTab}</h2>
            <p className="text-[10px] font-bold text-zinc-800 mt-2">Section Under Development</p>
          </div>
        )}
      </main>

      {/* НАВИГАЦИЯ */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#0d0d0f]/90 backdrop-blur-xl border border-white/5 rounded-[32px] p-2 flex justify-between items-center z-50 shadow-2xl">
        <NavItem id="games" label="Games" icon={<Gamepad2 />} activeColor="#d946ef" activeTab={activeTab} setActiveTab={setActiveTab} triggerHaptic={triggerHaptic} />
        <NavItem id="hub" label="Hub" icon={<Sparkles />} activeColor="#06b6d4" activeTab={activeTab} setActiveTab={setActiveTab} triggerHaptic={triggerHaptic} />
        <NavItem id="intel" label="Intel" icon={<Flame />} activeColor="#f97316" activeTab={activeTab} setActiveTab={setActiveTab} triggerHaptic={triggerHaptic} />
        
        <button onClick={() => { setActiveTab('profile'); triggerHaptic(); }} className="w-[52px] h-[52px] flex items-center justify-center">
            <div className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all duration-500 ${activeTab === 'profile' ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'border-transparent opacity-40'}`}>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="avatar" className="w-full h-full object-cover" />
            </div>
        </button>
      </nav>
    </div>
  );
};

const NavItem = ({ id, label, icon, activeColor, activeTab, setActiveTab, triggerHaptic }) => {
  const isActive = activeTab === id;
  return (
    <button onClick={() => { setActiveTab(id); triggerHaptic(); }} className={`relative flex flex-col items-center justify-center w-[76px] h-[56px] rounded-[24px] transition-all duration-500 ${isActive ? 'bg-[#1a1a1c]' : ''}`}>
      <div style={{ color: isActive ? activeColor : '#4c4c50' }} className={`transition-all duration-500 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]' : ''}`}>
        {React.cloneElement(icon, { size: 22, strokeWidth: 2.5 })}
      </div>
      <span className={`text-[10px] font-black mt-1 tracking-tighter uppercase ${isActive ? 'text-white' : 'text-[#4c4c50]'}`}>{label}</span>
    </button>
  );
};

export default App;
