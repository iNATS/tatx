import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';
import ItemDetailModal from '../components/ItemDetailModal';
import PriceDisplay from '../components/PriceDisplay';

const productFilters = [
  { id: 'all', label: 'الكل' },
  { id: 'مشروبات', label: 'مشروبات' },
  { id: 'حلويات', label: 'حلويات' },
  { id: 'البان', label: 'ألبان' },
  { id: 'طعام', label: 'مؤن' },
  { id: 'عنايه شخصية', label: 'عناية' },
];

const ProductScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const {
    addToCart,
    cartCount,
    cartTotal,
    formatCurrency,
    rowDirection,
    textAlignStart,
    isRTL,
    products,
  } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const backIcon = isRTL ? 'arrow-forward' : 'arrow-back';

  const featuredDeals = useMemo(
    () => products.filter((product) => product.oldPrice).concat(products.filter((product) => !product.oldPrice)).slice(0, 6),
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesFilter = selectedFilter === 'all' || product.category === selectedFilter;
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [products, searchQuery, selectedFilter]);

  return (
    <View style={styles.container}>
      {/* Header - Back on RIGHT, Cart on LEFT */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home'))}
          style={styles.headerButton}
        >
          <Ionicons name="arrow-forward" size={22} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>المتجر</Text>
          <Text style={styles.headerSubtitle}>منتجات المنصة اليومية في مكان واحد</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartButton}>
          <Ionicons name="bag-handle-outline" size={22} color={colors.white} />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.content, { paddingBottom: 150 }]}>
        {/* Search Bar - Icon on RIGHT */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={colors.textTertiary} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            placeholder="ابحث عن منتج أو نوع المنتج"
            placeholderTextColor={colors.textTertiary}
          />
          <TouchableOpacity style={styles.searchFilterButton} onPress={() => setSelectedFilter('all')}>
            <Ionicons name="options-outline" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Filters - Scroll from RIGHT */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersRow}>
          {productFilters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[styles.filterChip, selectedFilter === filter.id && styles.filterChipActive]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Text style={[styles.filterText, selectedFilter === filter.id && styles.filterTextActive]}>{filter.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={[styles.heroCard, { flexDirection: rowDirection }]}>
          <View style={styles.heroBody}>
            <Text style={[styles.heroTitle, { textAlign: textAlignStart }]}>منتجات مختارة يوميًا</Text>
            <Text style={[styles.heroSubtitle, { textAlign: textAlignStart }]}>
              تصفح منتجات المنصة مباشرة بدون متاجر أو صفحات بائعين داخل هذه الشاشة.
            </Text>
          </View>
          <View style={styles.heroBadge}>
            <Ionicons name="sparkles-outline" size={18} color={colors.primary} />
          </View>
        </View>

        <View style={[styles.sectionHeader, { flexDirection: rowDirection }]}>
          <Text style={styles.sectionTitle}>عروض اليوم</Text>
          <TouchableOpacity onPress={() => setSelectedFilter('all')}>
            <Text style={styles.sectionLink}>إعادة ضبط</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal inverted={isRTL} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalRow}>
          {featuredDeals.map((product) => (
            <TouchableOpacity
              key={`deal-${product.id}`}
              style={styles.dealCard}
              activeOpacity={0.9}
              onPress={() => setSelectedProduct(product)}
            >
              <Image source={{ uri: product.image }} style={styles.dealImage} />
              <View style={styles.dealContent}>
                <Text style={[styles.dealName, { textAlign: textAlignStart }]} numberOfLines={2}>{product.name}</Text>
                <Text style={[styles.dealMeta, { textAlign: textAlignStart }]}>{product.category}</Text>
                <View style={[styles.dealFooter, { flexDirection: rowDirection }]}>
                  <View style={styles.dealPriceWrap}>
                    {!!product.oldPrice && <PriceDisplay value={product.oldPrice} muted strike size={12} iconSize={10} />}
                    <PriceDisplay value={product.price} color={colors.primary} size={16} iconSize={13} bold />
                  </View>
                  <TouchableOpacity style={styles.dealButton} onPress={() => setSelectedProduct(product)}>
                    <Ionicons name="bag-add-outline" size={16} color={colors.white} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={[styles.sectionHeader, { flexDirection: rowDirection }]}>
          <Text style={styles.sectionTitle}>منتجات المنصة</Text>
          <TouchableOpacity onPress={() => setSelectedFilter('all')}>
            <Text style={styles.sectionLink}>كل المنتجات</Text>
          </TouchableOpacity>
        </View>
        {filteredProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={[styles.productRow, { flexDirection: rowDirection }]}
            onPress={() => setSelectedProduct(product)}
            activeOpacity={0.9}
          >
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productBody}>
              <View style={[styles.productTop, { flexDirection: rowDirection }]}>
                <View style={styles.productInfo}>
                  <Text style={[styles.productName, { textAlign: textAlignStart }]}>{product.name}</Text>
                  <Text style={[styles.productCategory, { textAlign: textAlignStart }]}>
                    {product.category} • {product.unit}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => Alert.alert('المفضلة', 'تم حفظ المنتج في المفضلة.')}>
                  <Ionicons name="heart-outline" size={20} color={colors.textTertiary} />
                </TouchableOpacity>
              </View>
              <View style={[styles.productBottom, { flexDirection: rowDirection }]}>
                <View style={styles.priceWrap}>
                  {!!product.oldPrice && <PriceDisplay value={product.oldPrice} muted strike size={12} iconSize={10} />}
                  <PriceDisplay value={product.price} color={colors.primary} size={17} iconSize={14} bold />
                </View>
                <TouchableOpacity style={styles.addButton} onPress={() => setSelectedProduct(product)}>
                  <Ionicons name="bag-add-outline" size={18} color={colors.white} />
                  <Text style={styles.addButtonText}>عرض وإضافة</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {!filteredProducts.length && (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color={colors.textTertiary} />
            <Text style={styles.emptyTitle}>لا توجد نتائج</Text>
            <Text style={styles.emptySubtitle}>جرّب تغيير كلمة البحث أو تصفية القسم.</Text>
          </View>
        )}
      </ScrollView>

      {cartCount > 0 && (
        <TouchableOpacity style={[styles.cartBar, { bottom: Math.max(insets.bottom + 82, 96), flexDirection: rowDirection }]} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.cartBarPrice}>{formatCurrency(cartTotal)}</Text>
          <Text style={styles.cartBarText}>مراجعة السلة • {cartCount} عناصر</Text>
        </TouchableOpacity>
      )}

      <ItemDetailModal
        visible={!!selectedProduct}
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.background,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1, borderColor: colors.borderLight,
  },
  headerCenter: { flex: 1, paddingHorizontal: spacing.md },
  headerTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 22 },
  headerSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 3 },
  cartButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1, borderColor: colors.borderLight,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: { color: colors.white, fontSize: 10, fontFamily: fonts.bold },
  content: { paddingHorizontal: spacing.md },
  searchBar: {
    marginTop: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: 24,
    minHeight: 56,
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  searchFilterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: { flex: 1, color: colors.text, fontFamily: fonts.regular, marginHorizontal: spacing.sm },
  filtersRow: { gap: spacing.sm, paddingVertical: spacing.md },
  filterChip: { backgroundColor: colors.card, borderRadius: borderRadius.full, paddingHorizontal: spacing.md, paddingVertical: 10, borderWidth: 1, borderColor: colors.borderLight },
  filterChipActive: { backgroundColor: colors.primary },
  filterText: { color: colors.textSecondary, fontFamily: fonts.semiBold, fontSize: 13 },
  filterTextActive: { color: colors.white },
  heroCard: {
    backgroundColor: colors.card,
    borderRadius: 26,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.borderLight,
  },
  heroBadge: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: '#FFF1F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBody: { flex: 1, width: '100%', marginHorizontal: spacing.md, alignItems: 'flex-end' },
  heroTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 17, textAlign: 'right', alignSelf: 'stretch' },
  heroSubtitle: { color: colors.textSecondary, fontSize: 13, marginTop: 4, lineHeight: 21, textAlign: 'right', alignSelf: 'stretch' },
  sectionHeader: { justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md, marginBottom: spacing.md },
  sectionTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 18, textAlign: 'right' },
  sectionLink: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 13, textAlign: 'right' },
  horizontalRow: { gap: spacing.md, paddingBottom: spacing.sm },
  dealCard: { width: 220, backgroundColor: colors.card, borderRadius: 24, overflow: 'hidden', writingDirection: 'rtl', borderWidth: 1, borderColor: colors.borderLight },
  dealImage: { width: '100%', height: 130, backgroundColor: colors.cardSecondary },
  dealContent: { width: '100%', padding: spacing.md, alignItems: 'flex-end' },
  dealName: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 15, lineHeight: 22, textAlign: 'right', alignSelf: 'stretch' },
  dealMeta: { color: colors.textSecondary, fontSize: 12, marginTop: 4, textAlign: 'right', alignSelf: 'stretch' },
  dealFooter: { justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md },
  dealButton: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  dealPriceWrap: { alignItems: 'flex-end' },
  productRow: { backgroundColor: colors.card, borderRadius: 24, padding: spacing.md, marginBottom: spacing.md, writingDirection: 'rtl', borderWidth: 1, borderColor: colors.borderLight },
  productImage: { width: 96, height: 96, borderRadius: 20, backgroundColor: colors.cardSecondary },
  productBody: { flex: 1, width: '100%', marginHorizontal: spacing.md, justifyContent: 'space-between', alignItems: 'flex-end' },
  productTop: { justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' },
  productInfo: { flex: 1, width: '100%', marginHorizontal: spacing.sm, alignItems: 'flex-end' },
  productName: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 16, textAlign: 'right', alignSelf: 'stretch' },
  productCategory: { color: colors.textSecondary, fontSize: 12, marginTop: 4, textAlign: 'right', alignSelf: 'stretch' },
  productBottom: { justifyContent: 'space-between', alignItems: 'center' },
  addButton: { flexDirection: 'row-reverse', alignItems: 'center', gap: 6, backgroundColor: colors.primary, borderRadius: borderRadius.full, paddingHorizontal: 14, paddingVertical: 10 },
  addButtonText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 13 },
  priceWrap: { alignItems: 'flex-end' },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.xxxl },
  emptyTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 18, marginTop: spacing.md },
  emptySubtitle: { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.sm },
  cartBar: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    backgroundColor: colors.text,
    borderRadius: 24,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1, borderColor: colors.borderLight,
  },
  cartBarText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 14, textAlign: 'right' },
  cartBarPrice: { color: colors.white, fontFamily: fonts.bold, fontSize: 16, textAlign: 'right' },
});

export default ProductScreen;
