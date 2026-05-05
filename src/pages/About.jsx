import React from 'react';
import { Target, Users, ShieldCheck, Zap, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="hero" style={{ padding: '8rem 0' }}>
        <img 
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1920" 
          alt="" className="hero-bg"
        />
        <div className="hero-overlay"></div>
        <div className="container animate-fade-up" style={{ position: 'relative', zIndex: 2 }}>
          <div className="badge badge-accent" style={{ marginBottom: '1.5rem' }}>
            <Sparkles size={12} style={{ marginRight: '0.4rem', display: 'inline' }} />
            Filosofi Nama
          </div>
          <h1 style={{ fontSize: '3.5rem' }}>
            SASTRA: <span className="text-gradient">Satu Aksara, Satu Arah Bangsa</span>
          </h1>
          <p>Sebuah inisiatif strategis untuk membangun ekosistem gagasan berkualitas di tengah gempuran konten dangkal.</p>
        </div>
      </section>

      {/* Visi Misi */}
      <section id="visi-misi" className="section container">
        <div className="responsive-grid-2" style={{ alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '1.5rem' }}>Visi & Misi <span className="text-gradient">Strategis</span></h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1.25rem', fontWeight: 500, lineHeight: 1.6 }}>
              "Menjadi pusat gravitasi gagasan nasional yang mampu mengendalikan makna dan arah perkembangan bangsa."
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
              SASTRA hadir sebagai jembatan informasi yang valid dan mendalam. Kami percaya bahwa setiap kata (aksara) memiliki kekuatan untuk membentuk pola pikir. Dengan menyatukan aksara-aksara bermakna, kita menentukan satu arah kemajuan bangsa.
            </p>
          </div>
          <div className="card" style={{ padding: '1.5rem', border: 'none', boxShadow: 'var(--shadow-lg)' }}>
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" alt="Team" style={{ width: '100%', borderRadius: 'var(--radius-xl)' }} />
          </div>
        </div>
      </section>

      {/* Pilar */}
      <section id="pilar" className="section mesh-bg" style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>Pilar <span className="text-gradient-cool">Utama</span> Program</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>Empat fondasi yang membangun kekuatan platform ini.</p>
          </div>
          <div className="responsive-grid-4">
            {[
              { icon: <ShieldCheck size={28} />, name: 'Kurasi Ketat', desc: 'Setiap konten melewati proses validasi oleh tim ahli.', color: 'var(--accent)', bg: 'var(--accent-subtle)' },
              { icon: <Target size={28} />, name: 'Dampak Nyata', desc: 'Mengukur keberhasilan melalui Impact Score.', color: 'var(--secondary)', bg: 'var(--secondary-subtle)' },
              { icon: <Users size={28} />, name: 'Inklusivitas', desc: 'Membuka ruang bagi semua kalangan akademisi.', color: 'var(--teal)', bg: 'var(--teal-subtle)' },
              { icon: <Zap size={28} />, name: 'Inovasi Digital', desc: 'Memudahkan akses pengetahuan yang mendalam.', color: 'var(--accent)', bg: 'var(--accent-subtle)' },
            ].map(pilar => (
              <div key={pilar.name} className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: pilar.bg, color: pilar.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                  {pilar.icon}
                </div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{pilar.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>{pilar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tim Redaksi */}
      <section id="tim-redaksi" className="section container" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>Tim <span className="text-gradient">Redaksi</span> & Kurator</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 3rem' }}>Para ahli di balik kurasi konten berkualitas nasional.</p>
        <div className="responsive-grid-3">
          {[
            { name: 'Prof. Literasi', role: 'Ketua Kurator' },
            { name: 'Dr. Refleksi', role: 'Analis Konten' },
            { name: 'Inovator Digital', role: 'Teknolog Pendidikan' },
          ].map((person, i) => (
            <div key={i} className="card" style={{ padding: '2rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--bg-elevated)', margin: '0 auto 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={36} color="var(--text-muted)" />
              </div>
              <h3 style={{ fontSize: '1rem' }}>{person.name}</h3>
              <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.75rem' }}>{person.role}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Berpengalaman lebih dari 10 tahun dalam kurasi konten edukatif nasional.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dampak */}
      <section className="section container" style={{ textAlign: 'center' }}>
        <div className="card" style={{ padding: '4rem', background: 'linear-gradient(135deg, var(--accent-subtle), var(--secondary-subtle))', borderColor: 'rgba(255, 87, 51, 0.08)', borderRadius: 'var(--radius-2xl)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '3rem' }}>Dampak <span className="text-gradient">Jangka Panjang</span></h2>
          <div className="responsive-grid-3">
            {[
              { value: '1M+', label: 'Target Pengguna Terliterasi' },
              { value: '50K+', label: 'Kreator Bermakna' },
              { value: '100K+', label: 'Konten Terkurasi' },
            ].map(stat => (
              <div key={stat.label}>
                <h4 style={{ fontSize: '2.75rem', fontWeight: 800, fontFamily: 'Plus Jakarta Sans' }} className="text-gradient">{stat.value}</h4>
                <p style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
