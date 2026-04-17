import React from 'react';

const App = () => {
  return (
    <div className="flex flex-col h-screen bg-[#0a0a0c] text-green-500 items-center justify-center font-black text-2xl uppercase tracking-widest">
      <span className="mb-2">SYSTEM READY 🟢</span>
      <span className="text-xs text-gray-500">Waiting for new prompt...</span>
    </div>
  );
};

export default App;
