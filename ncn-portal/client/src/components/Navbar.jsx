import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [tickerPaused, setTickerPaused] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('ncn_token')

  const handleLogout = () => {
    localStorage.removeItem('ncn_token')
    navigate('/')
  }

  return (
    <>
      {/* Top nav */}
      <nav style={{ background: 'linear-gradient(90deg, #fafcf7ff 0%, #f8f3f3ff 50%, #ffffffff 100%)' }} className="text-green shadow-md">
        <div className="max-w-15xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ifTzmBlalhC9fpDsNk_GXniJOTRm0RBcyw&s"
              alt="Nigerian Cadet Network Logo"
              className="w-17 h-12 rounded-full object-cover"
            />
            <span className="font-bold text-5xl hidden sm:block tracking-wide" style={{ color: '#228B22' }}>Nigerian Cadet Network</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-yellow-300 flex items-center gap-1">🏠 Home</Link>
            <Link to="/shortlisted-rci" className="hover:text-yellow-300 flex items-center gap-1">📋 Shortlisted RCI</Link>
            {token ? (
              <>
                <Link to="/dashboard" className="hover:text-black-300">Dashboard</Link>
                <button onClick={handleLogout} className="bg-red-700 hover:bg-red-800 px-4 py-1.5 rounded text-white font-bold">Logout</button>
              </>
            ) : (
              <Link to="/login" className="bg-red-700 hover:bg-red-800 px-4 py-1.5 rounded flex items-center gap-1 font-bold">🔒 Login</Link>
            )}
          </div>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm" style={{ background: '#1a4a1a' }}>
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300">🏠 Home</Link>
            <Link to="/shortlisted-rci" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300">📋 Shortlisted RCI</Link>
            {token ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300">Dashboard</Link>
                <button onClick={handleLogout} className="text-left text-red-400">Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300">🔒 Login</Link>
            )}
          </div>
        )}
      </nav>

      {/* Breaking news ticker */}
      <div className="text-white text- overflow-hidden relative flex items-center" style={{ background: '#cc0000' }}>
        {/* LIVE badge */}
        <span className="bg-black flex items-center gap-1.5 font-extrabold px-3 py-2 text-xs shrink-0 z-10 text-white">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0"></span>
          LIVE
        </span>
        {/* Scrolling text */}
        <div className="overflow-hidden flex-1">
          <p
            onMouseEnter={() => setTickerPaused(true)}
            onMouseLeave={() => setTickerPaused(false)}
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              paddingTop: '8px',
              paddingBottom: '8px',
              animation: tickerPaused
                ? 'none'
                : 'ticker 40s linear infinite',
            }}
          >
            🚨 15th Regular Intake (Batch A &amp; B) Recruitment Ongoing — Lagos State Command Screening &amp; Examination: April 22nd, 2026 at 0600 Hours &nbsp;|&nbsp; Venue: Cadet Base 1 (Eko Immaculate International School) &nbsp;|&nbsp; Late arrival = automatic disqualification &nbsp;|&nbsp; 🚨 15th Regular Intake (Batch A &amp; B) Recruitment Ongoing
          </p>
        </div>
        {/* Apply Now button */}
        <Link to="/apply/rri" className="bg-black hover:bg-gray-900 text-white font-extrabold text-md px-4 py-2 shrink-0 whitespace-nowrap">
          Apply Now →
        </Link>
      </div>
    </>
  )
}
