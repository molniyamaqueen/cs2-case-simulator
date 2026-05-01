// src/utils/SeasonData.js

export const armoryUpdateData = {
  seasonTitle: "THE ARMORY",
  patchVersion: "Build 1.40.2.7",
  status: "LIVE",
  daysLeft: 43,
  heroDescription: "Over 100 new items including 3 new weapon collections, a new weapon case, stickers, and the introduction of Weapon Charms. The meta has shifted.",
  
  marketData: {
    globalTrend: "+12.4%",
    topGainer: "Weapon Charms",
    gainerGrowth: "+45%",
    tonVolume: "2.4M TON",
    activeTraders: "142,890",
    chartData: [40, 65, 45, 80, 55, 90, 100]
  },

  metaShifts: [
    {
      id: "m4a1s",
      weapon: "M4A1-S",
      change: "Nerf",
      type: "Damage Dropoff",
      details: "Урон на дальних дистанциях снижен на 10%. Эффективность спрея на Dust 2 (Long) значительно упала. Экономика осталась прежней.",
      impact: "High",
      icon: "🔫"
    },
    {
      id: "deagle",
      weapon: "Desert Eagle",
      change: "Buff",
      type: "Recovery Time",
      details: "Время восстановления прицела после прыжка уменьшено. Хитбоксы головы при стрейфах синхронизированы с анимацией сервера.",
      impact: "Medium",
      icon: "🦅"
    },
    {
      id: "smoke",
      weapon: "Smoke Grenade",
      change: "Mechanics",
      type: "Volumetric Fix",
      details: "Тени внутри дымовой завесы теперь рендерятся корректно. Исправлен критический баг 'одностороннего дыма' на краях текстур.",
      impact: "Critical",
      icon: "💨"
    }
  ],

  newCollections: [
    { id: 1, name: "Overpass 2024", items: 17, rarity: "Covert", color: "bg-red-500" },
    { id: 2, name: "Graphic Cast", items: 16, rarity: "Classified", color: "bg-fuchsia-500" },
    { id: 3, name: "Sport & Field", items: 16, rarity: "Restricted", color: "bg-purple-500" },
    { id: 4, name: "Gallery Case", items: 17, rarity: "Mil-Spec", color: "bg-blue-500" }
  ],

  patchNotes: [
    { id: "charms", title: "Weapon Charms (Брелоки)", tag: "NEW ITEM", desc: "Добавлены брелоки 'Missing Link'. Можно прикрепить в любое место." },
    { id: "telemetry", title: "Телеметрия сети", tag: "SYSTEM", desc: "Улучшены графики потери пакетов (jitter) и чтения тикрейта." },
    { id: "anim", title: "Синхронизация анимаций", tag: "ENGINE", desc: "Исправлены рывки ногтивной модели при подсадках на Mirage." }
  ]
};