
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import MenuView from './views/MenuView';
import AdminView from './views/AdminView';
import LoginView from './views/LoginView';
import { supabase } from './supabase';
import { Language } from './types';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('it');
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => (prev === 'it' ? 'en' : 'it'));
  }, []);

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-900 text-slate-50 selection:bg-amber-500 selection:text-slate-900">
        <Routes>
          <Route 
            path="/" 
            element={<MenuView language={language} toggleLanguage={toggleLanguage} />} 
          />
          <Route 
            path="/admin" 
            element={session ? <AdminView language={language} toggleLanguage={toggleLanguage} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={!session ? <LoginView /> : <Navigate to="/admin" />} 
          />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
