import React from 'react';
import { Building2 } from 'lucide-react';
import beastImg from '../assets/splash.png';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-[#0a0a0c] flex flex-col items-center justify-center z-[100]">
      {/* Фон без лишнего мусора */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a1d_0%,_#0a0a0c_70%)] opacity-95" />

      <div className="relative flex flex-col items-center gap-16">
        
        {/* Линза ГЛАЗОК - БЕЗ БЛЮРА */}
        <div className="relative w-64 h-64 rounded-full flex items-center justify-center shadow-[0_0_120px_rgba(0,0,0,1)]">
          
          {/* Стеклянный блик ПОВЕРХ картинки (z-30) */}
          <div className="absolute inset-0 rounded-full z-30 pointer-events-none shadow-[inset_0_8px_16px_rgba(255,255,255,0.2),inset_0_-8px_20px_rgba(0,0,0,0.9)] border border-white/10" />
          
          {/* Жесткая Виньетка (затемнение краев для эффекта глазка) */}
          <div className="absolute inset-0 rounded-full z-20 shadow-[inset_0_0_60px_rgba(0,0,0,1)] pointer-events-none" />

          {/* ЧЕТКАЯ КАРТИНКА (z-10) */}
          <div className="absolute inset-0 rounded-full overflow-hidden bg-black flex items-center justify-center z-10">
            <img 
              src={beastImg} 
              alt="Beast" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* ТОЛЬКО ПРЫГАЮЩИЕ ЗДАНИЯ - НИКАКИХ КРУГОВ */}
        <div className="flex items-end gap-6 h-12">
          <div className="animate-bounce [animation-duration:0.6s] [animation-delay:-0.3s]">
            <Building2 size={38} className="text-white opacity-40" />
          </div>
          <div className="animate-bounce [animation-duration:0.6s] [animation-delay:-0.15s]">
            <Building2 size={52} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
          </div>
          <div className="animate-bounce [animation-duration:0.6s]">
            <Building2 size={38} className="text-white opacity-40" />
          </div>
        </div>
      </div>

      {/* Брендинг */}
      <div className="absolute bottom-12 w-full text-center">
        <span className="text-zinc-900 text-[11px] font-black uppercase tracking-[0.7em]">
          Santa Lucia
        </span>
      </div>
    </div>
  );
};

export default LoadingScreen;