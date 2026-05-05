import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BankKonten from './pages/BankKonten';
import DetailKonten from './pages/DetailKonten';
import CreatorHub from './pages/CreatorHub';
import Community from './pages/Community';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import { supabase } from './lib/supabase';
import './index.css';

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppLayout = ({ user, onLogin, onLogout }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password';

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isAuthPage && <Navbar user={user} onLogout={onLogout} />}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bank-konten" element={<BankKonten />} />
          <Route path="/konten/:id" element={<DetailKonten />} />
          <Route path="/creator-hub" element={
            <ProtectedRoute user={user}>
              <CreatorHub user={user} />
            </ProtectedRoute>
          } />
          <Route path="/komunitas" element={<Community />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={
            user ? <Navigate to="/creator-hub" replace /> : <Login onLogin={onLogin} />
          } />
          <Route path="/register" element={
            user ? <Navigate to="/creator-hub" replace /> : <Register onLogin={onLogin} />
          } />
          <Route path="/forgot-password" element={
            user ? <Navigate to="/creator-hub" replace /> : <ForgotPassword />
          } />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Initial splash screen timer
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2800);

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex" style={{ minHeight: '100vh', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <div className="animate-spin" style={{ width: '36px', height: '36px', border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%' }}></div>
      </div>
    );
  }

  return (
    <>
      <div className={`splash-screen ${!showSplash ? 'hide' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>
          <div className="splash-logo">
            <div style={{ 
              width: '64px', height: '64px', borderRadius: '50%', 
              background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(255, 87, 51, 0.3)'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                <line x1="16" y1="8" x2="2" y2="22"></line>
                <line x1="17.5" y1="15" x2="9" y2="15"></line>
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="splash-text">SASTRA</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Satu Aksara Bangsa</span>
            </div>
          </div>
          
          <div className="splash-progress">
            <div className="splash-progress-bar"></div>
          </div>
        </div>
      </div>

      <Router>
        <AppLayout user={user} onLogin={handleLogin} onLogout={handleLogout} />
      </Router>
    </>
  );
}

export default App;
