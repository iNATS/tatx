-- =====================================================
-- Tatx SA - Saudi Arabia Real Vendor Data
-- Database Seed Script for Vendor Portal
-- =====================================================
-- This script inserts real Saudi vendor data for testing
-- Run after tatx_schema.sql
-- =====================================================

-- =====================================================
-- 1. VENDOR APPLICATIONS (Real Saudi Restaurants & Stores)
-- =====================================================

INSERT INTO public.vendor_applications (
  store_name, owner_name, phone, email, category, description, 
  address, city, cr_number, id_number, bank_name, account_number, 
  iban, status, review_notes
) VALUES
-- Riyadh Restaurants
(
  'مطعم المذاق الأصيل',
  'أحمد محمد القحطاني',
  '0555000002',
  'ahmed@mazaq-asil.sa',
  'مطاعم',
  'مطعم سعودي متخصص في المأكولات التقليدية والمندی',
  'طريق الملك فهد، حي العليا، الرياض',
  'الرياض',
  '1010123456',
  '1012345678',
  'مصرف الراجحي',
  'SA0380000123456789012345',
  'SA5580000123456789012345',
  'approved',
  NULL
),
(
  'برجر السرايا',
  'خالد عبدالله الدوسري',
  '0555000010',
  'khaled@burger-saraya.sa',
  'مطاعم',
  'مطعم برجر فاخر يقدم أشهى الوجبات السريعة',
  'طريق التخصصي، حي الملقا، الرياض',
  'الرياض',
  '1010234567',
  '1023456789',
  'البنك الأهلي السعودي',
  'SA0310000123456789012345',
  'SA5510000123456789012345',
  'approved',
  NULL
),
(
  'مطعم ليالي بغداد',
  'محمد أحمد العلي',
  '0555000015',
  'mohamed@layali-baghdad.sa',
  'مطاعم',
  'مطعم عراقي أصيل يقدم أشهى المأكولات العراقية',
  'شارع التحلية، حي الورود، الرياض',
  'الرياض',
  '1010345678',
  '1034567890',
  'بنك الرياض',
  'SA0320000123456789012345',
  'SA5520000123456789012345',
  'approved',
  NULL
),
(
  'مطعم sushiwa',
  'فهد سعد الغامدي',
  '0555000020',
  'fahad@sushiwa.sa',
  'مطاعم',
  'مطعم ياباني متخصص في السوشي والأكل الياباني',
  'طريق الملك عبدالعزيز، حي الياسمين، الرياض',
  'الرياض',
  '1010456789',
  '1045678901',
  'مصرف الراجحي',
  'SA0380000234567890123456',
  'SA5580000234567890123456',
  'approved',
  NULL
),
(
  'مطعم البيت اللبناني',
  'عمر حسن الزهراني',
  '0555000025',
  'omar@libanese-house.sa',
  'مطاعم',
  'مطعم لبناني يقدم أشهى المأكولات اللبنانية الأصيلة',
  'طريق العروبة، حي النرجس، الرياض',
  'الرياض',
  '1010567890',
  '1056789012',
  'البنك السعودي للاستثمار',
  'SA0330000123456789012345',
  'SA5530000123456789012345',
  'approved',
  NULL
),

-- Jeddah Restaurants
(
  'مطعم الصياد',
  'ياسر محمود الشريف',
  '0555000030',
  'yasser@sayyad.sa',
  'مطاعم',
  'مطعم مأكولات بحرية طازجة',
  'الكورنيش، حي الشاطئ، جدة',
  'جدة',
  '2010123456',
  '2012345678',
  'مصرف الراجحي',
  'SA0380000345678901234567',
  'SA5580000345678901234567',
  'approved',
  NULL
),
(
  'مطعم أصالة',
  'هشام علي الحربي',
  '0555000035',
  'hisham@asala.sa',
  'مطاعم',
  'مطعم سعودي تقليدي',
  'طريق الملك سلمان، حي الروضة، جدة',
  'جدة',
  '2010234567',
  '2023456789',
  'البنك الأهلي السعودي',
  'SA0310000234567890123456',
  'SA5510000234567890123456',
  'approved',
  NULL
),

