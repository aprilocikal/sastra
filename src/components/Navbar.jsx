import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Feather, LogOut, User, Menu, X } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang', path: '/about' },
    { name: 'Bank Konten', path: '/bank-konten' },
    { name: 'Komunitas', path: '/komunitas' },
    { name: 'Creator Hub', path: '/creator-hub' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="flex" style={{ gap: '0.6rem', minWidth: 'fit-content' }}>
          <div style={{ 
            width: '36px', 
            height: '36px', 
            borderRadius: '10px', 
            background: 'linear-gradient(135deg, var(--accent), #FF8A65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(255, 87, 51, 0.25)'
          }}>
            <Feather size={18} color="#fff" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>SASTRA</span>
            <span style={{ fontSize: '0.5rem', fontWeight: 500, color: 'var(--text-muted)', letterSpacing: '0.08em', marginTop: '2px' }}>
              SATU AKSARA · SATU ARAH BANGSA
            </span>
          </div>
        </Link>
        
        {/* Desktop Links */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {user ? (
          <div className="flex" style={{ gap: '0.75rem' }}>

            <button onClick={onLogout} style={{ 
              width: '34px', height: '34px', borderRadius: '50%', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-muted)', background: 'var(--bg-elevated)', border: '1px solid var(--border)'
            }}>
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <Link to="/login" className="nav-cta">
            <User size={14} />
            Masuk
          </Link>
        )}

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link 
            key={link.path} 
            to={link.path} 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            style={{ fontSize: '1.25rem', fontWeight: 700 }}
          >
            {link.name}
          </Link>
        ))}
        {!user && (
          <Link to="/login" className="btn btn-primary" onClick={() => setIsMobileMenuOpen(false)} style={{ marginTop: '1rem', justifyContent: 'center' }}>
            Masuk
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
