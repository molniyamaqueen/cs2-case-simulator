import React, { useState, useEffect } from 'react';
import { Store, Newspaper, Gift } from 'lucide-react'; // Обновил иконки под наши разделы
import './index.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('market');
  const [isPro, setIsPro] = useState(false);
  const [userId, setUserId] = useState('000000');
  const [aiReport, setAiReport] = useState('');

  // Инициализация Telegram
  useEffect(() => {
    try {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
        if (window.Telegram.WebApp.setHeaderColor) {
            window.Telegram.WebApp.setHeaderColor('#000000');
        }
        
        const uid = window.Telegram.WebApp.initDataUnsafe?.user?.id || '777888';
        setUserId(uid);
      }
    } catch (e) {}

    // Проверяем статус
    const params = new URLSearchParams(window.location.search);
    if (params.get('status') === 'pro') {
      setIsPro(true);
    }
  }, []);

  const triggerHaptic = (style = 'light') => {
    try {
      if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
      }
    } catch (e) {}
  };

  const handleAiScan = (e) => {
    if (e.key === 'Enter') {
      triggerHaptic('medium');
      setAiReport('📡 Analyzing neural paths...');
      setTimeout(() => {
        setAiReport(`✅ ${e.target.value}: Потенциал +${(Math.random() * 12).toFixed(1)}% ROI в течение 48ч.`);
      }, 1000);
    }
  };

  // Твой крутой компонент навигации
  const NavItem = ({ id, label, icon, activeColor, isAvatar }) => {
    const isActive = activeTab === id;

    if (isAvatar) {
      return (
        <button
          onClick={() => { setActiveTab(id); triggerHaptic(); }}
          className={`w-[44px] h-[44px] rounded-full overflow-hidden shrink-0 transition-all duration-300 ${
            isActive ? 'ring-2 ring-white/20 scale-105' : 'ring-0 opacity-80 hover:opacity-100'
          }`}
        >
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100" 
            alt="Profile" 
            className="w-full h-full object-cover" 
          />
        </button>
      );
    }

    return (
      <button
        onClick={() => { setActiveTab(id); triggerHaptic(); }}
        className={`relative flex flex-col items-center justify-center w-[72px] h-[52px] rounded-[22px] transition-all duration-300 ${
          isActive ? 'bg-[#000000]' : 'bg-transparent'
        }`}
        style={{ color: isActive ? activeColor : '#98989f' }} 
      >
        <div className={`mb-0.5 transition-transform duration-300 ${isActive ? 'scale-105' : 'scale-100'}`}>
          {React.cloneElement(icon, { size: 24, strokeWidth: isActive ? 2.5 : 2 })}
        </div>
        <span className={`text-[11px] tracking-[0.01em] transition-all duration-300 ${isActive ? 'font-bold' : 'font-medium'}`}>
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#000000] text-white overflow-hidden font-sans relative">
      
      {/* КОНТЕНТНАЯ ЧАСТЬ (Экраны) */}
      <main className="flex-1 overflow-y-auto pb-[100px] pt-4 px-4">
        
        {/* SCREEN: MARKET */}
        <div className={activeTab === 'market' ? 'block' : 'hidden'}>
          <div className="header-flex mb-4">
            <span className="font-black text-xl tracking-widest">TERMINAL</span>
            <span className="text-[#00ffcc] text-xs font-bold tracking-widest">ONLINE 🟢</span>
          </div>
          
          <div className="card ai-box mb-4">
            <div className="ai-title">AI ANALYZER PRO</div>
            <input 
              type="text" 
              placeholder={isPro ? "Название скина..." : "💎 Доступно только для PRO"} 
              onKeyDown={handleAiScan}
              disabled={!isPro}
              className="bg-[#111] border border-[#00d2ff]/30 text-white p-3 rounded-xl w-full outline-none focus:border-[#00d2ff] transition-colors"
            />
            {aiReport && <div className="ai-report text-xs text-gray-400 mt-2">{aiReport}</div>}
          </div>

          <div className="space-y-3">
            <div className="card item-card covert p-4 bg-white/5 rounded-2xl border-l-4 border-[#ff4b2b] relative">
              <span className="absolute top-3 right-3 bg-[#00d2ff] text-black text-[9px] font-black px-2 py-1 rounded">COVERT</span>
              <b className="block text-sm">M4A1-S | Printstream</b>
              <div className="text-xl font-black text-[#00d2ff] mt-1">$142.10</div>
            </div>
            <div className="card item-card rare p-4 bg-white/5 rounded-2xl border-l-4 border-[#00d2ff] relative">
              <span className="absolute top-3 right-3 bg-[#00d2ff] text-black text-[9px] font-black px-2 py-1 rounded">RARE</span>
              <b className="block text-sm">AK-47 | Slate</b>
              <div className="text-xl font-black text-[#00d2ff] mt-1">$4.50</div>
            </div>
          </div>
        </div>

        {/* SCREEN: NEWS */}
        <div className={activeTab === 'news' ? 'block' : 'hidden'}>
          <div className="header-flex mb-4 text-[#00d2ff] font-black text-xl">
            <span>INSIDER</span>
          </div>
          
          <div className="p-4 rounded-2xl border border-[#ffd700]/30 bg-[#ffd700]/5 mb-4">
            <div className="text-[#ffd700] text-xs font-black mb-3">🎯 СИГНАЛЫ ДНЯ</div>
            <div className="text-sm mb-2">🔥 AK-47 | Ice Coaled {'->'} <span className="text-[#00ffcc] font-bold">+14%</span></div>
            <div className="text-sm">📈 Deagle | Printstream {'->'} <span className="text-[#00ffcc] font-bold">+8%</span></div>
          </div>

          <div className="p-4 rounded-2xl border border-[#00d2ff]/30 bg-[#00d2ff]/5 border-l-4">
            <div className="text-[10px] text-[#00d2ff] font-bold mb-1">TODAY <span className="bg-[#00d2ff] text-black px-1 rounded ml-1">HOT</span></div>
            <b className="block text-sm">Обновление Buff163</b>
            <p className="text-xs text-gray-400 mt-1">AI точнее предсказывает падение цен на кейсы после 18:00.</p>
          </div>
        </div>

        {/* SCREEN: PROFILE */}
        <div className={activeTab === 'profile' ? 'block' : 'hidden'}>
          <div className="text-center pb-6 border-b border-[#00d2ff]/20 mb-6">
            <div className="text-5xl mb-2">👤</div>
            <h2 className={`text-xl font-black ${isPro ? 'text-[#ffd700]' : 'text-white'}`}>
              {isPro ? 'PRIME PRO' : 'FREE MEMBER'}
            </h2>
            <p className="text-xs text-gray-500">ID: #{userId}</p>
          </div>
          
          <div className="bg-white/5 p-4 rounded-2xl mb-4">
            <h4 className="font-bold text-sm mb-3">EARN REWARDS</h4>
            <div className="flex justify-between items-center">
              <div>
                <b className="text-sm">Subscribe to Channel</b><br/>
                <span className="text-xs text-[#00ffcc]">+500 Points</span>
              </div>
              <button className="bg-[#00d2ff] text-black font-bold py-2 px-4 rounded-xl">GO</button>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl">
            <h4 className="font-bold text-sm mb-2">INVITE LINK</h4>
            <div className="bg-black text-[#00d2ff] border border-dashed border-[#00d2ff] p-3 rounded-xl text-xs text-center">
              t.me/cs_pro_bot?start={userId}
            </div>
          </div>
        </div>

      </main>

      {/* НИЖНЯЯ ПАНЕЛЬ НАВИГАЦИИ (Твой дизайн) */}
      <div className="fixed bottom-6 w-full flex justify-center z-50 px-4">
        <nav className="w-full max-w-[370px] bg-[#18181a] rounded-[36px] p-2 flex justify-between items-center border border-white/[0.03] shadow-2xl">
          <NavItem id="market" label="Market" icon={<Store />} activeColor="#00d2ff" />
          <NavItem id="news" label="News" icon={<Newspaper />} activeColor="#ffd700" />
          <NavItem id="earn" label="Earn" icon={<Gift />} activeColor="#00ffcc" />
          <NavItem id="profile" isAvatar={true} />
        </nav>
      </div>

    </div>
  );
};

export default App;
