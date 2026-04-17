import React, { useState, useEffect } from 'react';
import { Target, Search, BookOpen, User, Globe, MessageSquare, Crosshair, Zap, ShieldAlert, Cpu } from 'lucide-react';

// --- СИСТЕМА ЛОКАЛИЗАЦИИ (i18n) ---
const translations = {
  en: {
    arena: 'Arena', hub: 'Hub', intel: 'Intel', profile: 'Profile',
    signalsAi: 'Signals & AI', guide: 'Guide',
    askAi: 'What do you want to learn today, fighter?',
    loading: 'Decrypting data...',
    privacy: 'Privacy', contact: 'Contact Team',
    mythFact: 'Myth / Fact',
    aiPlaceholder: 'Ask about skins or loadouts...'
  },
  ru: {
    arena: 'Арена', hub: 'Хаб', intel: 'Интел', profile: 'Профиль',
    signalsAi: 'Сигналы и ИИ', guide: 'Гайды',
    askAi: 'Чему хочешь научиться сегодня, боец?',
    loading: 'Расшифровка данных...',
    privacy: 'Приватность', contact: 'Связаться с нами',
    mythFact: 'Миф / Факт',
    aiPlaceholder: 'Спроси про скины или сборки...'
  }
};

const App = () => {
  // --- СОСТОЯНИЯ (STATE) ---
  const [activeTab, setActiveTab] = useState('hub');
  const [hubSubTab, setHubSubTab] = useState('signals'); // 'signals' | 'guide'
  const [lang, setLang] = useState('en');
  
  // Система оптимизации загрузки (Performance)
  const [showSplash, setShowSplash] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const t = translations[lang];

  // --- ЛОГИКА ЗАГРУЗКИ ---
  useEffect(() => {
    // 1. Сплэш-скрин исчезает через 2.5 секунды
    const splashTimer = setTimeout(() => setShowSplash(false), 2500);
    
    // 2. Имитация подгрузки тяжелых данных (стейт скелетонов)
    const dataTimer = setTimeout(() => setIsDataLoaded(true), 3500);

    // Говорим ТГ, что мы готовы мгновенно
    if (window.Telegram?.WebApp) window.Telegram.WebApp.ready();

    return () => { clearTimeout(splashTimer); clearTimeout(dataTimer); };
  }, []);

  // --- КОМПОНЕНТЫ ---

  // Сплэш-экран (Black Edition Flash)
  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-[#050505] flex items-center justify-center z-[100] overflow-hidden">
        {/* Анимация вспышки */}
        <div className="absolute w-full h-full bg-white opacity-0 animate-[flash_2.5s_ease-out_forwards]"></div>
        
        {/* Имитация вращающихся силуэтов (потом заменишь на SVG оружия) */}
        <div className="relative z-10 flex flex-col items-center animate-[float_4s_ease-in-out_infinite]">
          <Crosshair size={64} className="text-white/20 mb-4 animate-[spin_10s_linear_infinite]" />
          <div className="text-white font-black tracking-[0.3em] uppercase text-xl blur-[1px] animate-[focus_2s_forwards_0.5s]">
            CS2 PRO
          </div>
        </div>
      </div>
    );
  }

  // Навигационная кнопка
  const NavButton = ({ id, icon, label }) => {
    const isActive = activeTab === id;
    return (
      <button 
        onClick={() => setActiveTab(id)}
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
    <div className="flex flex-col h-screen bg-[#050505] text-gray-200 font-sans overflow-hidden">
      
      {/* ГЛОБАЛЬНЫЕ СТИЛИ ДЛЯ АНИМАЦИЙ (Инъекция) */}
      <style>{`
        @keyframes flash {
          0% { opacity: 0; scale: 0.8; }
          20% { opacity: 1; scale: 1.1; }
          100% { opacity: 0; scale: 1.5; display: none; }
        }
        @keyframes focus {
          to { filter: blur(0px); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .skeleton {
          background: linear-gradient(90deg, #111 25%, #1a1a1a 50%, #111 75%);
          background-size: 200% 100%;
          animation: skeleton-load 1.5s infinite;
        }
        @keyframes skeleton-load {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <main className="flex-1 overflow-y-auto pb-28 px-4 pt-4">

        {/* --- TAB: HUB (DUAL TAB LOGIC) --- */}
        {activeTab === 'hub' && (
          <div className="animate-in fade-in duration-500 h-full flex flex-col">
            {/* Dual Header Switcher */}
            <div className="flex space-x-4 mb-6">
              <button 
                onClick={() => setHubSubTab('signals')}
                className={`text-2xl font-black uppercase tracking-tight transition-colors ${hubSubTab === 'signals' ? 'text-white' : 'text-gray-700'}`}
              >
                {t.signalsAi}
              </button>
              <button 
                onClick={() => setHubSubTab('guide')}
                className={`text-2xl font-black uppercase tracking-tight transition-colors ${hubSubTab === 'guide' ? 'text-white' : 'text-gray-700'}`}
              >
                {t.guide}
              </button>
            </div>

            {/* Sub-tab: Signals & AI */}
            {hubSubTab === 'signals' && (
              <div className="space-y-4">
                {/* AI Assistant Block */}
                <div className="bg-[#0f0f13] border border-white/5 p-4 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 text-white/5"><Cpu size={64} /></div>
                  <h3 className="text-white font-bold mb-2 flex items-center"><Zap size={16} className="mr-2" /> AI Loadout Assistant</h3>
                  <div className="bg-[#050505] rounded-xl p-3 flex items-center border border-white/5 mt-4">
                    <MessageSquare size={16} className="text-gray-500 mr-2" />
                    <input type="text" placeholder={t.aiPlaceholder} className="bg-transparent border-none text-sm w-full outline-none text-white placeholder-gray-600" />
                  </div>
                  <div className="flex space-x-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
                    <span className="text-[10px] bg-white/5 px-3 py-1.5 rounded-full whitespace-nowrap">"All green set"</span>
                    <span className="text-[10px] bg-white/5 px-3 py-1.5 rounded-full whitespace-nowrap">"Budget clean setup"</span>
                  </div>
                </div>

                {/* Skeletons if loading */}
                {!isDataLoaded ? (
                  <div className="space-y-3 mt-6">
                    <div className="h-16 rounded-xl skeleton w-full"></div>
                    <div className="h-16 rounded-xl skeleton w-full"></div>
                  </div>
                ) : (
                  <div className="space-y-3 mt-6">
                    <div className="bg-[#0f0f13] p-4 rounded-xl border border-white/5 flex justify-between items-center">
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">Meta Insight</div>
                        <div className="font-bold text-white">AUG Usage +14% in Pro Scene</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Sub-tab: Guide */}
            {hubSubTab === 'guide' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-4">{t.askAi}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Aiming', 'Peeking', 'Grenades', 'Positioning', 'Economy', 'Maps'].map(skill => (
                    <button key={skill} className="bg-[#0f0f13] border border-white/5 py-4 rounded-xl font-bold text-sm hover:bg-white/5 transition text-gray-300 hover:text-white">
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- TAB: INTEL --- */}
        {activeTab === 'intel' && (
          <div className="animate-in fade-in duration-500 space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-4">{t.intel}</h2>
            
            {/* Myth / Fact Interactive Card */}
            <div className="bg-gradient-to-br from-[#1a1a24] to-[#0f0f13] border border-white/10 p-5 rounded-2xl">
              <div className="flex items-center text-[10px] uppercase tracking-widest text-gray-400 mb-2">
                <ShieldAlert size={12} className="mr-1" /> {t.mythFact}
              </div>
              <p className="text-sm font-bold text-white mb-4">"Crouching while shooting the AK-47 reduces initial bullet spread."</p>
              <div className="flex space-x-3">
                <button className="flex-1 bg-white/5 py-2 rounded-lg text-xs font-bold hover:bg-white/10 transition">MYTH</button>
                <button className="flex-1 bg-white/5 py-2 rounded-lg text-xs font-bold hover:bg-white/10 transition">FACT</button>
              </div>
            </div>

            {/* Auto News Feed Placeholder */}
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">Live Feed</h3>
              {!isDataLoaded ? (
                 <div className="space-y-3"><div className="h-20 rounded-xl skeleton"></div></div>
              ) : (
                <div className="bg-[#0f0f13] p-4 rounded-xl border border-white/5">
                  <div className="text-[10px] text-gray-500 mb-1">Source: HLTV • 10m ago</div>
                  <div className="font-bold text-sm text-white">Valve releases new patch fixing subtick movement issues.</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- TAB: PROFILE --- */}
        {activeTab === 'profile' && (
          <div className="animate-in fade-in duration-500 space-y-6">
            {/* Top Bar: Language Selector */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-white">{t.profile}</h2>
              <button 
                onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
                className="bg-[#0f0f13] border border-white/10 px-3 py-1.5 rounded-full flex items-center text-xs font-bold"
              >
                <Globe size={14} className="mr-1.5 text-gray-400" />
                {lang === 'en' ? 'EN' : 'RU'}
              </button>
            </div>

            {/* User Info */}
            <div className="bg-gradient-to-r from-[#111] to-[#0a0a0a] p-5 rounded-2xl border border-white/5 flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 p-0.5">
                 <div className="w-full h-full bg-[#1a1a1a] rounded-full flex items-center justify-center">
                   <User size={24} className="text-white/50" />
                 </div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Classified Agent</h3>
                <span className="text-[10px] uppercase tracking-widest text-gray-500">Premium Tier</span>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="space-y-2 mt-auto pt-8">
              <button className="w-full bg-[#0f0f13] border border-white/5 py-4 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition uppercase tracking-widest">
                {t.privacy}
              </button>
              <button className="w-full bg-[#0f0f13] border border-white/5 py-4 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition uppercase tracking-widest">
                {t.contact}
              </button>
            </div>
          </div>
        )}

        {/* --- TAB: ARENA --- */}
        {activeTab === 'arena' && (
          <div className="flex flex-col h-full items-center justify-center text-center mt-20 animate-in fade-in duration-500">
            <Target size={48} className="text-white/20 mb-4" />
            <h3 className="text-xl font-black tracking-widest uppercase text-white mb-2">Arena</h3>
            <p className="text-sm text-gray-600 w-2/3">Skill-based matchmaking is offline.</p>
          </div>
        )}

      </main>

      {/* --- PREMIUM BOTTOM NAVIGATION (OVAL) --- */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#0f0f13]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] px-2 py-2 z-50 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
        <div className="flex justify-between items-center">
          <NavButton id="arena" icon={<Target />} label={t.arena} />
          <NavButton id="hub" icon={<Crosshair />} label={t.hub} />
          <NavButton id="intel" icon={<Search />} label={t.intel} />
          <NavButton id="profile" icon={<User />} label={t.profile} />
        </div>
      </nav>

    </div>
  );
};

export default App;
