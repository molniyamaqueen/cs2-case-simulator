import React, { useState } from 'react';
import { Gamepad2, Store, Gift, Trophy, User, Search, SlidersHorizontal, ArrowUpDown, ChevronDown } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('store');
  const [balance, setBalance] = useState(1540.50);

  // Компонент нижней кнопки навигации
  const NavButton = ({ id, icon, label }) => {
    const isActive = activeTab === id;
    return (
      <button 
        onClick={() => setActiveTab(id)}
        className={`flex flex-col items-center justify-center w-full space-y-1 transition-colors ${
          isActive ? 'text-blue-500' : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        {React.cloneElement(icon, { size: 24, className: isActive ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]' : '' })}
        <span className="text-[10px] font-medium">{label}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
      
      {/* HEADER */}
      <header className="flex justify-between items-center px-4 py-3 bg-[#121212] border-b border-white/5 z-10">
        <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-full">
          <span className="text-yellow-500 text-sm">✨</span>
          <span className="text-sm font-bold text-gray-200">Level 2</span>
        </div>
        <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-full border border-blue-500/30">
          <span className="text-blue-400 font-bold">💎</span>
          <span className="text-sm font-bold">{balance.toFixed(2)}</span>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto pb-24">
        
        {/* ЭКРАН ПРОФИЛЯ */}
        {activeTab === 'profile' && (
          <div className="p-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-[#1a1a1a] p-4 rounded-2xl flex items-center justify-between border border-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full p-0.5">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=CS2Player" alt="Avatar" className="w-full h-full rounded-full bg-zinc-800" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">CS2_Legend</h2>
                  <span className="text-xs text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-md">#Elite Global ✨</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400 mb-1">Inventory</div>
                <div className="font-bold flex items-center justify-end space-x-1">
                  <span>142</span>
                  <Gift size={14} className="text-blue-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#1a1a1a] p-3 rounded-2xl border border-white/5 text-center">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Total Value</div>
                <div className="font-bold text-sm text-blue-400">$2,450</div>
              </div>
              <div className="bg-[#1a1a1a] p-3 rounded-2xl border border-white/5 text-center">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Cases</div>
                <div className="font-bold text-sm">854</div>
              </div>
              <div className="bg-[#1a1a1a] p-3 rounded-2xl border border-white/5 text-center">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Upgrades</div>
                <div className="font-bold text-sm text-green-400">+12</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-4 rounded-2xl border border-blue-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Trophy size={64} />
              </div>
              <h3 className="font-bold text-sm mb-1 uppercase text-blue-400">Invite & Earn Skins</h3>
              <p className="text-xs text-gray-300 mb-4 w-3/4">Get up to 50% referral commissions and free cases.</p>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors">
                Invite Friends
              </button>
            </div>
          </div>
        )}

        {/* ЭКРАН МАРКЕТА (Из скрина #2) */}
        {activeTab === 'store' && (
          <div className="p-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Арена Баннер */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-4 flex justify-between items-center relative overflow-hidden">
              <div className="absolute right-0 -bottom-4 opacity-50 text-7xl">🎁</div>
              <div className="relative z-10">
                <h2 className="text-3xl font-black italic tracking-wider">Arena</h2>
                <div className="bg-white/20 text-xs inline-block px-2 py-1 rounded-md mt-1 backdrop-blur-sm font-bold">Tournament 🏆</div>
              </div>
              <div className="text-right relative z-10 bg-black/20 p-2 rounded-xl backdrop-blur-md">
                <div className="text-[10px] text-white/80 uppercase mb-0.5">Total Prize Pool</div>
                <div className="font-bold text-purple-200">40 000 💎</div>
              </div>
            </div>

            {/* Вкладки маркета */}
            <div className="flex space-x-4 text-sm font-bold border-b border-white/10 pb-2">
              <button className="text-white border-b-2 border-blue-500 pb-2 -mb-[9px]">All items</button>
              <button className="text-gray-500 hover:text-gray-300 pb-2">Collections</button>
            </div>

            {/* Поиск и фильтры */}
            <div className="flex space-x-2">
              <div className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-xl flex items-center px-3 py-2">
                <Search size={16} className="text-gray-500 mr-2" />
                <input type="text" placeholder="Quick find" className="bg-transparent border-none text-sm w-full outline-none placeholder-gray-500" />
              </div>
              <button className="bg-[#1a1a1a] border border-white/10 p-2 rounded-xl text-gray-400 hover:text-white">
                <SlidersHorizontal size={18} />
              </button>
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
              <button className="bg-[#1a1a1a] border border-white/10 px-3 py-1.5 rounded-lg text-xs flex items-center space-x-1 whitespace-nowrap"><ArrowUpDown size={12} /><span>Sort</span></button>
              <button className="bg-[#1a1a1a] border border-white/10 px-3 py-1.5 rounded-lg text-xs flex items-center space-x-1 whitespace-nowrap"><span>Collection</span><ChevronDown size={12} /></button>
              <button className="bg-[#1a1a1a] border border-white/10 px-3 py-1.5 rounded-lg text-xs flex items-center space-x-1 whitespace-nowrap"><span>Model</span><ChevronDown size={12} /></button>
            </div>

            {/* Карточки товаров */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {/* Карточка 1 */}
              <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-3 flex flex-col relative overflow-hidden group">
                <div className="bg-gradient-to-b from-yellow-500/20 to-transparent absolute inset-0 z-0 opacity-50"></div>
                <div className="h-24 flex items-center justify-center relative z-10 mb-2">
                  <span className="text-6xl drop-shadow-xl group-hover:scale-110 transition-transform">🎒</span>
                </div>
                <div className="relative z-10">
                  <h3 className="font-bold text-sm">Mood Pack</h3>
                  <p className="text-[10px] text-gray-500 mb-2">#95657</p>
                  <div className="flex justify-between items-center">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs py-1.5 px-3 rounded-lg flex-1 mr-2">9.88 💎</button>
                    <button className="bg-white/10 p-1.5 rounded-lg"><Gift size={14} /></button>
                  </div>
                </div>
              </div>

              {/* Карточка 2 */}
              <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-3 flex flex-col relative overflow-hidden group">
                <div className="bg-gradient-to-b from-blue-500/20 to-transparent absolute inset-0 z-0 opacity-50"></div>
                <div className="h-24 flex items-center justify-center relative z-10 mb-2">
                  <span className="text-6xl drop-shadow-xl group-hover:scale-110 transition-transform">🐕</span>
                </div>
                <div className="relative z-10">
                  <h3 className="font-bold text-sm">Spring Basket</h3>
                  <p className="text-[10px] text-gray-500 mb-2">#104410</p>
                  <div className="flex justify-between items-center">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs py-1.5 px-3 rounded-lg flex-1 mr-2">12.98 💎</button>
                    <button className="bg-white/10 p-1.5 rounded-lg"><Gift size={14} /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ЗАГЛУШКИ ДЛЯ ДРУГИХ ЭКРАНОВ */}
        {activeTab === 'games' && <div className="p-4 flex h-full items-center justify-center text-gray-500">Тут будет рулетка CS2 🎰</div>}
        {activeTab === 'season' && <div className="p-4 flex h-full items-center justify-center text-gray-500">Тут будут сезоны и квесты 🏆</div>}

      </main>

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 w-full bg-[#121212]/90 backdrop-blur-xl border-t border-white/10 pb-safe pt-2 px-2 z-50">
        <div className="flex justify-between items-center max-w-md mx-auto px-2 mb-2">
          <NavButton id="games" icon={<Gamepad2 />} label="Games" />
          <NavButton id="store" icon={<Store />} label="Market" />
          <NavButton id="profile" icon={<User />} label="Profile" />
          <NavButton id="season" icon={<Trophy />} label="Season" />
        </div>
      </nav>

    </div>
  );
};

export default App;
