import React, { useState, useEffect } from 'react';
import { Store, Newspaper, Gift, Zap, ShieldCheck } from 'lucide-react';
import './index.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('market');
  const [isPro, setIsPro] = useState(false);
  const [userId, setUserId] = useState('000000');
  const [aiReport, setAiReport] = useState('');

  // --- ПОЛНАЯ ЛОГИКА (БЕЗ ОБРЕЗАНИЙ) ---
  useEffect(() => {
    try {
      if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
        tg.setHeaderColor('#000000');
        tg.setBackgroundColor('#000000');
        setUserId(tg.initDataUnsafe?.user?.id || '777888');
      }
    } catch (e) {}

    // Чекер PRO статуса из URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('status') === 'pro') setIsPro(true);
  }, []);

  const triggerHaptic = (style = 'light') => {
    try {
      window.Telegram?.WebApp?.HapticFeedback?.impactOccurred(style);
    } catch (e) {}
  };

  const handleAiScan = (e) => {
    if (e.key === 'Enter') {
      triggerHaptic('medium');
      setAiReport('📡 Analyzing market volatility...');
      setTimeout(() => {
        setAiReport(`✅ ${e.target.value}: ROI Potential +${(Math.random() * 12).toFixed(1)}% in 48h.`);
      }, 1000);
    }
  };

  const NavItem = ({ id, label, icon, activeColor, isAvatar }) => {
    const isActive = activeTab === id;
    if (isAvatar) {
      return (
        <button onClick={() => { setActiveTab('profile'); triggerHaptic(); }}
          className={`w-[44px] h-[44px] rounded-full overflow-hidden shrink-0 transition-all duration-300 ${activeTab === 'profile' ? 'ring-2 ring-white/30 scale-105' : 'opacity-80'}`}>
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100" alt="P" className="w-full h-full object-cover" />
        </button>
      );
    }
    return (
      <button onClick={() => { setActiveTab(id); triggerHaptic(); }}
        className={`relative flex flex-col items-center justify-center w-[72px] h-[52px] rounded-[22px] transition-all duration-300 ${isActive ? 'bg-black' : 'bg-transparent'}`}
        style={{ color: isActive ? activeColor : '#98989f' }}>
        <div className={`mb-0.5 ${isActive ? 'scale-110' : ''}`}>{React.cloneElement(icon, { size: 22 })}</div>
        <span className={`text-[11px] ${isActive ? 'font-bold' : 'font-medium'}`}>{label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex justify-center selection:bg-emerald-500/30">
      <div className="w-full max-w-[420px] flex flex-col relative min-h-screen border-x border-white/[0.02]">
        
        {/* HEADER */}
        <header className="px-6 pt-10 pb-6 flex justify-between items-center">
          <div>
            <p className="text-[10px] text-zinc-500 font-black tracking-[0.2em] uppercase">Prime Node</p>
            <h1 className="text-2xl font-black tracking-tighter">TERMINAL V5</h1>
          </div>
          <div className="bg-zinc-900/50 border border-white/5 px-3 py-1.5 rounded-full flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-black text-zinc-400">SYSTEM LIVE</span>
          </div>
        </header>

        {/* CONTENT AREA */}
        <main className="flex-1 px-6 overflow-y-auto pb-32">
          
          {/* MARKET & AI SCANNER */}
          {activeTab === 'market' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
              <div className="bg-zinc-900/30 border border-emerald-500/20 p-5 rounded-[32px] backdrop-blur-md">
                <div className="flex items-center gap-2 mb-3">
                    <Zap size={12} className="text-emerald-400" />
                    <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">Neural Analyzer Pro</p>
                </div>
                <input 
                  type="text" 
                  onKeyDown={handleAiScan}
                  disabled={!isPro}
                  placeholder={isPro ? "Enter skin name..." : "💎 PRO Access Required"} 
                  className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-700"
                />
                {aiReport && <div className="mt-3 text-[11px] text-zinc-400 font-mono animate-pulse">{aiReport}</div>}
              </div>

              <div className="space-y-3">
                <div className="bg-zinc-900/20 border border-white/5 p-4 rounded-2xl flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-red-500 font-black uppercase">Covert</span>
                        <span className="text-sm font-bold">M4A1-S | Printstream</span>
                    </div>
                    <span className="font-black text-emerald-400">$142.10</span>
                </div>
              </div>
            </div>
          )}

          {/* NEWS & SIGNALS */}
          {activeTab === 'news' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-4">
              <div className="bg-zinc-900/30 border border-white/5 p-6 rounded-[32px]">
                <div className="bg-blue-500/10 text-blue-400 w-fit px-2 py-0.5 rounded text-[9px] font-black mb-3">MARKET INSIDER</div>
                <h3 className="text-lg font-bold">Buff163 Update</h3>
                <p className="text-zinc-500 text-sm mt-1">Цены стабилизировались. Ожидаем рост в сегменте Covert скинов.</p>
              </div>
            </div>
          )}

          {/* EARN / REWARDS */}
          {activeTab === 'earn' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-4 text-center py-10">
                <Gift size={48} className="mx-auto text-zinc-800 mb-4" />
                <h2 className="text-xl font-black">REWARDS SYSTEM</h2>
                <p className="text-zinc-500 text-sm">Tasks are being updated. Check back in 24h.</p>
            </div>
          )}

          {/* PROFILE & REFERRAL */}
          {activeTab === 'profile' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
              <div className="text-center py-6">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="w-full h-full bg-zinc-900 rounded-full flex items-center justify-center text-3xl border border-white/10">👤</div>
                  {isPro && <div className="absolute -bottom-1 -right-1 bg-yellow-400 p-1 rounded-full text-black"><ShieldCheck size={14} strokeWidth={3} /></div>}
                </div>
                <h2 className="text-xl font-black">{isPro ? 'PRIME PRO' : 'FREE MEMBER'}</h2>
                <p className="text-[10px] text-zinc-600 font-mono mt-1 uppercase tracking-widest">Node-ID: {userId}</p>
              </div>

              <div className="bg-zinc-900/30 border border-white/5 p-5 rounded-[32px]">
                <p className="text-[10px] text-zinc-500 font-black uppercase mb-3 text-center tracking-widest">Invite link</p>
                <div className="bg-black/50 p-4 rounded-xl text-[10px] font-mono text-emerald-500 border border-emerald-500/10 text-center break-all">
                  t.me/cs_pro_bot?start={userId}
                </div>
              </div>
            </div>
          )}

        </main>

        {/* BOTTOM NAV BAR */}
        <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50 px-4">
          <nav className="w-full max-w-[380px] bg-[#18181a]/90 backdrop-blur-2xl rounded-[36px] p-2 flex justify-between items-center border border-white/[0.05] shadow-2xl">
            <NavItem id="market" label="Market" icon={<Store />} activeColor="#ffffff" />
            <NavItem id="news" label="News" icon={<Newspaper />} activeColor="#ffffff" />
            <NavItem id="earn" label="Earn" icon={<Gift />} activeColor="#10b981" />
            <NavItem id="profile" isAvatar={true} />
          </nav>
        </div>

      </div>
    </div>
  );
};

export default App;
