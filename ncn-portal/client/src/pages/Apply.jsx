import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import toast from 'react-hot-toast'
import api from '../lib/api'

const serif = { fontFamily: "'Times New Roman', Times, serif" }

const categories = {
  rci: {
    label: 'Category A - Regular Cadet Intake',
    fees: [
      { item: 'Application Form (Mandatory first)', amount: 5000 },
      { item: 'Camp Fee', amount: 5000 },
      { item: 'ID Card', amount: 5000 },
      { item: 'Certificates', amount: 3000 },
      { item: 'Administrative Charges', amount: 3000 },
      { item: 'Training & Regimentation Levy', amount: 2000 },
      { item: 'Feeding', amount: 2000 },
    ],
    total: 25000,
  },
  'ssc-dssc': {
    label: 'Category B - Graduate / Cadre (HND, BSc, Postgraduate)',
    fees: [
      { item: 'Application Form (Mandatory first)', amount: 10000 },
      { item: 'Camp Fee', amount: 10000 },
      { item: 'Certificates', amount: 5000 },
      { item: 'ID Card', amount: 10000 },
      { item: 'Administrative Charges', amount: 5000 },
      { item: 'Training Fee', amount: 5000 },
      { item: 'Feeding', amount: 5000 },
    ],
    total: 50000,
  },
  nda: {
    label: 'Category C - Marshals',
    fees: [{ item: 'Total Package', amount: 90000 }],
    total: 90000,
  },
  'na-band': {
    label: 'Category D - Special Marshals (Includes Uniform)',
    fees: [{ item: 'Total Package (includes uniform)', amount: 150000 }],
    total: 150000,
  },
}

const states = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo',
  'Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa',
  'Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba',
  'Yobe','Zamfara',
]

const STEPS = ['Fee Schedule', 'Personal Details', 'Guarantor Form', 'Document Uploads', 'Review & Submit']

