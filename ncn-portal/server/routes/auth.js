import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import supabase from '../lib/supabase.js'

const router = Router()

// POST /api/auth/register  (admin setup)
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' })

  const hash = await bcrypt.hash(password, 10)
  const { data, error } = await supabase
    .from('admins')
    .insert({ email, password_hash: hash, name })
    .select()
    .single()

  if (error) return res.status(400).json({ message: error.message })
  res.status(201).json({ message: 'Admin created', id: data.id })
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' })

  const { data: admin, error } = await supabase
    .from('admins')
    .select('*')
    .eq('email', email)
    .single()

  if (error || !admin) return res.status(401).json({ message: 'Invalid credentials' })

  const valid = await bcrypt.compare(password, admin.password_hash)
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' })

  const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '8h' })
  res.json({ token, name: admin.name })
})

export default router
