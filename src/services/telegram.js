// src/services/telegram.js

export const getTelegramData = () => {
  const tg = window.Telegram?.WebApp;
  
  if (tg) {
    tg.ready();
    tg.expand(); // Открываем на весь экран
    
    return {
      // Подтягиваем реального юзера (если зашли с ПК/Телефона)
      user: tg.initDataUnsafe?.user ? {
        id: tg.initDataUnsafe.user.id,
        username: tg.initDataUnsafe.user.username || tg.initDataUnsafe.user.first_name,
        // Telegram не отдает прямую ссылку на аву в initData, 
        // обычно её парсят ботом, но пока ставим заглушку для MVP
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" 
      } : null,
      
      // Метод для покупки за Stars (Пункт 2 ТЗ)
      buyWithStars: (invoiceUrl, onSuccess) => {
        tg.openInvoice(invoiceUrl, (status) => {
          if (status === 'paid') onSuccess();
        });
      }
    };
  }
  
  // Фолбэк для тестов в обычном браузере (вне Телеги)
  return {
    user: { id: 12345, username: "Guest_Dev", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" },
    buyWithStars: () => alert("Оплата Звездами работает только в Telegram!")
  };
};
