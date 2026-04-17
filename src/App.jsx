// Компонент отдельной кнопки навигации
  const NavItem = ({ id, icon, label, isAvatar }) => {
    const isActive = activeTab === id;

    return (
      <button
        onClick={() => { setActiveTab(id); triggerHaptic(); }}
        // Убрали квадратность, теперь сама кнопка имеет форму овала
        className={`relative flex flex-col items-center justify-center w-[76px] h-[54px] rounded-full transition-all duration-300 ${
          isActive ? 'text-white' : 'text-[#6b6b70] hover:text-gray-400'
        }`}
      >
        {/* ТОТ САМЫЙ ЭФФЕКТ ВЖАТОЙ КНОПКИ (Овал / Капля) */}
        {isActive && !isAvatar && (
          <div className="absolute inset-0 bg-[#0a0a0c]/80 shadow-[inset_0_3px_8px_rgba(0,0,0,0.8)] border-t border-b border-white/[0.02] rounded-full -z-10" />
        )}

        {isAvatar ? (
          // Аватарка (без вжатого фона, просто легкое свечение при активе)
          <div className={`w-8 h-8 rounded-full overflow-hidden transition-all duration-300 ${
            isActive ? 'ring-2 ring-white/10 scale-105' : 'opacity-70'
          }`}>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <>
            <div className={`transition-transform duration-300 ${isActive ? 'translate-y-[1px]' : ''} mb-1`}>
              {icon}
            </div>
            <span className={`text-[10px] font-medium leading-none tracking-wide transition-transform duration-300 ${isActive ? 'translate-y-[1px]' : ''}`}>
              {label}
            </span>
          </>
        )}
      </button>
    );
  };
