import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Crosshair, 
  Swords, 
  Flame, 
  ShieldAlert, 
  Zap, 
  Gem, 
  Timer, 
  CheckCircle2, 
  ChevronRight, 
  Trophy,
  Target,
  RefreshCcw,
  MessageCircle,
  X
} from 'lucide-react';

// ==========================================
// ВСТРОЕННЫЕ СТИЛИ (Анимации Криптоманна)
// ==========================================
const inlineStyles = `
  @keyframes shimmer {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }
  @keyframes pulseGlow {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
  }
  .animate-shimmer {
    background-size: 200% 200%;
    animation: shimmer 4s ease infinite;
  }
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  .animate-pulse-glow {
    animation: pulseGlow 2s ease-in-out infinite;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// ==========================================
// БАЗА ДАННЫХ КВЕСТОВ CS2
// ==========================================
const DAILY_TASKS = [
  {
    id: 'd1',
    title: 'Король Арены',
    description: 'Одержи победу в 10 дуэлях на Арене, используя только штурмовые винтовки.',
    icon: Swords,
    gradient: 'from-blue-600 via-indigo-500 to-blue-400',
    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
    reward: 2,
    progress: 7,
    maxProgress: 10,
    status: 'active' // active, ready, completed
  },
  {
    id: 'd2',
    title: 'Вантап Машина',
    description: 'Сделай 25 хедшотов в любом режиме игры. Спрей не прощается.',
    icon: Crosshair,
    gradient: 'from-red-600 via-rose-500 to-red-400',
    glow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]',
    reward: 5,
    progress: 25,
    maxProgress: 25,
    status: 'ready'
  },
  {
    id: 'd3',
    title: 'Ежедневный Дроп',
    description: 'Открой 5 любых кейсов в разделе добычи.',
    icon: Package,
    gradient: 'from-yellow-600 via-amber-500 to-yellow-400',
    glow: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]',
    reward: 1,
    progress: 0,
    maxProgress: 5,
    status: 'active'
  }
];

const WEEKLY_TASKS = [
  {
    id: 'w1',
    title: 'Мастер Контрактов',
    description: 'Успешно скрафти скин качества "Тайное" (Красное) в контрактах обмена.',
    icon: RefreshCcw,
    gradient: 'from-fuchsia-600 via-purple-500 to-fuchsia-400',
    glow: 'shadow-[0_0_20px_rgba(192,38,211,0.3)]',
    reward: 15,
    progress: 0,
    maxProgress: 1,
    status: 'active'
  },
  {
    id: 'w2',
    title: 'Информатор',
    description: 'Подпишись на наш Telegram канал, чтобы не пропускать промокоды на кейсы.',
    icon: MessageCircle,
    gradient: 'from-sky-600 via-blue-500 to-sky-400',
    glow: 'shadow-[0_0_20px_rgba(14,165,233,0.3)]',
    reward: 3,
    type: 'action',
    buttonText: 'Подписаться',
    link: 'https://t.me/yourchannel',
    status: 'active'
  }
];

const ACHIEVEMENTS = [
  {
    id: 'a1',
    title: 'Ножевой Маньяк',
    description: 'Выбей свой первый нож из любого кейса. Удача любит смелых.',
    icon: Flame,
    gradient: 'from-orange-600 via-red-500 to-orange-400',
    glow: 'shadow-[0_0_20px_rgba(249,115,22,0.3)]',
    reward: 50,
    progress: 0,
    maxProgress: 1,
    status: 'active'
  },
  {
    id: 'a2',
    title: 'Ветеран Операций',
    description: 'Достигни 50-го уровня профиля в текущем сезоне.',
    icon: ShieldAlert,
    gradient: 'from-emerald-600 via-green-500 to-emerald-400',
    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
    reward: 100,
    progress: 12,
    maxProgress: 50,
    status: 'active'
  }
];

// ==========================================
// КОМПОНЕНТЫ UI
// ==========================================

const AnimatedIcon = ({ icon: Icon, gradient, glow }) => (
  <div className={`relative w-14 h-14 rounded-[18px] p-[1px] overflow-hidden ${glow}`}>
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} animate-shimmer opacity-80`} />
    <div className="absolute inset-[1px] bg-[#141416] rounded-[17px] z-10" />
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 z-10`} />
    <div className="relative z-20 w-full h-full flex items-center justify-center">
      <Icon size={26} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
    </div>
  </div>
);

const TaskCard = ({ task, onClick }) => {
  const isReady = task.status === 'ready';
  const isCompleted = task.status === 'completed';

  return (
    <div 
      onClick={() => onClick(task)}
      className={`relative w-full p-4 rounded-[24px] border transition-all duration-300 overflow-hidden cursor-pointer active:scale-[0.98]
        ${isReady ? 'bg-yellow-500/[0.05] border-yellow-500/30' : 'bg-[#141416] border-white/5'}
      `}
    >
      {/* Подсветка для готовых заданий */}
      {isReady && (
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-500/10 to-transparent animate-pulse-glow" />
      )}

      <div className="relative z-10 flex items-center gap-4">
        <AnimatedIcon icon={task.icon} gradient={isReady ? 'from-yellow-400 via-amber-500 to-yellow-600' : task.gradient} glow={isReady ? 'shadow-[0_0_25px_rgba(234,179,8,0.4)]' : task.glow} />
        
        <div className="flex-1 flex flex-col gap-1">
          <h3 className={`font-bold text-[15px] leading-tight ${isReady ? 'text-yellow-400' : 'text-white'}`}>
            {task.title}
          </h3>
          
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500 font-semibold text-[11px] uppercase tracking-wider">Награда:</span>
            <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
              <span className="text-yellow-500 font-black text-xs">+{task.reward}</span>
              <Package size={12} className="text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Правая часть (Прогресс или Кнопка) */}
        <div className="flex flex-col items-end justify-center min-w-[70px]">
          {task.type === 'action' ? (
            <div className="bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold px-3 py-1.5 rounded-xl">
              {task.buttonText}
            </div>
          ) : isReady ? (
            <div className="bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)] text-black text-xs font-black px-4 py-2 rounded-xl animate-float">
              Забрать
            </div>
          ) : isCompleted ? (
            <CheckCircle2 size={28} className="text-zinc-600" />
          ) : (
            <div className="flex flex-col items-end gap-1">
              <span className="text-white font-black text-sm">{task.progress} <span className="text-zinc-500">/ {task.maxProgress}</span></span>
              <div className="w-16 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${task.gradient}`} 
                  style={{ width: `${(task.progress / task.maxProgress) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SectionHeader = ({ title, timeRemaining }) => (
  <div className="flex items-center justify-between px-2 mb-3 mt-6">
    <h2 className="text-white font-black text-xl tracking-tight uppercase">{title}</h2>
    {timeRemaining && (
      <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-lg border border-white/5">
        <Timer size={14} className="text-zinc-400" />
        <span className="text-zinc-400 font-bold text-xs tabular-nums tracking-widest">{timeRemaining}</span>
      </div>
    )}
  </div>
);

// ==========================================
// ОСНОВНОЙ ЭКРАН
// ==========================================
const Booty = () => {
  const [activeTab, setActiveTab] = useState('quests'); // quests | achievements
  const [selectedTask, setSelectedTask] = useState(null);
  const [totalCases, setTotalCases] = useState(12);

  // Обработчик закрытия модалки
  const closeModal = () => setSelectedTask(null);

  return (
    <div className="w-full flex flex-col font-sans animate-fadeIn select-none min-h-screen relative">
      <style>{inlineStyles}</style>

      {/* --- ШАПКА И БАЛАНС --- */}
      <div className="pt-8 pb-4 px-4 flex items-center justify-between z-10">
        <div className="flex flex-col">
          <h1 className="text-white font-black text-3xl tracking-tighter uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            Контракты
          </h1>
          <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.2em]">Боевые задачи</span>
        </div>
        
        {/* Баланс кейсов */}
        <div className="flex items-center gap-2 bg-gradient-to-b from-white/10 to-white/5 px-5 py-2.5 rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-md">
          <Package size={20} className="text-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.5)] animate-float" />
          <span className="text-white font-black text-lg tabular-nums">{totalCases}</span>
        </div>
      </div>

      {/* --- ТАБЫ (ПЕРЕКЛЮЧАТЕЛИ) --- */}
      <div className="px-4 mb-2 z-10">
        <div className="flex bg-[#141416] p-1 rounded-2xl border border-white/5">
          <button 
            onClick={() => setActiveTab('quests')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2
              ${activeTab === 'quests' ? 'bg-white/10 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Target size={16} /> Активные
          </button>
          <button 
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2
              ${activeTab === 'achievements' ? 'bg-white/10 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Trophy size={16} /> Достижения
          </button>
        </div>
      </div>

      {/* --- СПИСОК ЗАДАНИЙ --- */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pb-32 z-10">
        
        {activeTab === 'quests' ? (
          <div className="animate-fadeIn">
            <SectionHeader title="Ежедневные" timeRemaining="14:23:05" />
            <div className="flex flex-col gap-3">
              {DAILY_TASKS.map(task => (
                <TaskCard key={task.id} task={task} onClick={setSelectedTask} />
              ))}
            </div>

            <SectionHeader title="Еженедельные" timeRemaining="5Д 14:23" />
            <div className="flex flex-col gap-3">
              {WEEKLY_TASKS.map(task => (
                <TaskCard key={task.id} task={task} onClick={setSelectedTask} />
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-fadeIn">
            <SectionHeader title="Глобальные цели" />
            <div className="flex flex-col gap-3">
              {ACHIEVEMENTS.map(task => (
                <TaskCard key={task.id} task={task} onClick={setSelectedTask} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* --- ФОНОВЫЕ СВЕЧЕНИЯ (Декор) --- */}
      <div className="fixed top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed top-60 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* --- МОДАЛЬНОЕ ОКНО ДЕТАЛЕЙ ЗАДАНИЯ --- */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4">
          {/* Бэкграунд оверлей */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fadeIn"
            onClick={closeModal}
          />
          
          {/* Сама карточка модалки */}
          <div className="relative w-full max-w-md bg-[#0a0a0c] border border-white/10 rounded-[32px] p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-slideUp overflow-hidden">
            
            {/* Декоративный светильник внутри модалки */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-30 bg-gradient-to-br ${selectedTask.gradient}`} />

            <button 
              onClick={closeModal}
              className="absolute top-5 right-5 w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-colors z-10"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col items-center text-center mt-4 relative z-10">
              <AnimatedIcon icon={selectedTask.icon} gradient={selectedTask.gradient} glow={selectedTask.glow} />
              
              <h2 className="text-white font-black text-2xl mt-5 mb-2">{selectedTask.title}</h2>
              <p className="text-zinc-400 text-sm font-medium leading-relaxed mb-8 px-2">
                {selectedTask.description}
              </p>

              {/* Блок награды */}
              <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between mb-6">
                <span className="text-zinc-500 font-bold uppercase tracking-wider text-xs">Награда за выполнение:</span>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 font-black text-xl">+{selectedTask.reward}</span>
                  <Package size={20} className="text-yellow-500" />
                </div>
              </div>

              {/* Кнопка действия */}
              <button 
                onClick={() => {
                  if (selectedTask.status === 'ready') {
                    setTotalCases(prev => prev + selectedTask.reward);
                    // Тут в будущем будет логика изменения статуса на completed
                  }
                  closeModal();
                }}
                className={`w-full py-4 rounded-2xl font-black text-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2
                  ${selectedTask.status === 'ready' 
                    ? 'bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:bg-yellow-400' 
                    : selectedTask.type === 'action'
                      ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500'
                      : 'bg-white/5 text-zinc-500 cursor-not-allowed border border-white/5'
                  }`}
              >
                {selectedTask.status === 'ready' 
                  ? 'Забрать награду' 
                  : selectedTask.type === 'action'
                    ? selectedTask.buttonText
                    : `Прогресс: ${selectedTask.progress} / ${selectedTask.maxProgress}`
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booty;