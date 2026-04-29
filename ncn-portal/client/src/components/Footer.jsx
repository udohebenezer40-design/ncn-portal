import { Link } from 'react-router-dom'
import { AlertTriangle, ShieldCheck } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#1B5E20' }} className="text-white">
      {/* Warning banner */}
      <div className="w-full py-3 px-6 flex items-start gap-3"
        style={{ background: '#1B5E20', borderLeft: '4px solid #B71C1C' }}>
        <AlertTriangle className="shrink-0 mt-0.5" size={18} color="#FFFFFF" strokeWidth={2} />
        <p className="text-sm text-white">
          <strong className="font-bold">Attention:</strong>{' '}
          All submitted documents will be verified. Possession of fake or forged documents will lead to{' '}
          <span className="underline font-medium" style={{ color: '#F9A825' }}>immediate prosecution</span>{' '}
          under Nigerian law.
        </p>
      </div>

      {/* Legal Disclaimer */}
      <div className="py-6 px-6 border-t-2 text-center" style={{ background: '#0D2110', borderColor: '#B71C1C' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <ShieldCheck size={16} color="#1B5E20" strokeWidth={2} />
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide">
              Legal Notice & Public Safety Disclaimer
            </h3>
          </div>
          <p className="text-xs leading-relaxed text-gray-400">
            The Nigerian Cadet Network (NCN) is a privately registered civic organization (CAC/IT/NO:168087) operating under Nigerian law.
            NCN is <strong className="text-gray-300">NOT</strong> a unit, branch, affiliate, or extension of the Nigerian Armed Forces, Nigerian Police Force,
            Department of State Services (DSS), or any federal or state government security agency.
          </p>
          <p className="text-xs leading-relaxed text-gray-400 mt-2">
            Membership, training, and cadet activities conducted by NCN are purely civic and voluntary in nature.
            NCN does not guarantee employment, military commission, or government placement of any kind.
          </p>
          <p className="text-xs leading-relaxed text-gray-400 mt-2">
            Members of the public are advised to exercise due diligence. The Economic and Financial Crimes Commission (EFCC) and relevant
            authorities have been duly notified of our operations. Any individual or group falsely claiming to represent NCN for fraudulent
            purposes will be prosecuted to the full extent of the law.
          </p>
          <p className="text-xs text-gray-500 mt-3">
            For verification, contact:{' '}
            <a href="mailto:support@ncnlagos.gov.ng" className="text-gray-400 hover:text-white underline transition-colors">
              support@ncnlagos.gov.ng
            </a>
          </p>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ifTzmBlalhC9fpDsNk_GXniJOTRm0RBcyw&s"
              alt="NCN Logo"
              className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
            />
            <span className="font-extrabold text-white text-base">Nigerian Cadet Network</span>
          </div>
          <p className="text-xs text-green-200 leading-relaxed">
            Official online application portal for the Nigerian Cadet Network.
            Serving the nation through discipline, leadership, and excellence.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">Lagos State Command HQ</h3>
          <ul className="text-xs text-green-200 space-y-2">
            <li>Cadet Base 1, Eko Immaculate International School, Lagos</li>
            <li>
              <a href="mailto:cadetnetworklhq@gmail.com" className="hover:text-white transition-colors">
                cadetnetworklhq@gmail.com
              </a>
            </li>
            <li>07055979130 · 08168664170 · 09093404489</li>
            <li>Mon – Fri: 8:00 AM – 4:00 PM</li>
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">Quick Links</h3>
          <ul className="text-xs text-green-200 space-y-2">
            <li><Link to="/apply" className="hover:text-white transition-colors">→ Apply — Category A (Regular)</Link></li>
            <li><Link to="/apply" className="hover:text-white transition-colors">→ Apply — Category B (Graduate/Cadre)</Link></li>
            <li><Link to="/apply" className="hover:text-white transition-colors">→ Apply — Category C (Marshals)</Link></li>
            <li><Link to="/apply" className="hover:text-white transition-colors">→ Apply — Category D (Special Marshals)</Link></li>
            <li><Link to="/shortlisted-rci" className="hover:text-white transition-colors">→ Shortlisted Candidates</Link></li>
            <li><Link to="/login" className="hover:text-white transition-colors">→ Admin Login</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-green-300"
        style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
        <p>© {new Date().getFullYear()} Nigerian Cadet Network. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="17.5" cy="6.5" r="1"/>
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="hover:text-white transition-colors font-bold">X</a>
        </div>
      </div>
    </footer>
  )
}
