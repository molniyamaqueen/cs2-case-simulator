import React, { useState, useEffect } from 'react';
import { Gamepad2, Sparkles, Flame, Clock, Menu, Wallet, MessageCircle, TrendingUp, Target, ShieldCheck, Zap } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('hub');
  const [hubSection, setHubSection] = useState('signals'); // 'signals' или 'guide'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const triggerHaptic = (style = 'medium') => {
    try { window.Telegram?.WebApp?.HapticFeedback?.impactOccurred(style); } catch (e) {}
  };

  useEffect(() => {
    // Автоматика новостей (как в прошлый раз)
    const fetchNews = async () => {
      try {
        const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://store.steampowered.com/feeds/news/app/730/');
        const data = await res.json();
        setNews(data.items.slice(0, 5));
        setLoading(false);
      } catch (e) { setLoading(false); }
    };
    fetchNews();
  }, []);

  // --- КОМПОНЕНТ КАРТОЧКИ СИГНАЛА ---
  const SignalCard = ({ name, price, change, trend }) => (
    <div className="bg-[#111112] border border-white/5 rounded-[24px] p-5 mb-4 flex items-center justify-between active:scale-[0.97] transition-all">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-black rounded-2xl border border-white/5 flex items-center justify-center">
          <Zap size={20} className={trend === 'up' ? 'text-yellow-400' : 'text-blue-400'} />
        </div>
        <div>
          <h4 className="font-bold text-sm">{name}</h4>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{price} • {trend === 'up' ? 'Rising' : 'Stable'}</p>
        </div>
      </div>
      <div className={`text-xs font-black ${trend === 'up' ? 'text-green-500' : 'text-zinc-400'}`}>
        {change}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden font-sans select-none">
      
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 pt-6 pb-2 z-40">
        <div className="flex items-center gap-3">
          <button onClick={() => { setIsMenuOpen(true); triggerHaptic('light'); }} className="w-10 h-10 bg-[#111112] border border-white/5 rounded-xl flex items-center justify-center active:scale-90 transition-all">
            <Menu size={20} className="text-gray-400" />
          </button>
          <button className="w-10 h-10 bg-[#111112] border border-white/5 rounded-xl flex items-center justify-center">
            <MessageCircle size={20} className="text-gray-400" />
          </button>
        </div>
        <div className="bg-[#111112] border border-white/5 px-4 py-2 rounded-2xl flex items-center gap-2">
          <Wallet size={16} className="text-blue-400" />
          <span className="text-sm font-black">0 TON</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-32 px-6 pt-4">
        
        {/* HUB SECTION */}
        {activeTab === 'hub' && (
          <div className="animate-in fade-in duration-500">
            {/* SWITCHER */}
            <div className="flex gap-8 mb-8 items-center">
              <button 
                onClick={() => { setHubSection('signals'); triggerHaptic('light'); }}
                className={`text-3xl font-black tracking-tighter transition-all ${hubSection === 'signals' ? 'text-white' : 'text-zinc-800 scale-90'}`}
              >
                Signals & AI
              </button>
              <button 
                onClick={() => { setHubSection('guide'); triggerHaptic('light'); }}
                className={`text-3xl font-black tracking-tighter transition-all ${hubSection === 'guide' ? 'text-white' : 'text-zinc-800 scale-90'}`}
              >
                Guide
              </button>
            </div>

            {hubSection === 'signals' ? (
              <div className="animate-in slide-in-from-left-4 duration-300">
                <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-4">Weapon Trends</h3>
                <SignalCard name="AK-47 | Ice Coald" price="$14.20" change="+12.4%" trend="up" />
                <SignalCard name="M4A1-S | Printstream" price="$320.00" change="+2.1%" trend="up" />
                <SignalCard name="AWP | Chromatic" price="$65.50" change="Stable" trend="stable" />

                <div className="mt-8 p-6 rounded-[32px] bg-gradient-to-br from-[#0d0d0f] to-black border border-white/5">
                   <div className="flex items-center gap-2 mb-4 text-cyan-400">
                      <Sparkles size={18} />
                      <span className="text-[10px] font-black uppercase tracking-widest">AI Skin Assistant</span>
                   </div>
                   <p className="text-sm text-zinc-400 mb-6">"Чему ты хочешь научиться сегодня, боец?"</p>
                   <div className="grid grid-cols-2 gap-3">
                      {['Green Set', 'Red-Black', 'Budget Loadout', 'Pro Meta'].map(btn => (
                        <button key={btn} className="py-3 px-2 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-tight active:bg-white/10 transition-all">
                          {btn}
                        </button>
                      ))}
                   </div>
                </div>
              </div>
            ) : (
              <div className="animate-in slide-in-from-right-4 duration-300 grid grid-cols-2 gap-4">
                 {['Aim', 'Picks', 'Nades', 'Economy'].map((item) => (
                   <div key={item} className="h-32 bg-[#111112] border border-white/5 rounded-[28px] flex flex-col items-center justify-center gap-2 active:scale-95 transition-all">
                      <Target size={24} className="text-zinc-600" />
                      <span className="text-[11px] font-black uppercase tracking-widest">{item}</span>
                   </div>
                 ))}
              </div>
            )}
          </div>
        )}

        {/* INTEL (НОВОСТИ) */}
        {activeTab === 'intel' && (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-4xl font-black tracking-tighter mb-1 italic">INTEL</h1>
              <p className="text-[10px] font-black text-zinc-600 mb-8 uppercase tracking-[0.4em]">Live Feed Analysis</p>
              {news.map((item, i) => (
                <div key={i} className="relative w-full h-48 rounded-[32px] overflow-hidden mb-6 border border-white/5 group">
                  <img src={item.enclosure?.link || `https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&sig=${i}`} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Official News</div>
                    <h3 className="text-lg font-bold leading-tight line-clamp-2">{item.title}</h3>
                  </div>
                </div>
              ))}
           </div>
        )}

        {/* PROFILE */}
        {activeTab === 'profile' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-8 rounded-[40px] bg-gradient-to-b from-[#1a1a1c] to-black border border-white/5 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
              <div className="w-20 h-20 rounded-3xl mx-auto mb-4 overflow-hidden border-2 border-white/10 relative z-10">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" alt="av" />
              </div>
              <h2 className="text-2xl font-black relative z-10">@ebaldremal1448</h2>
              <div className="flex gap-4 mt-6 relative z-10">
                <div className="flex-1 bg-black/40 p-4 rounded-2xl border border-white/5">
                  <p className="text-xl font-black">0</p>
                  <p className="text-[9px] text-zinc-500 font-bold uppercase">Games</p>
                </div>
                <div className="flex-1 bg-black/40 p-4 rounded-2xl border border-white/5">
                  <p className="text-xl font-black">0 TON</p>
                  <p className="text-[9px] text-zinc-500 font-bold uppercase">Best Win</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 py-5 bg-[#d946ef] rounded-[24px] font-black text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(217,70,239,0.3)] active:scale-95 transition-all">Invite Friends +</button>
          </div>
        )}
      </main>

      {/* NAVIGATION */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#0d0d0f]/95 backdrop-blur-2xl border border-white/5 rounded-[32px] p-2 flex justify-between items-center z-50">
        <NavItem id="games" label="Games" icon={<Gamepad2 />} activeColor="#d946ef" activeTab={activeTab} setActiveTab={setActiveTab} triggerHaptic={triggerHaptic} />
        <NavItem id="hub" label="Hub" icon={<Sparkles />} activeColor="#06b6d4" activeTab={activeTab} setActiveTab={setActiveTab} triggerHaptic={triggerHaptic} />
        <NavItem id="intel" label="Intel" icon={<Flame />} activeColor="#f97316" activeTab={activeTab} setActiveTab={setActiveTab} triggerHaptic={triggerHaptic} />
        <button onClick={() => { setActiveTab('profile'); triggerHaptic(); }} className={`w-[76px] h-[56px] flex items-center justify-center rounded-[24px] transition-all ${activeTab === 'profile' ? 'bg-[#1a1a1c]' : ''}`}>
          <div className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${activeTab === 'profile' ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'border-transparent opacity-40'}`}>
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="av" className="w-full h-full object-cover" />
          </div>
        </button>
      </nav>

      {/* MENU MODAL (Тут будет твоя шторка) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] animate-in fade-in duration-300">
          <div onClick={() => setIsMenuOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <div className="absolute bottom-0 w-full bg-[#111112] rounded-t-[40px] p-8 border-t border-white/10 animate-in slide-in-from-bottom-full duration-500">
            <h3 className="text-3xl font-black mb-8 italic">Menu</h3>
            <div className="space-y-4">
              <div className="flex justify-between p-5 bg-white/5 rounded-2xl items-center"><span className="font-bold">Language</span><span className="text-blue-400 font-black">EN</span></div>
              <div className="flex justify-between p-5 bg-white/5 rounded-2xl items-center"><span className="font-bold">Streamer Mode</span><div className="w-10 h-5 bg-zinc-800 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"/></div></div>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="w-full mt-8 py-5 bg-white text-black rounded-3xl font-black uppercase tracking-widest">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const NavItem = ({ id, label, icon, activeColor, activeTab, setActiveTab, triggerHaptic }) => {
  const isActive = activeTab === id;
  return (
    <button onClick={() => { setActiveTab(id); triggerHaptic(); }} className={`relative flex flex-col items-center justify-center w-[76px] h-[56px] rounded-[24px] transition-all duration-500 ${isActive ? 'bg-[#1a1a1c]' : ''}`}>
      <div style={{ color: isActive ? activeColor : '#4c4c50' }}>{React.cloneElement(icon, { size: 22, strokeWidth: 2.5 })}</div>
      <span className={`text-[9px] font-black mt-1 uppercase ${isActive ? 'text-white' : 'text-[#4c4c50]'}`}>{label}</span>
    </button>
  );
};

export default App;
