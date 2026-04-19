import React, { useState } from 'react';
import { Sparkles, Zap, Target, X } from 'lucide-react';

const Hub = () => {
  const [hubSection, setHubSection] = useState('signals');
  const [aiResponse, setAiResponse] = useState(null);

  const askAI = (type) => {
    const responses = {
      'Green Set': "Emerald Web + Gamma Doppler Phase 2 + Hedge Maze. Price: $4,200. Status: Trending.",
      'Red-Black': "Crimson Web + Slaughter + Tiger Tooth accents. Aggressive style. Status: Stable.",
      'Budget Loadout': "Slate AK + Safari Mesh AWP + Glock High Beam. Under $15. Status: Popular.",
      'Pro Meta': "G2 NiKo's current set: Deagle Blaze + AK-47 Wild Lotus. Status: High Tier."
    };
    setAiResponse({ title: type, text: responses[type] });
  };

  return (
    <div className="px-6 pt-4 animate-in fade-in duration-500">
      <div className="flex gap-8 mb-8 items-center">
        <button onClick={() => setHubSection('signals')} className={`text-3xl font-black tracking-tighter transition-all ${hubSection === 'signals' ? 'text-white' : 'text-zinc-800 scale-95'}`}>Signals</button>
        <button onClick={() => setHubSection('guide')} className={`text-3xl font-black tracking-tighter transition-all ${hubSection === 'guide' ? 'text-white' : 'text-zinc-800 scale-95'}`}>Guide</button>
      </div>

      {hubSection === 'signals' ? (
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-4 italic">Live Analysis Results</h3>
          {[
            { name: 'AK-47 Slate', price: '$8.20', acc: '94%', res: '+14% Profit', color: 'text-green-500' },
            { name: 'AWP Mortis', price: '$12.50', acc: '82%', res: '+5% Profit', color: 'text-green-400' },
          ].map((s, i) => (
            <div key={i} className="bg-[#111112] border border-white/5 rounded-[28px] p-5 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-black border border-white/5 flex items-center justify-center"><Zap size={18} className="text-yellow-500" /></div>
                <div><h4 className="font-bold text-sm">{s.name}</h4><p className="text-[10px] text-zinc-600 font-bold tracking-widest uppercase">{s.acc} ACC</p></div>
              </div>
              <div className={`text-[10px] font-black uppercase px-3 py-1 bg-black/50 rounded-full border border-white/5 ${s.color}`}>{s.res}</div>
            </div>
          ))}

          <div className="mt-8 p-6 rounded-[32px] bg-gradient-to-br from-[#0d0d0f] to-black border border-white/10 relative overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 mb-4 text-cyan-400">
              <Sparkles size={16} /><span className="text-[10px] font-black uppercase tracking-widest italic">AI Assistant</span>
            </div>
            <p className="text-sm font-bold text-zinc-300 mb-6 italic">"Чему ты хочешь научиться сегодня, боец?"</p>
            <div className="grid grid-cols-2 gap-3">
              {['Green Set', 'Red-Black', 'Budget Loadout', 'Pro Meta'].map(btn => (
                <button key={btn} onClick={() => askAI(btn)} className="py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest active:bg-cyan-500/20 transition-all">{btn}</button>
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

      {aiResponse && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-6">
          <div onClick={() => setAiResponse(null)} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          <div className="relative w-full bg-[#111112] border border-white/10 rounded-[32px] p-8 animate-in zoom-in-95 shadow-2xl">
            <div className="flex justify-between mb-4 text-cyan-400 font-black uppercase text-xs"><span>{aiResponse.title}</span><button onClick={() => setAiResponse(null)}><X size={20} /></button></div>
            <p className="text-white font-bold italic leading-relaxed">{aiResponse.text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hub;
