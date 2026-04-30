import React from 'react';
import { ShieldCheck, Brain, TrendingUp, Youtube, Twitter, Video } from 'lucide-react';

const Preview = () => {
  return (
    // Добавили overflow-y-auto и min-h-full для уверенного скролла
    <div className="flex flex-col gap-8 pb-40 animate-fadeIn font-sans w-full">
      
      {/* HEADER SECTION - ТЕПЕРЬ ПО ЦЕНТРУ */}
      <div className="flex flex-col items-center text-center gap-5 mt-6 px-2">
        <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.02)]">
          <span className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-black">Welcome to Academy</span>
        </div>
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

      {/* DIRECTIONS SECTION */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-white px-1">Направления</h2>
        <div className="grid grid-cols-1 gap-3">
          <div className="p-5 bg-[#111112] border border-white/5 rounded-[2rem] flex items-start gap-4 transition-all active:scale-[0.98]">
            <div className="p-2.5 bg-blue-500/10 rounded-2xl">
              <TrendingUp size={22} className="text-blue-500" />
            </div>
            <div>
              <h3 className="text-white font-bold text-[15px] mb-1.5">Аналитика рынка</h3>
              <p className="text-xs text-zinc-500 leading-normal">Глубокий анализ паттернов, отслеживание трендов и поиск недооцененных активов в CS2.</p>
            </div>
          </div>
          
          <div className="p-5 bg-[#111112] border border-white/5 rounded-[2rem] flex items-start gap-4 transition-all active:scale-[0.98]">
            <div className="p-2.5 bg-purple-500/10 rounded-2xl">
              <Brain size={22} className="text-purple-500" />
            </div>
            <div>
              <h3 className="text-white font-bold text-[15px] mb-1.5">ИИ-ассистент</h3>
              <p className="text-xs text-zinc-500 leading-normal">Алгоритмы машинного обучения для оценки вероятностей и автоматизации рутинных процессов.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT & ARENA */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-white px-1">О проекте & Арена</h2>
        <div className="p-6 bg-gradient-to-b from-[#111112] to-transparent border border-white/10 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[60px] rounded-full" />
          
          <div className="relative z-10 flex flex-col gap-6">
            <div>
              <h3 className="text-white font-bold text-sm flex items-center gap-2 mb-3">
                <ShieldCheck size={18} className="text-blue-500" />
                Честность Арены
              </h3>
              <p className="text-[13px] text-zinc-400 leading-relaxed">
                Все механики Арены построены на криптографически защищенном генераторе случайных чисел. Математика прозрачна на 100%.
              </p>
            </div>
            <div className="h-px w-full bg-white/5" />
            <div>
              <h3 className="text-white font-bold text-sm mb-3">Технологии будущего</h3>
              <p className="text-[13px] text-zinc-400 leading-relaxed">
                Santa Lucia — это гибридная платформа, управляемая нейросетями. ИИ анализирует ваш стиль и обучается вместе с вами.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SOCIAL BUTTONS */}
      <div className="grid grid-cols-3 gap-3 mt-2">
        <button className="flex flex-col items-center justify-center gap-2 py-4 bg-[#111112] border border-white/5 rounded-2xl transition-all active:bg-white/10">
          <Video size={20} className="text-white" />
          <span className="text-[10px] font-black uppercase tracking-tighter">TikTok</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-2 py-4 bg-[#111112] border border-white/5 rounded-2xl transition-all active:bg-white/10">
          <Youtube size={20} className="text-white" />
          <span className="text-[10px] font-black uppercase tracking-tighter">YouTube</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-2 py-4 bg-[#111112] border border-white/5 rounded-2xl transition-all active:bg-white/10">
          <Twitter size={20} className="text-white" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Twitter</span>
        </button>
      </div>

      {/* LEGAL DISCLAIMER */}
      <div className="mt-4 p-5 rounded-[2rem] bg-red-500/[0.02] border border-red-500/10">
        <h4 className="text-[10px] font-black text-red-500/60 uppercase tracking-[0.3em] mb-3 text-center">Отказ от ответственности</h4>
        <p className="text-[10px] text-zinc-600 leading-relaxed text-center italic">
          НАСТОЯЩИЙ ПРОЕКТ ПРЕДОСТАВЛЯЕТ ИСКЛЮЧИТЕЛЬНО ИНФОРМАЦИОННЫЕ МАТЕРИАЛЫ. НИКАКАЯ ИНФОРМАЦИЯ НЕ ЯВЛЯЕТСЯ ФИНАНСОВОЙ РЕКОМЕНДАЦИЕЙ. ПРОЕКТ НЕ НЕСЕТ ОТВЕТСТВЕННОСТИ ЗА ЛЮБЫЕ ФИНАНСОВЫЕ ПОТЕРИ. ВСЕ РЕШЕНИЯ ПОЛЬЗОВАТЕЛЬ ПРИНИМАЕТ САМОСТОЯТЕЛЬНО.
        </p>
      </div>

    </div>
  );
};

export default Preview;