create extension if not exists "pgcrypto";

create table if not exists public.app_content_sections (
  id uuid primary key default gen_random_uuid(),
  section_key text not null unique,
  payload jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.customer_orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_name text,
  customer_phone text,
  vendor_name text,
  status text not null default 'pending',
  address text,
  payment_method text,
  currency text not null default 'SAR',
  subtotal numeric(12,2) not null default 0,
  delivery_fee numeric(12,2) not null default 0,
  discount numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  notes text,
  delivery_window text,
  items jsonb not null default '[]'::jsonb,
  raw_order jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.vendor_applications (
  id uuid primary key default gen_random_uuid(),
  store_name text not null,
  owner_name text not null,
  phone text not null,
  email text,
  category text not null,
  description text,
  address text not null,
  city text not null,
  cr_number text not null,
  id_number text not null,
  bank_name text,
  account_number text,
  iban text,
  status text not null default 'pending',
  review_notes text,
  approved_at timestamptz,
  rejected_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.vendor_profiles (
  id uuid primary key default gen_random_uuid(),
  application_id uuid unique references public.vendor_applications(id) on delete set null,
  store_name text not null,
  owner_name text not null,
  phone text not null unique,
  email text,
  category text not null,
  description text,
  address text,
  city text,
  status text not null default 'approved',
  commission_rate numeric(5,2) not null default 12,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.vendor_services (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendor_profiles(id) on delete cascade,
  title text not null,
  description text,
  category text,
  price numeric(12,2) not null default 0,
  compare_price numeric(12,2),
  image_url text,
  is_active boolean not null default true,
  inventory_count integer not null default 0,
  preparation_time_minutes integer not null default 20,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists app_content_sections_set_updated_at on public.app_content_sections;
create trigger app_content_sections_set_updated_at
before update on public.app_content_sections
for each row execute function public.set_updated_at();

drop trigger if exists customer_orders_set_updated_at on public.customer_orders;
create trigger customer_orders_set_updated_at
before update on public.customer_orders
for each row execute function public.set_updated_at();

drop trigger if exists vendor_applications_set_updated_at on public.vendor_applications;
create trigger vendor_applications_set_updated_at
before update on public.vendor_applications
for each row execute function public.set_updated_at();

drop trigger if exists vendor_profiles_set_updated_at on public.vendor_profiles;
create trigger vendor_profiles_set_updated_at
before update on public.vendor_profiles
for each row execute function public.set_updated_at();

drop trigger if exists vendor_services_set_updated_at on public.vendor_services;
create trigger vendor_services_set_updated_at
before update on public.vendor_services
for each row execute function public.set_updated_at();

alter table public.app_content_sections enable row level security;
alter table public.customer_orders enable row level security;
alter table public.vendor_applications enable row level security;
alter table public.vendor_profiles enable row level security;
alter table public.vendor_services enable row level security;

drop policy if exists "Public read content sections" on public.app_content_sections;
create policy "Public read content sections"
on public.app_content_sections
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Public write content sections" on public.app_content_sections;
create policy "Public write content sections"
on public.app_content_sections
for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists "Public create orders" on public.customer_orders;
create policy "Public create orders"
on public.customer_orders
for insert
to anon, authenticated
with check (true);

drop policy if exists "Public read orders" on public.customer_orders;
create policy "Public read orders"
on public.customer_orders
for select
to anon, authenticated
using (true);

drop policy if exists "Public create vendor applications" on public.vendor_applications;
create policy "Public create vendor applications"
on public.vendor_applications
for insert
to anon, authenticated
with check (true);

drop policy if exists "Public read vendor applications" on public.vendor_applications;
create policy "Public read vendor applications"
on public.vendor_applications
for select
to anon, authenticated
using (true);

drop policy if exists "Public update vendor applications" on public.vendor_applications;
create policy "Public update vendor applications"
on public.vendor_applications
for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists "Public read vendor profiles" on public.vendor_profiles;
create policy "Public read vendor profiles"
on public.vendor_profiles
for select
to anon, authenticated
using (true);

drop policy if exists "Public write vendor profiles" on public.vendor_profiles;
create policy "Public write vendor profiles"
on public.vendor_profiles
for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists "Public read vendor services" on public.vendor_services;
create policy "Public read vendor services"
on public.vendor_services
for select
to anon, authenticated
using (true);

drop policy if exists "Public write vendor services" on public.vendor_services;
create policy "Public write vendor services"
on public.vendor_services
for all
to anon, authenticated
using (true)
with check (true);

insert into public.app_content_sections (section_key, payload)
values
  ('demoMarket', '{"country":"السعودية","city":"الرياض","district":"حي الياسمين","currency":"﷼","locale":"ar-SA"}'::jsonb),
  ('demoAccounts', '{"user":{"phone":"0555000001","name":"سارة القحطاني","city":"الرياض","roleLabel":"عميلة"},"vendor":{"phone":"0555000002","name":"متجر نجد المختصر","city":"الرياض","roleLabel":"تاجر"},"admin":{"phone":"0555000003","name":"مشرف العمليات","city":"الرياض","roleLabel":"مدير"}}'::jsonb),
  ('onboardingSlides', '[{"id":"1","title":"تنقل واضح وسهل من أول لحظة","subtitle":"الوصول إلى الخدمات الأساسية والطلبات يتم بخطوات بسيطة وواضحة.","image":"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800"},{"id":"2","title":"خدمات يومية للسوق السعودي","subtitle":"مطاعم، مشاوير، ومتاجر محلية بعملة الريال ومحتوى مناسب للمستخدم السعودي.","image":"https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800"},{"id":"3","title":"متابعة أسهل للطلبات والحساب","subtitle":"العناوين، الدفع، والطلبات محفوظة في مكان واحد لتجربة استخدام أكثر سلاسة.","image":"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"}]'::jsonb),
  ('notifications', '[{"id":"1","type":"order","title":"تم قبول طلبك","message":"مطعم برجر السرايا بدأ تجهيز الطلب الآن.","time":"قبل 8 دقائق","unread":true,"icon":"bag-handle-outline"},{"id":"2","type":"ride","title":"السائق في الطريق","message":"الكابتن أحمد يبعد 4 دقائق عن موقعك.","time":"قبل 15 دقيقة","unread":true,"icon":"car-outline"},{"id":"3","type":"offer","title":"عرض جديد","message":"خصم 20% على طلبات الجملة اليوم فقط.","time":"اليوم","unread":false,"icon":"pricetag-outline"}]'::jsonb),
  ('supportTopics', '["تتبع الطلب","استرجاع مبلغ","مشكلة في الرحلة","الدفع","الاشتراك كتاجر"]'::jsonb)
on conflict (section_key) do nothing;
