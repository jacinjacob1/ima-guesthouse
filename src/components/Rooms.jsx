import { useState, useEffect } from 'react';

const deluxeImgs = [
  '/gallery/deluxe/deluxe-1.jpg',
  '/gallery/deluxe/deluxe-2.jpg',
  '/gallery/deluxe/deluxe-3.jpg',
  '/gallery/deluxe/deluxe-4.jpg',
];

const executiveImgs = [
  '/gallery/executive/executive-1.jpg',
  '/gallery/executive/executive-2.jpg',
  '/gallery/executive/executive-3.jpg',
];

function RoomCard({ room, setPage }) {
  const [imgIdx, setImgIdx] = useState(0);

  return (
    <div style={{
      background: '#fff', borderRadius: 14, overflow: 'hidden',
      border: '1px solid rgba(45,106,92,0.09)',
      boxShadow: '0 2px 12px rgba(45,106,92,0.06)',
      transition: 'all 0.25s ease', position: 'relative',
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(45,106,92,0.14)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(45,106,92,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {/* Image carousel */}
      <div style={{ position: 'relative', height: 240, background: '#e8f0ed', overflow: 'hidden' }}>
        <img
          src={room.images[imgIdx]}
          alt={`${room.name} — view ${imgIdx + 1}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'opacity 0.3s ease' }}
        />
        {/* Prev / Next arrows */}
        {room.images.length > 1 && (
          <>
            <button onClick={e => { e.stopPropagation(); setImgIdx(i => (i - 1 + room.images.length) % room.images.length); }} style={{
              position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(26,46,40,0.55)', color: '#fff', border: 'none', cursor: 'pointer',
              borderRadius: '50%', width: 32, height: 32, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)', transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(26,46,40,0.8)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(26,46,40,0.55)'}
            >‹</button>
            <button onClick={e => { e.stopPropagation(); setImgIdx(i => (i + 1) % room.images.length); }} style={{
              position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(26,46,40,0.55)', color: '#fff', border: 'none', cursor: 'pointer',
              borderRadius: '50%', width: 32, height: 32, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)', transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(26,46,40,0.8)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(26,46,40,0.55)'}
            >›</button>
            {/* Dots */}
            <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 5 }}>
              {room.images.map((_, i) => (
                <div key={i} onClick={e => { e.stopPropagation(); setImgIdx(i); }} style={{
                  width: i === imgIdx ? 18 : 6, height: 6, borderRadius: 3,
                  background: i === imgIdx ? '#fff' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                }} />
              ))}
            </div>
          </>
        )}
        {/* Badge */}
        <div style={{ position: 'absolute', top: 14, left: 14, background: '#1a2e28', color: '#fcfaf6', fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20, letterSpacing: '0.08em' }}>
          {room.badge}
        </div>
      </div>

      <div style={{ padding: '24px 26px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#1a2e28', margin: 0 }}>{room.name}</h3>
          <span style={{ background: '#eaf2ef', color: '#2d6a5c', fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap', marginLeft: 10, flexShrink: 0 }}>{room.type}</span>
        </div>
        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 12 }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: '#2d6a5c' }}>₹2,000</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#7a9a92' }}>/ night</span>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#5a7a72', lineHeight: 1.65, marginBottom: 18 }}>{room.desc}</p>
        <ul style={{ margin: '0 0 22px', padding: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {room.features.map((f, i) => (
            <li key={i} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#3a5a52',
              background: '#f4f9f7', border: '1px solid rgba(45,106,92,0.12)',
              padding: '4px 12px', borderRadius: 20,
            }}>{f}</li>
          ))}
        </ul>
        <button onClick={() => setPage('Booking')} style={{
          width: '100%', background: '#2d6a5c', color: '#fff',
          border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
          fontSize: 14, fontWeight: 600, padding: '12px', borderRadius: 7,
          letterSpacing: '0.04em', transition: 'background 0.2s ease',
        }}
          onMouseEnter={e => e.target.style.background = '#1a4d42'}
          onMouseLeave={e => e.target.style.background = '#2d6a5c'}
        >Book This Room</button>
      </div>
    </div>
  );
}

export default function Rooms({ setPage }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  const rooms = [
    {
      name: 'Deluxe Room',
      badge: 'Deluxe',
      type: 'Single / Double Occupancy',
      desc: 'A well-appointed room with premium furnishings, designed for restful stays. Perfect for doctors and medical professionals seeking comfort and quiet.',
      features: ['AC', '24×7 Hot Water', 'Work Desk', 'Clean Linen', 'Reception 24×7', 'Attached Bathroom'],
      images: deluxeImgs,
    },
    {
      name: 'Executive Room',
      badge: 'Executive',
      type: 'Single / Double Occupancy',
      desc: 'A spacious executive room with extra comfort and modern amenities — ideal for extended stays or attending conferences and CME programs.',
      features: ['AC', '24×7 Hot Water', 'Work Desk', 'Clean Linen', 'Reception 24×7', 'Attached Bathroom', 'Extra Space'],
      images: executiveImgs,
    },
  ];

  const hall = {
    name: 'Conference & Event Hall',
    capacity: '300 Seats',
    features: ['Fully Air-Conditioned', 'Audio–Visual Setup', 'Podium & Stage', 'Flexible Seating', 'Ideal for CME & Seminars', 'Event Coordination Support'],
    desc: 'A spacious, fully air-conditioned hall accommodating up to 300 guests — perfect for medical conferences, CME programs, seminars, and social gatherings.',
    images: [
      '/gallery/hall/hall-1.jpg',
      '/gallery/hall/hall-2.jpg',
      '/gallery/hall/hall-3.jpg',
      '/gallery/hall/hall-4.jpg',
      '/gallery/hall/hall-5.jpg',
      '/gallery/hall/hall-6.jpg',
    ],
  };

  const [hallIdx, setHallIdx] = useState(0);

  return (
    <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(18px)', transition: 'all 0.6s ease', paddingTop: 70 }}>
      {/* Header */}
      <section style={{ padding: '80px 40px 60px', background: 'linear-gradient(160deg, #f4f0e8, #eaf2ef)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.2em', color: '#2d6a5c', textTransform: 'uppercase', marginBottom: 14 }}>Accommodation</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 700, color: '#1a2e28', margin: '0 0 16px' }}>Rooms & Facilities</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: '#4a5a55', maxWidth: 560, lineHeight: 1.7, margin: 0 }}>
            Two distinct room types and a large event hall — all designed for the medical professional's need for comfort, quiet, and convenience.
          </p>
        </div>
      </section>

      {/* Room Cards */}
      <section style={{ padding: '72px 40px', background: '#fcfaf6' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', color: '#2d6a5c', textTransform: 'uppercase', marginBottom: 36 }}>Guest Rooms</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>
            {rooms.map((room, i) => (
              <RoomCard key={i} room={room} setPage={setPage} />
            ))}
          </div>
        </div>
      </section>

      {/* Conference Hall */}
      <section style={{ padding: '72px 40px 80px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', color: '#2d6a5c', textTransform: 'uppercase', marginBottom: 36 }}>Event Space</div>
          <div className="hall-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            {/* Hall image carousel */}
            <div style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', boxShadow: '0 4px 24px rgba(45,106,92,0.12)' }}>
              <img
                src={hall.images[hallIdx]}
                alt={`Conference hall — view ${hallIdx + 1}`}
                style={{ width: '100%', height: 340, objectFit: 'cover', display: 'block', transition: 'opacity 0.3s ease' }}
              />
              <button onClick={() => setHallIdx(i => (i - 1 + hall.images.length) % hall.images.length)} style={{
                position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(26,46,40,0.55)', color: '#fff', border: 'none', cursor: 'pointer',
                borderRadius: '50%', width: 34, height: 34, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>‹</button>
              <button onClick={() => setHallIdx(i => (i + 1) % hall.images.length)} style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(26,46,40,0.55)', color: '#fff', border: 'none', cursor: 'pointer',
                borderRadius: '50%', width: 34, height: 34, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>›</button>
              <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
                {hall.images.map((_, i) => (
                  <div key={i} onClick={() => setHallIdx(i)} style={{ width: i === hallIdx ? 18 : 6, height: 6, borderRadius: 3, background: i === hallIdx ? '#fff' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.2s' }} />
                ))}
              </div>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: '#1a2e28', margin: '0 0 12px' }}>{hall.name}</h2>
              <div style={{ display: 'inline-block', background: '#1a2e28', color: '#fcfaf6', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, padding: '6px 16px', borderRadius: 4, marginBottom: 20 }}>Capacity: {hall.capacity}</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#4a5a55', lineHeight: 1.75, marginBottom: 24 }}>{hall.desc}</p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {hall.features.map((f, i) => (
                  <li key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#3a5a52', background: '#eaf2ef', border: '1px solid rgba(45,106,92,0.15)', padding: '6px 14px', borderRadius: 20 }}>{f}</li>
                ))}
              </ul>
              <button onClick={() => setPage('Contact')} style={{
                marginTop: 28, background: 'transparent', color: '#2d6a5c', border: '2px solid #2d6a5c', cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
                padding: '12px 28px', borderRadius: 7, transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => { e.target.style.background = 'rgba(45,106,92,0.06)'; }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; }}
              >Enquire About Hall →</button>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.hall-grid{grid-template-columns:1fr !important;}}`}</style>
      </section>
    </div>
  );
}
