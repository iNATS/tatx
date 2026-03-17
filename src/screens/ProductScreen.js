import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';
import { products } from '../data/staticData';
import { useApp } from '../context/AppContext';
import FilterTabs from '../components/FilterTabs';
import ItemDetailModal from '../components/ItemDetailModal';

const ProductScreen = ({ navigation }) => {
  const { isRTL, addToCart, cartCount } = useApp();
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);

  const filters = [
    { id: 'الكل', label: 'الكل', icon: 'apps' },
    { id: 'اطعمة', label: 'طعام', icon: 'fast-food' },
    { id: 'البان', label: 'ألبان', icon: 'wine' },
    { id: 'عنايه شخصية', label: 'عناية', icon: 'sparkles' },
    { id: 'مشروبات', label: 'مشروبات', icon: 'water' },
    { id: 'حلويات', label: 'حلويات', icon: 'ice-cream' },
  ];

  const sortOptions = [
    { id: 'popular', label: 'الأكثر شعبية' },
    { id: 'price_low', label: 'السعر: الأقل' },
    { id: 'price_high', label: 'السعر: الأعلى' },
    { id: 'newest', label: 'الأحدث' },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesFilter = selectedFilter === 'الكل' || product.category === selectedFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const cartTotal = filteredProducts.reduce((sum, p) => sum + p.price, 0);

  const handleProductPress = (product) => {
    setSelectedItem(product);
    setShowItemModal(true);
  };

  const handleAddToCart = (itemWithDetails) => {
    addToCart(itemWithDetails);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.sm) }]}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>تاتكس ماركت</Text>
          <Text style={styles.subtitle}>تسوق من أفضل المتاجر</Text>
        </View>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Cart')}
          style={styles.cartButton}
          activeOpacity={0.8}
        >
          <Ionicons name="cart" size={22} color={colors.white} />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="ابحث عن منتج..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Tabs */}
      <FilterTabs 
        filters={filters}
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
      />

      {/* Sort Options */}
      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>ترتيب حسب:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.sortOptions}>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.sortChip,
                  sortBy === option.id && styles.sortChipActive,
                ]}
                onPress={() => setSortBy(option.id)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.sortText,
                    sortBy === option.id && styles.sortTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Products Grid */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsContent}
      >
        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <TouchableOpacity 
              key={product.id} 
              style={styles.productCard}
              activeOpacity={0.8}
              onPress={() => handleProductPress(product)}
            >
              <View style={styles.productImageContainer}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                {product.discount && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{product.discount}%</Text>
                  </View>
                )}
                <TouchableOpacity 
                  style={styles.wishlistBtn}
                  activeOpacity={0.8}
                >
                  <Ionicons name="heart-outline" size={18} color={colors.white} />
                </TouchableOpacity>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                <View style={styles.productFooter}>
                  <View>
                    <Text style={styles.productPrice}>{product.price} ر.س</Text>
                    {product.oldPrice && (
                      <Text style={styles.productOldPrice}>{product.oldPrice} ر.س</Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleProductPress(product);
                    }}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="add" size={18} color={colors.white} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom spacing */}
        <View style={{ height: cartCount > 0 ? 100 : 40 }} />
      </ScrollView>

      {/* Cart Summary */}
      {cartCount > 0 && (
        <TouchableOpacity
          style={[styles.cartSummary, { bottom: spacing.md }]}
          onPress={() => navigation.navigate('Cart')}
          activeOpacity={0.9}
        >
          <View style={styles.cartSummaryRight}>
            <View style={styles.cartIconWrapper}>
              <Ionicons name="cart" size={18} color={colors.white} />
              <Text style={styles.cartCount}>{cartCount}</Text>
            </View>
            <Text style={styles.cartSummaryText}>
              {cartCount} {cartCount === 1 ? 'منتج' : 'منتجات'}
            </Text>
          </View>
          <View style={styles.cartSummaryLeft}>
            <Text style={styles.cartSummaryTotal}>{cartTotal} ر.س</Text>
            <Ionicons name="arrow-forward" size={20} color={colors.white} />
          </View>
        </TouchableOpacity>
      )}

      {/* Item Detail Modal */}
      <ItemDetailModal
        visible={showItemModal}
        item={selectedItem}
        onClose={() => setShowItemModal(false)}
        onAddToCart={handleAddToCart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.white,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  cartButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    ...shadows.md,
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.white,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  // Search Section
  searchSection: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    height: 50,
    gap: spacing.sm,
    ...shadows.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  // Sort Row
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  sortLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  sortOptions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  sortChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
    ...shadows.sm,
  },
  sortChipActive: {
    backgroundColor: colors.primary + '15',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  sortText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  sortTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  // Products Grid
  productsContent: {
    padding: spacing.sm,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  productCard: {
    width: '48.5%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.md,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 140,
    backgroundColor: colors.grayLight,
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.error,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  discountText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.white,
  },
  wishlistBtn: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: spacing.md,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
    minHeight: 36,
    textAlign: 'right',
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  productOldPrice: {
    fontSize: 12,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  // Cart Summary
  cartSummary: {
    position: 'absolute',
    bottom: 0,
    left: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    ...shadows.lg,
  },
  cartSummaryRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  cartIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  cartCount: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.white,
    marginLeft: 2,
  },
  cartSummaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  cartSummaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  cartSummaryTotal: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default ProductScreen;
