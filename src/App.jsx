import React, { useState, useEffect } from 'react';
import { Target, Crosshair, Search, User, ChevronRight, MessageSquare, Zap, ShieldAlert, Cpu, Share2, Globe } from 'lucide-react';

// --- ЛОКАЛИЗАЦИЯ ---
const dict = {
  en: {
    arena: 'Arena', hub: 'Hub', news: 'News', profile: 'Profile',
    signals: 'Signals & AI', guide: 'Guide',
    askAi: 'What do you want to learn today, fighter?',
    aiPlaceholder: 'Ask about skins, loadouts or prices...',
    mythFact: 'Myth / Fact', mythText: 'Crouching while shooting the AK-47 reduces initial bullet spread.',
    lang: 'Language', referral: 'Referral Program', invite: 'Invite Friends', bonus: 'Get premium features for invites',
    privacy: 'Privacy', contact: 'Contact the Team',
    skills: ['Aiming', 'Peeking', 'Grenades', 'Positioning', 'Economy', 'Maps']
  },
  ru: {
    arena: 'Арена', hub: 'Хаб', news: 'Новости', profile: 'Профиль',
    signals: 'Сигналы и ИИ', guide: 'Гайды',
    askAi: 'Чему хочешь научиться сегодня, боец?',
    aiPlaceholder: 'Спроси про скины, сборки или цены...',
    mythFact: 'Миф / Факт', mythText: 'Стрельба в присяде из AK-47 уменьшает начальный разброс пуль.',
    lang: 'Язык', referral: 'Реферальная программа', invite: 'Пригласить друзей', bonus: 'Получи премиум за приглашения',
    privacy: 'Приватность', contact: 'Связаться с командой',
    skills: ['Аим', 'Пики', 'Гранаты', 'Позиционка', 'Экономика', 'Карты']
  }
};

