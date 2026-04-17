import React, { useState, useEffect } from 'react';
import { Target, Search, User, ChevronRight, Globe, MessageCircle, Shield, Gamepad2 } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Состояния для настроек
  const [lang, setLang] = useState('en');
  const [notifs, setNotifs] = useState(true);
  const [haptic, setHaptic] = useState(true);
  const [animations, setAnimations] = useState(true);

  useEffect(() => {
    try {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.ready();
        tg.expand();
        if (tg.setHeaderColor) tg.setHeaderColor('#000000');
      }
    } catch (e) {}
  }, []);

  // Вибрация (Haptic Feedback)
  const triggerHaptic = (style = 'light') => {
    try {
      if (haptic && window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
      }
    } catch (e) {}
  };

  // --- ПРЕМИУМ КОМПОНЕНТЫ ---

  // 1. Кнопка языка (Pill)
  const LangBtn = ({ id, flag, label }) => {
    const isActive = lang === id;
    return (
      <button
        onClick={() => { setLang(id); triggerHaptic('medium'); }}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full font-bold text-[13px] transition-all duration-300 ${
          isActive 
            ? 'bg-white text-black shadow-lg scale-105' 
            : 'bg-[#1c1c1e] text-gray-300 hover:bg-[#2c2c2e] border border-white/5'
        }`}
      >
        <span className="text-base">{flag}</span>
        <span>{label}</span>
      </button>
    );
  };

  // 2. iOS Тумблер (Switch)
  const CustomSwitch = ({ active, onChange }) => (
    <div 
      onClick={() => { onChange(!active); triggerHaptic('light'); }}
      className={`w-[50px] h-[30px] rounded-full p-[2px] cursor-pointer transition-colors duration-300 ease-in-out ${
        active ? 'bg-[#0a84ff]' : 'bg-[#39393d]'
      }`}
    >
      <div 
        className={`bg-white w-[26px] h-[26px] rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
          active ? 'translate-x-[20px]' : 'translate-x-0'
        }`} 
      />
    </div>
  );

  // 3. Блок с ссылками
  const LinkItem = ({ icon, text, isLast }) => (
    <div className={`flex items-center justify-between p-4 bg-[#1c1c1e] active:bg-[#2c2c2e] transition-colors cursor-pointer ${isLast ? '' : 'border-b border-white/5'}`}>
      <div className="flex items-center space-x-3">
        <div className="w-7 h-7 rounded-full bg-[#0a84ff]/10 flex items-center justify-center">
          {React.cloneElement(icon, { size: 16, className: "text-[#0a84ff]" })}
        </div>
        <span className="font-semibold text-[15px] text-gray-200">{text}</span>
      </div>
      <ChevronRight size={20} className="text-[#545458]" />
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden">
      
      {/* ОСНОВНОЙ КОНТЕНТ */}
      <main className="flex-1 overflow-y-auto pb-28 px-4 pt-6">

        {activeTab === 'profile' && (
          <div className="animate-in fade-in duration-500 max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-8 tracking-tight">Menu</h1>

            {/* ЯЗЫКИ */}
            <div className="mb-8">
              <div className="text-[11px] text-[#8e8e93] uppercase tracking-widest font-semibold mb-3 ml-1">Language</div>
              <div className="flex flex-wrap gap-2.5">
                <LangBtn id="en" flag="🇺🇸" label="EN" />
                <LangBtn id="ru" flag="🇷🇺" label="RU" />
                <LangBtn id="kr" flag="🇰🇷" label="한국" />
                <LangBtn id="zh" flag="🇨🇳" label="繁體" />
                <LangBtn id="ua" flag="🇺🇦" label="UA" />
              </div>
            </div>

            {/* НАСТРОЙКИ (ТУМБЛЕРЫ) */}
            <div className="space-y-6 mb-8">
              <div>
                <div className="text-[11px] text-[#8e8e93] uppercase tracking-widest font-semibold mb-2 ml-1">Notifications</div>
                <CustomSwitch active={notifs} onChange={setNotifs} />
              </div>

              <div>
                <div className="text-[11px] text-[#8e8e93] uppercase tracking-widest font-semibold mb-2 ml-1">Tactile Response</div>
                <CustomSwitch active={haptic} onChange={setHaptic} />
              </div>

              <div>
                <div className="text-[11px] text-[#8e8e93] uppercase tracking-widest font-semibold mb-2 ml-1">Animated Interface</div>
                <CustomSwitch active={animations} onChange={setAnimations} />
              </div>
            </div>

            {/* БЛОК ССЫЛОК (iOS Card Style) */}
            <div className="rounded-[20px] overflow-hidden mb-8 border border-white/5 shadow-lg">
              <LinkItem icon={<Globe />} text="CS2 Web Portal" isLast={false} />
              <LinkItem icon={<User />} text="My Account" isLast={false} />
              <LinkItem icon={<Gamepad2 />} text="Mini Games" isLast={false} />
              <LinkItem icon={<MessageCircle />} text="Official Channel" isLast={true} />
            </div>

            {/* КНОПКИ ВНИЗУ */}
            <div className="flex space-x-3 mb-6">
              <button 
                onClick={() => triggerHaptic('light')}
                className="flex-1 bg-[#1c1c1e] hover:bg-[#2c2c2e] text-white font-semibold py-4 rounded-xl transition-colors border border-white/5"
              >
                Privacy
              </button>
              <button 
                onClick={() => triggerHaptic('medium')}
                className="flex-1 bg-[#0a84ff] hover:bg-[#0070e6] text-white font-semibold py-4 rounded-xl transition-colors shadow-[0_4px_14px_rgba(10,132,255,0.3)]"
              >
                Contact Team
              </button>
            </div>

            <div className="text-center text-[12px] text-[#545458] font-medium mb-4">
              Terms of Service
            </div>
          </div>
        )}

        {/* Заглушки для других вкладок */}
        {activeTab !== 'profile' && (
          <div className="h-full flex items-center justify-center text-gray-500">
            Section under construction
          </div>
        )}

      </main>

      {/* ОВАЛЬНАЯ НАВИГАЦИЯ */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[85%] max-w-sm bg-[#1c1c1e]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] px-2 py-2 z-50 shadow-[0_20px_40px_rgba(0,0,0,0.7)]">
        <div className="flex justify-between items-center">
          {[
            { id: 'arena', icon: <Target size={22} />, label: 'Arena' },
            { id: 'hub', icon: <Shield size={22} />, label: 'Hub' },
            { id: 'news', icon: <Search size={22} />, label: 'Intel' },
            { id: 'profile', icon: <User size={22} />, label: 'Menu' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => { setActiveTab(item.id); triggerHaptic('light'); }}
              className={`flex flex-col items-center justify-center px-4 py-2 rounded-2xl transition-all duration-300 ${
                activeTab === item.id ? 'text-white' : 'text-[#8e8e93] hover:text-gray-400'
              }`}
            >
              <div className={`transition-all duration-300 ${activeTab === item.id ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] scale-110 mb-1' : 'mb-1 scale-100'}`}>
                {item.icon}
              </div>
              <span className={`text-[9px] font-bold tracking-widest uppercase transition-all duration-300 ${activeTab === item.id ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

    </div>
  );
};

export default App;