export default function Apply() {
  const { cadre } = useParams()
  const navigate = useNavigate()
  const cat = categories[cadre]
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const { register, handleSubmit, trigger, getValues, formState: { errors } } = useForm()

  if (!cat) return (
    <div className="text-center py-20">
      <p className="text-xl text-gray-500">Cadre not found.</p>
      <button onClick={() => navigate('/')} className="mt-4 text-green-700 underline">Go back home</button>
    </div>
  )

  const stepFields = {
    1: ['first_name','last_name','dob','gender','email','phone','state','lga','qualification','nin','passport'],
    2: ['pg_first_name','pg_last_name','pg_phone','pg_address','pg_occupation','g_first_name','g_last_name','g_phone','g_service_designation','g_service_number','g_rank'],
    3: ['ssce_result','birth_certificate','attestation_letter','payment_receipt'],
  }

  const next = async () => {
    if (stepFields[step]) { const ok = await trigger(stepFields[step]); if (!ok) return }
    setStep(s => Math.min(s + 1, STEPS.length - 1))
  }
  const prev = () => setStep(s => Math.max(s - 1, 0))

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      const formData = new FormData()
      const fileFields = ['passport','ssce_result','birth_certificate','attestation_letter','payment_receipt']
      Object.entries(data).forEach(([k, v]) => {
        if (fileFields.includes(k)) { if (v && v[0]) formData.append(k, v[0]) }
        else formData.append(k, v || '')
      })
      formData.append('cadre', cadre)
      await api.post('/api/applications', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      toast.success('Application submitted successfully!')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed.')
    } finally { setSubmitting(false) }
  }

  const fmt = (n) => String.fromCharCode(8358) + n.toLocaleString()

  return (
    <div className="max-w-3xl mx-auto px-4 py-10" style={serif}>
      <div className="text-center mb-6 pb-4 border-b-4" style={{ borderColor: '#228B22' }}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ifTzmBlalhC9fpDsNk_GXniJOTRm0RBcyw&s"
          alt="NCN" className="w-16 h-16 rounded-full object-cover mx-auto mb-2" />
        <p className="text-xs font-bold text-gray-500 tracking-widest">CAC/IT/NO:168087</p>
        <h1 className="text-2xl font-extrabold" style={{ color: '#228B22' }}>CADET NETWORK</h1>
        <h2 className="text-lg font-bold text-gray-800">LAGOS STATE HEADQUARTERS</h2>
        <p className="text-sm font-bold mt-1" style={{ color: '#cc0000' }}>{cat.label}</p>
      </div>

      {/* Stepper — mobile: show only current step; desktop: show all */}
      <div className="mb-8">
        {/* Mobile: compact current step indicator */}
        <div className="flex sm:hidden items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
            style={{ background: '#cc0000' }}>
            {step + 1}
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Step {step + 1} of {STEPS.length}</p>
            <p className="text-sm font-bold text-gray-800">{STEPS[step]}</p>
          </div>
          <div className="ml-auto flex gap-1">
            {STEPS.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full"
                style={{ background: i <= step ? '#228B22' : '#ddd' }} />
            ))}
          </div>
        </div>

        {/* Desktop: full stepper */}
        <div className="hidden sm:flex items-center justify-between gap-1 pb-2">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-1 shrink-0">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2"
                style={i < step ? { background:'#228B22',borderColor:'#228B22',color:'#fff' }
                  : i === step ? { background:'#cc0000',borderColor:'#cc0000',color:'#fff' }
                  : { background:'#fff',borderColor:'#ccc',color:'#aaa' }}>
                {i < step ? String.fromCharCode(10003) : i + 1}
              </div>
              <span className="text-xs font-semibold"
                style={{ color: i === step ? '#cc0000' : i < step ? '#228B22' : '#aaa' }}>{s}</span>
              {i < STEPS.length - 1 && (
                <div className="w-3 h-0.5 mx-1" style={{ background: i < step ? '#228B22' : '#ddd' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>

        {step === 0 && (
          <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 font-bold text-base text-white" style={{ background: '#228B22' }}>Fee Schedule</div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4 italic">Application Form fee must be paid FIRST before any other payment.</p>
              <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm border-collapse min-w-[320px]">
                <thead><tr style={{ background:'#f0f0f0' }}>
                  <th className="text-left px-4 py-2 border border-gray-200 font-bold">Item</th>
                  <th className="text-right px-4 py-2 border border-gray-200 font-bold">Amount</th>
                </tr></thead>
                <tbody>{cat.fees.map((f,i) => (
                  <tr key={i} style={{ background: i%2===0?'#fff':'#f9f9f9' }}>
                    <td className="px-4 py-2 border border-gray-200">{f.item}</td>
                    <td className="px-4 py-2 border border-gray-200 text-right">{fmt(f.amount)}</td>
                  </tr>
                ))}</tbody>
                <tfoot><tr style={{ background:'#228B22' }}>
                  <td className="px-4 py-2 font-extrabold text-white border border-green-700">TOTAL</td>
                  <td className="px-4 py-2 font-extrabold text-white text-right border border-green-700">{fmt(cat.total)}</td>
                </tr></tfoot>
              </table>
              </div>
              <div className="mt-4 p-3 rounded text-sm font-semibold" style={{ background:'#fff0f0',border:'1px solid #cc0000',color:'#7a0000' }}>
                Make payment to the designated account before proceeding. Upload your payment receipt in Step 4.
              </div>

              {/* Payment Account Details */}
              <div className="mt-6 rounded-xl overflow-hidden border border-gray-200">
                <div className="px-5 py-3 font-bold text-sm text-white" style={{ background: '#1B5E20' }}>
                  Payment Account Details
                </div>
                <div className="p-5 space-y-4 bg-white">
                  {/* Bank Name */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Bank Name</p>
                    <p className="text-sm font-semibold text-gray-800">MONIE POINT</p>
                  </div>
                  {/* Account Number */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Account Number</p>
                    <div className="flex items-center gap-3">
                      <p className="text-lg font-extrabold tracking-widest text-gray-900" id="acct-num">7073257587</p>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText('7073257587')
                          const btn = document.getElementById('copy-btn')
                          btn.textContent = 'Copied!'
                          setTimeout(() => { btn.textContent = 'Copy' }, 2000)
                        }}
                        id="copy-btn"
                        className="text-xs font-bold px-3 py-1 rounded border transition-colors"
                        style={{ borderColor: '#1B5E20', color: '#1B5E20' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#1B5E20'; e.currentTarget.style.color = '#fff' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1B5E20' }}
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  {/* Account Name */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Account Name</p>
                    <p className="text-sm font-semibold text-gray-800">OLUSEGUN DAVID</p>
                  </div>
                  {/* Narration note */}
                  <div className="flex items-start gap-2 pt-2 border-t border-gray-100">
                    <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="#1B5E20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                    </svg>
                    <p className="text-xs text-gray-600">
                      Use your <strong>full name</strong> as payment narration when making the transfer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 font-bold text-base text-white" style={{ background: '#228B22' }}>Personal Information</div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <F label="First Name *" err={errors.first_name}><input {...register('first_name',{required:'Required'})} className={inp(errors.first_name)} placeholder="First Name" /></F>
                <F label="Surname *" err={errors.last_name}><input {...register('last_name',{required:'Required'})} className={inp(errors.last_name)} placeholder="Surname" /></F>
                <F label="Other Names"><input {...register('middle_name')} className={inp()} placeholder="Other Names" /></F>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <F label="Date of Birth *" err={errors.dob}><input type="date" {...register('dob',{required:'Required'})} className={inp(errors.dob)} /></F>
                <F label="Gender *" err={errors.gender}><select {...register('gender',{required:'Required'})} className={inp(errors.gender)}><option value="">Select</option><option>Male</option><option>Female</option></select></F>
              </div>
              <F label="Email Address *" err={errors.email}><input type="email" {...register('email',{required:'Required'})} className={inp(errors.email)} placeholder="you@example.com" /></F>
              <F label="Phone Number *" err={errors.phone}><input {...register('phone',{required:'Required',pattern:{value:/^[0-9]{11}$/,message:'11-digit number'}})} className={inp(errors.phone)} placeholder="08012345678" /></F>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <F label="State of Origin *" err={errors.state}><select {...register('state',{required:'Required'})} className={inp(errors.state)}><option value="">Select state</option>{states.map(s=><option key={s}>{s}</option>)}</select></F>
                <F label="LGA of Origin *" err={errors.lga}><input {...register('lga',{required:'Required'})} className={inp(errors.lga)} placeholder="Local Government Area" /></F>
              </div>
              <F label="Highest Qualification *" err={errors.qualification}><select {...register('qualification',{required:'Required'})} className={inp(errors.qualification)}><option value="">Select</option><option>SSCE / WAEC / NECO</option><option>OND</option><option>HND</option><option>B.Sc / B.A / B.Eng</option><option>M.Sc / MBA</option><option>PhD</option></select></F>
              <F label="NIN (11 digits) *" err={errors.nin}><input {...register('nin',{required:'Required',pattern:{value:/^[0-9]{11}$/,message:'11-digit NIN required'}})} className={inp(errors.nin)} placeholder="12345678901" /></F>
              <F label="Passport Photograph *" err={errors.passport}>
                <input type="file" accept="image/*" {...register('passport',{required:'Required'})} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:font-bold file:bg-green-700 file:text-white hover:file:bg-green-800 cursor-pointer" />
                <p className="text-xs text-gray-400 mt-1">JPG/PNG, max 2MB, white background preferred</p>
              </F>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 font-bold text-base text-white" style={{ background: '#cc0000' }}>GUARANTOR FORM FOR MEMBERS</div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-extrabold text-sm uppercase tracking-wide border-b pb-1 mb-4" style={{ color:'#228B22',borderColor:'#228B22' }}>A. Parent / Guardian Consent Form</h3>
                <p className="text-xs italic text-gray-500 mb-4">To be completed by the Parent / Guardian of the Applicant</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <F label="First Name *" err={errors.pg_first_name}><input {...register('pg_first_name',{required:'Required'})} className={inp(errors.pg_first_name)} placeholder="First Name" /></F>
                  <F label="Surname *" err={errors.pg_last_name}><input {...register('pg_last_name',{required:'Required'})} className={inp(errors.pg_last_name)} placeholder="Surname" /></F>
                  <F label="Other Names"><input {...register('pg_other_names')} className={inp()} placeholder="Other Names" /></F>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <F label="Phone Number *" err={errors.pg_phone}><input {...register('pg_phone',{required:'Required'})} className={inp(errors.pg_phone)} placeholder="08012345678" /></F>
                  <F label="Email"><input type="email" {...register('pg_email')} className={inp()} placeholder="parent@email.com" /></F>
                </div>
                <div className="mt-4"><F label="Residential Address *" err={errors.pg_address}><input {...register('pg_address',{required:'Required'})} className={inp(errors.pg_address)} placeholder="Full residential address" /></F></div>
                <div className="mt-4"><F label="Occupation *" err={errors.pg_occupation}><input {...register('pg_occupation',{required:'Required'})} className={inp(errors.pg_occupation)} placeholder="Occupation" /></F></div>
                <div className="mt-4 p-3 rounded text-xs italic text-gray-600" style={{ background:'#f9f9f9',border:'1px solid #ddd' }}>
                  I Mr / Mrs / Chief _________________, Parent / Guardian of the above-named applicant, hereby certify that I fully understand that my child / ward is an aspiring member of the Cadet Network, and has my approval and full consent.
                </div>
              </div>
              <div>
                <h3 className="font-extrabold text-sm uppercase tracking-wide border-b pb-1 mb-4" style={{ color:'#cc0000',borderColor:'#cc0000' }}>B. Guarantor Details</h3>
                <p className="text-xs italic text-gray-500 mb-4">Must be a Military Officer not below Second Lieutenant / Assistant Superintendent in any Security Agency (NSCDC, Customs, Immigration, Fire Service, Correctional Service) or Senior Civil Servant Grade Level 12 and above.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <F label="First Name *" err={errors.g_first_name}><input {...register('g_first_name',{required:'Required'})} className={inp(errors.g_first_name)} placeholder="First Name" /></F>
                  <F label="Surname *" err={errors.g_last_name}><input {...register('g_last_name',{required:'Required'})} className={inp(errors.g_last_name)} placeholder="Surname" /></F>
                  <F label="Other Names"><input {...register('g_other_names')} className={inp()} placeholder="Other Names" /></F>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <F label="Phone Number *" err={errors.g_phone}><input {...register('g_phone',{required:'Required'})} className={inp(errors.g_phone)} placeholder="08012345678" /></F>
                  <F label="Email"><input type="email" {...register('g_email')} className={inp()} placeholder="guarantor@email.com" /></F>
                </div>
                <div className="mt-4"><F label="Service Designation *" err={errors.g_service_designation}><input {...register('g_service_designation',{required:'Required'})} className={inp(errors.g_service_designation)} placeholder="e.g. Nigerian Army / NSCDC / Civil Service" /></F></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <F label="Service Number *" err={errors.g_service_number}><input {...register('g_service_number',{required:'Required'})} className={inp(errors.g_service_number)} placeholder="Service / Staff Number" /></F>
                  <F label="Rank / Grade Level *" err={errors.g_rank}><input {...register('g_rank',{required:'Required'})} className={inp(errors.g_rank)} placeholder="e.g. Lieutenant / GL 12" /></F>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 font-bold text-base text-white" style={{ background: '#228B22' }}>Document Uploads</div>
            <div className="p-6 space-y-5">
              <p className="text-sm italic text-gray-500">Upload clear scanned copies or photos. PDF, JPG or PNG. Max 5MB each.</p>
              {[
                { key:'ssce_result', label:'1. SSCE Result (WAEC / NECO)' },
                { key:'birth_certificate', label:'2. Birth Certificate or Age Declaration' },
                { key:'attestation_letter', label:'3. Attestation Letter of Good Conduct (Lawyer, Church or Mosque)' },
                { key:'payment_receipt', label:'4. Receipt of Payment' },
              ].map(doc => (
                <div key={doc.key} className="rounded-lg p-4" style={{ background:'#f8fdf8',border:'1px solid #228B2240' }}>
                  <label className="block text-sm font-bold mb-2 text-gray-800">{doc.label} <span style={{ color:'#cc0000' }}>*</span></label>
                  <input type="file" accept=".pdf,image/*" {...register(doc.key,{required:'This document is required'})}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:font-bold file:bg-green-700 file:text-white hover:file:bg-green-800 cursor-pointer" />
                  {errors[doc.key] && <p className="text-red-500 text-xs mt-1">{errors[doc.key].message}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 font-bold text-base text-white" style={{ background: '#cc0000' }}>Review & Submit</div>
            <div className="p-6 space-y-3 text-sm">
              {[
                ['Full Name', (getValues('first_name')||'') + ' ' + (getValues('last_name')||'')],
                ['Email', getValues('email')],
                ['Phone', getValues('phone')],
                ['State / LGA', (getValues('state')||'') + ' / ' + (getValues('lga')||'')],
                ['NIN', getValues('nin')],
                ['Qualification', getValues('qualification')],
                ['Parent/Guardian', (getValues('pg_first_name')||'') + ' ' + (getValues('pg_last_name')||'')],
                ['Guarantor', (getValues('g_first_name')||'') + ' ' + (getValues('g_last_name')||'') + ' - ' + (getValues('g_rank')||'')],
                ['Cadre', cat.label],
                ['Total Fee', fmt(cat.total)],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between border-b pb-2 border-gray-100">
                  <span className="font-bold text-gray-600">{label}</span>
                  <span className="text-gray-800 text-right">{val}</span>
                </div>
              ))}
              <div className="mt-4 p-3 rounded text-xs font-semibold" style={{ background:'#fff0f0',border:'1px solid #cc0000',color:'#7a0000' }}>
                By submitting, you confirm all information is accurate. False information leads to immediate disqualification and prosecution.
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between gap-3">
            {/* Previous — hidden on step 0 */}
            {step > 0 ? (
              <button type="button" onClick={prev}
                className="px-6 py-2.5 rounded-lg font-bold text-sm border-2 transition-colors hover:bg-green-50"
                style={{ borderColor: '#1B5E20', color: '#1B5E20', background: '#fff' }}>
                Previous
              </button>
            ) : (
              <div />
            )}

            {/* Next / Submit */}
            {step < STEPS.length - 1 ? (
              <button type="button" onClick={next}
                className="px-8 py-2.5 rounded-lg font-bold text-sm text-white transition-colors hover:opacity-90"
                style={{ background: '#1B5E20' }}>
                Next
              </button>
            ) : (
              <button type="submit" disabled={submitting}
                className="px-8 py-2.5 rounded-lg font-bold text-sm text-white disabled:opacity-60 transition-colors hover:opacity-90"
                style={{ background: '#B71C1C' }}>
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>

          {/* Save & Continue Later */}
          <div className="text-center">
            <button type="button"
              onClick={() => { toast('Progress is saved in your browser.', { icon: '💾' }) }}
              className="text-xs font-medium text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors">
              Save & Continue Later
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

function F({ label, err, children }) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1" style={{ fontFamily:"'Times New Roman', Times, serif" }}>{label}</label>
      {children}
      {err && <p className="text-red-500 text-xs mt-1">{err.message}</p>}
    </div>
  )
}

function inp(err) {
  return 'w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 ' + (err ? 'border-red-400' : 'border-gray-300')
}