import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FilePlus, BarChart3, Settings, LogOut, TrendingUp, Eye, MessageSquare, Award, Plus, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const CreatorHub = ({ user }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [statsData, setStatsData] = useState({ views: 0, impact: 0, diskusi: 0, points: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isWriting, setIsWriting] = useState(false);
  const [form, setForm] = useState({ title: '', category: '', content: '' });

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (profileData) {
          setProfile(profileData);
        }

        // Fetch user contents for stats
        const { data: contentsData } = await supabase
          .from('contents')
          .select('views, impact_score')
          .eq('author_id', user.id);

        if (contentsData) {
          const totalViews = contentsData.reduce((acc, curr) => acc + (curr.views || 0), 0);
          const totalImpact = contentsData.reduce((acc, curr) => acc + (curr.impact_score || 0), 0);
          const avgImpact = contentsData.length > 0 ? Math.round(totalImpact / contentsData.length) : 0;
          
          setStatsData({
            views: totalViews,
            impact: avgImpact,
            diskusi: contentsData.length * 2, // simulated
            points: profileData?.points || 0
          });
        }
      } catch (err) {
        console.error("Error fetching creator data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const stats = [
    { label: 'Total Views', value: statsData.views > 1000 ? (statsData.views/1000).toFixed(1)+'K' : statsData.views, icon: <Eye size={20} />, trend: '+0%', color: 'var(--accent)', bg: 'var(--accent-subtle)' },
    { label: 'Avg. Impact Score', value: statsData.impact, icon: <TrendingUp size={20} />, trend: '+0%', color: 'var(--secondary)', bg: 'var(--secondary-subtle)' },
    { label: 'Total Diskusi', value: statsData.diskusi, icon: <MessageSquare size={20} />, trend: '+0%', color: 'var(--teal)', bg: 'var(--teal-subtle)' },
    { label: 'Poin Kontribusi', value: statsData.points, icon: <Award size={20} />, trend: '+0', color: 'var(--accent)', bg: 'var(--accent-subtle)' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const displayName = profile?.full_name || user?.user_metadata?.full_name || 'Kreator';
  const displayLevel = profile?.level || user?.user_metadata?.level || 'Pemula';
  const initial = displayName.charAt(0).toUpperCase();

  if (loading) {
    return (
      <div className="flex" style={{ minHeight: '100vh', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <Loader2 size={36} className="animate-spin" style={{ color: 'var(--accent)' }} />
        <p style={{ color: 'var(--text-muted)' }}>Memuat dashboard kreator...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-user-info" style={{ marginBottom: '2.5rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'linear-gradient(135deg, var(--accent), #FF8A65)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', boxShadow: '0 4px 14px rgba(255, 87, 51, 0.25)' }}>
            {initial}
          </div>
          <h3 style={{ fontSize: '1.1rem', fontFamily: 'Plus Jakarta Sans', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayName}</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Level: <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{displayLevel}</span></p>
        </div>

        <nav className="dashboard-nav" style={{ display: 'flex', gap: '0.25rem' }}>
          {[
            { icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
            { icon: <FilePlus size={18} />, label: 'Konten Saya' },
            { icon: <BarChart3 size={18} />, label: 'Analitik' },
            { icon: <Settings size={18} />, label: 'Pengaturan' },
          ].map(item => {
            const isActive = activeTab === item.label;
            return (
              <button 
                key={item.label} 
                onClick={() => { setActiveTab(item.label); setIsWriting(false); }}
                className="flex" 
                style={{ 
                  width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius)', gap: '0.75rem',
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--accent-subtle)' : 'transparent',
                  fontWeight: isActive ? 600 : 500, fontSize: '0.9rem', transition: 'all 0.2s'
                }}
              >
                {item.icon} {item.label}
              </button>
            );
          })}
          <div className="dashboard-logout-container" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
            <button onClick={handleLogout} className="flex" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius)', gap: '0.75rem', color: '#EF4444', fontSize: '0.9rem', fontWeight: 500, transition: 'all 0.2s' }}>
              <LogOut size={18} /> Keluar
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {isWriting ? (
          <div className="card" style={{ padding: '2.5rem' }}>
            <header className="flex" style={{ justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontFamily: 'Plus Jakarta Sans', marginBottom: '0.25rem' }}>Tulis Gagasan Baru</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Bagikan perspektif Anda kepada komunitas.</p>
              </div>
              <button className="btn btn-outline" onClick={() => setIsWriting(false)} style={{ padding: '0.5rem 1rem' }}>
                Batal
              </button>
            </header>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={(e) => { e.preventDefault(); alert('Fitur simpan sedang diintegrasikan!'); setIsWriting(false); }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Judul Artikel</label>
                <input 
                  type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                  placeholder="Masukkan judul yang menarik..." required
                  style={{ padding: '0.8rem 1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', outline: 'none', background: 'var(--bg-elevated)', fontSize: '1rem', color: 'var(--text-primary)' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Kategori / Topik</label>
                <select 
                  value={form.category} onChange={e => setForm({...form, category: e.target.value})} required
                  style={{ padding: '0.8rem 1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', outline: 'none', background: 'var(--bg-elevated)', fontSize: '0.95rem', color: 'var(--text-primary)' }}
                >
                  <option value="">Pilih Kategori...</option>
                  <option value="Sastra">Sastra</option>
                  <option value="Teknologi">Teknologi</option>
                  <option value="Filsafat">Filsafat</option>
                  <option value="Pendidikan">Pendidikan</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Isi Konten</label>
                <textarea 
                  value={form.content} onChange={e => setForm({...form, content: e.target.value})} required
                  placeholder="Tulis gagasan Anda di sini..."
                  style={{ padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', outline: 'none', background: 'var(--bg-elevated)', fontSize: '0.95rem', minHeight: '300px', resize: 'vertical', color: 'var(--text-primary)', lineHeight: 1.6 }}
                ></textarea>
              </div>

              <div className="flex" style={{ justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsWriting(false)}>Simpan Draf</button>
                <button type="submit" className="btn btn-primary" style={{ gap: '0.5rem' }}>Publikasikan</button>
              </div>
            </form>
          </div>
        ) : (
          <>
            {activeTab === 'Dashboard' && (
          <>
            <header className="flex" style={{ justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h1 style={{ fontSize: '2rem', fontFamily: 'Plus Jakarta Sans', marginBottom: '0.25rem' }}>Dashboard Kreator</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Selamat datang kembali, mari buat dampak nyata hari ini.</p>
              </div>
              <button className="btn btn-primary" onClick={() => setIsWriting(true)} style={{ gap: '0.5rem', padding: '0.8rem 1.5rem' }}>
                <Plus size={18} /> Upload Konten Baru
              </button>
            </header>

            {/* Stats */}
            <div className="responsive-grid-4" style={{ marginBottom: '2.5rem' }}>
              {stats.map(stat => (
                <div key={stat.label} className="card" style={{ padding: '1.25rem' }}>
                  <div className="flex" style={{ justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{ padding: '0.6rem', background: stat.bg, borderRadius: '10px', color: stat.color }}>
                      {stat.icon}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--teal)', fontWeight: 600 }}>{stat.trend}</span>
                  </div>
                  <h4 style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.3rem', fontWeight: 500 }}>{stat.label}</h4>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Plus Jakarta Sans' }}>{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="responsive-grid-2-asym">
              {/* Chart */}
              <div className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1.25rem', fontSize: '1rem' }}>Performa 7 Hari Terakhir</h3>
                <div style={{ height: '250px', display: 'flex', alignItems: 'flex-end', gap: '0.75rem', padding: '0.5rem 0' }}>
                  {[10, 20, 15, 30, 25, 40, 35].map((h, i) => (
                    <div key={i} style={{ flex: 1, background: `linear-gradient(to top, var(--accent), #FF8A65)`, height: `${h}%`, borderRadius: '0.5rem 0.5rem 0 0', opacity: 0.85, transition: 'var(--transition)' }}></div>
                  ))}
                </div>
                <div className="flex" style={{ justifyContent: 'space-between', marginTop: '0.75rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                  <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
                </div>
              </div>

              {/* Level */}
              <div className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1.25rem', fontSize: '1rem' }}>Level Progress</h3>
                <div className="flex" style={{ justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{displayLevel}</span>
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Menuju Level 2 (10%)</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--bg-elevated)', borderRadius: '999px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                  <div style={{ width: '10%', height: '100%', background: 'linear-gradient(90deg, var(--accent), #FF8A65)', borderRadius: '999px' }}></div>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { done: statsData.views >= 50, text: `Dapatkan 50 Views (${statsData.views}/50)` },
                    { done: statsData.impact >= 50, text: `Impact Score > 50 (${statsData.impact}/50)` },
                    { done: false, text: 'Upload konten pertama Anda' },
                  ].map((item, i) => (
                    <li key={i} className="flex" style={{ gap: '0.6rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      <div style={{ width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0, background: item.done ? 'var(--teal)' : 'var(--bg-elevated)', border: item.done ? 'none' : '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '9px' }}>
                        {item.done && '✓'}
                      </div>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {activeTab === 'Konten Saya' && (
          <>
            <header className="flex" style={{ justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h1 style={{ fontSize: '2rem', fontFamily: 'Plus Jakarta Sans', marginBottom: '0.25rem' }}>Konten Saya</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Kelola semua artikel dan gagasan yang telah Anda tulis.</p>
              </div>
              <button className="btn btn-primary" onClick={() => setIsWriting(true)} style={{ gap: '0.5rem', padding: '0.8rem 1.5rem' }}>
                <Plus size={18} /> Tulis Baru
              </button>
            </header>

            <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--text-muted)' }}>
                <FilePlus size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Belum ada konten</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Anda belum mempublikasikan artikel apapun. Mulai bagikan gagasan Anda sekarang.</p>
              <button className="btn btn-outline" onClick={() => setIsWriting(true)} style={{ margin: '0 auto' }}>Mulai Menulis</button>
            </div>
          </>
        )}

        {activeTab === 'Analitik' && (
          <>
            <header style={{ marginBottom: '2.5rem' }}>
              <h1 style={{ fontSize: '2rem', fontFamily: 'Plus Jakarta Sans', marginBottom: '0.25rem' }}>Analitik Mendalam</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Lacak performa dan dampat nyata dari gagasan Anda.</p>
            </header>

            <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Distribusi Pembaca</h3>
              <div className="flex" style={{ gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div className="flex" style={{ justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Mahasiswa</span>
                    <span style={{ fontWeight: 600 }}>65%</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--bg-elevated)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
                    <div style={{ height: '100%', width: '65%', background: 'var(--accent)' }}></div>
                  </div>
                  
                  <div className="flex" style={{ justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Akademisi</span>
                    <span style={{ fontWeight: 600 }}>25%</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--bg-elevated)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
                    <div style={{ height: '100%', width: '25%', background: 'var(--secondary)' }}></div>
                  </div>

                  <div className="flex" style={{ justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Umum</span>
                    <span style={{ fontWeight: 600 }}>10%</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--bg-elevated)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '10%', background: 'var(--teal)' }}></div>
                  </div>
                </div>
                
                <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ padding: '1.5rem', background: 'var(--bg-elevated)', borderRadius: '12px', textAlign: 'center' }}>
                    <h4 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Waktu Rata-rata Membaca</h4>
                    <p style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Plus Jakarta Sans', color: 'var(--accent)' }}>4m 12s</p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--teal)', fontWeight: 600 }}>+15% dari bulan lalu</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {(activeTab === 'Pengaturan') && (
          <>
            <header style={{ marginBottom: '2.5rem' }}>
              <h1 style={{ fontSize: '2rem', fontFamily: 'Plus Jakarta Sans', marginBottom: '0.25rem' }}>Pengaturan Akun</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Sesuaikan preferensi profil kreator Anda.</p>
            </header>
            <div className="card" style={{ padding: '2rem' }}>
              <p style={{ color: 'var(--text-muted)' }}>Fitur pengaturan sedang dalam pengembangan.</p>
            </div>
          </>
        )}
          </>
        )}
      </main>
    </div>
  );
};

export default CreatorHub;
