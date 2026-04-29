import { Link } from 'react-router-dom'
import { ClipboardList, FolderOpen, Calendar, FileText, CreditCard, IdCard, ChevronDown } from 'lucide-react'

const G = '#1B5E20'
const R = '#B71C1C'
const fmt = (n) => '\u20A6' + n.toLocaleString()

const categories = [
  {
    slug: 'rci',
    badge: 'Category A',
    title: 'Regular Intake',
    description: 'Open to all eligible Nigerian citizens',
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
    note: null,
    route: '/apply/rci',
  },
  {
    slug: 'ssc-dssc',
    badge: 'Category B',
    title: 'Graduate / Cadre',
    description: 'For HND, BSc, and Postgraduate holders',
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
    note: null,
    route: '/apply/ssc-dssc',
  },
  {
    slug: 'nda',
    badge: 'Category C',
    title: 'Marshals',
    description: 'For senior-level applicants',
    fees: [],
    total: 90000,
    note: 'Detailed fee breakdown available upon inquiry',
    route: '/apply/coming-soon',
  },
  {
    slug: 'na-band',
    badge: 'Category D',
    title: 'Special Marshals',
    description: 'Includes full uniform package',
    fees: [],
    total: 150000,
    note: 'Detailed fee breakdown available upon inquiry',
    route: '/apply/coming-soon',
  },
]

export default function SelectCategory() {
  return (
    <div className="min-h-screen" style={{ background: '#F5F5F5' }}>
      {/* Page header */}
      <div className="bg-white border-b border-gray-200 px-4 py-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: G }}>
          Nigerian Cadet Network — Lagos State Command
        </p>
        <h1 className="font-bold text-gray-900 mb-2" style={{ fontSize: '1.75rem' }}>
          Select Your Application Category
        </h1>
        <p className="text-gray-500 text-sm max-w-xl mx-auto">
          Choose the category that matches your qualification and eligibility. Review the fee schedule before proceeding.
        </p>
      </div>

      {/* Required Documentation */}
      <div className="max-w-5xl mx-auto px-4 pt-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
            <ClipboardList size={22} color={G} strokeWidth={2} />
            <div>
              <h2 className="font-bold text-gray-900" style={{ fontSize: '1.1rem' }}>Required Documentation</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Ensure all documents are ready before starting your application. Missing items will lead to disqualification.
              </p>
            </div>
          </div>

          {/* Document rows */}
          {[
            { Icon: FolderOpen,  title: 'Educational Credentials',      detail: 'SSCE / ND / HND / B.Sc certificate(s)' },
            { Icon: Calendar,    title: 'Proof of Age',                  detail: 'Valid Birth Certificate or Age Declaration' },
            { Icon: FileText,    title: 'Character Reference',           detail: 'Attestation letter from a Lawyer, Church, or Mosque' },
            { Icon: CreditCard,  title: 'Financial Verification',        detail: 'Original Receipt of Payment' },
            { Icon: IdCard,      title: 'Identity (Mandatory)',           detail: 'NIN Slip — no exceptions' },
          ].map(({ Icon, title, detail }, i) => (
            <div key={i}
              className="flex items-center gap-4 px-6 py-4 border-b border-gray-100 last:border-0"
              style={{ background: i % 2 === 0 ? '#ffffff' : '#F9F9F9' }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: '#DCFCE7' }}>
                <Icon size={18} color={G} strokeWidth={2} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA prompt */}
        <div className="mt-4 mb-2 flex flex-col items-center gap-2 rounded-lg px-6 py-4 border border-red-200 bg-red-50">
          <p className="text-sm font-semibold text-red-800">
            Ready to apply? Select your category below.
          </p>
          <ChevronDown size={20} className="text-red-600 animate-bounce" />
        </div>
      </div>

      {/* Cards grid */}
      <div className="max-w-5xl mx-auto px-4 pt-6 pb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden"
          >
            {/* Card header */}
            <div className="px-6 pt-6 pb-4">
              <span className="inline-block text-sm font-semibold rounded-full px-3 py-1 mb-3"
                style={{ background: '#DCFCE7', color: G }}>
                {cat.badge}
              </span>
              <h2 className="font-bold text-gray-900 mb-1" style={{ fontSize: '1.25rem' }}>
                {cat.title}
              </h2>
              <p className="text-sm text-gray-500">{cat.description}</p>
            </div>

            {/* Fee table */}
            <div className="px-6 pb-2 flex-1">
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-2 font-semibold text-gray-600">Item</th>
                      <th className="text-right px-4 py-2 font-semibold text-gray-600">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.fees.map((f, i) => (
                      <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="px-4 py-2 text-gray-700">{f.item}</td>
                        <td className="px-4 py-2 text-right text-gray-700">{fmt(f.amount)}</td>
                      </tr>
                    ))}
                    {cat.note && (
                      <tr className="border-b border-gray-100 bg-white">
                        <td colSpan={2} className="px-4 py-3 text-xs italic text-gray-400 text-center">
                          {cat.note}
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr style={{ background: G }}>
                      <td className="px-4 py-2.5 font-bold text-white text-sm">TOTAL</td>
                      <td className="px-4 py-2.5 font-bold text-white text-right text-sm">{fmt(cat.total)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* CTA */}
            <div className="px-6 py-5">
              <Link
                to={cat.route}
                className="block w-full text-center text-white font-bold py-3 rounded-lg transition-colors hover:opacity-90 text-sm"
                style={{ background: R }}>
                Apply — {cat.badge}
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
