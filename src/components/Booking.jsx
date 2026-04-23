import { useState, useEffect } from 'react';

const roomImages = {
  'Deluxe Room':    ['/gallery/deluxe/deluxe-1.jpg', '/gallery/deluxe/deluxe-2.jpg', '/gallery/deluxe/deluxe-3.jpg', '/gallery/deluxe/deluxe-4.jpg'],
  'Executive Room': ['/gallery/executive/executive-1.jpg', '/gallery/executive/executive-2.jpg', '/gallery/executive/executive-3.jpg'],
};

function RoomPreviewCard({ roomType, onSelect, selected }) {
  const [imgIdx, setImgIdx] = useState(0);
  const imgs = roomImages[roomType] || [];

  return (
    <div onClick={() => onSelect(roomType)} style={{
      borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
      border: `2px solid ${selected ? '#2d6a5c' : 'rgba(45,106,92,0.18)'}`,
      boxShadow: selected ? '0 4px 20px rgba(45,106,92,0.18)' : '0 1px 8px rgba(45,106,92,0.06)',
      background: '#fff', transition: 'all 0.2s ease', position: 'relative',
    }}>
      {/* Selected tick */}
      {selected && (
        <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 10, width: 24, height: 24, borderRadius: '50%', background: '#2d6a5c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>✓</div>
      )}
      {/* Image carousel */}
      <div style={{ position: 'relative', height: 160, overflow: 'hidden', background: '#e8f0ed' }}>
        {imgs.length > 0 && (
          <img src={imgs[imgIdx]} alt={roomType} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        )}
        {imgs.length > 1 && (
          <>
            <button onClick={e => { e.stopPropagation(); setImgIdx(i => (i - 1 + imgs.length) % imgs.length); }} style={{
              position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(26,46,40,0.5)', color: '#fff', border: 'none', cursor: 'pointer',
              borderRadius: '50%', width: 26, height: 26, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>‹</button>
            <button onClick={e => { e.stopPropagation(); setImgIdx(i => (i + 1) % imgs.length); }} style={{
              position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(26,46,40,0.5)', color: '#fff', border: 'none', cursor: 'pointer',
              borderRadius: '50%', width: 26, height: 26, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>›</button>
            <div style={{ position: 'absolute', bottom: 7, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 4 }}>
              {imgs.map((_, i) => (
                <div key={i} onClick={e => { e.stopPropagation(); setImgIdx(i); }} style={{ width: i === imgIdx ? 14 : 5, height: 5, borderRadius: 3, background: i === imgIdx ? '#fff' : 'rgba(255,255,255,0.55)', cursor: 'pointer', transition: 'all 0.2s' }} />
              ))}
            </div>
          </>
        )}
      </div>
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: '#1a2e28', marginBottom: 4 }}>{roomType}</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#5a7a72', marginBottom: 8 }}>
          {roomType === 'Deluxe Room' ? 'Well-appointed room with premium furnishings.' : 'Spacious room with extended comforts & extra space.'}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: '#2d6a5c' }}>₹2,000</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#7a9a92' }}>/ night</span>
        </div>
      </div>
    </div>
  );
}

