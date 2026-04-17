import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function ShortlistedRCI() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get('/api/applications/shortlisted/rci')
      .then(res => setList(res.data))
      .catch(() => setList([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = list.filter(a =>
    `${a.first_name} ${a.last_name} ${a.nin} ${a.state}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-army-green text-white rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold">Supplementary Shortlisted RCI Candidates</h1>
        <p className="text-green-200 text-sm mt-1">Check if your name appears on the shortlist below.</p>
      </div>

      <input
        type="text"
        placeholder="Search by name, NIN or state..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-6 text-sm focus:outline-none focus:ring-2 focus:ring-army-green"
      />

      {loading ? (
        <p className="text-center text-gray-400 py-10">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-10">No shortlisted candidates found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-army-dark text-white">
              <tr>
                {['S/N','Full Name','State','LGA','NIN'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((a, i) => (
                <tr key={a.id} className="hover:bg-green-50">
                  <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                  <td className="px-4 py-3 font-medium">{a.first_name} {a.middle_name} {a.last_name}</td>
                  <td className="px-4 py-3">{a.state}</td>
                  <td className="px-4 py-3">{a.lga}</td>
                  <td className="px-4 py-3 font-mono text-xs">{a.nin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
