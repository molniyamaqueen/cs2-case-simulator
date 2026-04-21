import React from 'react';
import { BookOpen, Play, ChevronRight } from 'lucide-react';

const GuideCard = ({ title, desc, tag }) => (
  <div className="bg-[#111112] border border-white/5 rounded-[32px] p-8 mb-4 hover:border-white/20 transition-all group active:scale-[0.98]">
    <div className="flex justify-between items-start mb-6">
       <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-zinc-500 uppercase tracking-widest">{tag}</span>
       <Play size={18} className="text-zinc-700 group-hover:text-white transition-all" />
    </div>
    <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">{title}</h3>
    <p className="text-sm font-bold text-zinc-500 leading-relaxed mb-6">{desc}</p>
    <div className="flex items-center gap-2 text-xs font-black uppercase text-white tracking-widest">
      Start Learning <ChevronRight size={14} />
    </div>
  </div>
);

// Используй это в Hub или отдельном экране
