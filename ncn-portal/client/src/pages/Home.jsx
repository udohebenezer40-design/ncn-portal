import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const heroSlides = [
  'https://i.imgur.com/v4AdFYT.jpg',
  'https://i.imgur.com/wZDM6pp.jpg',
]

const cadres = [
  {
    slug: 'rri',
    badge: 'Student Cadre',
    title: 'Student Intake',
    target: 'Secondary, College & Tertiary Students',
    requirements: ['Nigerian Citizenship', 'NIN (Mandatory)', 'Age 17+', 'School ID / Admission Letter'],
    focus: 'Discipline, Character Building & Leadership Foundation',
    cta: 'Apply for Student Cadre',
    icon: (
      // Graduation cap
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
        <polygon points="20,8 36,16 20,24 4,16" fill="#d4af37"/>
        <path d="M10 19 L10 28 Q20 33 30 28 L30 19" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinejoin="round"/>
        <line x1="36" y1="16" x2="36" y2="26" stroke="#d4af37" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="36" cy="27" r="1.5" fill="#d4af37"/>
      </svg>
    ),
  },
  {
    slug: 'ssc-dssc',
    badge: 'Graduate Entry',
    title: 'Graduate / Trade Cadet',
    target: 'NCE, ND, HND, BSc, MSc, PhD Holders',
    requirements: ['Academic Transcripts', 'SSCE Results', 'Birth Certificate', 'NIN Slip'],
    focus: 'Specialized Trade Courses & Commissioned Entry',
    cta: 'Apply for Graduate Entry',
    icon: (
      // Open book
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
        <path d="M20 10 Q12 8 6 10 L6 30 Q12 28 20 30 Q28 28 34 30 L34 10 Q28 8 20 10Z" fill="none" stroke="#d4af37" strokeWidth="1.8"/>
        <line x1="20" y1="10" x2="20" y2="30" stroke="#d4af37" strokeWidth="1.5"/>
        <line x1="9" y1="15" x2="18" y2="15" stroke="#d4af37" strokeWidth="1" opacity="0.7"/>
        <line x1="9" y1="19" x2="18" y2="19" stroke="#d4af37" strokeWidth="1" opacity="0.7"/>
        <line x1="9" y1="23" x2="18" y2="23" stroke="#d4af37" strokeWidth="1" opacity="0.7"/>
        <line x1="22" y1="15" x2="31" y2="15" stroke="#d4af37" strokeWidth="1" opacity="0.7"/>
        <line x1="22" y1="19" x2="31" y2="19" stroke="#d4af37" strokeWidth="1" opacity="0.7"/>
        <line x1="22" y1="23" x2="31" y2="23" stroke="#d4af37" strokeWidth="1" opacity="0.7"/>
      </svg>
    ),
  },
  {
    slug: 'nda',
    badge: 'Professional',
    title: 'Professional Cadre',
    target: 'Doctors, Engineers, Lecturers, Business Leaders',
    requirements: ['Professional Certifications', 'Attestation of Good Conduct', 'NIN Slip', 'Valid ID'],
    focus: 'Executive Leadership, Technical Advisory & Specialist Roles',
    cta: 'Register as a Professional',
    icon: (
      // Briefcase
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
        <rect x="6" y="16" width="28" height="18" rx="2" stroke="#d4af37" strokeWidth="1.8"/>
        <path d="M15 16 L15 12 Q15 9 20 9 Q25 9 25 12 L25 16" stroke="#d4af37" strokeWidth="1.8" fill="none"/>
        <line x1="6" y1="24" x2="34" y2="24" stroke="#d4af37" strokeWidth="1.2" opacity="0.6"/>
        <line x1="20" y1="21" x2="20" y2="27" stroke="#d4af37" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    slug: 'na-band',
    badge: 'Patron & Civil Wing',
    title: 'Patron & Civil Wing',
    target: 'Civil Servants & Adults (40 years and above)',
    requirements: ['Valid Government ID', 'Proof of Employment / Business', 'Guarantor Form', 'NIN Slip'],
    focus: 'Mentorship, Community Patronage & Administrative Support',
    cta: 'Join the Patronate',
    icon: (
      // Shield with star
      <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
        <path d="M20 4 L34 10 L34 24 Q34 33 20 37 Q6 33 6 24 L6 10 Z" stroke="#d4af37" strokeWidth="1.8" fill="none"/>
        <polygon points="20,13 21.8,18.5 27.5,18.5 22.9,21.8 24.7,27.3 20,24 15.3,27.3 17.1,21.8 12.5,18.5 18.2,18.5"
          fill="#d4af37" opacity="0.9"/>
      </svg>
    ),
  },
]

const docs = [
  { icon: '📂', label: 'Educational Credentials', detail: 'SSCE / ND / HND / B.Sc certificate(s)' },
  { icon: '🎂', label: 'Proof of Age', detail: 'Valid Birth Certificate or Age Declaration' },
  { icon: '📜', label: 'Character Reference', detail: 'Attestation letter from a Lawyer, Church, or Mosque' },
  { icon: '💳', label: 'Financial Verification', detail: 'Original Receipt of Payment' },
  { icon: '🆔', label: 'Identity (Mandatory)', detail: 'NIN Slip — no exceptions' },
]

const serif = { fontFamily: "'Times New Roman', Times, serif" }

export default function Home() {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setSlide(prev => (prev + 1) % heroSlides.length), 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      {/* ── Hero Slideshow ── */}
      <div className="relative h-[520px] overflow-hidden">
        {heroSlides.map((src, i) => (
          <div key={i} className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{ backgroundImage: `url('${src}')`, opacity: i === slide ? 1 : 0 }} />
        ))}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === slide ? 'bg-white scale-125' : 'bg-white/40'}`}
              aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <div className="inline-block bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 animate-pulse tracking-widest"
            style={serif}>🚨 RECRUITMENT ONGOING</div>
          <h1 className="text-3xl md:text-3xl font-extrabold mb-3 drop-shadow" style={serif}>
            COMMUNITY AUXILIARY DEVELOPMENT & EFFECTIVE TRANSFORMATION NETWORK
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-2" style={serif}>
            15th Regular Intake — Batch A &amp; B
          </p>
          <p className="text-sm text-green-300 mb-8" style={serif}>
          LAGOS STATE COMMAND · Screening: <span className="font-bold">April 22nd, 2026 · 0600 Hours</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/apply/rci"
              className="bg-red-700 hover:bg-red-800 text-white font-bold px-8 py-3 rounded transition-colors"
              style={serif}>Apply Now →</Link>
            <a href="#schedule"
              className="bg-green-700 hover:bg-white/20 border border-white/60 text-white font-bold px-8 py-3 rounded transition-colors"
              style={serif}>📥 Download Screening Schedule</a>
          </div>
        </div>
      </div>

      {/* ── Official Signal Notice Board ── */}
      <div id="schedule" className="bg-white-900 py-10 px-4">
        <div className="max-w-3xl mx-auto border border-deep red-500 rounded-lg p-6 bg-red-950/60">
          <p style={{ ...serif, fontSize: '24px', fontWeight: 900 }} className="text-green-400 mb-4 tracking-widest">
                    OFFICIAL SIGNAL !!!
          </p>
          <div style={{ ...serif, fontSize: '14px', fontWeight: 700 }} className="text-green-300 leading-8 whitespace-pre-wrap">
{`SUBJECT : SCREENING AND EXAMINATION FOR 15TH REGULAR INTAKE (BATCH A)
DATE    : Wednesday, 22nd April, 2026
TIME    : 0600 Hours (6:00 AM Prompt)
VENUE   : Cadet Base 1 (Eko Immaculate International School)