const App = () => {
  const [activeTab, setActiveTab] = useState('hub');
  const [hubTab, setHubTab] = useState('signals');
  const [lang, setLang] = useState('en');
  const [showSplash, setShowSplash] = useState(true);

  const t = dict[lang] || dict.en;

  useEffect(() => {
    // Инициализация Telegram
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.setHeaderColor('#000000');
    }
    
    // Убираем заставку через 1.8с (плавный переход)
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // --- СПЛЕШ-ЭКРАН (Вспышка) ---
  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-[100] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center animate-[flash_1.8s_ease-out_forwards]">
          <div className="w-10 h-10 bg-white rounded-full blur-xl animate-[expand_1.8s_ease-out_forwards]"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center animate-[float_3s_ease-in-out_infinite]">
          <Crosshair size={48} className="text-white/80 animate-[spin_8s_linear_infinite] mb-4" />
          <div className="text-white font-black tracking-[0.4em] uppercase text-xl">CS2 PRO</div>
        </div>
        <style>{`
          @keyframes flash { 0% { opacity: 0; } 20% { opacity: 1; } 100% { opacity: 0; visibility: hidden; } }
          @keyframes expand { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(50); opacity: 0; } }
          @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        `}</style>
      </div>
    );
  }

  // --- КОМПОНЕНТЫ ---
  const NavBtn = ({ id, icon, label }) => {
    const isActive = activeTab === id;
    return (
      <button 
        onClick={() => {
          setActiveTab(id);
          if (window.Telegram?.WebApp?.HapticFeedback) window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
        }}
        className={`flex flex-col items-center justify-center px-4 py-2 rounded-2xl transition-all duration-300 ${
          isActive ? 'text-white' : 'text-gray-600 hover:text-gray-400'
        }`}
      >
        <div className={`transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] scale-110 mb-1' : 'mb-1 scale-100'}`}>
          {icon}
        </div>
        <span className={`text-[9px] font-bold tracking-widest uppercase transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
          {label}
        </span>
      </button>
    );
  };

  const LangBtn = ({ id, flag, label }) => {
    const isActive = lang === id;
    return (
      <button
        onClick={() => setLang(id)}
        className={`flex items-center space-x-2 px-4 py-2.5 rounded-full font-bold text-sm transition-all ${
          isActive ? 'bg-white text-black' : 'bg-[#151515] border border-white/5 text-gray-300 hover:bg-[#202020]'
        }`}
      >
        <span>{flag}</span>
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-black text-gray-200 font-sans overflow-hidden">
      <main className="flex-1 overflow-y-auto pb-28 px-4 pt-4 animate-in fade-in duration-700">

        {/* ================= ARENA ================= */}
        {activeTab === 'arena' && (
          <div className="flex flex-col h-full items-center justify-center text-center">
            <Target size={48} className="text-white/10 mb-4" />
            <h3 className="text-xl font-black tracking-widest uppercase text-white mb-2">Arena</h3>
            <p className="text-sm text-gray-600">Competitive ecosystem loading...</p>
          </div>
        )}

        {/* ================= HUB (Signals & Guide) ================= */}
        {activeTab === 'hub' && (
          <div className="flex flex-col h-full">
            {/* Переключатель */}
            <div className="flex space-x-6 mb-6 border-b border-white/10 pb-2">
              <button onClick={() => setHubTab('signals')} className={`text-xl font-black uppercase tracking-wide transition-colors ${hubTab === 'signals' ? 'text-white' : 'text-gray-700'}`}>
                {t.signals}
              </button>
              <button onClick={() => setHubTab('guide')} className={`text-xl font-black uppercase tracking-wide transition-colors ${hubTab === 'guide' ? 'text-white' : 'text-gray-700'}`}>
                {t.guide}
              </button>
            </div>

            {/* Signals & AI */}
            {hubTab === 'signals' && (
              <div className="space-y-4">
                <div className="bg-[#111] border border-white/5 p-5 rounded-3xl relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 text-white/5"><Cpu size={100} /></div>
                  <h3 className="text-white font-bold mb-4 flex items-center"><Zap size={18} className="mr-2 text-white/80" /> AI Loadout Assistant</h3>
                  
                  <div className="bg-[#000] rounded-2xl p-4 flex items-center border border-white/10 relative z-10">
                    <MessageSquare size={18} className="text-gray-600 mr-3" />
                    <input type="text" placeholder={t.aiPlaceholder} className="bg-transparent border-none text-sm w-full outline-none text-white placeholder-gray-700" />
                  </div>
                  
                  <div className="flex space-x-2 mt-4 overflow-x-auto pb-1 scrollbar-hide relative z-10">
                    <span className="text-[11px] font-medium bg-white/5 border border-white/5 px-4 py-2 rounded-full whitespace-nowrap text-gray-300 hover:text-white transition cursor-pointer">"Make a green set"</span>
                    <span className="text-[11px] font-medium bg-white/5 border border-white/5 px-4 py-2 rounded-full whitespace-nowrap text-gray-300 hover:text-white transition cursor-pointer">"Budget clean setup"</span>
                  </div>
                </div>

                <h4 className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mt-6 mb-2">Market Trends</h4>
                <div className="bg-[#111] border border-white/5 p-4 rounded-2xl flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white text-sm">Desert Eagle | Printstream</div>
                    <div className="text-[10px] text-gray-500 mt-1">Strong Buy Signal</div>
                  </div>
                  <div className="text-white font-mono text-sm">+8.4%</div>
                </div>
              </div>
            )}

            {/* Guide */}
            {hubTab === 'guide' && (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-bold text-white/90 mb-6 leading-tight">{t.askAi}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {t.skills.map((skill, i) => (
                    <button key={i} className="bg-[#111] border border-white/5 py-5 rounded-2xl font-bold text-sm text-gray-400 hover:bg-[#151515] hover:text-white hover:border-white/20 transition-all">
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= NEWS (Intel) ================= */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-wide text-white mb-6">Intel</h2>
            
            <div className="bg-gradient-to-br from-[#151515] to-[#0a0a0a] border border-white/10 p-5 rounded-3xl">
              <div className="flex items-center text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3">
                <ShieldAlert size={14} className="mr-1.5 text-white/80" /> {t.mythFact}
              </div>
              <p className="text-sm font-medium text-gray-200 mb-6 leading-relaxed">"{t.mythText}"</p>
              <div className="flex space-x-3">
                <button className="flex-1 bg-black border border-white/10 py-3 rounded-xl text-xs font-bold text-gray-400 hover:text-white hover:border-white/30 transition">MYTH</button>
                <button className="flex-1 bg-white text-black py-3 rounded-xl text-xs font-bold hover:bg-gray-200 transition">FACT</button>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-3">Live Feed</h3>
              <div className="space-y-3">
                {[
                  { source: 'HLTV', time: '10m ago', text: 'Valve releases new patch fixing subtick movement issues.' },
                  { source: 'CS2 Official', time: '2h ago', text: 'New case drop pool analyzed by community data miners.' }
                ].map((news, i) => (
                  <div key={i} className="bg-[#111] p-4 rounded-2xl border border-white/5 hover:border-white/10 transition cursor-pointer">
                    <div className="text-[10px] text-gray-600 font-bold mb-1.5 uppercase tracking-wider">{news.source} • {news.time}</div>
                    <div className="font-medium text-sm text-gray-300 leading-snug">{news.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= PROFILE ================= */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h1 className="text-2xl font-black uppercase tracking-wide text-white mb-6">{t.profile}</h1>

            <div className="mb-8">
              <div className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-3">{t.lang}</div>
              <div className="flex flex-wrap gap-2">
                <LangBtn id="en" flag="🇺🇸" label="EN" />
                <LangBtn id="ru" flag="🇷🇺" label="RU" />
                <LangBtn id="ua" flag="🇺🇦" label="UA" />
                <LangBtn id="kr" flag="🇰🇷" label="한국" />
                <LangBtn id="zh" flag="🇨🇳" label="繁體" />
              </div>
            </div>

            <div className="bg-[#111] p-5 rounded-3xl border border-white/5 flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-[#222] flex items-center justify-center border border-white/10">
                <User size={24} className="text-gray-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white tracking-wide">Classified Agent</h3>
                <span className="text-[10px] uppercase tracking-widest text-gray-500">Premium Tier</span>
              </div>
            </div>

            <div className="bg-[#111] border border-white/5 rounded-3xl p-5 mb-8">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-bold text-white">{t.referral}</h4>
                  <p className="text-xs text-gray-500 mt-1">{t.bonus}</p>
                </div>
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white"><Share2 size={16} /></div>
              </div>
              <button className="w-full bg-white text-black font-bold py-3.5 rounded-xl text-sm hover:bg-gray-200 transition">
                {t.invite}
              </button>
            </div>

            <div className="flex space-x-3 pb-8">
              <button className="flex-1 bg-[#111] border border-white/5 hover:border-white/20 text-gray-400 hover:text-white font-bold text-xs py-4 rounded-2xl transition uppercase tracking-widest">
                {t.privacy}
              </button>
              <button className="flex-1 bg-[#111] border border-white/5 hover:border-white/20 text-gray-400 hover:text-white font-bold text-xs py-4 rounded-2xl transition uppercase tracking-widest">
                {t.contact}
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ================= ОВАЛЬНАЯ НАВИГАЦИЯ ================= */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[85%] max-w-sm bg-[#111111]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] px-2 py-2 z-50 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
        <div className="flex justify-between items-center">
          <NavBtn id="arena" icon={<Target size={22} />} label="Arena" />
          <NavBtn id="hub" icon={<Crosshair size={22} />} label="Hub" />
          <NavBtn id="news" icon={<Search size={22} />} label="News" />
          <NavBtn id="profile" icon={<User size={22} />} label="Profile" />
        </div>
      </nav>

    </div>
  );
};

export default App;
