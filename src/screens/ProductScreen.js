import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';
import { products } from '../data/staticData';
import { useApp } from '../context/AppContext';

const ProductScreen = ({ navigation }) => {
  const { isRTL, addToCart, cartCount } = useApp();
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const filters = [
    { id: 'الكل', icon: 'apps', label: 'الكل' },
    { id: 'اطعمة', icon: 'fast-food', label: 'طعام' },
    { id: 'البان', icon: 'wine', label: 'ألبان' },
    { id: 'عنايه شخصية', icon: 'sparkles', label: 'عناية' },
    { id: 'مشروبات', icon: 'water', label: 'مشروبات' },
    { id: 'حلويات', icon: 'ice-cream', label: 'حلويات' },
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

  return (
    <View style={styles.container}>
      {/* Header with Safe Area */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.sm) }]}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>أسواق النخبة</Text>
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

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
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

        {/* Filters Section - Redesigned */}
        <View style={styles.filtersSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContent}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterChip,
                  selectedFilter === filter.id && styles.filterChipActive,
                  selectedFilter === filter.id && { backgroundColor: colors.primary },
                ]}
                onPress={() => setSelectedFilter(filter.id)}
                activeOpacity={0.8}
              >
                <Ionicons 
                  name={filter.icon} 
                  size={18} 
                  color={selectedFilter === filter.id ? colors.white : colors.textSecondary} 
                />
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === filter.id && styles.filterTextActive,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

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
        </View>

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <TouchableOpacity 
              key={product.id} 
              style={styles.productCard}
              activeOpacity={0.8}
              onPress={() => {}}
            >
              <View style={styles.productImageContainer}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                {product.discount && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{product.discount}%</Text>
                  </View>
                )}
                <TouchableOpacity style={styles.wishlistBtn}>
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
                    onPress={() => {
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1,
                      });
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

        {/* Bottom spacing for cart summary */}
        <View style={{ height: cartCount > 0 ? 80 : 20 }} />
      </ScrollView>

      {/* Cart Summary - Floating */}
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
  // Filters Section - Redesigned
  filtersSection: {
    marginBottom: spacing.md,
  },
  filtersContent: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
    ...shadows.sm,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    ...shadows.md,
  },
  filterText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  filterTextActive: {
    color: colors.white,
    fontWeight: '700',
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
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.sm,
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
  // Cart Summary - Floating
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
