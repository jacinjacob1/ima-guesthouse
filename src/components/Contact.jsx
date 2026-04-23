import { useState, useEffect } from 'react';

export default function Contact() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  const primaryContacts = [
    {
      role: 'Reception',
      name: 'Front Desk',
      note: 'Available 24 × 7 — Any time check-in & check-out',
      phones: ['+91 44 XXXX XXXX', '+91 98XXX XXXXX'],
      email: 'reception@imatnsb.in',
      tag: '24×7',
      tagBg: '#eaf2ef', tagColor: '#2d6a5c',
      highlight: true,
    },
  ];

  const incharge = [
    { role: 'Chairman',    name: 'Dr. S. Kasi',             phone: '+91 98406 04248' },
    { role: 'Co-Chairman', name: 'Dr. Amutha Karunanidhi',  phone: '+91 99402 07884' },
    { role: 'Secretary',   name: 'Dr. C. Nandakumar',       phone: '+91 81900 00918' },
  ];

  const infoItems = [
    { label: 'Address',          value: 'IMA HQ Building, Bharathi Nagar\n9th Street, Doctor\'s Colony\nMudichur Road, Tambaram\nChennai — 600 045, Tamil Nadu' },
    { label: 'Nearest Landmark', value: 'Near Tambaram Railway Station\n& Government Hospital' },
    { label: 'Check-in / Check-out', value: 'Any time — 24 × 7\nNo fixed check-in or check-out time.' },
  ];

  return (
    <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(18px)', transition: 'all 0.6s ease', paddingTop: 70 }}>

      {/* Header */}
      <section style={{ padding: '80px 40px 60px', background: 'linear-gradient(160deg, #f4f0e8, #eaf2ef)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.2em', color: '#2d6a5c', textTransform: 'uppercase', marginBottom: 14 }}>Get in Touch</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 700, color: '#1a2e28', margin: '0 0 16px' }}>Contact & Location</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: '#4a5a55', maxWidth: 520, lineHeight: 1.7, margin: 0 }}>
            Reach our reception team any time — we're available round the clock to assist with bookings, enquiries, and event planning.
          </p>
        </div>
      </section>

      {/* Primary contacts — Reception + Events */}
      <section style={{ padding: '72px 40px 40px', background: '#fcfaf6' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', color: '#2d6a5c', textTransform: 'uppercase', marginBottom: 28 }}>Contact Directory</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 22 }}>
            {primaryContacts.map((c, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 12, padding: '30px 26px',
                border: `1px solid ${c.highlight ? 'rgba(45,106,92,0.22)' : 'rgba(45,106,92,0.09)'}`,
                boxShadow: c.highlight ? '0 4px 24px rgba(45,106,92,0.10)' : '0 1px 8px rgba(45,106,92,0.05)',
                transition: 'all 0.25s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 10px 36px rgba(45,106,92,0.13)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = c.highlight ? '0 4px 24px rgba(45,106,92,0.10)' : '0 1px 8px rgba(45,106,92,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#2d6a5c', textTransform: 'uppercase', marginBottom: 5 }}>{c.role}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: '#1a2e28' }}>{c.name}</div>
                  </div>
                  <span style={{ background: c.tagBg, color: c.tagColor, fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>{c.tag}</span>
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#7a9a92', marginBottom: 18 }}>{c.note}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {c.phones.map((p, pi) => (
                    <a key={pi} href={`tel:${p.replace(/\s/g, '')}`} style={{
                      display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none',
                      padding: '10px 14px', borderRadius: 8, background: '#f4f9f7',
                      border: '1px solid rgba(45,106,92,0.1)', transition: 'background 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = '#eaf2ef'}
                      onMouseLeave={e => e.currentTarget.style.background = '#f4f9f7'}
                    >
                      <span style={{ fontSize: 15 }}>📞</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: '#1a2e28' }}>{p}</span>
                    </a>
                  ))}
                  <a href={`mailto:${c.email}`} style={{
                    display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none',
                    padding: '10px 14px', borderRadius: 8, background: '#f4f9f7',
                    border: '1px solid rgba(45,106,92,0.1)', transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = '#eaf2ef'}
                    onMouseLeave={e => e.currentTarget.style.background = '#f4f9f7'}
                  >
                    <span style={{ fontSize: 15 }}>✉</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#2d6a5c', fontWeight: 500 }}>{c.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incharge section */}
      <section style={{ padding: '0 40px 60px', background: '#fcfaf6' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', color: '#2d6a5c', textTransform: 'uppercase', marginBottom: 20 }}>Incharge</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {incharge.map((p, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 10, padding: '20px 22px',
                border: '1px solid rgba(45,106,92,0.09)',
                boxShadow: '0 1px 6px rgba(45,106,92,0.04)',
                display: 'flex', alignItems: 'center', gap: 16,
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(45,106,92,0.10)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 6px rgba(45,106,92,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {/* Avatar circle */}
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #2d6a5c, #1a4d42)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: '#fff' }}>
                    {p.name.split(' ').pop()[0]}
                  </span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: '#2d6a5c', textTransform: 'uppercase', marginBottom: 3 }}>{p.role}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: '#1a2e28', marginBottom: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                  <a href={`tel:${p.phone.replace(/\s/g, '')}`} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none',
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: '#2d6a5c',
                  }}>
                    <span style={{ fontSize: 13 }}>📞</span>{p.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map + Info */}
      <section style={{ padding: '0 40px 80px', background: '#fcfaf6' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>

            {/* Google Maps embed */}
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', color: '#2d6a5c', textTransform: 'uppercase', marginBottom: 20 }}>Location</div>
              <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(45,106,92,0.12)', boxShadow: '0 2px 16px rgba(45,106,92,0.07)', height: 380 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6960083174317!2d80.09032097478774!3d12.927249387384025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f529b919d545%3A0x5fe87e56f9a0f9d4!2sIMA%20HQ%20building%2C%20bharathi%20Nagar%2C%209%20th%20Street%2C%20doctor's%20colony%2C%20mudichur%20road%2C%20Tambaram!5e0!3m2!1sen!2sin!4v1776969187614!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="IMA TNSB Guesthouse Location"
                />
              </div>
            </div>

            {/* Info cards */}
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', color: '#2d6a5c', textTransform: 'uppercase', marginBottom: 20 }}>Guesthouse Info</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {infoItems.map((item, i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '18px 20px', border: '1px solid rgba(45,106,92,0.09)', boxShadow: '0 1px 6px rgba(45,106,92,0.04)' }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: '#2d6a5c', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 7 }}>{item.label}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#1a2e28', lineHeight: 1.65, whiteSpace: 'pre-line' }}>{item.value}</div>
                  </div>
                ))}
                <div style={{ background: '#1a2e28', borderRadius: 10, padding: '18px 20px' }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: '#7ab8a6', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>How to Reach</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(252,250,246,0.75)', lineHeight: 1.7 }}>
                    <strong style={{ color: '#fcfaf6' }}>By Train:</strong> Tambaram Railway Station (Southern Railway) — 5 min walk<br />
                    <strong style={{ color: '#fcfaf6' }}>By Bus:</strong> Multiple TNSTC & MTC routes via Tambaram<br />
                    <strong style={{ color: '#fcfaf6' }}>By Car:</strong> GST Road (NH-48) — Tambaram exit, Mudichur Road
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr !important;}}`}</style>
      </section>
    </div>
  );
}
