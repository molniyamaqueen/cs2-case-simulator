import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import Arena from './screens/Arena'; // Путь к твоим экранам

function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('arena');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    // Добавили pb-32, чтобы навигация не перекрывала контент
    <div className="min-h-screen bg-[#0a0a0c] text-white p-5 pb-32">
      <main className="max-w-md mx-auto">
        {activeTab === 'arena' && <Arena />}
        {activeTab === 'inventory' && <div className="text-center mt-20">Inventory Coming Soon</div>}
        {activeTab === 'profile' && <div className="text-center mt-20">Profile Coming Soon</div>}
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;