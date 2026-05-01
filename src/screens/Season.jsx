// src/screens/Season.jsx

import React, { useState } from 'react';
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

// Подтягиваем данные (убедись, что путь правильный)
import { armoryUpdateData } from '../utils/SeasonData'; 

const Season = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [expandedMeta, setExpandedMeta] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleRoute = (routeName) => setActiveModal(routeName);

  const toggleMeta = (id) => {
    if (expandedMeta === id) setExpandedMeta(null);
    else setExpandedMeta(id);
  };

  // --- ОСНОВНОЙ РЕНДЕР (Грузится моментально) ---
  return (
    <div className="w-full flex flex-col font-sans animate-fadeIn select-none pb-32 bg-[#F5F5F7] min-h-screen">
      
      {/* 1. ГЛОБАЛЬНЫЙ ХЕДЕР */}
      <div className="sticky top-0 z-40 bg-[#F5F5F7]/90 backdrop-blur-xl border-b border-zinc-200 pt-12 pb-4 px-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-zinc-900 font-black text-2xl tracking-tighter uppercase flex items-center gap-2">
              Season Hub
            </h1>
            <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-1 flex items-center gap-1.5">
              <Globe size={10} /> Network Active
            </span>
          </div>
          
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-[14px] border border-zinc-200 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute" />
            <div className="w-2 h-2 rounded-full bg-emerald-500 relative z-10" />
            <span className="text-zinc-900 font-black text-[10px] uppercase tracking-widest">Live</span>
          </div>
        </div>

        <div className="flex gap-2 w-full overflow-x-auto hide-scrollbar pb-2">
          {['overview', 'economy', 'weapons', 'maps'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-[16px] font-black text-[10px] uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-zinc-900 text-white shadow-[0_8px_16px_rgba(0,0,0,0.15)]' 
                  : 'bg-white text-zinc-500 border border-zinc-200 hover:text-zinc-900'
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
          className="w-full relative bg-white rounded-[36px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-zinc-100 active:scale-[0.98] transition-all duration-300 cursor-pointer group"
        >
          <div className="relative w-full h-[380px] bg-zinc-100 overflow-hidden">
            <img 
              src="/assets/map.jpg" 
              alt="Map" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 blur-[2px] group-hover:scale-105 group-hover:blur-[1px] transition-all duration-700"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1614680376593-902f74a6cecb?q=80&w=2000&auto=format&fit=crop' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40 z-10" />
            
            <div className="absolute inset-0 flex items-center justify-center p-6 z-10 drop-shadow-2xl">
               <img 
                 src="/assets/gun.png" 
                 alt="Weapon" 
                 className="w-full max-w-[280px] object-contain transform -rotate-12 group-hover:-translate-y-4 group-hover:rotate-[-5deg] transition-all duration-700 ease-out"
                 onError={(e) => { e.target.style.display = 'none' }}
               />
            </div>

            <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
              <div className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl border border-white flex items-center gap-2 shadow-sm w-fit">
                <Crosshair size={12} className="text-zinc-900" />
                <span className="text-zinc-900 font-black text-[9px] uppercase tracking-widest">{armoryUpdateData.patchVersion}</span>
              </div>
            </div>
            
            <div className="absolute top-6 right-6 z-20">
              <div className="px-3 py-1.5 bg-zinc-900/90 backdrop-blur-md rounded-xl flex items-center gap-2 shadow-sm">
                <Clock size={12} className="text-white" />
                <span className="text-white font-black text-[9px] uppercase tracking-widest">{armoryUpdateData.daysLeft} DAYS</span>
              </div>
            </div>
          </div>

          <div className="px-7 pb-8 pt-8 relative z-20 bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-1 bg-zinc-900 rounded-full" />
              <span className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em]">Major Update</span>
            </div>
            <h1 className="text-4xl font-black text-zinc-900 tracking-tighter uppercase italic mb-4 leading-none">
              {armoryUpdateData.seasonTitle}
            </h1>
            <p className="text-xs font-medium text-zinc-500 leading-relaxed mb-8">
              {armoryUpdateData.heroDescription}
            </p>

            <button className="w-full py-5 bg-zinc-900 text-white rounded-[20px] flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(0,0,0,0.15)] group-hover:bg-zinc-800 transition-colors">
              <span className="text-xs font-black uppercase tracking-[0.2em]">Enter The Armory</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>

        {/* --- 3. ИНТЕРАКТИВНАЯ МАРКЕТ ДАТА --- */}
        <div className="flex flex-col gap-3">
          <div className="flex items-end justify-between px-2">
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-black text-zinc-900 uppercase tracking-[0.25em] flex items-center gap-2">
                <BarChart2 size={16} className="text-zinc-900" />
                Market Analytics
              </span>
              <span className="text-[9px] font-bold text-zinc-500 uppercase">Impact on inventory value</span>
            </div>
            <button onClick={() => handleRoute('full_market')} className="text-[9px] text-zinc-900 font-black uppercase tracking-widest bg-white border border-zinc-200 px-3 py-1.5 rounded-lg shadow-sm">View All</button>
          </div>

          <div className="w-full bg-white rounded-[32px] p-6 border border-zinc-100 shadow-[0_15px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
            <div className="flex justify-between items-start mb-8 relative z-10 border-b border-zinc-100 pb-6">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest flex items-center gap-1">
                  <DollarSign size={12} /> Global Index
                </span>
                <span className="text-3xl font-black text-zinc-900 tracking-tighter">{armoryUpdateData.marketData.globalTrend}</span>
                <span className="text-[9px] text-emerald-500 font-bold uppercase mt-1 flex items-center gap-1">
                  <TrendingUp size={10} /> Bullish trend detected
                </span>
              </div>
              
              <div className="flex items-end gap-1.5 h-12">
                {armoryUpdateData.marketData.chartData.map((height, i) => (
                  <div key={i} className="w-2 bg-zinc-100 rounded-t-sm relative group cursor-pointer" style={{ height: '100%' }}>
                    <div 
                      className={`absolute bottom-0 w-full rounded-t-sm transition-all duration-1000 ${i === armoryUpdateData.marketData.chartData.length - 1 ? 'bg-zinc-900' : 'bg-zinc-300 group-hover:bg-zinc-500'}`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div onClick={() => handleRoute('top_gainer')} className="bg-zinc-50 p-5 rounded-[24px] border border-zinc-100 flex flex-col cursor-pointer active:scale-95 transition-all group">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                  <Flame size={14} className="text-red-500" />
                </div>
                <span className="text-[9px] text-zinc-400 font-black uppercase tracking-widest mb-1">Top Gainer</span>
                <span className="text-sm font-black text-zinc-900 mb-1">{armoryUpdateData.marketData.topGainer}</span>
                <span className="text-xs text-red-500 font-black">{armoryUpdateData.marketData.gainerGrowth}</span>
              </div>

              <div onClick={() => handleRoute('ton_volume')} className="bg-zinc-50 p-5 rounded-[24px] border border-zinc-100 flex flex-col cursor-pointer active:scale-95 transition-all group">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                  <Activity size={14} className="text-blue-500" />
                </div>
                <span className="text-[9px] text-zinc-400 font-black uppercase tracking-widest mb-1">24H Volume</span>
                <span className="text-sm font-black text-zinc-900 mb-1">{armoryUpdateData.marketData.tonVolume}</span>
                <span className="text-xs text-zinc-500 font-bold">{armoryUpdateData.marketData.activeTraders} users</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- 4. НОВЫЕ КОЛЛЕКЦИИ --- */}
        <div className="flex flex-col gap-4">
          <div className="px-2">
            <span className="text-[11px] font-black text-zinc-900 uppercase tracking-[0.25em] flex items-center gap-2">
              <Lock size={16} className="text-zinc-900" />
              New Drops
            </span>
          </div>
          
          <div className="flex gap-4 overflow-x-auto hide-scrollbar px-2 pb-4">
            {armoryUpdateData.newCollections.map((col) => (
              <div 
                key={col.id}
                onClick={() => handleRoute(`collection_${col.id}`)}
                className="min-w-[160px] bg-white p-5 rounded-[24px] border border-zinc-200 shadow-[0_10px_20px_rgba(0,0,0,0.03)] flex flex-col relative overflow-hidden cursor-pointer active:scale-95 transition-all"
              >
                <div className={`w-3 h-3 rounded-full ${col.color} mb-4`} />
                <span className="text-sm font-black text-zinc-900 mb-1">{col.name}</span>
                <span className="text-[10px] text-zinc-500 font-bold">{col.items} Items • {col.rarity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- 5. РАЗВЕРНУТАЯ СИСТЕМА META SHIFT --- */}
        <div className="flex flex-col gap-3">
          <div className="px-2 flex flex-col gap-1.5 mb-2">
            <span className="text-[11px] font-black text-zinc-900 uppercase tracking-[0.25em] flex items-center gap-2">
              <Target size={16} className="text-zinc-900" />
              Meta Shift Log
            </span>
            <span className="text-[9px] font-bold text-zinc-500 uppercase">Weapon & Mechanics Adjustments</span>
          </div>

          <div className="bg-white rounded-[32px] border border-zinc-200 shadow-[0_15px_30px_rgba(0,0,0,0.04)] overflow-hidden">
            {armoryUpdateData.metaShifts.map((shift, index) => (
              <div key={shift.id} className={`flex flex-col ${index !== armoryUpdateData.metaShifts.length - 1 ? 'border-b border-zinc-100' : ''}`}>
                
                <div 
                  onClick={() => toggleMeta(shift.id)}
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-zinc-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-[16px] border border-zinc-200 shadow-sm flex items-center justify-center text-xl">
                      <span className="relative z-10">{shift.icon}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-black text-zinc-900 tracking-tight">{shift.weapon}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-[6px] ${
                          shift.change === 'Nerf' ? 'bg-red-50 text-red-600' : 
                          shift.change === 'Fix' ? 'bg-blue-50 text-blue-600' :
                          'bg-emerald-50 text-emerald-600'
                        }`}>
                          {shift.change}
                        </span>
                        <span className="text-[8px] font-bold text-zinc-400 uppercase">{shift.type}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown size={16} className={`text-zinc-400 transition-transform duration-300 ${expandedMeta === shift.id ? 'rotate-180' : ''}`} />
                </div>

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedMeta === shift.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-5 pt-0 bg-zinc-50/50">
                    <div className="w-full h-[1px] bg-zinc-200 mb-4" />
                    <p className="text-[11px] font-medium text-zinc-600 leading-relaxed mb-4">
                      {shift.details}
                    </p>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleRoute(`analyze_${shift.id}`); }}
                      className="w-full py-3 bg-white border border-zinc-200 rounded-xl text-[10px] font-black text-zinc-900 uppercase tracking-widest hover:bg-zinc-100 transition-colors shadow-sm"
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

      {/* --- МОДАЛЬНОЕ ОКНО --- */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm animate-fadeIn" onClick={() => setActiveModal(null)} />
          <div className="relative w-full max-w-md bg-white rounded-t-[40px] sm:rounded-[40px] p-8 shadow-2xl animate-slideUp">
            <div className="w-16 h-1.5 bg-zinc-200 rounded-full mx-auto mb-8" />
            
            <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mb-6">
              <Zap size={24} className="text-zinc-900" />
            </div>

            <h2 className="text-2xl font-black text-zinc-900 mb-2 uppercase tracking-tighter">System Route</h2>
            <p className="text-xs font-medium text-zinc-500 mb-8 leading-relaxed">
              Вызов роутера: <span className="text-zinc-900 font-mono bg-zinc-100 px-2 py-0.5 rounded">/{activeModal}</span>.<br/><br/>
              Здесь будет переход на детальный экран с графиками.
            </p>
            
            <button 
              onClick={() => setActiveModal(null)}
              className="w-full py-5 bg-zinc-900 text-white font-black uppercase tracking-[0.2em] text-xs rounded-[20px] active:scale-95 transition-all shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Season;