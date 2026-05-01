import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  ChevronRight, 
  X, 
  Gem, 
  Wallet, 
  Twitter, 
  Send, 
  Award, 
  Globe, 
  Zap, 
  Smartphone,
  Bell,
  Info,
  ShieldCheck,
  Heart,
  MessageCircle,
  LayoutGrid
} from 'lucide-react';

// Локальный объект переводов, чтобы ничего не отвалилось
const translations = {
  EN: {
    games: "Games", bestWin: "Best win", result: "Result", 
    deposit: "Deposit", level: "Level", earned: "Earned", 
    friends: "Friends", invite: "Invite friends", more: "More", 
    menu: "Menu", language: "Language", tactile: "Haptic Feedback", 
    animated: "Animations", privacy: "Privacy", contact: "Support Team"
  },
  RU: {
    games: "Игры", bestWin: "Лучший вин", result: "Результат", 
    deposit: "Депозит", level: "Уровень", earned: "Заработано", 
    friends: "Друзья", invite: "Пригласить друзей", more: "Еще", 
    menu: "Меню", language: "Язык", tactile: "Виброотклик", 
    animated: "Анимации", privacy: "Приватность", contact: "Поддержка"
  },
  UA: {
    games: "Ігри", bestWin: "Кращий він", result: "Результат", 
    deposit: "Депозит", level: "Рівень", earned: "Зароблено", 
    friends: "Друзі", invite: "Запросити друзів", more: "Ще", 
    menu: "Меню", language: "Мова", tactile: "Віброводгук", 
    animated: "Анімації", privacy: "Приватність", contact: "Підтримка"
  }
};

