import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';
import ItemDetailModal from '../components/ItemDetailModal';
import OfferPromoCard from '../components/OfferPromoCard';
import PriceDisplay from '../components/PriceDisplay';

const wholesaleGroups = [
  {
    id: 'all',
    name: 'كل المجموعات',
    icon: 'grid-outline',
    accent: colors.primary,
    summary: 'توريد منظم حسب نوع الاحتياج',
    items: [],
  },
  {
    id: 'food',
    name: 'مواد غذائية',
    icon: 'nutrition-outline',
    accent: '#D95C73',
    summary: 'أرز، زيوت، سكر، واحتياجات الطبخ',
    items: [
      { id: 'w1', name: 'أرز بسمتي 5 كجم', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', minOrder: 10, price: 32, bulkPrice: 28, bulkMin: 50, unit: 'كيس', stock: 500 },
      { id: 'w2', name: 'زيت طهي 1.5 لتر', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', minOrder: 12, price: 20, bulkPrice: 17, bulkMin: 48, unit: 'عبوة', stock: 300 },
      { id: 'w3', name: 'سكر أبيض 2 كجم', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400', minOrder: 20, price: 12, bulkPrice: 10, bulkMin: 100, unit: 'كيس', stock: 800 },
    ],
  },
  {
    id: 'beverages',
    name: 'مشروبات وضيافة',
    icon: 'cafe-outline',
    accent: '#AF8F6F',
    summary: 'مياه، عصائر، وقهوة للمكاتب والمقاهي',
    items: [
      { id: 'w4', name: 'مياه شرب 24 عبوة', image: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?w=400', minOrder: 15, price: 16, bulkPrice: 13, bulkMin: 60, unit: 'كرتون', stock: 420 },
      { id: 'w5', name: 'قهوة عربية 1 كجم', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400', minOrder: 8, price: 54, bulkPrice: 46, bulkMin: 32, unit: 'عبوة', stock: 160 },
      { id: 'w6', name: 'أكواب ورقية 100 حبة', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400', minOrder: 20, price: 14, bulkPrice: 11, bulkMin: 80, unit: 'باك', stock: 900 },
    ],
  },
  {
    id: 'cleaning',
    name: 'منظفات وتشغيل',
    icon: 'sparkles-outline',
    accent: '#34C759',
    summary: 'منظفات أرضيات، معقمات، ومناديل',
    items: [
      { id: 'w7', name: 'منظف أرضيات 5 لتر', image: 'https://images.unsplash.com/photo-1585837575652-2c90698b7f1f?w=400', minOrder: 6, price: 25, bulkPrice: 20, bulkMin: 24, unit: 'جركن', stock: 200 },
      { id: 'w8', name: 'معقم أسطح 750 مل', image: 'https://images.unsplash.com/photo-1583947582886-f40ec95dd752?w=400', minOrder: 24, price: 9, bulkPrice: 7, bulkMin: 96, unit: 'عبوة', stock: 650 },
      { id: 'w9', name: 'مناديل رول مطبخ', image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=400', minOrder: 18, price: 18, bulkPrice: 15, bulkMin: 72, unit: 'باك', stock: 480 },
    ],
  },
  {
    id: 'hospitality',
    name: 'مستهلكات وضيافة',
    icon: 'cube-outline',
    accent: '#7A5AF8',
    summary: 'تمور، شوكولاتة، وتقديم جاهز',
    items: [
      { id: 'w10', name: 'تمر ضيافة 1 كجم', image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400', minOrder: 10, price: 34, bulkPrice: 29, bulkMin: 40, unit: 'علبة', stock: 240 },
      { id: 'w11', name: 'شوكولاتة تقديم', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400', minOrder: 12, price: 26, bulkPrice: 22, bulkMin: 48, unit: 'علبة', stock: 310 },
      { id: 'w12', name: 'صحون تقديم 50 حبة', image: 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?w=400', minOrder: 20, price: 15, bulkPrice: 12, bulkMin: 80, unit: 'باك', stock: 720 },
    ],
  },
  {
    id: 'general_supply',
    name: 'توريدات الجملة',
    icon: 'layers-outline',
    accent: '#C45586',
    summary: 'توريد عام للمتاجر والمكاتب ونقاط البيع',
    items: [
      { id: 'w13', name: 'أكياس تغليف 500 حبة', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400', minOrder: 10, price: 22, bulkPrice: 18, bulkMin: 40, unit: 'ربطة', stock: 520 },
      { id: 'w14', name: 'فواتير حرارية 20 رول', image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=400', minOrder: 8, price: 28, bulkPrice: 23, bulkMin: 32, unit: 'علبة', stock: 190 },
      { id: 'w15', name: 'قفازات استخدام واحد', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400', minOrder: 12, price: 19, bulkPrice: 15, bulkMin: 48, unit: 'باك', stock: 460 },
    ],
  },
  {
    id: 'restaurant_supply',
    name: 'توريدات مطاعم',
    icon: 'restaurant-outline',
    accent: '#34C759',
    summary: 'احتياجات المطابخ والتحضير والتقديم للمطاعم',
    items: [
      { id: 'w16', name: 'زيت قلي 17 لتر', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', minOrder: 6, price: 96, bulkPrice: 88, bulkMin: 18, unit: 'حبة', stock: 140 },
      { id: 'w17', name: 'علب برجر 100 حبة', image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=400', minOrder: 10, price: 31, bulkPrice: 26, bulkMin: 40, unit: 'كرتون', stock: 330 },
      { id: 'w18', name: 'مناديل سفرة 1000 حبة', image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=400', minOrder: 8, price: 24, bulkPrice: 20, bulkMin: 32, unit: 'باك', stock: 410 },
    ],
  },
  {
    id: 'hotel_supply',
    name: 'توريدات فنادق',
    icon: 'bed-outline',
    accent: '#7A5AF8',
    summary: 'مستلزمات الغرف والضيافة والتشغيل للفنادق',
    items: [
      { id: 'w19', name: 'مناشف غرف 12 قطعة', image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=400', minOrder: 6, price: 74, bulkPrice: 66, bulkMin: 24, unit: 'طقم', stock: 180 },
      { id: 'w20', name: 'شامبو وفنادق 50 مل', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400', minOrder: 24, price: 32, bulkPrice: 27, bulkMin: 96, unit: 'كرتون', stock: 290 },
      { id: 'w21', name: 'شبشب ضيافة 20 زوج', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', minOrder: 10, price: 29, bulkPrice: 24, bulkMin: 40, unit: 'باك', stock: 240 },
    ],
  },
];

const wholesaleOffers = [
  {
    id: 'offer-1',
    title: 'سوق الجملة',
    subtitle: 'مجموعات شراء جاهزة للمطاعم والمكاتب والمتاجر',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900',
    overlay: ['rgba(218,60,87,0.9)', 'rgba(255,141,160,0.42)'],
  },
  {
    id: 'offer-2',
    title: 'عقود توريد',
    subtitle: 'أسعار أفضل عند رفع الكميات أو التكرار الشهري',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=900',
    overlay: ['rgba(17,24,39,0.82)', 'rgba(76,95,122,0.32)'],
  },
];

const WholesaleScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { addToCart, cartCount, cartTotal, formatCurrency, rowDirection, textAlignStart, isRTL } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const backIcon = isRTL ? 'arrow-forward' : 'arrow-back';

  const visibleGroups = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const groups = wholesaleGroups
      .filter((group) => group.id !== 'all')
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          if (!query) {
            return true;
          }

          return (
            item.name.toLowerCase().includes(query) ||
            group.name.toLowerCase().includes(query) ||
            group.summary.toLowerCase().includes(query)
          );
        }),
      }))
      .filter((group) => (selectedFilter === 'all' ? group.items.length > 0 : group.id === selectedFilter && group.items.length > 0));

    return groups;
  }, [searchQuery, selectedFilter]);

  const groupStats = useMemo(() => {
    const productCount = visibleGroups.reduce((sum, group) => sum + group.items.length, 0);
    const lowestBulk = visibleGroups.flatMap((group) => group.items).reduce((min, item) => Math.min(min, item.bulkPrice), Infinity);

    return {
      groups: visibleGroups.length,
      products: productCount,
      lowestBulk: Number.isFinite(lowestBulk) ? lowestBulk : 0,
    };
  }, [visibleGroups]);

  const handleAddToCart = (item) => {
    const quantity = Math.max(item.quantity || item.minOrder || 1, item.minOrder || 1);
    const finalPrice = quantity >= item.bulkMin ? item.bulkPrice : item.price;
    addToCart({ ...item, quantity, finalPrice, wholesale: true });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm, flexDirection: rowDirection }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name={backIcon} size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { textAlign: textAlignStart }]}>سوق الجملة</Text>
          <Text style={[styles.headerSubtitle, { textAlign: textAlignStart }]}>اطلب حسب المجموعة بدل البحث بين منتجات متفرقة</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartButton}>
          <Ionicons name="bag-handle-outline" size={22} color={colors.white} />
          {cartCount > 0 && <View style={styles.cartBadge}><Text style={styles.cartBadgeText}>{cartCount}</Text></View>}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.searchWrap}>
          <View style={[styles.searchBar, { flexDirection: rowDirection }]}>
            <TouchableOpacity style={styles.searchAction} activeOpacity={0.85}>
              <Ionicons name="layers-outline" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
            <Ionicons name="search-outline" size={20} color={colors.textTertiary} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={[styles.searchInput, { textAlign: textAlignStart }]}
              placeholder="ابحث عن مجموعة أو منتج جملة"
              placeholderTextColor={colors.textTertiary}
            />
          </View>
        </View>

        <OfferPromoCard offer={wholesaleOffers[0]} fullWidth />

        <View style={[styles.statsRow, { flexDirection: rowDirection }]}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{groupStats.groups}</Text>
            <Text style={styles.statLabel}>مجموعات نشطة</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{groupStats.products}</Text>
            <Text style={styles.statLabel}>منتجات متاحة</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{groupStats.lowestBulk ? formatCurrency(groupStats.lowestBulk) : '--'}</Text>
            <Text style={styles.statLabel}>أقل سعر جملة</Text>
          </View>
        </View>

        <ScrollView horizontal inverted={isRTL} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersRow}>
          {wholesaleGroups.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[styles.filterChip, selectedFilter === filter.id && styles.filterChipActive]}
              onPress={() => setSelectedFilter(filter.id)}
              activeOpacity={0.88}
            >
              <View style={[styles.filterIconWrap, selectedFilter === filter.id && styles.filterIconWrapActive]}>
                <Ionicons
                  name={filter.icon}
                  size={16}
                  color={selectedFilter === filter.id ? colors.white : filter.accent}
                />
              </View>
              <Text style={[styles.filterChipText, selectedFilter === filter.id && styles.filterChipTextActive]}>{filter.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {wholesaleOffers[1] && (
          <View style={styles.infoBanner}>
            <View style={styles.infoBadge}>
              <Ionicons name="briefcase-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.infoBannerText}>
              <Text style={styles.infoBannerTitle}>اختيار المجموعة يسرّع الطلب</Text>
              <Text style={styles.infoBannerSubtitle}>كل مجموعة تجمع المنتجات القريبة من احتياج واحد مثل التشغيل، الضيافة، أو التوريد الغذائي.</Text>
            </View>
          </View>
        )}

        {visibleGroups.map((group) => (
          <View key={group.id} style={styles.groupSection}>
            <View style={[styles.groupHeader, { flexDirection: rowDirection }]}>
              <TouchableOpacity style={[styles.groupAction, { borderColor: `${group.accent}22` }]} activeOpacity={0.85}>
                <Text style={[styles.groupActionText, { color: group.accent }]}>عرض الكل</Text>
              </TouchableOpacity>
              <View style={styles.groupHeaderText}>
                <Text style={[styles.groupTitle, { textAlign: textAlignStart }]}>{group.name}</Text>
                <Text style={[styles.groupSubtitle, { textAlign: textAlignStart }]}>{group.summary}</Text>
              </View>
              <View style={[styles.groupIcon, { backgroundColor: `${group.accent}16` }]}>
                <Ionicons name={group.icon} size={22} color={group.accent} />
              </View>
            </View>

            <ScrollView horizontal inverted={isRTL} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.groupProductsRow}>
              {group.items.map((product) => (
                <TouchableOpacity key={product.id} style={styles.productCard} activeOpacity={0.92} onPress={() => setSelectedProduct(product)}>
                  <Image source={{ uri: product.image }} style={styles.productImage} />
                  <View style={styles.productBody}>
                    <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                    <Text style={styles.productMeta}>الحد الأدنى {product.minOrder} {product.unit}</Text>
                    <View style={styles.priceBlock}>
                      <Text style={styles.priceEyebrow}>سعر الجملة</Text>
                      <PriceDisplay value={product.bulkPrice} color={colors.primary} size={16} iconSize={13} bold />
                    </View>
                    <View style={styles.productFooter}>
                      <Text style={styles.stockText}>المتوفر {product.stock}</Text>
                      <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(product)}>
                        <Ionicons name="bag-add-outline" size={16} color={colors.white} />
                        <Text style={styles.addButtonText}>أضف</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ))}

        {!visibleGroups.length && (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={44} color={colors.textTertiary} />
            <Text style={styles.emptyTitle}>لا توجد نتائج</Text>
            <Text style={styles.emptySubtitle}>جرّب البحث باسم مجموعة أخرى أو امسح الفلتر الحالي.</Text>
          </View>
        )}

        <View style={{ height: cartCount ? 120 : 48 }} />
      </ScrollView>

      {cartCount > 0 && (
        <TouchableOpacity style={[styles.cartBar, { bottom: Math.max(insets.bottom + 82, 96) }]} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.cartBarPrice}>{formatCurrency(cartTotal)}</Text>
          <Text style={styles.cartBarText}>مراجعة طلب الجملة</Text>
        </TouchableOpacity>
      )}

      <ItemDetailModal
        visible={!!selectedProduct}
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.card,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: { flex: 1, paddingHorizontal: spacing.md },
  headerTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 21 },
  headerSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
  cartButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  cartBadge: { position: 'absolute', top: -4, right: -2, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: colors.error, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  cartBadgeText: { color: colors.white, fontSize: 10, fontFamily: fonts.bold },
  content: { paddingHorizontal: spacing.md, paddingBottom: spacing.xl },
  searchWrap: { paddingTop: spacing.md, paddingBottom: spacing.md },
  searchBar: {
    backgroundColor: colors.card,
    borderRadius: 22,
    paddingHorizontal: spacing.md,
    minHeight: 54,
    alignItems: 'center',
    ...shadows.sm,
  },
  searchAction: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.sm,
  },
  searchInput: { flex: 1, color: colors.text, marginHorizontal: spacing.sm, fontFamily: fonts.regular },
  statsRow: { gap: spacing.sm, marginTop: spacing.md, marginBottom: spacing.md },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: spacing.md,
    alignItems: 'flex-end',
    ...shadows.sm,
  },
  statValue: { color: colors.text, fontFamily: fonts.bold, fontSize: 18, textAlign: 'right' },
  statLabel: { color: colors.textSecondary, fontSize: 12, marginTop: 4, textAlign: 'right' },
  filtersRow: { gap: spacing.sm, paddingBottom: spacing.md },
  filterChip: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.card,
    borderRadius: borderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 9,
    ...shadows.sm,
  },
  filterChipActive: { backgroundColor: colors.primary },
  filterIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.72)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIconWrapActive: { backgroundColor: 'rgba(255,255,255,0.16)' },
  filterChipText: { color: colors.textSecondary, fontFamily: fonts.semiBold, fontSize: 13 },
  filterChipTextActive: { color: colors.white },
  infoBanner: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: spacing.md,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  infoBadge: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBannerText: { flex: 1, marginHorizontal: spacing.md, alignItems: 'flex-end' },
  infoBannerTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 15, textAlign: 'right', alignSelf: 'stretch' },
  infoBannerSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 4, lineHeight: 18, textAlign: 'right', alignSelf: 'stretch' },
  groupSection: { marginBottom: spacing.lg },
  groupHeader: { alignItems: 'center', marginBottom: spacing.md },
  groupHeaderText: { flex: 1, marginHorizontal: spacing.md, alignItems: 'flex-end' },
  groupTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 18, alignSelf: 'stretch' },
  groupSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 4, alignSelf: 'stretch' },
  groupIcon: {
    width: 48,
    height: 48,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupAction: {
    minWidth: 84,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupActionText: { fontFamily: fonts.semiBold, fontSize: 13 },
  groupProductsRow: { gap: spacing.md, paddingBottom: 2 },
  productCard: {
    width: 230,
    backgroundColor: colors.card,
    borderRadius: 26,
    overflow: 'hidden',
    ...shadows.sm,
  },
  productImage: { width: '100%', height: 142, backgroundColor: colors.cardSecondary },
  productBody: { padding: spacing.md, alignItems: 'flex-end' },
  productName: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 15, lineHeight: 22, textAlign: 'right', alignSelf: 'stretch' },
  productMeta: { color: colors.textSecondary, fontSize: 12, marginTop: 4, textAlign: 'right', alignSelf: 'stretch' },
  priceBlock: { marginTop: spacing.md, alignItems: 'flex-end' },
  priceEyebrow: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 12, marginBottom: 4 },
  productFooter: { width: '100%', marginTop: spacing.md, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },
  stockText: { color: colors.textSecondary, fontSize: 12, fontFamily: fonts.semiBold },
  addButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  addButtonText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 13 },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.xxxl },
  emptyTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 18, marginTop: spacing.md },
  emptySubtitle: { color: colors.textSecondary, marginTop: spacing.sm, textAlign: 'center' },
  cartBar: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    backgroundColor: colors.text,
    borderRadius: 22,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.float,
  },
  cartBarText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 14, textAlign: 'right' },
  cartBarPrice: { color: colors.white, fontFamily: fonts.bold, fontSize: 16, textAlign: 'right' },
});

export default WholesaleScreen;
