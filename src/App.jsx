import React from 'react';
import { 
  ShieldCheck, Brain, TrendingUp, Youtube, Twitter, Video,
  Gamepad2, Gift, Trophy, Newspaper, BookOpen, Flame
} from 'lucide-react';

const Preview = () => {
  return (
    <div className="flex flex-col gap-8 pb-10 animate-fadeIn font-sans w-full">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col items-center text-center gap-5 mt-8 px-2">
        <h1 className="text-3xl font-black leading-[1.1] tracking-tight text-white max-w-[90%]">
          Сообщество для становления и развития <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400">
            CS2 трейдеров
          </span>
        </h1>
        <p className="text-sm text-zinc-500 font-medium leading-relaxed max-w-[85%]">
          Academy — это экосистема трейдеров и ИИ, где ваши знания превращаются в реальную прибыль.
        </p>
      </div>

      {/* CORE FEATURES (Главные фичи) */}
      <div className="flex flex-col gap-3 mt-2">
        <h2 className="text-lg font-bold text-white px-1">Направления Академии</h2>
        
        <div className="p-5 bg-[#111112] border border-white/5 rounded-[2rem] flex items-start gap-4">
          <div className="p-2.5 bg-blue-500/10 rounded-2xl shrink-0">
            <TrendingUp size={22} className="text-blue-500" />
          </div>
          <div>
            <h3 className="text-white font-bold text-[15px] mb-1.5">Аналитика рынка</h3>
            <p className="text-xs text-zinc-500 leading-normal">Глубокий анализ паттернов, отслеживание актуальных трендов и поиск недооцененных активов.</p>
          </div>
        </div>
        
        <div className="p-5 bg-[#111112] border border-white/5 rounded-[2rem] flex items-start gap-4">
          <div className="p-2.5 bg-purple-500/10 rounded-2xl shrink-0">
            <Brain size={22} className="text-purple-500" />
          </div>
          <div>
            <h3 className="text-white font-bold text-[15px] mb-1.5">ИИ-ассистент</h3>
            <p className="text-xs text-zinc-500 leading-normal">Продвинутые алгоритмы машинного обучения для оценки вероятностей и автоматизации рутины.</p>
          </div>
        </div>
      </div>

      {/* PLATFORM MODULES (Сетка разделов) */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-white px-1">Экосистема платформы</h2>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Арена */}
          <div className="p-4 bg-[#111112] border border-white/5 rounded-[1.5rem] flex flex-col gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl w-fit">
              <Gamepad2 size={18} className="text-emerald-500" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-1">Арена</h3>
              <p className="text-[10px] text-zinc-500 leading-relaxed">Кейсы и симуляции с доказуемой честностью.</p>
            </div>
          </div>

          {/* Booty (Призы) */}
          <div className="p-4 bg-[#111112] border border-white/5 rounded-[1.5rem] flex flex-col gap-3">
            <div className="p-2 bg-amber-500/10 rounded-xl w-fit">
              <Gift size={18} className="text-amber-500" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-1">Призы</h3>
              <p className="text-[10px] text-zinc-500 leading-relaxed">Обмен поинтов на реальные скины и бонусы.</p>
            </div>
          </div>

          {/* Рейтинг */}
          <div className="p-4 bg-[#111112] border border-white/5 rounded-[1.5rem] flex flex-col gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl w-fit">
              <Trophy size={18} className="text-blue-500" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-1">Рейтинг</h3>
              <p className="text-[10px] text-zinc-500 leading-relaxed">Глобальный ладдер трейдеров и конкуренция.</p>
            </div>
          </div>

          {/* Сезон */}
          <div className="p-4 bg-[#111112] border border-white/5 rounded-[1.5rem] flex flex-col gap-3">
            <div className="p-2 bg-rose-500/10 rounded-xl w-fit">
              <Flame size={18} className="text-rose-500" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-1">Сезоны</h3>
              <p className="text-[10px] text-zinc-500 leading-relaxed">Ивенты с уникальным пулом наград и дропом.</p>
            </div>
          </div>

          {/* Гайды */}
          <div className="p-4 bg-[#111112] border border-white/5 rounded-[1.5rem] flex flex-col gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-xl w-fit">
              <BookOpen size={18} className="text-indigo-500" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-1">Гайды</h3>
              <p className="text-[10px] text-zinc-500 leading-relaxed">Структурированная база знаний от 0 до PRO.</p>
            </div>
          </div>

          {/* Новости */}
          <div className="p-4 bg-[#111112] border border-white/5 rounded-[1.5rem] flex flex-col gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-xl w-fit">
              <Newspaper size={18} className="text-cyan-500" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-1">Новости</h3>
              <p className="text-[10px] text-zinc-500 leading-relaxed">Главные инсайды и важные события рынка.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT & ARENA FAIRNESS */}
      <div className="flex flex-col gap-4 mt-2">
        <div className="p-6 bg-gradient-to-b from-[#111112] to-transparent border border-white/10 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[60px] rounded-full" />
          
          <div className="relative z-10 flex flex-col gap-6">
            <div>
              <h3 className="text-white font-bold text-sm flex items-center gap-2 mb-3">
                <ShieldCheck size={18} className="text-blue-500" />
                Прозрачная математика
              </h3>
              <p className="text-[13px] text-zinc-400 leading-relaxed">
                Все механики платформы построены на криптографически защищенном генераторе (Provably Fair). Вы всегда можете проверить честность любого результата.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SOCIAL BUTTONS */}
      <div className="grid grid-cols-3 gap-3 mt-2">
        <button className="flex flex-col items-center justify-center gap-2 py-4 bg-[#111112] border border-white/5 rounded-2xl active:bg-white/10 transition-colors">
          <Video size={20} className="text-white" />
          <span className="text-[10px] font-black uppercase tracking-tighter">TikTok</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-2 py-4 bg-[#111112] border border-white/5 rounded-2xl active:bg-white/10 transition-colors">
          <Youtube size={20} className="text-white" />
          <span className="text-[10px] font-black uppercase tracking-tighter">YouTube</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-2 py-4 bg-[#111112] border border-white/5 rounded-2xl active:bg-white/10 transition-colors">
          <Twitter size={20} className="text-white" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Twitter</span>
        </button>
      </div>

      {/* LEGAL DISCLAIMER */}
      <div className="mt-2 p-5 rounded-[2rem] bg-red-500/[0.02] border border-red-500/10">
        <h4 className="text-[10px] font-black text-red-500/60 uppercase tracking-[0.3em] mb-3 text-center">Отказ от ответственности</h4>
        <p className="text-[10px] text-zinc-600 leading-relaxed text-center italic">
          НАСТОЯЩИЙ ПРОЕКТ ПРЕДОСТАВЛЯЕТ ИСКЛЮЧИТЕЛЬНО ИНФОРМАЦИОННЫЕ МАТЕРИАЛЫ. НИКАКАЯ ИНФОРМАЦИЯ НЕ ЯВЛЯЕТСЯ ФИНАНСОВОЙ РЕКОМЕНДАЦИЕЙ. ПРОЕКТ НЕ НЕСЕТ ОТВЕТСТВЕННОСТИ ЗА ЛЮБЫЕ ФИНАНСОВЫЕ ПОТЕРИ. ВСЕ РЕШЕНИЯ ПОЛЬЗОВАТЕЛЬ ПРИНИМАЕТ САМОСТОЯТЕЛЬНО.
        </p>
      </div>

    </div>
  );
};

export default Preview;