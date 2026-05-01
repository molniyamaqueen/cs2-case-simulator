import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Zap, 
  Layers, 
  Star, 
  Share2, 
  BarChart3, 
  Sparkles,
  Info
} from 'lucide-react';

const Season = () => {
  // --- STATE ---
  const [lang, setLang] = useState('RU');
  const [activeSkinIndex, setActiveSkinIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [vote, setVote] = useState(null);
  const [floatValue, setFloatValue] = useState(0.01); // Для Float Slider

  // --- MOCK DATA (Тот самый "Мост") ---
  const seasonData = {
    title: "SEASON 01: THE ARSENAL",
    endDate: "2026-06-15T00:00:00",
    metaShift: [
      { id: 1, name: "M4A1-S", change: "-10% Damage", status: "nerf", icon: "🔫" },
      { id: 2, name: "Dust 2", change: "+ Map Pool", status: "buff", icon: "🗺️" },
      { id: 3, name: "Eagle", change: "+ Accuracy", status: "buff", icon: "🦅" }
    ],
    skins: [
      { 
        id: 1, 
        name: "AWP | Dragon Lore", 
        collection: "Cobblestone", 
        rarity: "Covert", 
        price: "12,450", 
        img: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7c2D9Vv8B0jLzE9N6s3Fbs_0trN2n7dtSccVNoN1_R-VPrle_u08W9vM6bm3R9-n5f-mZz" 
      },
      { 
        id: 2, 
        name: "M4A4 | Howl", 
        collection: "Huntsman", 
        rarity: "Contraband", 
        price: "8,200", 
        img: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW09Kzm7-GkvP9JrafwDMHscYm3b6TrI_03Vfkr0ZpZ271LdCcdwVqNF_R_Fm4ye_m08S76MzAnXp9-n51-6S_Lg" 
      }
    ],
    marketImpact: {
      globalTrend: "+4.2%",
      tonVolume: "1.2M",
      topGainer: "Knives (+8%)"
    }
  };

  // Таймер обратного отсчета
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(seasonData.endDate).getTime() - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setTimeLeft(`${days}d ${hours}h left`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex flex-col font-sans select-none pb-24 bg-[#F8F9FA] min-h-screen">
      
      {/* --- 1. HEADER (Minimalist) --- */}
      <div className="flex items-center justify-between px-6 pt-6 mb-8">
        <button className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm active:scale-90 transition-all border border-zinc-100">
          <ChevronLeft size={20} className="text-zinc-900" />
        </button>
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 rounded-2xl shadow-lg">
          <Clock size={14} className="text-white opacity-60" />
          <span className="text-white font-black text-[10px] uppercase tracking-wider">{timeLeft}</span>
        </div>
      </div>

      {/* --- 2. HERO CARD (Cryptomannn Style - 70% Visual) --- */}
      <div className="mx-4 relative group mb-10 overflow-hidden bg-white rounded-[40px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-zinc-100">
        <div className="relative h-[450px] w-full overflow-hidden">
          {/* Фон: Блюр карты */}
          <div className="absolute inset-0 bg-[url('https://images.wallpapersden.com/image/download/counter-strike-2-dust-2-map_bWpsa26UmZqaraWkpJRmbmdlrWZlbWU.jpg')] bg-cover bg-center scale-110 blur-sm opacity-20" />
          
          {/* Контент поверх */}
          <div className="relative z-10 h-full flex flex-col justify-between p-8">
            <div className="flex justify-between items-start">
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-zinc-900 text-white text-[9px] font-black rounded-lg uppercase tracking-widest">Patch 1.2</span>
                <span className="px-3 py-1 bg-white text-zinc-900 text-[9px] font-black rounded-lg uppercase tracking-widest border border-zinc-200 shadow-sm">Economy</span>
              </div>
              <button className="p-2 bg-white/50 backdrop-blur-md rounded-full text-zinc-900">
                <Share2 size={18} />
              </button>
            </div>

            <div className="flex flex-col">
              <h1 className="text-[44px] font-black text-zinc-900 leading-[0.9] tracking-tighter mb-4 italic">
                {seasonData.title}
              </h1>
              <p className="text-sm font-medium text-zinc-500 max-w-[240px] leading-relaxed">
                Explore the latest meta shifts and the legendary collection of the Arsenal.
              </p>
            </div>
          </div>

          {/* Плавающий скин (Visual 70%) */}
          <div className="absolute top-[15%] right-[-10%] w-[320px] rotate-[-15deg] drop-shadow-[0_40px_40px_rgba(0,0,0,0.3)] animate-float">
             <img src={seasonData.skins[0].img} alt="Skin" className="w-full h-auto" />
          </div>
        </div>
      </div>

      {/* --- 3. META SHIFT METER (Compact Infographic) --- */}
      <div className="px-8 mb-4 flex justify-between items-end">
        <h3 className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.3em]">Meta Shift Log</h3>
        <Zap size={14} className="text-[#00d2ff]" />
      </div>

      <div className="flex flex-col gap-2 px-4 mb-10">
        {seasonData.metaShift.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-[28px] border border-zinc-100 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-xl shadow-inner italic border border-zinc-100">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-black text-zinc-900">{item.name}</span>
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{item.change}</span>
              </div>
            </div>
            {item.status === 'nerf' ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-500 rounded-full">
                <TrendingDown size={14} strokeWidth={3} />
                <span className="text-[9px] font-black uppercase">Nerf</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-500 rounded-full">
                <TrendingUp size={14} strokeWidth={3} />
                <span className="text-[9px] font-black uppercase">Buff</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* --- 4. INTERACTIVE SKIN VIEWER (Horizontal Scroll + Flip) --- */}
      <div className="px-8 mb-5 flex justify-between items-center">
        <h3 className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.3em]">Season Collection</h3>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
        </div>
      </div>

      <div className="w-full flex overflow-x-auto gap-5 px-4 no-scrollbar mb-8 snap-x">
        {seasonData.skins.map((skin, idx) => (
          <div 
            key={skin.id}
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-w-[280px] snap-center relative"
          >
            <div className={`relative w-full h-[340px] transition-all duration-700 preserve-3d ${isFlipped && activeSkinIndex === idx ? 'rotate-y-180' : ''}`}>
              
              {/* Front Side */}
              <div className="absolute inset-0 backface-hidden bg-white rounded-[32px] p-6 shadow-xl border border-zinc-100 flex flex-col justify-between overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-400/5 blur-[40px]" />
                <div className="flex justify-between items-start">
                  <span className="px-2 py-0.5 bg-zinc-900 text-white text-[8px] font-black rounded uppercase">{skin.rarity}</span>
                  <Sparkles size={14} className="text-zinc-200" />
                </div>
                <img src={skin.img} className="w-full h-auto drop-shadow-2xl py-4" alt="Skin" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{skin.collection}</span>
                  <span className="text-[17px] font-black text-zinc-900">{skin.name}</span>
                </div>
              </div>

              {/* Back Side (Info) */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-zinc-900 rounded-[32px] p-8 flex flex-col justify-between text-white shadow-2xl">
                <div className="flex flex-col gap-4">
                  <h4 className="text-sm font-black uppercase tracking-widest text-zinc-500">Market Data</h4>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-[10px] uppercase font-bold opacity-60">Avg. Price</span>
                    <span className="text-lg font-black text-[#00d2ff]">${skin.price}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-[10px] uppercase font-bold opacity-60">Demand</span>
                    <span className="text-sm font-bold">Ultra High 🔥</span>
                  </div>
                </div>
                {/* FLOAT SLIDER (The Feature!) */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between text-[8px] font-black uppercase tracking-widest opacity-40">
                    <span>Float: {floatValue.toFixed(4)}</span>
                    <span>Wear Logic</span>
                  </div>
                  <input 
                    type="range" min="0" max="1" step="0.0001" 
                    value={floatValue} onChange={(e) => setFloatValue(parseFloat(e.target.value))}
                    className="w-full accent-[#00d2ff] bg-white/10 h-1 rounded-full appearance-none"
                  />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* --- 5. MARKET IMPACT (Dashboard) --- */}
      <div className="mx-4 p-7 bg-white rounded-[32px] shadow-xl border border-zinc-100 flex flex-col gap-6 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-white">
              <BarChart3 size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-black text-zinc-900">Market Impact</span>
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Seasonal Trend Analysis</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-[17px] font-black text-green-500">{seasonData.marketImpact.globalTrend}</span>
             <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-tighter italic">Total Growth</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
             <span className="text-[8px] font-black text-zinc-400 uppercase block mb-1">TON Volume</span>
             <span className="text-lg font-black text-zinc-900">{seasonData.marketImpact.tonVolume} <span className="text-xs">TON</span></span>
           </div>
           <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
             <span className="text-[8px] font-black text-zinc-400 uppercase block mb-1">Top Gainer</span>
             <span className="text-lg font-black text-zinc-900">{seasonData.marketImpact.topGainer}</span>
           </div>
        </div>
      </div>

      {/* --- 6. VOTING WIDGET (Engagement) --- */}
      <div className="mx-4 bg-zinc-900 p-8 rounded-[40px] shadow-2xl flex flex-col items-center gap-6 mb-12">
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
           <Star size={24} fill={vote ? "currentColor" : "none"} />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-black text-white tracking-tighter uppercase italic">Rate the Season</h3>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Your feedback impacts the next drop</p>
        </div>
        <div className="flex gap-4">
           {[1,2,3,4,5].map(star => (
             <button 
              key={star} 
              onClick={() => setVote(star)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black border transition-all ${vote >= star ? 'bg-[#00d2ff] border-[#00d2ff] text-white shadow-[0_0_15px_rgba(0,210,255,0.4)]' : 'bg-white/5 border-white/5 text-zinc-600'}`}
             >
               {star}
             </button>
           ))}
        </div>
      </div>

    </div>
  );
};

export default Season;