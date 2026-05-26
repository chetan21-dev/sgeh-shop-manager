import * as React from 'react';
import { APP_STRINGS } from '../constants/strings';

export default function Repairs() {
  const {REPAIRS} = APP_STRINGS
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-medium text-slate-700 mb-2">{REPAIRS.TITLE}</h3>
      <p className="text-slate-500 text-sm">{REPAIRS.DESCRIPTION}</p>
    </div>
  );
}