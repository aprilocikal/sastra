import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, TrendingUp, Share2, Bookmark, MessageSquare, BookOpen, FileText, Link as LinkIcon, Loader2 } from 'lucide-react';
import ContentCard from '../components/ContentCard';
import { fetchBookById, fetchBooks } from '../services/api';

const DetailKonten = () => {
  const { id } = useParams();
  const [activeLayer, setActiveLayer] = useState('full');
  const [content, setContent] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchBookById(id);
      setContent(data);
      if (data) {
        const relatedData = await fetchBooks(data.category, 2);
        setRelated(relatedData);
      }
      setLoading(false);
    };
    loadData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="container section flex" style={{ minHeight: '60vh', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
        <Loader2 size={36} className="animate-spin" style={{ color: 'var(--accent)' }} />
        <p style={{ color: 'var(--text-muted)' }}>Memuat detail konten...</p>
      </div>
    );
  }

  if (!content) return <div className="container section">Konten tidak ditemukan.</div>;

  const layers = [
    { key: 'summary', icon: <FileText size={16} />, label: 'Ringkasan' },
    { key: 'full', icon: <BookOpen size={16} />, label: 'Konten' },
    { key: 'reference', icon: <LinkIcon size={16} />, label: 'Referensi' },
  ];

  return (
    <div className="container" style={{ paddingTop: '7rem', paddingBottom: '6rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem', alignItems: 'start' }}>
        <main>
          <div className="flex" style={{ gap: '0.5rem', marginBottom: '1.25rem' }}>
            <span className="badge badge-accent">{content.category}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>· {content.topic}</span>
          </div>
          
          <h1 style={{ fontSize: '2.5rem', lineHeight: 1.15, marginBottom: '1.5rem' }}>{content.title}</h1>
          
          <div className="flex" style={{ justifyContent: 'space-between', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)', marginBottom: '2rem' }}>
            <div className="flex" style={{ gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={20} color="var(--text-muted)" />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem' }}>{content.author}</h4>
                <div className="flex" style={{ gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  <span className="flex" style={{ gap: '0.2rem' }}><Calendar size={13} /> {content.created_at}</span>
                  <span className="flex" style={{ gap: '0.2rem' }}><TrendingUp size={13} color="var(--accent)" /> {content.impact_score}</span>
                </div>
              </div>
            </div>
            <div className="flex" style={{ gap: '0.5rem' }}>
              <button className="btn btn-ghost" style={{ padding: '0.5rem', borderRadius: '10px' }}><Bookmark size={18} /></button>
              <button className="btn btn-ghost" style={{ padding: '0.5rem', borderRadius: '10px' }}><Share2 size={18} /></button>
            </div>
          </div>

          {/* Layer Toggle */}
          <div className="flex" style={{ background: 'var(--bg-elevated)', padding: '0.3rem', borderRadius: '9999px', marginBottom: '2rem', width: 'fit-content' }}>
            {layers.map(layer => (
              <button 
                key={layer.key}
                onClick={() => setActiveLayer(layer.key)}
                className="flex" 
                style={{ 
                  gap: '0.4rem', padding: '0.5rem 1rem', borderRadius: '9999px',
                  background: activeLayer === layer.key ? '#fff' : 'transparent',
                  boxShadow: activeLayer === layer.key ? 'var(--shadow-sm)' : 'none',
                  fontWeight: 600, fontSize: '0.8rem',
                  color: activeLayer === layer.key ? 'var(--accent)' : 'var(--text-muted)',
                }}
              >
                {layer.icon} {layer.label}
              </button>
            ))}
          </div>

          <div style={{ fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 1.8 }}>
            {activeLayer === 'summary' && (
              <div className="animate-fade-up">
                <p style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '1.1rem' }}>Poin-poin Utama:</p>
                <p style={{ marginBottom: '1rem' }}>{content.summary}</p>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                  <li>Memahami konteks {content.topic} secara mendalam.</li>
                  <li>Membangun kerangka berpikir reflektif melalui literasi.</li>
                  <li>Dampak terhadap masyarakat modern.</li>
                </ul>
              </div>
            )}
            {activeLayer === 'full' && (
              <div className="animate-fade-up">
                <img src={content.thumbnail} alt="" style={{ width: '100%', borderRadius: 'var(--radius-xl)', marginBottom: '2rem', maxHeight: '400px', objectFit: 'contain', background: 'var(--bg-elevated)' }} />
                <div dangerouslySetInnerHTML={{ __html: content.content_body }}></div>
              </div>
            )}
            {activeLayer === 'reference' && (
              <div className="animate-fade-up">
                <h3 style={{ marginBottom: '1.25rem', fontSize: '1.1rem' }}>Referensi Terkait</h3>
                {[
                  { title: 'Google Books Repository', desc: `ID Konten: ${content.id}` },
                  { title: 'Arsip Nasional Pendidikan', desc: `Kategori: ${content.category}` },
                ].map((ref, i) => (
                  <div key={i} className="card" style={{ padding: '1rem', marginBottom: '0.75rem' }}>
                    <h4 style={{ fontSize: '0.95rem' }}>{ref.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ref.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Comments */}
          <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
            <h3 className="flex" style={{ gap: '0.5rem', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
              <MessageSquare size={20} /> Komentar
            </h3>
            <div className="card" style={{ padding: '1.25rem' }}>
              <textarea placeholder="Tulis pemikiran reflektif Anda..." style={{ width: '100%', minHeight: '80px', border: 'none', outline: 'none', fontSize: '0.95rem', resize: 'none', background: 'transparent' }}></textarea>
              <div className="flex" style={{ justifyContent: 'flex-end', marginTop: '0.75rem' }}>
                <button className="btn btn-primary" style={{ fontSize: '0.85rem' }}>Kirim</button>
              </div>
            </div>
          </div>
        </main>

        <aside style={{ position: 'sticky', top: '100px' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Konten Terkait</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {related.map(c => (
              <Link key={c.id} to={`/konten/${c.id}`} className="card" style={{ padding: '0.75rem' }}>
                <img src={c.thumbnail} alt="" style={{ width: '100%', height: '100px', borderRadius: 'var(--radius)', objectFit: 'cover', marginBottom: '0.75rem' }} />
                <h4 style={{ fontSize: '0.85rem', lineHeight: 1.35 }}>{c.title}</h4>
                <div className="flex" style={{ marginTop: '0.4rem', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                  <TrendingUp size={12} color="var(--accent)" />
                  <span>Score: {c.impact_score}</span>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DetailKonten;
