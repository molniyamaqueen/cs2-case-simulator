import React, { useState } from 'react';
import { Gamepad2, Target, BookOpen, User, TrendingUp, Activity, Crosshair, BarChart2, ChevronRight, PlayCircle } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('signals');
  const [balance, setBalance] = useState(1540.50);

  // Компонент нижней кнопки навигации
  const NavButton = ({ id, icon, label }) => {
    const isActive = activeTab === id;
    return (
      <button 
        onClick={() => setActiveTab(id)}
        className={`flex flex-col items-center justify-center w-full space-y-1 transition-colors ${
          isActive ? 'text-orange-500' : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        {React.cloneElement(icon, { size: 24, className: isActive ? 'drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]' : '' })}
        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0c] text-white font-sans overflow-hidden">
      
      {/* HEADER (Стиль Steam/CS2) */}
      <header className="flex justify-between items-center px-4 py-3 bg-[#111115] border-b border-white/5 z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-black text-black">
            CS
          </div>
          <span className="font-black italic tracking-wider text-lg">PRO<span className="text-orange-500">HUB</span></span>
        </div>
        <div className="flex items-center bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
          <span className="text-green-500 font-bold mr-1.5">$</span>
          <span className="text-sm font-bold font-mono">{balance.toFixed(2)}</span>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
        
        {/* ЭКРАН СИГНАЛОВ И АНАЛИТИКИ (Signals & Cybersport) */}
        {activeTab === 'signals' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Live Signal Card */}
            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-orange-500/30 rounded-2xl p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-orange-500 text-black text-[10px] font-black px-2 py-1 rounded-bl-lg uppercase tracking-wider flex items-center">
                <Activity size={10} className="mr-1 animate-pulse" /> Live Signal
              </div>
              <h2 className="text-lg font-black italic mb-3 flex items-center">
                <Crosshair size={18} className="text-orange-500 mr-2" /> 
                MATCH PREDICTION
              </h2>
              <div className="flex justify-between items-center bg-black/40 p-3 rounded-xl mb-3">
                <div className="text-center">
                  <div className="font-bold text-lg">NAVI</div>
                  <div className="text-xs text-green-400">65% Winrate</div>
                </div>
                <div className="font-black text-gray-500 italic text-xl">VS</div>
                <div className="text-center">
                  <div className="font-bold text-lg">FaZe</div>
                  <div className="text-xs text-red-400">35% Winrate</div>
                </div>
              </div>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-black font-black uppercase text-sm py-2.5 rounded-xl transition-all">
                View Full Analysis
              </button>
            </div>

            {/* Cybersport Analytics */}
            <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider mt-6 mb-2 flex items-center">
              <BarChart2 size={16} className="mr-2" /> Market & Analytics
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#15151a] border border-white/5 rounded-xl p-3">
                <div className="text-xs text-gray-500 mb-1">AK-47 | Redline</div>
                <div className="font-mono font-bold text-green-400 flex items-center">
                  <TrendingUp size={14} className="mr-1" /> +12.4%
                </div>
                <div className="text-[10px] text-gray-600 mt-2">Strong buy signal</div>
              </div>
              <div className="bg-[#15151a] border border-white/5 rounded-xl p-3">
                <div className="text-xs text-gray-500 mb-1">Major Pick'Em</div>
                <div className="font-bold text-orange-400 flex items-center">
                  Updated
                </div>
                <div className="text-[10px] text-gray-600 mt-2">Check new stage</div>
              </div>
            </div>
          </div>
        )}

        {/* ЭКРАН БАЗЫ ЗНАНИЙ (News & Guides) */}
        {activeTab === 'news' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Hot Guide */}
            <div className="h-40 rounded-2xl bg-[#15151a] border border-white/5 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10"></div>
              {/* Вместо картинки заглушка с градиентом, потом поменяешь на реальное фото */}
              <div className="absolute inset-0 bg-blue-900/30"></div>
              <div className="absolute bottom-0 left-0 p-4 z-20 w-full">
                <div className="bg-blue-500 text-xs font-bold inline-block px-2 py-0.5 rounded text-white mb-2">PRO GUIDE</div>
                <h3 className="font-bold text-lg leading-tight mb-1">Mirage Window Smokes: CS2 Update</h3>
                <p className="text-xs text-gray-400 flex items-center"><PlayCircle size={12} className="mr-1" /> 5 min read</p>
              </div>
            </div>

            <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider mt-6 mb-2">Latest News</h3>
            
            <div className="space-y-2">
              {[
                { title: "Valve release massive update fixing sub-tick", time: "2 hours ago", tag: "Update" },
                { title: "S1mple announces return to pro scene", time: "5 hours ago", tag: "Esports" },
                { title: "New case drop pool analyzed", time: "1 day ago", tag: "Economy" }
              ].map((news, i) => (
                <div key={i} className="bg-[#15151a] p-3 rounded-xl border border-white/5 flex items-center justify-between">
                  <div className="pr-4">
                    <span className="text-[10px] text-orange-500 font-bold uppercase">{news.tag}</span>
                    <h4 className="font-bold text-sm leading-tight mt-0.5">{news.title}</h4>
                    <span className="text-[10px] text-gray-500">{news.time}</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-600 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ЭКРАН ПРОФИЛЯ */}
        {activeTab === 'profile' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="bg-[#15151a] p-4 rounded-2xl flex items-center justify-between border border-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-gradient-to-tr from-orange-500 to-yellow-500 rounded-xl p-0.5">
                  <div className="w-full h-full bg-zinc-900 rounded-[10px] flex items-center justify-center">
                    <User size={24} className="text-orange-400" />
                  </div>
                </div>
                <div>
                  <h2 className="font-bold text-lg">CS_User</h2>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">Premium Member</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#15151a] p-3 rounded-xl border border-white/5">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Winrate Predicts</div>
                <div className="font-bold text-lg text-green-400">74.2%</div>
              </div>
              <div className="bg-[#15151a] p-3 rounded-xl border border-white/5">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Active Signals</div>
                <div className="font-bold text-lg">3</div>
              </div>
            </div>
          </div>
        )}

        {/* ЗАГЛУШКА ИГРЫ */}
        {activeTab === 'games' && (
          <div className="flex flex-col h-full items-center justify-center text-center mt-20">
            <Gamepad2 size={48} className="text-orange-500 mb-4 opacity-50" />
            <h3 className="text-xl font-black italic mb-2">MINI-GAMES</h3>
            <p className="text-sm text-gray-500 w-2/3">Case opening and roulette simulators are loading...</p>
          </div>
        )}

      </main>

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 w-full bg-[#111115]/95 backdrop-blur-xl border-t border-white/5 pb-safe pt-2 px-2 z-50">
        <div className="flex justify-between items-center max-w-md mx-auto px-2 mb-2">
          <NavButton id="signals" icon={<Target />} label="Signals" />
          <NavButton id="news" icon={<BookOpen />} label="Hub" />
          <NavButton id="games" icon={<Gamepad2 />} label="Games" />
          <NavButton id="profile" icon={<User />} label="Profile" />
        </div>
      </nav>

    </div>
  );
};

export default App;