⚠  NOTE: Late arrival leads to AUTOMATIC DISQUALIFICATION.
         .All candidates must arrive in proper attire.
         .Original documents are MANDATORY for verification.`}
          </div>
        </div>
      </div>

      {/* ── Choose Your Cadre — Red & Forest Green ── */}
      <div
        className="py-16 px-4"
        style={{ background: '#228B22' }}
      >
        {/* Section header */}
        <div className="max-w-6xl mx-auto text-center mb-12">
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-700" />
            <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
              <path d="M16 2 L22 10 L22 22 Q22 28 16 30 Q10 28 10 22 L10 10 Z"
                fill="#00ff00ff" stroke="#75ff04ff" strokeWidth="1.2"/>
              <path d="M13 18 L15.5 20.5 L19 15" stroke="#e5e9e7ff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-700" />
          </div>
          <h2 style={{ ...serif, fontSize: '40px', fontWeight: 1000, color: '#ffffffff', letterSpacing: '0.05em' }}>
            Choose Your Cadre
          </h2>
          <p style={{ ...serif, fontSize: '25px', color: '#ffffff', marginTop: '10px' }}>
            Select the category that best matches your qualification and background.
          </p>
        </div>

        {/* Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cadres.map((c) => (
            <div
              key={c.slug}
              className="flex flex-col rounded-xl overflow-hidden group transition-transform duration-300 hover:-translate-y-1"
              style={{
                background: '#ffffff',
                border: '1px solid #228B22',
                boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
              }}
            >
              {/* Red header bar with cadre name */}
              <div className="flex items-center justify-between px-4 py-3"
                style={{ background: '#cc0000' }}>
                <span style={{ ...serif, fontSize: '13px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.04em' }}>
                  {c.badge} 
                </span>
                <div className="opacity-90 group-hover:scale-110 transition-transform duration-200">
                  {c.icon}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                {/* Title */}
                <h3 style={{ ...serif, fontSize: '16px', fontWeight: 700, color: '#111111', marginBottom: '4px' }}>
                  {c.title}
                </h3>

                {/* Target */}
                <p style={{ ...serif, fontSize: '12px', color: '#444444', fontStyle: 'bold', marginBottom: '12px' }}>
                  {c.target}
                </p>

                {/* Divider */}
                <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #228B22, transparent)', marginBottom: '12px' }} />

                {/* Requirements */}
                <ul className="flex-1 space-y-1.5 mb-4">
                  {c.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-2"
                      style={{ ...serif, fontSize: '12px', color: '#111111' }}>
                      <span style={{ color: '#228B22', marginTop: '1px', flexShrink: 0 }}>✓</span>
                      {r}
                    </li>
                  ))}
                </ul>

                {/* Focus */}
                <p style={{ ...serif, fontSize: '11px', color: '#333333', fontStyle: 'italic', marginBottom: '16px' }}>
                  Focus: {c.focus}
                </p>

                {/* CTA — dark green, turns red on hover */}
                <Link
                  to={`/apply/${c.slug}`}
                  className="block text-center font-bold py-2.5 rounded transition-colors duration-200"
                  style={{ ...serif, fontSize: '13px', letterSpacing: '0.03em' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#cc0000'}
                  onMouseLeave={e => e.currentTarget.style.background = '#228B22'}
                  ref={el => { if (el) el.style.background = '#228B22' }}
                >
                  <span style={{ color: '#ffffff' }}>{c.cta}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom shield emblem */}
        <div className="flex justify-center mt-12 opacity-30">
          <svg viewBox="0 0 60 60" className="w-12 h-12" fill="none">
            <path d="M30 4 L52 16 L52 36 Q52 50 30 56 Q8 50 8 36 L8 16 Z"
              fill="none" stroke="#228B22" strokeWidth="1.5"/>
            <path d="M30 12 L44 20 L44 34 Q44 44 30 48 Q16 44 16 34 L16 20 Z"
              fill="none" stroke="#cc0000" strokeWidth="0.8" opacity="0.5"/>
          </svg>
        </div>
      </div>

      {/* ── Required Documents ── */}
      <div className="py-14 px-4" style={{ background: '#023802ff' }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-600" />
            <h2 style={{ ...serif, fontSize: '40px', fontWeight: 700, color: '#f5f0e8' }}>
              📋 Required Documentation
            </h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white-600" />
          </div>
          <p className="text-center mb-8" style={{ ...serif, fontSize: '17px', color: '#ffffffff' }}>
            Ensure all documents are ready before starting your application. Missing items will lead to disqualification.
          </p>

          <div className="space-y-3">
            {docs.map((d, i) => (
              <div key={i} className="flex items-start gap-4 rounded-lg px-5 py-4"
                style={{ background: '#0d1f0d', border: '1px solid #228B22' }}>
                <span className="text-2xl">{d.icon}</span>
                <div>
                  <p style={{ ...serif, fontSize: '14px', fontWeight: 700, color: '#f0e8d0' }}>{d.label}</p>
                  <p style={{ ...serif, fontSize: '12px', color: '#7a6a50', marginTop: '4px' }}>{d.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/apply/rci"
              className="inline-block font-bold px-12 py-3.5 rounded transition-all hover:brightness-110"
              style={{
                ...serif,
                fontSize: '14px',
                background: '#cc0000',
                color: '#ffffff',
                border: '1px solid #8B0000',
                letterSpacing: '0.05em',
              }}
            >
              🖊 START ONLINE APPLICATION
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
