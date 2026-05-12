import React from 'react';
import { 
  Package, 
  RefreshCcw, 
  Send,
  MessageCircle, 
  Wallet,
  Sword,
  Clock
} from 'lucide-react';

// Компонент переливающейся иконки в стиле Криптоманна
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
    <div className="flex items-center gap-4">
      <CryptomannIcon icon={icon} gradient={gradient} shadow={shadow} />
      
      <div className="flex flex-col gap-1">
        <span className="text-white font-bold text-base tracking-tight">{title}</span>
        {subTitle && <span className="text-zinc-500 text-xs font-medium">{subTitle}</span>}
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-yellow-500 font-black text-sm">{reward}</span>
          <Package size={14} className="text-yellow-500" />
        </div>
      </div>
    </div>

    {progress && (
      <div className="px-4 py-2 rounded-full border border-white/5 bg-black/40 shadow-inner">
        <span className="text-zinc-400 font-bold text-sm">{progress}</span>
      </div>
    )}
    
    {buttonText && (
      <button className="px-5 py-2 rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-600/20 to-blue-500/10 hover:from-blue-600/30 hover:to-blue-500/20 active:scale-95 transition-all shadow-neon-blue">
        <span className="text-blue-400 font-bold text-sm">{buttonText}</span>
      </button>
    )}
  </div>
);

const Booty = () => {
  return (
    <div className="w-full flex flex-col font-sans animate-fadeIn select-none min-h-screen pb-32">
      
      {/* --- ХЕДЕР --- */}
      <div className="pt-8 pb-6 flex items-center justify-between px-2">
        <h1 className="text-white font-black text-3xl tracking-tighter">Контракты</h1>
        <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 px-4 py-2 rounded-2xl border border-yellow-500/20 shadow-neon-gold">
          <Package size={18} className="text-yellow-500" />
          <span className="text-white font-black">0</span>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        
        {/* --- В ПРОЦЕССЕ --- */}
        <div className="flex flex-col gap-4">
          <h2 className="text-white font-black text-xl px-2 tracking-tight">В процессе</h2>
          <div className="bg-[#141416]/80 backdrop-blur-xl rounded-[28px] border border-white/5 overflow-hidden shadow-2xl">
            <TaskItem 
              icon={Sword} 
              gradient="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500" 
              shadow="shadow-neon-gold"
              title="Сыграть на Арене" 
              subTitle="Выиграй 25 дуэлей"
              reward="1" 
              progress="0/25" 
            />
            <TaskItem 
              icon={Package} 
              gradient="bg-gradient-to-br from-fuchsia-500 via-purple-600 to-blue-600" 
              shadow="shadow-neon-blue"
              title="Опенкейс маньяк" 
              subTitle="Открой 100 кейсов"
              reward="3" 
              progress="0/100" 
            />
            <TaskItem 
              icon={RefreshCcw} 
              gradient="bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600" 
              shadow="shadow-neon-green"
              title="Мастер крафта" 
              subTitle="Сделай 3 апгрейда"
              reward="1" 
              progress="0/3" 
              isLast={true} 
            />
          </div>
        </div>

        {/* --- ЕЖЕДНЕВНЫЕ --- */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 px-2">
            <h2 className="text-white font-black text-xl tracking-tight">Ежедневные</h2>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Clock size={12} className="text-zinc-400" />
              <span className="text-zinc-400 font-bold text-xs">03:09</span>
            </div>
          </div>
          <div className="bg-[#141416]/80 backdrop-blur-xl rounded-[28px] border border-white/5 overflow-hidden shadow-2xl">
            <TaskItem 
              icon={Send} 
              gradient="bg-gradient-to-br from-blue-400 to-blue-600" 
              shadow="shadow-neon-blue"
              title="Радар (Канал)" 
              subTitle="Подпишись на новости"
              reward="1" 
              buttonText="Проверить" 
            />
            <TaskItem 
              icon={MessageCircle} 
              gradient="bg-gradient-to-br from-indigo-400 to-indigo-600" 
              shadow="shadow-neon-blue"
              title="Лобби (Чат)" 
              subTitle="Вступи в наш сквад"
              reward="1" 
              buttonText="Проверить" 
              isLast={true} 
            />
          </div>
        </div>

        {/* --- СПЕЦОПЕРАЦИЯ --- */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 px-2">
            <h2 className="text-white font-black text-xl tracking-tight">Спецоперация</h2>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Clock size={12} className="text-zinc-400" />
              <span className="text-zinc-400 font-bold text-xs">4:03:09</span>
            </div>
          </div>
          <div className="bg-[#141416]/80 backdrop-blur-xl rounded-[28px] border border-white/5 overflow-hidden shadow-2xl">
            <TaskItem 
              icon={Wallet} 
              gradient="bg-gradient-to-br from-amber-400 to-orange-600" 
              shadow="shadow-neon-gold"
              title="Закупка снаряжения" 
              subTitle="Пополни баланс"
              reward="5" 
              progress="0/1000" 
              isLast={true} 
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Booty;