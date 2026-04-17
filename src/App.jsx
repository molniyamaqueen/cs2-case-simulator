const NavItem = ({ id, icon, label, isAvatar }) => {
    const isActive = activeTab === id;

    return (
      <button
        onClick={() => { setActiveTab(id); triggerHaptic(); }}
        className="relative flex flex-col items-center justify-center w-[76px] h-[54px] rounded-2xl transition-all duration-300"
      >
        {/* ЭФФЕКТ ВЖАТОЙ КАПЛИ (ЛУНКИ) */}
        {isActive && !isAvatar && (
          <div className="absolute inset-0 rounded-[18px] 
            bg-[#121214] 
            shadow-[inset_4px_4px_8px_rgba(0,0,0,0.9),inset_-1px_-1px_4px_rgba(255,255,255,0.05)]
            border border-white/5" 
          />
        )}

        <div className={`relative z-10 flex flex-col items-center transition-all duration-300 ${isActive ? 'scale-95 translate-y-[1px]' : 'text-[#545458]'}`}>
          {isAvatar ? (
             <div className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all ${isActive ? 'border-white/20' : 'border-transparent opacity-50'}`}>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="P" className="w-full h-full object-cover" />
             </div>
          ) : (
            <>
              <div className={isActive ? 'text-white' : ''}>{icon}</div>
              <span className="text-[9px] font-bold uppercase tracking-tighter mt-1">{label}</span>
            </>
          )}
        </div>
      </button>
    );
  };
