import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import api from '../lib/api'

// ─────────────────────────────────────────────────────────────
// 🎨 DESIGN CONFIG — tweak images, colors & text here easily
// ─────────────────────────────────────────────────────────────
const NCN_LOGO = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ifTzmBlalhC9fpDsNk_GXniJOTRm0RBcyw&s'

const CADRE_CONFIG = {
  rri: {
    label: 'Student Cadre',
    subtitle: 'Junior Intake — Secondary, College & Tertiary Students',
    // 👇 Replace with your own image URL
    bannerImage: 'https://i.imgur.com/wZDM6pp.jpg',
    accentColor: '#228B22',       // forest green
    headerBg: 'linear-gradient(135deg, #0a2e0a 0%, #228B22 60%, #145214 100%)',
    badgeLabel: '🎓 Student Cadre',
    requirements: [
      'SSCE / WAEC / NECO certificate',
      'Age: 17–22 years',
      'Height: min. 1.68m (male), 1.65m (female)',
      'Nigerian citizenship',
      'NIN Slip (Mandatory)',
    ],
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <polygon points="24,6 42,16 24,26 6,16" fill="#d4af37"/>
        <path d="M10 20 L10 32 Q24 38 38 32 L38 20" fill="none" stroke="#d4af37" strokeWidth="2.5" strokeLinejoin="round"/>
        <line x1="42" y1="16" x2="42" y2="30" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="42" cy="31.5" r="2" fill="#d4af37"/>
      </svg>
    ),
  },
  'ssc-dssc': {
    label: 'Graduate / Trade Cadet',
    subtitle: 'NCE, ND, HND, BSc, MSc, PhD Holders',
    // 👇 Replace with your own image URL
    bannerImage: 'https://i.imgur.com/v4AdFYT.jpg',
    accentColor: '#1a5fa0',
    headerBg: 'linear-gradient(135deg, #0a1a2e 0%, #1a5fa0 60%, #0d3060 100%)',
    badgeLabel: '📘 Graduate Entry',
    requirements: [
      'HND or Bachelor\'s degree',
      'Age: 22–30 years',
      'NYSC discharge certificate',
      'Academic transcripts',
      'NIN Slip (Mandatory)',
    ],
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <path d="M24 6 Q14 4 6 6 L6 38 Q14 36 24 38 Q34 36 42 38 L42 6 Q34 4 24 6Z" fill="none" stroke="#d4af37" strokeWidth="2"/>
        <line x1="24" y1="6" x2="24" y2="38" stroke="#d4af37" strokeWidth="1.8"/>
        <line x1="10" y1="14" x2="22" y2="14" stroke="#d4af37" strokeWidth="1.2" opacity="0.7"/>
        <line x1="10" y1="20" x2="22" y2="20" stroke="#d4af37" strokeWidth="1.2" opacity="0.7"/>
        <line x1="10" y1="26" x2="22" y2="26" stroke="#d4af37" strokeWidth="1.2" opacity="0.7"/>
        <line x1="26" y1="14" x2="38" y2="14" stroke="#d4af37" strokeWidth="1.2" opacity="0.7"/>
        <line x1="26" y1="20" x2="38" y2="20" stroke="#d4af37" strokeWidth="1.2" opacity="0.7"/>
        <line x1="26" y1="26" x2="38" y2="26" stroke="#d4af37" strokeWidth="1.2" opacity="0.7"/>
      </svg>
    ),
  },
  nda: {
    label: 'Professional Cadre',
    subtitle: 'Doctors, Engineers, Lecturers & Business Leaders',
    // 👇 Replace with your own image URL
    bannerImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80',
    accentColor: '#8B6914',
    headerBg: 'linear-gradient(135deg, #1a1000 0%, #8B6914 60%, #5a4008 100%)',
    badgeLabel: '⚙️ Professional',
    requirements: [
      'Professional certifications',
      'Attestation of Good Conduct',
      'Age: 25–35 years',
      'Nigerian citizenship',
      'NIN Slip (Mandatory)',
    ],
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <rect x="8" y="20" width="32" height="22" rx="2" stroke="#d4af37" strokeWidth="2"/>
        <path d="M18 20 L18 14 Q18 8 24 8 Q30 8 30 14 L30 20" stroke="#d4af37" strokeWidth="2" fill="none"/>
        <line x1="8" y1="30" x2="40" y2="30" stroke="#d4af37" strokeWidth="1.4" opacity="0.6"/>
        <line x1="24" y1="26" x2="24" y2="34" stroke="#d4af37" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  'na-band': {
    label: 'Patron & Civil Wing',
    subtitle: 'Civil Servants & Adults (40 years and above)',
    // 👇 Replace with your own image URL
    bannerImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80',
    accentColor: '#6b21a8',
    headerBg: 'linear-gradient(135deg, #1a0a2e 0%, #6b21a8 60%, #3b0764 100%)',
    badgeLabel: '🏛️ Patron & Civil Wing',
    requirements: [
      'Valid Government ID',
      'Proof of Employment / Business',
      'Guarantor Form',
      'Age: 40 years and above',
      'NIN Slip (Mandatory)',
    ],
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <path d="M24 4 L40 12 L40 28 Q40 40 24 44 Q8 40 8 28 L8 12 Z" stroke="#d4af37" strokeWidth="2" fill="none"/>
        <polygon points="24,16 26.4,22.8 33.6,22.8 27.6,27.2 30,34 24,29.6 18,34 20.4,27.2 14.4,22.8 21.6,22.8"
          fill="#d4af37" opacity="0.9"/>
      </svg>
    ),
  },
}
// ─────────────────────────────────────────────────────────────

