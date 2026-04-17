import React, { useState, useEffect } from 'react';
import { Gamepad2, Target, BookOpen, User, TrendingUp, Activity, Crosshair, BarChart2, ChevronRight, PlayCircle } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('signals');
  const [balance, setBalance] = useState(1540.50);
  
  // Создаем хранилище для данных из Телеграма
  const [tgUser, setTgUser] = useState(null);

  // Этот блок срабатывает один раз при запуске аппки
  useEffect(() => {
    // Проверяем, открыто ли приложение внутри Телеграма
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready(); // Говорим Телеграму, что мы загрузились
      const user = tg.initDataUnsafe?.user;
      
      if (user) {
        setTgUser({
          firstName: user.first_name,
          lastName: user.last_name,
          username: user.username,
          photoUrl: user.photo_url
        });
      }
    }
  }, []);

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

  // Формируем имя для отображения
  const displayName = tgUser?.firstName || 'Agent';
  const displayUsername = tgUser?.username ? `@${tgUser.username}` : 'Classified';

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0c] text-white font-sans overflow-hidden">
      
      {/* HEADER */}
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
        
        {/* ЭКРАН СИГНАЛОВ */}
        {activeTab === 'signals' && (
          <div className="space-y-4 animate-in fade-in duration-300">
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

        {/* ЭКРАН ПРОФИЛЯ (ТЕПЕРЬ ЖИВОЙ!) */}
        {activeTab === 'profile' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="bg-[#15151a] p-4 rounded-2xl flex items-center justify-between border border-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-gradient-to-tr from-orange-500 to-yellow-500 rounded-xl p-0.5 overflow-hidden">
                  {/* Если есть фото из ТГ - показываем его, иначе иконку */}
                  {tgUser?.photoUrl ? (
                    <img src={tgUser.photoUrl} alt="Profile" className="w-full h-full rounded-[10px] object-cover" />
                  ) : (
                    <div className="w-full h-full bg-zinc-900 rounded-[10px] flex items-center justify-center">
                      <User size={24} className="text-orange-400" />
                    </div>
                  )}
                </div>
                <div>
                  {/* Подставляем реальное имя и ник */}
                  <h2 className="font-bold text-lg">{displayName}</h2>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">{displayUsername}</span>
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

        {/* ЗАГЛУШКИ */}
        {activeTab === 'news' && (
          <div className="flex flex-col h-full items-center justify-center text-center mt-20">
            <BookOpen size={48} className="text-orange-500 mb-4 opacity-50" />
            <h3 className="text-xl font-black italic mb-2">CS2 HUB</h3>
            <p className="text-sm text-gray-500 w-2/3">News and Pro Guides are loading...</p>
          </div>
        )}
        
        {activeTab === 'games' && (
          <div className="flex flex-col h-full items-center justify-center text-center mt-20">
            <Gamepad2 size={48} className="text-orange-500 mb-4 opacity-50" />
            <h3 className="text-xl font-black italic mb-2">MINI-GAMES</h3>
            <p className="text-sm text-gray-500 w-2/3">Case opening simulators are loading...</p>
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
import React, { useState } from 'react';
import { Gamepad2, Store, Gift } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('games');

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0c] text-white font-sans overflow-hidden">
      
      {/* ВРЕМЕННАЯ ЗАГЛУШКА КОНТЕНТА */}
      <main className="flex-1 flex items-center justify-center pb-24">
        <div className="text-gray-600 font-bold tracking-widest uppercase">
          Экран: {activeTab}
        </div>
      </main>

      {/* ИДЕАЛЬНАЯ НИЖНЯЯ ПАНЕЛЬ (ПО СКРИНУ) */}
      <nav className="fixed bottom-0 w-full bg-[#111115] border-t border-white/5 pb-safe pt-2 px-2 z-50">
        <div className="flex justify-around items-center max-w-md mx-auto mb-2">

          {/* 1. Market */}
          <button
            onClick={() => setActiveTab('market')}
            className={`flex flex-col items-center justify-center w-[75px] py-2 rounded-[20px] transition-all duration-300 ${
              activeTab === 'market' ? 'bg-[#1c1c22]' : ''
            }`}
          >
            <Store size={24} className={activeTab === 'market' ? 'text-purple-500' : 'text-gray-500'} />
            <span className={`text-[10px] mt-1 font-bold ${activeTab === 'market' ? 'text-purple-500' : 'text-gray-500'}`}>Market</span>
          </button>

          {/* 2. Games */}
          <button
            onClick={() => setActiveTab('games')}
            className={`flex flex-col items-center justify-center w-[75px] py-2 rounded-[20px] transition-all duration-300 ${
              activeTab === 'games' ? 'bg-[#1c1c22]' : ''
            }`}
          >
            <Gamepad2 size={24} className={activeTab === 'games' ? 'text-purple-500' : 'text-gray-500'} />
            <span className={`text-[10px] mt-1 font-bold ${activeTab === 'games' ? 'text-purple-500' : 'text-gray-500'}`}>Games</span>
          </button>

          {/* 3. My gifts */}
          <button
            onClick={() => setActiveTab('gifts')}
            className={`flex flex-col items-center justify-center w-[75px] py-2 rounded-[20px] transition-all duration-300 ${
              activeTab === 'gifts' ? 'bg-[#1c1c22]' : ''
            }`}
          >
            <Gift size={24} className={activeTab === 'gifts' ? 'text-purple-500' : 'text-gray-500'} />
            <span className={`text-[10px] mt-1 font-bold ${activeTab === 'gifts' ? 'text-purple-500' : 'text-gray-500'}`}>My gifts</span>
          </button>

          {/* 4. Avatar (Профиль) */}
          <button
            onClick={() => setActiveTab('profile')}
            className="flex flex-col items-center justify-center w-[75px] py-1 transition-all"
          >
            <div className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all duration-300 ${
              activeTab === 'profile' ? 'border-purple-500' : 'border-transparent'
            }`}>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=CS2" alt="Profile" className="w-full h-full object-cover bg-zinc-800" />
            </div>
          </button>

        </div>
      </nav>

    </div>
  );
};

export default App;
