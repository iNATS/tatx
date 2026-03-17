import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';
import { categories, restaurants } from '../data/staticData';
import { useApp } from '../context/AppContext';

const HomeScreen = ({ navigation }) => {
  const { isRTL, user } = useApp();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const quickServices = [
    { id: 'taxi', name: 'تاكسي', icon: 'taxi', color: colors.primary, screen: 'Taxi' },
    { id: 'food', name: 'طعام', icon: 'fast-food', color: colors.success, screen: 'Product' },
    { id: 'market', name: 'تسوق', icon: 'cart', color: colors.info, screen: 'Product' },
    { id: 'gifts', name: 'هدايا', icon: 'gift', color: colors.warning, screen: 'Product' },
    { id: 'pharmacy', name: 'صيدلية', icon: 'medkit', color: colors.error, screen: 'Product' },
    { id: 'grocery', name: 'بقالة', icon: 'basket', color: colors.green, screen: 'Product' },
  ];

  const offers = [
    { id: '1', title: 'خصم 30%', subtitle: 'على جميع المطاعم', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400', color: '#FF6B6B' },
    { id: '2', title: 'توصيل مجاني', subtitle: 'للطلبات فوق 100 ر.س', image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=400', color: '#4ECDC4' },
    { id: '3', title: 'عروض حصرية', subtitle: 'لأعضاء تاتكس', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400', color: '#14B8A6' },
  ];

  const renderCategory = (category) => (
    <TouchableOpacity
      key={category.id}
      style={styles.categoryItem}
      onPress={() => {
        setSelectedCategory(category.id);
        navigation.navigate('Product', { category: category.name });
      }}
      activeOpacity={0.8}
    >
      <View style={[styles.categoryIcon, { backgroundColor: category.color + '15' }]}>
        <Ionicons name={category.icon} size={26} color={category.color} />
      </View>
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  );

  const renderRestaurant = (restaurant) => (
    <TouchableOpacity
      key={restaurant.id}
      style={styles.restaurantItem}
      onPress={() => navigation.navigate('RestaurantDetail', { restaurant })}
      activeOpacity={0.8}
    >
      <Image source={{ uri: restaurant.logo }} style={styles.restaurantLogo} />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
        <View style={styles.restaurantTags}>
          <Text style={styles.tagText}>{restaurant.tags.join(' • ')}</Text>
        </View>
        <View style={styles.restaurantMeta}>
          <View style={styles.deliveryInfo}>
            <Ionicons name="motorcycle" size={14} color={colors.textSecondary} />
            <Text style={styles.restaurantDelivery}>
              {restaurant.deliveryFee} ر.س • {restaurant.deliveryTime} دق
            </Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={colors.warning} />
            <Text style={styles.ratingText}>{restaurant.rating}</Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  const renderOffer = (offer, index) => (
    <TouchableOpacity 
      key={offer.id} 
      style={[styles.offerCard, { backgroundColor: offer.color }]}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Product')}
    >
      <View style={styles.offerContent}>
        <Text style={styles.offerTitle}>{offer.title}</Text>
        <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
        <TouchableOpacity style={styles.offerButton}>
          <Text style={styles.offerButtonText}>تسوق الآن</Text>
          <Ionicons name="arrow-forward" size={16} color={colors.white} />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: offer.image }} style={styles.offerImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with Safe Area */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.sm) }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Location')} style={styles.locationWrapper}>
          <View style={styles.locationContainer}>
            <View style={styles.locationIconWrapper}>
              <Ionicons name="location" size={16} color={colors.white} />
            </View>
            <View>
              <Text style={styles.locationLabel}>التوصيل إلى</Text>
              <Text style={styles.locationText} numberOfLines={1}>
                شارع الملك عبد العزيز، الدمام
              </Text>
            </View>
            <Ionicons name="chevron-down" size={18} color={colors.white} />
          </View>
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Product')}
            style={styles.headerBtn}
          >
            <Ionicons name="search" size={20} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Chat')}
            style={styles.headerBtn}
          >
            <Ionicons name="notifications" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Quick Services */}
        <View style={styles.quickServicesSection}>
          <View style={styles.quickServicesGrid}>
            {quickServices.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.quickServiceItem}
                onPress={() => navigation.navigate(service.screen)}
                activeOpacity={0.8}
              >
                <View style={[styles.quickServiceIcon, { backgroundColor: service.color + '15' }]}>
                  <Ionicons name={service.icon} size={26} color={service.color} />
                </View>
                <Text style={styles.quickServiceName}>{service.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Offers Banner */}
        <View style={styles.offersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>العروض الحصرية</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.offersContainer}>
              {offers.map(renderOffer)}
            </View>
          </ScrollView>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>التصنيفات</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesContainer}>
              {categories.map(renderCategory)}
            </View>
          </ScrollView>
        </View>

        {/* Featured Restaurants */}
        <View style={styles.restaurantsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>المطاعم المميزة</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.restaurantsContainer, shadows.sm]}>
            {restaurants.slice(0, 4).map(renderRestaurant)}
          </View>
        </View>

        {/* Popular Near You */}
        <View style={styles.popularSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>الأكثر طلباً بالقرب منك</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.popularContainer}>
              {restaurants.slice(2, 5).map((restaurant, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.popularCard}
                  onPress={() => navigation.navigate('RestaurantDetail', { restaurant })}
                  activeOpacity={0.8}
                >
                  <Image source={{ uri: restaurant.logo }} style={styles.popularImage} />
                  <View style={styles.popularInfo}>
                    <Text style={styles.popularName}>{restaurant.name}</Text>
                    <View style={styles.popularMeta}>
                      <Ionicons name="star" size={12} color={colors.warning} />
                      <Text style={styles.popularRating}>{restaurant.rating}</Text>
                      <Text style={styles.popularTime}>• {restaurant.deliveryTime} دق</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
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
    backgroundColor: colors.primary,
  },
  locationWrapper: {
    flex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  locationLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 1,
  },
  locationText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.white,
    maxWidth: 180,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  // Quick Services
  quickServicesSection: {
    backgroundColor: colors.white,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  quickServicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickServiceItem: {
    width: '31%',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  quickServiceIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  quickServiceName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  // Offers Section
  offersSection: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  seeAll: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  offersContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  offerCard: {
    width: 280,
    height: 140,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.md,
  },
  offerContent: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
  },
  offerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.md,
  },
  offerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs,
  },
  offerButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.white,
  },
  offerImage: {
    width: 100,
    height: '100%',
    borderRadius: borderRadius.lg,
  },
  // Categories Section
  categoriesSection: {
    marginBottom: spacing.lg,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.sm,
    gap: spacing.sm,
  },
  categoryItem: {
    alignItems: 'center',
    padding: spacing.sm,
    minWidth: 80,
  },
  categoryIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  categoryName: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
    fontWeight: '500',
  },
  // Restaurants Section
  restaurantsSection: {
    marginBottom: spacing.lg,
  },
  restaurantsContainer: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  restaurantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  restaurantLogo: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.grayLight,
  },
  restaurantInfo: {
    flex: 1,
    marginHorizontal: spacing.md,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  restaurantTags: {
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  restaurantMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  restaurantDelivery: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 2,
  },
  // Popular Section
  popularSection: {
    marginBottom: spacing.lg,
  },
  popularContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  popularCard: {
    width: 160,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.sm,
  },
  popularImage: {
    width: '100%',
    height: 100,
    backgroundColor: colors.grayLight,
  },
  popularInfo: {
    padding: spacing.sm,
  },
  popularName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  popularMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  popularRating: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  popularTime: {
    fontSize: 11,
    color: colors.textSecondary,
  },
});

export default HomeScreen;
