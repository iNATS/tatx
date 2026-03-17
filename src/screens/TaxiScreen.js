import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Modal,
  FlatList,
  Platform,
  Image,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows, typography } from '../constants/theme';
import { useApp } from '../context/AppContext';

const TaxiScreen = ({ navigation }) => {
  const { isRTL, user } = useApp();
  const insets = useSafeAreaInsets();
  const [pickupLocation, setPickupLocation] = useState('موقعك الحالي');
  const [destination, setDestination] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);
  const [isFindingDriver, setIsFindingDriver] = useState(false);
  const [driverFound, setDriverFound] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const rideTypes = [
    {
      id: 'economy',
      name: 'تاكسي اقتصادي',
      icon: 'car-outline',
      price: 15,
      time: '5 دقائق',
      capacity: 4,
      color: colors.green,
      description: 'خيار اقتصادي للرحلات اليومية',
    },
    {
      id: 'comfort',
      name: 'تاكسي مريح',
      icon: 'directions-car',
      price: 25,
      time: '3 دقائق',
      capacity: 4,
      color: colors.primary,
      description: 'راحة أكثر بأسعار معقولة',
      popular: true,
    },
    {
      id: 'premium',
      name: 'تاكسي فاخر',
      icon: 'emoji-events',
      price: 40,
      time: '7 دقائق',
      capacity: 4,
      color: colors.accent,
      description: 'فخامة وخدمة مميزة',
    },
    {
      id: 'van',
      name: 'فان عائلي',
      icon: 'bus-outline',
      price: 35,
      time: '10 دقائق',
      capacity: 7,
      color: colors.info,
      description: 'مثالي للعائلات والمجموعات',
    },
  ];

  const destinationSuggestions = [
    { id: '1', name: 'مطار الملك فهد الدولي', address: 'الدمام - طريق المطار', icon: 'airplane' },
    { id: '2', name: 'مول الراشد', address: 'الدمام - طريق الملك عبد العزيز', icon: 'shopping-bag' },
    { id: '3', name: 'برج المياه', address: 'الدمام - الكورنيش', icon: 'water' },
    { id: '4', name: 'جامعة الإمام عبد الرحمن', address: 'الدمام - حي الجامعة', icon: 'school' },
    { id: '5', name: 'مستشفى الملك فهد', address: 'الدمام - طريق الأمير محمد بن فهد', icon: 'hospital' },
  ];

  const driverInfo = {
    name: 'أحمد محمد',
    rating: 4.8,
    trips: 1250,
    car: 'تويوتا كامري 2024',
    color: 'أبيض',
    plate: 'أ ب ج 1234',
    phone: '+966 5X XXX XXXX',
    avatar: null,
  };

  const handleFindDriver = () => {
    if (!selectedRide || !destination) return;
    setIsFindingDriver(true);
    setTimeout(() => {
      setIsFindingDriver(false);
      setDriverFound(true);
    }, 3000);
  };

  const handleCancelRide = () => {
    setIsFindingDriver(false);
    setDriverFound(false);
    setSelectedRide(null);
  };

  const renderRideType = (ride) => {
    const isSelected = selectedRide?.id === ride.id;
    return (
      <TouchableOpacity
        key={ride.id}
        style={[
          styles.rideTypeItem,
          isSelected && styles.rideTypeItemSelected,
          isSelected && { borderColor: ride.color },
        ]}
        onPress={() => setSelectedRide(ride)}
        activeOpacity={0.7}
      >
        {ride.popular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>الأكثر طلباً</Text>
          </View>
        )}
        <View style={styles.rideTypeContent}>
          <View style={[styles.rideTypeIcon, { backgroundColor: ride.color + '15' }]}>
            <Ionicons name={ride.icon} size={28} color={ride.color} />
          </View>
          <View style={styles.rideTypeInfo}>
            <Text style={styles.rideTypeName}>{ride.name}</Text>
            <Text style={styles.rideTypeDescription}>{ride.description}</Text>
            <View style={styles.rideTypeMeta}>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
                <Text style={styles.metaText}>{ride.time}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="people-outline" size={14} color={colors.textSecondary} />
                <Text style={styles.metaText}>{ride.capacity} ركاب</Text>
              </View>
            </View>
          </View>
          <View style={styles.rideTypePrice}>
            <Text style={styles.rideTypePriceValue}>{ride.price}</Text>
            <Text style={styles.rideTypePriceLabel}>ر.س</Text>
          </View>
        </View>
        {isSelected && (
          <View style={[styles.selectedIndicator, { backgroundColor: ride.color }]} />
        )}
      </TouchableOpacity>
    );
  };

  const renderDestinationSuggestion = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => {
        setDestination(item.name);
        setShowDestinationSuggestions(false);
      }}
      activeOpacity={0.7}
    >
      <View style={[styles.suggestionIcon, { backgroundColor: colors.primary + '15' }]}>
        <Ionicons name={item.icon} size={22} color={colors.primary} />
      </View>
      <View style={styles.suggestionInfo}>
        <Text style={styles.suggestionName}>{item.name}</Text>
        <Text style={styles.suggestionAddress}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  // Driver Found View
  if (driverFound) {
    return (
      <View style={styles.container}>
        {/* Map Area */}
        <View style={styles.mapArea}>
          <View style={styles.mapPlaceholder}>
            <View style={styles.mapIconContainer}>
              <Ionicons name="location" size={40} color={colors.primary} />
            </View>
            <View style={styles.routeLine} />
            <View style={styles.mapIconContainer}>
              <Ionicons name="car" size={40} color={colors.success} />
            </View>
          </View>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={handleCancelRide}
          >
            <Ionicons name="close" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Driver Info Card */}
        <View style={[styles.driverCard, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
          <View style={styles.driverCardHandle} />
          
          <View style={styles.driverHeader}>
            <View>
              <Text style={styles.driverCardTitle}>في الطريق إليك</Text>
              <Text style={styles.driverCardSubtitle}>سيصل خلال {selectedRide?.time}</Text>
            </View>
            <View style={styles.driverActions}>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.success }]}>
                <Ionicons name="call" size={20} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary }]}>
                <Ionicons name="chatbubble" size={20} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.driverContent}>
            <View style={styles.driverInfo}>
              <View style={styles.driverAvatar}>
                <Ionicons name="person" size={36} color={colors.white} />
              </View>
              <View style={styles.driverDetails}>
                <Text style={styles.driverName}>{driverInfo.name}</Text>
                <View style={styles.driverRating}>
                  <Ionicons name="star" size={16} color={colors.warning} />
                  <Text style={styles.driverRatingText}>{driverInfo.rating}</Text>
                  <Text style={styles.driverTrips}> • {driverInfo.trips} رحلة</Text>
                </View>
              </View>
            </View>

            <View style={styles.vehicleCard}>
              <View style={styles.vehicleInfo}>
                <View style={[styles.vehicleIcon, { backgroundColor: colors.primary + '15' }]}>
                  <Ionicons name="car" size={24} color={colors.primary} />
                </View>
                <View style={styles.vehicleDetails}>
                  <Text style={styles.vehicleText}>{driverInfo.car}</Text>
                  <Text style={styles.vehicleColor}>{driverInfo.color}</Text>
                </View>
                <View style={styles.plateBadge}>
                  <Text style={styles.plateText}>{driverInfo.plate}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.tripRoute}>
            <View style={styles.routePoint}>
              <View style={[styles.routeDot, styles.routeDotGreen]} />
              <View style={styles.routeTextContainer}>
                <Text style={styles.routeLabel}>من</Text>
                <Text style={styles.routeText}>{pickupLocation}</Text>
              </View>
            </View>
            <View style={styles.routeLineVertical} />
            <View style={styles.routePoint}>
              <View style={[styles.routeDot, styles.routeDotPrimary]} />
              <View style={styles.routeTextContainer}>
                <Text style={styles.routeLabel}>إلى</Text>
                <Text style={styles.routeText}>{destination}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelRide}>
            <Ionicons name="close-circle-outline" size={20} color={colors.error} />
            <Text style={styles.cancelButtonText}>إلغاء الرحلة</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Main Booking View
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.sm) }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>حجز تاكسي</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="help-circle-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Map Preview */}
        <View style={styles.mapPreview}>
          <View style={styles.mapPreviewContent}>
            <Ionicons name="map-outline" size={48} color={colors.primary} />
            <Text style={styles.mapPreviewText}>اختر وجهتك لبدء الرحلة</Text>
          </View>
          <TouchableOpacity style={styles.currentLocationButton}>
            <Ionicons name="navigate" size={20} color={colors.white} />
            <Text style={styles.currentLocationButtonText}>موقعي الحالي</Text>
          </TouchableOpacity>
        </View>

        {/* Location Inputs */}
        <View style={styles.locationsCard}>
          <View style={styles.locationRow}>
            <View style={[styles.locationDot, styles.locationDotGreen]} />
            <View style={styles.locationInputContainer}>
              <TextInput
                style={styles.locationInput}
                value={pickupLocation}
                onChangeText={setPickupLocation}
                placeholder="موقعpickup"
                placeholderTextColor={colors.textSecondary}
              />
            </View>
            <TouchableOpacity style={styles.swapButton}>
              <Ionicons name="swap-vertical" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.locationDivider} />

          <View style={styles.locationRow}>
            <View style={[styles.locationDot, styles.locationDotPrimary]} />
            <View style={styles.locationInputContainer}>
              <TextInput
                style={styles.locationInput}
                value={destination}
                onChangeText={setDestination}
                onFocus={() => setShowDestinationSuggestions(true)}
                placeholder="أدخل الوجهة"
                placeholderTextColor={colors.textSecondary}
              />
              {destination ? (
                <TouchableOpacity onPress={() => setDestination('')}>
                  <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>

        {/* Destination Suggestions */}
        {showDestinationSuggestions && destination.length > 0 && (
          <View style={styles.suggestionsCard}>
            <FlatList
              data={destinationSuggestions.filter(item => 
                item.name.toLowerCase().includes(destination.toLowerCase())
              )}
              renderItem={renderDestinationSuggestion}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Ride Types */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>اختر نوع التاكسي</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rideTypesContainer}>
            {rideTypes.map(renderRideType)}
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>طريقة الدفع</Text>
            <TouchableOpacity onPress={() => setShowPaymentModal(true)}>
              <Text style={styles.sectionLink}>تغيير</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.paymentCard} activeOpacity={0.7}>
            <View style={[styles.paymentIcon, { backgroundColor: colors.success + '15' }]}>
              <Ionicons name="wallet" size={24} color={colors.success} />
            </View>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentName}>المحفظة</Text>
              <Text style={styles.paymentBalance}>الرصيد: ر.س 150.00</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Promo Code */}
        <View style={styles.promoCard}>
          <View style={styles.promoInputContainer}>
            <Ionicons name="pricetag-outline" size={22} color={colors.textSecondary} />
            <TextInput
              style={styles.promoInput}
              placeholder="أدخل كود الخصم"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>تطبيق</Text>
          </TouchableOpacity>
        </View>

        {/* Confirm Button */}
        <View style={[styles.confirmArea, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
          {selectedRide && destination && (
            <View style={styles.fareSummary}>
              <View>
                <Text style={styles.fareLabel}>إجمالي الأجرة</Text>
                <Text style={styles.fareValue}>{selectedRide.price} ر.س</Text>
              </View>
              <View style={styles.fareDetails}>
                <Text style={styles.fareTime}>{selectedRide.time}</Text>
                <Text style={styles.fareDistance}>~5.2 كم</Text>
              </View>
            </View>
          )}
          <TouchableOpacity
            style={[
              styles.confirmButton,
              (!selectedRide || !destination) && styles.confirmButtonDisabled,
              { 
                backgroundColor: selectedRide && destination ? colors.primary : colors.gray,
                opacity: selectedRide && destination ? 1 : 0.6 
              },
            ]}
            onPress={handleFindDriver}
            disabled={!selectedRide || !destination}
            activeOpacity={0.8}
          >
            {isFindingDriver ? (
              <View style={styles.findingDriver}>
                <ActivityIndicator color={colors.white} />
                <Text style={styles.findingDriverText}>جاري البحث عن سائق...</Text>
              </View>
            ) : (
              <View style={styles.confirmContent}>
                <Ionicons name="taxi" size={22} color={colors.white} />
                <Text style={styles.confirmButtonText}>اطلب الآن</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.white,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  // Map Preview
  mapPreview: {
    height: 180,
    margin: spacing.md,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    backgroundColor: colors.grayLight,
    ...shadows.md,
  },
  mapPreviewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPreviewText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    ...shadows.md,
  },
  currentLocationButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  // Locations Card
  locationsCard: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    ...shadows.md,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  locationDotGreen: {
    backgroundColor: colors.success,
  },
  locationDotPrimary: {
    backgroundColor: colors.primary,
  },
  locationInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.sm,
  },
  locationInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  swapButton: {
    padding: spacing.xs,
  },
  locationDivider: {
    height: 1,
    backgroundColor: colors.grayLight,
    marginVertical: spacing.xs,
  },
  // Suggestions
  suggestionsCard: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.xl,
    padding: spacing.sm,
    ...shadows.md,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  suggestionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  suggestionName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  suggestionAddress: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  // Section
  section: {
    marginTop: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  sectionLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  // Ride Types
  rideTypesContainer: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.xl,
    padding: spacing.sm,
    ...shadows.md,
  },
  rideTypeItem: {
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
    overflow: 'hidden',
  },
  rideTypeItemSelected: {
    backgroundColor: colors.primary + '08',
  },
  rideTypeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rideTypeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rideTypeInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  rideTypeName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  rideTypeDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  rideTypeMeta: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 2,
  },
  rideTypePrice: {
    alignItems: 'flex-end',
  },
  rideTypePriceValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  rideTypePriceLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  popularBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.warning,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  popularText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.white,
  },
  selectedIndicator: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  // Payment
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    ...shadows.md,
  },
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  paymentBalance: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  // Promo
  promoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  promoInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.sm,
    ...shadows.sm,
  },
  promoInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  applyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
  },
  applyButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  // Confirm Area
  confirmArea: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  fareSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  fareLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  fareValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  fareDetails: {
    alignItems: 'flex-end',
  },
  fareTime: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  fareDistance: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  confirmButton: {
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    opacity: 0.6,
  },
  confirmContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  findingDriver: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  findingDriverText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  // Driver Found Styles
  mapArea: {
    flex: 1,
    backgroundColor: colors.grayLight,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  routeLine: {
    width: 2,
    height: 60,
    backgroundColor: colors.primary,
    borderStyle: 'dashed',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: spacing.md,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverCard: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl * 1.5,
    borderTopRightRadius: borderRadius.xl * 1.5,
    padding: spacing.lg,
    ...shadows.lg,
  },
  driverCardHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.gray,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  driverCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  driverCardSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  driverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  driverActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverContent: {
    marginBottom: spacing.lg,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  driverAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverDetails: {
    marginLeft: spacing.md,
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  driverRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  driverRatingText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 2,
  },
  driverTrips: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  vehicleCard: {
    backgroundColor: colors.grayLight,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleDetails: {
    flex: 1,
    marginLeft: spacing.md,
  },
  vehicleText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  vehicleColor: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  plateBadge: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  plateText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  tripRoute: {
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  routeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
  },
  routeDotGreen: {
    backgroundColor: colors.success,
  },
  routeDotPrimary: {
    backgroundColor: colors.primary,
  },
  routeTextContainer: {
    flex: 1,
    marginLeft: spacing.md,
    marginBottom: spacing.md,
  },
  routeLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  routeText: {
    fontSize: 14,
    color: colors.text,
    marginTop: 2,
  },
  routeLineVertical: {
    width: 2,
    height: 20,
    backgroundColor: colors.grayLight,
    marginLeft: 5,
    marginVertical: -spacing.sm,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    gap: spacing.xs,
  },
  cancelButtonText: {
    fontSize: 15,
    color: colors.error,
    fontWeight: '600',
  },
});

export default TaxiScreen;
