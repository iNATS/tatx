import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { getCategoryImage } from '../utils/placeholderImages';
import { useApp } from '../context/AppContext';
import ItemDetailModal from '../components/ItemDetailModal';
import OfferPromoCard from '../components/OfferPromoCard';
import PriceDisplay from '../components/PriceDisplay';
import PageHeader from '../components/PageHeader';

const pharmacyItems = [
  { id: '1', name: 'مسكن ألم', price: 15, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400', rating: 4.6, time: '20 دقيقة', description: 'مسكن ألم سريع المفعول', tag: 'أساسي' },
  { id: '2', name: 'فيتامينات', price: 45, image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400', rating: 4.8, time: '20 دقيقة', description: 'فيتامينات متعددة', tag: 'صحة يومية' },
  { id: '3', name: 'جهاز قياس حرارة', price: 69, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400', rating: 4.7, time: '35 دقيقة', description: 'مناسب للاستخدام المنزلي', tag: 'أجهزة' },
  { id: '4', name: 'كريم عناية', price: 32, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400', rating: 4.5, time: '25 دقيقة', description: 'ترطيب يومي للبشرة', tag: 'عناية' },
  { id: '5', name: 'شراب سعال', price: 28, image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400', rating: 4.4, time: '22 دقيقة', description: 'للسعال والحساسية الموسمية', tag: 'موسمي' },
  { id: '6', name: 'مستلزمات أطفال', price: 39, image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400', rating: 4.8, time: '30 دقيقة', description: 'عناية يومية للأطفال', tag: 'أطفال' },
];

const vendorStores = {
  'مطاعم': [
    {
      id: 'r1',
      name: 'برجر السرايا',
      subtitle: 'برجر ووجبات سريعة',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900',
      items: [
        { id: 'ri1', name: 'برجر دبل انجس', price: 29, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', description: 'وجبة كاملة مع بطاطس ومشروب', rating: 4.8, time: '25 دقيقة' },
        { id: 'ri2', name: 'تشيكن كرسبي', price: 24, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400', description: 'ساندوتش دجاج مقرمش', rating: 4.7, time: '22 دقيقة' },
        { id: 'ri3', name: 'بطاطس متبلة', price: 12, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400', description: 'حجم كبير', rating: 4.5, time: '18 دقيقة' },
      ],
    },
    {
      id: 'r2',
      name: 'بيتزا البيت',
      subtitle: 'بيتزا ومقبلات',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900',
      items: [
        { id: 'ri4', name: 'بيتزا مارجريتا', price: 34, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', description: 'حجم متوسط', rating: 4.6, time: '30 دقيقة' },
        { id: 'ri5', name: 'بيتزا بيبروني', price: 42, image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400', description: 'حجم كبير', rating: 4.8, time: '35 دقيقة' },
      ],
    },
    {
      id: 'r3',
      name: 'مذاق نجد',
      subtitle: 'أكلات سعودية',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=900',
      items: [
        { id: 'ri6', name: 'وجبة مندي', price: 58, image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400', description: 'مندي لحم أو دجاج', rating: 4.9, time: '40 دقيقة' },
        { id: 'ri7', name: 'قرصان', price: 36, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400', description: 'وجبة فردية', rating: 4.5, time: '32 دقيقة' },
      ],
    },
  ],
  'مقاهي': [
    {
      id: 'c1',
      name: 'كافيه الموج',
      subtitle: 'قهوة مختصة وحلويات',
      image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=900',
      items: [
        { id: 'ci1', name: 'لاتيه زعفران', price: 19, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400', description: 'مشروب ساخن بنكهة الزعفران', rating: 4.7, time: '14 دقيقة' },
        { id: 'ci2', name: 'كوكيز شوكولاتة', price: 12, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400', description: 'مخبوزات يومية طازجة', rating: 4.6, time: '16 دقيقة' },
      ],
    },
    {
      id: 'c2',
      name: 'روستري الحي',
      subtitle: 'مختبر قهوة ومخبوزات',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900',
      items: [
        { id: 'ci3', name: 'كابتشينو', price: 18, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400', description: 'رغوة حليب كثيفة ونكهة متوازنة', rating: 4.8, time: '13 دقيقة' },
        { id: 'ci4', name: 'كرواسون زبدة', price: 11, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', description: 'طازج يوميًا', rating: 4.5, time: '15 دقيقة' },
      ],
    },
  ],
  'هدايا': [
    {
      id: 'g1',
      name: 'ورد نجد',
      subtitle: 'تنسيقات ورد وهدايا',
      image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=900',
      items: [
        { id: 'gi1', name: 'باقة ورد كلاسيك', price: 145, image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400', description: 'تنسيق أنيق للمناسبات', rating: 4.9, time: '50 دقيقة' },
        { id: 'gi2', name: 'باقة مواليد', price: 220, image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400', description: 'ورد مع بطاقة تهنئة', rating: 4.8, time: '60 دقيقة' },
      ],
    },
    {
      id: 'g2',
      name: 'هدايا اللحظة',
      subtitle: 'بوكسات وشوكولاتة',
      image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=900',
      items: [
        { id: 'gi3', name: 'بوكس شوكولاتة', price: 95, image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400', description: 'علبة أنيقة مع تنسيق فاخر', rating: 4.7, time: '40 دقيقة' },
        { id: 'gi4', name: 'هدية مكتبية', price: 180, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400', description: 'مناسبة لزملاء العمل', rating: 4.6, time: '55 دقيقة' },
      ],
    },
  ],
};

const categoryOffers = {
  'مطاعم': [
    { id: 'fo1', title: 'خصم 25%', subtitle: 'على مطاعم مختارة اليوم', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900', overlay: ['rgba(218,60,87,0.88)', 'rgba(255,128,146,0.52)'] },
    { id: 'fo2', title: 'توصيل مجاني', subtitle: 'على الطلبات فوق 60', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900', overlay: ['rgba(52,199,89,0.85)', 'rgba(137,216,121,0.45)'] },
  ],
  'مقاهي': [
    { id: 'co1', title: 'قهوة اليوم', subtitle: 'عروض على القهوة والحلويات المختارة', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900', overlay: ['rgba(111,78,55,0.88)', 'rgba(208,171,124,0.38)'] },
  ],
  'صيدلية': [
    { id: 'po1', title: 'عناية يومية', subtitle: 'خصومات على منتجات الصحة والعناية', image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=900', overlay: ['rgba(218,60,87,0.88)', 'rgba(245,165,180,0.48)'] },
  ],
  'هدايا': [
    { id: 'go1', title: 'تنسيقات خاصة', subtitle: 'هدايا جاهزة للمناسبات', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=900', overlay: ['rgba(175,82,222,0.86)', 'rgba(255,158,198,0.42)'] },
  ],
};

const sorters = [
  { id: 'all', label: 'الكل' },
  { id: 'popular', label: 'الأكثر طلبًا' },
  { id: 'price_low', label: 'السعر الأقل' },
  { id: 'price_high', label: 'السعر الأعلى' },
];

const CategoryScreen = ({ route, navigation }) => {
  const { addToCart, isRTL, rowDirection, textAlignStart } = useApp();
  const { name = 'مطاعم' } = route.params || {};
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSorter, setSelectedSorter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);

  const normalizedName = name === 'طعام' ? 'مطاعم' : name === 'عطور وهدايا' ? 'هدايا' : name;
  const displayName = name === 'طعام' ? 'مطاعم' : name;
  const isVendorCategory = normalizedName === 'مطاعم' || normalizedName === 'هدايا' || normalizedName === 'مقاهي';
  const stores = vendorStores[normalizedName] || [];
  const offers = categoryOffers[normalizedName] || [];

  const filteredStores = useMemo(() => {
    return stores.filter((store) => store.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [stores, searchQuery]);

  const filteredItems = useMemo(() => {
    const base = pharmacyItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (selectedSorter === 'popular') return [...base].sort((a, b) => b.rating - a.rating);
    if (selectedSorter === 'price_low') return [...base].sort((a, b) => a.price - b.price);
    if (selectedSorter === 'price_high') return [...base].sort((a, b) => b.price - a.price);
    return base;
  }, [searchQuery, selectedSorter]);

  return (
    <View style={styles.container}>
      <PageHeader
        navigation={navigation}
        title={displayName}
        subtitle={displayName === 'مطاعم' ? 'اختر المطعم ثم الوجبة' : displayName === 'مقاهي' ? 'اختر المقهى ثم الطلب' : displayName === 'عطور وهدايا' ? 'اختر المتجر ثم المنتج' : 'منتجات مباشرة من الصيدلية'}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder={isVendorCategory ? `ابحث عن ${displayName === 'مطاعم' ? 'مطعم' : displayName === 'مقاهي' ? 'مقهى' : 'متجر'}` : 'ابحث عن منتج'}
        filters={!isVendorCategory ? sorters : []}
        selectedFilter={selectedSorter}
        onSelectFilter={setSelectedSorter}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <Image source={{ uri: getCategoryImage(normalizedName) }} style={styles.heroImage} />
          <LinearGradient colors={['rgba(17,16,17,0.5)', 'rgba(17,16,17,0.12)']} style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>{displayName}</Text>
            <Text style={styles.heroSubtitle}>
              {displayName === 'مطاعم' ? 'مطاعم مختارة داخل المنصة' : displayName === 'مقاهي' ? 'مقاهي مختصة وحلويات يومية' : displayName === 'عطور وهدايا' ? 'متاجر عطور وهدايا وتنسيقات' : 'منتجات صحية وعناية منزلية'}
            </Text>
          </View>
        </View>

        <ScrollView horizontal inverted={isRTL} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.offersRow}>
          {offers.map((offer) => (
            <OfferPromoCard key={offer.id} offer={offer} compact />
          ))}
        </ScrollView>

        {isVendorCategory
          ? filteredStores.map((store) => (
              <TouchableOpacity
                key={store.id}
                style={[styles.storeCard, { flexDirection: rowDirection }]}
                activeOpacity={0.92}
                onPress={() => navigation.navigate('CategoryVendorDetail', { store, categoryName: normalizedName })}
              >
                <Image source={{ uri: store.image }} style={styles.storeImage} />
                <View style={styles.storeBody}>
                  <Text style={[styles.storeName, { textAlign: textAlignStart }]}>{store.name}</Text>
                  <Text style={[styles.storeSubtitle, { textAlign: textAlignStart }]}>{store.subtitle}</Text>
                  <View style={[styles.storeBottom, { flexDirection: rowDirection }]}>
                    <Text style={styles.storeCount}>{store.items.length} عناصر</Text>
                    <TouchableOpacity style={styles.storeButton}>
                      <Text style={styles.storeButtonText}>دخول</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : filteredItems.map((item) => (
              <TouchableOpacity key={item.id} style={[styles.itemRow, { flexDirection: rowDirection }]} onPress={() => setSelectedItem(item)} activeOpacity={0.92}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemBody}>
                  <Text style={[styles.itemName, { textAlign: textAlignStart }]}>{item.name}</Text>
                  <Text style={[styles.itemDescription, { textAlign: textAlignStart }]}>{item.description}</Text>
                  <View style={[styles.itemBottom, { flexDirection: rowDirection }]}>
                    <PriceDisplay value={item.price} color={colors.primary} size={18} iconSize={14} bold />
                    <TouchableOpacity style={styles.storeButton} onPress={() => setSelectedItem(item)}>
                      <Text style={styles.storeButtonText}>عرض</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
      </ScrollView>

      <ItemDetailModal visible={!!selectedItem} item={selectedItem} onClose={() => setSelectedItem(null)} onAddToCart={addToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  heroCard: { height: 196, borderRadius: 28, overflow: 'hidden', marginBottom: spacing.md, ...shadows.sm },
  heroImage: { width: '100%', height: '100%', position: 'absolute' },
  heroOverlay: { ...StyleSheet.absoluteFillObject },
  heroContent: { flex: 1, paddingHorizontal: spacing.md, justifyContent: 'flex-end', paddingBottom: spacing.lg },
  heroTitle: { color: colors.white, fontFamily: fonts.bold, fontSize: 28, textAlign: 'right' },
  heroSubtitle: { color: 'rgba(255,255,255,0.88)', textAlign: 'right', fontSize: 13 },
  content: { paddingHorizontal: spacing.md, paddingBottom: spacing.xl },
  offersRow: { gap: spacing.md, paddingVertical: spacing.md },
  storeCard: { backgroundColor: colors.card, borderRadius: 24, padding: spacing.md, marginBottom: spacing.md, direction: 'rtl', ...shadows.sm },
  storeImage: { width: 104, height: 104, borderRadius: 22, backgroundColor: colors.cardSecondary },
  storeBody: { flex: 1, width: '100%', marginHorizontal: spacing.md, justifyContent: 'space-between', alignItems: 'flex-end' },
  storeName: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 17, textAlign: 'right', alignSelf: 'stretch' },
  storeSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 4, lineHeight: 18, textAlign: 'right', alignSelf: 'stretch' },
  storeBottom: { justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md },
  storeButton: { backgroundColor: colors.primary, borderRadius: borderRadius.full, paddingHorizontal: 18, paddingVertical: 10 },
  storeButtonText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 13 },
  storeCount: { color: colors.textSecondary, fontSize: 12, textAlign: 'right', alignSelf: 'stretch' },
  itemRow: { backgroundColor: colors.card, borderRadius: 24, padding: spacing.md, marginBottom: spacing.md, direction: 'rtl', ...shadows.sm },
  itemImage: { width: 100, height: 100, borderRadius: 20, backgroundColor: colors.cardSecondary },
  itemBody: { flex: 1, width: '100%', marginHorizontal: spacing.md, justifyContent: 'space-between', alignItems: 'flex-end' },
  itemName: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 16, textAlign: 'right', alignSelf: 'stretch' },
  itemDescription: { color: colors.textSecondary, fontSize: 12, marginTop: spacing.xs, lineHeight: 18, textAlign: 'right', alignSelf: 'stretch' },
  itemBottom: { justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md },
});

export default CategoryScreen;
