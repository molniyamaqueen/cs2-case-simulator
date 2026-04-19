import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Hub from './screens/Hub';
import Games from './screens/Games';
import Intel from './screens/Intel';
import Profile from './screens/Profile';

const App = () => {
  const [activeTab, setActiveTab] = useState('hub');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderScreen = () => {
    switch (activeTab) {
      case 'games': return <Games />;
      case 'hub': return <Hub />;
      case 'intel': return <Intel />;
      case 'profile': return <Profile />;
      default: return <Hub />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden font-sans">
      <Header onMenuClick={() => setActiveTab('profile')} /> 
      <main className="flex-1 overflow-y-auto">
        {renderScreen()}
      </main>
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
