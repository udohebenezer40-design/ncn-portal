-- Run this in your Supabase SQL editor

-- Admins table
create table if not exists admins (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  name text,
  created_at timestamptz default now()
);

-- Applications table
create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  cadre text not null check (cadre in ('rri', 'ssc-dssc', 'nda', 'na-band')),
  first_name text not null,
  last_name text not null,
  middle_name text,
  dob date,
  gender text,
  email text not null,
  phone text,
  state text,
  lga text,
  qualification text,
  nin text unique not null,
  passport_url text,
  status text not null default 'pending' check (status in ('pending', 'shortlisted', 'rejected')),
  created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_applications_cadre on applications(cadre);
create index if not exists idx_applications_status on applications(status);
create index if not exists idx_applications_nin on applications(nin);

-- Storage bucket (run once or create via dashboard)
-- insert into storage.buckets (id, name, public) values ('passports', 'passports', true);

-- ============================================================
-- RLS
-- ============================================================
alter table applications enable row level security;
alter table admins enable row level security;

-- Drop old policies if re-running this script
drop policy if exists "Anyone can submit application" on applications;
drop policy if exists "Public can view shortlisted RRI" on applications;
drop policy if exists "Service role full access" on applications;

-- Allow anyone (anon + authenticated) to INSERT
create policy "Anyone can submit application"
  on applications
  for insert
  to anon, authenticated
  with check (true);

-- Allow public to read shortlisted RRI candidates
create policy "Public can view shortlisted RRI"
  on applications
  for select
  to anon, authenticated
  using (status = 'shortlisted' and cadre = 'rri');

-- Allow authenticated (admin via JWT) to read all
create policy "Authenticated can read all"
  on applications
  for select
  to authenticated
  using (true);

-- Allow authenticated to update status
create policy "Authenticated can update status"
  on applications
  for update
  to authenticated
  using (true)
  with check (true);
