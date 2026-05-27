import * as React from 'react';
import { useState } from 'react';

// Import Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

// Import Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Repairs from './pages/Repairs';

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedSession = localStorage.getItem('sgeh_admin_logged_in');
    return savedSession === 'true'; // Returns true if saved, otherwise false
  });
  const [activeTab, setActiveTab] = useState('dashboard');

  // 3. Handle a successful login
  const handleLoginSuccess = () => {
    localStorage.setItem('sgeh_admin_logged_in', 'true'); // Save session marker
    setIsAuthenticated(true);
  };

  // 4. Handle logging out
  const handleLogout = () => {
    localStorage.removeItem('sgeh_admin_logged_in'); // Destroy session marker
    setIsAuthenticated(false);
  };
  
  if (!isAuthenticated) {
      return <Login onLoginSuccess={handleLoginSuccess} />;
    }

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      
      {/* SIDEBAR COMPONENT */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

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