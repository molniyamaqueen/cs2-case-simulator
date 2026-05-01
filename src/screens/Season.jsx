// src/screens/Season.jsx

import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Sparkles, 
  TrendingUp, 
  Activity,
  Layers,
  ArrowUpRight,
  ShieldAlert,
  BarChart2,
  ChevronDown,
  Clock,
  Target,
  Zap,
  DollarSign,
  AlertTriangle,
  Flame,
  Globe,
  Crosshair,
  Lock
} from 'lucide-react';

// === ТЯНЕМ ДАННЫЕ ИЗ ТВОЕГО ОТДЕЛЬНОГО ФАЙЛА ===
// Поменяй путь '../utils/SeasonData' на тот, где у тебя реально лежит этот файл
import { armoryUpdateData } from '../utils/SeasonData'; 

const Season = () => {
  // --- STATE ---
  const [isLoading, setIsLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [expandedMeta, setExpandedMeta] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Имитация загрузки API
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleRoute = (routeName) => {
    setActiveModal(routeName);
  };

  const toggleMeta = (id) => {
    if (expandedMeta === id) setExpandedMeta(null);
    else setExpandedMeta(id);
  };

  // --- ЛОАДЕР (СКЕЛЕТОН) ---
  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00d2ff]/5 blur-[100px] rounded-full" />
        <Activity size={32} className="text-[#00d2ff] animate-pulse mb-6 relative z-10" />
        <div className="flex flex-col items-center gap-2 relative z-10">
          <span className="text-white font-black text-sm uppercase tracking-[0.3em]">Syncing Hub</span>
          <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Fetching Steam API Data...</span>
        </div>
        <div className="w-48 h-1 bg-zinc-900 rounded-full mt-8 overflow-hidden relative z-10">
          <div className="h-full bg-[#00d2ff] w-1/2 animate-[pulse_1s_ease-in-out_infinite]" />
        </div>
      </div>
    );
  }

  // --- ОСНОВНОЙ РЕНДЕР ---
  return (
    <div className="w-full flex flex-col font-sans animate-fadeIn select-none pb-32 bg-[#050505] min-h-screen">
      
      {/* 1. ГЛОБАЛЬНЫЙ ХЕДЕР */}
      <div className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 pt-12 pb-4 px-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-white font-black text-2xl tracking-tighter uppercase flex items-center gap-2">
              Season Hub
            </h1>
            <span className="text-[#00d2ff] font-bold text-[10px] uppercase tracking-[0.2em] mt-1 flex items-center gap-1.5">
              <Globe size={10} /> Network Active
            </span>
          </div>
          
          {/* Статус Live */}
          <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-[14px] border border-emerald-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute" />
            <div className="w-2 h-2 rounded-full bg-emerald-400 relative z-10" />
            <span className="text-emerald-400 font-black text-[10px] uppercase tracking-widest">Live</span>
          </div>
        </div>

        {/* Навигационные табы внутри экрана */}
        <div className="flex gap-2 w-full overflow-x-auto hide-scrollbar pb-2">
          {['overview', 'economy', 'weapons', 'maps'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-[16px] font-black text-[10px] uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                  : 'bg-[#111114] text-zinc-500 border border-white/5 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 mt-6 flex flex-col gap-8">

        {/* --- 2. HERO КАРТОЧКА --- */}
        <div 
          onClick={() => handleRoute('hero_banner')}
          className="w-full relative bg-[#0a0a0c] rounded-[36px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 active:scale-[0.98] transition-all duration-300 cursor-pointer group"
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00d2ff]/50 to-transparent z-20" />
          
          <div className="relative w-full h-[400px] bg-black">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/40 via-transparent to-[#0a0a0c] z-10" />
            <img 
              src="/assets/map.jpg" 
              alt="Map" 
              className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[3px] group-hover:scale-110 group-hover:blur-[1px] transition-all duration-700"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1614680376593-902f74a6cecb?q=80&w=2000&auto=format&fit=crop' }}
            />
            
            <div className="absolute inset-0 flex items-center justify-center p-6 z-10 drop-shadow-[0_30px_40px_rgba(0,0,0,1)]">
               <img 
                 src="/assets/gun.png" 
                 alt="Weapon" 
                 className="w-full max-w-[280px] object-contain transform -rotate-12 group-hover:-translate-y-4 group-hover:rotate-[-5deg] transition-all duration-700 ease-out"
                 onError={(e) => { e.target.style.display = 'none' }}
               />
            </div>

            <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
              <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 flex items-center gap-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] w-fit">
                <Crosshair size={12} className="text-[#00d2ff]" />
                <span className="text-white font-black text-[9px] uppercase tracking-widest">{armoryUpdateData.patchVersion}</span>
              </div>
            </div>
            
            <div className="absolute top-6 right-6 z-20">
              <div className="px-3 py-1.5 bg-[#00d2ff]/10 backdrop-blur-md rounded-xl border border-[#00d2ff]/20 flex items-center gap-2">
                <Clock size={12} className="text-[#00d2ff]" />
                <span className="text-[#00d2ff] font-black text-[9px] uppercase tracking-widest">{armoryUpdateData.daysLeft} DAYS</span>
              </div>
            </div>
          </div>

          <div className="px-7 pb-8 pt-6 relative z-20 bg-[#0a0a0c] -mt-10 rounded-t-[36px] border-t border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-1 bg-[#00d2ff] rounded-full" />
              <span className="text-[10px] text-[#00d2ff] font-black uppercase tracking-[0.3em]">Major Update</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic mb-4 leading-none">
              {armoryUpdateData.seasonTitle}
            </h1>
            <p className="text-xs font-medium text-zinc-400 leading-relaxed mb-8">
              {armoryUpdateData.heroDescription}
            </p>

            <button className="w-full py-5 bg-white text-black rounded-[20px] flex items-center justify-center gap-3 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] group-hover:bg-[#00d2ff] group-hover:text-white group-hover:shadow-[0_0_30px_rgba(0,210,255,0.3)] duration-300">
              <span className="text-xs font-black uppercase tracking-[0.2em]">Enter The Armory</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>

        {/* --- 3. ИНТЕРАКТИВНАЯ МАРКЕТ ДАТА --- */}
        <div className="flex flex-col gap-3">
          <div className="flex items-end justify-between px-2">
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-black text-white uppercase tracking-[0.25em] flex items-center gap-2">
                <BarChart2 size={16} className="text-[#00d2ff]" />
                Market Analytics
              </span>
              <span className="text-[9px] font-bold text-zinc-500 uppercase">Impact on inventory value</span>
            </div>
            <button onClick={() => handleRoute('full_market')} className="text-[9px] text-[#00d2ff] font-black uppercase tracking-widest bg-[#00d2ff]/10 px-3 py-1.5 rounded-lg">View All</button>
          </div>

          <div className="w-full bg-[#111114] rounded-[32px] p-6 border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden">
            {/* Блик */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d2ff]/5 blur-[60px] rounded-full pointer-events-none" />
            
            {/* График и тренд */}
            <div className="flex justify-between items-start mb-8 relative z-10 border-b border-white/5 pb-6">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest flex items-center gap-1">
                  <DollarSign size={12} /> Global Index
                </span>
                <span className="text-3xl font-black text-white tracking-tighter">{armoryUpdateData.marketData.globalTrend}</span>
                <span className="text-[9px] text-emerald-400 font-bold uppercase mt-1 flex items-center gap-1">
                  <TrendingUp size={10} /> Bullish trend detected
                </span>
              </div>
              
              {/* CSS Мини-график */}
              <div className="flex items-end gap-1.5 h-12">
                {armoryUpdateData.marketData.chartData.map((height, i) => (
                  <div key={i} className="w-2 bg-[#00d2ff]/20 rounded-t-sm relative group cursor-pointer" style={{ height: '100%' }}>
                    <div 
                      className={`absolute bottom-0 w-full rounded-t-sm transition-all duration-1000 ${i === armoryUpdateData.marketData.chartData.length - 1 ? 'bg-[#00d2ff]' : 'bg-white/20 group-hover:bg-[#00d2ff]/50'}`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div onClick={() => handleRoute('top_gainer')} className="bg-[#0a0a0c] p-5 rounded-[24px] border border-white/5 shadow-inner flex flex-col cursor-pointer active:scale-95 transition-all group">
                <div className="w-8 h-8 rounded-full bg-[#ff4444]/10 flex items-center justify-center mb-3 group-hover:bg-[#ff4444]/20 transition-colors">
                  <Flame size={14} className="text-[#ff4444]" />
                </div>
                <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mb-1">Top Gainer</span>
                <span className="text-sm font-black text-white mb-1">{armoryUpdateData.marketData.topGainer}</span>
                <span className="text-xs text-[#ff4444] font-black">{armoryUpdateData.marketData.gainerGrowth}</span>
              </div>

              <div onClick={() => handleRoute('ton_volume')} className="bg-[#0a0a0c] p-5 rounded-[24px] border border-white/5 shadow-inner flex flex-col cursor-pointer active:scale-95 transition-all group">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center mb-3 group-hover:bg-blue-500/20 transition-colors">
                  <Activity size={14} className="text-blue-500" />
                </div>
                <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mb-1">24H Volume</span>
                <span className="text-sm font-black text-white mb-1">{armoryUpdateData.marketData.tonVolume}</span>
                <span className="text-xs text-zinc-400 font-bold">{armoryUpdateData.marketData.activeTraders} users</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- 4. НОВЫЕ КОЛЛЕКЦИИ (Горизонтальный скролл) --- */}
        <div className="flex flex-col gap-4">
          <div className="px-2">
            <span className="text-[11px] font-black text-white uppercase tracking-[0.25em] flex items-center gap-2">
              <Lock size={16} className="text-purple-400" />
              New Drops
            </span>
          </div>
          
          <div className="flex gap-4 overflow-x-auto hide-scrollbar px-2 pb-4">
            {armoryUpdateData.newCollections.map((col) => (
              <div 
                key={col.id}
                onClick={() => handleRoute(`collection_${col.id}`)}
                className="min-w-[160px] bg-[#111114] p-5 rounded-[24px] border border-white/5 flex flex-col relative overflow-hidden cursor-pointer active:scale-95 transition-all"
              >
                <div className={`absolute top-0 right-0 w-16 h-16 ${col.color}/20 blur-[20px] rounded-full`} />
                <div className={`w-3 h-3 rounded-full ${col.color} mb-4 shadow-[0_0_10px_currentColor]`} />
                <span className="text-sm font-black text-white mb-1">{col.name}</span>
                <span className="text-[10px] text-zinc-500 font-bold">{col.items} Items • {col.rarity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- 5. РАЗВЕРНУТАЯ СИСТЕМА META SHIFT (Accordion) --- */}
        <div className="flex flex-col gap-3">
          <div className="px-2 flex flex-col gap-1.5 mb-2">
            <span className="text-[11px] font-black text-white uppercase tracking-[0.25em] flex items-center gap-2">
              <Target size={16} className="text-[#ff4444]" />
              Meta Shift Log
            </span>
            <span className="text-[9px] font-bold text-zinc-500 uppercase">Weapon & Mechanics Adjustments</span>
          </div>

          <div className="bg-[#111114] rounded-[32px] border border-white/5 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
            {armoryUpdateData.metaShifts.map((shift, index) => (
              <div key={shift.id} className={`flex flex-col ${index !== armoryUpdateData.metaShifts.length - 1 ? 'border-b border-white/5' : ''}`}>
                
                {/* Видимая часть (Header) */}
                <div 
                  onClick={() => toggleMeta(shift.id)}
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#0a0a0c] rounded-[16px] border border-white/5 flex items-center justify-center text-xl shadow-inner relative overflow-hidden">
                      <div className={`absolute inset-0 opacity-20 ${shift.change === 'Nerf' ? 'bg-red-500' : 'bg-emerald-500'}`} />
                      <span className="relative z-10">{shift.icon}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-black text-white tracking-tight">{shift.weapon}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-[6px] ${
                          shift.change === 'Nerf' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                          shift.change === 'Fix' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                          'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {shift.change}
                        </span>
                        <span className="text-[8px] font-bold text-zinc-500 uppercase">{shift.type}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown size={16} className={`text-zinc-500 transition-transform duration-300 ${expandedMeta === shift.id ? 'rotate-180' : ''}`} />
                </div>

                {/* Скрытая часть (Детали при клике) */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedMeta === shift.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-5 pt-0 bg-white/[0.02]">
                    <div className="w-full h-[1px] bg-white/5 mb-4" />
                    <p className="text-[11px] font-medium text-zinc-400 leading-relaxed mb-4">
                      {shift.details}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Market Impact Rating</span>
                      <span className={`text-[10px] font-black uppercase ${shift.impact === 'Critical' ? 'text-purple-400' : shift.impact === 'High' ? 'text-red-400' : 'text-yellow-400'}`}>
                        {shift.impact}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleRoute(`analyze_${shift.id}`); }}
                      className="w-full mt-4 py-3 bg-[#0a0a0c] border border-white/5 rounded-xl text-[10px] font-black text-white uppercase tracking-widest active:bg-white/10 transition-colors"
                    >
                      Deep Analyze
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* --- МОДАЛЬНОЕ ОКНО РОУТИНГА --- */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-fadeIn" onClick={() => setActiveModal(null)} />
          <div className="relative w-full max-w-md bg-[#0a0a0c] rounded-t-[40px] sm:rounded-[40px] border-t sm:border border-white/10 p-8 shadow-[0_-20px_60px_rgba(0,0,0,1)] animate-slideUp">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00d2ff]/50 to-transparent" />
            <div className="w-16 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />
            
            <div className="w-16 h-16 bg-[#00d2ff]/10 rounded-2xl border border-[#00d2ff]/20 flex items-center justify-center mb-6">
              <Zap size={24} className="text-[#00d2ff]" />
            </div>

            <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">System Route</h2>
            <p className="text-xs font-medium text-zinc-400 mb-8 leading-relaxed">
              Вызов роутера: <span className="text-[#00d2ff] font-mono bg-[#00d2ff]/10 px-2 py-0.5 rounded">/{activeModal}</span>.<br/><br/>
              Этот компонент кликабелен. В рабочей версии приложения здесь произойдет переход на детальный экран с графиками и статистикой.
            </p>
            
            <button 
              onClick={() => setActiveModal(null)}
              className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-[20px] active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Season;