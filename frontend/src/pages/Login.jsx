// src/pages/Login.jsx
import * as React from 'react';
import { useState } from 'react';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { APP_STRINGS } from '../constants/strings';

export default function Login({ onLoginSuccess }) {
  const { BRAND, LOGIN } = APP_STRINGS;
  const {VITE_USERNAME,VITE_PASSWORD} = import.meta.env

  // Local state for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username === VITE_USERNAME && password === VITE_PASSWORD) {
      setErrorMessage('');
      onLoginSuccess(); // Trigger authentication state update in App.jsx
    } else {
      setErrorMessage(LOGIN.ERROR_INVALID);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4">
      
      {/* CARD CONTAINER */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-8 space-y-6">
        
        {/* BRANDING HEADER */}
        <div className="text-center space-y-2">
          <div className="inline-block bg-amber-500 text-slate-950 font-black text-xl px-4 py-1.5 rounded-xl tracking-wider">
            {BRAND.NAME_INITIALS}
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">{LOGIN.HEADING}</h2>
          <p className="text-sm text-slate-500">{LOGIN.SUBHEADING}</p>
        </div>

        {/* ERROR BOX */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-xl font-medium animate-shake">
            {errorMessage}
          </div>
        )}

        {/* CREDENTIALS FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* USERNAME FIELD */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
              {LOGIN.USERNAME_LABEL}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input 
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={LOGIN.USERNAME_PLACEHOLDER}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          {/* PASSWORD FIELD */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
              {LOGIN.PASSWORD_LABEL}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input 
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={LOGIN.PASSWORD_PLACEHOLDER}
                className="w-full pl-10 pr-10 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all bg-slate-50 focus:bg-white"
              />
              {/* Toggle visibility icon button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button 
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md hover:shadow-lg mt-2"
          >
            {LOGIN.BUTTON_TEXT}
          </button>
          
        </form>

      </div>

      {/* FOOTER METADATA */}
      <p className="text-xs text-slate-500 mt-6 font-medium">
        {BRAND.FULL_NAME} • {BRAND.VERSION}
      </p>

    </div>
  );
}