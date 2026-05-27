import * as React from 'react';
import { LayoutDashboard, Package, Wrench,LogOut } from 'lucide-react';
import { APP_STRINGS } from '../constants/strings';

export default function Sidebar({ activeTab, setActiveTab,onLogout }) {
    const {BRAND,TABS} = APP_STRINGS
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between h-screen sticky top-0">
      <div>
        {/* Shop Branding Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-wider text-amber-400">{BRAND.NAME_INITIALS}</h1>
          <p className="text-xs text-slate-400 mt-1">{BRAND.FULL_NAME}</p>
        </div>
        
        {/* Navigation Links */}
        <nav className="mt-6 px-3 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <LayoutDashboard size={20} /> {TABS.DASHBOARD}
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'inventory' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <Package size={20} /> {TABS.INVENTORY}
          </button>
          <button 
            onClick={() => setActiveTab('repairs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'repairs' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <Wrench size={20} /> {TABS.REPAIRS}
          </button>
        </nav>
      </div>
      
      {/* BOTTOM SECTION: ADMIN DETAILS & ACTION LOGOUT BUTTON */}
        <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-950/40">
          <div className="text-center text-[11px] text-slate-500 font-medium">
            {BRAND.VERSION} • {BRAND.MODE}
          </div>
          
          {/* LOGOUT INTERACTIVE ACTION BUTTON */}
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-rose-600/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/20 hover:border-transparent transition-all"
          >
            <LogOut size={16} />
            {BRAND.LOGOUT}
          </button>
        </div>
    </aside>
  );
}