import React from 'react';
import './App.css';
import Analytics from './pages/Analytics';
import Sidebar from './features/sidebar/Sidebar';
function App() {
  return (
    <div className="app">
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className='main-content'>
        <Analytics />
      </div>
    </div>
  );
}

export default App;
