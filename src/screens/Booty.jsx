import React, { useState } from 'react';
import { 
  Package, 
  Gamepad2, 
  TrendingUp, 
  Gift, 
  MessageCircle, 
  Send,
  Loader2,
  Check,
  XCircle,
  ExternalLink
} from 'lucide-react';

// Переливающаяся иконка для обычных заданий
const CryptomannIcon = ({ icon: Icon, gradient, shadow, isCompleted }) => (
  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 
    ${isCompleted ? 'bg-[#0a0a0c]' : `animate-iridescent ${gradient} ${shadow}`} 
    border border-white/10 relative overflow-hidden transition-all duration-500`}>
    {!isCompleted && <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50" />}
    <Icon size={28} className={`${isCompleted ? 'text-zinc-600' : 'text-white'} relative z-10`} />
  </div>
);

// --- НОВЫЙ БЛОК: Премиум-карточка соцсетей (как на скрине) ---
const PromoCard = ({ title, icon: Icon, glowClass, reward, actionUrl, onShowToast }) => {
  const [status, setStatus] = useState('go'); // go, check, loading, error, ready, completed
  const [attempts, setAttempts] = useState(0);

  const handleAction = () => {
    if (status === 'go') {
      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.openTelegramLink(actionUrl);
      } else {
        window.open(actionUrl, '_blank');
      }
      setStatus('check');
      return;
    }

    if (status === 'check' || status === 'error') {
      setStatus('loading');
      setTimeout(() => {
        if (attempts === 0) {
          setStatus('error');
          onShowToast('Вы еще не подписались. Попробуйте снова.', 'error');
          setAttempts(1);
        } else {
          setStatus('ready');
          onShowToast('Успешно! Заберите кейсы.', 'success');
        }
      }, 1500);
    } else if (status === 'ready') {
      setStatus('completed');
      onShowToast(`Вы получили +${reward} кейсов!`, 'reward');
    }
  };

  return (
    <div 
      onClick={status !== 'completed' && status !== 'loading' ? handleAction : undefined}
      className={`relative bg-[#0d0d0f] border border-white/[0.04] rounded-[24px] flex flex-col items-center justify-center overflow-hidden transition-all duration-300 min-h-[140px]
        ${status !== 'completed' && status !== 'loading' ? 'cursor-pointer active:scale-[0.98]' : ''}
        ${status === 'completed' ? 'opacity-40 grayscale' : ''}
      `}
    >
      {/* Радиальный свет снизу (Копия стиля со скрина) */}
      <div className={`absolute -bottom-12 left-1/2 -translate-x-1/2 w-40 h-24 blur-[40px] rounded-full ${glowClass} opacity-60`} />
      
      <div className="relative z-10 flex flex-col items-center w-full h-full justify-between py-5">
        <span className="text-zinc-300 font-bold text-[15px] tracking-wide">{title}</span>
        
        <div className="flex-1 flex items-center justify-center my-3 min-h-[40px]">
          {status === 'go' && <Icon size={36} className="text-white drop-shadow-md" />}
          
          {/* Интерактивные статусы вместо иконки */}
          {status === 'check' && (
            <span className="text-white font-bold bg-white/10 px-6 py-2 rounded-full text-sm backdrop-blur-md border border-white/10 shadow-lg">
              Проверить
            </span>
          )}
          {status === 'loading' && <Loader2 size={32} className="text-white animate-spin" />}
          {status === 'error' && (
            <span className="text-red-400 font-bold bg-red-500/10 px-6 py-2 rounded-full text-sm border border-red-500/20">
              Ошибка
            </span>
          )}
          {status === 'ready' && (
            <span className="text-green-400 font-bold bg-green-500/10 px-6 py-2 rounded-full text-sm border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
              Забрать награду
            </span>
          )}
          {status === 'completed' && <Check size={36} className="text-zinc-500" />}
        </div>

        {/* Награда показывается только если задание еще не выполнено */}
        {status !== 'completed' && status !== 'ready' && status !== 'check' && status !== 'loading' && status !== 'error' && (
          <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/5">
            <span className="text-yellow-500 font-black text-sm">+{reward}</span>
            <Package size={14} className="text-yellow-500" />
          </div>
        )}
      </div>
    </div>
  );
};

// Интерактивная карточка для обычных заданий (нижний список)
const TaskItem = ({ icon, gradient, shadow, title, subTitle, reward, progress, onShowToast, isLast }) => {
  const [status, setStatus] = useState(progress ? null : 'go'); 

  const handleAction = () => {
    if (status === 'go') {
      setStatus('loading');
      setTimeout(() => {
        setStatus('ready');
      }, 1000);
    } else if (status === 'ready') {
      setStatus('completed');
      onShowToast(`Вы получили +${reward} кейсов!`, 'reward');
    }
  };

  return (
    <div className={`flex items-center justify-between p-5 transition-all duration-500 
      ${!isLast ? 'border-b border-white/[0.03]' : ''} 
      ${status === 'completed' ? 'opacity-40 grayscale-[0.8]' : ''}`}>
      
      <div className="flex items-center gap-5">
        <CryptomannIcon icon={icon} gradient={gradient} shadow={shadow} isCompleted={status === 'completed'} />
        
        <div className="flex flex-col gap-0.5">
          <span className={`font-bold text-base tracking-tight ${status === 'completed' ? 'text-zinc-500 line-through' : 'text-white'}`}>
            {title}
          </span>
          {subTitle && <span className="text-zinc-500 text-xs font-medium">{subTitle}</span>}
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`${status === 'completed' ? 'text-zinc-600' : 'text-yellow-500'} font-black text-sm`}>
              +{reward}
            </span>
            <Package size={14} className={status === 'completed' ? 'text-zinc-600' : 'text-yellow-500'} />
          </div>
        </div>
      </div>

      {progress && !status && (
        <div className="px-4 py-2 rounded-xl border border-white/5 bg-black/40 shadow-inner">
          <span className="text-zinc-400 font-black text-sm tracking-widest">{progress}</span>
        </div>
      )}
      
      {status && (
        <button 
          onClick={handleAction}
          disabled={status === 'loading' || status === 'completed'}
          className={`px-4 py-2 rounded-xl border active:scale-95 transition-all min-w-[115px] flex justify-center items-center
            ${status === 'go' ? 'border-white/20 bg-white/5 text-white hover:bg-white/10' : ''}
            ${status === 'loading' ? 'border-zinc-800 bg-zinc-900 text-zinc-500' : ''}
            ${status === 'ready' ? 'border-green-500/30 bg-gradient-to-r from-green-500/20 to-green-600/10 shadow-neon-green text-green-400' : ''}
            ${status === 'completed' ? 'border-transparent bg-transparent text-zinc-700' : ''}
          `}
        >
          <span className="font-bold text-sm flex items-center gap-1.5">
            {status === 'go' && 'Забрать'}
            {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
            {status === 'ready' && 'Клейм'}
            {status === 'completed' && <Check size={18} />}
          </span>
        </button>
      )}
    </div>
  );
};

const Booty = () => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="w-full flex flex-col font-sans animate-fadeIn select-none min-h-screen pb-32 relative">
      
      {/* СИСТЕМА УВЕДОМЛЕНИЙ */}
      {toast && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl border backdrop-blur-md flex items-center gap-3 animate-slideDown shadow-2xl
          ${toast.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-400' : ''}
          ${toast.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' : ''}
          ${toast.type === 'reward' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500' : ''}
        `}>
          {toast.type === 'error' && <XCircle size={20} />}
          {toast.type === 'success' && <Check size={20} />}
          {toast.type === 'reward' && <Package size={20} />}
          <span className="font-bold text-sm whitespace-nowrap">{toast.message}</span>
        </div>
      )}

      {/* ХЕДЕР */}
      <div className="pt-8 pb-6 flex items-center justify-between px-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-white font-black text-3xl tracking-tighter uppercase">Задачи</h1>
          <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.2em]">Быстрый лут</span>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/5 px-4 py-2 rounded-2xl border border-yellow-500/20 shadow-neon-gold">
          <Package size={18} className="text-yellow-500" />
          <span className="text-yellow-500 font-black">0</span>
        </div>
      </div>

      <div className="flex flex-col gap-8 mt-2 px-1">

        {/* ПАРТНЕРЫ И СОЦСЕТИ (НОВЫЙ СТИЛЬ БЛОКОВ) */}
        <div className="flex flex-col gap-3">
          {/* Плашка 1: Левая из скрина (Синий/Индиго свет) */}
          <PromoCard 
            title="Telegram Канал" 
            icon={Send} 
            glowClass="bg-indigo-600" 
            reward="5" 
            actionUrl="https://t.me/telegram" 
            onShowToast={showToast}
          />
          {/* Плашка 2: Правая из скрина (Зеленый свет) */}
          <PromoCard 
            title="Чат Игроков" 
            icon={MessageCircle} 
            glowClass="bg-emerald-600" 
            reward="3" 
            actionUrl="https://t.me/telegram" 
            onShowToast={showToast}
          />
        </div>

        {/* ХАЛЯВА (Нижний список) */}
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-white font-black text-xl uppercase tracking-tight">Внутри игры</h2>
          </div>
          <div className="bg-[#0f0f11] rounded-[28px] border border-white/5 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <TaskItem 
              icon={Gift} 
              gradient="bg-gradient-to-br from-green-400 to-emerald-600" 
              shadow="shadow-neon-green"
              title="Ежедневный бонус" 
              subTitle="Заходи каждый день"
              reward="2" 
              onShowToast={showToast}
            />
            <TaskItem 
              icon={Gamepad2} 
              gradient="bg-gradient-to-br from-pink-500 to-purple-600" 
              shadow="shadow-[0_0_15px_rgba(236,72,153,0.3)]"
              title="Сыграть 1 раз" 
              subTitle="Любой режим Арены"
              reward="1" 
              progress="0/1"
              onShowToast={showToast}
              isLast={true}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Booty;