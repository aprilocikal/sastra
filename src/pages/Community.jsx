import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Hash, MessageCircle, Sparkles, Loader2 } from 'lucide-react';
import { fetchBooks } from '../services/api';

const Community = () => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDiscussions = async () => {
      setLoading(true);
      // Mengambil data real dari API (buku-buku trending/populer)
      const data = await fetchBooks('trending', 8);
      
      const mappedDiscussions = data.map((item, index) => {
        const topics = ['Sastra', 'Teknologi', 'Filsafat', 'Sejarah', 'Sosial'];
        const randomTopic = topics[index % topics.length];
        
        return {
          id: item.id || index,
          topic: randomTopic,
          title: `Diskusi Analisis: ${item.title}`,
          author: item.author || 'Tim Redaksi',
          replies: Math.floor(Math.random() * 80) + 5,
          votes: Math.floor(Math.random() * 300) + 10,
          tags: ['trending', randomTopic.toLowerCase(), 'kajian'],
          last_activity: 'Baru saja',
          badge: 'badge-purple'
        };
      });

      setDiscussions(mappedDiscussions);
      setLoading(false);
    };

    loadDiscussions();
  }, []);

  return (
    <div>
      {/* Header */}
      <section className="hero" style={{ padding: '7rem 0 5rem' }}>
        <div className="container animate-fade-up" style={{ position: 'relative', zIndex: 2 }}>
          <div className="badge badge-purple" style={{ marginBottom: '1rem' }}>
            <Sparkles size={12} style={{ marginRight: '0.4rem', display: 'inline' }} />
            Diskusi Bermakna
          </div>
          <h1 style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>Diskusi <span className="text-gradient-cool">Komunitas</span></h1>
          <p>Ruang untuk berdialog dan menumbuhkan gagasan baru secara konstruktif.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '0 2rem 6rem' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
          <button className="btn btn-primary" style={{ gap: '0.5rem' }}>
            <MessageCircle size={18} /> Mulai Diskusi Baru
          </button>
        </div>

        <div className="responsive-sidebar-grid-right">
          <main>
            {loading ? (
              <div className="flex" style={{ justifyContent: 'center', padding: '4rem 0', flexDirection: 'column', gap: '1rem' }}>
                <Loader2 size={36} className="animate-spin" style={{ color: 'var(--accent)' }} />
                <p style={{ color: 'var(--text-muted)' }}>Memuat topik yang sedang trending...</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {discussions.map(thread => (
                    <div key={thread.id} className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem' }}>
                      {/* Votes */}
                      <div className="flex" style={{ flexDirection: 'column', gap: '0.3rem', minWidth: '36px', alignItems: 'center' }}>
                        <button style={{ color: 'var(--text-muted)', padding: '0.25rem' }}><ThumbsUp size={18} /></button>
                        <span style={{ fontWeight: 800, fontSize: '1rem', fontFamily: 'Plus Jakarta Sans' }}>{thread.votes}</span>
                        <button style={{ color: 'var(--text-muted)', padding: '0.25rem' }}><ThumbsDown size={18} /></button>
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div className="flex" style={{ gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                          <span className={`badge ${thread.badge}`}>{thread.topic}</span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                            oleh <strong style={{ color: 'var(--text-secondary)' }}>{thread.author}</strong> · {thread.last_activity}
                          </span>
                        </div>
                        <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', lineHeight: 1.35 }}>{thread.title}</h3>
                        <div className="flex" style={{ gap: '1.25rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                          <div className="flex" style={{ gap: '0.4rem' }}>
                            <MessageSquare size={15} />
                            <span>{thread.replies} Komentar</span>
                          </div>
                          <div className="flex" style={{ gap: '0.4rem' }}>
                            <Hash size={15} />
                            {thread.tags.map(tag => <span key={tag}>#{tag}</span>)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn btn-outline" style={{ width: '100%', marginTop: '1.5rem' }}>Muat Diskusi Lainnya</button>
              </>
            )}
          </main>

          <aside className="responsive-sidebar-right">
            <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>Topik Diskusi</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {['Isu Sosial', 'Teknologi', 'Edukasi', 'Budaya', 'Filsafat', 'Ekonomi'].map(topic => (
                  <li key={topic}>
                    <button className="flex" style={{ width: '100%', justifyContent: 'space-between', padding: '0.5rem 0.6rem', borderRadius: 'var(--radius)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <span>{topic}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{Math.floor(Math.random() * 50)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card" style={{ padding: '1.25rem', background: 'linear-gradient(135deg, var(--accent-subtle), var(--secondary-subtle))', borderColor: 'rgba(255, 87, 51, 0.1)' }}>
              <h3 style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>Moderasi Komunitas</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                Kami menjunjung tinggi etika berpendapat. Diskusi yang mengandung kebencian akan dimoderasi oleh tim kurator.
              </p>
              <button className="btn btn-outline" style={{ width: '100%', fontSize: '0.8rem' }}>Baca Aturan</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Community;
