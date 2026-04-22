import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'
import toast from 'react-hot-toast'

const statusStyle = {
  pending:     'bg-yellow-100 text-yellow-800',
  shortlisted: 'bg-green-100 text-green-800',
  rejected:    'bg-red-100 text-red-800',
}

export default function Dashboard() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const token = localStorage.getItem('ncn_token')

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    api.get('/api/applications', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setApplications(res.data))
      .catch(() => { toast.error('Session expired'); navigate('/login') })
      .finally(() => setLoading(false))
  }, [])

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/api/applications/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a))
      toast.success('Status updated')
    } catch {
      toast.error('Failed to update status')
    }
  }

  if (loading) return <div className="text-center py-20 text-gray-400">Loading applications...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold text-gray-900" style={{ fontSize: '1.75rem', color: '#1A1A1A' }}>
          Applications Dashboard
        </h1>
        <span className="text-sm text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full">
          {applications.length} total
        </span>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No applications found.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow bg-white">
          <table className="min-w-full text-sm">
            <thead style={{ background: '#1B5E20' }} className="text-white">
              <tr>
                {['Name', 'Cadre', 'State', 'Email', 'Phone', 'NIN', 'Status', 'Action'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.map(app => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{app.first_name} {app.last_name}</td>
                  <td className="px-4 py-3 text-xs font-semibold uppercase text-gray-600">{app.cadre}</td>
                  <td className="px-4 py-3 text-gray-700">{app.state}</td>
                  <td className="px-4 py-3 text-gray-700">{app.email}</td>
                  <td className="px-4 py-3 text-gray-700">{app.phone}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{app.nin}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyle[app.status] || 'bg-gray-100 text-gray-600'}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={app.status}
                      onChange={e => updateStatus(app.id, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 text-gray-700"
                    >
                      <option value="pending">Pending</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
