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
      {/* Top Nav */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ifTzmBlalhC9fpDsNk_GXniJOTRm0RBcyw&s"
              alt="Nigerian Cadet Network Logo"
              className="w-11 h-11 rounded-full object-cover border-2"
              style={{ borderColor: '#1B5E20' }}
            />
            <div className="hidden sm:block">
              <p className="font-extrabold text-lg leading-tight" style={{ color: '#1B5E20' }}>
                Nigerian Cadet Network
              </p>
              <p className="text-xs font-medium text-gray-500 tracking-wide">Lagos State Command</p>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link to="/shortlisted-rci" className="text-gray-700 hover:text-gray-900 transition-colors">
              Shortlisted Candidates
            </Link>
            {token ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 transition-colors">Dashboard</Link>
                <button onClick={handleLogout}
                  className="px-4 py-1.5 rounded-md text-white font-bold text-sm transition-colors hover:opacity-90"
                  style={{ background: '#B71C1C' }}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login"
                className="px-4 py-1.5 rounded-md text-white font-bold text-sm transition-colors hover:opacity-90"
                style={{ background: '#B71C1C' }}>
                Login
              </Link>
            )}
          </div>

          {/* Mobile: Login always visible + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {token ? (
              <button onClick={handleLogout}
                className="px-3 py-1.5 rounded-md text-white font-bold text-xs"
                style={{ background: '#B71C1C' }}>
                Logout
              </button>
            ) : (
              <Link to="/login"
                className="px-3 py-1.5 rounded-md text-white font-bold text-xs"
                style={{ background: '#B71C1C' }}>
                Login
              </Link>
            )}
            <button className="text-gray-700 p-1" onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 flex flex-col gap-3 text-sm font-semibold">
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 pt-3">Home</Link>
            <Link to="/shortlisted-rci" onClick={() => setMenuOpen(false)} className="text-gray-700">Shortlisted Candidates</Link>
            {token ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="text-gray-700">Dashboard</Link>
                <button onClick={handleLogout} className="text-left font-bold" style={{ color: '#B71C1C' }}>Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="font-bold" style={{ color: '#B71C1C' }}>Login</Link>
            )}
          </div>
        )}
      </nav>

      {/* Announcement Ticker */}
      <div className="overflow-hidden relative flex items-center text-white text-sm"
        style={{ background: '#B71C1C' }}>
        <span className="flex items-center gap-1.5 font-extrabold px-3 py-2 text-xs shrink-0 z-10 bg-black text-white uppercase tracking-widest">
          <span className="inline-block w-2 h-2 rounded-full bg-red-400 animate-pulse shrink-0" />
          LIVE
        </span>
        <div className="overflow-hidden flex-1">
          <p
            onMouseEnter={() => setTickerPaused(true)}
            onMouseLeave={() => setTickerPaused(false)}
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              paddingTop: '8px',
              paddingBottom: '8px',
              fontWeight: 600,
              animation: tickerPaused ? 'none' : 'ticker 40s linear infinite',
            }}
          >
            15th Regular Intake (Batch A & B) Recruitment Ongoing — Lagos State Command Screening & Examination: April 22nd, 2026 at 0600 Hours &nbsp;|&nbsp; Venue: Cadet Base 1 (Eko Immaculate International School) &nbsp;|&nbsp; Late arrival = automatic disqualification &nbsp;|&nbsp; 15th Regular Intake (Batch A & B) Recruitment Ongoing
          </p>
        </div>
        <Link to="/apply"
          className="bg-black hover:bg-gray-900 text-white font-extrabold text-xs px-4 py-2 shrink-0 whitespace-nowrap uppercase tracking-wide transition-colors">
          Apply Now
        </Link>
      </div>
    </>
  )
}
