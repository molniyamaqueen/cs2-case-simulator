import React from 'react';
import { Gamepad2, Sparkles, Flame, User } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const getActiveColor = (id) => {
    switch(id) {
      case 'games': return '#a855f7'; // Фиолетовый
      case 'hub': return '#06b6d4';   // Голубой
      case 'intel': return '#f97316'; // Оранжевый
      case 'profile': return '#ffffff'; // Белый
      default: return '#6a6a70';
    }
  };

  const NavItem = ({ id, icon }) => {
    const isActive = activeTab === id;
    const color = isActive ? getActiveColor(id) : '#6a6a70';
    
    return (
      <button 
        onClick={() => setActiveTab(id)}
        className="relative flex flex-col items-center justify-center w-[70px] h-[56px] transition-all duration-300"
      >
        <div style={{ color, filter: isActive ? `drop-shadow(0 0 8px ${color}80)` : 'none' }} className="transition-all duration-300">
            {React.cloneElement(icon, { size: 24, strokeWidth: isActive ? 2.5 : 2 })}
        </div>
      </button>
    );
  };

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#1c1c1e]/80 backdrop-blur-3xl border border-white/5 rounded-full p-2 flex justify-between items-center z-50">
      <NavItem id="games" icon={<Gamepad2 />} />
      <NavItem id="hub" icon={<Sparkles />} />
      <NavItem id="intel" icon={<Flame />} />
      <NavItem id="profile" icon={<User />} />
    </nav>
  );
};

export default Navigation;
