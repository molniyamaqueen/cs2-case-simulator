import React, { useState, useEffect } from 'react';
import { Store, Newspaper, Gift, Zap, Twitter, ShieldCheck, TrendingUp, Search } from 'lucide-react';
import './index.css';

const App = () => {
  // --- ПОЛНЫЙ СТЕЙТ ---
  const [activeTab, setActiveTab] = useState('market');
  const [isPro, setIsPro] = useState(false);
  const [userId, setUserId] = useState('000000');
  const [aiReport, setAiReport] = useState('');
  const [news, setNews] = useState([]);
  const [signals, setSignals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // --- ИНИЦИАЛИЗАЦИЯ TG И ПРОВЕРКИ ---
  useEffect(() => {
    try {
      if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
        tg.setHeaderColor('#000000');
        tg.setBackgroundColor('#000000');
        
        const user = tg.initDataUnsafe?.user;
        if (user) setUserId(user.id.toString());
      }
    } catch (e) { console.error("TG Init Error", e); }

    // Чекер статуса из URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('status') === 'pro') setIsPro(true);

    // Авто-сбор новостей и сигналов (Твое ТЗ по автоматике)
    const fetchAutoData = () => {
      const mockNews = [
        { id: 1, source: 'Twitter / X', text: 'Valve обновили файлы CS2. Ожидаем новый кейс.', time: '2m ago' },
        { id: 2, source: 'HLTV.org', text: 'S1mple подтвердил участие в следующем турнире.', time: '15m ago' },
        { id: 3, source: 'Official', text: 'Обновление античита: забанено 20к аккаунтов.', time: '1h ago' }
      ];
      const mockSignals = [
        { item: 'AK-47 | Slate (FT)', change: '+12.4%', status: 'up' },
        { item: 'M4A1-S | Printstream (MW)', change: '-2.1%', status: 'down' },
        { item: 'Glove Case', change: '+5.8%', status: 'up' }
      ];
      setNews(mockNews);
      setSignals(mockSignals);
    };

    fetchAutoData();
    const interval = setInterval(fetchAutoData, 60000); // Обновление раз в минуту
    return () => clearInterval(interval);
  }, []);

  // --- ХЭПТИК И ЛОГИКА AI ---
  const triggerHaptic = (style = 'light') => {
    try {
      window.Telegram?.WebApp?.HapticFeedback?.impactOccurred(style);
    } catch (e) {}
  };

  const handleAiScan = (e) => {
    if (e.key === 'Enter') {
      if (!isPro) {
        triggerHaptic('error');
        return;
      }
      triggerHaptic('medium');
      setAiReport('📡 Scanning neural market paths...');
      setTimeout(() => {
        setAiReport(`✅ ${e.target.value}: ROI +${(Math.random() * 15).toFixed(1)}% prediction for 72h.`);
      }, 1500);
    }
  };

  // --- КОМПОНЕНТ НАВИГАЦИИ ---
  const NavItem = ({ id, label, icon, activeColor = '#ffffff' }) => {
    const isActive = activeTab === id;
    return (
      <button 
        onClick={() => { setActiveTab(id); triggerHaptic(); }}
        className={`flex flex-col items-center justify-center w-[72px] h-[54px] rounded-[24px] transition-all duration-300 ${isActive ? 'bg-[#2c2c2e]' : 'bg-transparent'}`}
        style={{ color: isActive ? activeColor : '#8e8e93' }}
      >
        <div className={isActive ? 'scale-110' : 'scale-100'}>
          {React.cloneElement(icon, { size: 22, strokeWidth: isActive ? 2.5 : 2 })}
        </div>
        <span className="text-[10px] mt-1 font-bold tracking-tight">{label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex justify-center selection:bg-emerald-500/30">
      <div className="w-full max-w-[430px] flex flex-col relative h-screen overflow-hidden border-x border-white/[0.02]">
        
        {/* HEADER */}
        <header className="px-6 pt-12 pb-4 flex justify-between items-end shrink-0">
          <div>
            <p className="text-[10px] text-zinc-600 font-black tracking-[0.2em] uppercase mb-1">Prime Node</p>
            <h1 className="text-3xl font-black tracking-tighter">TERMINAL V5</h1>
          </div>
          <div className="flex items-center gap-2 bg-[#1c1c1e] px-3 py-1.5 rounded-full border border-white/5 mb-1 pulse-emerald">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Live</span>
          </div>
        </header>

        {/* SCROLLABLE MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto px-6 pb-32 pt-2 space-y-6 no-scrollbar">
          
          {/* SCREEN: MARKET */}
          {activeTab === 'market' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              {/* AI ANALYZER BOX */}
              <div className="glass-card rounded-[32px] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Zap size={14} className="text-[#00ffcc] fill-[#00ffcc]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#00ffcc]">AI Neural Analyzer</span>
                </div>
                <div className="relative">
                  <input 
                    type="text"
                    onKeyDown={handleAiScan}
                    disabled={!isPro}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isPro ? "Analyze skin..." : "💎 PRO ACCESS REQUIRED"}
                    className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-700"
                  />
                  <Search className="absolute right-4 top-4 text-zinc-700" size={18} />
                </div>
                {aiReport && (
                  <div className="mt-4 p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <p className="text-[11px] font-mono text-emerald-400 animate-pulse">{aiReport}</p>
                  </div>
                )}
              </div>

              {/* SIGNALS LIST */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 px-2">
                  <TrendingUp size={14} className="text-zinc-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Market Signals</span>
                </div>
                {signals.map((s, i) => (
                  <div key={i} className="glass-card p-4 rounded-2xl flex justify-between items-center transition-transform active:scale-95">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-zinc-200">{s.item}</span>
                      <span className="text-[9px] text-zinc-600 uppercase font-black tracking-tighter">Market Volatility</span>
                    </div>
                    <div className={`text-sm font-black ${s.status === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {s.status === 'up' ? '▲' : '▼'} {s.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCREEN: NEWS (AUTOMATIC) */}
          {activeTab === 'news' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">Live Insider Feed</h2>
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] font-black text-blue-500 uppercase">Auto-Sync</span>
                  <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-pulse" />
                </div>
              </div>
              
              {news.map(n => (
                <div key={n.id} className="glass-card p-5 rounded-[28px] border-l-2 border-l-blue-500 active:bg-zinc-900/40 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black text-blue-400 flex items-center gap-1 uppercase tracking-tighter">
                      <Twitter size={10} /> {n.source}
                    </span>
                    <span className="text-[9px] text-zinc-600 font-bold uppercase">{n.time}</span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-zinc-300">{n.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* SCREEN: PROFILE & EARN */}
          {activeTab === 'earn' || activeTab === 'profile' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <div className="text-center py-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="w-full h-full bg-[#1c1c1e] rounded-full flex items-center justify-center text-4xl border border-white/5 glass-card">
                    👤
                  </div>
                  {isPro && (
                    <div className="absolute -bottom-1 -right-1 bg-yellow-400 p-1.5 rounded-full text-black shadow-lg">
                      <ShieldCheck size={18} strokeWidth={3} />
                    </div>
                  )}
                </div>
                <h2 className={`text-2xl font-black tracking-tighter ${isPro ? 'text-yellow-400' : 'text-white'}`}>
                  {isPro ? 'PRIME PRO' : 'FREE MEMBER'}
                </h2>
                <p className="text-[10px] text-zinc-600 font-mono mt-1 uppercase tracking-[0.2em]">NODE-ID: {userId}</p>
              </div>

              <div className="glass-card p-6 rounded-[32px] text-center space-y-4">
                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Referral System</p>
                <div className="bg-black/50 p-4 rounded-2xl text-[11px] font-mono text-emerald-500 border border-emerald-500/10 break-all select-all">
                  t.me/cs_pro_bot?start={userId}
                </div>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`https://t.me/cs_pro_bot?start=${userId}`);
                    triggerHaptic('success');
                  }}
                  className="w-full bg-white text-black font-black py-4 rounded-2xl text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                >
                  Invite Friends
                </button>
              </div>
            </div>
          ) : null}

        </main>

        {/* NAVIGATION BAR (Твой Топовый Дизайн) */}
        <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50 px-4 shrink-0">
          <nav className="w-full max-w-[380px] bg-[#1c1c1e]/85 backdrop-blur-3xl rounded-[36px] p-2 flex justify-between items-center border border-white/[0.05] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <NavItem id="market" label="Market" icon={<Store />} />
            <NavItem id="news" label="News" icon={<Newspaper />} />
            <NavItem id="earn" label="Earn" icon={<Gift />} />
            <button 
              onClick={() => { setActiveTab('profile'); triggerHaptic(); }}
              className={`w-[46px] h-[46px] rounded-full overflow-hidden shrink-0 transition-all duration-300 ring-offset-2 ring-offset-black ${
                activeTab === 'profile' ? 'ring-2 ring-white scale-110 shadow-lg' : 'ring-1 ring-white/10 opacity-70'
              }`}
            >
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100" 
                className="w-full h-full object-cover" 
                alt="Avatar"
              />
            </button>
          </nav>
        </div>

      </div>
    </div>
  );
};

export default App;
