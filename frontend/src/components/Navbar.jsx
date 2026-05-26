import * as React from 'react';
import { APP_STRINGS } from '../constants/strings';

export default function Navbar({ activeTab }) {
  const {BRAND} = APP_STRINGS
  return (
    <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center w-full">
      <h2 className="text-xl font-semibold text-slate-800 capitalize">
        {activeTab === 'dashboard' ? 'Shop Overview' : activeTab + ' Management'}
      </h2>
      <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600">
        <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
        {BRAND.STATUS_LIVE}
      </div>
    </header>
  );
}