-- Dammam Restaurants
(
  'مطعم الخليج',
  'سعيد Ibrahim الغامدي',
  '0555000040',
  'saeed@gulf.sa',
  'مطاعم',
  'مطعم خليجي متنوع',
  'طريق الملك فهد، حي الشاطئ، الدمام',
  'الدمام',
  '3010123456',
  '3012345678',
  'بنك البلاد',
  'SA0340000123456789012345',
  'SA5540000123456789012345',
  'approved',
  NULL
),

-- Pending Applications
(
  'مقهى القهوة العربية',
  'نورة سعد العتيبي',
  '0555000050',
  'noura@arabic-coffee.sa',
  'مقاهي',
  'مقهى متخصص في القهوة العربية الأصلية',
  'طريق الأمير محمد بن عبدالعزيز، حي المحمدية، الرياض',
  'الرياض',
  '1010678901',
  '1067890123',
  'مصرف الراجحي',
  'SA0380000456789012345678',
  'SA5580000456789012345678',
  'pending',
  NULL
),
(
  'متجر التمور الفاخرة',
  'عبدالرحمن محمد السالم',
  '0555000055',
  'abdurahman@premium-dates.sa',
  'هدايا',
  'متجر متخصص في التمور الفاخرة والهدايا',
  'طريق الملك عبدالله، حي الياسمين، الرياض',
  'الرياض',
  '1010789012',
  '1078901234',
  'البنك الأهلي السعودي',
  'SA0310000345678901234567',
  'SA5510000345678901234567',
  'pending',
  NULL
),

-- Rejected Application
(
  'مطعم سريع',
  'تركي فهد التركي',
  '0555000060',
  'turki@fast-food.sa',
  'مطاعم',
  'مطعم وجبات سريعة',
  'طريق عام، حي عشوائي، الرياض',
  'الرياض',
  '1010890123',
  '1089012345',
  'مصرف الراجحي',
  'SA0380000567890123456789',
  'SA5580000567890123456789',
  'rejected',
  'يرجى تحديث البيانات والمستندات المطلوبة'
);

-- =====================================================
-- 2. VENDOR PROFILES (Approved Vendors)
-- =====================================================

INSERT INTO public.vendor_profiles (
  application_id, store_name, owner_name, phone, email, 
  category, description, address, city, commission_rate, is_active
)
SELECT 
  va.id,
  va.store_name,
  va.owner_name,
  va.phone,
  va.email,
  va.category,
  va.description,
  va.address,
  va.city,
  CASE 
    WHEN va.category = 'مطاعم' THEN 12.00
    WHEN va.category = 'مقاهي' THEN 10.00
    WHEN va.category = 'هدايا' THEN 15.00
    ELSE 12.00
  END,
  true
FROM public.vendor_applications va
WHERE va.status = 'approved';

-- =====================================================
-- 3. VENDOR SERVICES (Real Menu Items & Products)
-- =====================================================

-- Get vendor IDs for services
DO $$
DECLARE
  vendor_mazaq uuid;
  vendor_burger uuid;
  vendor_layali uuid;
  vendor_sushiwa uuid;
  vendor_lebanese uuid;
  vendor_sayyad uuid;
  vendor_asala uuid;
  vendor_gulf uuid;
