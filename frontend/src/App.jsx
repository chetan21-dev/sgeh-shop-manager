import * as React from 'react';
import { useState } from 'react';

// Import Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

// Import Pages
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Repairs from './pages/Repairs';

export const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      
      {/* SIDEBAR COMPONENT */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* MAIN LAYOUT */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        
        {/* NAVBAR COMPONENT */}
        <Navbar activeTab={activeTab} />

        {/* PAGES (Changes dynamically based on active tab) */}
        <div className="p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'inventory' && <Inventory />}
          {activeTab === 'repairs' && <Repairs />}
        </div>
        
      </div>
    </div>
  );
}