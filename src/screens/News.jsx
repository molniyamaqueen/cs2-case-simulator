import React from 'react';
import { Newspaper } from 'lucide-react';

const News = () => {
  return (
    <div className="w-full flex flex-col font-sans animate-fadeIn select-none min-h-screen">
      <div className="pt-8 pb-4 flex flex-col gap-1">
        <h1 className="text-white font-black text-2xl tracking-tighter uppercase">Новости</h1>
        <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.2em]">Обновления</span>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center mt-20 opacity-60">
        <div className="w-20 h-20 bg-white/5 rounded-[24px] flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
          <Newspaper size={32} className="text-zinc-400" />
        </div>
        <h2 className="text-xl font-black text-white mb-2 tracking-tight">Свежие патчи</h2>
        <p className="text-xs text-zinc-500 font-medium text-center max-w-[200px]">
          Здесь будет лента новостей проекта и дропов.
        </p>
      </div>
    </div>
  );
};

export default News;