import React, { useState, useEffect } from 'react';
import { Store, Gamepad2, Gift } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('market');

  const triggerHaptic = () => {
    try {
      if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
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
        // Делаем плашку аккуратнее: w-[72px] h-[52px], идеальный радиус rounded-[22px]
        className={`relative flex flex-col items-center justify-center w-[72px] h-[52px] rounded-[22px] transition-all duration-300 ${
          isActive 
            ? 'bg-[#000000]' // Идеально чистый черный, без грязных теней
            : 'bg-transparent'
        }`}
        // Светло-серый цвет для неактивных, чтобы они читались
        style={{ color: isActive ? activeColor : '#98989f' }} 
      >
        <div className={`mb-0.5 transition-transform duration-300 ${isActive ? 'scale-105' : 'scale-100'}`}>
          {React.cloneElement(icon, { size: 24, strokeWidth: isActive ? 2.5 : 2 })}
        </div>
        
        <span className={`text-[11px] tracking-[0.01em] transition-all duration-300 ${
          isActive ? 'font-bold' : 'font-medium'
        }`}>
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#000000] text-white overflow-hidden font-sans">
      
      <main className="flex-1 flex items-center justify-center">
         <p className="text-[#18181a] font-black text-2xl tracking-widest uppercase">{activeTab}</p>
      </main>

      <div className="fixed bottom-6 w-full flex justify-center z-50 px-4">
        {/* Убрал лишнюю ширину, сделал отступы внутри (p-2) чуть больше, чтобы дышало */}
        <nav className="w-full max-w-[370px] bg-[#18181a] rounded-[36px] p-2 flex justify-between items-center border border-white/[0.03] shadow-2xl">
          
          <NavItem id="market" label="Market" icon={<Store />} activeColor="#ffffff" />
          <NavItem id="games" label="Games" icon={<Gamepad2 />} activeColor="#c061ff" />
          <NavItem id="gifts" label="My gifts" icon={<Gift />} activeColor="#ffffff" />
          <NavItem id="profile" isAvatar={true} />

        </nav>
      </div>

    </div>
  );
};

export default App;

import { useState, useEffect } from 'react';
import './index.css';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('market');
  const [isPro, setIsPro] = useState(false);
  const [userId, setUserId] = useState('000000');
  const [aiReport, setAiReport] = useState('');

  // Инициализация Telegram Web App
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    const uid = tg.initDataUnsafe?.user?.id || '777888';
    setUserId(uid);

    // Проверяем статус из ссылки (для теста можно поставить true)
    const params = new URLSearchParams(window.location.search);
    if (params.get('status') === 'pro') {
      setIsPro(true);
    }
  }, []);

  const triggerHaptic = (style = 'light') => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
    }
  };

  const navTo = (screen) => {
    triggerHaptic('light');
    setActiveScreen(screen);
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

  return (
    <div className="app-container">
      {/* SCREEN: MARKET */}
      <div className={`screen ${activeScreen === 'market' ? 'active' : ''}`}>
        <div className="header-flex">
          <span>TERMINAL V5.0</span>
          <span className="online-status">ONLINE 🟢</span>
        </div>
        
        <div className="card ai-box">
          <div className="ai-title">AI ANALYZER PRO</div>
          <input 
            type="text" 
            placeholder={isPro ? "Название скина..." : "💎 Доступно только для PRO"} 
            onKeyDown={handleAiScan}
            disabled={!isPro}
          />
          {aiReport && <div className="ai-report">{aiReport}</div>}
        </div>

        <div className="market-list">
          <div className="card item-card covert">
            <span className="badge">COVERT</span>
            <b>M4A1-S | Printstream</b>
            <div className="price">$142.10</div>
          </div>
          <div className="card item-card rare">
            <span className="badge">RARE</span>
            <b>AK-47 | Slate</b>
            <div className="price">$4.50</div>
          </div>
        </div>
      </div>

      {/* SCREEN: NEWS */}
      <div className={`screen ${activeScreen === 'news' ? 'active' : ''}`}>
        <div className="header-flex" style={{ color: 'var(--blue)' }}>
          <span>MARKET INSIDER</span>
          <span className="online-status">AUTO-SYNC</span>
        </div>
        
        <div className="card signals-box">
          <div className="signals-title">🎯 СИГНАЛЫ ДНЯ (TOP ROI)</div>
          <div className="signal-item">🔥 AK-47 | Ice Coaled (FN) {'->'} <span className="profit">+14%</span></div>
          <div className="signal-item">📈 Desert Eagle | Printstream {'->'} <span className="profit">+8%</span></div>
        </div>

        <div className="card news-item">
          <div className="news-date">TODAY <span className="news-tag">HOT</span></div>
          <b>Обновление алгоритмов Buff163</b>
          <p>AI теперь точнее предсказывает падение цен на кейсы после 18:00 по МСК.</p>
        </div>
      </div>

      {/* SCREEN: PROFILE & EARN */}
      <div className={`screen ${activeScreen === 'profile' ? 'active' : ''}`}>
        <div className="card profile-header">
          <div className="avatar">👤</div>
          <h2 style={{ color: isPro ? 'var(--gold)' : '#fff' }}>
            {isPro ? 'PRIME PRO' : 'FREE MEMBER'}
          </h2>
          <p className="user-id">ID: #{userId}</p>
        </div>
        
        <div className="card">
          <h4>EARN REWARDS (ЗАДАНИЯ)</h4>
          <div className="task-row">
            <div>
              <b>Subscribe to Channel</b><br/>
              <span className="profit">+500 Points</span>
            </div>
            <button className="btn-go">GO</button>
          </div>
        </div>

        <div className="card">
          <h4>INVITE SYSTEM</h4>
          <div className="ref-link">t.me/cs_pro_bot?start={userId}</div>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <nav className="nav-bar">
        <div className={`nav-item ${activeScreen === 'market' ? 'active' : ''}`} onClick={() => navTo('market')}>
          <span className="nav-icon">📊</span>MARKET
        </div>
        <div className={`nav-item ${activeScreen === 'news' ? 'active' : ''}`} onClick={() => navTo('news')}>
          <span className="nav-icon">🗞</span>NEWS
        </div>
        <div className={`nav-item ${activeScreen === 'profile' ? 'active' : ''}`} onClick={() => navTo('profile')}>
          <span className="nav-icon">👤</span>PROFILE
        </div>
      </nav>
    </div>
  );
}
