// ЭКРАН ЗАСТАВКИ (Та самая картинка с OS)
  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-[#0d0d0f] z-[999] flex flex-col items-center justify-center overflow-hidden animate-out fade-out duration-1000 delay-2000">
        
        {/* Изображение на весь экран */}
        <div className="absolute inset-0 w-full h-full">
            <img 
              src="/splash.png" /* <--- ВОТ ЗДЕСЬ МЕНЯЕМ ПУТЬ */
              alt="loading screen" 
              className="w-full h-full object-cover"
            />
        </div>

        {/* Нативная верхняя панель */}
        <div className="absolute top-0 left-0 w-full z-10 px-4 py-3 flex justify-between items-center bg-[#0d0d0f]/50 backdrop-blur-sm">
           <div className="text-zinc-600 text-xs font-bold uppercase tracking-widest">{t('nav_hub')}...</div>
           <div className="bg-white/5 px-6 py-2.5 rounded-full flex items-center gap-2 border border-white/5">
             <span className="text-base font-black tracking-wide">0 TON</span>
           </div>
        </div>
        
      </div>
    );
  }
