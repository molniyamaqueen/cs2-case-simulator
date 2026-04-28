import React from 'react';
import LoadingScreen from './components/LoadingScreen';

function App() {
  // Мы убираем всю лишнюю логику. 
  // Сейчас задача номер один — увидеть зверя.
  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <LoadingScreen />
    </div>
  );
}

export default App;