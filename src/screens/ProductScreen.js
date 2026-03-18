import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';
import { products } from '../data/staticData';
import { useApp } from '../context/AppContext';

const ProductScreen = ({ navigation }) => {
  const { isRTL, addToCart, cartCount } = useApp();
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Simple filter tabs
  const filters = [
    { id: 'all', name: 'الكل', icon: 'apps' },
    { id: 'food', name: 'طعام', icon: 'fast-food' },
    { id: 'dairy', name: 'ألبان', icon: 'wine' },
    { id: 'care', name: 'عناية', icon: 'sparkles' },
    { id: 'drinks', name: 'مشروبات', icon: 'water' },
    { id: 'sweets', name: 'حلويات', icon: 'ice-cream' },
  ];

  // Filter products by search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
      product.category.toLowerCase() === selectedFilter ||
      (selectedFilter === 'food' && ['طعام', 'اطعمة'].includes(product.category)) ||
      (selectedFilter === 'dairy' && product.category === 'البان') ||
      (selectedFilter === 'care' && product.category === 'عنايه شخصية') ||
      (selectedFilter === 'drinks' && product.category === 'مشروبات') ||
      (selectedFilter === 'sweets' && product.category === 'حلويات');
    
    return matchesSearch && matchesFilter;
  });

  const cartTotal = cartCount > 0 ? products.reduce((sum, p) => sum + p.price, 0) : 0;

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowProductModal(true);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart({
        ...selectedProduct,
        quantity: quantity,
      });
      setShowProductModal(false);
      setQuantity(1);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text !== '') {
      setSelectedFilter('all');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.headerContainer, { paddingTop: Math.max(insets.top, 8) }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color={colors.primary} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>تاتكس ماركت</Text>
            <Text style={styles.headerSubtitle}>تسوق بسهولة</Text>
          </View>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Cart')} 
            style={styles.cartButton}
            activeOpacity={0.8}
          >
            <LinearGradient colors={[colors.primary, colors.primaryDark]} style={styles.cartButtonGradient}>
              <Ionicons name="cart" size={22} color={colors.white} />
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartCount}</Text>
                </View>
              )}
            </LinearGradient>
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
              onChangeText={handleSearch}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch('')}>
                <Ionicons name="close-circle" size={20} color={colors.textTertiary} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Simple Filter Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                selectedFilter === filter.id && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter(filter.id)}
              activeOpacity={0.8}
            >
              <Ionicons 
                name={filter.icon} 
                size={18} 
                color={selectedFilter === filter.id ? colors.white : colors.textSecondary} 
              />
              <Text style={[
                styles.filterText,
                selectedFilter === filter.id && styles.filterTextActive,
              ]}>
                {filter.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Products Grid - 2 Columns */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.productsGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
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
                      <Text style={styles.discountText}>-{product.discount}%</Text>
                    </View>
                  )}
                  <TouchableOpacity 
                    style={styles.wishlistBtn}
                    activeOpacity={0.8}
                    onPress={(e) => e.stopPropagation()}
                  >
                    <Ionicons name="heart-outline" size={18} color={colors.white} />
                  </TouchableOpacity>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                  <View style={styles.productFooter}>
                    <View>
                      {product.oldPrice && (
                        <Text style={styles.productOldPrice}>{product.oldPrice}</Text>
                      )}
                      <Text style={styles.productPrice}>{product.price} ر.س</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.addButton}
                      activeOpacity={0.8}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleProductPress(product);
                      }}
                    >
                      <Ionicons name="add" size={20} color={colors.white} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color={colors.textTertiary} />
              <Text style={styles.emptyTitle}>لا توجد منتجات</Text>
              <Text style={styles.emptySubtitle}>جرب البحث عن شيء آخر</Text>
            </View>
          )}
        </View>

        {/* Bottom spacing */}
        <View style={{ height: cartCount > 0 ? 100 : 40 }} />
      </ScrollView>

      {/* Cart Summary */}
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

      {/* Product Detail Modal */}
      <Modal
        visible={showProductModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowProductModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            
            {selectedProduct && (
              <>
                {/* Product Image */}
                <View style={styles.modalImageContainer}>
                  <Image source={{ uri: selectedProduct.image }} style={styles.modalImage} />
                  {selectedProduct.discount && (
                    <View style={styles.modalDiscountBadge}>
                      <Text style={styles.modalDiscountText}>-{selectedProduct.discount}%</Text>
                    </View>
                  )}
                </View>

                {/* Product Info */}
                <View style={styles.modalInfo}>
                  <Text style={styles.modalName}>{selectedProduct.name}</Text>
                  <Text style={styles.modalDescription}>{selectedProduct.description || 'منتج عالي الجودة من تاتكس ماركت'}</Text>
                  
                  <View style={styles.modalMeta}>
                    <View style={styles.modalRating}>
                      <Ionicons name="star" size={18} color={colors.warning} />
                      <Text style={styles.modalRatingText}>{selectedProduct.rating || '4.5'}</Text>
                    </View>
                    <View style={styles.modalCategory}>
                      <Ionicons name="pricetag" size={16} color={colors.textTertiary} />
                      <Text style={styles.modalCategoryText}>{selectedProduct.category}</Text>
                    </View>
                  </View>

                  {/* Price */}
                  <View style={styles.modalPriceContainer}>
                    {selectedProduct.oldPrice && (
                      <Text style={styles.modalOldPrice}>{selectedProduct.oldPrice} ر.س</Text>
                    )}
                    <Text style={styles.modalPrice}>{selectedProduct.price} ر.س</Text>
                  </View>

                  {/* Quantity Selector */}
                  <View style={styles.quantityContainer}>
                    <Text style={styles.quantityLabel}>الكمية</Text>
                    <View style={styles.quantitySelector}>
                      <TouchableOpacity 
                        style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
                        onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                        disabled={quantity <= 1}
                      >
                        <Ionicons name="remove" size={20} color={quantity <= 1 ? colors.textTertiary : colors.white} />
                      </TouchableOpacity>
                      <View style={styles.quantityValue}>
                        <Text style={styles.quantityText}>{quantity}</Text>
                      </View>
                      <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => setQuantity(quantity + 1)}
                      >
                        <Ionicons name="add" size={20} color={colors.white} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Total */}
                  <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>المجموع</Text>
                    <Text style={styles.totalValue}>{(selectedProduct.price * quantity).toFixed(2)} ر.س</Text>
                  </View>

                  {/* Add to Cart Button */}
                  <TouchableOpacity
                    style={styles.modalAddButton}
                    onPress={handleAddToCart}
                    activeOpacity={0.8}
                  >
                    <LinearGradient colors={[colors.primary, colors.primaryDark]} style={styles.modalAddGradient}>
                      <Ionicons name="cart" size={22} color={colors.white} />
                      <Text style={styles.modalAddButtonText}>أضف للسلة</Text>
                      <Text style={styles.modalAddQuantity}>x{quantity}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
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
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  cartButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    ...shadows.md,
  },
  cartButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
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
    marginBottom: spacing.md,
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
    gap: spacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
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
  scrollContent: {
    padding: spacing.sm,
    paddingBottom: 120,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  productCard: {
    width: '49%',
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
    height: 150,
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
  wishlistBtn: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: spacing.md,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
    minHeight: 36,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primary,
  },
  productOldPrice: {
    fontSize: 11,
    color: colors.textTertiary,
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  emptyState: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.md,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  // Cart Summary
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
    fontSize: 17,
    fontWeight: '800',
    color: colors.white,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: borderRadius.xl * 1.5,
    borderTopRightRadius: borderRadius.xl * 1.5,
    maxHeight: '90%',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.gray,
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: spacing.md,
  },
  modalImageContainer: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  modalImage: {
    width: '100%',
    height: 250,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.cardSecondary,
  },
  modalDiscountBadge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: colors.error,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  modalDiscountText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.white,
  },
  modalInfo: {
    padding: spacing.md,
  },
  modalName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'right',
  },
  modalDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    textAlign: 'right',
    marginBottom: spacing.md,
  },
  modalMeta: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  modalRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  modalRatingText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  modalCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  modalCategoryText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  modalPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  modalPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
  },
  modalOldPrice: {
    fontSize: 16,
    color: colors.textTertiary,
    textDecorationLine: 'line-through',
  },
  quantityContainer: {
    marginBottom: spacing.lg,
  },
  quantityLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'right',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.md,
  },
  quantityButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonDisabled: {
    backgroundColor: colors.cardSecondary,
  },
  quantityValue: {
    width: 56,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.cardSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    marginBottom: spacing.md,
  },
  totalLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  modalAddButton: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  modalAddGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  modalAddButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  modalAddQuantity: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
});

export default ProductScreen;
