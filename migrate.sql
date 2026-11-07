-- Pegar completo en Supabase (proyecto "Tarjeta de Fidelizacion") > SQL Editor > Run. Se puede correr más de una vez.
create table if not exists shops(id text primary key, name text not null, theme text not null default 'clasico', goal int not null default 10, data jsonb not null default '{}', created_at timestamptz not null default now());
create table if not exists branches(id bigint generated always as identity primary key, shop_id text not null references shops(id) on delete cascade, name text not null);
create table if not exists staff(user_id uuid primary key references auth.users(id) on delete cascade, shop_id text not null references shops(id) on delete cascade, is_admin boolean not null default false);
create table if not exists log(id bigint generated always as identity primary key, card_id text not null, shop_id text not null, branch text, kind text not null, at timestamptz not null default now());
alter table cards add column if not exists shop_id text references shops(id);
insert into shops(id,name,theme,goal,data) values
 ('asiderico','Así de Rico','panaderia',10,'{"prize":"Un premio de la casa"}'),
 ('cbweed','CBWeed','cbd',10,'{}'),
 ('manicura','Casa de manicura','manicura',8,'{}') on conflict do nothing;
update cards set shop_id='asiderico' where shop_id is null;
insert into branches(shop_id,name) select s.id,'Principal' from shops s where not exists(select 1 from branches b where b.shop_id=s.id);
insert into staff(user_id,shop_id,is_admin) select id,'asiderico',true from auth.users where lower(email)='gabrielrpalavecino@gmail.com'
 on conflict (user_id) do update set is_admin=true;
create or replace function my_shop() returns text language sql stable security definer set search_path=public as $$ select shop_id from staff where user_id=auth.uid() $$;
create or replace function is_admin() returns boolean language sql stable security definer set search_path=public as $$ select coalesce((select s.is_admin from staff s where s.user_id=auth.uid()),false) $$;
alter table shops enable row level security; alter table branches enable row level security; alter table staff enable row level security; alter table log enable row level security;
do $$ declare r record; begin for r in select policyname,tablename from pg_policies where schemaname='public' and tablename in ('cards','config','shops','branches','staff','log') loop execute format('drop policy %I on %I',r.policyname,r.tablename); end loop; end $$;
create policy cards_shop on cards for all to authenticated using (is_admin() or shop_id=my_shop()) with check (is_admin() or shop_id=my_shop());
create policy shops_read on shops for select to authenticated using (is_admin() or id=my_shop());
create policy shops_upd on shops for update to authenticated using (is_admin() or id=my_shop()) with check (is_admin() or id=my_shop());
create policy shops_ins on shops for insert to authenticated with check (is_admin());
create policy branches_all on branches for all to authenticated using (is_admin() or shop_id=my_shop()) with check (is_admin() or shop_id=my_shop());
create policy log_all on log for all to authenticated using (is_admin() or shop_id=my_shop()) with check (is_admin() or shop_id=my_shop());
create policy staff_me on staff for select to authenticated using (user_id=auth.uid() or is_admin());
create or replace function get_card(p_id text) returns json language sql security definer set search_path=public as $$
 select json_build_object('id',c.id,'stamps',c.stamps,'prizes',c.prizes,'config',s.data||jsonb_build_object('title',s.name,'goal',s.goal,'theme',s.theme))
 from cards c join shops s on s.id=c.shop_id where c.id=p_id $$;
create or replace function assign_staff(p_email text,p_shop text) returns text language plpgsql security definer set search_path=public as $$
declare u uuid; begin
 if not is_admin() then raise exception 'solo admin'; end if;
 select id into u from auth.users where lower(email)=lower(p_email);
 if u is null then return 'Ese email no existe en Authentication'; end if;
 insert into staff(user_id,shop_id) values(u,p_shop) on conflict (user_id) do update set shop_id=p_shop;
 return 'Listo: empleado asignado'; end $$;
grant execute on function get_card(text), assign_staff(text,text) to anon, authenticated;
