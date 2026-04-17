import React, { useState } from 'react';
import { Store, Gamepad2, Gift } from 'lucide-react';

const App = () => {
  // По умолчанию активна вкладка "games", как на твоем скрине
  const [activeTab, setActiveTab] = useState('games');

  // Мягкая вибрация
  const triggerHaptic = () => {
    try {
      if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
      }
    } catch (e) {}
  };

  // Компонент отдельной кнопки навигации
  const NavItem = ({ id, icon, label, isAvatar }) => {
    const isActive = activeTab === id;

    return (
      <button
        onClick={() => { setActiveTab(id); triggerHaptic(); }}
        className={`relative flex flex-col items-center justify-center min-w-[72px] h-[56px] transition-all duration-300 ${
          isActive ? 'text-white' : 'text-[#6b6b70] hover:text-gray-400'
        }`}
      >
        {/* Плашка вокруг активного элемента (как на скрине) */}
        {isActive && !isAvatar && (
          <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-[20px] -z-10" />
        )}

        {isAvatar ? (
          // Аватарка для профиля
          <div className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-colors duration-300 ${
            isActive ? 'border-white/40' : 'border-[#2a2a2d]'
          }`}>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          // Обычная иконка с текстом
          <>
            <div className="mb-1">{icon}</div>
            <span className="text-[10px] font-medium leading-none tracking-wide">{label}</span>
          </>
        )}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#000000] text-white overflow-hidden">
      
      {/* ПУСТАЯ РАБОЧАЯ ЗОНА */}
      <main className="flex-1 overflow-y-auto pb-28 px-4 pt-6">
        <div className="flex h-full items-center justify-center text-[#3a3a3c] font-bold uppercase tracking-widest text-xs">
          {activeTab} SCREEN IS EMPTY
        </div>
      </main>

      {/* НОВАЯ НАВИГАЦИЯ (Точно по скрину) */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-[#151516] border border-white/5 rounded-[28px] px-2 py-2 z-50">
        <div className="flex justify-between items-center">
          
          <NavItem 
            id="market" 
            icon={<Store size={22} />} 
            label="Market" 
          />
          
          <NavItem 
            id="games" 
            // Добавил легкий фиолетовый оттенок иконке, как на оригинальном скрине (можешь убрать className, если нужен чисто белый)
            icon={<Gamepad2 size={22} className={activeTab === 'games' ? 'text-[#d946ef]' : ''} />} 
            label="Games" 
          />
          
          <NavItem 
            id="gifts" 
            icon={<Gift size={22} />} 
            label="My gifts" 
          />
          
          <NavItem 
            id="profile" 
            isAvatar={true} 
            label="Profile" 
          />

        </div>
      </nav>

    </div>
  );
};

export default App;
