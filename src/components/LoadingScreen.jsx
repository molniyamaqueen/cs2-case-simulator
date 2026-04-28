import React from 'react';
// Этот импорт заставляет Vite "увидеть" файл, где бы он ни лежал
import beastImg from '../assets/splash.png';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-[#0a0a0c] flex flex-col items-center justify-center z-[100]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a1d_0%,_#0a0a0c_70%)] opacity-90" />

      <div className="relative flex flex-col items-center gap-10">
        {/* Линза */}
        <div className="relative w-64 h-64 rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(0,0,0,0.6)]">
          <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 to-transparent shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)] border border-white/10 backdrop-blur-md z-10" />
          
          <div className="absolute inset-2 rounded-full overflow-hidden bg-[#0d0d0f] flex items-center justify-center">
            <img 
              src={beastImg} 
              alt="Loading Beast" 
              className="w-full h-full object-cover animate-fadeIn"
              onError={(e) => console.log("Ошибка загрузки: проверь путь к src/assets/splash.png")}
            />
          </div>
        </div>

        {/* Текст и точки */}
        <div className="flex flex-col items-center gap-5">
          <div className="flex gap-2.5">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
          </div>
          <span className="text-zinc-500 text-[11px] font-black uppercase tracking-[0.5em] ml-[0.5em]">
            Connecting
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;