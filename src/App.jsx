import React, { useState, useEffect } from 'react';
import { Target, Crosshair, Search, Target as TargetIcon } from 'lucide-react';

const App = () => {
  // По умолчанию активен Hub
  const [activeTab, setActiveTab] = useState('hub');

  // Вибрация
  const triggerHaptic = (style = 'light') => {
    try {
      if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
      }
    } catch (e) {}
  };

  useEffect(() => {
    try {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
        if (window.Telegram.WebApp.setHeaderColor) {
            window.Telegram.WebApp.setHeaderColor('#000000');
        }
      }
    } catch (e) {}
  }, []);

  // Компонент одной кнопки (СТРОГО по image_1.png)
  const NavItem = ({ id, label, icon, isAvatar }) => {
    const isActive = activeTab === id;

    return (
      <button
        onClick={() => { setActiveTab(id); triggerHaptic('light'); }}
        className={`relative flex flex-col items-center justify-center p-3 transition-all duration-300 ${
          isActive && !isAvatar ? 'text-white' : 'text-gray-500'
        }`}
      >
        {/* АКТИВНЫЙ ФОН - ПЛАШКА (Как на скрине image_1.png) */}
        {isActive && !isAvatar && (
          <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl -z-10 shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
        )}

        {isAvatar ? (
          // Круглая аватарка Профиля (Как на скрине image_1.png)
          <div className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-colors ${
            isActive ? 'border-white/50' : 'border-gray-700 opacity-60'
          }`}>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100" 
              alt="P" 
              className="w-full h-full object-cover" 
            />
          </div>
        ) : (
          // Иконка + Текст (Как на скрине image_1.png)
          <>
            <div className={`mb-1 transition-transform ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'scale-100'}`}>
              {icon}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-tight ${isActive ? 'opacity-100' : 'opacity-80'}`}>{label}</span>
          </>
        )}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#000000] text-white overflow-hidden font-sans">
      
      {/* ПУСТАЯ РАБОЧАЯ ЗОНА (Основа) */}
      <main className="flex-1 overflow-y-auto pb-32 pt-8 px-5 animate-in fade-in duration-500">
        <div className="flex flex-col h-full items-center justify-center text-center">
            <h2 className="text-4xl font-black uppercase tracking-widest text-[#1a1a1c] mb-2">{activeTab}</h2>
            <p className="text-xs font-bold text-gray-700 tracking-wider">MODUL IS EMPTY</p>
        </div>
      </main>

      {/* ОВАЛЬНАЯ НАВИГАЦИЯ (Строго по image_1.png + ТЗ) */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-sm 
        bg-[#1a1a1c]/90 
        backdrop-blur-2xl 
        border border-white/5 
        rounded-full 
        px-2 py-1 
        z-50 
        shadow-[0_15px_30px_rgba(0,0,0,0.6)]">
        
        <div className="flex justify-between items-center px-2">
          
          <NavItem 
            id="arena" 
            label="Arena" 
            icon={<Crosshair size={22} />} 
          />
          
          <NavItem 
            id="hub" 
            label="Hub" 
            icon={<Target size={22} />} 
          />
          
          <NavItem 
            id="intel" 
            label="Intel" 
            icon={<Search size={22} />} 
          />
          
          <NavItem 
            id="profile" 
            isAvatar={true}
          />

        </div>
      </nav>

    </div>
  );
};

export default App;