export default function Booking() {
  const [visible, setVisible]           = useState(false);
  const [step, setStep]                 = useState(1);
  const [submitted, setSubmitted]       = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [form, setForm] = useState({
    roomType: '', checkIn: '', checkOut: '', guests: '1',
    name: '', phone: '', email: '',
    idType: '', idNumber: '',
    notes: '',
    transactionId: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  const totalSteps = 5;
  const rooms    = ['Deluxe Room', 'Executive Room'];
  const idTypes  = ['Aadhaar Card', 'PAN Card', 'Driving License', 'Voter ID', 'Passport'];

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const clearErr = (key) => setErrors(e => { const n = { ...e }; delete n[key]; return n; });

  const validate = (s) => {
    const e = {};
    if (s === 1) {
      if (!form.roomType) e.roomType = 'Please select a room';
      if (!form.checkIn)  e.checkIn  = 'Check-in date required';
      if (!form.checkOut) e.checkOut = 'Check-out date required';
      if (form.checkIn && form.checkOut && form.checkOut <= form.checkIn) e.checkOut = 'Check-out must be after check-in';
    }
    if (s === 2) {
      if (!form.name.trim())  e.name  = 'Full name is required';
      if (!form.phone.trim()) e.phone = 'Phone number is required';
      else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) e.phone = 'Enter a valid 10-digit Indian mobile number';
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    }
    if (s === 3) {
      if (!form.idType)          e.idType   = 'Please select an ID type';
      if (!form.idNumber.trim()) e.idNumber = 'ID number is required';
    }
    if (s === 5) {
      if (!paymentMethod) e.paymentMethod = 'Please choose a payment option';
      if (paymentMethod === 'upi' && !form.transactionId.trim()) e.transactionId = 'Transaction ID is required to confirm your UPI payment';
    }
    return e;
  };

  const next = () => {
    const e = validate(step);
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    if (step < totalSteps) setStep(s => s + 1);
  };

  const inputStyle = (error) => ({
    width: '100%', boxSizing: 'border-box', padding: '12px 14px',
    fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#1a2e28',
    background: '#fff', border: `1.5px solid ${error ? '#c0392b' : 'rgba(45,106,92,0.25)'}`,
    borderRadius: 7, outline: 'none', transition: 'border-color 0.2s ease',
  });

  const Field = ({ label, id, type = 'text', value, onChange, error, placeholder, required, children }) => (
    <div style={{ marginBottom: 22 }}>
      <label style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: '#2a3a35', marginBottom: 7, letterSpacing: '0.04em' }}>
        {label}{required && <span style={{ color: '#c0392b', marginLeft: 3 }}>*</span>}
      </label>
      {children || (
        <input type={type} value={value} onChange={e => { onChange(e.target.value); clearErr(id); }}
          placeholder={placeholder} style={inputStyle(error)}
          onFocus={e => { if (!error) e.target.style.borderColor = '#2d6a5c'; }}
          onBlur={e => { if (!error) e.target.style.borderColor = 'rgba(45,106,92,0.25)'; }}
        />
      )}
      {error && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#c0392b', marginTop: 5 }}>{error}</div>}
    </div>
  );

  const SelectField = ({ label, id, value, onChange, error, options, placeholder, required }) => (
    <Field label={label} id={id} error={error} required={required}>
      <select value={value} onChange={e => { onChange(e.target.value); clearErr(id); }}
        style={{ ...inputStyle(error), color: value ? '#1a2e28' : '#9ab0a8', appearance: 'none', cursor: 'pointer',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%232d6a5c' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center',
        }}>
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#c0392b', marginTop: 5 }}>{error}</div>}
    </Field>
  );

  const stepLabels = ['Room', 'Personal', 'Identity', 'Review', 'Payment'];
  const today = new Date().toISOString().split('T')[0];

  const payOptBase = (selected) => ({
    position: 'relative', cursor: 'pointer', borderRadius: 12, padding: '22px 20px',
    border: `2px solid ${selected ? '#2d6a5c' : 'rgba(45,106,92,0.18)'}`,
    background: selected ? 'rgba(45,106,92,0.04)' : '#fff',
    transition: 'all 0.2s ease',
    boxShadow: selected ? '0 4px 20px rgba(45,106,92,0.14)' : '0 1px 6px rgba(45,106,92,0.04)',
  });

  return (
    <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(18px)', transition: 'all 0.6s ease', paddingTop: 70, minHeight: '100vh', background: '#fcfaf6' }}>

      {/* Page header */}
      <section style={{ padding: '60px 40px 24px', background: 'linear-gradient(160deg, #f4f0e8, #eaf2ef)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.2em', color: '#2d6a5c', textTransform: 'uppercase', marginBottom: 14 }}>Reservations</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: '#1a2e28', margin: 0 }}>Book Your Room</h1>
        </div>
      </section>

      <section style={{ padding: '40px 40px 80px', background: '#fcfaf6' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          {!submitted ? (
            <>
              {/* Step indicator */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
                {stepLabels.map((label, i) => {
                  const n = i + 1, done = step > n, active = step === n;
                  return (
                    <div key={n} style={{ display: 'contents' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                        <div style={{
                          width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: done || active ? '#2d6a5c' : '#e8f0ed',
                          color: done || active ? '#fff' : '#6a9a8c',
                          fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700,
                          transition: 'all 0.3s ease', flexShrink: 0,
                          boxShadow: active ? '0 4px 16px rgba(45,106,92,0.3)' : 'none',
                        }}>{done ? '✓' : n}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: active ? 600 : 400, color: active || done ? '#2d6a5c' : '#9ab0a8', whiteSpace: 'nowrap' }}>{label}</div>
                      </div>
                      {i < stepLabels.length - 1 && (
                        <div style={{ flex: 1, height: 2, background: step > n ? '#2d6a5c' : '#e8f0ed', margin: '0 6px', marginBottom: 20, transition: 'background 0.3s ease' }} />
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={{ background: '#fff', borderRadius: 14, padding: '36px 36px', border: '1px solid rgba(45,106,92,0.09)', boxShadow: '0 2px 20px rgba(45,106,92,0.07)' }}>

                {/* ── Step 1: Room Selection ── */}
                {step === 1 && (
                  <div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: '#1a2e28', margin: '0 0 6px' }}>Select Room & Dates</h2>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#6a8a82', marginBottom: 24, lineHeight: 1.6 }}>Choose your room type and preferred dates.</p>

                    {/* Room preview cards */}
                    <div style={{ marginBottom: 6 }}>
                      <label style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: '#2a3a35', marginBottom: 12, letterSpacing: '0.04em' }}>
                        Room Type <span style={{ color: '#c0392b' }}>*</span>
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 6 }}>
                        {rooms.map(r => (
                          <RoomPreviewCard key={r} roomType={r} selected={form.roomType === r} onSelect={v => { set('roomType', v); clearErr('roomType'); }} />
                        ))}
                      </div>
                      {errors.roomType && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#c0392b', marginBottom: 16 }}>{errors.roomType}</div>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div style={{ marginBottom: 22 }}>
                        <label style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: '#2a3a35', marginBottom: 7 }}>Check-in Date <span style={{ color: '#c0392b' }}>*</span></label>
                        <input type="date" value={form.checkIn} min={today} onChange={e => { set('checkIn', e.target.value); clearErr('checkIn'); }} style={inputStyle(errors.checkIn)} />
                        {errors.checkIn && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#c0392b', marginTop: 5 }}>{errors.checkIn}</div>}
                      </div>
                      <div style={{ marginBottom: 22 }}>
                        <label style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: '#2a3a35', marginBottom: 7 }}>Check-out Date <span style={{ color: '#c0392b' }}>*</span></label>
                        <input type="date" value={form.checkOut} min={form.checkIn || today} onChange={e => { set('checkOut', e.target.value); clearErr('checkOut'); }} style={inputStyle(errors.checkOut)} />
                        {errors.checkOut && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#c0392b', marginTop: 5 }}>{errors.checkOut}</div>}
                      </div>
                    </div>
                    <SelectField label="Number of Guests" id="guests" value={form.guests} onChange={v => set('guests', v)} options={['1', '2']} placeholder="" />
                  </div>
                )}

                {/* ── Step 2: Personal Details ── */}
                {step === 2 && (
                  <div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: '#1a2e28', margin: '0 0 28px' }}>Personal Details</h2>
                    <Field label="Full Name" id="name" value={form.name} onChange={v => set('name', v)} error={errors.name} placeholder="Dr. / Mr. / Ms. Your Full Name" required />
                    <Field label="Mobile Number" id="phone" type="tel" value={form.phone} onChange={v => set('phone', v)} error={errors.phone} placeholder="10-digit Indian mobile number" required />
                    <Field label="Email Address" id="email" type="email" value={form.email} onChange={v => set('email', v)} error={errors.email} placeholder="your@email.com (optional)" />
                    <div style={{ marginBottom: 22 }}>
                      <label style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: '#2a3a35', marginBottom: 7 }}>Special Requests</label>
                      <textarea value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Any specific requirements..." rows={3}
                        style={{ width: '100%', boxSizing: 'border-box', padding: '12px 14px', fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#1a2e28', background: '#fff', border: '1.5px solid rgba(45,106,92,0.25)', borderRadius: 7, outline: 'none', resize: 'vertical' }} />
                    </div>
                  </div>
                )}

                {/* ── Step 3: Identity ── */}
                {step === 3 && (
                  <div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: '#1a2e28', margin: '0 0 8px' }}>Identity Verification</h2>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#6a8a82', marginBottom: 28, lineHeight: 1.6 }}>A valid government-issued photo ID is required to complete your booking.</p>
                    <SelectField label="ID Type" id="idType" value={form.idType} onChange={v => set('idType', v)} error={errors.idType} options={idTypes} placeholder="Select ID type" required />
                    <Field label="ID Number" id="idNumber" value={form.idNumber} onChange={v => set('idNumber', v)} error={errors.idNumber} placeholder={
                      form.idType === 'Aadhaar Card' ? 'XXXX XXXX XXXX' :
                      form.idType === 'PAN Card' ? 'ABCDE1234F' :
                      form.idType === 'Driving License' ? 'TN-XX-XXXX-XXXXXXX' : 'Enter ID number'
                    } required />
                    <div style={{ background: '#f4f9f7', border: '1px solid rgba(45,106,92,0.15)', borderRadius: 8, padding: '14px 18px' }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#3a6a5c', lineHeight: 1.6 }}>
                        🔒 Your ID details are encrypted and used solely for guest registration as required by government norms.
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Step 4: Review ── */}
                {step === 4 && (
                  <div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: '#1a2e28', margin: '0 0 6px' }}>Review & Confirm</h2>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#6a8a82', marginBottom: 24, lineHeight: 1.6 }}>Please review your booking details before proceeding to payment.</p>

                    {/* Room thumbnail */}
                    {form.roomType && roomImages[form.roomType] && (
                      <div style={{ borderRadius: 10, overflow: 'hidden', marginBottom: 24, border: '1px solid rgba(45,106,92,0.1)' }}>
                        <img src={roomImages[form.roomType][0]} alt={form.roomType} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                        <div style={{ background: '#f8fbf9', padding: '10px 16px', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: '#2d6a5c' }}>{form.roomType}</div>
                      </div>
                    )}

                    {[
                      { section: 'Room & Dates', items: [['Room', form.roomType], ['Rate', '₹2,000 / night'], ['Check-in', form.checkIn], ['Check-out', form.checkOut], ['Guests', form.guests]] },
                      { section: 'Guest Details', items: [['Name', form.name], ['Mobile', form.phone], ['Email', form.email || '—'], ...(form.notes ? [['Notes', form.notes]] : [])] },
                      { section: 'Identity',      items: [['ID Type', form.idType], ['ID Number', form.idNumber.replace(/./g, (c, i) => i < form.idNumber.length - 4 ? '•' : c)]] },
                    ].map(group => (
                      <div key={group.section} style={{ marginBottom: 20 }}>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: '#2d6a5c', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>{group.section}</div>
                        <div style={{ background: '#f8fbf9', border: '1px solid rgba(45,106,92,0.1)', borderRadius: 8, overflow: 'hidden' }}>
                          {group.items.map(([k, v], i) => (
                            <div key={k} style={{ display: 'flex', padding: '11px 16px', borderBottom: i < group.items.length - 1 ? '1px solid rgba(45,106,92,0.08)' : 'none' }}>
                              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#6a8a82', width: 110, flexShrink: 0 }}>{k}</div>
                              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: '#1a2e28' }}>{v}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div style={{ background: '#eaf7f2', border: '1px solid rgba(45,106,92,0.2)', borderRadius: 8, padding: '12px 16px' }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#1a5c44', lineHeight: 1.6 }}>
                        By proceeding, you agree to IMA TNSB Guesthouse's stay policies. The reception team will contact you to confirm availability.
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Step 5: Payment ── */}
                {step === 5 && (
                  <div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: '#1a2e28', margin: '0 0 6px' }}>Payment</h2>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#6a8a82', marginBottom: 24, lineHeight: 1.6 }}>Choose how you'd like to pay for your stay.</p>

                    {/* Payment options */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 8 }}>
                      {/* Pay at Reception */}
                      <div onClick={() => { setPaymentMethod('reception'); clearErr('paymentMethod'); set('transactionId', ''); clearErr('transactionId'); }} style={payOptBase(paymentMethod === 'reception')}
                        onMouseEnter={e => { if (paymentMethod !== 'reception') e.currentTarget.style.borderColor = 'rgba(45,106,92,0.4)'; }}
                        onMouseLeave={e => { if (paymentMethod !== 'reception') e.currentTarget.style.borderColor = 'rgba(45,106,92,0.18)'; }}
                      >
                        {paymentMethod === 'reception' && (
                          <div style={{ position: 'absolute', top: 12, right: 12, width: 20, height: 20, borderRadius: '50%', background: '#2d6a5c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 700 }}>✓</div>
                        )}
                        <div style={{ fontSize: 30, marginBottom: 12 }}>🏨</div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: '#1a2e28', marginBottom: 6 }}>Pay at Reception</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#6a8a82', lineHeight: 1.6 }}>Pay in cash or card when you check in. No advance needed.</div>
                        <div style={{ marginTop: 12, display: 'inline-flex', gap: 5, background: '#f4f9f7', border: '1px solid rgba(45,106,92,0.15)', borderRadius: 20, padding: '4px 10px' }}>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, color: '#2d6a5c' }}>Cash · Card</span>
                        </div>
                      </div>

                      {/* UPI */}
                      <div onClick={() => { setPaymentMethod('upi'); clearErr('paymentMethod'); }} style={payOptBase(paymentMethod === 'upi')}
                        onMouseEnter={e => { if (paymentMethod !== 'upi') e.currentTarget.style.borderColor = 'rgba(45,106,92,0.4)'; }}
                        onMouseLeave={e => { if (paymentMethod !== 'upi') e.currentTarget.style.borderColor = 'rgba(45,106,92,0.18)'; }}
                      >
                        {paymentMethod === 'upi' && (
                          <div style={{ position: 'absolute', top: 12, right: 12, width: 20, height: 20, borderRadius: '50%', background: '#2d6a5c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 700 }}>✓</div>
                        )}
                        <div style={{ fontSize: 30, marginBottom: 12 }}>📱</div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: '#1a2e28', marginBottom: 6 }}>Pay via UPI</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#6a8a82', lineHeight: 1.6 }}>Scan QR & pay instantly. Enter transaction ID to confirm.</div>
                        <div style={{ marginTop: 12, display: 'inline-flex', gap: 5, background: '#f4f9f7', border: '1px solid rgba(45,106,92,0.15)', borderRadius: 20, padding: '4px 10px' }}>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, color: '#2d6a5c' }}>GPay · PhonePe · Paytm</span>
                        </div>
                      </div>
                    </div>

                    {errors.paymentMethod && (
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#c0392b', marginBottom: 12 }}>{errors.paymentMethod}</div>
                    )}

                    {/* UPI panel */}
                    {paymentMethod === 'upi' && (
                      <div style={{ marginTop: 20, borderRadius: 12, border: '1px solid rgba(45,106,92,0.18)', background: '#f8fbf9', padding: '24px 22px', animation: 'fadeIn 0.3s ease' }}>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: '#2d6a5c', textTransform: 'uppercase', marginBottom: 16, textAlign: 'center' }}>
                          Scan to Pay — IMA TNSB Guesthouse
                        </div>
                        <div style={{ textAlign: 'center', marginBottom: 18 }}>
                          <div style={{ display: 'inline-block', background: '#fff', borderRadius: 10, padding: 10, boxShadow: '0 4px 20px rgba(45,106,92,0.12)', border: '1px solid rgba(45,106,92,0.1)' }}>
                            <img src="/upi-qr.jpg" alt="UPI QR — IMA TNSB Guesthouse" style={{ display: 'block', width: 190, height: 190, objectFit: 'contain', borderRadius: 4 }} />
                          </div>
                        </div>
                        <div style={{ textAlign: 'center', fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#4a6a62', lineHeight: 1.65, marginBottom: 20 }}>
                          Open <strong>Google Pay</strong>, <strong>PhonePe</strong> or <strong>Paytm</strong> and scan the code above.<br />
                          After payment, enter your <strong>Transaction ID</strong> below.
                        </div>

                        {/* ── Transaction ID (mandatory for UPI) ── */}
                        <div style={{ background: '#fff', borderRadius: 10, padding: '18px 18px 14px', border: `1.5px solid ${errors.transactionId ? '#c0392b' : 'rgba(45,106,92,0.25)'}` }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: '#2a3a35', marginBottom: 10, letterSpacing: '0.04em' }}>
                            <span style={{ fontSize: 16 }}>🔖</span>
                            UPI Transaction ID
                            <span style={{ color: '#c0392b' }}>*</span>
                          </label>
                          <input
                            type="text"
                            value={form.transactionId}
                            onChange={e => { set('transactionId', e.target.value); clearErr('transactionId'); }}
                            placeholder="e.g. 320123456789 or UTR number"
                            style={{ ...inputStyle(errors.transactionId), marginBottom: 0 }}
                            onFocus={e => { if (!errors.transactionId) e.target.style.borderColor = '#2d6a5c'; }}
                            onBlur={e => { if (!errors.transactionId) e.target.style.borderColor = 'rgba(45,106,92,0.25)'; }}
                          />
                          {errors.transactionId && (
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#c0392b', marginTop: 6 }}>{errors.transactionId}</div>
                          )}
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#7a9a92', marginTop: 8 }}>
                            Find this in your UPI app under payment history (also called UTR / Reference ID).
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Reception note */}
                    {paymentMethod === 'reception' && (
                      <div style={{ marginTop: 20, borderRadius: 12, border: '1px solid rgba(45,106,92,0.18)', background: '#f8fbf9', padding: '18px 20px', animation: 'fadeIn 0.3s ease' }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <span style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>📋</span>
                          <div>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: '#1a2e28', marginBottom: 5 }}>Pay at Check-in</div>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#4a6a62', lineHeight: 1.65 }}>
                              Your booking request will be sent to the reception team. They'll confirm your reservation and collect payment on arrival. Both cash and card are accepted.
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
                  </div>
                )}

                {/* Nav buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, gap: 12 }}>
                  {step > 1 ? (
                    <button onClick={() => { setErrors({}); setStep(s => s - 1); }} style={{
                      background: 'transparent', color: '#2d6a5c', border: '1.5px solid #2d6a5c',
                      cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
                      padding: '12px 28px', borderRadius: 7, transition: 'all 0.2s ease',
                    }}>← Back</button>
                  ) : <div />}
                  {step < totalSteps ? (
                    <button onClick={next} style={{
                      background: '#2d6a5c', color: '#fff', border: 'none', cursor: 'pointer',
                      fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
                      padding: '12px 32px', borderRadius: 7, boxShadow: '0 4px 16px rgba(45,106,92,0.25)',
                    }}
                      onMouseEnter={e => e.target.style.background = '#1a4d42'}
                      onMouseLeave={e => e.target.style.background = '#2d6a5c'}
                    >Continue →</button>
                  ) : (
                    <button onClick={() => {
                      const e = validate(5);
                      if (Object.keys(e).length) { setErrors(e); return; }
                      setSubmitted(true);
                    }} style={{
                      background: '#2d6a5c', color: '#fff', border: 'none', cursor: 'pointer',
                      fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
                      padding: '12px 32px', borderRadius: 7, boxShadow: '0 4px 16px rgba(45,106,92,0.25)',
                    }}
                      onMouseEnter={e => e.target.style.background = '#1a4d42'}
                      onMouseLeave={e => e.target.style.background = '#2d6a5c'}
                    >Confirm Booking ✓</button>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* ── Success ── */
            <div style={{ textAlign: 'center', padding: '60px 24px' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#eaf7f2', border: '2px solid #2d6a5c', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontSize: 32 }}>✓</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#1a2e28', margin: '0 0 12px' }}>Booking Request Sent!</h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: '#4a6a62', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 24px' }}>
                Thank you, <strong>{form.name}</strong>. Your reservation request for <strong>{form.roomType}</strong> has been received. Our team will reach you on <strong>{form.phone}</strong> to confirm.
              </p>

              {/* Payment summary */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#f4f9f7', border: '1px solid rgba(45,106,92,0.18)', borderRadius: 10, padding: '14px 22px', marginBottom: 8 }}>
                <span style={{ fontSize: 20 }}>{paymentMethod === 'upi' ? '📱' : '🏨'}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: '#2d6a5c', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>Payment</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: '#1a2e28' }}>
                    {paymentMethod === 'upi' ? `UPI — Txn ID: ${form.transactionId}` : 'Pay at Reception on arrival'}
                  </div>
                </div>
              </div>

              <br /><br />
              <button onClick={() => {
                setSubmitted(false); setStep(1); setPaymentMethod('');
                setForm({ roomType: '', checkIn: '', checkOut: '', guests: '1', name: '', phone: '', email: '', idType: '', idNumber: '', notes: '', transactionId: '' });
              }} style={{
                background: '#2d6a5c', color: '#fff', border: 'none', cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
                padding: '13px 32px', borderRadius: 7,
              }}>Make Another Booking</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
