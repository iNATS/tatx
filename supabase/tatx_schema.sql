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

create table if not exists public.app_users (
  id uuid primary key default gen_random_uuid(),
  phone text not null unique,
  full_name text not null,
  email text,
  role text not null default 'user',
  city text,
  district text,
  wallet_balance numeric(12,2) not null default 0,
  is_active boolean not null default true,
  profile_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.auth_verifications (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  auth_mode text not null default 'login',
  code text not null,
  full_name text,
  city text,
  is_used boolean not null default false,
  expires_at timestamptz not null,
  verified_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.user_addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.app_users(id) on delete cascade,
  label text not null,
  address_line text not null,
  details text,
  icon text,
  is_default boolean not null default false,
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

create table if not exists public.support_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.app_users(id) on delete set null,
  subject text not null default 'دعم التطبيق',
  status text not null default 'open',
  assigned_to text,
  last_message_preview text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.support_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.support_conversations(id) on delete cascade,
  sender_role text not null,
  content text not null,
  attachments jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.app_notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.app_users(id) on delete cascade,
  notification_type text not null,
  title text not null,
  message text not null,
  icon text,
  deep_link_screen text,
  metadata jsonb not null default '{}'::jsonb,
  is_read boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.app_settings (
  id uuid primary key default gen_random_uuid(),
  setting_key text not null unique,
  setting_value jsonb not null default '{}'::jsonb,
  is_public boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.app_assets (
  id uuid primary key default gen_random_uuid(),
  asset_key text not null unique,
  asset_url text not null,
  asset_type text not null default 'image',
  alt_text text,
  metadata jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
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

drop trigger if exists app_users_set_updated_at on public.app_users;
create trigger app_users_set_updated_at
before update on public.app_users
for each row execute function public.set_updated_at();

drop trigger if exists user_addresses_set_updated_at on public.user_addresses;
create trigger user_addresses_set_updated_at
before update on public.user_addresses
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

drop trigger if exists support_conversations_set_updated_at on public.support_conversations;
create trigger support_conversations_set_updated_at
before update on public.support_conversations
for each row execute function public.set_updated_at();

drop trigger if exists app_settings_set_updated_at on public.app_settings;
create trigger app_settings_set_updated_at
before update on public.app_settings
for each row execute function public.set_updated_at();

drop trigger if exists app_assets_set_updated_at on public.app_assets;
create trigger app_assets_set_updated_at
before update on public.app_assets
for each row execute function public.set_updated_at();

alter table public.app_content_sections enable row level security;
alter table public.customer_orders enable row level security;
alter table public.app_users enable row level security;
alter table public.auth_verifications enable row level security;
alter table public.user_addresses enable row level security;
alter table public.vendor_applications enable row level security;
alter table public.vendor_profiles enable row level security;
alter table public.vendor_services enable row level security;
alter table public.support_conversations enable row level security;
alter table public.support_messages enable row level security;
alter table public.app_notifications enable row level security;
alter table public.app_settings enable row level security;
alter table public.app_assets enable row level security;

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

drop policy if exists "Public read app users" on public.app_users;
create policy "Public read app users"
on public.app_users
for select
to anon, authenticated
using (true);

drop policy if exists "Public write app users" on public.app_users;
create policy "Public write app users"
on public.app_users
for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists "Public read auth verifications" on public.auth_verifications;
create policy "Public read auth verifications"
on public.auth_verifications
for select
to anon, authenticated
using (true);

drop policy if exists "Public write auth verifications" on public.auth_verifications;
create policy "Public write auth verifications"
on public.auth_verifications
for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists "Public read user addresses" on public.user_addresses;
create policy "Public read user addresses"
on public.user_addresses
for select
to anon, authenticated
using (true);

drop policy if exists "Public write user addresses" on public.user_addresses;
create policy "Public write user addresses"
on public.user_addresses
for all
to anon, authenticated
using (true)
with check (true);

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

drop policy if exists "Public read support conversations" on public.support_conversations;
create policy "Public read support conversations"
on public.support_conversations
for select
to anon, authenticated
using (true);

drop policy if exists "Public write support conversations" on public.support_conversations;
create policy "Public write support conversations"
on public.support_conversations
for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists "Public read support messages" on public.support_messages;
create policy "Public read support messages"
on public.support_messages
for select
to anon, authenticated
using (true);

drop policy if exists "Public write support messages" on public.support_messages;
create policy "Public write support messages"
on public.support_messages
for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists "Public read notifications" on public.app_notifications;
create policy "Public read notifications"
on public.app_notifications
for select
to anon, authenticated
using (true);

drop policy if exists "Public write notifications" on public.app_notifications;
create policy "Public write notifications"
on public.app_notifications
for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists "Public read app settings" on public.app_settings;
create policy "Public read app settings"
on public.app_settings
for select
to anon, authenticated
using (is_public = true or true);

drop policy if exists "Public write app settings" on public.app_settings;
create policy "Public write app settings"
on public.app_settings
for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists "Public read app assets" on public.app_assets;
create policy "Public read app assets"
on public.app_assets
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Public write app assets" on public.app_assets;
create policy "Public write app assets"
on public.app_assets
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
  ('taxiContent', '{"rideTypes":[{"id":"economy","name":"Economy","label":"اقتصادي","eta":"3 دقائق","price":18,"seats":4,"note":"أفضل سعر للمشاوير اليومية","icon":"car-outline"},{"id":"comfort","name":"Comfort","label":"راحة","eta":"5 دقائق","price":28,"seats":4,"note":"أسرع وصول وسيارات أحدث","icon":"car-sport-outline"},{"id":"family","name":"Family","label":"عائلي","eta":"7 دقائق","price":36,"seats":6,"note":"مساحة أكبر للأفراد أو الأمتعة","icon":"people-outline"}],"suggestedPlaces":[{"id":"1","title":"المنزل","address":"حي الياسمين، الرياض","lat":24.8396,"lng":46.6437,"icon":"home-outline"},{"id":"2","title":"العمل","address":"مركز الملك عبدالله المالي","lat":24.7667,"lng":46.6436,"icon":"briefcase-outline"},{"id":"3","title":"المطار","address":"مطار الملك خالد الدولي","lat":24.9576,"lng":46.6988,"icon":"airplane-outline"}],"driverOffers":[{"id":"d1","name":"سامي","car":"هيونداي سوناتا","plate":"ح ر س 4821","price":24,"eta":"2 دقيقة"},{"id":"d2","name":"ناصر","car":"تويوتا كامري","plate":"ل س م 1932","price":22,"eta":"4 دقائق"},{"id":"d3","name":"وليد","car":"كيا K5","plate":"ص ب د 7714","price":26,"eta":"3 دقائق"}]}'::jsonb),
  ('medicalBookingContent', '{"specialtyFilters":[{"id":"all","label":"الكل","icon":"apps-outline"},{"id":"طب أسرة","label":"أسرة","icon":"medkit-outline"},{"id":"باطنية","label":"باطنية","icon":"pulse-outline"},{"id":"جلدية","label":"جلدية","icon":"sparkles-outline"},{"id":"أسنان","label":"أسنان","icon":"fitness-outline"}],"consultationFilters":[{"id":"all","label":"كل الزيارات"},{"id":"clinic","label":"داخل العيادة"},{"id":"online","label":"أونلاين"}],"doctors":[{"id":"1","name":"د. نورة السبيعي","specialty":"طب أسرة","clinic":"مجمع الندى الطبي","location":"الصحافة","fee":120,"experience":"12 سنة خبرة","consultationType":"clinic","slots":["05:30 م","06:00 م","07:00 م"],"days":["اليوم","غدًا","الخميس","الجمعة"]},{"id":"2","name":"د. خالد الشهري","specialty":"باطنية","clinic":"عيادات الصفوة","location":"العليا","fee":150,"experience":"15 سنة خبرة","consultationType":"clinic","slots":["04:00 م","05:15 م","07:45 م"],"days":["اليوم","غدًا","السبت"]},{"id":"3","name":"د. ريم العتيبي","specialty":"جلدية","clinic":"مركز العناية المتقدمة","location":"الياسمين","fee":180,"experience":"10 سنوات خبرة","consultationType":"online","slots":["06:30 م","08:00 م","09:00 م"],"days":["غدًا","الخميس","الأحد"]},{"id":"4","name":"د. عبدالعزيز الدوسري","specialty":"أسنان","clinic":"ابتسامة الرياض","location":"الندى","fee":220,"experience":"14 سنة خبرة","consultationType":"clinic","slots":["03:30 م","04:30 م","06:30 م"],"days":["اليوم","غدًا","السبت"]}]}'::jsonb),
  ('wholesaleContent', '{"groups":[{"id":"all","name":"كل المجموعات","icon":"grid-outline","accent":"#DA3C57","summary":"توريد منظم حسب نوع الاحتياج","items":[]},{"id":"food","name":"مواد غذائية","icon":"nutrition-outline","accent":"#D95C73","summary":"أرز، زيوت، سكر، واحتياجات الطبخ","items":[{"id":"w1","name":"أرز بسمتي 5 كجم","image":"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400","minOrder":10,"price":32,"bulkPrice":28,"bulkMin":50,"unit":"كيس","stock":500},{"id":"w2","name":"زيت طهي 1.5 لتر","image":"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400","minOrder":12,"price":20,"bulkPrice":17,"bulkMin":48,"unit":"عبوة","stock":300},{"id":"w3","name":"سكر أبيض 2 كجم","image":"https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400","minOrder":20,"price":12,"bulkPrice":10,"bulkMin":100,"unit":"كيس","stock":800}]},{"id":"beverages","name":"مشروبات وضيافة","icon":"cafe-outline","accent":"#AF8F6F","summary":"مياه، عصائر، وقهوة للمكاتب والمقاهي","items":[{"id":"w4","name":"مياه شرب 24 عبوة","image":"https://images.unsplash.com/photo-1564419320461-6870880221ad?w=400","minOrder":15,"price":16,"bulkPrice":13,"bulkMin":60,"unit":"كرتون","stock":420},{"id":"w5","name":"قهوة عربية 1 كجم","image":"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400","minOrder":8,"price":54,"bulkPrice":46,"bulkMin":32,"unit":"عبوة","stock":160},{"id":"w6","name":"أكواب ورقية 100 حبة","image":"https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400","minOrder":20,"price":14,"bulkPrice":11,"bulkMin":80,"unit":"باك","stock":900}]}],"offers":[{"id":"offer-1","title":"سوق الجملة","subtitle":"مجموعات شراء جاهزة للمطاعم والمكاتب والمتاجر","image":"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900","overlay":["rgba(218,60,87,0.9)","rgba(255,141,160,0.42)"]},{"id":"offer-2","title":"عقود توريد","subtitle":"أسعار أفضل عند رفع الكميات أو التكرار الشهري","image":"https://images.unsplash.com/photo-1553413077-190dd305871c?w=900","overlay":["rgba(17,24,39,0.82)","rgba(76,95,122,0.32)"]}]}'::jsonb),
  ('supportTopics', '["تتبع الطلب","استرجاع مبلغ","مشكلة في الرحلة","الدفع","الاشتراك كتاجر"]'::jsonb),
  ('landingPage', '{"heroTitle":"كل خدماتك اليومية في تطبيق واحد","heroSubtitle":"محتوى وصور الصفحة الافتتاحية يمكن إدارتها من بوابة المشرف العام.","heroImage":"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200"}'::jsonb)
on conflict (section_key) do nothing;

insert into public.app_settings (setting_key, setting_value, is_public)
values
  ('platform', '{"name":"Tatx SA","market":"السعودية","currency":"SAR","supportPhone":"+966555000003"}'::jsonb, true),
  ('checkout', '{"defaultDeliveryFee":12,"defaultDiscountCode":"WELCOME10"}'::jsonb, true)
on conflict (setting_key) do nothing;
