import React, { useState } from 'react';
import { Sparkles, Zap, Target, Search, X, BookOpen } from 'lucide-react';
// 1. Подключаем хук языков
import { useLanguage } from '../i18n/LanguageContext';

const Hub = ({ activeTab, setActiveTab }) => {
  // 2. Достаем функцию перевода
  const { t } = useLanguage();
const Hub = () => {
  const [hubSection, setHubSection] = useState('signals');
  const [aiInput, setAiInput] = useState('');
  const [guideModal, setGuideModal] = useState(null); // Состояние для модалки Гайда

  // База знаний для Guide
  const guideData = {
    'Aim': { title: "Aim Mastery", text: "Crosshair placement is 90% of your aim. Always keep your crosshair at head level and pre-aim common angles. Download Yprac maps from the workshop." },
    'Picks': { title: "Entry Picks", text: "Don't peek dry. Use flashes. If you are playing entry fragger, your goal is to create space. Communicate your path to the second man in." },
    'Nades': { title: "Better Раскидка", text: "Learn jumpthrow binds (128 tick). Essential smokes: Mirage Window, Inferno Coffins, Dust2 Xbox. One good smoke wins the round." },
    'Economy': { title: "Economy Rules", text: "Loss bonus starts at $1400. If your team has under $2000, FULL ECO. Don't buy a Deagle if it breaks your next round full buy ($4300 minimum)." }
  };

  const handleAiSearch = (e) => {
    e.preventDefault();
    if(!aiInput) return;
    try { window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium'); } catch (e) {}
    setAiInput(''); // В реальности тут был бы запрос к бэкенду
    alert(`AI Processing request: "${aiInput}"... \n(This will show dynamic result later)`);
  };

  return (
    <div className="px-5 pt-6 pb-32 animate-in fade-in duration-500">
      
      {/* SWITCHER */}
      <div className="flex gap-8 mb-8 items-center border-b border-white/10 pb-4">
        <button onClick={() => setHubSection('signals')} className={`text-3xl font-black tracking-tighter transition-all ${hubSection === 'signals' ? 'text-white' : 'text-zinc-600'}`}>Signals</button>
        <button onClick={() => setHubSection('guide')} className={`text-3xl font-black tracking-tighter transition-all ${hubSection === 'guide' ? 'text-white' : 'text-zinc-600'}`}>Guide</button>
      </div>

      {hubSection === 'signals' ? (
        <div className="space-y-6 animate-in slide-in-from-left-4">
          
          {/* ИНТЕРАКТИВНЫЙ AI ПОИСК */}
          <div className="p-1 rounded-[24px] bg-gradient-to-r from-[#0abab5]/20 to-purple-500/20">
            <div className="bg-[#111112] rounded-[22px] p-4">
              <div className="flex items-center gap-2 mb-3 text-[#0abab5]">
                <Sparkles size={16} /><span className="text-[10px] font-black uppercase tracking-widest">Neural Market Scanner</span>
              </div>
              <form onSubmit={handleAiSearch} className="relative">
                <input 
                  type="text" 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Ask AI about skin drops, prices or trends..." 
                  className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-4 pr-12 text-sm font-medium focus:outline-none focus:border-[#0abab5]/50 text-white placeholder:text-zinc-600"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0abab5]/10 rounded-xl flex items-center justify-center text-[#0abab5]">
                  <Search size={18} />
                </button>
              </form>
            </div>
          </div>

          <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] italic">Live Active Signals</h3>
          
          {/* СИГНАЛЫ (Жирные данные) */}
          {[
            { name: 'AK-47 Slate', float: 'FN 0.02', prob: '94% Buy', color: 'text-green-500' },
            { name: 'AWP Mortis', float: 'MW 0.11', prob: '82% Hold', color: 'text-yellow-500' },
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
            <p className="text-sm font-bold text-zinc-500">"Чему ты хочешь научиться сегодня, боец?"</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
              {Object.keys(guideData).map(g => (
                  <button 
                    key={g} 
                    onClick={() => { setGuideModal(guideData[g]); try{window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light')}catch(e){} }}
                    className="h-40 bg-[#111112] border border-white/5 rounded-[32px] flex flex-col items-center justify-center gap-4 active:scale-95 transition-all shadow-lg hover:border-white/10"
                  >
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-400">
                        <BookOpen size={20} />
                      </div>
                      <span className="text-[12px] font-black uppercase tracking-[0.2em]">{g}</span>
                  </button>
              ))}
          </div>
        </div>
      )}

      {/* MODAL GUIDE (Глубокая инфа) */}
      {guideModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-5">
          <div onClick={() => setGuideModal(null)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
          <div className="relative w-full bg-[#1c1c1e] border border-white/10 rounded-[32px] p-8 animate-in zoom-in-95 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-white font-black uppercase text-xl italic tracking-tight">{guideModal.title}</h4>
              <button onClick={() => setGuideModal(null)} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center"><X size={16} /></button>
            </div>
            <p className="text-zinc-300 font-medium leading-relaxed text-sm">
              {guideModal.text}
            </p>
            <button onClick={() => setGuideModal(null)} className="w-full mt-8 py-4 bg-white/10 rounded-2xl font-bold uppercase tracking-widest text-xs text-white">Understood</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hub;
