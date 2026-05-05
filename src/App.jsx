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

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
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
    <Router>
      <AppLayout user={user} onLogin={handleLogin} onLogout={handleLogout} />
    </Router>
  );
}

export default App;
