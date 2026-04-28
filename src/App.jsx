import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';

function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('preview');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); 
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      {/* Контент приложения */}
      <div className="flex items-center justify-center h-screen opacity-20">
        <h1 className="text-2xl font-bold italic tracking-tighter">
          {activeTab.toUpperCase()}
        </h1>
      </div>
      
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;