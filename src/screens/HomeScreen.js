import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';
import { categories, restaurants } from '../data/staticData';
import { useApp } from '../context/AppContext';
import FilterTabs from '../components/FilterTabs';
import ItemDetailModal from '../components/ItemDetailModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { isRTL, user, addToCart } = useApp();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);

  // TATX Services
  const tatxServices = [
    { id: 'taxi', name: 'تاكسي', icon: 'taxi', color: colors.primary, screen: 'Taxi' },
    { id: 'food', name: 'طعام', icon: 'fast-food', color: colors.success, screen: 'Category', params: { name: 'طعام' } },
    { id: 'market', name: 'سوبرماركت', icon: 'cart', color: colors.info, screen: 'Category', params: { name: 'سوبرماركت' } },
    { id: 'pharmacy', name: 'صيدلية', icon: 'medkit', color: colors.error, screen: 'Category', params: { name: 'صيدلية' } },
    { id: 'grocery', name: 'بقالة', icon: 'basket', color: colors.green, screen: 'Category', params: { name: 'بقالة' } },
    { id: 'gifts', name: 'هدايا', icon: 'gift', color: colors.warning, screen: 'Category', params: { name: 'هدايا' } },
    { id: 'electronics', name: 'إلكترونيات', icon: 'phone-portrait', color: colors.secondary, screen: 'Category', params: { name: 'إلكترونيات' } },
    { id: 'fashion', name: 'أزياء', icon: 'shirt', color: colors.accent, screen: 'Category', params: { name: 'أزياء' } },
  ];

  // Paid Offers from Vendors (Background Cards)
  const paidOffers = [
    { 
      id: '1', 
      vendor: 'مطعم البركة',
      title: 'خصم 40%', 
      subtitle: 'على جميع الوجبات', 
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
      bgColor: '#FF6B6B',
      valid: 'ينتهي خلال 3 أيام'
    },
    { 
      id: '2', 
      vendor: 'سوبرماركت النخبة',
      title: 'توصيل مجاني', 
      subtitle: 'للطلبات فوق 150 ر.س', 
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600',
      bgColor: '#4ECDC4',
      valid: 'ينتهي اليوم'
    },
    { 
      id: '3', 
      vendor: 'مطعم الشاورما',
      title: 'وجبة عائلية', 
      subtitle: 'بخصم 35%', 
      image: 'https://images.unsplash.com/photo-1626777552726-456c5ca36c25?w=600',
      bgColor: '#14B8A6',
      valid: 'ينتهي غداً'
    },
    { 
      id: '4', 
      vendor: 'مخبز البركة',
      title: 'اشتري 1 واحصل على 1 مجاني', 
      subtitle: 'على جميع المعجنات', 
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600',
      bgColor: '#F59E0B',
      valid: 'ينتهي خلال أسبوع'
    },
  ];

  // Famous Restaurants
  const famousRestaurants = restaurants.slice(0, 6);

  // Demo products for categories
  const categoryProducts = {
    'طعام': [
      { id: '1', name: 'وجبة برجر', price: 25, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300', rating: 4.5, time: '30 دق' },
      { id: '2', name: 'بيتزا كبيرة', price: 45, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300', rating: 4.8, time: '40 دق' },
      { id: '3', name: 'أرز بختي', price: 35, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300', rating: 4.6, time: '35 دق' },
    ],
    'سوبرماركت': [
      { id: '1', name: 'حليب طازج', price: 8, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300', rating: 4.7, time: '15 دق' },
      { id: '2', name: 'خبز توست', price: 6, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300', rating: 4.5, time: '15 دق' },
    ],
    'صيدلية': [
      { id: '1', name: 'مسكن ألم', price: 15, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300', rating: 4.6, time: '20 دق' },
    ],
  };

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

  const renderProductCard = (product, index) => (
    <TouchableOpacity
      key={index}
      style={styles.productCard}
      onPress={() => handleProductPress(product)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: product.image }} style={styles.productImage} />
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
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.sm) }]}>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>مرحباً، {user?.name || 'زائر'}</Text>
          <Text style={styles.subGreeting}>ماذا تريد أن تطلب اليوم؟</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => navigation.navigate('Product')} style={styles.actionBtn}>
            <Ionicons name="search" size={22} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={styles.actionBtn}>
            <Ionicons name="notifications" size={22} color={colors.white} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* TATX Services - One Row Slider */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>خدمات تاتكس</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.servicesContainer}>
              {tatxServices.map((service) => (
                <TouchableOpacity
                  key={service.id}
                  style={styles.serviceItem}
                  onPress={() => handleServicePress(service)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.serviceIcon, { backgroundColor: service.color + '15' }]}>
                    <Ionicons name={service.icon} size={26} color={service.color} />
                  </View>
                  <Text style={styles.serviceName}>{service.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Paid Offers from Vendors - Background Cards Slider */}
        <View style={styles.offersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>عروض حصرية من المتاجر</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.offersContainer}>
              {paidOffers.map((offer) => (
                <TouchableOpacity
                  key={offer.id}
                  style={[styles.offerCard, { backgroundColor: offer.bgColor }]}
                  activeOpacity={0.8}
                >
                  <View style={styles.offerContent}>
                    <Text style={styles.offerVendor}>{offer.vendor}</Text>
                    <Text style={styles.offerTitle}>{offer.title}</Text>
                    <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
                    <View style={styles.offerValid}>
                      <Ionicons name="time-outline" size={12} color="rgba(255,255,255,0.8)" />
                      <Text style={styles.offerValidText}>{offer.valid}</Text>
                    </View>
                  </View>
                  <Image source={{ uri: offer.image }} style={styles.offerImage} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Famous Restaurants Slider */}
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
                  activeOpacity={0.8}
                >
                  <Image source={{ uri: restaurant.logo }} style={styles.restaurantCardImage} />
                  <View style={styles.restaurantCardInfo}>
                    <Text style={styles.restaurantCardName}>{restaurant.name}</Text>
                    <View style={styles.restaurantCardMeta}>
                      <Ionicons name="star" size={14} color={colors.warning} />
                      <Text style={styles.restaurantCardRating}>{restaurant.rating}</Text>
                      <Text style={styles.restaurantCardDot}>•</Text>
                      <Text style={styles.restaurantCardTime}>{restaurant.deliveryTime} دق</Text>
                      <Text style={styles.restaurantCardDot}>•</Text>
                      <Text style={styles.restaurantCardFee}>{restaurant.deliveryFee} ر.س</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Near From You Section */}
        <View style={styles.nearSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>بالقرب منك</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.nearCards}>
              {restaurants.slice(2, 6).map((restaurant, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.nearCard}
                  activeOpacity={0.8}
                >
                  <Image source={{ uri: restaurant.logo }} style={styles.nearCardImage} />
                  <View style={styles.nearCardInfo}>
                    <Text style={styles.nearCardName}>{restaurant.name}</Text>
                    <View style={styles.nearCardMeta}>
                      <Ionicons name="location" size={12} color={colors.primary} />
                      <Text style={styles.nearCardDistance}>0.{index + 1} كم</Text>
                    </View>
                    <View style={styles.nearCardMeta}>
                      <Ionicons name="star" size={12} color={colors.warning} />
                      <Text style={styles.nearCardRating}>{restaurant.rating}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Categories with Products Slider */}
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
                {(categoryProducts[categoryName] || []).map((product, index) => 
                  renderProductCard(product, index)
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
  greeting: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  subGreeting: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  seeAll: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  // Services Section
  servicesSection: {
    backgroundColor: colors.white,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  servicesContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.sm,
    gap: spacing.md,
  },
  serviceItem: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  serviceIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  serviceName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  // Offers Section
  offersSection: {
    marginBottom: spacing.lg,
  },
  offersContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  offerCard: {
    width: 300,
    height: 160,
    borderRadius: borderRadius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    ...shadows.md,
  },
  offerContent: {
    flex: 1,
  },
  offerVendor: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  offerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
  },
  offerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: spacing.sm,
  },
  offerValid: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  offerValidText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
  },
  offerImage: {
    width: 120,
    height: '100%',
    borderRadius: borderRadius.lg,
  },
  // Restaurants Section
  restaurantsSection: {
    marginBottom: spacing.lg,
  },
  restaurantCards: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  restaurantCard: {
    width: 180,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.sm,
  },
  restaurantCardImage: {
    width: '100%',
    height: 120,
    backgroundColor: colors.grayLight,
  },
  restaurantCardInfo: {
    padding: spacing.sm,
  },
  restaurantCardName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  restaurantCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  restaurantCardRating: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  restaurantCardDot: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  restaurantCardTime: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  restaurantCardFee: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  // Near Section
  nearSection: {
    marginBottom: spacing.lg,
  },
  nearCards: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  nearCard: {
    width: 160,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.sm,
  },
  nearCardImage: {
    width: '100%',
    height: 100,
    backgroundColor: colors.grayLight,
  },
  nearCardInfo: {
    padding: spacing.sm,
  },
  nearCardName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  nearCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  nearCardDistance: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
  },
  nearCardRating: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
  },
  // Category Section
  categorySection: {
    marginBottom: spacing.lg,
  },
  categoryProducts: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  productCard: {
    width: 170,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.sm,
  },
  productImage: {
    width: '100%',
    height: 130,
    backgroundColor: colors.grayLight,
  },
  productInfo: {
    padding: spacing.sm,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
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
    fontWeight: '600',
    color: colors.text,
  },
  productTime: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default HomeScreen;
