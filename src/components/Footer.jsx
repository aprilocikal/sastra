import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, Globe, Send, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ 
      background: '#FFFFFF', 
      borderTop: '1px solid var(--border)',
      padding: '5rem 0 2rem'
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '3rem' }}>
          {/* Brand */}
          <div>
            <Link to="/" className="flex" style={{ gap: '0.6rem', marginBottom: '1.5rem' }}>
              <div style={{ 
                width: '36px', height: '36px', borderRadius: '10px', 
                background: 'linear-gradient(135deg, var(--accent), #FF8A65)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Feather size={18} color="#fff" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>SASTRA</span>
                <span style={{ fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginTop: '2px' }}>SATU AKSARA · SATU ARAH BANGSA</span>
              </div>
            </Link>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '280px' }}>
              Membangun peradaban digital melalui produksi, kurasi, dan distribusi konten bermakna nasional.
            </p>
            <div className="flex" style={{ gap: '0.75rem', marginTop: '1.5rem' }}>
              {[Send, Globe, Mail].map((Icon, i) => (
                <a key={i} href="#" style={{ 
                  width: '36px', height: '36px', borderRadius: '10px', 
                  background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)', transition: 'var(--transition)'
                }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Platform</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <li><Link to="/bank-konten" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Bank Konten</Link></li>
              <li><Link to="/komunitas" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Komunitas</Link></li>
              <li><Link to="/creator-hub" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Creator Hub</Link></li>
            </ul>
          </div>

          {/* Tentang */}
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Tentang</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <li><a href="/about#visi-misi" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Visi & Misi</a></li>
              <li><a href="/about#tim-redaksi" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Tim Redaksi</a></li>
              <li><a href="/about#hubungi-kami" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Hubungi Kami</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Legal</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <li><span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Kebijakan Privasi</span></li>
              <li><span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Ketentuan Layanan</span></li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '4rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>© 2024 SASTRA. Satu Aksara, Satu Arah Bangsa.</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Arsitek Peradaban Digital 🇮🇩</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
