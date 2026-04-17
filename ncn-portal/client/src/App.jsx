import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Apply from './pages/Apply'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ShortlistedRCI from './pages/ShortlistedRCI'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply/:cadre" element={<Apply />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shortlisted-rci" element={<ShortlistedRCI />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
