import { Link } from 'react-router-dom'

const G = '#1B5E20'
const R = '#B71C1C'

export default function ComingSoon() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4" style={{ background: '#F5F5F5' }}>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm max-w-md w-full p-10 text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: '#DCFCE7' }}>
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>

        <span className="inline-block text-xs font-semibold rounded-full px-3 py-1 mb-4"
          style={{ background: '#DCFCE7', color: G }}>
          Coming Soon
        </span>

        <h1 className="font-bold text-gray-900 mb-3" style={{ fontSize: '1.5rem' }}>
          Applications Opening Soon
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          This application category is not yet open. Please check back later or contact the Lagos State Command HQ for more information.
        </p>

        <div className="space-y-3">
          <Link to="/apply"
            className="block w-full text-center text-white font-bold py-3 rounded-lg transition-colors hover:opacity-90 text-sm"
            style={{ background: G }}>
            Back to Categories
          </Link>
          <Link to="/"
            className="block w-full text-center font-semibold py-3 rounded-lg border-2 text-sm transition-colors hover:bg-gray-50"
            style={{ borderColor: G, color: G }}>
            Return to Homepage
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          For enquiries: <a href="mailto:cadetnetworklhq@gmail.com"
            className="underline hover:text-gray-600">cadetnetworklhq@gmail.com</a>
        </p>
      </div>
    </div>
  )
}
