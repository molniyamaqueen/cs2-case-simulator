// Этот файл отвечает за всю связь с Telegram и бэкендом

export const getTelegramUser = () => {
  try {
    const tg = window.Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      const user = tg.initDataUnsafe.user;
      return {
        id: user.id,
        username: user.username ? `@${user.username}` : user.first_name,
        // TG WebApp отдает photo_url, если юзер разрешил доступ к аватарке
        avatar: user.photo_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200", 
        firstName: user.first_name,
      };
    }
  } catch (error) {
    console.error("Ошибка получения данных ТГ:", error);
  }
  
  // Фейковые данные для теста в обычном браузере (вне ТГ)
  return {
    id: 123456789,
    username: "@test_user_pc",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    firstName: "Test User"
  };
};

export const generateRefLink = (userId) => {
  // Твой ник бота. Когда юзер перейдет, бот получит команду /start ref_123456789
  const BOT_USERNAME = "ТВОЙ_БОТ_USERNAME_bot"; 
  return `https://t.me/${BOT_USERNAME}?start=ref_${userId}`;
};

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  try { window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('heavy'); } catch (e) {}
};
