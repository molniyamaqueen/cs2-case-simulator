import React, { useState } from 'react';
import { Sparkles, Zap, Search, X, BookOpen, PlayCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Hub = () => {
  const { t } = useLanguage();
  const [hubSection, setHubSection] = useState('signals');
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [guideModal, setGuideModal] = useState(null);

  const guideData = {
    'Aim': { title: "Aim Mastery", text: "Always keep your crosshair at head level.", videoLink: "https://t.me/TvoyBot?start=video_aim" },
    'Nades': { title: "Better Раскидка", text: "Learn jumpthrow binds. Mirage Window smoke.", videoLink: "https://t.me/TvoyBot?start=video_smokes" }
  };

  const aiAnswers = [
    "I analyzed 10k trades. Buy AWP Asiimov right now.",
    "Market is volatile. Hold your cases for 2 more weeks.",
    "Drop probability for your account is currently 4.2%. Play DM.",
    "Based on leaks, new operation drops in 14 days."
  ];

  const handleAiSearch = (e) => {
    e.preventDefault();
    if(!aiInput.trim()) return;
    try { window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium'); } catch (e) {}
    
    setAiInput('');
    setIsThinking(true);
    setAiResponse(null);

    // Имитация работы ИИ (задержка 2 сек)
    setTimeout(() => {
      setIsThinking(false);
      setAiResponse(aiAnswers[Math.floor(Math.random() * aiAnswers.length)]);
    }, 2000);
  };

  return (
    <div className="px-5 pt-6 pb-32 animate-in fade-in duration-500">
      
      <div className="flex gap-8 mb-8 items-center border-b border-white/10 pb-4">
        <button onClick={() => setHubSection('signals')} className={`text-3xl font-black tracking-tighter transition-all ${hubSection === 'signals' ? 'text-white' : 'text-zinc-600'}`}>Signals</button>
        <button onClick={() => setHubSection('guide')} className={`text-3xl font-black tracking-tighter transition-all ${hubSection === 'guide' ? 'text-white' : 'text-zinc-600'}`}>Guide</button>
      </div>

      {hubSection === 'signals' ? (
        <div className="space-y-6 animate-in slide-in-from-left-4">
          
          {/* ИНТЕРАКТИВНЫЙ AI ПОИСК */}
          <div className="p-1 rounded-[24px] bg-gradient-to-r from-[#0abab5]/20 to-purple-500/20">
            <div className="bg-[#111112] rounded-[22px] p-4 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3 text-[#0abab5]">
                <Sparkles size={16} /><span className="text-[10px] font-black uppercase tracking-widest">Neural AI</span>
              </div>
              
              <form onSubmit={handleAiSearch} className="relative mb-4">
                <input 
                  type="text" 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Ask AI what to buy..." 
                  disabled={isThinking}
                  className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-4 pr-12 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 text-white placeholder:text-zinc-600 disabled:opacity-50"
                />
                <button type="submit" disabled={isThinking} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0abab5]/10 rounded-xl flex items-center justify-center text-[#0abab5]">
                  {isThinking ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                </button>
              </form>

              {/* ОТВЕТ ИИ */}
              {isThinking && <p className="text-sm font-bold text-zinc-500 animate-pulse px-2">Analyzing market data...</p>}
              {aiResponse && (
                <div className="p-4 bg-[#0abab5]/10 border border-[#0abab5]/20 rounded-2xl animate-in slide-in-from-bottom-2">
                  <p className="text-sm font-bold text-[#0abab5] leading-snug">{aiResponse}</p>
                </div>
              )}
            </div>
          </div>

          <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] italic">Live Signals</h3>
          
          {[
            { name: 'AK-47 Slate', float: 'FN 0.02', prob: '94% Buy', color: 'text-green-500' },
          ].map((s, i) => (
            <div key={i} className="bg-[#111112] border border-white/5 rounded-[24px] p-5 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center"><Zap size={20} className="text-[#0abab5]" /></div>
                <div>
                  <h4 className="font-bold text-sm text-white mb-1">{s.name}</h4>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Float: {s.float}</p>
                </div>
              </div>
              <div className={`text-[11px] font-black uppercase px-4 py-2 bg-black rounded-full border border-white/5 ${s.color}`}>{s.prob}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="animate-in slide-in-from-right-4">
          <div className="mb-6">
            <h2 className="text-2xl font-black italic mb-1">Knowledge Base</h2>
            <p className="text-sm font-bold text-zinc-500">Video guides & strats</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
              {Object.keys(guideData).map(g => (
                  <button key={g} onClick={() => setGuideModal(guideData[g])} className="h-40 bg-[#111112] border border-white/5 rounded-[32px] flex flex-col items-center justify-center gap-4 active:scale-95 transition-all shadow-lg hover:border-white/10">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-400">
                        <PlayCircle size={20} />
                      </div>
                      <span className="text-[12px] font-black uppercase tracking-[0.2em]">{g}</span>
                  </button>
              ))}
          </div>
        </div>
      )}

      {/* MODAL С ВИДЕО */}
      {guideModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-5">
          <div onClick={() => setGuideModal(null)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
          <div className="relative w-full bg-[#1c1c1e] border border-white/10 rounded-[32px] p-8 animate-in zoom-in-95 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-white font-black uppercase text-xl italic tracking-tight">{guideModal.title}</h4>
              <button onClick={() => setGuideModal(null)} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center"><X size={16} /></button>
            </div>
            <p className="text-zinc-300 font-medium leading-relaxed text-sm mb-6">{guideModal.text}</p>
            
            {/* КНОПКА ПЕРЕХОДА НА ВИДЕО В БОТЕ */}
            <a href={guideModal.videoLink} target="_blank" rel="noopener noreferrer" className="w-full py-4 bg-purple-500 rounded-2xl font-bold uppercase tracking-widest text-xs text-white flex justify-center items-center gap-2">
              <PlayCircle size={18} /> Watch Video
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hub;
