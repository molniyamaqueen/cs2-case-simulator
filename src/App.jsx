import React, { useState, useEffect } from 'react';
import { Gamepad2, Target, BookOpen, User, TrendingUp, Activity, Crosshair, BarChart2, ChevronRight, PlayCircle, Edit2 } from 'lucide-react';

const App = () => {
  // Ставим вкладку 'games' по умолчанию, чтобы сразу видеть результат
  const [activeTab, setActiveTab] = useState('games');
  const [balance, setBalance] = useState(1540.50);
  const [tgUser, setTgUser] = useState(null);
  
  // Состояние для рулетки
  const [activeRoom, setActiveRoom] = useState(1);
  const [betAmount, setBetAmount] = useState('');

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      const user = tg.initDataUnsafe?.user;
      if (user) {
        setTgUser({
          firstName: user.first_name,
          username: user.username,
          photoUrl: user.photo_url
        });
      }
    }
  }, []);

  const NavButton = ({ id, icon, label }) => {
    const isActive = activeTab === id;
    return (
      <button 
        onClick={() => setActiveTab(id)}
        className={`flex flex-col items-center justify-center w-full space-y-1 transition-colors ${
          isActive ? 'text-purple-500' : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        {React.cloneElement(icon, { size: 24, className: isActive ? 'drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' : '' })}
        <span className="text-[10px] font-bold">{label}</span>
      </button>
    );
  };

  const displayName = tgUser?.firstName || 'CS_Legend';
  const displayUsername = tgUser?.username ? `@${tgUser.username}` : 'Premium';

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0c] text-white font-sans overflow-hidden">
      
      {/* HEADER */}
      <header className="flex justify-between items-center px-4 py-3 bg-[#111115] border-b border-white/5 z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center font-black text-white">
            CS
          </div>
          <span className="font-black italic tracking-wider text-lg">PRO<span className="text-purple-500">HUB</span></span>
        </div>
        <div className="flex items-center bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
          <span className="text-green-500 font-bold mr-1.5">$</span>
          <span className="text-sm font-bold font-mono">{balance.toFixed(2)}</span>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
        
        {/* ЭКРАН ИГРЫ (Coinflip) - Сделан по твоему скрину */}
        {activeTab === 'games' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            
            {/* Top Game / Last Game Stats */}
            <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-bold tracking-wider">
              <div className="bg-[#15151a] p-2 rounded-xl flex justify-between items-center border border-white/5">
                <span className="text-gray-500">Top game</span>
                <span className="text-green-400">+28 001 $</span>
              </div>
              <div className="bg-[#15151a] p-2 rounded-xl flex justify-between items-center border border-white/5">
                <span className="text-gray-500">Last game</span>
                <span className="text-green-400">+9.03 $</span>
              </div>
            </div>

            {/* Главная арена (Зеленый квадрат) */}
            <div className="bg-[#15151a] rounded-2xl p-4 border border-white/5">
              <div className="flex justify-between items-center mb-3 font-bold text-sm">
                <div className="flex items-center">
                  <span className="text-gray-400 mr-1">Total</span>
                  <span className="text-blue-400">0.85 $</span>
                </div>
                <div className="text-gray-400">
                  Waiting players 1/2
                </div>
              </div>

              {/* Зеленый фон с аватаркой по центру */}
              <div className="w-full aspect-square bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(74,222,128,0.2)]">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-black/20 shadow-2xl">
                   {/* Вставляем аватарку игрока, который уже поставил */}
                   <img src={tgUser?.photoUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Alien"} alt="Player 1" className="w-full h-full object-cover bg-zinc-800" />
                </div>
              </div>
            </div>

            {/* Инфо о лобби и комнаты */}
            <div className="flex justify-between items-end mt-4 mb-2">
              <div>
                <h2 className="text-xl font-black flex items-center">
                  Players <span className="text-gray-500 ml-2 text-sm">· 1</span>
                </h2>
              </div>
              <div className="text-xs text-gray-500 font-bold">
                Game #70543
              </div>
            </div>

            {/* Игрок в комнате & Выбор комнаты */}
            <div className="flex items-center justify-between bg-[#15151a] p-2 rounded-xl border border-white/5">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-500 flex items-center justify-center p-0.5">
                   <img src={tgUser?.photoUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Alien"} alt="P1" className="w-full h-full rounded-full object-cover bg-zinc-900" />
                </div>
                <span className="font-bold text-sm">@acronis</span>
              </div>
              
              <div className="flex bg-black/40 rounded-lg p-1">
                <button 
                  onClick={() => setActiveRoom(1)}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${activeRoom === 1 ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Room 1
                </button>
                <button 
                  onClick={() => setActiveRoom(2)}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${activeRoom === 2 ? 'bg-zinc-800 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  2
                </button>
              </div>
            </div>

            {/* Панель ставок */}
            <div className="flex space-x-2 pt-2">
              <button className="bg-[#15151a] hover:bg-zinc-800 border border-white/5 p-3 rounded-xl flex items-center justify-center transition-colors">
                <Edit2 size={18} className="text-gray-400" />
              </button>
              <button className="flex-1 bg-[#15151a] hover:bg-zinc-800 border border-white/5 py-3 rounded-xl font-bold text-gray-400 transition-colors">1 $</button>
              <button className="flex-1 bg-[#15151a] hover:bg-zinc-800 border border-white/5 py-3 rounded-xl font-bold text-gray-400 transition-colors">5 $</button>
              <button className="flex-1 bg-[#15151a] hover:bg-zinc-800 border border-white/5 py-3 rounded-xl font-bold text-gray-400 transition-colors">10 $</button>
              <button className="flex-1 bg-[#15151a] hover:bg-zinc-800 border border-white/5 py-3 rounded-xl font-bold text-gray-400 transition-colors text-xs uppercase tracking-wider">All-in</button>
            </div>
            
            {/* Кнопка "Войти в игру" */}
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black uppercase tracking-widest py-4 rounded-xl mt-4 shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-colors">
              Join Game
            </button>

          </div>
        )}

        {/* ЗАГЛУШКИ ДЛЯ ОСТАЛЬНЫХ ЭКРАНОВ */}
        {activeTab === 'market' && (
          <div className="flex flex-col h-full items-center justify-center text-center mt-20">
            <BookOpen size={48} className="text-gray-500 mb-4 opacity-50" />
            <h3 className="text-xl font-black mb-2">Market</h3>
            <p className="text-sm text-gray-500 w-2/3">Marketplace is loading...</p>
          </div>
        )}
        
        {activeTab === 'profile' && (
          <div className="flex flex-col h-full items-center justify-center text-center mt-20">
            <User size={48} className="text-gray-500 mb-4 opacity-50" />
            <h3 className="text-xl font-black mb-2">Inventory</h3>
            <p className="text-sm text-gray-500 w-2/3">Your profile is loading...</p>
          </div>
        )}

      </main>

      {/* BOTTOM NAVIGATION (Стеклянная панель) */}
      <nav className="fixed bottom-0 w-full bg-[#111115]/95 backdrop-blur-xl border-t border-white/5 pb-safe pt-2 px-2 z-50">
        <div className="flex justify-between items-center max-w-md mx-auto px-6 mb-2">
          <NavButton id="market" icon={<BookOpen />} label="Market" />
          <NavButton id="games" icon={<Gamepad2 />} label="Games" />
          <NavButton id="profile" icon={<User />} label="My gifts" />
        </div>
      </nav>

    </div>
  );
};

export default App;
