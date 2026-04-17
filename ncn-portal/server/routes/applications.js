import { Router } from 'express'
import multer from 'multer'
import supabase from '../lib/supabase.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 2 * 1024 * 1024 } })

// POST /api/applications  — public, submit application
router.post('/', upload.single('passport'), async (req, res) => {
  const {
    first_name, last_name, middle_name, dob, gender,
    email, phone, state, lga, qualification, nin, cadre
  } = req.body

  if (!first_name || !last_name || !email || !nin || !cadre) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  // Upload passport to Supabase Storage
  let passport_url = null
  if (req.file) {
    const filename = `${Date.now()}-${nin}.${req.file.mimetype.split('/')[1]}`
    const { error: uploadError } = await supabase.storage
      .from('passports')
      .upload(filename, req.file.buffer, { contentType: req.file.mimetype })

    if (!uploadError) {
      const { data } = supabase.storage.from('passports').getPublicUrl(filename)
      passport_url = data.publicUrl
    }
  }

  const { data, error } = await supabase
    .from('applications')
    .insert({
      first_name, last_name, middle_name, dob, gender,
      email, phone, state, lga, qualification, nin, cadre,
      passport_url, status: 'pending'
    })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') return res.status(409).json({ message: 'An application with this NIN already exists.' })
    return res.status(500).json({ message: error.message })
  }

  res.status(201).json({ message: 'Application submitted', id: data.id })
})

// GET /api/applications  — admin only
router.get('/', requireAuth, async (req, res) => {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return res.status(500).json({ message: error.message })
  res.json(data)
})

// GET /api/applications/shortlisted/rci  — public shortlist
router.get('/shortlisted/rci', async (req, res) => {
  const { data, error } = await supabase
    .from('applications')
    .select('id, first_name, middle_name, last_name, state, lga, nin')
    .eq('cadre', 'rri')
    .eq('status', 'shortlisted')
    .order('last_name')

  if (error) return res.status(500).json({ message: error.message })
  res.json(data)
})

// PATCH /api/applications/:id/status  — admin only
router.patch('/:id/status', requireAuth, async (req, res) => {
  const { status } = req.body
  const allowed = ['pending', 'shortlisted', 'rejected']
  if (!allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' })

  const { data, error } = await supabase
    .from('applications')
    .update({ status })
    .eq('id', req.params.id)
    .select()
    .single()

  if (error) return res.status(500).json({ message: error.message })
  res.json(data)
})

export default router
