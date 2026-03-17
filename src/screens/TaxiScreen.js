import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const TaxiScreen = ({ navigation }) => {
  const { isRTL } = useApp();
  const insets = useSafeAreaInsets();
  const [pickupLocation, setPickupLocation] = useState('موقعك الحالي');
  const [destination, setDestination] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);
  const [isFindingDriver, setIsFindingDriver] = useState(false);
  const [driverFound, setDriverFound] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: 26.4207,
    longitude: 50.0888,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const rideTypes = [
    {
      id: 'economy',
      name: 'اقتصادي',
      icon: 'car-outline',
      price: 15,
      time: '٥ دق',
      capacity: 4,
      color: colors.green,
    },
    {
      id: 'comfort',
      name: 'مريح',
      icon: 'directions-car',
      price: 25,
      time: '٣ دق',
      capacity: 4,
      color: colors.primary,
      popular: true,
    },
    {
      id: 'premium',
      name: 'فاخر',
      icon: 'diamond-outline',
      price: 40,
      time: '٧ دق',
      capacity: 4,
      color: colors.accent,
    },
    {
      id: 'van',
      name: 'عائلي',
      icon: 'people-outline',
      price: 35,
      time: '١٠ دق',
      capacity: 7,
      color: colors.info,
    },
    {
      id: 'luxury',
      name: 'لوكشري',
      icon: 'star-outline',
      price: 60,
      time: '٨ دق',
      capacity: 4,
      color: colors.warning,
    },
  ];

  const destinationSuggestions = [
    { id: '1', name: 'مطار الملك فهد الدولي', address: 'طريق المطار', icon: 'airplane' },
    { id: '2', name: 'مول الراشد', address: 'طريق الملك عبد العزيز', icon: 'shopping-bag' },
    { id: '3', name: 'برج المياه', address: 'الكورنيش', icon: 'water' },
    { id: '4', name: 'جامعة الإمام', address: 'حي الجامعة', icon: 'school' },
    { id: '5', name: 'مستشفى الملك فهد', address: 'طريق الأمير محمد', icon: 'hospital' },
  ];

  const driverInfo = {
    name: 'أحمد محمد',
    rating: 4.8,
    trips: 1250,
    car: 'تويوتا كامري 2024',
    color: 'أبيض',
    plate: 'أ ب ج 1234',
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

  const renderRideType = ({ item }) => {
    const isSelected = selectedRide?.id === item.id;
    return (
      <TouchableOpacity
        style={[
          styles.rideCard,
          isSelected && styles.rideCardSelected,
          isSelected && { borderColor: item.color },
        ]}
        onPress={() => setSelectedRide(item)}
        activeOpacity={0.7}
      >
        {item.popular && (
          <View style={[styles.popularBadge, { backgroundColor: item.color }]}>
            <Text style={styles.popularText}>مميز</Text>
          </View>
        )}
        <View style={[styles.rideIconContainer, { backgroundColor: item.color + '15' }]}>
          <Ionicons name={item.icon} size={24} color={item.color} />
        </View>
        <Text style={styles.rideName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.rideTime}>{item.time}</Text>
        <Text style={[styles.ridePrice, { color: item.color }]}>{item.price} ر.س</Text>
        {isSelected && (
          <View style={[styles.selectedCheck, { backgroundColor: item.color }]}>
            <Ionicons name="checkmark" size={14} color={colors.white} />
          </View>
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
        <Ionicons name={item.icon} size={20} color={colors.primary} />
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
        {/* Fullscreen Map */}
        <View style={styles.fullscreenMap}>
          <View style={styles.mapPlaceholder}>
            <View style={styles.routeContainer}>
              <View style={styles.locationMarker}>
                <View style={[styles.locationDot, { backgroundColor: colors.success }]} />
                <View style={styles.locationPulse} />
              </View>
              <View style={styles.routeLine} />
              <View style={styles.carMarker}>
                <View style={[styles.carIcon, { backgroundColor: colors.primary }]}>
                  <Ionicons name="taxi" size={20} color={colors.white} />
                </View>
                <View style={styles.etaBadge}>
                  <Text style={styles.etaText}>{selectedRide?.time}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Close Button */}
          <TouchableOpacity 
            style={[styles.closeButton, { top: Math.max(insets.top + 10, 50) }]}
            onPress={handleCancelRide}
          >
            <Ionicons name="close" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Driver Info Bottom Sheet */}
        <View style={[styles.driverBottomSheet, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
          <View style={styles.sheetHandle} />
          
          <View style={styles.driverInfoHeader}>
            <View>
              <Text style={styles.driverStatus}>في الطريق إليك</Text>
              <Text style={styles.driverEta}>يصل خلال {selectedRide?.time}</Text>
            </View>
            <View style={styles.driverActions}>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.success }]}>
                <Ionicons name="call" size={20} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.primary }]}>
                <Ionicons name="chatbubble" size={20} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.driverDetails}>
            <View style={styles.driverAvatar}>
              <Ionicons name="person" size={32} color={colors.white} />
            </View>
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>{driverInfo.name}</Text>
              <View style={styles.driverRating}>
                <Ionicons name="star" size={14} color={colors.warning} />
                <Text style={styles.driverRatingText}>{driverInfo.rating}</Text>
                <Text style={styles.driverTrips}> • {driverInfo.trips} رحلة</Text>
              </View>
            </View>
          </View>

          <View style={styles.vehicleInfo}>
            <View style={styles.vehicleIcon}>
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

          <View style={styles.tripInfo}>
            <View style={styles.tripPoint}>
              <View style={[styles.tripDot, { backgroundColor: colors.success }]} />
              <View style={styles.tripLine} />
              <Text style={styles.tripText} numberOfLines={1}>{pickupLocation}</Text>
            </View>
            <View style={styles.tripPoint}>
              <View style={[styles.tripDot, { backgroundColor: colors.primary }]} />
              <Text style={styles.tripText} numberOfLines={1}>{destination}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.cancelRideBtn} onPress={handleCancelRide}>
            <Ionicons name="close-circle-outline" size={20} color={colors.error} />
            <Text style={styles.cancelRideText}>إلغاء الرحلة</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Main Booking View
  return (
    <View style={styles.container}>
      {/* Fullscreen Map Background */}
      <View style={styles.fullscreenMap}>
        <View style={styles.mapPlaceholder}>
          <View style={styles.mapCenterMarker}>
            <Ionicons name="location" size={40} color={colors.primary} />
          </View>
        </View>
        
        {/* Current Location Button */}
        <TouchableOpacity 
          style={[styles.locationFab, { top: Math.max(insets.top + 10, 50) }]}
          onPress={() => {}}
        >
          <Ionicons name="navigate" size={22} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Overlay Content */}
      <View style={styles.overlayContent}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: Math.max(insets.top + 10, spacing.md) }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>حجز تاكسي</Text>
          <View style={styles.headerBtn} />
        </View>

        {/* Location Inputs Card */}
        <View style={styles.locationCard}>
          <View style={styles.locationRow}>
            <View style={[styles.locationDot, styles.locationDotGreen]} />
            <TextInput
              style={styles.locationInput}
              value={pickupLocation}
              onChangeText={setPickupLocation}
              placeholder="موقعpickup"
              placeholderTextColor={colors.textSecondary}
            />
            <TouchableOpacity style={styles.swapBtn}>
              <Ionicons name="swap-vertical" size={18} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.locationDivider} />
          <View style={styles.locationRow}>
            <View style={[styles.locationDot, styles.locationDotPrimary]} />
            <TextInput
              style={styles.locationInput}
              value={destination}
              onChangeText={setDestination}
              onFocus={() => setShowDestinationSuggestions(true)}
              placeholder="أدخل الوجهة"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          {/* Destination Suggestions */}
          {showDestinationSuggestions && destination.length > 0 && (
            <View style={styles.suggestionsList}>
              {destinationSuggestions
                .filter(item => item.name.includes(destination))
                .map(renderDestinationSuggestion)}
            </View>
          )}
        </View>

        {/* Ride Types - Horizontal Scroll */}
        <View style={styles.rideTypesSection}>
          <Text style={styles.sectionTitle}>اختر النوع</Text>
          <FlatList
            data={rideTypes}
            renderItem={renderRideType}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.rideTypesList}
          />
        </View>

        {/* Confirm Button */}
        <View style={[styles.confirmSection, { paddingBottom: Math.max(insets.bottom + 20, spacing.xl) }]}>
          {selectedRide && destination && (
            <View style={styles.fareInfo}>
              <Text style={styles.fareLabel}>{selectedRide.name}</Text>
              <Text style={styles.farePrice}>{selectedRide.price} ر.س</Text>
            </View>
          )}
          <TouchableOpacity
            style={[
              styles.confirmBtn,
              (!selectedRide || !destination) && styles.confirmBtnDisabled,
              { 
                backgroundColor: selectedRide && destination ? colors.primary : colors.gray,
              },
            ]}
            onPress={handleFindDriver}
            disabled={!selectedRide || !destination}
            activeOpacity={0.8}
          >
            {isFindingDriver ? (
              <View style={styles.findingRow}>
                <ActivityIndicator color={colors.white} />
                <Text style={styles.findingText}>جاري البحث...</Text>
              </View>
            ) : (
              <>
                <Ionicons name="taxi" size={22} color={colors.white} />
                <Text style={styles.confirmText}>اطلب الآن</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  fullscreenMap: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.grayLight,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapCenterMarker: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.lg,
  },
  routeContainer: {
    alignItems: 'center',
  },
  locationMarker: {
    alignItems: 'center',
  },
  locationDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  locationPulse: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.success + '30',
  },
  routeLine: {
    width: 3,
    height: 80,
    backgroundColor: colors.primary,
    borderStyle: 'dashed',
    marginVertical: spacing.sm,
  },
  carMarker: {
    alignItems: 'center',
  },
  carIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  etaBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  etaText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.white,
  },
  locationFab: {
    position: 'absolute',
    right: spacing.md,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  closeButton: {
    position: 'absolute',
    right: spacing.md,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  locationCard: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    ...shadows.lg,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  locationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  locationDotGreen: {
    backgroundColor: colors.success,
  },
  locationDotPrimary: {
    backgroundColor: colors.primary,
  },
  locationInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    marginHorizontal: spacing.sm,
  },
  swapBtn: {
    padding: spacing.xs,
  },
  locationDivider: {
    height: 1,
    backgroundColor: colors.grayLight,
    marginVertical: spacing.xs,
  },
  suggestionsList: {
    marginTop: spacing.sm,
    maxHeight: 200,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  suggestionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  suggestionName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  suggestionAddress: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  rideTypesSection: {
    backgroundColor: 'transparent',
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  rideTypesList: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  rideCard: {
    width: 90,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    alignItems: 'center',
    ...shadows.md,
    position: 'relative',
  },
  rideCardSelected: {
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -6,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  popularText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.white,
  },
  rideIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  rideName: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  rideTime: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  ridePrice: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  selectedCheck: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmSection: {
    paddingHorizontal: spacing.md,
  },
  fareInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  fareLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  farePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    gap: spacing.sm,
    ...shadows.lg,
  },
  confirmBtnDisabled: {
    opacity: 0.6,
  },
  confirmText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.white,
  },
  findingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  findingText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  // Driver Bottom Sheet
  driverBottomSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl * 1.5,
    borderTopRightRadius: borderRadius.xl * 1.5,
    padding: spacing.lg,
    ...shadows.lg,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.gray,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  driverInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  driverStatus: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  driverEta: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  actionBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  driverDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  driverAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  driverName: {
    fontSize: 17,
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
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grayLight,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.lg,
  },
  vehicleIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
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
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  tripInfo: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  tripPoint: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  tripLine: {
    flex: 1,
    height: 2,
    backgroundColor: colors.grayLight,
    marginHorizontal: spacing.sm,
  },
  tripText: {
    fontSize: 13,
    color: colors.text,
    flex: 1,
  },
  cancelRideBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    gap: spacing.xs,
  },
  cancelRideText: {
    fontSize: 15,
    color: colors.error,
    fontWeight: '600',
  },
});

export default TaxiScreen;
