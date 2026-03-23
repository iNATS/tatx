import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';
import { categories, restaurants } from '../data/staticData';
import { useApp } from '../context/AppContext';
import ItemDetailModal from '../components/ItemDetailModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { isRTL, user, addToCart } = useApp();
  const insets = useSafeAreaInsets();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(0);

  // TATX Services - Circular Profile Icon Style (No Background Images)
  const tatxServices = [
    { 
      id: 'taxi', 
      name: 'تاكسي', 
      icon: 'taxi', 
      screen: 'Taxi',
      color: colors.taxi
    },
    { 
      id: 'food', 
      name: 'طعام', 
      icon: 'fast-food', 
      screen: 'Category', 
      params: { name: 'طعام' },
      color: colors.food
    },
    { 
      id: 'market', 
      name: 'سوبرماركت', 
      icon: 'cart', 
      screen: 'Category', 
      params: { name: 'سوبرماركت' },
      color: colors.market
    },
    { 
      id: 'wholesale', 
      name: 'جملة', 
      icon: 'pricetag', 
      screen: 'Wholesale',
      color: colors.warning
    },
    { 
      id: 'pharmacy', 
      name: 'صيدلية', 
      icon: 'medkit', 
      screen: 'Category', 
      params: { name: 'صيدلية' },
      color: colors.pharmacy
    },
    { 
      id: 'grocery', 
      name: 'بقالة', 
      icon: 'basket', 
      screen: 'Category', 
      params: { name: 'بقالة' },
      color: colors.grocery
    },
    { 
      id: 'gifts', 
      name: 'هدايا', 
      icon: 'gift', 
      screen: 'Category', 
      params: { name: 'هدايا' },
      color: colors.gifts
    },
    { 
      id: 'electronics', 
      name: 'إلكترونيات', 
      icon: 'phone-portrait', 
      screen: 'Category', 
      params: { name: 'إلكترونيات' },
      color: colors.electronics
    },
    { 
      id: 'fashion', 
      name: 'أزياء', 
      icon: 'shirt', 
      screen: 'Category', 
      params: { name: 'أزياء' },
      color: colors.fashion
    },
  ];

  // Paid Offers with Full Background Images
  const paidOffers = [
    { 
      id: '1', 
      vendor: 'مطعم البركة',
      title: 'خصم 40%', 
      subtitle: 'على جميع الوجبات', 
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
      valid: 'ينتهي خلال 3 أيام',
      overlay: ['#E91E63CC', '#E91E6399']
    },
    { 
      id: '2', 
      vendor: 'سوبرماركت النخبة',
      title: 'توصيل مجاني', 
      subtitle: 'للطلبات فوق 150 ر.س', 
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
      valid: 'ينتهي اليوم',
      overlay: ['#10B981CC', '#10B98199']
    },
    { 
      id: '3', 
      vendor: 'مطعم الشاورما',
      title: 'وجبة عائلية', 
      subtitle: 'بخصم 35%', 
      image: 'https://images.unsplash.com/photo-1626777552726-456c5ca36c25?w=800',
      valid: 'ينتهي غداً',
      overlay: ['#14B8A6CC', '#14B8A699']
    },
    { 
      id: '4', 
      vendor: 'مخبز البركة',
      title: 'اشتري 1 واحصل على 1', 
      subtitle: 'على جميع المعجنات', 
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
      valid: 'ينتهي خلال أسبوع',
      overlay: ['#F59E0BCC', '#F59E0B99']
    },
  ];

  const famousRestaurants = restaurants.slice(0, 6);

  const categoryProducts = {
    'طعام': [
      { id: '1', name: 'وجبة برجر', price: 25, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', rating: 4.5, time: '30 دق' },
      { id: '2', name: 'بيتزا كبيرة', price: 45, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', rating: 4.8, time: '40 دق' },
      { id: '3', name: 'أرز بختي', price: 35, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400', rating: 4.6, time: '35 دق' },
    ],
    'سوبرماركت': [
      { id: '1', name: 'حليب طازج', price: 8, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', rating: 4.7, time: '15 دق' },
      { id: '2', name: 'خبز توست', price: 6, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', rating: 4.5, time: '15 دق' },
    ],
    'صيدلية': [
      { id: '1', name: 'مسكن ألم', price: 15, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400', rating: 4.6, time: '20 دق' },
    ],
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleServicePress = (service) => {
    if (service.screen === 'Taxi') {
      navigation.navigate('Taxi');
    } else if (service.screen === 'Category') {
      navigation.navigate('Category', service.params);
    }
  };

  const handleProductPress = (product) => {
    setSelectedItem(product);
    setShowItemModal(true);
  };

  const handleAddToCart = (itemWithDetails) => {
    addToCart(itemWithDetails);
  };

  const renderProductCard = (product) => (
    <TouchableOpacity
      key={product.id}
      style={styles.productCard}
      onPress={() => handleProductPress(product)}
      activeOpacity={0.85}
    >
      <View style={styles.productImageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.productGradient} />
        <TouchableOpacity style={styles.wishlistBtn} activeOpacity={0.8}>
          <Ionicons name="heart-outline" size={18} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
        <View style={styles.productMeta}>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color={colors.warning} />
            <Text style={styles.ratingText}>{product.rating}</Text>
          </View>
          <Text style={styles.productTime}>{product.time}</Text>
        </View>
        <Text style={styles.productPrice}>{product.price} ر.س</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* iOS 18 Style Header */}
      <View style={[styles.headerContainer, { paddingTop: Math.max(insets.top, 8) }]}>
        {/* Large Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.largeTitle}>تاتكس</Text>
          <Text style={styles.subtitle}>مرحباً، {user?.name || 'زائر'}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.headerActions}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Chat')} 
            style={styles.actionButton}
            activeOpacity={0.8}
          >
            <Ionicons name="notifications" size={24} color={colors.text} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Floating Search Bar */}
      <View style={styles.floatingSearchContainer}>
        <TouchableOpacity 
          style={styles.floatingSearchBar}
          onPress={() => navigation.navigate('Product')}
          activeOpacity={0.8}
        >
          <Ionicons name="search" size={20} color={colors.textTertiary} />
          <Text style={styles.searchPlaceholder}>ابحث عن منتج أو مطعم...</Text>
          <View style={styles.searchAction}>
            <Ionicons name="scan" size={22} color={colors.primary} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {/* Services - Circular Profile Icon Style */}
        <View style={styles.servicesSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.servicesContainer}>
              {tatxServices.map((service) => (
                <TouchableOpacity
                  key={service.id}
                  style={styles.serviceCard}
                  onPress={() => handleServicePress(service)}
                  activeOpacity={0.85}
                >
                  <View style={[styles.serviceIconContainer, { backgroundColor: service.color }]}>
                    <Ionicons name={service.icon} size={26} color={colors.white} />
                  </View>
                  <Text style={styles.serviceName}>{service.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Hero Offers - Full Background Image Cards */}
        <View style={styles.offersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>عروض حصرية</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.offersContainer}>
              {paidOffers.map((offer) => (
                <TouchableOpacity
                  key={offer.id}
                  style={styles.offerCard}
                  activeOpacity={0.85}
                >
                  <Image source={{ uri: offer.image }} style={styles.offerBackgroundImage} />
                  <LinearGradient 
                    colors={offer.overlay} 
                    style={styles.offerOverlay}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  />
                  <View style={styles.offerContent}>
                    <View style={styles.offerBadge}>
                      <Text style={styles.offerBadgeText}>{offer.vendor}</Text>
                    </View>
                    <Text style={styles.offerTitle}>{offer.title}</Text>
                    <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
                    <View style={styles.offerValid}>
                      <Ionicons name="time-outline" size={14} color="rgba(255,255,255,0.9)" />
                      <Text style={styles.offerValidText}>{offer.valid}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Famous Restaurants - Full Image Cards */}
        <View style={styles.restaurantsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>أشهر المطاعم</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.restaurantCards}>
              {famousRestaurants.map((restaurant, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.restaurantCard}
                  activeOpacity={0.85}
                >
                  <Image source={{ uri: restaurant.logo }} style={styles.restaurantBackgroundImage} />
                  <LinearGradient 
                    colors={['transparent', 'rgba(0,0,0,0.8)']} 
                    style={styles.restaurantGradient}
                  />
                  <View style={styles.restaurantFavorite}>
                    <Ionicons name="heart-outline" size={18} color={colors.white} />
                  </View>
                  <View style={styles.restaurantCardInfo}>
                    <Text style={styles.restaurantCardName}>{restaurant.name}</Text>
                    <View style={styles.restaurantCardMeta}>
                      <View style={styles.ratingBadge}>
                        <Ionicons name="star" size={12} color={colors.warning} />
                        <Text style={styles.restaurantCardRating}>{restaurant.rating}</Text>
                      </View>
                      <Text style={styles.restaurantCardTime}>{restaurant.deliveryTime} دق</Text>
                      <Text style={styles.restaurantCardFee}>{restaurant.deliveryFee} ر.س</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Categories with Products */}
        {['طعام', 'سوبرماركت', 'صيدلية'].map((categoryName) => (
          <View key={categoryName} style={styles.categorySection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{categoryName}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Category', { name: categoryName })}>
                <Text style={styles.seeAll}>عرض الكل</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.categoryProducts}>
                {(categoryProducts[categoryName] || []).map((product) => 
                  renderProductCard(product)
                )}
              </View>
            </ScrollView>
          </View>
        ))}

        {/* Bottom spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>

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
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  largeTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    ...shadows.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.error,
    borderWidth: 2,
    borderColor: colors.card,
  },
  // Floating Search Bar
  floatingSearchContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  floatingSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    height: 52,
    gap: spacing.sm,
    ...shadows.lg,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: colors.textTertiary,
    flex: 1,
  },
  searchAction: {
    paddingLeft: spacing.sm,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  // Services - Circular Profile Icon Style
  servicesSection: {
    backgroundColor: colors.card,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  servicesContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.lg,
  },
  serviceCard: {
    alignItems: 'center',
    width: 76,
  },
  serviceIconContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
    ...shadows.md,
  },
  serviceName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  // Offers
  offersSection: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '700',
  },
  offersContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  offerCard: {
    width: 320,
    height: 180,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  offerBackgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  offerOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  offerContent: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'flex-end',
  },
  offerBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
    backdropFilter: 'blur(10px)',
  },
  offerBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.white,
  },
  offerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  offerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.95)',
    marginBottom: spacing.sm,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  offerValid: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  offerValidText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
  },
  // Restaurants
  restaurantsSection: {
    marginBottom: spacing.lg,
  },
  restaurantCards: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  restaurantCard: {
    width: 200,
    height: 240,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  restaurantBackgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  restaurantGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  restaurantFavorite: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
    zIndex: 10,
  },
  restaurantCardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
  },
  restaurantCardName: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 6,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  restaurantCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
    gap: 3,
    backdropFilter: 'blur(10px)',
  },
  restaurantCardRating: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
  restaurantCardTime: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  restaurantCardFee: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  // Category Products
  categorySection: {
    marginBottom: spacing.lg,
  },
  categoryProducts: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  productCard: {
    width: 180,
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
  productGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
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
    backdropFilter: 'blur(10px)',
  },
  productInfo: {
    padding: spacing.md,
    backgroundColor: colors.card,
  },
  productName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  productTime: {
    fontSize: 11,
    color: colors.textTertiary,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
});

export default HomeScreen;
