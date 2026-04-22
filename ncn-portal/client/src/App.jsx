import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Apply from './pages/Apply'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ShortlistedRCI from './pages/ShortlistedRCI'
import SelectCategory from './pages/SelectCategory'
import ComingSoon from './pages/ComingSoon'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<SelectCategory />} />
          <Route path="/apply/coming-soon" element={<ComingSoon />} />
          <Route path="/apply/:cadre" element={<Apply />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shortlisted-rci" element={<ShortlistedRCI />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
