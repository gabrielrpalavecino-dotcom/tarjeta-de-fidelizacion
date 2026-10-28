-- Pegar completo en Supabase > SQL Editor > Run
create table if not exists cards(
  id text primary key,
  stamps text[] not null default '{}',   -- 's' = estrella, 'q' = cuadrado
  prizes int not null default 0,
  total_stamps int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now());
create table if not exists config(id int primary key default 1, data jsonb not null default '{}');
insert into config(id) values (1) on conflict do nothing;
alter table cards enable row level security;
alter table config enable row level security;
-- Solo usuarios logueados (vos y tus empleados) pueden leer/escribir directo
create policy staff_cards on cards for all to authenticated using (true) with check (true);
create policy staff_config on config for all to authenticated using (true) with check (true);
-- El cliente (sin login) solo puede pedir UNA tarjeta si conoce su código exacto
create or replace function get_card(p_id text) returns json language sql security definer set search_path=public as $$
  select json_build_object('id',c.id,'stamps',c.stamps,'prizes',c.prizes,'config',(select data from config where id=1))
  from cards c where c.id=p_id $$;
grant execute on function get_card(text) to anon, authenticated;
