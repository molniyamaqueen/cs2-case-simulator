import React, { useState } from 'react';
import { Gamepad2, Store, Gift, Trophy, User, Settings, Bell, ChevronRight } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('profile');
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
      
      {/* HEADER (Верхняя панель) */}
      <header className="flex justify-between items-center px-4 py-3 bg-[#121212] border-b border-white/5 z-10">
        <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-full">
          <span className="text-yellow-500 text-sm">✨</span>
          <span className="text-sm font-bold">Level 2</span>
        </div>
        <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-full border border-blue-500/30">
          <span className="text-blue-400 font-bold">💎</span>
          <span className="text-sm font-bold">{balance.toFixed(2)}</span>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto pb-24">
        
        {/* ЭКРАН ПРОФИЛЯ (Сделан по твоему скрину #7) */}
        {activeTab === 'profile' && (
          <div className="p-4 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Карточка юзера */}
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

            {/* Статистика */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#1a1a1a] p-3 rounded-2xl border border-white/5 text-center">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Total Value</div>
                <div className="font-bold text-sm text-blue-400">$2,450</div>
              </div>
              <div className="bg-[#1a1a1a] p-3 rounded-2xl border border-white/5 text-center">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Cases Opened</div>
                <div className="font-bold text-sm">854</div>
              </div>
              <div className="bg-[#1a1a1a] p-3 rounded-2xl border border-white/5 text-center">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Upgrades</div>
                <div className="font-bold text-sm text-green-400">+12</div>
              </div>
            </div>

            {/* Блок Cashback / Пригласи друга */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-4 rounded-2xl border border-blue-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Trophy size={64} />
              </div>
              <h3 className="font-bold text-sm mb-1 uppercase text-blue-400">Invite & Earn Skins</h3>
              <p className="text-xs text-gray-300 mb-4 w-3/4">Get up to 50% referral commissions and free seasonal cases.</p>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors">
                Invite Friends
              </button>
            </div>
          </div>
        )}

        {/* ЗАГЛУШКИ ДЛЯ ДРУГИХ ЭКРАНОВ */}
        {activeTab === 'games' && <div className="p-4 flex h-full items-center justify-center text-gray-500">Тут будет рулетка CS2 🎰</div>}
        {activeTab === 'store' && <div className="p-4 flex h-full items-center justify-center text-gray-500">Тут будет маркет скинов 🛒</div>}
        {activeTab === 'season' && <div className="p-4 flex h-full items-center justify-center text-gray-500">Тут будут сезоны и квесты 🏆</div>}

      </main>

      {/* BOTTOM NAVIGATION (Стеклянная нижняя панель) */}
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
