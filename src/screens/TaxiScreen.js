import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const TRIP_STATES = {
  IDLE: 'idle',
  PICKUP: 'pickup',
  DESTINATION: 'destination',
  RIDE_SELECT: 'ride_select',
  FINDING: 'finding',
  DRIVER_FOUND: 'driver_found',
  ARRIVING: 'arriving',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
};

const TaxiScreen = ({ navigation }) => {
  const { isRTL } = useApp();
  const insets = useSafeAreaInsets();
  
  const [tripState, setTripState] = useState(TRIP_STATES.IDLE);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);
  const [driver, setDriver] = useState(null);
  const [progress, setProgress] = useState(0);

  const rideTypes = [
    { 
      id: 'uberx', 
      name: 'تاكسي', 
      icon: 'car-outline', 
      price: 15, 
      time: '٣ دقائق', 
      capacity: 4,
      description: 'رحلات يومية ميسورة التكلفة',
      color: '#000000'
    },
    { 
      id: 'comfort', 
      name: 'مريح', 
      icon: 'directions-car', 
      price: 25, 
      time: '٥ دقائق', 
      capacity: 4,
      description: 'سيارات أحدث مع مساحة إضافية',
      color: '#22c55e'
    },
    { 
      id: 'premium', 
      name: 'فاخر', 
      icon: 'diamond-outline', 
      price: 40, 
      time: '٧ دقائق', 
      capacity: 4,
      description: 'مركبات فاخرة من الدرجة الأولى',
      color: '#eab308'
    },
    { 
      id: 'van', 
      name: 'عائلي', 
      icon: 'people-outline', 
      price: 35, 
      time: '١٠ دقائق', 
      capacity: 7,
      description: 'مثالي للمجموعات والعائلات',
      color: '#3b82f6'
    },
  ];

  const locations = [
    { id: '1', name: 'موقعك الحالي', address: 'تم التحديد تلقائياً', icon: 'location' },
    { id: '2', name: 'المنزل', address: 'شارع الملك عبد العزيز', icon: 'home' },
    { id: '3', name: 'العمل', address: 'طريق الظهران', icon: 'business' },
    { id: '4', name: 'مول الراشد', address: 'طريق الملك عبد العزيز', icon: 'shopping-bag' },
  ];

  const mockDriver = {
    name: 'أحمد محمد',
    rating: 4.9,
    trips: 2450,
    car: 'تويوتا كامري 2024',
    color: 'أبيض',
    plate: 'أ ب ج 1234',
    eta: 3,
  };

  useEffect(() => {
    if (tripState === TRIP_STATES.FINDING) {
      const timer = setTimeout(() => {
        setDriver(mockDriver);
        setTripState(TRIP_STATES.DRIVER_FOUND);
      }, 2500);
      return () => clearTimeout(timer);
    }

    if (tripState === TRIP_STATES.ARRIVING) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [tripState]);

  const handleLocationSelect = (location) => {
    if (tripState === TRIP_STATES.IDLE) {
      setPickup(location.name);
      setTripState(TRIP_STATES.DESTINATION);
    } else {
      setDestination(location.name);
      setTripState(TRIP_STATES.RIDE_SELECT);
    }
  };

  const handleFindDriver = () => {
    if (selectedRide && destination) {
      setTripState(TRIP_STATES.FINDING);
    }
  };

  const handleReset = () => {
    setTripState(TRIP_STATES.IDLE);
    setPickup('');
    setDestination('');
    setSelectedRide(null);
    setDriver(null);
    setProgress(0);
  };

  // Uber-style Location Input
  const renderLocationInput = () => (
    <View style={styles.locationContainer}>
      <View style={styles.locationHeader}>
        <TouchableOpacity onPress={() => tripState === TRIP_STATES.IDLE ? null : setTripState(TRIP_STATES.IDLE)}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.locationTitle}>
          {tripState === TRIP_STATES.IDLE ? 'موقعpickup' : 'الوجهة'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.locationInputWrapper}>
        <View style={styles.locationDot} />
        <TextInput
          style={styles.locationInput}
          placeholder={tripState === TRIP_STATES.IDLE ? 'أدخل موقعpickup' : 'أدخل الوجهة'}
          placeholderTextColor={colors.textTertiary}
          value={tripState === TRIP_STATES.IDLE ? pickup : destination}
          onChangeText={tripState === TRIP_STATES.IDLE ? setPickup : setDestination}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {locations.map((location) => (
          <TouchableOpacity
            key={location.id}
            style={styles.locationSuggestion}
            onPress={() => handleLocationSelect(location)}
            activeOpacity={0.7}
          >
            <View style={styles.suggestionIcon}>
              <Ionicons name={location.icon} size={20} color={colors.text} />
            </View>
            <View style={styles.suggestionInfo}>
              <Text style={styles.suggestionName}>{location.name}</Text>
              <Text style={styles.suggestionAddress}>{location.address}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  // Uber-style Ride Selection
  const renderRideSelection = () => (
    <View style={styles.rideContainer}>
      {/* Map Placeholder */}
      <View style={styles.mapPlaceholder}>
        <LinearGradient colors={['#1a1a1a', '#2d2d2d']} style={styles.mapGradient}>
          <View style={styles.mapCenter}>
            <Ionicons name="location" size={32} color={colors.primary} />
          </View>
        </LinearGradient>
      </View>

      {/* Bottom Sheet */}
      <View style={styles.rideSheet}>
        <View style={styles.sheetHandle} />
        
        <Text style={styles.rideSheetTitle}>اختر الرحلة</Text>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          {rideTypes.map((ride) => (
            <TouchableOpacity
              key={ride.id}
              style={[
                styles.rideOption,
                selectedRide?.id === ride.id && styles.rideOptionSelected,
              ]}
              onPress={() => setSelectedRide(ride)}
              activeOpacity={0.7}
            >
              <View style={styles.rideOptionLeft}>
                <View style={styles.rideOptionIcon}>
                  <Ionicons name={ride.icon} size={32} color={ride.color} />
                </View>
                <View style={styles.rideOptionInfo}>
                  <View style={styles.rideOptionHeader}>
                    <Text style={styles.rideOptionName}>{ride.name}</Text>
                    <View style={styles.rideOptionMeta}>
                      <Ionicons name="person-outline" size={14} color={colors.textTertiary} />
                      <Text style={styles.rideOptionCapacity}>{ride.capacity}</Text>
                    </View>
                  </View>
                  <Text style={styles.rideOptionTime}>{ride.time}</Text>
                  <Text style={styles.rideOptionDescription}>{ride.description}</Text>
                </View>
              </View>
              <Text style={styles.rideOptionPrice}>{ride.price} ر.س</Text>
              {selectedRide?.id === ride.id && (
                <View style={styles.rideOptionCheck}>
                  <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.rideFooter}>
          <View style={styles.paymentMethod}>
            <Ionicons name="wallet" size={20} color={colors.text} />
            <Text style={styles.paymentText}>نقدي</Text>
          </View>
          <TouchableOpacity
            style={[styles.confirmButton, !selectedRide && styles.confirmButtonDisabled]}
            onPress={handleFindDriver}
            disabled={!selectedRide}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmButtonText}>
              {selectedRide ? `تأكيد ${selectedRide.name}` : 'اختر رحلة'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Uber-style Finding Driver
  const renderFindingDriver = () => (
    <View style={styles.findingContainer}>
      <View style={styles.mapPlaceholder}>
        <LinearGradient colors={['#1a1a1a', '#2d2d2d']} style={styles.mapGradient}>
          <View style={styles.findingAnimation}>
            <View style={styles.pulseRing} />
            <View style={styles.pulseRing} />
            <View style={styles.pulseRing} />
            <View style={styles.carIconCenter}>
              <Ionicons name="car" size={32} color={colors.white} />
            </View>
          </View>
        </LinearGradient>
      </View>
      
      <View style={styles.findingSheet}>
        <View style={styles.sheetHandle} />
        <Text style={styles.findingTitle}>جاري البحث عن سائق...</Text>
        <Text style={styles.findingSubtitle}>نبحث عن أفضل السائقين بالقرب منك</Text>
        
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => setTripState(TRIP_STATES.RIDE_SELECT)}
        >
          <Text style={styles.cancelButtonText}>إلغاء</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Uber-style Driver Found
  const renderDriverFound = () => (
    <View style={styles.driverContainer}>
      <View style={styles.mapPlaceholder}>
        <LinearGradient colors={['#1a1a1a', '#2d2d2d']} style={styles.mapGradient}>
          <View style={styles.driverMarker}>
            <View style={styles.driverMarkerIcon}>
              <Ionicons name="car" size={24} color={colors.white} />
            </View>
            <View style={styles.driverEtaBadge}>
              <Text style={styles.driverEtaText}>{driver?.eta} دق</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.driverSheet}>
        <View style={styles.sheetHandle} />
        
        <View style={styles.driverHeader}>
          <View>
            <Text style={styles.driverStatus}>في الطريق إليك</Text>
            <Text style={styles.driverEta}>يصل خلال {driver?.eta} دقائق</Text>
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

        <View style={styles.driverInfo}>
          <View style={styles.driverAvatar}>
            <Text style={styles.driverAvatarText}>{driver?.name.charAt(0)}</Text>
          </View>
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>{driver?.name}</Text>
            <View style={styles.driverRating}>
              <Ionicons name="star" size={14} color="#fbbf24" />
              <Text style={styles.driverRatingText}>{driver?.rating}</Text>
            </View>
          </View>
          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleText}>{driver?.car}</Text>
            <Text style={styles.vehiclePlate}>{driver?.plate}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.arrivingButton}
          onPress={() => setTripState(TRIP_STATES.ARRIVING)}
        >
          <Text style={styles.arrivingButtonText}>محاكاة الوصول</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Main render based on state
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.sm) }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>تاتكس</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="help-circle-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Content based on state */}
      {tripState === TRIP_STATES.IDLE && renderLocationInput()}
      {tripState === TRIP_STATES.DESTINATION && renderLocationInput()}
      {tripState === TRIP_STATES.RIDE_SELECT && renderRideSelection()}
      {tripState === TRIP_STATES.FINDING && renderFindingDriver()}
      {tripState === TRIP_STATES.DRIVER_FOUND && renderDriverFound()}
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
  // Location Input
  locationContainer: {
    flex: 1,
    padding: spacing.md,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  locationInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grayLight,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    height: 50,
    marginBottom: spacing.md,
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text,
  },
  locationInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  locationSuggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  suggestionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestionInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  suggestionAddress: {
    fontSize: 13,
    color: colors.textTertiary,
    marginTop: 2,
  },
  // Ride Selection
  rideContainer: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
  },
  mapGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapCenter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rideSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl * 1.5,
    borderTopRightRadius: borderRadius.xl * 1.5,
    padding: spacing.md,
    maxHeight: SCREEN_HEIGHT * 0.6,
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
  rideSheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  rideOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rideOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '08',
  },
  rideOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rideOptionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rideOptionInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  rideOptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  rideOptionName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  rideOptionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rideOptionCapacity: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  rideOptionTime: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  rideOptionDescription: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  rideOptionPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginLeft: spacing.md,
  },
  rideOptionCheck: {
    position: 'absolute',
    left: spacing.md,
    top: '50%',
    marginTop: -12,
  },
  rideFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  paymentText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: colors.text,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  confirmButtonDisabled: {
    backgroundColor: colors.gray,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  // Finding Driver
  findingContainer: {
    flex: 1,
  },
  findingAnimation: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.primary + '30',
  },
  carIconCenter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  findingSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl * 1.5,
    borderTopRightRadius: borderRadius.xl * 1.5,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.lg,
  },
  findingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  findingSubtitle: {
    fontSize: 14,
    color: colors.textTertiary,
    marginBottom: spacing.xl,
  },
  cancelButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  // Driver Found
  driverContainer: {
    flex: 1,
  },
  driverMarker: {
    alignItems: 'center',
  },
  driverMarkerIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverEtaBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    ...shadows.sm,
  },
  driverEtaText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.text,
  },
  driverSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl * 1.5,
    borderTopRightRadius: borderRadius.xl * 1.5,
    padding: spacing.md,
    ...shadows.lg,
  },
  driverHeader: {
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
    color: colors.textTertiary,
    marginTop: 2,
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
  driverInfo: {
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
  driverAvatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
  },
  driverDetails: {
    flex: 1,
    marginLeft: spacing.md,
  },
  driverName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  driverRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 2,
  },
  driverRatingText: {
    fontSize: 13,
    color: colors.textTertiary,
  },
  vehicleInfo: {
    alignItems: 'flex-end',
  },
  vehicleText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  vehiclePlate: {
    fontSize: 13,
    color: colors.textTertiary,
  },
  arrivingButton: {
    backgroundColor: colors.success,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
  },
  arrivingButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
});

export default TaxiScreen;
