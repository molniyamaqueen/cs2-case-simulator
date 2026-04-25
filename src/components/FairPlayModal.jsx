import React from 'react';
import { X, Scale, ShieldCheck, Server } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const FairPlayModal = ({ onClose }) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col justify-end">
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in" />
      
      <div className="relative w-full h-[85vh] bg-[#111112] rounded-t-[32px] p-6 pb-12 animate-in slide-in-from-bottom-full overflow-y-auto border-t border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black italic uppercase text-white">Transparency</h2>
          <button onClick={onClose} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-zinc-400">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 text-zinc-400 text-sm leading-relaxed">
          {/* Блок 1: Provably Fair */}
          <div className="bg-black/50 p-5 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-3 text-white">
              <Scale size={20} className="text-[#0abab5]" />
              <h3 className="font-bold uppercase tracking-widest text-xs">Алгоритм Provably Fair (Честная Игра)</h3>
            </div>
            <p>
              Платформа Santa Lucia использует криптографический алгоритм Provably Fair. Мы не можем физически повлиять на исход игры. 
              Генерация выигрышного билета происходит до начала раунда с использованием серверного сида (Server Seed) и публичного хэша, 
              который каждый игрок может верифицировать после завершения пула. Шанс победы строго пропорционален объему внесенных средств (TON) в общий пул.
            </p>
          </div>

          {/* Блок 2: Экономика и Rake */}
          <div className="bg-black/50 p-5 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-3 text-white">
              <ShieldCheck size={20} className="text-purple-500" />
              <h3 className="font-bold uppercase tracking-widest text-xs">Комиссия системы (Rake)</h3>
            </div>
            <p>
              Платформа взимает фиксированную комиссию (House Edge) в размере 5% от общего банка (Pot) в момент розыгрыша. 
              Эти средства направляются на поддержание ликвидности смарт-контрактов, оплату транзакционных комиссий сети TON 
              и формирование еженедельного фонда Mega Drop. Никаких скрытых сборов не существует.
            </p>
          </div>

          {/* Блок 3: Инфраструктура */}
          <div className="bg-black/50 p-5 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-3 text-white">
              <Server size={20} className="text-yellow-500" />
              <h3 className="font-bold uppercase tracking-widest text-xs">Техническая интеграция</h3>
            </div>
            <p>
              Santa Lucia работает как децентрализованный интерфейс (dApp) внутри среды Telegram WebApp. 
              Все депозиты и выводы обрабатываются через публичные смарт-контракты TON. Задержки при первом входе 
              связаны исключительно с синхронизацией нод и защитой от DDoS-атак.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FairPlayModal;
