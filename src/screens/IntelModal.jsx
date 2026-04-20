import React from 'react';
import { X, Clock } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const IntelModal = ({ news, onClose }) => {
    const { t } = useLanguage();

    if (!news) return null;

    const getStyle = (typeKey) => {
        switch(typeKey) {
            case 'type_official': return 'border-white/20';
            case 'type_social': return 'border-yellow-500/40 text-yellow-500';
            case 'type_ai': return 'border-[#0abab5]/40 text-[#0abab5]';
            default: return 'border-white/10';
        }
    };

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-5 pb-10">
            <div onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300" />
            
            <div className={`relative w-full bg-[#1c1c1e] rounded-[32px] p-8 animate-in zoom-in-95 duration-300 shadow-[0_0_50px_rgba(0,0,0,0.8)] border ${getStyle(news.typeKey)}`}>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${getStyle(news.typeKey)}`}>
                            {t(news.sourceKey)}
                        </span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-zinc-500`}>
                            {t(news.typeKey)}
                        </span>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-zinc-400 border border-white/5 active:scale-95 transition-all"><X size={16} /></button>
                </div>
                
                <h2 className="text-xl font-bold leading-snug text-white mb-6 animate-in slide-in-from-left-2">{t(news.titleKey)}</h2>
                
                <div className="flex justify-between items-center text-zinc-500 text-[10px] font-bold uppercase border-t border-white/5 pt-4">
                    <div className="flex items-center gap-1.5"><Clock size={12}/> Live Data Feed</div>
                    <button onClick={onClose} className="py-3 px-6 bg-white/10 rounded-xl font-bold uppercase tracking-wider text-xs active:scale-95 transition-all">Close</button>
                </div>
            </div>
        </div>
    );
};

export default IntelModal;
