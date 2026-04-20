import React from 'react';
import { Gamepad2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Games = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-full px-5 pt-8 pb-32 flex flex-col items-center justify-center animate-in fade-in duration-500">
      
      <div className="flex flex-col items-center gap-6 text-center border border-white/5 p-10 rounded-[32px] bg-[#111112]">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-[#d946ef]">
            <Gamepad2 size={50} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter italic text-white uppercase">{t('nav_games')}</h1>
          <p className="text-sm font-bold text-zinc-500 leading-snug">
            {t('under_con')}... <br/>
            Wait for the next AI core drop.
          </p>
          <button className="h-14 px-10 bg-[#d946ef]/10 text-[#d946ef] rounded-full font-bold uppercase tracking-wider text-xs border border-[#d946ef]/20 active:scale-95 transition-all">
            Join Waitlist
          </button>
      </div>
      
    </div>
  );
};

export default Games;