const states = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo',
  'Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa',
  'Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba',
  'Yobe','Zamfara',
]

const serif = { fontFamily: "'Times New Roman', Times, serif" }

export default function Apply() {
  const { cadre } = useParams()
  const navigate = useNavigate()
  const info = CADRE_CONFIG[cadre]
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  if (!info) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-500">Cadre not found.</p>
        <button onClick={() => navigate('/')} className="mt-4 underline" style={{ color: '#228B22' }}>
          Go back home
        </button>
      </div>
    )
  }

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([k, v]) => {
        if (k === 'passport') formData.append(k, v[0])
        else formData.append(k, v)
      })
      formData.append('cadre', cadre)
      await api.post('/api/applications', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      toast.success('Application submitted successfully!')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed. Please try again.')
    }
  }

  return (
    <div style={{ background: '#0a1a0a', minHeight: '100vh' }}>

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden" style={{ minHeight: '260px' }}>
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${info.bannerImage}')` }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: info.headerBg, opacity: 0.88 }} />

        {/* Decorative corner shield — top left */}
        <div className="absolute top-4 left-4 opacity-20">
          <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none">
            <path d="M40 4 L68 18 L68 44 Q68 64 40 72 Q12 64 12 44 L12 18 Z" stroke="#d4af37" strokeWidth="1.5"/>
          </svg>
        </div>
        {/* Decorative corner shield — bottom right */}
        <div className="absolute bottom-4 right-4 opacity-20">
          <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none">
            <path d="M40 4 L68 18 L68 44 Q68 64 40 72 Q12 64 12 44 L12 18 Z" stroke="#d4af37" strokeWidth="1.5"/>
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-14">
          {/* Logo */}
          <img src={NCN_LOGO} alt="NCN Logo"
            className="w-16 h-16 rounded-full object-cover border-2 mb-4"
            style={{ borderColor: '#d4af37', boxShadow: '0 0 20px rgba(212,175,55,0.4)' }} />

          {/* Badge */}
          <span className="text-xs font-bold px-3 py-1 rounded-full mb-3"
            style={{ ...serif, background: 'rgba(212,175,55,0.2)', color: '#d4af37', border: '1px solid #d4af3780' }}>
            {info.badgeLabel}
          </span>

          {/* Icon */}
          <div className="mb-3">{info.icon}</div>

          <h1 style={{ ...serif, fontSize: '28px', fontWeight: 700, color: '#ffffff' }}>
            {info.label} Application
          </h1>
          <p style={{ ...serif, fontSize: '14px', color: '#d4af37', marginTop: '6px' }}>
            {info.subtitle}
          </p>

          {/* Gold divider */}
          <div className="flex items-center gap-3 mt-5">
            <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #d4af37)' }} />
            <div style={{ width: '6px', height: '6px', background: '#d4af37', transform: 'rotate(45deg)' }} />
            <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, #d4af37, transparent)' }} />
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Requirements card */}
        <div className="rounded-xl mb-8 overflow-hidden"
          style={{ border: '1px solid #031803ff', background: 'linear-gradient(135deg, #0d1f0d, #0a1200)' }}>
          <div className="px-5 py-3 flex items-center gap-3"
            style={{ background: '#cc0000' }}>
            <span style={{ ...serif, fontSize: '14px', fontWeight: 700, color: '#fff' }}>
              ✅ Eligibility Requirements
            </span>
          </div>
          <div className="px-5 py-4">
            <ul className="space-y-2">
              {info.requirements.map((r, i) => (
                <li key={i} className="flex items-start gap-2"
                  style={{ ...serif, fontSize: '13px', color: '#c8e8c8' }}>
                  <span style={{ color: '#d4af37', flexShrink: 0 }}>◆</span> {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-xl overflow-hidden"
          style={{ border: '1px solid #228B22', background: 'linear-gradient(160deg, #0d1f0d 0%, #0a1200 100%)', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>

          {/* Form header */}
          <div className="px-6 py-4 flex items-center gap-4"
            style={{ background: 'linear-gradient(90deg, #228B22, #145214)', borderBottom: '1px solid #d4af3740' }}>
            <img src={NCN_LOGO} alt="NCN" className="w-8 h-8 rounded-full object-cover" style={{ border: '1px solid #d4af37' }} />
            <div>
              <p style={{ ...serif, fontSize: '15px', fontWeight: 700, color: '#fff' }}>Personal Information Form</p>
              <p style={{ ...serif, fontSize: '12px', color: '#a8d8a8' }}>All fields marked * are required</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">

            {/* Section label */}
            <SectionLabel>👤 Personal Details</SectionLabel>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="First Name *" error={errors.first_name}>
                <StyledInput {...register('first_name', { required: 'Required' })} placeholder="John" hasError={!!errors.first_name} />
              </Field>
              <Field label="Last Name *" error={errors.last_name}>
                <StyledInput {...register('last_name', { required: 'Required' })} placeholder="Doe" hasError={!!errors.last_name} />
              </Field>
            </div>

            <Field label="Middle Name">
              <StyledInput {...register('middle_name')} placeholder="Optional" />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Date of Birth *" error={errors.dob}>
                <StyledInput type="date" {...register('dob', { required: 'Required' })} hasError={!!errors.dob} />
              </Field>
              <Field label="Gender *" error={errors.gender}>
                <StyledSelect {...register('gender', { required: 'Required' })} hasError={!!errors.gender}>
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </StyledSelect>
              </Field>
            </div>

            <SectionLabel>📞 Contact Information</SectionLabel>

            <Field label="Email Address *" error={errors.email}>
              <StyledInput type="email" {...register('email', { required: 'Required' })} placeholder="you@example.com" hasError={!!errors.email} />
            </Field>

            <Field label="Phone Number *" error={errors.phone}>
              <StyledInput type="tel"
                {...register('phone', { required: 'Required', pattern: { value: /^[0-9]{11}$/, message: '11-digit number required' } })}
                placeholder="08012345678" hasError={!!errors.phone} />
            </Field>

            <SectionLabel>📍 Origin & Qualification</SectionLabel>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="State of Origin *" error={errors.state}>
                <StyledSelect {...register('state', { required: 'Required' })} hasError={!!errors.state}>
                  <option value="">Select state</option>
                  {states.map(s => <option key={s}>{s}</option>)}
                </StyledSelect>
              </Field>
              <Field label="LGA of Origin *" error={errors.lga}>
                <StyledInput {...register('lga', { required: 'Required' })} placeholder="Local Government Area" hasError={!!errors.lga} />
              </Field>
            </div>

            <Field label="Highest Qualification *" error={errors.qualification}>
              <StyledSelect {...register('qualification', { required: 'Required' })} hasError={!!errors.qualification}>
                <option value="">Select qualification</option>
                <option>SSCE / WAEC / NECO</option>
                <option>OND</option>
                <option>HND</option>
                <option>B.Sc / B.A / B.Eng</option>
                <option>M.Sc / MBA</option>
                <option>PhD</option>
              </StyledSelect>
            </Field>

            <SectionLabel>🆔 Identity & Documents</SectionLabel>

            <Field label="NIN (National Identification Number) *" error={errors.nin}>
              <StyledInput
                {...register('nin', { required: 'Required', pattern: { value: /^[0-9]{11}$/, message: '11-digit NIN required' } })}
                placeholder="12345678901" hasError={!!errors.nin} />
            </Field>

            <Field label="Passport Photograph *" error={errors.passport}>
              <div style={{ background: '#0a1200', border: `1px dashed ${errors.passport ? '#cc0000' : '#228B22'}`, borderRadius: '8px', padding: '12px' }}>
                <input type="file" accept="image/*"
                  {...register('passport', { required: 'Passport photo required' })}
                  className="block w-full text-sm cursor-pointer"
                  style={{ color: '#a8d8a8' }} />
                <p style={{ ...serif, fontSize: '11px', color: '#5a8a5a', marginTop: '6px' }}>
                  JPG/PNG only · Max 2MB · White background preferred
                </p>
              </div>
            </Field>

            {/* Divider */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #228B22, transparent)' }} />

            {/* Submit */}
            <button type="submit" disabled={isSubmitting}
              className="w-full font-bold py-3.5 rounded-lg transition-all duration-200"
              style={{
                ...serif,
                fontSize: '15px',
                background: isSubmitting ? '#145214' : '#cc0000',
                color: '#ffffff',
                border: '1px solid #d4af3760',
                letterSpacing: '0.05em',
                opacity: isSubmitting ? 0.7 : 1,
              }}
              onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.background = '#228B22' }}
              onMouseLeave={e => { if (!isSubmitting) e.currentTarget.style.background = '#cc0000' }}
            >
              {isSubmitting ? '⏳ Submitting...' : '✅ Submit Application →'}
            </button>

            <p style={{ ...serif, fontSize: '11px', color: '#5a8a5a', textAlign: 'center' }}>
              By submitting, you confirm all information provided is accurate and truthful.
            </p>
          </form>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <button onClick={() => navigate('/')}
            style={{ ...serif, fontSize: '13px', color: '#5a8a5a' }}
            className="hover:underline">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Sub-components ──

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <p style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: '13px', fontWeight: 700, color: '#d4af37', letterSpacing: '0.05em' }}>
        {children}
      </p>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #d4af3760, transparent)' }} />
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: '13px', fontWeight: 700, color: '#a8d8a8', display: 'block', marginBottom: '5px' }}>
        {label}
      </label>
      {children}
      {error && <p style={{ color: '#ff6b6b', fontSize: '11px', marginTop: '3px' }}>{error.message}</p>}
    </div>
  )
}

