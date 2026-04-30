import React from 'react';
import { ShieldCheck, Brain, TrendingUp, Youtube, Twitter, Video } from 'lucide-react';

const Preview = () => {
  return (
    // pb-32 чтобы нижнее меню навигации не перекрывало контент
    <div className="flex flex-col gap-8 pb-32 animate-fadeIn font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full w-fit">
          <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Welcome to Platform</span>
        </div>
        <h1 className="text-3xl font-black leading-tight tracking-tight text-white">
          Сообщество для становления и развития <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">CS2 трейдеров</span>
        </h1>
        <p className="text-sm text-zinc-400 font-medium leading-relaxed">
          Academy — это экосистема трейдеров и ИИ, где знания превращаются в прибыль.
        </p>
      </div>

      {/* DIRECTIONS SECTION */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-white">Направления</h2>
        <div className="grid grid-cols-1 gap-3">
          <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl flex items-start gap-4">
            <div className="p-2 bg-blue-500/10 rounded-xl">
              <TrendingUp size={20} className="text-blue-500" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-1">Аналитика рынка</h3>
              <p className="text-xs text-zinc-500">Глубокий анализ паттернов, отслеживание трендов и поиск недооцененных активов в CS2.</p>
            </div>
          </div>
          
          <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl flex items-start gap-4">
            <div className="p-2 bg-purple-500/10 rounded-xl">
              <Brain size={20} className="text-purple-500" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-1">ИИ-ассистент</h3>
              <p className="text-xs text-zinc-500">Алгоритмы машинного обучения для оценки вероятностей и автоматизации рутинных процессов.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT & ARENA FAIRNESS */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-white">О проекте & Арена</h2>
        <div className="p-5 bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 rounded-2xl relative overflow-hidden">
          {/* Декоративный блик */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
          
          <div className="relative z-10 flex flex-col gap-4">
            <div>
              <h3 className="text-white font-bold text-sm flex items-center gap-2 mb-2">
                <ShieldCheck size={16} className="text-green-500" />
                Честность Арены (Provably Fair)
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Все механики Арены построены на криптографически защищенном генераторе случайных чисел. Каждый результат можно проверить вручную. Мы не имеем доступа к изменению шансов в реальном времени — математика прозрачна на 100%.
              </p>
            </div>
            <div className="h-px w-full bg-white/5" />
            <div>
              <h3 className="text-white font-bold text-sm mb-2">Технологии будущего</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Santa Lucia — это не просто симулятор или биржа. Это гибридная платформа, управляемая нейросетями. ИИ анализирует ваш стиль, подсказывает оптимальные решения и обучается вместе с вами.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SOCIAL BUTTONS */}
      <div className="flex gap-3 mt-4">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors">
          <Youtube size={18} className="text-white" />
          <span className="text-xs font-bold text-white">YouTube</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors">
          <Twitter size={18} className="text-white" />
          <span className="text-xs font-bold text-white">Twitter</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors">
          <Video size={18} className="text-white" />
          <span className="text-xs font-bold text-white">TikTok</span>
        </button>
      </div>

      {/* LEGAL DISCLAIMER */}
      <div className="mt-8 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
        <h4 className="text-[10px] font-black text-red-500/80 uppercase tracking-widest mb-2">Отказ от ответственности</h4>
        <p className="text-[9px] text-zinc-500 leading-relaxed text-justify">
          НАСТОЯЩИЙ ПРОЕКТ, ВКЛЮЧАЯ ВСЕ ВСТРОЕННЫЕ АЛГОРИТМЫ ИСКУССТВЕННОГО ИНТЕЛЛЕКТА, ПРЕДОСТАВЛЯЕТ ИСКЛЮЧИТЕЛЬНО ИНФОРМАЦИОННЫЕ И РАЗВЛЕКАТЕЛЬНЫЕ МАТЕРИАЛЫ. НИКАКАЯ ИНФОРМАЦИЯ, РАЗМЕЩЕННАЯ НА ДАННОЙ ПЛАТФОРМЕ, НЕ ЯВЛЯЕТСЯ ИНДИВИДУАЛЬНОЙ ИНВЕСТИЦИОННОЙ, ФИНАНСОВОЙ, ТОРГОВОЙ ИЛИ ЮРИДИЧЕСКОЙ РЕКОМЕНДАЦИЕЙ. ПРОЕКТ НЕ НЕСЕТ ОТВЕТСТВЕННОСТИ ЗА ЛЮБЫЕ ФИНАНСОВЫЕ ПОТЕРИ, УБЫТКИ ИЛИ УПУЩЕННУЮ ВЫГОДУ, ВОЗНИКШИЕ В РЕЗУЛЬТАТЕ ИСПОЛЬЗОВАНИЯ ПЛАТФОРМЫ ИЛИ ОПИРАЮЩИЕСЯ НА ВЫВОДЫ ИИ. ТОРГОВЛЯ ВИРТУАЛЬНЫМИ ПРЕДМЕТАМИ (CS2) И КРИПТОВАЛЮТАМИ СОПРЯЖЕНА С ВЫСОКИМ РИСКОМ ПОЛНОЙ ПОТЕРИ СРЕДСТВ. ВСЕ РЕШЕНИЯ ПОЛЬЗОВАТЕЛЬ ПРИНИМАЕТ САМОСТОЯТЕЛЬНО И НА СВОЙ СТРАХ И РИСК.
        </p>
      </div>

    </div>
  );
};

export default Preview;