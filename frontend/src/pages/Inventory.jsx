import * as React from 'react';
import { APP_STRINGS } from '../constants/strings';

export default function Inventory() {
  const {INVENTORY} = APP_STRINGS
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-medium text-slate-700 mb-2">{INVENTORY.TITLE}</h3>
      <p className="text-slate-500 text-sm">{INVENTORY.DESCRIPTION}</p>
    </div>
  );
}