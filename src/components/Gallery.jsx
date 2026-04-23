import { useState, useEffect } from 'react';

const items = [
  { id: 1,  category: 'Deluxe Room',    src: '/gallery/deluxe/deluxe-1.jpg',       label: 'Deluxe Room — Interior',      sub: 'Room view · Single / Double' },
  { id: 2,  category: 'Deluxe Room',    src: '/gallery/deluxe/deluxe-2.jpg',       label: 'Deluxe Room — Bed Area',      sub: 'Comfortable furnishings' },
  { id: 3,  category: 'Deluxe Room',    src: '/gallery/deluxe/deluxe-3.jpg',       label: 'Deluxe Room — Work Area',     sub: 'Work desk & amenities' },
  { id: 4,  category: 'Deluxe Room',    src: '/gallery/deluxe/deluxe-4.jpg',       label: 'Deluxe Room — Overview',      sub: 'Full room view' },
  { id: 5,  category: 'Executive Room', src: '/gallery/executive/executive-1.jpg', label: 'Executive Room — Interior',   sub: 'Spacious layout' },
  { id: 6,  category: 'Executive Room', src: '/gallery/executive/executive-2.jpg', label: 'Executive Room — Bed Area',   sub: 'Premium bedding' },
  { id: 7,  category: 'Executive Room', src: '/gallery/executive/executive-3.jpg', label: 'Executive Room — Overview',   sub: 'Full room view' },
  { id: 8,  category: 'Hall',           src: '/gallery/hall/hall-1.jpg',           label: 'Conference Hall — Full View', sub: '300 Seat Capacity' },
  { id: 9,  category: 'Hall',           src: '/gallery/hall/hall-2.jpg',           label: 'Hall — Stage & Podium',       sub: 'Audio Visual Setup' },
  { id: 10, category: 'Hall',           src: '/gallery/hall/hall-3.jpg',           label: 'Hall — Seating Layout',       sub: 'Flexible Arrangement' },
  { id: 11, category: 'Hall',           src: '/gallery/hall/hall-4.jpg',           label: 'Hall — Event Setup',          sub: 'CME / Seminar Mode' },
  { id: 12, category: 'Hall',           src: '/gallery/hall/hall-5.jpg',           label: 'Hall — Wide Angle',           sub: 'Full hall view' },
  { id: 13, category: 'Hall',           src: '/gallery/hall/hall-6.jpg',           label: 'Hall — Entrance',             sub: 'Main entrance view' },
];

const filters = ['All', 'Deluxe Room', 'Executive Room', 'Hall'];

const tagColor = {
  'Deluxe Room':    { bg: '#eaf2ef', color: '#2d6a5c' },
  'Executive Room': { bg: '#e8eef6', color: '#2d4a7c' },
  'Hall':           { bg: '#f0ece0', color: '#7c5a2d' },
};

