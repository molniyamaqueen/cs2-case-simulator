import React from 'react';
import { Gamepad2, Sparkles, Flame } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext'; // 1. Импортируем хук

const Navigation = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage(); // 2. Достаем функцию перевода

  // ... (твой код триггера haptic)

  return (
    <nav className="...">
      {/* 3. Оборачиваем слова в t() */}
      <NavItem id="games" label={t('nav_games')} icon={<Gamepad2 />} activeColor="#d946ef" />
      <NavItem id="hub" label={t('nav_hub')} icon={<Sparkles />} activeColor="#06b6d4" />
      <NavItem id="intel" label={t('nav_intel')} icon={<Flame />} activeColor="#f97316" />
      {/* ... кнопка профиля ... */}
    </nav>
  );
};
