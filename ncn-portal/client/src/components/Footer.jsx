import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(180deg, #1a4a1a 0%, #0f2e0f 100%)' }} className="text-gray-300">
      {/* Warning box */}
      <div className="border-t-6 px-7 py-5" style={{ background: '#049b11ff', borderColor: '#8B0000' }}>
        <p className="text-center text-sm text-white max-w-5xl mx-auto">
          ⚠️ <span className="font-bold">ATTENTION:</span> All submitted documents will be verified.
          Possession of fake or forged documents will lead to <span className="font-bold underline">immediate prosecution</span> under Nigerian law.
        </p>
      </div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ifTzmBlalhC9fpDsNk_GXniJOTRm0RBcyw&s"
              alt="NCN Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-bold text-white">Nigerian Cadet Network</span>
          </div>
          <p className="text-xs text-white-500 leading-relaxed">
            Official online application portal for the Nigerian Cadet Network.
            Serving the nation through discipline, leadership, and excellence.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-white mb-3 text-sm">Lagos State Command HQ</h3>
          <ul className="text-xs text-white-400 space-y-2">
            <li>📍 Cadet Base 1, Eko Immaculate International School, Lagos</li>
            <li>📩 <a href="cadetnetworklhq@gmail.com" className="hover:text-white transition-colors">support@ncnlagos.gov.ng</a></li>
            <li>📞 07055979130, 08168664170, 09093404489 </li>
            <li>🕐 Mon – Fri: 8:00 AM – 4:00 PM</li>
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-bold text-white mb-3 text-sm">Quick Links</h3>
          <ul className="text-xs text-gray-400 space-y-2">
            <li><Link to="/apply/rri" className="hover:text-white transition-colors">→ Apply — Student Cadre (RRI)</Link></li>
            <li><Link to="/apply/ssc-dssc" className="hover:text-white transition-colors">→ Apply — Graduate Entry</Link></li>
            <li><Link to="/apply/nda" className="hover:text-white transition-colors">→ Apply — Professional Cadre</Link></li>
            <li><Link to="/apply/na-band" className="hover:text-white transition-colors">→ Join the Patronate</Link></li>
            <li><Link to="/shortlisted-rci" className="hover:text-white transition-colors">→ Shortlisted Candidates (RCI)</Link></li>
            <li><Link to="/login" className="hover:text-white transition-colors">→ Admin Login</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ borderColor: '#2d6e2d', color: '#a0c8a0' }}>
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
              <circle cx="17.5" cy="6.5" r="1" />
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="hover:text-white transition-colors font-bold">𝕏</a>
        </div>
      </div>
    </footer>
  )
}
