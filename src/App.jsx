import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hub from './screens/Hub';
import Games from './screens/Games';
import Intel from './screens/Intel';
import Profile from './screens/Profile';

const App = () => {
  const [activeTab, setActiveTab] = useState('hub');

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
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      <Header onMenuClick={() => setActiveTab('profile')} /> 
      <main className="flex-1 overflow-y-auto pb-24">
        {renderScreen()}
      </main>
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
