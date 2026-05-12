import React from 'react';
import { 
  Package, 
  Target, 
  CircleDollarSign, 
  RefreshCcw, 
  MessageCircle, 
  Twitter,
  Sword,
  Clock
} from 'lucide-react';

// Компонент переливающейся иконки
const CryptomannIcon = ({ icon: Icon, gradient, shadow }) => (
  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 animate-iridescent ${gradient} ${shadow} border border-white/10 relative overflow-hidden`}>
    {/* Блик */}
    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50" />
    <Icon size={28} className="text-white relative z-10" />
  </div>
);

// Карточка задания
const TaskItem = ({ icon, gradient, shadow, title, subTitle, reward, progress, buttonText, isLast }) => (
  <div className={`flex items-center justify-between p-5 ${!isLast ? 'border-b border-white/[0.03]' : ''}`}>
    <div className="flex items-center gap-5">
      <CryptomannIcon icon={icon} gradient={gradient} shadow={shadow} />
      
      <div className="flex flex-col gap-0.5">
        <span className="text-white font-bold text-base tracking-tight">{title}</span>
        {subTitle && <span className="text-zinc-500 text-xs font-medium">{subTitle}</span>}
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-yellow-500 font-black text-sm">{reward}</span>
          <Package size={14} className="text-yellow-500" />
        </div>
      </div>
    </div>

    {/* Правая часть: Прогресс или Кнопка */}
    {progress && (
      <div className="px-4 py-2 rounded-xl border border-white/10 bg-black/50 shadow-inner">
        <span className="text-zinc-400 font-black text-sm">{progress}</span>
      </div>
    )}
    
    {buttonText && (
      <button className="px-5 py-2 rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-blue-600/10 active:scale-95 transition-all shadow-[0_0_15px_rgba(59,130,246,0.15)]">
        <span className="text-blue-400 font-bold text-sm">{buttonText}</span>
      </button>
    )}
  </div>
);

const Booty = () => {
  return (
    <div className="w-full flex flex-col font-sans animate-fadeIn select-none min-h-screen pb-32">
      
      {/* ХЕДЕР */}
      <div className="pt-8 pb-6 flex items-center justify-between px-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-white font-black text-3xl tracking-tighter uppercase">Задачи</h1>
          <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.2em]">Выполняй и лутай кейсы</span>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/5 px-4 py-2 rounded-2xl border border-yellow-500/20 shadow-neon-gold">
          <Package size={18} className="text-yellow-500" />
          <span className="text-yellow-500 font-black">0</span>
        </div>
      </div>

      <div className="flex flex-col gap-8 mt-2">

        {/* С ПРОГРЕССОМ */}
        <div className="flex flex-col gap-4">
          <h2 className="text-white font-black text-xl px-2 uppercase tracking-tight">С прогрессом</h2>
          <div className="bg-[#0f0f11] rounded-[28px] border border-white/5 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <TaskItem 
              icon={Target} 
              gradient="bg-gradient-to-br from-yellow-400 to-orange-600" 
              shadow="shadow-neon-gold"
              title="Сделать 100 фрагов" 
              subTitle="Арена или ММ"
              reward="2" 
              progress="0/100" 
            />
            <TaskItem 
              icon={RefreshCcw} 
              gradient="bg-gradient-to-br from-pink-500 to-purple-600" 
              shadow="shadow-[0_0_15px_rgba(236,72,153,0.3)]"
              title="Скрафтить скин" 
              subTitle="Контракты обмена"
              reward="1" 
              progress="0/3" 
            />
            <TaskItem 
              icon={Sword} 
              gradient="bg-gradient-to-br from-red-500 to-rose-700" 
              shadow="shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              title="Выиграть дуэль" 
              subTitle="Режим 1x1"
              reward="3" 
              progress="0/10" 
              isLast={true} 
            />
          </div>
        </div>

        {/* ЕЖЕДНЕВНЫЕ */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-white font-black text-xl uppercase tracking-tight">Ежедневные</h2>
            <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 flex items-center gap-1.5">
              <Clock size={12} className="text-zinc-400" />
              <span className="text-zinc-400 font-bold text-xs">03:09</span>
            </div>
          </div>
          <div className="bg-[#0f0f11] rounded-[28px] border border-white/5 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <TaskItem 
              icon={MessageCircle} 
              gradient="bg-gradient-to-br from-blue-400 to-blue-600" 
              shadow="shadow-neon-blue"
              title="Зайти в Telegram Чат" 
              subTitle="Общение комьюнити"
              reward="1" 
              buttonText="Проверить" 
            />
            <TaskItem 
              icon={Twitter} 
              gradient="bg-gradient-to-br from-sky-400 to-blue-500" 
              shadow="shadow-neon-blue"
              title="Подписка на X (Twitter)" 
              subTitle="Новости проекта"
              reward="1" 
              buttonText="Проверить" 
              isLast={true} 
            />
          </div>
        </div>

        {/* ЕЖЕНЕДЕЛЬНЫЕ */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-white font-black text-xl uppercase tracking-tight">Еженедельные</h2>
            <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 flex items-center gap-1.5">
              <Clock size={12} className="text-zinc-400" />
              <span className="text-zinc-400 font-bold text-xs">4:03:09</span>
            </div>
          </div>
          <div className="bg-[#0f0f11] rounded-[28px] border border-white/5 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <TaskItem 
              icon={CircleDollarSign} 
              gradient="bg-gradient-to-br from-green-400 to-emerald-600" 
              shadow="shadow-neon-green"
              title="Депозит скинами" 
              subTitle="Пополнение от $10"
              reward="5" 
              progress="0/10" 
              isLast={true} 
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Booty;