const Profile = () => {
  // --- СОСТОЯНИЕ (STATE) ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('RU');
  const [user, setUser] = useState({ 
    username: 'ebaldremal1448', 
    avatar: 'https://i.pravatar.cc/150?u=fallback' 
  });
  
  // Настройки интерфейса
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const t = (key) => translations[lang]?.[key] || translations['EN'][key];

  // --- ИНИЦИАЛИЗАЦИЯ ДАННЫХ TELEGRAM ---
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      const u = tg.initDataUnsafe.user;
      setUser({
        username: u.username || u.first_name,
        avatar: u.photo_url || `https://ui-avatars.com/api/?name=${u.first_name}&background=00d2ff&color=fff`
      });
    }
  }, []);

  const languages = [
    { code: 'EN', flag: '🇺🇸', label: 'English' },
    { code: 'RU', flag: '🇷🇺', label: 'Русский' },
    { code: 'UA', flag: '🇺🇦', label: 'Українська' },
    { code: 'KR', flag: '🇰🇷', label: '한국어' },
    { code: 'ZH', flag: '🇨🇳', label: '中文' },
    { code: 'FA', flag: '🇮🇷', label: 'فارسی' }
  ];

  return (
    <div className="w-full flex flex-col font-sans animate-fadeIn select-none pb-20 bg-[#050505] min-h-screen">
      
      {/* --- 1. ВЕРХНЯЯ ПАНЕЛЬ (HEADER) --- */}
      <div className="flex items-center justify-between px-6 mt-6 mb-8">
        <button 
          onClick={() => setIsMenuOpen(true)} 
          className="w-12 h-12 flex items-center justify-center bg-white/5 active:scale-90 transition-all rounded-2xl border border-white/10 shadow-lg"
        >
          <Settings size={22} className="text-zinc-400" />
        </button>
        
        <div className="flex items-center gap-2.5 px-5 py-2.5 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl">
          <Gem size={16} className="text-[#00d2ff] drop-shadow-[0_0_8px_rgba(0,210,255,0.4)]" />
          <span className="text-white font-black text-sm uppercase tracking-wider">0.00 TON</span>
        </div>
      </div>

      {/* --- 2. ОСНОВНАЯ КАРТОЧКА (МАССИВНАЯ) --- */}
      <div className="mx-4 relative group mb-6">
        {/* Фоновое свечение для объема */}
        <div className="absolute inset-0 bg-blue-500/10 blur-[60px] opacity-70" />
        
        <div className="relative overflow-hidden bg-white rounded-[36px] py-10 px-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/30">
          {/* Радужные градиентные шарики (Blobs) */}
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-purple-400/20 blur-[50px] rounded-full" />
          <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-blue-400/20 blur-[55px] rounded-full" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Аватар и Юзер */}
            <div className="flex items-center w-full justify-between mb-10">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400/20 blur-md rounded-[22px]" />
                  <img 
                    src={user.avatar} 
                    className="w-[68px] h-[68px] rounded-[22px] object-cover border-2 border-white shadow-xl relative z-10"
                    alt="User"
                  />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-[24px] font-black text-zinc-900 tracking-tighter leading-tight">
                    @{user.username}
                  </h2>
                  <div className="flex items-center gap-1.5 mt-1">
                    <ShieldCheck size={12} className="text-blue-500" />
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Verified Player</span>
                  </div>
                </div>
              </div>
              
              {/* Компактная стата */}
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <span className="text-xl font-black text-zinc-900 leading-none">0</span>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter mt-1.5">{t('games')}</span>
                </div>
                <div className="w-[1px] h-10 bg-zinc-100 self-center" />
                <div className="flex flex-col items-center">
                  <span className="text-xl font-black text-zinc-900 leading-none">0.0</span>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter mt-1.5">Win</span>
                </div>
              </div>
            </div>
            
            {/* Внутренняя кнопка результата */}
            <button className="w-full py-4.5 bg-zinc-900 text-white rounded-2xl flex items-center justify-center gap-3 active:scale-[0.97] transition-all shadow-xl">
              <Zap size={16} fill="white" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">{t('result')}</span>
              <ChevronRight size={16} className="opacity-50" />
            </button>
          </div>
        </div>
      </div>

      {/* --- 3. ИНВЕНТАРЬ (ИНФО-ПОЛОСА) --- */}
      <div className="mx-6 px-4 py-4 flex justify-between items-center bg-white/5 rounded-2xl border border-white/5 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center">
            <LayoutGrid size={16} className="text-zinc-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Inventory Cost</span>
            <span className="text-xs font-bold text-zinc-500">0 gifts • 0.00 TON</span>
          </div>
        </div>
        <ChevronRight size={18} className="text-zinc-700" />
      </div>

      {/* --- 4. РЕФЕРАЛЬНАЯ КАРТОЧКА (МАССИВНАЯ) --- */}
      <div className="px-10 mb-4">
        <span className="text-[11px] font-black text-zinc-700 uppercase tracking-[0.3em]">Ambassador Program</span>
      </div>

      <div className="mx-4 relative overflow-hidden bg-white rounded-[36px] py-10 px-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] mb-6 border border-white/30">
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
         
         <div className="relative z-10 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-zinc-900 rounded-[22px] flex items-center justify-center shadow-2xl border border-white/10 rotate-3">
                  <Award size={28} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[22px] font-black text-zinc-900 tracking-tight">{t('level')} 1</span>
                    <span className="px-2 py-0.5 bg-blue-600 text-white text-[9px] font-black rounded-full shadow-lg">5%</span>
                  </div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Referral Rewards</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-zinc-400 uppercase mb-1">{t('earned')}</span>
                <span className="text-2xl font-black text-zinc-900 tracking-tighter leading-none">0.00 <span className="text-xs">TON</span></span>
              </div>
            </div>

            {/* Большая черная кнопка инвайта */}
            <button className="w-full py-5 bg-black text-white font-black text-xs uppercase tracking-[0.3em] rounded-[24px] flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all">
              {t('invite')} 
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-black">+</div>
            </button>
         </div>
      </div>

      {/* --- 5. ГЛАВНОЕ МЕНЮ (НАСТРОЙКИ + ЯЗЫКИ) --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-2xl animate-fadeIn" 
            onClick={() => setIsMenuOpen(false)} 
          />
          
          <div className="relative w-full bg-[#0d0d0f] border-t border-white/10 px-8 pt-4 pb-16 animate-slideUp rounded-t-[45px] shadow-[0_-20px_50px_rgba(0,0,0,0.9)]">
            <div className="w-16 h-1.5 bg-white/10 rounded-full mx-auto mt-2 mb-10" />
            
            <div className="flex justify-between items-center mb-10">
               <div>
                 <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">{t('menu')}</h2>
                 <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1">System Configuration v3.4</p>
               </div>
               <button 
                 onClick={() => setIsMenuOpen(false)} 
                 className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center active:scale-90 transition-all border border-white/5"
               >
                 <X size={32} className="text-zinc-500" />
               </button>
            </div>
            
            {/* БЛОК: ВЫБОР ЯЗЫКА (6 СТРАН) */}
            <div className="flex flex-col gap-5 mb-10">
              <div className="flex items-center gap-2 text-zinc-500">
                <Globe size={16} />
                <span className="text-[11px] font-black uppercase tracking-widest">{t('language')}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {languages.map(l => (
                  <button 
                    key={l.code} 
                    onClick={() => setLang(l.code)} 
                    className={`flex flex-col items-center justify-center gap-2 py-4 rounded-3xl border transition-all ${
                      lang === l.code 
                        ? 'bg-white text-black border-white shadow-[0_10px_30px_rgba(255,255,255,0.1)] scale-105' 
                        : 'bg-white/5 text-zinc-500 border-white/5 active:bg-white/10'
                    }`}
                  >
                    <span className="text-2xl">{l.flag}</span>
                    <span className="text-[10px] font-black uppercase">{l.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* БЛОК: iOS ПЕРЕКЛЮЧАТЕЛИ */}
            <div className="flex flex-col gap-4 mb-10">
               <div 
                 className="flex justify-between items-center bg-zinc-900/50 p-6 rounded-[32px] border border-white/5"
                 onClick={() => setHapticEnabled(!hapticEnabled)}
               >
                 <div className="flex items-center gap-4">
                   <Smartphone size={22} className="text-zinc-500" />
                   <span className="text-sm font-bold text-white uppercase tracking-tight">{t('tactile')}</span>
                 </div>
                 <div className={`w-14 h-7 rounded-full relative transition-all duration-300 ${hapticEnabled ? 'bg-[#00d2ff]' : 'bg-zinc-800'}`}>
                   <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-xl transition-all duration-300 ${hapticEnabled ? 'right-1' : 'right-8'}`} />
                 </div>
               </div>

               <div className="flex justify-between items-center bg-zinc-900/50 p-6 rounded-[32px] border border-white/5" onClick={() => setAnimationsEnabled(!animationsEnabled)}>
                 <div className="flex items-center gap-4">
                   <Zap size={22} className="text-zinc-500" />
                   <span className="text-sm font-bold text-white uppercase tracking-tight">{t('animated')}</span>
                 </div>
                 <div className={`w-14 h-7 rounded-full relative transition-all ${animationsEnabled ? 'bg-[#00d2ff]' : 'bg-zinc-800'}`}>
                   <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-xl transition-all ${animationsEnabled ? 'right-1' : 'right-8'}`} />
                 </div>
               </div>
            </div>

            {/* БЛОК: СОЦИАЛКИ */}
            <div className="grid grid-cols-2 gap-4 mb-10">
               <button className="flex items-center justify-center gap-3 py-5 bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 rounded-[28px] active:scale-95 transition-all">
                 <Twitter size={22} className="text-[#1DA1F2]" />
                 <span className="text-xs font-black text-white uppercase tracking-widest">Twitter</span>
               </button>
               <button className="flex items-center justify-center gap-3 py-5 bg-[#0088cc]/10 border border-[#0088cc]/20 rounded-[28px] active:scale-95 transition-all">
                 <Send size={22} className="text-[#0088cc]" />
                 <span className="text-xs font-black text-white uppercase tracking-widest">Telegram</span>
               </button>
            </div>

            {/* ФУТЕР МЕНЮ */}
            <div className="flex gap-4">
              <button className="flex-1 py-5 bg-white/5 text-zinc-500 font-bold rounded-[28px] border border-white/5 uppercase tracking-widest text-[10px] active:bg-white/10">{t('privacy')}</button>
              <button className="flex-[2] py-5 bg-white text-black font-black rounded-[28px] uppercase tracking-[0.25em] text-[10px] shadow-2xl active:scale-[0.98] transition-all">{t('contact')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;