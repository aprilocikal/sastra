import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, ChevronDown, Loader2, PlusCircle, Sparkles } from 'lucide-react';
import { CATEGORIES, FORMATS, LEVELS } from '../data';
import ContentCard from '../components/ContentCard';
import { fetchBooks } from '../services/api';
import { Link } from 'react-router-dom';

const BankKonten = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const query = activeCategory === 'Semua' ? 'pendidikan filsafat indonesia' : `pendidikan ${activeCategory}`;
      const data = await fetchBooks(query, 12);
      setContents(data);
      setLoading(false);
    };
    loadData();
  }, [activeCategory]);

  const handleSearch = async (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setLoading(true);
      const data = await fetchBooks(searchQuery, 12);
      setContents(data);
      setLoading(false);
    }
  };
  
  return (
    <div>
      {/* Header */}
      <section className="hero" style={{ padding: '7rem 0 5rem' }}>
        <img 
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1920" 
          alt="" className="hero-bg"
        />
        <div className="hero-overlay"></div>
        <div className="container animate-fade-up" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <div className="badge badge-accent" style={{ marginBottom: '1rem' }}>
                <Sparkles size={12} style={{ marginRight: '0.4rem', display: 'inline' }} />
                Koleksi Terkurasi
              </div>
              <h1 style={{ fontSize: '3rem', textAlign: 'left', marginBottom: '0.75rem' }}>Bank Konten <span className="text-gradient">Bermakna</span></h1>
              <p style={{ textAlign: 'left', maxWidth: '500px', margin: 0 }}>Eksplorasi ribuan konten berkualitas yang telah dikurasi untuk membangun kecerdasan kolektif bangsa.</p>
            </div>
            <Link to="/creator-hub" className="btn btn-primary" style={{ padding: '1rem 2rem', gap: '0.5rem' }}>
              <PlusCircle size={20} />
              Unggah Karya Tulis
            </Link>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <div className="container" style={{ padding: '3rem 2rem 6rem' }}>
        <div className="responsive-sidebar-grid">
          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: '100px' }}>
            <div className="card" style={{ padding: '1.25rem' }}>
              <div className="flex" style={{ justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 className="flex" style={{ gap: '0.5rem', fontSize: '0.9rem', fontWeight: 700 }}>
                  <Filter size={16} /> Filter
                </h3>
                <button onClick={() => setActiveCategory('Semua')} style={{ color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 600 }}>Reset</button>
              </div>

              {/* Kategori */}
              <div style={{ marginBottom: '1.75rem' }}>
                <h4 style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Kategori</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {['Semua', ...CATEGORIES].map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      style={{ 
                        textAlign: 'left', 
                        padding: '0.5rem 0.75rem', 
                        borderRadius: 'var(--radius)',
                        fontSize: '0.85rem',
                        fontWeight: activeCategory === cat ? 600 : 400,
                        background: activeCategory === cat ? 'var(--accent-subtle)' : 'transparent',
                        color: activeCategory === cat ? 'var(--accent)' : 'var(--text-secondary)',
                        border: activeCategory === cat ? '1px solid rgba(255, 107, 53, 0.15)' : '1px solid transparent'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Format */}
              <div style={{ marginBottom: '1.75rem' }}>
                <h4 style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Format</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {FORMATS.map(format => (
                    <label key={format} className="flex" style={{ gap: '0.6rem', fontSize: '0.85rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                      <input type="checkbox" style={{ accentColor: 'var(--accent)', width: '14px', height: '14px' }} />
                      <span style={{ textTransform: 'capitalize' }}>{format}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Level */}
              <div>
                <h4 style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Level</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {LEVELS.map(level => (
                    <label key={level} className="flex" style={{ gap: '0.6rem', fontSize: '0.85rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                      <input type="checkbox" style={{ accentColor: 'var(--accent)', width: '14px', height: '14px' }} />
                      <span style={{ textTransform: 'capitalize' }}>{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main>
            {/* Search */}
            <div className="flex" style={{ gap: '0.75rem', marginBottom: '2rem' }}>
              <div className="flex" style={{ 
                flex: 1, background: 'var(--bg-card)', 
                padding: '0.7rem 1rem', borderRadius: '9999px',
                border: '1px solid var(--border)', gap: '0.6rem'
              }}>
                <Search size={18} color="var(--text-muted)" />
                <input 
                  type="text" placeholder="Cari topik, judul, atau kreator..." 
                  style={{ background: 'none', border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', color: 'var(--text-primary)' }}
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleSearch}
                />
              </div>
              <button className="btn btn-outline" style={{ padding: '0.7rem 1rem', gap: '0.4rem', fontSize: '0.8rem', borderRadius: '9999px' }}>
                <SlidersHorizontal size={16} /> Sort <ChevronDown size={14} />
              </button>
            </div>

            {loading ? (
              <div className="flex" style={{ justifyContent: 'center', padding: '5rem 0', flexDirection: 'column', gap: '1rem' }}>
                <Loader2 size={36} className="animate-spin" style={{ color: 'var(--accent)' }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Memuat konten bermakna...</p>
              </div>
            ) : (
              <div className="responsive-grid-2">
                {contents.map(content => (
                  <ContentCard key={content.id} content={content} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BankKonten;