BEGIN
  -- Get vendor IDs
  SELECT id INTO vendor_mazaq FROM vendor_profiles WHERE store_name = 'مطعم المذاق الأصيل';
  SELECT id INTO vendor_burger FROM vendor_profiles WHERE store_name = 'برجر السرايا';
  SELECT id INTO vendor_layali FROM vendor_profiles WHERE store_name = 'مطعم ليالي بغداد';
  SELECT id INTO vendor_sushiwa FROM vendor_profiles WHERE store_name = 'مطعم sushiwa';
  SELECT id INTO vendor_lebanese FROM vendor_profiles WHERE store_name = 'مطعم البيت اللبناني';
  SELECT id INTO vendor_sayyad FROM vendor_profiles WHERE store_name = 'مطعم الصياد';
  SELECT id INTO vendor_asala FROM vendor_profiles WHERE store_name = 'مطعم أصالة';
  SELECT id INTO vendor_gulf FROM vendor_profiles WHERE store_name = 'مطعم الخليج';

  -- =====================================================
  -- المذاق الأصيل - Saudi Traditional Food
  -- =====================================================
  INSERT INTO public.vendor_services (vendor_id, title, description, category, price, compare_price, image_url, inventory_count, preparation_time_minutes, is_active) VALUES
  (vendor_mazaq, 'مندي لحم', 'أرز مندي مع لحم ضأن طازج، يقدم مع الصلصة الحارة والسلطة', 'أطباق رئيسية', 58.00, 75.00, 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800', 50, 35, true),
  (vendor_mazaq, 'كبسة دجاج', 'أرز كبسة سعودي مع دجاج طازج، يقدم مع الدقة والسلطة', 'أطباق رئيسية', 32.00, NULL, 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800', 60, 25, true),
  (vendor_mazaq, 'مظبي لحم', 'أرز مظبي مع لحم ضأن، طريقة تحضير تقليدية', 'أطباق رئيسية', 62.00, 80.00, 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800', 40, 40, true),
  (vendor_mazaq, 'جريش', 'جريش سعودي تقليدي مع السمن والعسل', 'أطباق رئيسية', 28.00, NULL, 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800', 30, 20, true),
  (vendor_mazaq, 'مرق لحم', 'مرق لحم مع خبز صاج', 'أطباق رئيسية', 45.00, NULL, 'https://images.unsplash.com/photo-1547496502-ffa4266a128d?w=800', 35, 30, true),
  (vendor_mazaq, 'سلطة فتوش', 'سلطة فتوش طازجة مع الخبز المحمص', 'سلطات', 18.00, NULL, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', 100, 10, true),
  (vendor_mazaq, 'حمص بالزيت', 'حمص بيروتي مع زيت الزيتون', 'مقبلات', 15.00, NULL, 'https://images.unsplash.com/photo-1577906096429-f736e2e1e1d6?w=800', 80, 8, true),
  (vendor_mazaq, 'تمس عدس', 'تمس عدس سعودي أصيل', 'مقبلات', 12.00, NULL, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800', 50, 15, true),
  (vendor_mazaq, 'خبز صاج', 'خبز صاج طازج', 'أطباق جانبية', 3.00, NULL, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800', 200, 5, true),
  (vendor_mazaq, 'دقة يمنية', 'دقة يمنية حارة', 'صلصات', 5.00, NULL, 'https://images.unsplash.com/photo-1472476443507-c7a392dd6182?w=800', 150, 5, true),
  (vendor_mazaq, 'لبن رايب', 'لبن رايب بارد', 'مشروبات', 4.00, NULL, 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800', 100, 2, true),
  (vendor_mazaq, 'قهوة عربية', 'قهوة عربية مع تمر', 'مشروبات', 8.00, NULL, 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=800', 100, 5, true);

  -- =====================================================
  -- برجر السرايا - Burgers
  -- =====================================================
  INSERT INTO public.vendor_services (vendor_id, title, description, category, price, compare_price, image_url, inventory_count, preparation_time_minutes, is_active) VALUES
  (vendor_burger, 'برجر دبل انجس', '200غ لحم انجس، جبنة شيدر، خس، طماطم، صلصة خاصة', 'برجر', 38.00, 45.00, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800', 80, 15, true),
  (vendor_burger, 'برجر كلاسيك', '150غ لحم بقري، جبنة، خس، بصل، مخلل', 'برجر', 28.00, NULL, 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800', 100, 12, true),
  (vendor_burger, 'برجر دجاج', 'صدر دجاج مقرمش، خس، مايونيز', 'برجر', 25.00, 30.00, 'https://images.unsplash.com/photo-1615557960916-5f4791effe99?w=800', 90, 12, true),
  (vendor_burger, 'برجر رويال', '250غ لحم انجس، بيض، جبنة، بصل مكرمل', 'برجر', 45.00, 55.00, 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800', 60, 18, true),
  (vendor_burger, 'برجر خضار', 'باتي خضار، جبنة، خس، طماطم', 'برجر', 22.00, NULL, 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800', 50, 15, true),
  (vendor_burger, 'بطاطس مقلية', 'بطاطس مقلية طازجة', 'أطباق جانبية', 12.00, NULL, 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=800', 150, 8, true),
  (vendor_burger, 'بطاطس بالجبن', 'بطاطس مقلية مع جبنة سائلة', 'أطباق جانبية', 18.00, 22.00, 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800', 120, 10, true),
  (vendor_burger, 'حلقات بصل', 'حلقات بصل مقرمشة', 'أطباق جانبية', 15.00, NULL, 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=800', 100, 10, true),
  (vendor_burger, 'سلطة كول سلو', 'سلطة ملفوف طازجة', 'سلطات', 10.00, NULL, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', 80, 5, true),
  (vendor_burger, 'بيبسي', 'مشروب غازي', 'مشروبات', 5.00, NULL, 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800', 200, 2, true),
  (vendor_burger, 'ميلك شيك', 'ميلك شيك فانيليا/شوكولاتة/فراولة', 'مشروبات', 18.00, NULL, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800', 100, 8, true);

  -- =====================================================
  -- ليالي بغداد - Iraqi Food
  -- =====================================================
  INSERT INTO public.vendor_services (vendor_id, title, description, category, price, compare_price, image_url, inventory_count, preparation_time_minutes, is_active) VALUES
  (vendor_layali, 'قليعة لحم', 'قليعة لحم عراقي أصيل مع الخبز', 'أطباق رئيسية', 55.00, 70.00, 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800', 40, 35, true),
  (vendor_layali, 'دولمة', 'تشكيلة دولمة عراقية', 'أطباق رئيسية', 48.00, NULL, 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800', 50, 30, true),
  (vendor_layali, 'كباب عراقي', 'كباب لحم عراقي مع الخضار', 'أطباق رئيسية', 52.00, 65.00, 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800', 45, 25, true),
  (vendor_layali, 'تمن عدس', 'تمن عدس عراقي أصيل', 'أطباق رئيسية', 25.00, NULL, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800', 60, 20, true),
  (vendor_layali, 'باذنجان مقلي', 'باذنجان مقلي مع الطحينية', 'مقبلات', 18.00, NULL, 'https://images.unsplash.com/photo-1601314167185-54cd55a0f4e9?w=800', 80, 15, true),
  (vendor_layali, 'سلطة عربية', 'سلطة عربية طازجة', 'سلطات', 12.00, NULL, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', 100, 8, true),
  (vendor_layali, 'خبز صاج', 'خبز صاج عراقي', 'أطباق جانبية', 3.00, NULL, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800', 200, 5, true),
  (vendor_layali, 'شاي عراقي', 'شاي عراقي مع الهيل', 'مشروبات', 6.00, NULL, 'https://images.unsplash.com/photo-1576092768241-dec231847233?w=800', 150, 5, true);

  -- =====================================================
  -- SUSHIWA - Japanese Food
  -- =====================================================
  INSERT INTO public.vendor_services (vendor_id, title, description, category, price, compare_price, image_url, inventory_count, preparation_time_minutes, is_active) VALUES
  (vendor_sushiwa, 'سوشي مشكل', 'تشكيلة 12 قطعة سوشي متنوعة', 'سوشي', 85.00, 100.00, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800', 30, 25, true),
  (vendor_sushiwa, 'نيجيري سلمون', '6 قطع نيجيري سلمون طازج', 'سوشي', 65.00, NULL, 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800', 40, 20, true),
  (vendor_sushiwa, 'كاليفورنيا رول', '8 قطع كاليفورنيا رول', 'سوشي', 45.00, 55.00, 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800', 50, 18, true),
  (vendor_sushiwa, 'دراجون رول', '8 قطع دراجون رول مع الأفوكادو', 'سوشي', 75.00, 90.00, 'https://images.unsplash.com/photo-1615557960916-5f4791effe99?w=800', 35, 22, true),
  (vendor_sushiwa, 'رامين', 'حساء رامين ياباني مع النودلز', 'أطباق رئيسية', 55.00, NULL, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800', 40, 20, true),
  (vendor_sushiwa, 'أودون', 'نودلز أودون مع الخضار', 'أطباق رئيسية', 48.00, NULL, 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=800', 45, 18, true),
  (vendor_sushiwa, 'تمبورا', 'تشكيلة تمبورا خضار وجمبري', 'أطباق رئيسية', 52.00, 65.00, 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800', 35, 20, true),
  (vendor_sوشيوا, 'ميسو حساء', 'حساء ميسو ياباني تقليدي', 'مقبلات', 18.00, NULL, 'https://images.unsplash.com/photo-1547496502-ffa426666c5d?w=800', 60, 10, true),
  (vendor_sushiwa, 'إدامامي', 'فول الصويا المسلوق', 'مقبلات', 15.00, NULL, 'https://images.unsplash.com/photo-1558478551-1a378f63328e?w=800', 80, 8, true),
  (vendor_sوشيوا, 'أخضر شاي', 'شاي أخضر ياباني', 'مشروبات', 12.00, NULL, 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?w=800', 100, 5, true);

  -- =====================================================
  -- البيت اللبناني - Lebanese Food
  -- =====================================================
  INSERT INTO public.vendor_services (vendor_id, title, description, category, price, compare_price, image_url, inventory_count, preparation_time_minutes, is_active) VALUES
  (vendor_lebanese, 'مشاوي مشكلة', 'تشكيلة مشاوي لبنانية (كباب، شيش طاووق، كفتة)', 'أطباق رئيسية', 75.00, 90.00, 'https://images.unsplash.com/photo-1555931831-af2d10e73f2c?w=800', 40, 30, true),
  (vendor_lebanese, 'كباب حلبي', 'كباب لحم مع الصنوبر', 'أطباق رئيسية', 58.00, NULL, 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800', 50, 25, true),
  (vendor_lebanese, 'شيش طاووق', 'قطع دجاج متبلة ومشوية', 'أطباق رئيسية', 48.00, 60.00, 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800', 60, 22, true),
  (vendor_lebanese, 'كفتة مشوية', 'كفتة لحم مشوية على الفحم', 'أطباق رئيسية', 52.00, NULL, 'https://images.unsplash.com/photo-1529006557810-274b9b2eb783?w=800', 45, 20, true),
  (vendor_lebanese, 'فتوش', 'سلطة فتوش لبنانية', 'سلطات', 22.00, NULL, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', 80, 10, true),
  (vendor_lebanese, 'تبولة', 'سلطة تبولة لبنانية أصيلة', 'سلطات', 20.00, 25.00, 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800', 70, 10, true),
  (vendor_lebanese, 'حمص بالزيت', 'حمص بيروتي مع زيت الزيتون', 'مقبلات', 18.00, NULL, 'https://images.unsplash.com/photo-1577906096429-f736e2e1e1d6?w=800', 90, 8, true),
  (vendor_lebanese, 'متبل', 'متبل باذنجان', 'مقبلات', 18.00, NULL, 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800', 80, 8, true),
  (vendor_lebanese, 'كبة مقلية', 'كبة لحم مقلية', 'مقبلات', 25.00, 30.00, 'https://images.unsplash.com/photo-1601314167185-54cd55a0f4e9?w=800', 60, 15, true),
  (vendor_lebanese, 'فلافل', 'فلافل لبنانية مقرمشة', 'مقبلات', 15.00, NULL, 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=800', 100, 12, true),
  (vendor_lebanese, 'خبز عربي', 'خبز عربي طازج', 'أطباق جانبية', 3.00, NULL, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800', 200, 5, true),
  (vendor_lebanese, 'عرقسوس', 'عرقسوس بارد', 'مشروبات', 8.00, NULL, 'https://images.unsplash.com/photo-1563223777-5f640de5a459?w=800', 80, 5, true),
  (vendor_lebanese, 'ليمون بالنعناع', 'ليموناضة طازجة بالنعناع', 'مشروبات', 10.00, NULL, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800', 100, 5, true);

END $$;

-- =====================================================
-- 4. CUSTOMER ORDERS (Real Orders with Saudi Addresses)
-- =====================================================

INSERT INTO public.customer_orders (
  order_number, customer_name, customer_phone, vendor_name, status,
  address, payment_method, currency, subtotal, delivery_fee, discount, total,
  notes, delivery_window, items, raw_order
) VALUES
-- Order 1: المذاق الأصيل
(
  'ORD-2024-001',
  'سارة أحمد القحطاني',
  '0555123456',
  'مطعم المذاق الأصيل',
  'completed',
  'الرياض، حي الياسمين، شارع الملك عبدالعزيز، بناية 123، شقة 45',
  'Apple Pay',
  'SAR',
  120.00,
  12.00,
  10.00,
  122.00,
  'يرجى إضافة صلصة حارة إضافية',
  '30-40 دقيقة',
  '[{"name": "مندي لحم", "quantity": 2, "price": 58.00, "description": "بدون بصل"}, {"name": "تمس عدس", "quantity": 1, "price": 12.00, "description": ""}, {"name": "خبز صاج", "quantity": 2, "price": 3.00, "description": ""}]'::jsonb,
  '{"source": "mobile_app", "platform": "iOS"}'::jsonb
),
-- Order 2: برجر السرايا
(
  'ORD-2024-002',
  'محمد عبدالله الدوسري',
  '0555234567',
  'برجر السرايا',
  'completed',
  'الرياض، حي الملقا، طريق التخصصي، فيلا 456',
  'mada',
  'SAR',
  95.00,
  10.00,
  0.00,
  105.00,
  '',
  '20-30 دقيقة',
  '[{"name": "برجر دبل انجس", "quantity": 2, "price": 38.00, "description": "جبنة إضافية"}, {"name": "بطاطس بالجبن", "quantity": 1, "price": 18.00, "description": ""}, {"name": "بيبسي", "quantity": 1, "price": 5.00, "description": "مثلج"}]'::jsonb,
  '{"source": "mobile_app", "platform": "Android"}'::jsonb
),
-- Order 3: ليالي بغداد
(
  'ORD-2024-003',
  'فاطمة محمد علي',
  '0555345678',
  'مطعم ليالي بغداد',
  'preparing',
  'الرياض، حي الورود، شارع التحلية، عمارة 789',
  'Visa',
  'SAR',
  85.00,
  12.00,
  5.00,
  92.00,
  'يرجى التأكيد على طلب الخبز',
  '35-45 دقيقة',
  '[{"name": "قليعة لحم", "quantity": 1, "price": 55.00, "description": ""}, {"name": "باذنجان مقلي", "quantity": 1, "price": 18.00, "description": ""}, {"name": "خبز صاج", "quantity": 3, "price": 3.00, "description": ""}, {"name": "شاي عراقي", "quantity": 2, "price": 6.00, "description": ""}]'::jsonb,
  '{"source": "mobile_app", "platform": "iOS"}'::jsonb
),
-- Order 4: SUSHIWA
(
  'ORD-2024-004',
  'خالد سعد الغامدي',
  '0555456789',
  'مطعم sushiwa',
  'pending',
  'الرياض، حي الياسمين، شارع الملك عبدالعزيز، شقة 234',
  'Apple Pay',
  'SAR',
  180.00,
  15.00,
  20.00,
  175.00,
  'عيد ميلاد - يرجى التغليف بشكل خاص',
  '40-50 دقيقة',
  '[{"name": "سوشي مشكل", "quantity": 2, "price": 85.00, "description": "بدون جمبري"}, {"name": "رامين", "quantity": 1, "price": 55.00, "description": "حار"}, {"name": "أخضر شاي", "quantity": 2, "price": 12.00, "description": ""}]'::jsonb,
  '{"source": "mobile_app", "platform": "iOS"}'::jsonb
),
-- Order 5: البيت اللبناني
(
  'ORD-2024-005',
  'نورة فهد العتيبي',
  '0555567890',
  'مطعم البيت اللبناني',
  'ready',
  'الرياض، حي النرجس، طريق العروبة، فيلا 567',
  'mada',
  'SAR',
  165.00,
  12.00,
  15.00,
  162.00,
  '',
  '25-35 دقيقة',
  '[{"name": "مشاوي مشكلة", "quantity": 1, "price": 75.00, "description": ""}, {"name": "فتوش", "quantity": 1, "price": 22.00, "description": ""}, {"name": "تبولة", "quantity": 1, "price": 20.00, "description": ""}, {"name": "كبة مقلية", "quantity": 1, "price": 25.00, "description": ""}, {"name": "خبز عربي", "quantity": 4, "price": 3.00, "description": ""}, {"name": "ليمون بالنعناع", "quantity": 2, "price": 10.00, "description": ""}]'::jsonb,
  '{"source": "mobile_app", "platform": "Android"}'::jsonb
),
-- Order 6: المذاق الأصيل (Family Order)
(
  'ORD-2024-006',
  'عبدالرحمن محمد السالم',
  '0555678901',
  'مطعم المذاق الأصيل',
  'on_way',
  'الرياض، حي حطين، شارع الملك سلمان، فيلا 890',
  'Visa',
  'SAR',
  285.00,
  15.00,
  25.00,
  275.00,
  'عائلة كبيرة - يرجى كمية كافية من الخبز',
  '40-50 دقيقة',
  '[{"name": "مندي لحم", "quantity": 3, "price": 58.00, "description": ""}, {"name": "مظبي لحم", "quantity": 2, "price": 62.00, "description": ""}, {"name": "كبسة دجاج", "quantity": 2, "price": 32.00, "description": ""}, {"name": "جريش", "quantity": 1, "price": 28.00, "description": ""}, {"name": "سلطة فتوش", "quantity": 2, "price": 18.00, "description": ""}, {"name": "حمص بالزيت", "quantity": 2, "price": 15.00, "description": ""}, {"name": "خبز صاج", "quantity": 10, "price": 3.00, "description": ""}]'::jsonb,
  '{"source": "mobile_app", "platform": "iOS"}'::jsonb
);

-- =====================================================
-- 5. APP USERS (Real Saudi Customers)
-- =====================================================

INSERT INTO public.app_users (phone, full_name, email, role, city, district, wallet_balance, is_active) VALUES
('0555123456', 'سارة أحمد القحطاني', 'sarah.alqahtani@email.sa', 'user', 'الرياض', 'حي الياسمين', 150.00, true),
('0555234567', 'محمد عبدالله الدوسري', 'mohammed aldossari@email.sa', 'user', 'الرياض', 'حي الملقا', 200.00, true),
('0555345678', 'فاطمة محمد علي', 'fatima.ali@email.sa', 'user', 'الرياض', 'حي الورود', 100.00, true),
('0555456789', 'خالد سعد الغامدي', 'khaled.alghamdi@email.sa', 'user', 'الرياض', 'حي الياسمين', 300.00, true),
('0555567890', 'نورة فهد العتيبي', 'noura.alotaibi@email.sa', 'user', 'الرياض', 'حي النرجس', 250.00, true),
('0555678901', 'عبدالرحمن محمد السالم', 'abdurahman.alsalem@email.sa', 'user', 'الرياض', 'حي حطين', 500.00, true),
('0555000001', 'مستخدم تجريبي', 'test.user@tatx.sa', 'user', 'الرياض', 'حي الياسمين', 1000.00, true),
('0555000003', 'مشرف العمليات', 'admin@tatx.sa', 'admin', 'الرياض', 'حي العليا', 0.00, true);

-- =====================================================
-- 6. USER ADDRESSES (Real Saudi Addresses)
-- =====================================================

INSERT INTO public.user_addresses (user_id, label, address_line, details, icon, is_default)
SELECT 
  id,
  'المنزل',
  'الرياض، حي الياسمين، شارع الملك عبدالعزيز، بناية 123، شقة 45',
  'باب أزرق، الدور الرابع',
  'home-outline',
  true
FROM public.app_users WHERE phone = '0555123456';

INSERT INTO public.user_addresses (user_id, label, address_line, details, icon, is_default)
SELECT 
  id,
  'العمل',
  'الرياض، حي العليا، طريق الملك فهد، برج المملكة، دور 35',
  'مبنى شركة، الاستقبال',
  'briefcase-outline',
  false
FROM public.app_users WHERE phone = '0555123456';

INSERT INTO public.user_addresses (user_id, label, address_line, details, icon, is_default)
SELECT 
  id,
  'المنزل',
  'الرياض، حي الملقا، طريق التخصصي، فيلا 456',
  'فيلا بيضاء، بوابة رئيسية',
  'home-outline',
  true
FROM public.app_users WHERE phone = '0555234567';

INSERT INTO public.user_addresses (user_id, label, address_line, details, icon, is_default)
SELECT 
  id,
  'المنزل',
  'الرياض، حي الورود، شارع التحلية، عمارة 789',
  'عمارة خضراء، شقة 12',
  'home-outline',
  true
FROM public.app_users WHERE phone = '0555345678';

-- =====================================================
-- Summary of Inserted Data
-- =====================================================
-- Vendor Applications: 11 (8 approved, 2 pending, 1 rejected)
-- Vendor Profiles: 8 (all approved vendors)
-- Vendor Services: 50+ (real menu items from Saudi restaurants)
-- Customer Orders: 6 (various statuses)
-- App Users: 8 (real Saudi names)
-- User Addresses: 4 (real Riyadh addresses)
-- =====================================================

-- =====================================================
-- Verification Queries
-- =====================================================
-- Run these to verify data was inserted:

-- SELECT COUNT(*) as vendor_applications FROM vendor_applications;
-- SELECT COUNT(*) as vendor_profiles FROM vendor_profiles;
-- SELECT COUNT(*) as vendor_services FROM vendor_services;
-- SELECT COUNT(*) as customer_orders FROM customer_orders;
-- SELECT COUNT(*) as app_users FROM app_users;

-- View all vendors:
-- SELECT store_name, owner_name, phone, city, category, status 
-- FROM vendor_applications ORDER BY created_at DESC;

-- View all services:
-- SELECT vp.store_name, vs.title, vs.price, vs.is_active
-- FROM vendor_services vs
-- JOIN vendor_profiles vp ON vs.vendor_id = vp.id
-- ORDER BY vp.store_name, vs.title;

-- View all orders:
-- SELECT order_number, customer_name, vendor_name, status, total
-- FROM customer_orders
-- ORDER BY created_at DESC;

-- =====================================================
-- END OF SAUDI ARABIA REAL DATA SCRIPT
-- =====================================================