// Individual gallery card — kept outside Gallery so it never remounts on filter change
function GalleryCard({ item, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const tag = tagColor[item.category];

  return (
    <div
      onClick={onClick}
      style={{
        breakInside: 'avoid', marginBottom: 18, borderRadius: 10, overflow: 'hidden',
        cursor: 'pointer', border: '1px solid rgba(45,106,92,0.10)',
        boxShadow: '0 1px 8px rgba(45,106,92,0.05)',
        background: '#fff',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 36px rgba(45,106,92,0.14)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 8px rgba(45,106,92,0.05)';
      }}
    >
      {/* Image wrapper — shows placeholder background until loaded */}
      <div style={{ position: 'relative', background: '#e8f0ed', minHeight: 160, overflow: 'hidden' }}>
        {!errored ? (
          <img
            src={item.src}
            alt={item.label}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            style={{
              width: '100%', display: 'block',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />
        ) : (
          /* Fallback tile when image fails to load */
          <div style={{
            minHeight: 160, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 8,
            background: '#eaf2ef', padding: 20,
          }}>
            <span style={{ fontSize: 28 }}>🏨</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#5a8a7c', textAlign: 'center' }}>{item.label}</span>
          </div>
        )}
        {/* Shimmer overlay while loading */}
        {!loaded && !errored && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, #e8f0ed 25%, #d8ece4 50%, #e8f0ed 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.4s infinite',
          }} />
        )}
      </div>

      <div style={{ padding: '12px 16px' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: '#1a2e28', marginBottom: 4 }}>{item.label}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#7a9a92' }}>{item.sub}</div>
          <span style={{ background: tag.bg, color: tag.color, fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 20 }}>{item.category}</span>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [visible, setVisible]     = useState(false);
  const [activeFilter, setFilter] = useState('All');
  const [lightbox, setLightbox]   = useState(null); // { items, idx }

  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  // Keyboard nav for lightbox
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => {
      if (e.key === 'ArrowRight') setLightbox(l => ({ ...l, idx: (l.idx + 1) % l.items.length }));
      if (e.key === 'ArrowLeft')  setLightbox(l => ({ ...l, idx: (l.idx - 1 + l.items.length) % l.items.length }));
      if (e.key === 'Escape')     setLightbox(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox]);

  const filtered = activeFilter === 'All' ? items : items.filter(item => item.category === activeFilter);

  const openLightbox = (item) => {
    const idx = filtered.findIndex(f => f.id === item.id);
    setLightbox({ items: filtered, idx });
  };

  return (
    <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(18px)', transition: 'all 0.6s ease', paddingTop: 70 }}>

      {/* Header */}
      <section style={{ padding: '80px 40px 60px', background: 'linear-gradient(160deg, #f4f0e8, #eaf2ef)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.2em', color: '#2d6a5c', textTransform: 'uppercase', marginBottom: 14 }}>Photo Gallery</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 700, color: '#1a2e28', margin: '0 0 16px' }}>A Glimpse Inside</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: '#4a5a55', maxWidth: 520, lineHeight: 1.7, margin: 0 }}>
            Browse our Deluxe & Executive rooms and the 300-seat conference hall — all crafted for quiet, productive stays.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section style={{ padding: '36px 40px 0', background: '#fcfaf6' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: activeFilter === f ? '#2d6a5c' : 'transparent',
              color: activeFilter === f ? '#fff' : '#4a5a55',
              border: activeFilter === f ? '1.5px solid #2d6a5c' : '1.5px solid rgba(45,106,92,0.25)',
              cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
              padding: '8px 20px', borderRadius: 24, transition: 'all 0.2s ease',
            }}>{f}</button>
          ))}
        </div>
      </section>

      {/* Masonry grid */}
      <section style={{ padding: '28px 40px 80px', background: '#fcfaf6' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ columns: '3 260px', columnGap: 18 }}>
            {filtered.map((item) => (
              <GalleryCard key={item.id} item={item} onClick={() => openLightbox(item)} />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (() => {
        const current = lightbox.items[lightbox.idx];
        const tag = tagColor[current.category];
        return (
          <div
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(6,14,12,0.92)', zIndex: 1000,
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
              backdropFilter: 'blur(8px)',
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                background: '#fff', borderRadius: 14, overflow: 'hidden',
                maxWidth: 820, width: '100%', boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', background: '#111', maxHeight: '70vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={current.src}
                  alt={current.label}
                  style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', display: 'block' }}
                />
                {/* Prev */}
                <button
                  onClick={() => setLightbox(l => ({ ...l, idx: (l.idx - 1 + l.items.length) % l.items.length }))}
                  style={{
                    position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', cursor: 'pointer',
                    borderRadius: '50%', width: 40, height: 40, fontSize: 20,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(4px)', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                >‹</button>
                {/* Next */}
                <button
                  onClick={() => setLightbox(l => ({ ...l, idx: (l.idx + 1) % l.items.length }))}
                  style={{
                    position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', cursor: 'pointer',
                    borderRadius: '50%', width: 40, height: 40, fontSize: 20,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(4px)', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                >›</button>
                {/* Counter */}
                <div style={{ position: 'absolute', bottom: 12, right: 16, background: 'rgba(0,0,0,0.45)', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: 12, padding: '3px 10px', borderRadius: 20 }}>
                  {lightbox.idx + 1} / {lightbox.items.length}
                </div>
              </div>

              {/* Caption */}
              <div style={{ padding: '18px 24px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#1a2e28', marginBottom: 4 }}>{current.label}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ background: tag.bg, color: tag.color, fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>{current.category}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#7a9a92' }}>{current.sub}</span>
                  </div>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  style={{
                    background: '#1a2e28', color: '#fff', border: 'none', cursor: 'pointer',
                    padding: '9px 18px', borderRadius: 7, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                  }}
                >Close ✕</button>
              </div>
            </div>
          </div>
        );
      })()}

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @media (max-width: 600px) {
          .gallery-section { padding: 20px 16px 60px !important; }
        }
      `}</style>
    </div>
  );
}
