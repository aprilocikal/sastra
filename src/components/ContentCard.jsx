import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, TrendingUp, User, ArrowUpRight } from 'lucide-react';

const ContentCard = ({ content }) => {
  const categoryColors = {
    'Edukasi': 'badge-accent',
    'Teknologi': 'badge-purple',
    'Sosial': 'badge-teal',
    'Budaya': 'badge-accent',
  };

  return (
    <Link to={`/konten/${content.id}`} className="card card-glow" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', marginBottom: '1rem', overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
        <img 
          src={content.thumbnail} 
          alt={content.title} 
          style={{ 
            width: '100%', 
            aspectRatio: '4/3', 
            objectFit: 'cover', 
            borderRadius: 'var(--radius-lg)',
            transition: 'var(--transition-slow)',
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        />
        <span className={`badge ${categoryColors[content.category] || 'badge-accent'}`} style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
          {content.category}
        </span>
        <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
          <ArrowUpRight size={16} color="var(--text-primary)" />
        </div>
      </div>
      
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.35 }}>
        {content.title}
      </h3>
      
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.6, flex: 1 }}>
        {content.summary}
      </p>
      
      <div className="flex" style={{ justifyContent: 'space-between', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--border)', fontSize: '0.75rem', color: 'var(--text-muted)', gap: '0.5rem' }}>
        <div className="flex" style={{ gap: '0.4rem', flexShrink: 1, minWidth: 0 }}>
          <User size={12} style={{ flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70px' }}>{content.author}</span>
        </div>
        <div className="flex" style={{ gap: '0.6rem', flexShrink: 0 }}>
          <div className="flex" style={{ gap: '0.2rem' }}>
            <TrendingUp size={12} color="var(--accent)" />
            <span style={{ fontWeight: 700, color: 'var(--accent)' }}>{content.impact_score}</span>
          </div>
          <div className="flex" style={{ gap: '0.2rem' }}>
            <Eye size={12} />
            <span>{content.views?.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContentCard;
