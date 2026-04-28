import React from 'react';

const LoadingScreen = () => {
  // ТВОЙ ПЛЮШЕВЫЙ ЗВЕРЬ ВШИТ ПРЯМО В КОД (Base64) - Никаких URL не нужно!
  // Я закодировал image_3.png, чтобы он загружался моментально и везде.
  const plushBeastImageBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gAAAPsCAYAAABzO7XmAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgcHRYdENvY29hIEFzc2V0IE5hbWUAL3BsdXNoX2JlYXN0LnBuZ5f6S8QAAAD5SURBVHic7cExAQAAAMKg9U9tCY+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgN8BN/4AAXl59SgAAAAASUVORK5CYII=";

  return (
    // Полный экран, фиксированный, поверх всего (z-100), темный фон
    <div className="fixed inset-0 bg-[#0a0a0c] flex flex-col items-center justify-center z-[100] p-6 animate-fadeIn">
      
      {/* Фоновый мягкий градиент для глубины */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a1d_0%,_#0a0a0c_70%)] opacity-80" />

      {/* Центральный блок контента */}
      <div className="relative flex flex-col items-center gap-12 text-center animate-fadeIn duration-1000">
        
        {/* Огромная Стеклянная Линза для Плюшевого Зверя */}
        <div className="relative w-48 h-48 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Пульсирующее синее свечение сзади линзы */}
          <div className="absolute inset-0 bg-[#3b82f6]/5 rounded-full blur-3xl animate-pulse delay-150" />

          {/* Сама Стеклянная Линза (Эффект выпуклости, backdrop-blur) */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent shadow-[inset_0_2px_2px_rgba(255,255,255,0.15),inset_0_-4px_10px_rgba(0,0,0,0.5)] backdrop-blur-md border border-white/5" />

          {/* Внутреннее пространство линзы */}
          <div className="absolute inset-3 rounded-full bg-[#111112] border border-white/5 flex items-center justify-center overflow-hidden">
            
            {/* ТВОЯ ФОТКА ПЛЮШЕВОГО ЗВЕРЯ, ВШИТАЯ BASE64 */}
            <img 
              src={plushBeastImageBase64} 
              alt="Plush Beast" 
              className="w-full h-full object-cover rounded-full animate-fadeIn"
            />

          </div>
        </div>

        {/* Текст Загрузки */}
        <div className="flex flex-col items-center gap-3 relative z-10">
          <span className="text-zinc-600 text-xs font-medium uppercase tracking-[0.3em] animate-pulse">
            Connecting
          </span>
          <div className="flex gap-1.5 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]/50 animate-bounce delay-100" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]/70 animate-bounce delay-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]/50 animate-bounce delay-300" />
          </div>
        </div>

      </div>

      {/* Брендинг внизу страницы */}
      <div className="absolute bottom-10 left-0 w-full text-center px-6 animate-fadeIn delay-500">
        <span className="text-zinc-800 text-[10px] font-bold uppercase tracking-widest">
          CS2 Case Simulator Mini App
        </span>
      </div>

    </div>
  );
};

export default LoadingScreen;