-- Test de Condición Física · Colegio Juan Pablo Segundo
-- Ejecutar una sola vez en Supabase → SQL Editor → New query → Run

create table if not exists public.test_fisico (
  id           text primary key,
  datos        jsonb not null,
  actualizado  timestamptz not null default now()
);

alter table public.test_fisico enable row level security;

drop policy if exists "acceso app test_fisico" on public.test_fisico;
create policy "acceso app test_fisico"
  on public.test_fisico
  for all
  to anon
  using (true)
  with check (true);
