import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../lib/api'

export default function Login() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/api/auth/login', data)
      localStorage.setItem('ncn_token', res.data.token)
      toast.success('Login successful')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials')
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Header */}
        <div className="p-6 text-center text-white" style={{ background: '#1B5E20' }}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ifTzmBlalhC9fpDsNk_GXniJOTRm0RBcyw&s"
            alt="Nigerian Cadet Network Logo"
            className="w-14 h-14 rounded-full object-cover mx-auto mb-3 border-2 border-white/30"
          />
          <h1 className="font-bold text-white" style={{ fontSize: '1.25rem' }}>Admin Login</h1>
          <p className="text-green-200 text-sm mt-1">Nigerian Cadet Network Portal</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input type="email"
              {...register('email', { required: 'Email is required' })}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
              style={{ '--tw-ring-color': '#1B5E20' }}
              placeholder="you@example.com" />
            {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input type="password"
              {...register('password', { required: 'Password is required' })}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
              placeholder="••••••••" />
            {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting}
            className="w-full text-white font-bold py-2.5 rounded-lg transition-colors hover:opacity-90 disabled:opacity-60"
            style={{ background: '#B71C1C' }}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-center text-sm text-gray-500">
            Want to apply?{' '}
            <Link to="/apply" className="font-semibold hover:underline" style={{ color: '#1B5E20' }}>
              Start your application
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
