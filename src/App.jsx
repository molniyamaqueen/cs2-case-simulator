import React, { useState, useEffect } from 'react';
import { Gamepad2, Sparkles, Flame, Clock, Menu, Wallet, MessageCircle, Zap, Target, TrendingUp, X } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('hub');
  const [hubSection, setHubSection] = useState('signals');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [news, setNews] = useState([]);

  const triggerHaptic = (style = 'medium') => {
    try { window.Telegram?.WebApp?.HapticFeedback?.impactOccurred(style); } catch (e) {}
  };

  // Имитация AI логики
  const askAI = (type) => {
    triggerHaptic('heavy');
    const responses = {
      'Green Set': "Emerald Web + Gamma Doppler Phase 2 + Hedge Maze. Estimated price: $4,200.",
      'Red-Black': "Crimson Web + Slaughter + Tiger Tooth accents. Pure aggressive style.",
      'Budget Loadout': "Slate AK + Safari Mesh AWP (High Float) + Glock High Beam. Under $15.",
      'Pro Meta': "G2 NiKo's current set: Deagle Blaze + AK-47 Wild Lotus."
    };
    setAiResponse({ title: type, text: responses[type] });
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden font-sans select-none">
      
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 pt-6 pb-2 z-40">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsMenuOpen(true)} className="w-10 h-10 bg-[#111112] border border-white/5 rounded-xl flex items-center justify-center active:scale-90 transition-all">
            <Menu size={20} className="text-zinc-500" />
          </button>
          <button className="w-10 h-10 bg-[#111112] border border-white/5 rounded-xl flex items-center justify-center">
            <MessageCircle size={20} className="text-zinc-500" />
          </button>
        </div>
        <div className="bg-[#111112] border border-white/5 px-4 py-2 rounded-2xl flex items-center gap-2">
          <Wallet size={16} className="text-blue-400" />
          <span className="text-sm font-black italic">0 TON</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-32 px-6 pt-4">
        {activeTab === 'hub' && (
          <div className="animate-in fade-in duration-500">
            {/* SWITCHER */}
            <div className="flex gap-8 mb-8 items-center">
              <button onClick={() => setHubSection('signals')} className={`text-3xl font-black tracking-tighter transition-all ${hubSection === 'signals' ? 'text-white' : 'text-zinc-800 scale-90'}`}>Signals</button>
              <button onClick={() => setHubSection('guide')} className={`text-3xl font-black tracking-tighter transition-all ${hubSection === 'guide' ? 'text-white' : 'text-zinc-800 scale-90'}`}>Guide</button>
            </div>

            {hubSection === 'signals' ? (
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-4 italic">Live Analysis Results</h3>
                
                {/* АВТОМАТИЧЕСКИЕ СИГНАЛЫ С РЕЗУЛЬТАТАМИ */}
                {[
                  { name: 'AK-47 Slate', price: '$8.20', acc: '94%', res: '+14% Profit', color: 'text-green-500' },
                  { name: 'AWP Mortis', price: '$12.50', acc: '82%', res: '+5% Profit', color: 'text-green-400' },
                  { name: 'USP-S Printstream', price: '$140.0', acc: '91%', res: 'Monitoring', color: 'text-blue-400' }
                ].map((s, i) => (
                  <div key={i} className="bg-[#111112] border border-white/5 rounded-[28px] p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-black border border-white/5 flex items-center justify-center">
                        <Zap size={18} className="text-yellow-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{s.name}</h4>
                        <p className="text-[10px] text-zinc-600 font-bold uppercase">Accuracy: {s.acc}</p>
                      </div>
                    </div>
                    <div className={`text-[10px] font-black uppercase px-3 py-1 bg-black rounded-full border border-white/5 ${s.color}`}>
                      {s.res}
                    </div>
                  </div>
                ))}

                {/* AI ПОМОЩНИК (КЛИКАБЕЛЬНЫЙ) */}
                <div className="mt-8 p-6 rounded-[32px] bg-gradient-to-br from-[#0d0d0f] to-black border border-white/10 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 blur-[50px]" />
                  <div className="flex items-center gap-2 mb-4 text-cyan-400">
                    <Sparkles size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest italic">AI Skin Agent</span>
                  </div>
                  <p className="text-sm font-bold text-zinc-300 mb-6 italic leading-relaxed">"Чему ты хочешь научиться сегодня, боец?"</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {['Green Set', 'Red-Black', 'Budget Loadout', 'Pro Meta'].map(btn => (
                      <button 
                        key={btn} 
                        onClick={() => askAI(btn)}
                        className="py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest active:bg-cyan-500/20 active:border-cyan-500/30 transition-all hover:border-white/20"
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-right-4">
                {['Aim', 'Picks', 'Nades', 'Economy'].map(g => (
                  <div key={g} className="h-36 bg-[#111112] border border-white/5 rounded-[32px] flex flex-col items-center justify-center gap-3 active:scale-95 transition-all">
                    <Target size={24} className="text-zinc-700" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">{g}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* AI RESPONSE MODAL */}
      {aiResponse && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-6">
          <div onClick={() => setAiResponse(null)} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          <div className="relative w-full bg-[#111112] border border-white/10 rounded-[32px] p-8 animate-in zoom-in-95 duration-300 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-cyan-400 font-black uppercase text-xs tracking-widest italic">{aiResponse.title}</h4>
              <button onClick={() => setAiResponse(null)}><X size={20} /></button>
            </div>
            <p className="text-white font-bold leading-relaxed">{aiResponse.text}</p>
          </div>
        </div>
      )}

      {/* NAVIGATION (Major+) */}
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

      {/* MENU MODAL */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] animate-in fade-in duration-300">
          <div onClick={() => setIsMenuOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <div className="absolute bottom-0 w-full bg-[#111112] rounded-t-[40px] p-10 border-t border-white/10 animate-in slide-in-from-bottom-full duration-500">
            <h3 className="text-3xl font-black mb-8 italic">Menu</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between p-5 bg-white/5 rounded-2xl items-center"><span className="font-bold">Language</span><span className="text-blue-400 font-black">EN</span></div>
              <div className="flex justify-between p-5 bg-white/5 rounded-2xl items-center"><span className="font-bold">Streamer Mode</span><div className="w-10 h-5 bg-zinc-800 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"/></div></div>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="w-full py-5 bg-white text-black rounded-3xl font-black uppercase tracking-widest">Close App</button>
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
