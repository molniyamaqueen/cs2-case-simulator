import React, { useState, useEffect } from 'react';
import { Settings, Wallet, ChevronRight, Plus, Users, WalletCards, Globe, Shield, Smartphone } from 'lucide-react';
// Импортируем нашу логику и языки
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

  // Подтягиваем данные и обновляем текст кнопки при смене языка
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
        <button onClick={() => { setIsMenuOpen(true); triggerHaptic(); }} className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
          <Settings size={24} className="text-zinc-400" />
        </button>
        <div className="bg-white/5 px-6 py-3 rounded-full flex items-center gap-2 border border-white/5">
          <Wallet size={18} className="text-zinc-300" />
          <span className="text-base font-black tracking-wide">0 TON</span>
        </div>
      </div>

      {/* ГЛАВНАЯ КАРТОЧКА ПРОФИЛЯ */}
      <div className="w-full rounded-[32px] bg-gradient-to-b from-[#3b1d52] via-[#241535] to-[#161618] border border-white/5 p-6 mb-8 shadow-2xl">
        <div className="flex flex-col items-center">
          
          {/* НИК И АВАТАР В ПРЯМОУГОЛЬНИКЕ (СТИЛЬ КИНОЭКРАНА) */}
          <div className="w-full h-24 px-4 py-3 rounded-[28px] flex items-center gap-4 bg-white/5 border border-white/10 mb-6 shadow-xl">
              <div className="w-24 h-16 rounded-[16px] overflow-hidden border border-white/10 bg-black shrink-0 shadow-lg">
                <img src={tgUser.avatar} alt="avatar" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-xl font-bold tracking-tight truncate pr-2 text-white">{tgUser.username}</h2>
          </div>
          
          {/* СТАТИСТИКА */}
          <div className="w-full flex gap-3 mb-6">
            <div className="flex-1 bg-white/5 rounded-full py-5 px-6 flex justify-between items-center">
              <span className="text-[11px] text-zinc-500 font-bold uppercase">{t('games')}</span>
              <span className="text-xl font-bold text-white">0</span>
            </div>
            <div className="flex-1 bg-white/5 rounded-full py-5 px-6 flex justify-between items-center">
              <span className="text-[11px] text-zinc-500 font-bold uppercase">{t('best_win')}</span>
              <span className="text-xl font-bold text-white">0 TON</span>
            </div>
          </div>

          <button className="w-auto py-2 px-6 rounded-full flex items-center justify-center gap-1 text-zinc-400 text-sm font-medium bg-white/5 hover:text-white transition-colors">
            {t('inventory')} 0 TON • 0 {t('gifts')} <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* СЕКЦИЯ РЕФЕРАЛОВ */}
      <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4 px-2 italic">
        {t('invite_title')} <span className="text-zinc-600 ml-1">💎</span>
      </h3>

      <div className="w-full rounded-[32px] bg-gradient-to-br from-[#4a246b] via-[#2c1345] to-[#18181b] p-6 mb-6 shadow-2xl border border-white/5">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">{t('level')} 1</span>
            <span className="bg-white/20 text-white text-[11px] font-black px-2 py-1 rounded-full">5%</span>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex-1 bg-white/5 rounded-full px-6 py-5 flex items-center justify-between border border-white/[0.03]">
            <div className="flex items-center gap-2 text-zinc-400">
              <WalletCards size={16} className="text-purple-400"/><span className="text-sm font-medium">{t('earned')}</span>
            </div>
            <div className="text-2xl font-bold flex items-center gap-1 text-white">0 <span className="text-zinc-500 text-lg">💎</span></div>
          </div>
          <div className="flex-1 bg-white/5 rounded-full px-6 py-5 flex items-center justify-between border border-white/[0.03]">
            <div className="flex items-center gap-2 text-zinc-400">
              <Users size={16} className="text-cyan-400"/><span className="text-sm font-medium">{t('friends')}</span>
            </div>
            <div className="text-2xl font-bold text-white">0</div>
          </div>
        </div>
      </div>

      {/* КНОПКА ПРИГЛАШЕНИЯ */}
      <button onClick={handleInvite} className="w-full h-16 bg-[#a855f7] rounded-full font-bold text-lg text-white flex items-center justify-center gap-3 active:scale-95 shadow-[0_0_30px_rgba(168,85,247,0.3)] pr-4 transition-transform">
        {copyStatus} <Plus size={24} className="bg-white/20 rounded-full p-1.5" />
      </button>

      {/* ШТОРКА МЕНЮ */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div onClick={() => setIsMenuOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" />
          
          <div className="relative w-full bg-[#1c1c1e] rounded-t-[32px] p-6 pb-12 animate-in slide-in-from-bottom-full duration-300 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            <div className="w-12 h-1.5 bg-zinc-600 rounded-full mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-6 text-white italic">{t('menu')}</h3>

            <div className="space-y-8 overflow-y-auto max-h-[60vh] pr-2 pb-10">
              
              {/* ЯЗЫКИ (Все 6 языков) */}
              <div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 pr-2">{t('language')}</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'EN', flag: '🇺🇸', label: 'EN' },
                    { id: 'RU', flag: '🇷🇺', label: 'RU' },
                    { id: 'KR', flag: '🇰🇷', label: '한국' },
                    { id: 'CN', flag: '🇨🇳', label: '繁體' },
                    { id: 'UA', flag: '🇺🇦', label: 'UA' },
                    { id: 'FA', flag: '🇮🇷', label: 'FA' }
                  ].map((l) => (
                    <button 
                      key={l.id}
                      onClick={() => { setLang(l.id); triggerHaptic(); }}
                      className={`h-12 px-4 rounded-full flex items-center justify-center gap-2 text-sm font-bold transition-all ${lang === l.id ? 'bg-white text-black' : 'bg-white/5 text-zinc-300 hover:bg-white/10'}`}
                    >
                      <span className="text-lg">{l.flag}</span> {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* НАСТРОЙКИ (Тумблеры) */}
              <div className="space-y-6">
                {[
                  { id: 'anon', icon: Shield, color: 'text-purple-400', title: t('anon_mode'), desc: t('anon_desc'), state: anonMode, setState: setAnonMode },
                  { id: 'streamer', icon: Globe, color: 'text-cyan-400', title: t('streamer_mode'), desc: t('streamer_desc'), state: streamerMode, setState: setStreamerMode },
                  { id: 'tactile', icon: Smartphone, color: 'text-yellow-400', title: t('tactile'), desc: '', state: tactile, setState: setTactile },
                ].map(item => (
                  <div key={item.id} className="flex justify-between items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/[0.02]">
                    <div className="flex gap-3">
                      <item.icon className={`${item.color} shrink-0 mt-1`} size={20} />
                      <div>
                        <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-widest mb-1">{item.title}</h4>
                        {item.desc && <p className="text-sm text-zinc-500 leading-snug">{item.desc}</p>}
                      </div>
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
