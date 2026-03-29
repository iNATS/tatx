import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, shadows, typography, fonts } from '../constants/theme';
import { homeServices, homeOffers, products, demoMarket, restaurants } from '../data/staticData';
import { useApp } from '../context/AppContext';
import ItemDetailModal from '../components/ItemDetailModal';
import PriceDisplay from '../components/PriceDisplay';

const wholesaleHighlights = [
  { id: 'w1', name: 'مواد غذائية', subtitle: 'للمطاعم والأعمال', icon: 'cube-outline' },
  { id: 'w2', name: 'مشروبات', subtitle: 'طلبات دورية', icon: 'water-outline' },
  { id: 'w3', name: 'مستهلكات', subtitle: 'تشغيل يومي', icon: 'layers-outline' },
  { id: 'w4', name: 'منظفات', subtitle: 'للمنشآت', icon: 'sparkles-outline' },
  { id: 'w5', name: 'ضيافة', subtitle: 'قهوة وتمور', icon: 'cafe-outline' },
  { id: 'w6', name: 'عقود', subtitle: 'أسعار خاصة', icon: 'calendar-outline' },
];

const pharmacyHighlights = [
  { id: 'ph1', name: 'مسكنات', subtitle: 'احتياجات سريعة', icon: 'medkit-outline', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=900' },
  { id: 'ph2', name: 'فيتامينات', subtitle: 'صحة يومية', icon: 'leaf-outline', image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=900' },
  { id: 'ph3', name: 'عناية', subtitle: 'منتجات مختارة', icon: 'sparkles-outline', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=900' },
  { id: 'ph4', name: 'أطفال', subtitle: 'احتياجات منزلية', icon: 'happy-outline', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=900' },
  { id: 'ph5', name: 'أجهزة', subtitle: 'قياس ومتابعة', icon: 'pulse-outline', image: 'https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=900' },
  { id: 'ph6', name: 'موسمي', subtitle: 'حساسية وسعال', icon: 'thermometer-outline', image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=900' },
];

const marketHighlights = [...products.slice(0, 6)];

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { user, addToCart, cartCount, rowDirection, textAlignStart, isRTL } = useApp();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 900);
  }, []);

  const handleServicePress = (service) => {
    if (service.screen === 'Shop') {
      navigation.navigate('Shop');
      return;
    }
    navigation.navigate(service.screen, service.params);
  };

  const handleProductPress = (product) => {
    setSelectedItem(product);
    setShowItemModal(true);
  };

  const handleOfferPress = (offer) => {
    if (offer.vendor.includes('ورد')) {
      navigation.navigate('Category', { name: 'هدايا' });
      return;
    }
    if (offer.vendor.includes('سلة')) {
      navigation.navigate('Shop');
      return;
    }
    navigation.navigate('Category', { name: 'مطاعم' });
  };

  const marketBackgroundCards = marketHighlights.slice(0, 4);

  const renderMiniScroller = (items, onPress, type = 'icon') => (
    <ScrollView horizontal inverted={isRTL} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={
            type === 'product'
              ? styles.productRailCard
              : type === 'booking'
                ? styles.bookingRailCard
                : styles.miniRailCard
          }
          activeOpacity={0.9}
          onPress={() => onPress(item)}
        >
          {type === 'product' ? (
            <>
              <Image source={{ uri: item.image }} style={styles.productRailImage} />
              <Text style={styles.productRailTitle} numberOfLines={2}>{item.name}</Text>
              <PriceDisplay value={item.price} color={colors.primary} size={14} iconSize={12} bold align="row-reverse" />
            </>
          ) : type === 'booking' ? (
            <>
              <Image source={{ uri: item.image }} style={styles.bookingMiniImage} />
              <View style={styles.bookingMiniContentCard}>
                <Text style={styles.bookingMiniTitle}>{item.title}</Text>
                <Text style={styles.bookingMiniMeta}>{item.area}</Text>
                <PriceDisplay value={item.price} color={colors.primary} size={14} iconSize={11} bold align="row-reverse" />
              </View>
            </>
          ) : (
            <>
              <View style={styles.miniRailIcon}>
                <Ionicons name={item.icon} size={20} color={colors.primary} />
              </View>
              <Text style={styles.miniRailTitle}>{item.name}</Text>
              <Text style={styles.miniRailSubtitle}>{item.subtitle}</Text>
            </>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.md, paddingBottom: 140 }]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      >
        <View style={[styles.topBar, { flexDirection: rowDirection }]}>
          <View style={styles.avatarShell}>
            <Image source={require('../../assets/logo.png')} style={styles.avatarLogo} resizeMode="contain" />
          </View>
          <View style={styles.topBarText}>
            <Text style={[styles.welcomeText, { textAlign: textAlignStart }]}>أهلاً، {user?.name || 'ضيفنا'}</Text>
            <Text style={[styles.locationText, { textAlign: textAlignStart }]}>دائما معك • {demoMarket.city}، {user?.district || demoMarket.district}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton} activeOpacity={0.85} onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications-outline" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.searchCard} activeOpacity={0.9} onPress={() => navigation.navigate('Shop')}>
          <LinearGradient colors={['#FFF6F8', '#FFFFFF']} style={styles.searchGradient}>
            <View style={styles.searchMain}>
              <View style={styles.searchTextWrap}>
                <Text style={styles.searchTitle}>ابحث</Text>
                <Text style={styles.searchPlaceholder}>منتجات، مطاعم، صيدلية، سوق الجملة، أو هدايا</Text>
              </View>
              <View style={styles.searchIconWrap}>
                <Ionicons name="search-outline" size={21} color={colors.primary} />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.heroOfferCard} activeOpacity={0.9} onPress={() => handleOfferPress(homeOffers[0])}>
          <Image source={{ uri: homeOffers[0].image }} style={styles.offerImage} />
          <LinearGradient colors={['rgba(12,10,11,0.06)', 'rgba(12,10,11,0.68)']} style={styles.offerGradient}>
            <Text style={styles.offerVendor}>{homeOffers[0].vendor}</Text>
            <Text style={styles.offerTitle}>{homeOffers[0].title}</Text>
            <Text style={styles.offerSubtitle}>{homeOffers[0].subtitle}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={[styles.sectionHeader, { flexDirection: rowDirection }]}>
          <Text style={styles.sectionTitle}>الخدمات</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Category', { name: 'مطاعم' })}>
            <Text style={styles.sectionLink}>عرض الكل</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal inverted={isRTL} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.servicesRow}>
          {homeServices.map((service) => (
            <TouchableOpacity key={service.id} style={styles.serviceChip} activeOpacity={0.88} onPress={() => handleServicePress(service)}>
              <View style={[styles.serviceIcon, { backgroundColor: `${service.color}15` }]}>
                <Ionicons name={service.icon} size={20} color={service.color} />
              </View>
              <Text style={styles.serviceName}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={[styles.sectionHeader, { flexDirection: rowDirection }]}>
          <Text style={styles.sectionTitle}>قسم العروض</Text>
          <Text style={styles.sectionLink}>مختارة لك</Text>
        </View>
        <ScrollView horizontal inverted={isRTL} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {homeOffers.map((offer) => (
            <TouchableOpacity key={offer.id} style={styles.offerCard} activeOpacity={0.88} onPress={() => handleOfferPress(offer)}>
              <Image source={{ uri: offer.image }} style={styles.offerImage} />
              <LinearGradient colors={['rgba(12,10,11,0.06)', 'rgba(12,10,11,0.68)']} style={styles.offerGradient}>
                <Text style={styles.offerVendor}>{offer.vendor}</Text>
                <Text style={styles.offerTitle}>{offer.title}</Text>
                <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={[styles.sectionHeader, { flexDirection: rowDirection }]}>
          <Text style={styles.sectionTitle}>مطاعم</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Category', { name: 'مطاعم' })}>
            <Text style={styles.sectionLink}>عرض الكل</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.hotList}>
          {restaurants.slice(0, 6).map((restaurant, index) => (
            <TouchableOpacity
              key={restaurant.id}
              style={[styles.hotRestaurantCard, index === 0 && styles.hotRestaurantCardFeatured, { flexDirection: rowDirection }]}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Category', { name: 'مطاعم' })}
            >
              <Image source={{ uri: restaurant.logo }} style={styles.hotRestaurantImage} />
              <View style={styles.hotRestaurantBody}>
                <View style={[styles.hotRestaurantTop, { flexDirection: rowDirection }]}>
                  <View style={styles.hotMetaPill}>
                    <Ionicons name="flame-outline" size={13} color={colors.primary} />
                    <Text style={styles.hotMetaPillText}>Hot</Text>
                  </View>
                  <View style={styles.hotRestaurantInfo}>
                    <Text style={[styles.hotRestaurantName, { textAlign: textAlignStart }]}>{restaurant.name}</Text>
                    <Text style={[styles.hotRestaurantCategory, { textAlign: textAlignStart }]}>{restaurant.category}</Text>
                  </View>
                </View>
                <View style={[styles.hotRestaurantBottom, { flexDirection: rowDirection }]}>
                  <View style={styles.hotDeliveryPill}>
                    <Text style={styles.hotDeliveryText}>{restaurant.deliveryTime} دقيقة</Text>
                  </View>
                  <View style={[styles.hotTagsRow, { flexDirection: rowDirection }]}>
                    {restaurant.tags.slice(0, 2).map((tag) => (
                      <View key={tag} style={styles.hotTagChip}>
                        <Text style={styles.hotTagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.sectionHeader, { flexDirection: rowDirection }]}>
          <Text style={styles.sectionTitle}>الماركت</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Shop')}>
            <Text style={styles.sectionLink}>عرض الكل</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal inverted={isRTL} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {marketBackgroundCards.map((item) => (
            <TouchableOpacity key={item.id} style={styles.marketLuxuryCard} activeOpacity={0.9} onPress={() => handleProductPress(item)}>
              <Image source={{ uri: item.image }} style={styles.marketLuxuryImage} />
              <View style={styles.marketLuxuryInfo}>
                <Text style={styles.marketLuxuryEyebrow}>{item.category}</Text>
                <Text style={styles.marketLuxuryTitle} numberOfLines={2}>{item.name}</Text>
                <PriceDisplay value={item.price} color={colors.primary} size={16} iconSize={13} bold align="row-reverse" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.taxiPromoCard} activeOpacity={0.9} onPress={() => navigation.navigate('Taxi')}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200' }} style={styles.taxiPromoImage} />
          <View style={styles.taxiPromoContentCard}>
            <View style={styles.taxiPromoBadge}>
              <Ionicons name="car-sport-outline" size={18} color={colors.primary} />
            </View>
            <View style={styles.taxiPromoText}>
              <Text style={styles.taxiPromoTitle}>احجز مشوارك الآن</Text>
              <Text style={styles.taxiPromoSubtitle}>انطلاق سريع، مسار واضح، وتجربة أقرب لتطبيقات النقل الحديثة.</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={[styles.sectionHeader, { flexDirection: rowDirection }]}>
          <Text style={styles.sectionTitle}>تصنيفات الصيدلية</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Category', { name: 'صيدلية' })}>
            <Text style={styles.sectionLink}>عرض الكل</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal inverted={isRTL} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {pharmacyHighlights.map((item) => (
            <TouchableOpacity key={item.id} style={styles.specialtyLuxuryCard} activeOpacity={0.9} onPress={() => navigation.navigate('Category', { name: 'صيدلية' })}>
              <Image source={{ uri: item.image }} style={styles.specialtyLuxuryImage} />
              <View style={styles.specialtyLuxuryInfo}>
                <View style={styles.specialtyLuxuryBadge}>
                  <Ionicons name={item.icon} size={16} color={colors.primary} />
                </View>
                <Text style={styles.specialtyLuxuryTitle}>{item.name}</Text>
                <Text style={styles.specialtyLuxurySubtitle}>{item.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </ScrollView>

      {cartCount > 0 && (
        <TouchableOpacity style={[styles.cartBar, { bottom: Math.max(insets.bottom, spacing.md) }]} activeOpacity={0.9} onPress={() => navigation.navigate('Cart')}>
          <View>
            <Text style={styles.cartBarTitle}>السلة جاهزة</Text>
            <Text style={styles.cartBarSubtitle}>{cartCount} عناصر مضافة</Text>
          </View>
          <Ionicons name="bag-handle-outline" size={22} color={colors.white} />
        </TouchableOpacity>
      )}

      <ItemDetailModal
        visible={showItemModal}
        item={selectedItem}
        onClose={() => setShowItemModal(false)}
        onAddToCart={addToCart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.lg },
  topBar: { alignItems: 'center', marginBottom: spacing.lg },
  avatarShell: { width: 44, height: 44, borderRadius: 16, backgroundColor: '#FFF0F3', alignItems: 'center', justifyContent: 'center', marginLeft: spacing.sm },
  avatarLogo: { width: 28, height: 28 },
  topBarText: { flex: 1, alignItems: 'flex-end' },
  welcomeText: { ...typography.h3, color: colors.text },
  locationText: { ...typography.caption, color: colors.textSecondary },
  notificationButton: { width: 44, height: 44, borderRadius: 16, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', ...shadows.sm },
  searchCard: { marginBottom: spacing.md, borderRadius: 28, overflow: 'hidden', ...shadows.md },
  searchGradient: { padding: spacing.md },
  searchMain: { flexDirection: 'row-reverse', alignItems: 'center' },
  searchTextWrap: { flex: 1, marginHorizontal: spacing.md, alignItems: 'flex-end' },
  searchTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 18, textAlign: 'right' },
  searchPlaceholder: { color: colors.textSecondary, fontSize: 12, marginTop: 4, textAlign: 'right', lineHeight: 18 },
  searchIconWrap: { width: 54, height: 54, borderRadius: 20, backgroundColor: '#FFE8EE', alignItems: 'center', justifyContent: 'center' },
  heroOfferCard: { marginBottom: spacing.md, width: '100%', height: 238, borderRadius: 30, overflow: 'hidden', backgroundColor: colors.card, ...shadows.md },
  sectionHeader: { marginTop: spacing.xl, marginBottom: spacing.md, justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { ...typography.h3, color: colors.text, textAlign: 'right' },
  sectionLink: { ...typography.caption, color: colors.primary, textAlign: 'left' },
  servicesRow: { gap: spacing.sm, paddingBottom: spacing.xs },
  serviceChip: { backgroundColor: colors.card, borderRadius: 22, paddingHorizontal: spacing.md, paddingVertical: spacing.md, alignItems: 'center', minWidth: 88, ...shadows.sm },
  serviceIcon: { width: 44, height: 44, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  serviceName: { ...typography.bodySmall, color: colors.text, fontFamily: fonts.semiBold },
  horizontalList: { gap: spacing.md, paddingBottom: spacing.xs },
  offerCard: { width: 270, height: 220, borderRadius: 28, overflow: 'hidden', backgroundColor: colors.card, ...shadows.md },
  offerImage: { width: '100%', height: '100%' },
  offerGradient: { ...StyleSheet.absoluteFillObject, justifyContent: 'flex-end', padding: spacing.lg },
  offerVendor: { color: 'rgba(255,255,255,0.86)', fontFamily: fonts.semiBold, fontSize: 12, textAlign: 'right' },
  offerTitle: { color: colors.white, fontFamily: fonts.bold, fontSize: 24, marginTop: spacing.xs, textAlign: 'right' },
  offerSubtitle: { color: 'rgba(255,255,255,0.88)', fontSize: 12, lineHeight: 18, marginTop: spacing.xs, textAlign: 'right' },
  hotList: { gap: spacing.md, marginBottom: spacing.sm },
  hotRestaurantCard: {
    backgroundColor: colors.card,
    borderRadius: 28,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  hotRestaurantCardFeatured: {
    backgroundColor: '#FFF4F6',
  },
  hotRestaurantImage: {
    width: 96,
    height: 96,
    borderRadius: 22,
    backgroundColor: colors.cardSecondary,
  },
  hotRestaurantBody: {
    flex: 1,
    marginHorizontal: spacing.md,
    justifyContent: 'space-between',
  },
  hotRestaurantTop: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  hotMetaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  hotMetaPillText: {
    color: colors.primary,
    fontFamily: fonts.bold,
    fontSize: 11,
  },
  hotRestaurantInfo: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },
  hotRestaurantName: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 17,
  },
  hotRestaurantCategory: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  hotRestaurantBottom: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  hotDeliveryPill: {
    backgroundColor: '#FFE8EE',
    borderRadius: borderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  hotDeliveryText: {
    color: colors.primary,
    fontFamily: fonts.semiBold,
    fontSize: 12,
  },
  hotTagsRow: {
    gap: spacing.xs,
  },
  hotTagChip: {
    backgroundColor: colors.cardSecondary,
    borderRadius: borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  hotTagText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontFamily: fonts.semiBold,
  },
  miniRailCard: {
    width: 158,
    backgroundColor: colors.card,
    borderRadius: 26,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#F7E2E7',
    ...shadows.sm,
  },
  miniRailIcon: {
    width: 50,
    height: 50,
    borderRadius: 18,
    backgroundColor: '#FFF1F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#F7D6DE',
  },
  miniRailTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 15, textAlign: 'right' },
  miniRailSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 6, textAlign: 'right', lineHeight: 18 },
  productRailCard: { width: 176, backgroundColor: colors.card, borderRadius: 26, padding: spacing.sm, borderWidth: 1, borderColor: '#F7E2E7', ...shadows.sm },
  productRailImage: { width: '100%', height: 116, borderRadius: 18, backgroundColor: colors.cardSecondary, marginBottom: spacing.sm },
  productRailTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 14, lineHeight: 20, textAlign: 'right', marginBottom: spacing.xs },
  marketLuxuryCard: { width: 220, backgroundColor: colors.card, borderRadius: 28, overflow: 'hidden', ...shadows.md },
  marketLuxuryImage: { width: '100%', height: 154, backgroundColor: colors.cardSecondary },
  marketLuxuryInfo: { padding: spacing.md, alignItems: 'flex-end' },
  marketLuxuryEyebrow: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 12, textAlign: 'right' },
  marketLuxuryTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 18, textAlign: 'right', marginTop: 6, marginBottom: spacing.xs, lineHeight: 24 },
  taxiPromoCard: { marginTop: spacing.xl, borderRadius: 28, overflow: 'hidden', backgroundColor: colors.card, ...shadows.md },
  taxiPromoImage: { width: '100%', height: 168 },
  taxiPromoContentCard: { margin: spacing.md, marginTop: -26, backgroundColor: 'rgba(255,255,255,0.96)', borderRadius: 24, padding: spacing.md, flexDirection: 'row-reverse', alignItems: 'center', ...shadows.sm },
  taxiPromoBadge: { width: 56, height: 56, borderRadius: 20, backgroundColor: '#FFF1F4', alignItems: 'center', justifyContent: 'center' },
  taxiPromoText: { flex: 1, marginHorizontal: spacing.md, alignItems: 'flex-end' },
  taxiPromoTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 20, textAlign: 'right' },
  taxiPromoSubtitle: { color: colors.textSecondary, fontSize: 12, textAlign: 'right', lineHeight: 18, marginTop: 4 },
  specialtyLuxuryCard: { width: 210, backgroundColor: colors.card, borderRadius: 28, overflow: 'hidden', ...shadows.md },
  specialtyLuxuryImage: { width: '100%', height: 142, backgroundColor: colors.cardSecondary },
  specialtyLuxuryInfo: { padding: spacing.md, alignItems: 'flex-end' },
  specialtyLuxuryBadge: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#FFF1F4', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  specialtyLuxuryTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 17, textAlign: 'right' },
  specialtyLuxurySubtitle: { color: colors.textSecondary, fontSize: 12, textAlign: 'right', marginTop: 4, lineHeight: 18 },
  cartBar: { position: 'absolute', left: spacing.md, right: spacing.md, backgroundColor: colors.text, borderRadius: 24, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', ...shadows.float },
  cartBarTitle: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 15, textAlign: 'right' },
  cartBarSubtitle: { color: 'rgba(255,255,255,0.72)', fontSize: 12, marginTop: 2, textAlign: 'right' },
});

export default HomeScreen;
