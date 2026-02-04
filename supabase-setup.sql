-- Run this once in Supabase: SQL Editor → New query → paste all → Run
-- Then create bucket "uploads" (Public) in Storage → New bucket

-- 1. Projects table
create table if not exists projects (
  id text primary key,
  title text not null,
  description text not null,
  images jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table projects enable row level security;
create policy "Allow public read" on projects for select using (true);
create policy "Allow public all" on projects for all using (true);

-- 2. Storage: allow anyone to read and upload to "uploads" bucket
--    (run after creating bucket "uploads" in Storage → New bucket, set Public ON)
drop policy if exists "Public read uploads" on storage.objects;
drop policy if exists "Public insert uploads" on storage.objects;
create policy "Public read uploads" on storage.objects for select using (bucket_id = 'uploads');
create policy "Public insert uploads" on storage.objects for insert to anon with check (bucket_id = 'uploads');
create policy "Public insert uploads authenticated" on storage.objects for insert to authenticated with check (bucket_id = 'uploads');
