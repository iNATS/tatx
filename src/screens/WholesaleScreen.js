import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';

const WholesaleScreen = ({ navigation }) => {
  const { isRTL, addToCart, cartCount } = useApp();
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [quantity, setQuantity] = useState(10);

  // Wholesale categories
  const categories = [
    { id: 'all', name: 'الكل', icon: 'apps' },
    { id: 'food', name: 'أغذية', icon: 'fast-food' },
    { id: 'beverages', name: 'مشروبات', icon: 'water' },
    { id: 'cleaning', name: 'تنظيف', icon: 'water' },
    { id: 'personal', name: 'عناية شخصية', icon: 'sparkles' },
    { id: 'household', name: 'أدوات منزلية', icon: 'home' },
  ];

  // Wholesale products with bulk pricing
  const wholesaleProducts = [
    {
      id: 'w1',
      name: 'أرز بسمتي 5 كجم',
      category: 'food',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
      minOrder: 10,
      price: 32,
      bulkPrice: 28,
      bulkMin: 50,
      unit: 'كجم',
      stock: 500,
      rating: 4.7,
    },
    {
      id: 'w2',
      name: 'زيت طهي 1.5 لتر',
      category: 'food',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
      minOrder: 12,
      price: 20,
      bulkPrice: 17,
      bulkMin: 48,
      unit: 'عبوة',
      stock: 300,
      rating: 4.5,
    },
    {
      id: 'w3',
      name: 'سكر أبيض 2 كجم',
      category: 'food',
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400',
      minOrder: 20,
      price: 12,
      bulkPrice: 10,
      bulkMin: 100,
      unit: 'كجم',
      stock: 800,
      rating: 4.6,
    },
    {
      id: 'w4',
      name: 'معجون طماطم 400جم',
      category: 'food',
      image: 'https://images.unsplash.com/photo-1598511726623-d2e988e5e814?w=400',
      minOrder: 24,
      price: 8,
      bulkPrice: 6,
      bulkMin: 96,
      unit: 'علبة',
      stock: 600,
      rating: 4.4,
    },
    {
      id: 'w5',
      name: 'منظف أرضيات 5 لتر',
      category: 'cleaning',
      image: 'https://images.unsplash.com/photo-1585837575652-2c90698b7f1f?w=400',
      minOrder: 6,
      price: 25,
      bulkPrice: 20,
      bulkMin: 24,
      unit: 'جركن',
      stock: 200,
      rating: 4.8,
    },
    {
      id: 'w6',
      name: 'مناديل ورقية 100 منديل',
      category: 'household',
      image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400',
      minOrder: 30,
      price: 15,
      bulkPrice: 12,
      bulkMin: 120,
      unit: 'علبة',
      stock: 1000,
      rating: 4.5,
    },
  ];

  const filteredProducts = wholesaleProducts.filter((product) => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || product.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setQuantity(product.minOrder);
    setShowProductModal(true);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      const finalPrice = quantity >= selectedProduct.bulkMin 
        ? selectedProduct.bulkPrice 
        : selectedProduct.price;
      
      addToCart({
        ...selectedProduct,
        quantity: quantity,
        wholesale: true,
        finalPrice: finalPrice,
      });
      setShowProductModal(false);
    }
  };

  const calculateTotal = () => {
    if (!selectedProduct) return 0;
    const price = quantity >= selectedProduct.bulkMin 
      ? selectedProduct.bulkPrice 
      : selectedProduct.price;
    return (price * quantity).toFixed(2);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.sm) }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>جملة تاتكس</Text>
          <Text style={styles.headerSubtitle}>أسعار خاصة للكميات</Text>
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
            placeholder="ابحث عن منتج جملة..."
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Category Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {categories.map((filter) => (
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

      {/* Wholesale Info Banner */}
      <View style={styles.infoBanner}>
        <Ionicons name="pricetag" size={24} color={colors.primary} />
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>أسعار الجملة</Text>
          <Text style={styles.infoText}>خصم يصل إلى 25% للطلبات الكبيرة</Text>
        </View>
        <View style={styles.infoBadge}>
          <Text style={styles.infoBadgeText}>25%</Text>
        </View>
      </View>

      {/* Products Grid - 2 Columns */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
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
                <View style={styles.wholesaleBadge}>
                  <Text style={styles.wholesaleBadgeText}>جملة</Text>
                </View>
                <TouchableOpacity 
                  style={styles.wishlistBtn}
                  activeOpacity={0.8}
                >
                  <Ionicons name="heart-outline" size={18} color={colors.white} />
                </TouchableOpacity>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                <View style={styles.wholesalePrice}>
                  <Text style={styles.wholesaleLabel}>من {product.minOrder} {product.unit}</Text>
                  <Text style={styles.productPrice}>{product.price} ر.س</Text>
                </View>
                <View style={styles.bulkPrice}>
                  <Text style={styles.bulkLabel}>+{product.bulkMin} {product.unit}: {product.bulkPrice} ر.س</Text>
                </View>
                <View style={styles.stockInfo}>
                  <Ionicons name="checkmark-circle" size={14} color={colors.success} />
                  <Text style={styles.stockText}>متوفر: {product.stock}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Product Modal */}
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
                <View style={styles.modalImageContainer}>
                  <Image source={{ uri: selectedProduct.image }} style={styles.modalImage} />
                  <View style={styles.modalWholesaleBadge}>
                    <Text style={styles.modalWholesaleText}>سعر الجملة</Text>
                  </View>
                </View>

                <View style={styles.modalInfo}>
                  <Text style={styles.modalName}>{selectedProduct.name}</Text>
                  
                  <View style={styles.priceTable}>
                    <View style={styles.priceRow}>
                      <Text style={styles.priceRowLabel}>سعر القطعة</Text>
                      <Text style={styles.priceRowValue}>{selectedProduct.price} ر.س</Text>
                    </View>
                    <View style={[styles.priceRow, styles.priceRowHighlight]}>
                      <Text style={styles.priceRowLabel}>سعر الجملة (+{selectedProduct.bulkMin})</Text>
                      <Text style={styles.priceRowValueHighlight}>{selectedProduct.bulkPrice} ر.س</Text>
                    </View>
                    <View style={styles.priceRow}>
                      <Text style={styles.priceRowLabel}>الحد الأدنى</Text>
                      <Text style={styles.priceRowValue}>{selectedProduct.minOrder} {selectedProduct.unit}</Text>
                    </View>
                  </View>

                  <View style={styles.quantityContainer}>
                    <Text style={styles.quantityLabel}>الكمية ({selectedProduct.unit})</Text>
                    <View style={styles.quantitySelector}>
                      <TouchableOpacity 
                        style={[styles.quantityButton, quantity <= selectedProduct.minOrder && styles.quantityButtonDisabled]}
                        onPress={() => quantity > selectedProduct.minOrder && setQuantity(quantity - 1)}
                      >
                        <Ionicons name="remove" size={20} color={quantity <= selectedProduct.minOrder ? colors.textTertiary : colors.white} />
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

                  {quantity >= selectedProduct.bulkMin && (
                    <View style={styles.bulkDiscountBadge}>
                      <Ionicons name="pricetag" size={18} color={colors.success} />
                      <Text style={styles.bulkDiscountText}>خصم الجملة مفعل!</Text>
                    </View>
                  )}

                  <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>المجموع</Text>
                    <Text style={styles.totalValue}>{calculateTotal()} ر.س</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.modalAddButton}
                    onPress={handleAddToCart}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.card,
  },
  headerButton: {
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.card,
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
    gap: spacing.sm,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
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
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '10',
    margin: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    gap: spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  infoText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  infoBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  infoBadgeText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.white,
  },
  scrollContent: {
    padding: spacing.sm,
    paddingBottom: 40,
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
    height: 140,
    backgroundColor: colors.cardSecondary,
  },
  wholesaleBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.success,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  wholesaleBadgeText: {
    fontSize: 10,
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
  wholesalePrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  wholesaleLabel: {
    fontSize: 11,
    color: colors.textTertiary,
  },
  productPrice: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primary,
  },
  bulkPrice: {
    backgroundColor: colors.success + '10',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    marginBottom: spacing.sm,
  },
  bulkLabel: {
    fontSize: 11,
    color: colors.success,
    fontWeight: '600',
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stockText: {
    fontSize: 11,
    color: colors.success,
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
    height: 220,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.cardSecondary,
  },
  modalWholesaleBadge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: colors.success,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  modalWholesaleText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.white,
  },
  modalInfo: {
    padding: spacing.md,
  },
  modalName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'right',
  },
  priceTable: {
    backgroundColor: colors.cardSecondary,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  priceRowHighlight: {
    borderBottomWidth: 0,
    backgroundColor: colors.success + '10',
    marginHorizontal: -spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
  },
  priceRowLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  priceRowValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  priceRowValueHighlight: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.success,
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
    width: 60,
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
  bulkDiscountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '15',
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  bulkDiscountText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.success,
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
    fontSize: 26,
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

export default WholesaleScreen;
