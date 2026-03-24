import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';
import ItemDetailModal from '../components/ItemDetailModal';
import PriceDisplay from '../components/PriceDisplay';

const categories = [
  { id: 'all', name: 'الكل', icon: 'apps-outline' },
  { id: 'food', name: 'أغذية', icon: 'nutrition-outline' },
  { id: 'beverages', name: 'مشروبات', icon: 'cafe-outline' },
  { id: 'cleaning', name: 'تنظيف', icon: 'sparkles-outline' },
  { id: 'personal', name: 'عناية', icon: 'heart-outline' },
  { id: 'household', name: 'منزلية', icon: 'home-outline' },
];

const wholesaleProducts = [
  { id: 'w1', name: 'أرز بسمتي 5 كجم', category: 'food', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', minOrder: 10, price: 32, bulkPrice: 28, bulkMin: 50, unit: 'كيس', stock: 500 },
  { id: 'w2', name: 'زيت طهي 1.5 لتر', category: 'food', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', minOrder: 12, price: 20, bulkPrice: 17, bulkMin: 48, unit: 'عبوة', stock: 300 },
  { id: 'w3', name: 'سكر أبيض 2 كجم', category: 'food', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400', minOrder: 20, price: 12, bulkPrice: 10, bulkMin: 100, unit: 'كيس', stock: 800 },
  { id: 'w4', name: 'منظف أرضيات 5 لتر', category: 'cleaning', image: 'https://images.unsplash.com/photo-1585837575652-2c90698b7f1f?w=400', minOrder: 6, price: 25, bulkPrice: 20, bulkMin: 24, unit: 'جركن', stock: 200 },
];

const wholesaleOffers = [
  {
    id: 'offer-1',
    title: 'خصومات الجملة',
    subtitle: 'أسعار أفضل للطلبات الكبيرة والعقود الشهرية',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900',
    overlay: ['rgba(218,60,87,0.9)', 'rgba(255,141,160,0.42)'],
  },
  {
    id: 'offer-2',
    title: 'توريد أعمال',
    subtitle: 'حلول للمكاتب والمطاعم والمتاجر داخل المملكة',
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

  const filteredProducts = useMemo(() => {
    return wholesaleProducts.filter((product) => {
      const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = selectedFilter === 'all' || product.category === selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFilter]);

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
          <Text style={[styles.headerTitle, { textAlign: textAlignStart }]}>خدمات الجملة</Text>
          <Text style={[styles.headerSubtitle, { textAlign: textAlignStart }]}>توريد للمطاعم والمتاجر والمكاتب</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartButton}>
          <Ionicons name="bag-handle-outline" size={22} color={colors.white} />
          {cartCount > 0 && <View style={styles.cartBadge}><Text style={styles.cartBadgeText}>{cartCount}</Text></View>}
        </TouchableOpacity>
      </View>

      <View style={styles.searchWrap}>
        <View style={[styles.searchBar, { flexDirection: rowDirection }]}>
          <TouchableOpacity style={styles.searchAction}>
            <Ionicons name="options-outline" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
          <Ionicons name="search-outline" size={20} color={colors.textTertiary} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { textAlign: textAlignStart }]}
            placeholder="ابحث عن منتج جملة"
            placeholderTextColor={colors.textTertiary}
          />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.filtersRow, { flexDirection: rowDirection }]}>
        {categories.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[styles.filterChip, selectedFilter === filter.id && styles.filterChipActive]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <View style={[styles.filterIconWrap, selectedFilter === filter.id && styles.filterIconWrapActive]}>
              <Ionicons
                name={filter.icon}
                size={16}
                color={selectedFilter === filter.id ? colors.white : colors.textSecondary}
              />
            </View>
            <Text style={[styles.filterChipText, selectedFilter === filter.id && styles.filterChipTextActive]}>{filter.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={[styles.infoBanner, { flexDirection: rowDirection }]}>
        <Text style={styles.infoBannerValue}>حتى 25%</Text>
        <View style={styles.infoBannerText}>
          <Text style={[styles.infoBannerTitle, { textAlign: textAlignStart }]}>أسعار خاصة للطلبات الكبيرة</Text>
          <Text style={[styles.infoBannerSubtitle, { textAlign: textAlignStart }]}>كل منتج يوضح حد الطلب وسعر الجملة بوضوح.</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.offersRow, { flexDirection: rowDirection }]}>
          {wholesaleOffers.map((offer) => (
            <TouchableOpacity key={offer.id} style={styles.offerCard} activeOpacity={0.9}>
              <Image source={{ uri: offer.image }} style={styles.offerImage} />
              <View style={[styles.offerOverlay, { backgroundColor: 'transparent' }]}>
                <Text style={styles.offerTitle}>{offer.title}</Text>
                <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {filteredProducts.map((product) => (
          <TouchableOpacity key={product.id} style={[styles.productRow, { flexDirection: rowDirection }]} onPress={() => setSelectedProduct(product)}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productBody}>
              <View style={[styles.productTop, { flexDirection: rowDirection }]}>
                <TouchableOpacity onPress={() => Alert.alert('المفضلة', 'تم حفظ المنتج في المفضلة.')}>
                  <Ionicons name="heart-outline" size={20} color={colors.textTertiary} />
                </TouchableOpacity>
                <View style={styles.productInfo}>
                  <Text style={[styles.productName, { textAlign: textAlignStart }]}>{product.name}</Text>
                  <Text style={[styles.productDetails, { textAlign: textAlignStart }]}>الحد الأدنى {product.minOrder} {product.unit} • المتوفر {product.stock}</Text>
                </View>
              </View>
              <View style={[styles.productBottom, { flexDirection: rowDirection }]}>
                <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(product)}>
                  <Ionicons name="bag-add-outline" size={18} color={colors.white} />
                  <Text style={styles.addButtonText}>أضف</Text>
                </TouchableOpacity>
                <View style={styles.priceWrap}>
                  <View style={styles.bulkPriceRow}>
                    <Text style={styles.bulkPriceLabel}>سعر الجملة</Text>
                    <PriceDisplay value={product.bulkPrice} color={colors.primary} size={16} iconSize={13} bold />
                  </View>
                  <View style={styles.unitPriceRow}>
                    <Text style={styles.priceLabel}>سعر الوحدة</Text>
                    <PriceDisplay value={product.price} muted size={13} iconSize={11} />
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: cartCount ? 120 : 40 }} />
      </ScrollView>

      {cartCount > 0 && (
        <TouchableOpacity style={[styles.cartBar, { bottom: Math.max(insets.bottom + 82, 96) }]} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.cartBarPrice}>{formatCurrency(cartTotal)}</Text>
          <Text style={styles.cartBarText}>الانتقال إلى السلة</Text>
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
  header: { backgroundColor: colors.card, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.md, paddingBottom: spacing.md },
  headerButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.cardSecondary, alignItems: 'center', justifyContent: 'center' },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 20 },
  headerSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
  cartButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  cartBadge: { position: 'absolute', top: -4, right: -2, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: colors.error, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  cartBadgeText: { color: colors.white, fontSize: 10, fontFamily: fonts.bold },
  searchWrap: { paddingHorizontal: spacing.md, paddingTop: spacing.md },
  searchBar: { backgroundColor: colors.card, borderRadius: 22, paddingHorizontal: spacing.md, minHeight: 52, flexDirection: 'row-reverse', alignItems: 'center', ...shadows.sm },
  searchAction: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  searchInput: { flex: 1, textAlign: 'right', color: colors.text, marginHorizontal: spacing.sm },
  filtersRow: { gap: spacing.sm, paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  filterChip: { flexDirection: 'row-reverse', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.card, borderRadius: borderRadius.full, paddingHorizontal: 10, paddingVertical: 8, ...shadows.sm },
  filterChipActive: { backgroundColor: colors.primary },
  filterIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIconWrapActive: {
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  filterChipText: { color: colors.textSecondary, fontFamily: fonts.semiBold, fontSize: 13 },
  filterChipTextActive: { color: colors.white },
  infoBanner: { marginHorizontal: spacing.md, backgroundColor: colors.card, borderRadius: 24, padding: spacing.md, flexDirection: 'row-reverse', alignItems: 'center', ...shadows.sm },
  infoBannerValue: { color: colors.primary, fontFamily: fonts.bold, fontSize: 26 },
  infoBannerText: { flex: 1, marginRight: spacing.md, alignItems: 'flex-end' },
  infoBannerTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 15 },
  infoBannerSubtitle: { color: colors.textSecondary, fontSize: 12, textAlign: 'right', marginTop: 4, lineHeight: 18 },
  content: { paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.xl },
  offersRow: { gap: spacing.md, paddingBottom: spacing.md },
  offerCard: { width: 260, height: 148, borderRadius: 26, overflow: 'hidden', ...shadows.sm },
  offerImage: { width: '100%', height: '100%' },
  offerOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'flex-end', padding: spacing.md, backgroundColor: 'rgba(17,16,17,0.28)' },
  offerTitle: { color: colors.white, fontFamily: fonts.bold, fontSize: 22, textAlign: 'right' },
  offerSubtitle: { color: 'rgba(255,255,255,0.88)', fontSize: 12, marginTop: 4, textAlign: 'right', lineHeight: 18 },
  productRow: { backgroundColor: colors.card, borderRadius: 24, padding: spacing.md, marginBottom: spacing.md, flexDirection: 'row-reverse', ...shadows.sm },
  productImage: { width: 96, height: 96, borderRadius: 20, backgroundColor: colors.cardSecondary },
  productBody: { flex: 1, marginRight: spacing.md, justifyContent: 'space-between' },
  productTop: { flexDirection: 'row-reverse', justifyContent: 'space-between' },
  productInfo: { flex: 1, alignItems: 'flex-end', marginLeft: spacing.sm },
  productName: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 16, textAlign: 'right' },
  productDetails: { color: colors.textSecondary, fontSize: 12, marginTop: 4, textAlign: 'right', lineHeight: 18 },
  productBottom: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },
  addButton: { flexDirection: 'row-reverse', alignItems: 'center', gap: 6, backgroundColor: colors.primary, borderRadius: borderRadius.full, paddingHorizontal: 14, paddingVertical: 10 },
  addButtonText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 13 },
  priceWrap: { alignItems: 'flex-end' },
  bulkPriceRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: spacing.xs },
  bulkPriceLabel: { color: colors.primary, fontFamily: fonts.bold, fontSize: 14 },
  unitPriceRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: spacing.xs, marginTop: 4 },
  priceLabel: { color: colors.textSecondary, fontSize: 12 },
  cartBar: { position: 'absolute', left: spacing.md, right: spacing.md, backgroundColor: colors.text, borderRadius: 22, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', ...shadows.float },
  cartBarText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 14 },
  cartBarPrice: { color: colors.white, fontFamily: fonts.bold, fontSize: 16 },
});

export default WholesaleScreen;
