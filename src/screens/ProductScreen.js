import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';
import { products } from '../data/staticData';
import { useApp } from '../context/AppContext';
import ItemDetailModal from '../components/ItemDetailModal';

const ProductScreen = ({ navigation }) => {
  const { isRTL, addToCart, cartCount } = useApp();
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);

  const filters = [
    { id: 'الكل', label: 'الكل', icon: 'apps', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200' },
    { id: 'اطعمة', label: 'طعام', icon: 'fast-food', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200' },
    { id: 'البان', label: 'ألبان', icon: 'wine', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200' },
    { id: 'عنايه شخصية', label: 'عناية', icon: 'sparkles', image: 'https://images.unsplash.com/photo-1556228720-19875c4d84b6?w=200' },
    { id: 'مشروبات', label: 'مشروبات', icon: 'water', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200' },
    { id: 'حلويات', label: 'حلويات', icon: 'ice-cream', image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=200' },
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
      {/* iOS 18 Header */}
      <View style={[styles.headerContainer, { paddingTop: Math.max(insets.top, 8) }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color={colors.primary} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>تاتكس ماركت</Text>
            <Text style={styles.headerSubtitle}>تسوق من أفضل المتاجر</Text>
          </View>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Cart')} 
            style={styles.cartButton}
            activeOpacity={0.8}
          >
            <Ionicons name="cart" size={24} color={colors.white} />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={colors.textTertiary} />
            <TextInput
              style={styles.searchInput}
              placeholder="ابحث عن منتج..."
              placeholderTextColor={colors.textTertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={colors.textTertiary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* Filter Pills with Images */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {filters.map((filter) => {
          const isSelected = selectedFilter === filter.id;
          return (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterCard,
                isSelected && styles.filterCardSelected,
              ]}
              onPress={() => setSelectedFilter(filter.id)}
              activeOpacity={0.85}
            >
              <Image source={{ uri: filter.image }} style={styles.filterImage} />
              <LinearGradient 
                colors={isSelected ? [colors.primary + 'DD', colors.primary + 'AA'] : ['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.4)']}
                style={styles.filterOverlay}
              />
              <View style={styles.filterContent}>
                <Ionicons name={filter.icon} size={20} color={colors.white} />
                <Text style={styles.filterText}>{filter.label}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

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
              activeOpacity={0.85}
              onPress={() => handleProductPress(product)}
            >
              <View style={styles.productImageContainer}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                {product.discount && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{product.discount}%</Text>
                  </View>
                )}
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.productGradient} />
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
                    {product.oldPrice && (
                      <Text style={styles.productOldPrice}>{product.oldPrice} ر.س</Text>
                    )}
                    <Text style={styles.productPrice}>{product.price} ر.س</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleProductPress(product);
                    }}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="add" size={20} color={colors.white} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom spacing */}
        <View style={{ height: cartCount > 0 ? 100 : 40 }} />
      </ScrollView>

      {/* Cart Summary - iOS Style */}
      {cartCount > 0 && (
        <TouchableOpacity
          style={[styles.cartSummary, { bottom: Math.max(insets.bottom, spacing.md) }]}
          onPress={() => navigation.navigate('Cart')}
          activeOpacity={0.9}
        >
          <LinearGradient colors={[colors.primary, colors.primaryDark]} style={styles.cartSummaryGradient} />
          <View style={styles.cartSummaryContent}>
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
  headerContainer: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  headerSubtitle: {
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
    minWidth: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: colors.card,
  },
  cartBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.white,
  },
  searchContainer: {
    marginBottom: spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardSecondary,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    height: 48,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  filtersContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.md,
    backgroundColor: colors.card,
    marginBottom: spacing.md,
  },
  filterCard: {
    width: 90,
    height: 90,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.md,
  },
  filterCardSelected: {
    ...shadows.lg,
  },
  filterImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  filterOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  filterContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  productsContent: {
    padding: spacing.sm,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  productCard: {
    width: '48.5%',
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 160,
    backgroundColor: colors.cardSecondary,
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.error,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
    zIndex: 10,
  },
  discountText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.white,
  },
  productGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  wishlistBtn: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  productInfo: {
    padding: spacing.md,
  },
  productName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
    minHeight: 40,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  productOldPrice: {
    fontSize: 12,
    color: colors.textTertiary,
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  addButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  cartSummary: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.xl,
  },
  cartSummaryGradient: {
    padding: spacing.md,
  },
  cartSummaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  cartCount: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.white,
    marginLeft: 2,
  },
  cartSummaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  cartSummaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  cartSummaryTotal: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.white,
  },
});

export default ProductScreen;
