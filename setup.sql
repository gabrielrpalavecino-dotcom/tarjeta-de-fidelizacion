-- Script seguro para Supabase.
-- Reglas: requiere autenticación para operar directamente sobre las tablas;
-- el cliente anónimo solo puede invocar la función get_card(id) y obtener un registro exacto.

create table if not exists cards(
  id text primary key,
  stamps text[] not null default '{}',
  prizes int not null default 0,
  total_stamps int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists config(
  id int primary key default 1,
  data jsonb not null default '{}'
);

insert into config(id) values (1) on conflict do nothing;

-- Asegurar que no haya acceso directo por parte del usuario anónimo.
revoke all on table public.cards from public;
revoke all on table public.config from public;

grant select, insert, update, delete on table public.cards to authenticated;
grant select, insert, update, delete on table public.config to authenticated;

grant usage on schema public to anon, authenticated;

alter table cards enable row level security;
alter table config enable row level security;

-- Solo usuarios autenticados (personal/empleados) pueden operar tablas directamente.
drop policy if exists staff_cards on cards;
drop policy if exists staff_config on config;

create policy staff_cards
  on cards
  for all
  to authenticated
  using (true)
  with check (true);

create policy staff_config
  on config
  for all
  to authenticated
  using (true)
  with check (true);

-- Bloquear todo acceso directo para anon para que no puedan consultar ni modificar tablas.
create policy anon_cards_block
  on cards
  as restrictive
  for all
  to anon
  using (false)
  with check (false);

create policy anon_config_block
  on config
  as restrictive
  for all
  to anon
  using (false)
  with check (false);

-- Función segura: el cliente anónimo solo puede pedir UNA tarjeta exacta por id.
create or replace function get_card(p_id text)
returns json
language sql
security definer
set search_path = public
as $$
  select json_build_object(
    'id', c.id,
    'stamps', c.stamps,
    'prizes', c.prizes,
    'config', (
      select data
      from config
      where id = 1
    )
  )
  from cards c
  where c.id = p_id
$$;

grant execute on function get_card(text) to anon, authenticated;

-- (Opcional) dejar explícito que la config debe contener un JSON con el tema y la meta del premio.
-- Si lo prefieres, puedes mantener además funciones auxiliares solo para staff.