// eslint-disable-next-line react/display-name
import { forwardRef } from 'react'

const StyledInput = forwardRef(({ hasError, ...props }, ref) => (
  <input
    ref={ref}
    {...props}
    style={{
      width: '100%',
      background: '#0a1200',
      border: `1px solid ${hasError ? '#cc0000' : '#228B22'}`,
      borderRadius: '8px',
      padding: '9px 12px',
      fontSize: '13px',
      color: '#e8f5e8',
      fontFamily: "'Times New Roman', Times, serif",
      outline: 'none',
    }}
    onFocus={e => e.target.style.borderColor = '#d4af37'}
    onBlur={e => e.target.style.borderColor = hasError ? '#cc0000' : '#228B22'}
  />
))

const StyledSelect = forwardRef(({ hasError, children, ...props }, ref) => (
  <select
    ref={ref}
    {...props}
    style={{
      width: '100%',
      background: '#0a1200',
      border: `1px solid ${hasError ? '#cc0000' : '#228B22'}`,
      borderRadius: '8px',
      padding: '9px 12px',
      fontSize: '13px',
      color: '#e8f5e8',
      fontFamily: "'Times New Roman', Times, serif",
      outline: 'none',
    }}
    onFocus={e => e.target.style.borderColor = '#d4af37'}
    onBlur={e => e.target.style.borderColor = hasError ? '#cc0000' : '#228B22'}
  >
    {children}
  </select>
))
