import React, { useState, useEffect } from 'react';
import { Target, Search, BookOpen, User, ChevronRight, Globe, Shield, MessageCircle, Link2 } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Состояния для меню настроек
  const [lang, setLang] = useState('en');
  const [notifs, setNotifs] = useState(true);
  const [haptic, setHaptic] = useState(true);
  const [animations, setAnimations] = useState(true);

  useEffect(() => {
    // Говорим ТГ, что мы готовы мгновенно
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand(); // Открываем на весь экран
    }
  }, []);

  // Функция для тактильного отклика (вибрации)
  const triggerHaptic = () => {
    if (haptic && window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
  };

  // Компонент iOS Тумблера
  const Toggle = ({ active, onChange }) => (
    <div 
      onClick={() => { onChange(!active); triggerHaptic(); }}
      className={`w-[50px] h-[30px] rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${active ? 'bg-blue-500' : 'bg-zinc-700'}`}
    >
      <div className={`bg-white w-[22px] h-[22px] rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${active ? 'translate-x-[20px]' : 'translate-x-0'}`} />
    </div>
  );

  // Компонент кнопки языка
  const LangBtn = ({ id, flag, label }) => {
    const isActive = lang === id;
    return (
      <button
        onClick={() => { setLang(id); triggerHaptic(); }}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full font-bold text-sm transition-all ${
          isActive ? 'bg-white text-black' : 'bg-[#1c1c1e] text-white hover:bg-zinc-800'
        }`}
      >
        <span>{flag}</span>
        <span>{label}</span>
      </button>
    );
  };

  // Навигационная кнопка (Овальная панель)
  const NavButton = ({ id, icon, label }) => {
    const isActive = activeTab === id;
    return (
      <button 
        onClick={() => { setActiveTab(id); triggerHaptic(); }}
        className={`flex flex-col items-center justify-center px-4 py-2 rounded-[20px] transition-all duration-300 ${
          isActive ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        {React.cloneElement(icon, { size: 20, className: isActive ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] mb-1' : 'mb-1' })}
        <span className={`text-[9px] font-bold tracking-wider uppercase ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0c] text-white font-sans overflow-hidden">
      
      <main className="flex-1 overflow-y-auto pb-28 px-4 pt-4">

        {/* --- ЭКРАН МЕНЮ (Как на твоем скрине) --- */}
        {activeTab === 'profile' && (
          <div className="animate-in fade-in duration-300">
            <h1 className="text-2xl font-bold mb-6">Menu</h1>

            {/* БЛОК 1: ЯЗЫКИ */}
            <div className="mb-8">
              <div className="text-[11px] text-gray-500 uppercase tracking-widest font-bold mb-3">Language</div>
              <div className="flex flex-wrap gap-2">
                <LangBtn id="en" flag="🇺🇸" label="EN" />
                <LangBtn id="ru" flag="🇷🇺" label="RU" />
                <LangBtn id="kr" flag="🇰🇷" label="한국" />
                <LangBtn id="zh" flag="🇨🇳" label="繁體" />
                <LangBtn id="ua" flag="🇺🇦" label="UA" />
              </div>
            </div>

            {/* БЛОК 2: ТУМБЛЕРЫ (Настройки) */}
            <div className="space-y-6 mb-8">
              <div>
                <div className="text-[11px] text-gray-500 uppercase tracking-widest font-bold mb-3">Notifications</div>
                <div className="flex justify-between items-center">
                  <Toggle active={notifs} onChange={setNotifs} />
                </div>
              </div>

              <div>
                <div className="text-[11px] text-gray-500 uppercase tracking-widest font-bold mb-3">Tactile Response</div>
                <div className="flex justify-between items-center">
                  <Toggle active={haptic} onChange={setHaptic} />
                </div>
              </div>

              <div>
                <div className="text-[11px] text-gray-500 uppercase tracking-widest font-bold mb-3">Animated Gifts</div>
                <div className="flex justify-between items-center">
                  <Toggle active={animations} onChange={setAnimations} />
                </div>
              </div>
            </div>

            {/* БЛОК 3: ССЫЛКИ */}
            <div className="bg-[#15151a] rounded-2xl overflow-hidden mb-8">
              {[
                { icon: <Globe size={18} className="text-blue-500" />, text: "CS2 Web Portal" },
                { icon: <User size={18} className="text-blue-500" />, text: "My Account" },
                { icon: <Target size={18} className="text-blue-500" />, text: "Mini Games" },
                { icon: <MessageCircle size={18} className="text-blue-500" />, text: "Official Channel" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0 active:bg-white/5 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="font-bold text-sm">{item.text}</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-500" />
                </div>
              ))}
            </div>

            {/* БЛОК 4: КНОПКИ ВНИЗУ */}
            <div className="flex space-x-3 mb-6">
              <button className="flex-1 bg-[#1c1c1e] hover:bg-zinc-800 text-white font-bold py-4 rounded-xl transition-colors">
                Privacy
              </button>
              <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-colors">
                Contact the Team
              </button>
            </div>

            <div className="text-center text-[11px] text-gray-500 font-bold mb-8">
              Terms of Service
            </div>
          </div>
        )}

        {/* ЗАГЛУШКИ ОСТАЛЬНЫХ ВКЛАДОК */}
        {activeTab === 'arena' && <div className="mt-20 text-center text-gray-500">Arena Content</div>}
        {activeTab === 'hub' && <div className="mt-20 text-center text-gray-500">Hub Content</div>}
        {activeTab === 'intel' && <div className="mt-20 text-center text-gray-500">Intel Content</div>}

      </main>

      {/* ОВАЛЬНАЯ НАВИГАЦИЯ */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#15151a]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] px-2 py-2 z-50 shadow-2xl">
        <div className="flex justify-between items-center">
          <NavButton id="arena" icon={<Target />} label="Arena" />
          <NavButton id="hub" icon={<Crosshair />} label="Hub" />
          <NavButton id="intel" icon={<Search />} label="Intel" />
          <NavButton id="profile" icon={<User />} label="Menu" />
        </div>
      </nav>

    </div>
  );
};

export default App;
