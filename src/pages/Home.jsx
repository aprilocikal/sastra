import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, BookOpen, Users, Award, Loader2, Sparkles, Zap, Target } from 'lucide-react';
import { TRENDING_TOPICS } from '../data';
import ContentCard from '../components/ContentCard';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../services/api';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      setLoading(true);
      const data = await fetchBooks('pendidikan kritis indonesia', 6);
      setFeatured(data);
      setLoading(false);
    };
    loadFeatured();
  }, []);

  const stats = [
    { value: '12K+', label: 'Konten Terkurasi', icon: <BookOpen size={20} /> },
    { value: '5K+', label: 'Kreator Aktif', icon: <Users size={20} /> },
    { value: '98%', label: 'Kualitas Terverifikasi', icon: <Award size={20} /> },
  ];

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero mesh-bg">
        <img 
          src="/hero-bg.png" 
          alt="" className="hero-bg"
        />
        <div className="hero-overlay"></div>
        <div className="container animate-fade-up" style={{ position: 'relative', zIndex: 2 }}>
          <div className="badge badge-accent" style={{ marginBottom: '1.5rem' }}>
            <Sparkles size={12} style={{ marginRight: '0.4rem', display: 'inline' }} />
            Platform Digital Nasional
          </div>
          <h1>
            Membangun{' '}
            <span className="text-gradient">Peradaban Digital</span>
            <br />melalui Konten Bermakna
          </h1>
          <p>Pusat produksi, kurasi, dan distribusi konten edukatif untuk meningkatkan kualitas pola pikir kritis dan reflektif masyarakat Indonesia.</p>
          <div className="hero-btns">
            <Link to="/bank-konten" className="btn btn-primary" style={{ padding: '0.85rem 2rem' }}>
              Jelajahi Konten
              <ArrowRight size={18} />
            </Link>
            <Link to="/creator-hub" className="btn btn-outline" style={{ padding: '0.85rem 2rem' }}>
              Mulai Berkarya
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="flex" style={{ justifyContent: 'center', gap: '3rem', marginTop: '5rem', flexWrap: 'wrap' }}>
            {stats.map(stat => (
              <div key={stat.label} className="flex" style={{ gap: '0.75rem' }}>
                <div style={{ 
                  width: '44px', height: '44px', borderRadius: '12px', 
                  background: 'var(--accent-subtle)', border: '1px solid rgba(255, 107, 53, 0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' 
                }}>
                  {stat.icon}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.25rem', fontFamily: 'Plus Jakarta Sans' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="section container">
        <div className="flex" style={{ justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Konten <span className="text-gradient">Unggulan</span></h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Pilihan editor dari konten paling berdampak minggu ini.</p>
          </div>
          <Link to="/bank-konten" className="btn btn-ghost" style={{ gap: '0.5rem' }}>
            Lihat Semua <ArrowRight size={16} />
          </Link>
        </div>
        
        {loading ? (
          <div className="flex" style={{ justifyContent: 'center', padding: '4rem 0', flexDirection: 'column', gap: '1rem' }}>
            <Loader2 size={36} className="animate-spin" style={{ color: 'var(--accent)' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Memuat konten bermakna...</p>
          </div>
        ) : (
          <div className="responsive-grid-3">
            {featured.slice(0, 6).map(content => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        )}
      </section>

      {/* Categories & Trending */}
      <section className="section mesh-bg" style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="responsive-grid-2-asym">
            <div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Eksplorasi <span className="text-gradient-cool">Kategori</span></h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>Temukan konten sesuai bidang minat Anda.</p>
              <div className="responsive-grid-2">
                {[
                  { name: 'Edukasi', desc: 'Literasi, filsafat, dan belajar', icon: <BookOpen size={24} />, color: 'var(--accent)', bg: 'var(--accent-subtle)' },
                  { name: 'Teknologi', desc: 'AI, digitalisasi, dan inovasi', icon: <Zap size={24} />, color: 'var(--secondary)', bg: 'var(--secondary-subtle)' },
                  { name: 'Sosial', desc: 'Sosiologi dan isu kemanusiaan', icon: <Users size={24} />, color: 'var(--teal)', bg: 'var(--teal-subtle)' },
                  { name: 'Budaya', desc: 'Warisan nusantara dan kearifan lokal', icon: <Target size={24} />, color: 'var(--accent)', bg: 'var(--accent-subtle)' },
                ].map(cat => (
                  <Link key={cat.name} to="/bank-konten" className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ 
                      width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
                      background: cat.bg, color: cat.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {cat.icon}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{cat.name}</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{cat.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Trending</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>Topik terhangat saat ini.</p>
              <div className="card" style={{ padding: '1.25rem' }}>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {TRENDING_TOPICS.map((topic, index) => (
                    <li key={topic} className="flex" style={{ gap: '0.75rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-muted)', minWidth: '1.75rem', fontFamily: 'Plus Jakarta Sans' }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <Link to="/bank-konten" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{topic}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section container">
        <div className="card" style={{ 
          padding: '4rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05), rgba(108, 99, 255, 0.05))',
          border: '1px solid rgba(255, 107, 53, 0.1)',
          borderRadius: 'var(--radius-2xl)'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Siap Menjadi <span className="text-gradient">Arsitek Peradaban?</span></h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
              Bergabunglah dengan ribuan akademisi dan kreator dalam membangun ekosistem ide berdampak.
            </p>
            <Link to="/creator-hub" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
              Daftar Sebagai Kreator
              <ArrowRight size={18} />
            </Link>
          </div>
          {/* Glow effects */}
          <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255, 107, 53, 0.06)', filter: 'blur(80px)' }}></div>
          <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(108, 99, 255, 0.06)', filter: 'blur(80px)' }}></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
