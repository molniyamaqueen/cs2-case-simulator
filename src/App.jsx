import React, { useState, useEffect } from 'react';
import { Gamepad2, Sparkles, Flame, Clock, Menu, Wallet, Info, MessageCircle, ChevronRight } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('hub');
  const [news, setNews] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // ХАПТИК (Вибрация)
  const triggerHaptic = (style = 'medium') => {
    try { window.Telegram?.WebApp?.HapticFeedback?.impactOccurred(style); } catch (e) {}
  };

  // АВТОМАТИКА НОВОСТЕЙ
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://store.steampowered.com/feeds/news/app/730/');
        const data = await response.json();
        const formatted = data.items.map((item, index) => ({
          id: index,
          tag: "OFFICIAL",
          title: item.title,
          img: item.enclosure?.link || `https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&sig=${index}`,
          time: new Date(item.pubDate).toLocaleDateString()
        }));
        setNews(formatted);
        setLoading(false);
      } catch (e) { setLoading(false); }
    };
    fetchNews();
    
    // WebApp Settings
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.setHeaderColor('#000000');
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden font-sans select-none">
      
      {/* ВЕРХНЯЯ ПАНЕЛЬ (ПО СКРИНУ 3 И ТЗ) */}
      <header className="flex items-center justify-between px-6 pt-6 pb-2 z-40">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => { setIsMenuOpen(true); triggerHaptic('light'); }}
            className="w-10 h-10 bg-[#111112] border border-white/5 rounded-xl flex items-center justify-center active:scale-90 transition-all"
          >
            <Menu size={20} className="text-gray-400" />
          </button>
          <button className="w-10 h-10 bg-[#111112] border border-white/5 rounded-xl flex items-center justify-center">
            <MessageCircle size={20} className="text-gray-400" />
          </button>
        </div>
        
        <div className="bg-[#111112] border border-white/5 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-xl">
          <Wallet size={16} className="text-blue-400" />
          <span className="text-sm font-black tracking-tight">0 TON</span>
        </div>
      </header>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <main className="flex-1 overflow-y-auto pb-32 px-6 pt-4">
        
        {/* TAB: INTEL (НОВОСТИ) */}
        {activeTab === 'intel' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-black tracking-tighter mb-1 italic italic">INTEL</h1>
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-8">System Signals & Global Feed</p>
            
            {loading ? (
              <div className="flex justify-center pt-20 animate-pulse text-zinc-700 font-bold uppercase text-[10px]">Synchronizing...</div>
            ) : (
              news.map((item) => (
                <div key={item.id} className="relative w-full h-48 rounded-[32px] overflow-hidden mb-6 border border-white/5 active:scale-95 transition-all duration-500 group">
                  <img src={item.img} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000" alt="bg" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center text-[9px] font-black uppercase tracking-widest mb-2 text-blue-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse" />
                      {item.tag}
                    </div>
                    <h3 className="text-lg font-bold leading-tight mb-2 line-clamp-2">{item.title}</h3>
                    <div className="flex items-center text-zinc-500 text-[9px] font-bold uppercase"><Clock size={12} className="mr-1" /> {item.time}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB: HUB (ПО ТЗ) */}
        {activeTab === 'hub' && (
          <div className="animate-in fade-in duration-500 pt-4">
            <div className="flex gap-6 mb-8 items-baseline">
              <h1 className="text-3xl font-black tracking-tight text-white">Signals & AI</h1>
              <h1 className="text-2xl font-black tracking-tight text-zinc-700">Guide</h1>
            </div>
            <div className="w-full p-8 rounded-[32px] bg-[#111112] border border-white/5 text-center">
               <Sparkles size={40} className="mx-auto mb-4 text-cyan-400 opacity-20" />
               <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em]">AI Agent is analyzing skins...</p>
            </div>
          </div>
        )}

        {/* TAB: PROFILE (СКРИН 2) */}
        {activeTab === 'profile' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pt-2">
            <div className="relative w-full p-8 rounded-[38px] bg-gradient-to-br from-[#1a1a1c] to-black border border-white/5 text-center overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
               <div className="relative z-10">
                  <div className="w-20 h-20 rounded-3xl mx-auto mb-4 overflow-hidden border-2 border-white/10 shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" alt="avatar" />
                  </div>
                  <h2 className="text-2xl font-black mb-6 tracking-tight">@ebaldremal1448</h2>
                  <div className="flex justify-around bg-black/40 backdrop-blur-xl rounded-2xl py-4 border border-white/5">
                    <div><p className="text-xl font-black">0</p><p className="text-[9px] text-zinc-500 font-bold uppercase">Games</p></div>
                    <div className="w-[1px] bg-white/5" />
                    <div><p className="text-xl font-black">0 TON</p><p className="text-[9px] text-zinc-500 font-bold uppercase">Best Win</p></div>
                  </div>
               </div>
            </div>
            <button className="w-full mt-6 py-5 bg-[#d946ef] rounded-[24px] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all shadow-[0_10px_30px_rgba(217,70,239,0.3)]">
              Invite Friends +
            </button>
          </div>
        )}
      </main>

      {/* ВЫЕЗЖАЮЩАЯ ШТОРКА МЕНЮ (СКРИН 3) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] animate-in fade-in duration-300">
          <div onClick={() => setIsMenuOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <div className="absolute bottom-0 w-full bg-[#111112] rounded-t-[40px] p-8 border-t border-white/10 animate-in slide-in-from-bottom-full duration-500">
            <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mb-8" />
            <h3 className="text-3xl font-black mb-8">Menu</h3>
            <div className="space-y-6">
               <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                 <div className="flex items-center gap-3"><Info size={20} className="text-zinc-500"/><span className="font-bold">Language</span></div>
                 <span className="text-blue-400 font-black">EN</span>
               </div>
               <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                 <div className="flex items-center gap-3"><Sparkles size={20} className="text-zinc-500"/><span className="font-bold">Streamer Mode</span></div>
                 <div className="w-12 h-6 bg-zinc-800 rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"/></div>
               </div>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="w-full mt-10 py-5 bg-white text-black rounded-[24px] font-black uppercase tracking-widest">Close</button>
          </div>
        </div>
      )}

      {/* НАВИГАЦИЯ (image_1.png) */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#0d0d0f]/95 backdrop-blur-2xl border border-white/5 rounded-[32px] p-2 flex justify-between items-center z-50 shadow-2xl">
        <NavItem id="games" label="Games" icon={<Gamepad2 />} activeColor="#d946ef" activeTab={activeTab} setActiveTab={setActiveTab} triggerHaptic={triggerHaptic} />
        <NavItem id="hub" label="Hub" icon={<Sparkles />} activeColor="#06b6d4" activeTab={activeTab} setActiveTab={setActiveTab} triggerHaptic={triggerHaptic} />
        <NavItem id="intel" label="Intel" icon={<Flame />} activeColor="#f97316" activeTab={activeTab} setActiveTab={setActiveTab} triggerHaptic={triggerHaptic} />
        <button onClick={() => { setActiveTab('profile'); triggerHaptic(); }} className={`w-[76px] h-[56px] flex items-center justify-center rounded-[24px] transition-all ${activeTab === 'profile' ? 'bg-[#1a1a1c]' : ''}`}>
            <div className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${activeTab === 'profile' ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'border-transparent opacity-40'}`}>
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
      <div style={{ color: isActive ? activeColor : '#4c4c50' }} className={`transition-all duration-500 ${isActive ? 'scale-110' : ''}`}>
        {React.cloneElement(icon, { size: 22, strokeWidth: 2.5 })}
      </div>
      <span className={`text-[9px] font-black mt-1 tracking-tighter uppercase ${isActive ? 'text-white opacity-100' : 'text-[#4c4c50] opacity-60'}`}>{label}</span>
    </button>
  );
};

export default App;
