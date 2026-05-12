import React from 'react';
import { GraduationCap } from 'lucide-react';

const Academy = () => {
  return (
    <div className="w-full flex flex-col font-sans animate-fadeIn select-none min-h-screen">
      <div className="pt-8 pb-4 flex flex-col gap-1">
        <h1 className="text-white font-black text-2xl tracking-tighter uppercase">Академия</h1>
        <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.2em]">Обучение</span>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center mt-20 opacity-60">
        <div className="w-20 h-20 bg-white/5 rounded-[24px] flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.05)]">
          <GraduationCap size={32} className="text-blue-500/50" />
        </div>
        <h2 className="text-xl font-black text-white mb-2 tracking-tight">Тренировочный лагерь</h2>
        <p className="text-xs text-zinc-500 font-medium text-center max-w-[200px]">
          Проходи уроки и повышай свой скилл трейдера.
        </p>
      </div>
    </div>
  );
};

export default Academy;