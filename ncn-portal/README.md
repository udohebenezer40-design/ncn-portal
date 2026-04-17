# Nigerian Cadet Network — Application Portal

## Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: Supabase (PostgreSQL + Storage)

---

## Setup

### 1. Install Node.js
Download from https://nodejs.org (LTS version recommended)

### 2. Supabase
1. Create a project at https://supabase.com
2. Run `supabase/schema.sql` in the SQL editor
3. Create a storage bucket named `passports` (set to public)
4. Copy your Project URL and service role key

### 3. Backend
```bash
cd ncn-portal/server
cp .env.example .env
# Fill in SUPABASE_URL, SUPABASE_SERVICE_KEY, JWT_SECRET
npm install
npm run dev
```

### 4. Frontend
```bash
cd ncn-portal/client
npm install
npm run dev
```

Open http://localhost:5173

---

## Create First Admin
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ncn.gov.ng","password":"SecurePass123","name":"Admin"}'
```

Then login at http://localhost:5173/login

---

## Cadres Available
| Slug | Name |
|------|------|
| `rri` | Regular Recruit Intake |
| `ssc-dssc` | Short Service Commission / DSSC |
| `nda` | Nigerian Defence Academy |
| `na-band` | Nigerian Army Band Corps |
