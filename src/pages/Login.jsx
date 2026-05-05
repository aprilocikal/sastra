import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Feather, Mail, Lock, ArrowRight, Eye, EyeOff, Loader2, Quote } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Identitas dan kunci akses wajib diisi.');
      return;
    }

    setLoading(true);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message === 'Invalid login credentials' 
        ? 'Identitas atau kunci akses salah.' 
        : authError.message);
      return;
    }

    if (data.user) {
      onLogin(data.user);
      navigate('/creator-hub');
    }
  };

  return (
    <div className="split-screen-layout">
      {/* Left Column - Form */}
      <div className="split-screen-form">
        <Link to="/" className="flex" style={{ gap: '0.75rem', marginBottom: '4rem', color: 'var(--accent)' }}>
          <div style={{ 
            width: '40px', height: '40px', borderRadius: '50%', 
            background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(255, 87, 51, 0.25)'
          }}>
            <Feather size={20} color="#FFF" />
          </div>
          <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.05em' }}>SASTRA</span>
        </Link>

        <div style={{ maxWidth: '420px', margin: 'auto 0' }}>
          <h1 style={{ fontSize: '3.5rem', fontFamily: 'Plus Jakarta Sans', fontWeight: 900, lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
            Portal<br/><span className="text-gradient">Kreator.</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '3rem', maxWidth: '380px' }}>
            Silakan masuk dengan akun kreator Anda untuk mengelola konten bermakna di SASTRA.
          </p>

          {error && (
            <div style={{ padding: '1rem', background: '#FFEBEE', color: '#C62828', borderRadius: '12px', marginBottom: '2rem', fontSize: '0.9rem', fontWeight: 500 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase' }}>Identitas Kreator</label>
              <div className="flex" style={{ background: 'var(--bg-elevated)', borderRadius: '16px', padding: '0 1.25rem', gap: '0.75rem', border: '2px solid transparent', transition: '0.3s' }}>
                <Mail size={18} color="var(--text-muted)" />
                <input 
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="kreator@sastra.com"
                  style={{ padding: '1.25rem 0', border: 'none', outline: 'none', width: '100%', fontSize: '0.95rem', background: 'transparent', color: 'var(--text-primary)', fontWeight: 500 }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase' }}>Kunci Akses Rahasia</label>
              <div className="flex" style={{ background: 'var(--bg-elevated)', borderRadius: '16px', padding: '0 1.25rem', gap: '0.75rem', border: '2px solid transparent', transition: '0.3s' }}>
                <Lock size={18} color="var(--text-muted)" />
                <input 
                  type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{ padding: '1.25rem 0', border: 'none', outline: 'none', width: '100%', fontSize: '0.95rem', background: 'transparent', color: 'var(--text-primary)', fontWeight: 500, letterSpacing: showPassword ? 'normal' : '0.2em' }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ color: 'var(--text-muted)' }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button className="btn-primary" type="submit" disabled={loading} style={{ 
              width: '100%', padding: '1.25rem', borderRadius: '16px',
              fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.15em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
              marginTop: '1.5rem', cursor: 'pointer', opacity: loading ? 0.7 : 1, border: 'none'
            }}>
              {loading ? <Loader2 size={18} className="animate-spin" /> : <>MASUK KE HUB <ArrowRight size={18} /></>}
            </button>
          </form>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', fontSize: '0.85rem' }}>
            <Link to="/forgot-password" style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Lupa Kunci Akses?</Link>
            <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 700 }}>Daftar Jadi Kreator</Link>
          </div>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="split-screen-image">
        <img 
          src="/login-bg.png" 
          alt="Library Background" 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, rgba(62,39,35,0.7), rgba(62,39,35,0.4))', zIndex: 1 }}></div>
        
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '600px' }}>
          <Quote size={48} color="rgba(255,255,255,0.2)" style={{ margin: '0 auto 1.5rem', transform: 'rotate(180deg)' }} />
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#FFF', lineHeight: 1.4, marginBottom: '3rem', fontFamily: 'Plus Jakarta Sans', letterSpacing: '-0.02em' }}>
            "Kualitas adalah resep rahasia paling <span style={{ color: '#FFB74D', fontStyle: 'italic' }}>pasti</span> dalam setiap gagasan yang kita sajikan."
          </h2>
          
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '1.25rem', 
            background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', 
            padding: '1rem 2rem', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(255, 87, 51, 0.25)' }}>
              <Feather size={20} color="#FFF" />
            </div>
            <div style={{ textAlign: 'left', color: '#FFF' }}>
              <div style={{ fontWeight: 800, fontSize: '1rem', fontFamily: 'Plus Jakarta Sans' }}>Arsitek Makna</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', opacity: 0.7, marginTop: '2px' }}>KREATOR SASTRA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
