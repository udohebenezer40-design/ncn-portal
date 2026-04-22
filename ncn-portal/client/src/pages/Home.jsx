import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const G = '#1B5E20'
const R = '#B71C1C'
const GOLD = '#F9A825'

const heroSlides = [
  'https://i.imgur.com/v4AdFYT.jpg',
  'https://i.imgur.com/wZDM6pp.jpg',
]

const requirements = [
  'Must be a Nigerian citizen by birth with valid NIN',
  'Minimum age: 17 years',
  'Must be physically, mentally, and medically fit',
  'Free from criminal record and drug use',
  'Must possess a good character',
]

const whoCanApply = [
  { title: 'Students', desc: 'Secondary, College & Tertiary institutions' },
  { title: 'Graduates', desc: 'NCE, ND, HND, BSc, MSc, PhD holders' },
  { title: 'Professionals', desc: 'Doctors, Engineers, Lecturers, Businessmen/Women, etc.' },
  { title: 'Patrons', desc: 'Civil servants and interested adults (40 years & above)' },
]

export default function Home() {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setSlide(prev => (prev + 1) % heroSlides.length), 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: '100vh', background: '#0D2110' }}>
        {heroSlides.map((src, i) => (
          <img key={i} src={src} alt="" aria-hidden="true"
            className="absolute inset-0 w-full h-full transition-opacity duration-1000"
            style={{ objectFit: 'cover', objectPosition: 'center', opacity: i === slide ? 1 : 0, pointerEvents: 'none' }} />
        ))}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.55)', zIndex: 1 }} />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === slide ? 'bg-white scale-125' : 'bg-white/40'}`}
              aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <div className="relative flex flex-col items-center justify-center text-center text-white px-4"
          style={{ zIndex: 10, minHeight: '100vh' }}>
          <span className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase"
            style={{ background: R }}>
            Recruitment Ongoing
          </span>
          <h1 className="font-extrabold mb-4 drop-shadow max-w-3xl leading-tight text-2xl md:text-4xl"
            style={{ color: '#FFFFFF' }}>
            Community Auxiliary Development & Effective Transformation Network
          </h1>
          <p className="text-base md:text-lg text-gray-200 max-w-xl mx-auto mb-2 font-medium">
            15th Regular Intake — Batch A & B
          </p>
          <p className="text-sm mb-8 font-semibold" style={{ color: GOLD }}>
            Lagos State Command · Screening: April 22nd, 2026 · 0600 Hours
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-sm sm:max-w-none">
            <Link to="/apply"
              className="w-full sm:w-auto text-center text-white font-bold px-8 py-3 rounded-lg transition-colors hover:opacity-90"
              style={{ background: R }}>
              Apply Now
            </Link>
            <a href="#schedule"
              className="w-full sm:w-auto text-center text-white font-semibold px-8 py-3 rounded-lg border-2 border-white bg-transparent transition-colors hover:bg-white hover:text-green-900">
              View Screening Schedule
            </a>
          </div>
        </div>
      </div>

      {/* Aims & Objectives */}
      <div className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: G }}>Our Purpose</p>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Aims & Objectives</h2>
            <div className="mx-auto mt-3 mb-4 rounded-full" style={{ width: '48px', height: '3px', background: G }} />
            <p className="text-gray-500 text-base max-w-2xl mx-auto">
              The Nigerian Cadet Network is committed to building the next generation of disciplined, skilled, and service-oriented Nigerians.
            </p>
          </div>

          {/* Row 1 — 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {[
              { n: '01', text: 'Harnessing the creative genius of the youths for efficient performance.' },
              { n: '02', text: 'Identifying tools, techniques and processes of critical thinking, creativity, innovation and discovery to facilitate problem solving.' },
              { n: '03', text: 'Initiating youth capacity building programmes for empowerment, development and humanitarian services.' },
            ].map(({ n, text }) => (
              <div key={n} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-6">
                <p className="text-5xl font-black mb-3 leading-none" style={{ color: '#DCFCE7' }}>{n}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* Row 2 — 2 cards centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[
              { n: '04', text: 'Providing an opportunity and platform whereby semi-military training is imparted into the youths.' },
              { n: '05', text: 'Creating a human resource of well-organized, skilled and highly motivated youth, endowed with leadership in all walks of life and always ready to serve the nation.' },
            ].map(({ n, text }) => (
              <div key={n} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-6">
                <p className="text-5xl font-black mb-3 leading-none" style={{ color: '#DCFCE7' }}>{n}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 text-base italic mb-4">
              Join an organization built on discipline, leadership and excellence.
            </p>
            <Link to="/apply"
              className="inline-block text-white font-bold px-8 py-3 rounded-lg transition-colors hover:opacity-90"
              style={{ background: R }}>
              Apply Now
            </Link>
          </div>
        </div>
      </div>

      {/* Official Signal */}
      <div id="schedule" className="py-14 pb-16 px-4 border-t border-gray-100" style={{ background: '#F5F5F5' }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-center" style={{ color: G }}>
            Official Signal — Lagos State Command
          </p>
          <h2 className="font-bold text-center mb-2" style={{ fontSize: '1.75rem', color: '#1A1A1A' }}>
            Recruitment Notice
          </h2>
          <div className="mx-auto mb-8 rounded-full" style={{ width: '48px', height: '3px', background: G }} />

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8">
              <h3 className="font-bold mb-1" style={{ fontSize: '1.25rem', color: '#1A1A1A' }}>
                Recruitment into Nigeria Cadet Network
              </h3>
              <p className="font-semibold mb-5 text-sm" style={{ color: G }}>Lagos State Command</p>
              <p className="font-semibold mb-5 text-gray-800" style={{ fontSize: '1rem', lineHeight: 1.6 }}>
                15th Regular Intake Batch B — Male & Female (Trade & Non-Trade Cadet Courses)
              </p>
              <div className="h-px bg-gray-100 mb-5" />
              <p className="text-gray-600 mb-6" style={{ fontSize: '0.9375rem', lineHeight: 1.8 }}>
                Are you ready to serve, lead, and make a difference? The Nigeria Cadet Network (NCN) is calling on all eligible Nigerians to apply for the{' '}
                <strong className="text-gray-900">15th Regular Cadet Intake Batch B.</strong>
              </p>

              <div className="border border-gray-200 rounded-lg p-5 mb-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: G }}>
                  Basic Requirements
                </h3>
                <ul className="space-y-2">
                  {requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <span className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: G }} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-5 mb-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: G }}>
                  Who Can Apply
                </h3>
                <ul className="space-y-2">
                  {whoCanApply.map(({ title, desc }, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <span className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: G }} />
                      <span><strong className="text-gray-900">{title}:</strong> {desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA to apply page */}
              <div className="text-center pt-4 border-t border-gray-100">
                <Link to="/apply"
                  className="inline-block text-white font-bold px-10 py-3 rounded-lg transition-colors hover:opacity-90 text-sm"
                  style={{ background: R }}>
                  Proceed to Application
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
