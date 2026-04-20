import React, { useState, useEffect } from 'react';
import { Settings, ChevronRight, Plus, Users, WalletCards, Globe, Shield, Smartphone } from 'lucide-react';
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
      
      {/* ВЕРХНЯЯ ПАНЕЛЬ (Убрали лишний TON, оставили только настройки) */}
      <div className="flex justify-end mb-6">
        <button onClick={() => { setIsMenuOpen(true); triggerHaptic(); }} className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
          <Settings size={24} className="text-zinc-400" />
        </button>
      </div>

      {/* БЕЛАЯ КАРТОЧКА ПРОФИЛЯ */}
      <div className="w-full rounded-[32px] bg-gradient-to-b from-white via-zinc-100 to-zinc-300 p-6 mb-8 shadow-[0_0_40px_rgba(255,255,255,0.1)] relative overflow-hidden">
        {/* Орнамент / Игрушки */}
        <div className="absolute top-4 left-10 w-3 h-3 bg-purple-400 rounded-full blur-[2px] opacity-60" />
        <div className="absolute top-20 right-12 w-4 h-4 bg-pink-400 rounded-full blur-[2px] opacity-50" />
        <div className="absolute bottom-10 left-1/2 w-6 h-6 bg-blue-400 rounded-full blur-[4px] opacity-30" />
        
        <div className="relative z-10 flex flex-col items-center">
          
          {/* КРУГЛЫЙ АВАТАР И НИК (Темный текст на белом) */}
          <div className="flex flex-col items-center mb-6 mt-2">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl mb-3">
                <img src={tgUser.avatar} alt="avatar" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-black">{tgUser.username}</h2>
          </div>
          
          {/* СТАТИСТИКА (Темные элементы на белом фоне) */}
          <div className="w-full flex gap-3">
            <div className="flex-1 bg-black/5 rounded-full py-4 px-6 flex flex-col items-center justify-center border border-black/5 shadow-inner">
              <span className="text-xl font-black text-black">0</span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{t('games')}</span>
            </div>
            <div className="flex-1 bg-black/5 rounded-full py-4 px-6 flex flex-col items-center justify-center border border-black/5 shadow-inner">
              <span className="text-xl font-black text-black">0 TON</span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{t('best_win')}</span>
            </div>
          </div>
          {/* Убрали стоимость инвентаря */}
        </div>
      </div>

     {/* СЕКЦИЯ РЕФЕРАЛОВ (Холодный Silver-стиль) */}
      <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4 px-2 italic">
        {t('invite_title')} <span className="text-zinc-600 ml-1">💎</span>
      </h3>

      <div className="w-full rounded-[32px] bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200 p-6 mb-6 shadow-xl border border-white">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-black">{t('level')} 1</span>
            <span className="bg-black/10 text-black text-[11px] font-black px-2 py-1 rounded-full">5%</span>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 bg-white rounded-full px-5 py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 text-zinc-500">
              <WalletCards size={16} className="text-purple-500"/><span className="text-[11px] font-bold uppercase">{t('earned')}</span>
            </div>
            <div className="text-xl font-black text-black">0</div>
          </div>
          <div className="flex-1 bg-white rounded-full px-5 py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 text-zinc-500">
              <Users size={16} className="text-cyan-500"/><span className="text-[11px] font-bold uppercase">{t('friends')}</span>
            </div>
            <div className="text-xl font-black text-black">0</div>
          </div>
        </div>
      </div>

      {/* КНОПКА ПРИГЛАШЕНИЯ (Премиальная черная) */}
      <button onClick={handleInvite} className="w-full h-16 bg-[#18181b] rounded-full font-bold text-lg text-white flex items-center justify-center gap-3 active:scale-95 shadow-xl pr-4 transition-transform">
        {copyStatus} <Plus size={24} className="bg-white/10 text-white rounded-full p-1.5" />
      </button>

      {/* ШТОРКА МЕНЮ (Осталась без изменений) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div onClick={() => setIsMenuOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-full bg-[#1c1c1e] rounded-t-[32px] p-6 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
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
                    <button key={l.id} onClick={() => { setLang(l.id); triggerHaptic(); }} className={`h-12 px-4 rounded-full flex items-center justify-center gap-2 text-sm font-bold transition-all ${lang === l.id ? 'bg-white text-black' : 'bg-white/5 text-zinc-300 hover:bg-white/10'}`}>
                      <span className="text-lg">{l.flag}</span> {l.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
