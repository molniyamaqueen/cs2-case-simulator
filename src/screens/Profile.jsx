import React, { useState, useEffect } from 'react';
import { Settings, ChevronRight, Plus, Users, WalletCards, Gem, Shield, Smartphone } from 'lucide-react';
import { getTelegramUser, generateRefLink, copyToClipboard } from '../services/api';
import { useLanguage } from '../i18n/LanguageContext';

const Profile = () => {
  const { lang, setLang, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tgUser, setTgUser] = useState(null);
  const [copyStatus, setCopyStatus] = useState(t('invite_btn'));
  
  const [anonMode, setAnonMode] = useState(false);
  const [streamerMode, setStreamerMode] = useState(false);
  const [tactile, setTactile] = useState(true);

  useEffect(() => {
    setTgUser(getTelegramUser());
    setCopyStatus(t('invite_btn'));
  }, [lang, t]);

  const triggerHaptic = () => {
    try { window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light'); } catch (e) {}
  };

  const handleInvite = () => {
    if (tgUser?.id) {
      const link = generateRefLink(tgUser.id);
      copyToClipboard(link);
      setCopyStatus(t('link_copied'));
      setTimeout(() => setCopyStatus(t('invite_btn')), 2000);
    }
  };

  if (!tgUser) return <div className="pt-20 text-center font-black">Loading...</div>;

  return (
    <div className="min-h-full px-5 pt-4 pb-32 animate-in fade-in duration-500">
      
      {/* ВЕРХНЯЯ ПАНЕЛЬ */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => { setIsMenuOpen(true); triggerHaptic(); }} className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center active:scale-95 transition-all">
          <Settings size={24} className="text-zinc-400" />
        </button>
        <div className="bg-white/5 px-6 py-3 rounded-full flex items-center gap-2 border border-white/5">
          <Gem size={18} className="text-cyan-400" />
          <span className="text-base font-black tracking-wide">0 TON</span>
        </div>
      </div>

      {/* ЛЕГЕНДАРНАЯ БЕЛАЯ КАРТОЧКА (Холодные синие/голубые капли) */}
      <div className="w-full rounded-[32px] bg-gradient-to-b from-white via-zinc-100 to-zinc-300 p-6 mb-8 shadow-[0_0_40px_rgba(255,255,255,0.1)] relative overflow-hidden">
        {/* Цветные капли заменены на ледяной/кибер стиль */}
        <div className="absolute top-4 left-10 w-4 h-4 bg-blue-500 rounded-full blur-[3px] opacity-40" />
        <div className="absolute top-20 right-12 w-5 h-5 bg-cyan-400 rounded-full blur-[4px] opacity-40" />
        <div className="absolute bottom-10 left-1/2 w-8 h-8 bg-sky-300 rounded-full blur-[6px] opacity-40" />
        
        <div className="relative z-10 flex flex-col items-center">
          {/* Аватар и Ник */}
          <div className="flex flex-col items-center mb-6 mt-2">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl mb-3 bg-zinc-200">
                <img src={tgUser.avatar} alt="avatar" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-black">{tgUser.username}</h2>
          </div>
          
          {/* Статистика */}
          <div className="w-full flex gap-3">
            <div className="flex-1 bg-black/5 rounded-[24px] py-4 px-6 flex flex-col items-center justify-center border border-black/5 shadow-inner">
              <span className="text-xl font-black text-black">0</span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase mt-1 tracking-widest">{t('games')}</span>
            </div>
            <div className="flex-1 bg-black/5 rounded-[24px] py-4 px-6 flex flex-col items-center justify-center border border-black/5 shadow-inner">
              <span className="text-xl font-black text-black">0 TON</span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase mt-1 tracking-widest">{t('best_win')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* БЛОК РЕФЕРАЛОВ (Темная стеклянная линза) */}
      <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4 px-2 italic">
        {t('invite_title')} <span className="text-zinc-600 ml-1">💎</span>
      </h3>

      <div className="w-full rounded-[32px] bg-[#09090b]/80 backdrop-blur-xl p-6 mb-6 shadow-2xl border border-white/[0.06] relative overflow-hidden">
        {/* Холодная подсветка внутри темного блока */}
        <div className="absolute top-0 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-[20px]" />

        <div className="flex justify-between items-center mb-5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">{t('level')} 1</span>
            <span className="bg-white/20 text-white text-[11px] font-black px-2 py-1 rounded-full">5%</span>
          </div>
        </div>

        <div className="flex gap-3 relative z-10">
          <div className="flex-1 bg-white/5 rounded-[24px] px-5 py-4 flex items-center justify-between border border-white/[0.03]">
            <div className="flex items-center gap-2 text-zinc-400">
              <WalletCards size={16} className="text-blue-400"/><span className="text-[11px] font-bold uppercase tracking-wider">{t('earned')}</span>
            </div>
            <div className="text-xl font-bold text-white">0</div>
          </div>
          <div className="flex-1 bg-white/5 rounded-[24px] px-5 py-4 flex items-center justify-between border border-white/[0.03]">
            <div className="flex items-center gap-2 text-zinc-400">
              <Users size={16} className="text-cyan-400"/><span className="text-[11px] font-bold uppercase tracking-wider">{t('friends')}</span>
            </div>
            <div className="text-xl font-bold text-white">0</div>
          </div>
        </div>
      </div>

      {/* КНОПКА ПРИГЛАШЕНИЯ (СТРОГАЯ ЧЕРНАЯ, НОЛЬ ФИОЛЕТОВОГО) */}
      <button onClick={handleInvite} className="w-full h-16 bg-black border border-white/10 rounded-full font-bold text-lg text-white flex items-center justify-center gap-3 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.05)] pr-4 transition-transform relative z-10">
        {copyStatus} <Plus size={24} className="bg-white/10 rounded-full p-1.5" />
      </button>

      {/* ШТОРКА МЕНЮ */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div onClick={() => setIsMenuOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" />
          
          <div className="relative w-full bg-[#1c1c1e] rounded-t-[32px] p-6 pb-12 animate-in slide-in-from-bottom-full duration-300 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-white/5">
            <div className="w-12 h-1.5 bg-zinc-600 rounded-full mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-6 text-white italic">{t('menu')}</h3>

            <div className="space-y-8 overflow-y-auto max-h-[60vh] pr-2 pb-10">
              <div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 pr-2">{t('language')}</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'EN', flag: '🇺🇸', label: 'EN' }, { id: 'RU', flag: '🇷🇺', label: 'RU' }, { id: 'KR', flag: '🇰🇷', label: '한국' },
                    { id: 'CN', flag: '🇨🇳', label: '繁體' }, { id: 'UA', flag: '🇺🇦', label: 'UA' }, { id: 'FA', flag: '🇮🇷', label: 'FA' }
                  ].map((l) => (
                    <button 
                      key={l.id}
                      onClick={() => { setLang(l.id); triggerHaptic(); }}
                      className={`h-12 px-4 rounded-full flex items-center justify-center gap-2 text-sm font-bold transition-all ${lang === l.id ? 'bg-white text-black' : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/5'}`}
                    >
                      <span className="text-lg">{l.flag}</span> {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6 pb-10">
                {[
                  { id: 'anon', icon: Shield, color: 'text-blue-400', title: t('anon_mode'), state: anonMode, setState: setAnonMode },
                  { id: 'streamer', icon: Gem, color: 'text-cyan-400', title: t('streamer_mode'), state: streamerMode, setState: setStreamerMode },
                  { id: 'tactile', icon: Smartphone, color: 'text-sky-400', title: t('tactile'), state: tactile, setState: setTactile },
                ].map(item => (
                  <div key={item.id} className="flex justify-between items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/[0.02]">
                    <div className="flex gap-3">
                      <item.icon className={`${item.color} shrink-0 mt-1`} size={20} />
                      <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-widest mb-1">{item.title}</h4>
                    </div>
                    <button onClick={() => { item.setState(!item.state); triggerHaptic(); }} className={`relative w-[50px] h-[28px] rounded-full transition-colors duration-300 shrink-0 ${item.state ? 'bg-blue-500' : 'bg-zinc-600'}`}>
                      <div className={`absolute top-[2px] w-[24px] h-[24px] bg-white rounded-full transition-transform duration-300 shadow-md ${item.state ? 'left-[24px]' : 'left-[2px]'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
