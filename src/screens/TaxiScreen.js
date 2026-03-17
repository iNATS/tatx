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
  FlatList,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Trip states
const TRIP_STATES = {
  IDLE: 'idle',
  PICKUP_LOCATION: 'pickup_location',
  DESTINATION: 'destination',
  SELECTING_RIDE: 'selecting_ride',
  FINDING_DRIVER: 'finding_driver',
  DRIVER_FOUND: 'driver_found',
  DRIVER_ARRIVING: 'driver_arriving',
  DRIVER_ARRIVED: 'driver_arrived',
  TRIP_IN_PROGRESS: 'trip_in_progress',
  TRIP_COMPLETED: 'trip_completed',
};

const TaxiScreen = ({ navigation }) => {
  const { isRTL } = useApp();
  const insets = useSafeAreaInsets();
  
  // State management
  const [tripState, setTripState] = useState(TRIP_STATES.IDLE);
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);
  const [driver, setDriver] = useState(null);
  const [tripProgress, setTripProgress] = useState(0);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [tripSummary, setTripSummary] = useState(null);

  // Mock data
  const rideTypes = [
    { id: 'economy', name: 'تاكسي', icon: 'car-outline', price: 15, time: '٥ دقائق', capacity: 4, color: colors.green },
    { id: 'comfort', name: 'مريح', icon: 'directions-car', price: 25, time: '٣ دقائق', capacity: 4, color: colors.primary, popular: true },
    { id: 'premium', name: 'فاخر', icon: 'diamond-outline', price: 40, time: '٧ دقائق', capacity: 4, color: colors.accent },
    { id: 'van', name: 'عائلي', icon: 'people-outline', price: 35, time: '١٠ دقائق', capacity: 7, color: colors.info },
  ];

  const locationSuggestions = [
    { id: '1', name: 'موقعك الحالي', address: 'تم التحديد تلقائياً', icon: 'location' },
    { id: '2', name: 'المنزل', address: 'شارع الملك عبد العزيز', icon: 'home' },
    { id: '3', name: 'العمل', address: 'طريق الظهران', icon: 'business' },
    { id: '4', name: 'مول الراشد', address: 'طريق الملك عبد العزيز', icon: 'shopping-bag' },
    { id: '5', name: 'مطار الملك فهد', address: 'طريق المطار', icon: 'airplane' },
  ];

  const destinationSuggestions = [
    { id: '1', name: 'مطار الملك فهد الدولي', address: 'طريق المطار - 25 كم', icon: 'airplane' },
    { id: '2', name: 'مول الراشد', address: 'طريق الملك عبد العزيز - 8 كم', icon: 'shopping-bag' },
    { id: '3', name: 'برج المياه', address: 'الكورنيش - 5 كم', icon: 'water' },
    { id: '4', name: 'جامعة الإمام', address: 'حي الجامعة - 12 كم', icon: 'school' },
    { id: '5', name: 'مستشفى الملك فهد', address: 'طريق الأمير محمد - 6 كم', icon: 'hospital' },
  ];

  const mockDriver = {
    name: 'أحمد محمد',
    rating: 4.9,
    trips: 2450,
    car: 'تويوتا كامري',
    year: '2024',
    color: 'أبيض',
    plate: 'أ ب ج 1234',
    phone: '+966 50 123 4567',
    eta: 3,
    distance: '2.5 كم',
  };

  // Effects
  useEffect(() => {
    if (tripState === TRIP_STATES.FINDING_DRIVER) {
      const timer = setTimeout(() => {
        setDriver(mockDriver);
        setTripState(TRIP_STATES.DRIVER_FOUND);
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (tripState === TRIP_STATES.DRIVER_ARRIVING) {
      const interval = setInterval(() => {
        setTripProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTripState(TRIP_STATES.DRIVER_ARRIVED);
            return 100;
          }
          return prev + 10;
        });
      }, 500);
      return () => clearInterval(interval);
    }

    if (tripState === TRIP_STATES.TRIP_IN_PROGRESS) {
      const interval = setInterval(() => {
        setTripProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTripState(TRIP_STATES.TRIP_COMPLETED);
            setTripSummary({
              distance: '8.5 كم',
              duration: '18 دقيقة',
              total: selectedRide?.price || 25,
            });
            return 100;
          }
          return prev + 5;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [tripState]);

  // Handlers
  const handleSelectPickup = (location) => {
    setPickupLocation(location.name);
    setShowPickupSuggestions(false);
    setTripState(TRIP_STATES.DESTINATION);
  };

  const handleSelectDestination = (location) => {
    setDestination(location.name);
    setShowDestinationSuggestions(false);
    setTripState(TRIP_STATES.SELECTING_RIDE);
  };

  const handleFindDriver = () => {
    if (selectedRide && destination) {
      setTripState(TRIP_STATES.FINDING_DRIVER);
    }
  };

  const handleDriverArriving = () => {
    setTripState(TRIP_STATES.DRIVER_ARRIVING);
    setTripProgress(0);
  };

  const handleStartTrip = () => {
    setTripState(TRIP_STATES.TRIP_IN_PROGRESS);
    setTripProgress(0);
  };

  const handleCompleteTrip = () => {
    setTripState(TRIP_STATES.TRIP_COMPLETED);
  };

  const handleReset = () => {
    setTripState(TRIP_STATES.IDLE);
    setPickupLocation('');
    setDestination('');
    setSelectedRide(null);
    setDriver(null);
    setTripProgress(0);
    setTripSummary(null);
  };

  // Render functions for each state
  const renderIdle = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <Ionicons name="taxi" size={64} color={colors.primary} />
      </View>
      <Text style={styles.emptyTitle}>احجز رحلتك التالية</Text>
      <Text style={styles.emptySubtitle}>اختر موقعpickup والوجهة للبدء</Text>
      <TouchableOpacity 
        style={styles.startButton}
        onPress={() => setTripState(TRIP_STATES.PICKUP_LOCATION)}
      >
        <Text style={styles.startButtonText}>ابدأ الحجز</Text>
        <Ionicons name="arrow-forward" size={20} color={colors.white} />
      </TouchableOpacity>
    </View>
  );

  const renderLocationSelection = () => (
    <View style={styles.locationContainer}>
      <View style={styles.locationHeader}>
        <TouchableOpacity onPress={() => setTripState(TRIP_STATES.IDLE)}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.locationTitle}>
          {tripState === TRIP_STATES.PICKUP_LOCATION ? 'موقعpickup' : 'الوجهة'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder={tripState === TRIP_STATES.PICKUP_LOCATION ? 'أدخل موقعpickup' : 'أدخل الوجهة'}
          placeholderTextColor={colors.textSecondary}
          value={tripState === TRIP_STATES.PICKUP_LOCATION ? pickupLocation : destination}
          onChangeText={tripState === TRIP_STATES.PICKUP_LOCATION ? setPickupLocation : setDestination}
          onFocus={() => tripState === TRIP_STATES.PICKUP_LOCATION 
            ? setShowPickupSuggestions(true) 
            : setShowDestinationSuggestions(true)
          }
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {(tripState === TRIP_STATES.PICKUP_LOCATION ? locationSuggestions : destinationSuggestions).map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.suggestionItem}
            onPress={() => tripState === TRIP_STATES.PICKUP_LOCATION 
              ? handleSelectPickup(item) 
              : handleSelectDestination(item)
            }
          >
            <View style={[styles.suggestionIcon, { backgroundColor: colors.primary + '15' }]}>
              <Ionicons name={item.icon} size={22} color={colors.primary} />
            </View>
            <View style={styles.suggestionInfo}>
              <Text style={styles.suggestionName}>{item.name}</Text>
              <Text style={styles.suggestionAddress}>{item.address}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderRideSelection = () => (
    <View style={styles.rideContainer}>
      {/* Map Preview */}
      <View style={styles.mapPreview}>
        <View style={styles.routePreview}>
          <View style={[styles.routeDot, { backgroundColor: colors.success }]} />
          <View style={styles.routeLine} />
          <View style={[styles.routeDot, { backgroundColor: colors.primary }]} />
        </View>
        <Text style={styles.routeText}>
          {pickupLocation || 'موقعpickup'} → {destination}
        </Text>
      </View>

      {/* Ride Types */}
      <View style={styles.rideList}>
        <Text style={styles.sectionTitle}>اختر نوع التاكسي</Text>
        {rideTypes.map((ride) => (
          <TouchableOpacity
            key={ride.id}
            style={[
              styles.rideItem,
              selectedRide?.id === ride.id && styles.rideItemSelected,
              selectedRide?.id === ride.id && { borderColor: ride.color },
            ]}
            onPress={() => setSelectedRide(ride)}
          >
            {ride.popular && (
              <View style={[styles.popularBadge, { backgroundColor: ride.color }]}>
                <Text style={styles.popularText}>مميز</Text>
              </View>
            )}
            <View style={[styles.rideIcon, { backgroundColor: ride.color + '15' }]}>
              <Ionicons name={ride.icon} size={26} color={ride.color} />
            </View>
            <View style={styles.rideInfo}>
              <Text style={styles.rideName}>{ride.name}</Text>
              <View style={styles.rideMeta}>
                <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
                <Text style={styles.rideTime}>{ride.time}</Text>
                <Ionicons name="people-outline" size={14} color={colors.textSecondary} />
                <Text style={styles.rideCapacity}>{ride.capacity} ركاب</Text>
              </View>
            </View>
            <Text style={[styles.ridePrice, { color: ride.color }]}>{ride.price} ر.س</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Confirm Button */}
      <View style={styles.confirmContainer}>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            !selectedRide && styles.confirmButtonDisabled,
          ]}
          onPress={handleFindDriver}
          disabled={!selectedRide}
        >
          <Text style={styles.confirmButtonText}>تأكيد الحجز</Text>
          <Text style={styles.confirmSubtext}>{selectedRide?.price || 0} ر.س</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFindingDriver = () => (
    <View style={styles.findingContainer}>
      <View style={styles.findingAnimation}>
        <View style={styles.pulseRing} />
        <View style={styles.pulseRing} />
        <View style={styles.pulseRing} />
        <View style={styles.carIconCenter}>
          <Ionicons name="taxi" size={40} color={colors.white} />
        </View>
      </View>
      <Text style={styles.findingTitle}>جاري البحث عن سائق...</Text>
      <Text style={styles.findingSubtitle}>نبحث عن أفضل السائقين بالقرب منك</Text>
      <TouchableOpacity 
        style={styles.cancelButton}
        onPress={() => setTripState(TRIP_STATES.SELECTING_RIDE)}
      >
        <Text style={styles.cancelButtonText}>إلغاء البحث</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDriverFound = () => (
    <View style={styles.driverContainer}>
      {/* Map Area */}
      <View style={styles.driverMap}>
        <View style={styles.driverCarMarker}>
          <View style={[styles.carMarker, { backgroundColor: colors.primary }]}>
            <Ionicons name="taxi" size={20} color={colors.white} />
          </View>
          <View style={styles.etaBadge}>
            <Text style={styles.etaText}>{driver?.eta} دق</Text>
          </View>
        </View>
      </View>

      {/* Driver Info */}
      <View style={styles.driverInfoCard}>
        <View style={styles.driverHeader}>
          <View>
            <Text style={styles.driverStatus}>في الطريق إليك</Text>
            <Text style={styles.driverEta}>سيصل خلال {driver?.eta} دقائق</Text>
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

        <View style={styles.driverDetails}>
          <View style={styles.driverAvatar}>
            <Ionicons name="person" size={36} color={colors.white} />
          </View>
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{driver?.name}</Text>
            <View style={styles.driverRating}>
              <Ionicons name="star" size={16} color={colors.warning} />
              <Text style={styles.driverRatingText}>{driver?.rating}</Text>
              <Text style={styles.driverTrips}> • {driver?.trips} رحلة</Text>
            </View>
          </View>
        </View>

        <View style={styles.vehicleCard}>
          <View style={styles.vehicleInfo}>
            <Ionicons name="car" size={24} color={colors.primary} />
            <View style={styles.vehicleDetails}>
              <Text style={styles.vehicleText}>{driver?.car} {driver?.year}</Text>
              <Text style={styles.vehicleColor}>{driver?.color}</Text>
            </View>
            <View style={styles.plateBadge}>
              <Text style={styles.plateText}>{driver?.plate}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.arrivingButton} onPress={handleDriverArriving}>
          <Text style={styles.arrivingButtonText}>محاكاة وصول السائق</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDriverArriving = () => (
    <View style={styles.arrivingContainer}>
      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>السائق في الطريق</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${tripProgress}%` }]} />
        </View>
        <Text style={styles.progressText}>{tripProgress}%</Text>
      </View>
      
      {tripProgress >= 100 && (
        <TouchableOpacity style={styles.startTripButton} onPress={handleStartTrip}>
          <Text style={styles.startTripButtonText}>بدء الرحلة</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderDriverArrived = () => (
    <View style={styles.arrivedContainer}>
      <View style={styles.arrivedIcon}>
        <Ionicons name="checkmark-circle" size={80} color={colors.success} />
      </View>
      <Text style={styles.arrivedTitle}>وصل السائق!</Text>
      <Text style={styles.arrivedSubtitle}>السائق في انتظارك عند موقعpickup</Text>
      
      <View style={styles.tripInfoCard}>
        <View style={styles.tripRoute}>
          <View style={styles.tripPoint}>
            <View style={[styles.tripDot, { backgroundColor: colors.success }]} />
            <Text style={styles.tripPointText}>{pickupLocation}</Text>
          </View>
          <View style={styles.tripLine} />
          <View style={styles.tripPoint}>
            <View style={[styles.tripDot, { backgroundColor: colors.primary }]} />
            <Text style={styles.tripPointText}>{destination}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.startTripButton} onPress={handleStartTrip}>
        <Text style={styles.startTripButtonText}>بدء الرحلة</Text>
      </TouchableOpacity>
    </View>
  );

  const renderTripInProgress = () => (
    <View style={styles.tripContainer}>
      <View style={styles.tripProgress}>
        <Text style={styles.tripProgressTitle}>الرحلة جارية</Text>
        <View style={styles.tripProgressBar}>
          <View style={[styles.tripProgressFill, { width: `${tripProgress}%` }]} />
        </View>
        <Text style={styles.tripProgressText}>{tripProgress}%</Text>
      </View>

      <View style={styles.liveTripInfo}>
        <View style={styles.liveStat}>
          <Ionicons name="speedometer" size={24} color={colors.primary} />
          <Text style={styles.liveStatValue}>45 كم/س</Text>
          <Text style={styles.liveStatLabel}>السرعة</Text>
        </View>
        <View style={styles.liveStat}>
          <Ionicons name="navigate" size={24} color={colors.success} />
          <Text style={styles.liveStatValue}>5.2 كم</Text>
          <Text style={styles.liveStatLabel}>المتبقي</Text>
        </View>
        <View style={styles.liveStat}>
          <Ionicons name="time" size={24} color={colors.warning} />
          <Text style={styles.liveStatValue}>8 دق</Text>
          <Text style={styles.liveStatLabel}>الوقت</Text>
        </View>
      </View>

      {tripProgress >= 100 && (
        <TouchableOpacity style={styles.completeButton} onPress={handleCompleteTrip}>
          <Text style={styles.completeButtonText}>إنهاء الرحلة</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderTripCompleted = () => (
    <View style={styles.completedContainer}>
      <View style={styles.completedIcon}>
        <Ionicons name="trophy" size={60} color={colors.warning} />
      </View>
      <Text style={styles.completedTitle}>رحلة سعيدة!</Text>
      <Text style={styles.completedSubtitle}>شكراً لاستخدامك تاتكس</Text>

      <View style={styles.tripSummary}>
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryTitle}>ملخص الرحلة</Text>
        </View>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Ionicons name="navigate" size={20} color={colors.primary} />
            <Text style={styles.summaryValue}>{tripSummary?.distance}</Text>
            <Text style={styles.summaryLabel}>المسافة</Text>
          </View>
          <View style={styles.summaryItem}>
            <Ionicons name="time" size={20} color={colors.success} />
            <Text style={styles.summaryValue}>{tripSummary?.duration}</Text>
            <Text style={styles.summaryLabel}>الوقت</Text>
          </View>
          <View style={styles.summaryItem}>
            <Ionicons name="wallet" size={20} color={colors.warning} />
            <Text style={styles.summaryValue}>{tripSummary?.total} ر.س</Text>
            <Text style={styles.summaryLabel}>المجموع</Text>
          </View>
        </View>
      </View>

      <View style={styles.ratingContainer}>
        <Text style={styles.ratingTitle}>قيّم تجربتك</Text>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star}>
              <Ionicons name="star" size={32} color={colors.warning} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.newRideButton} onPress={handleReset}>
        <Text style={styles.newRideButtonText}>حجز رحلة جديدة</Text>
      </TouchableOpacity>
    </View>
  );

  // Main render
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.sm) }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>تاتكس تاكسي</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="help-circle-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Content based on state */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {tripState === TRIP_STATES.IDLE && renderIdle()}
        {(tripState === TRIP_STATES.PICKUP_LOCATION || tripState === TRIP_STATES.DESTINATION) && renderLocationSelection()}
        {tripState === TRIP_STATES.SELECTING_RIDE && renderRideSelection()}
        {tripState === TRIP_STATES.FINDING_DRIVER && renderFindingDriver()}
        {tripState === TRIP_STATES.DRIVER_FOUND && renderDriverFound()}
        {tripState === TRIP_STATES.DRIVER_ARRIVING && renderDriverArriving()}
        {tripState === TRIP_STATES.DRIVER_ARRIVED && renderDriverArrived()}
        {tripState === TRIP_STATES.TRIP_IN_PROGRESS && renderTripInProgress()}
        {tripState === TRIP_STATES.TRIP_COMPLETED && renderTripCompleted()}
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
    paddingBottom: spacing.sm,
    backgroundColor: colors.white,
  },
  headerBtn: {
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
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  startButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    gap: spacing.sm,
    ...shadows.md,
  },
  startButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.white,
  },
  // Location Selection
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    height: 50,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
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
    marginLeft: spacing.md,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  suggestionAddress: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  // Ride Selection
  rideContainer: {
    flex: 1,
  },
  mapPreview: {
    backgroundColor: colors.grayLight,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routePreview: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  routeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  routeLine: {
    width: 2,
    height: 40,
    backgroundColor: colors.primary,
    borderStyle: 'dashed',
  },
  routeText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  rideList: {
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  rideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
    ...shadows.sm,
  },
  rideItemSelected: {
    backgroundColor: colors.primary + '08',
  },
  rideIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rideInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  rideName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  rideMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: 4,
  },
  rideTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  rideCapacity: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  ridePrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    left: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  popularText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.white,
  },
  confirmContainer: {
    padding: spacing.md,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    ...shadows.md,
  },
  confirmButtonDisabled: {
    backgroundColor: colors.gray,
  },
  confirmButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.white,
  },
  confirmSubtext: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  // Finding Driver
  findingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  findingAnimation: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  pulseRing: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.primary + '30',
    opacity: 0,
  },
  carIconCenter: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  findingTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  findingSubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  cancelButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  cancelButtonText: {
    fontSize: 16,
    color: colors.error,
    fontWeight: '600',
  },
  // Driver Found
  driverContainer: {
    flex: 1,
  },
  driverMap: {
    flex: 1,
    backgroundColor: colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverCarMarker: {
    alignItems: 'center',
  },
  carMarker: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  etaBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
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
  driverInfoCard: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl * 1.5,
    borderTopRightRadius: borderRadius.xl * 1.5,
    padding: spacing.lg,
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
    color: colors.textSecondary,
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
  driverDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  driverAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverInfo: {
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
    marginBottom: spacing.md,
  },
  vehicleInfo: {
    flexDirection: 'row',
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
  // Driver Arriving
  arrivingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: colors.grayLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: spacing.md,
  },
  startTripButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    marginTop: spacing.xl,
    ...shadows.md,
  },
  startTripButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.white,
  },
  // Driver Arrived
  arrivedContainer: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrivedIcon: {
    marginBottom: spacing.lg,
  },
  arrivedTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  arrivedSubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  tripInfoCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    width: '100%',
    marginBottom: spacing.xl,
    ...shadows.md,
  },
  tripRoute: {
    paddingVertical: spacing.sm,
  },
  tripPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  tripDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  tripPointText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: spacing.sm,
    flex: 1,
  },
  tripLine: {
    width: 2,
    height: 20,
    backgroundColor: colors.grayLight,
    marginLeft: 5,
    marginVertical: -spacing.sm,
  },
  // Trip In Progress
  tripContainer: {
    flex: 1,
    padding: spacing.xl,
  },
  tripProgress: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  tripProgressTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  tripProgressBar: {
    width: '100%',
    height: 8,
    backgroundColor: colors.grayLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  tripProgressFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 4,
  },
  tripProgressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: spacing.md,
  },
  liveTripInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.xl,
    ...shadows.md,
  },
  liveStat: {
    alignItems: 'center',
  },
  liveStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.xs,
  },
  liveStatLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  completeButton: {
    backgroundColor: colors.success,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    ...shadows.md,
  },
  completeButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.white,
  },
  // Trip Completed
  completedContainer: {
    flex: 1,
    padding: spacing.xl,
    alignItems: 'center',
  },
  completedIcon: {
    marginBottom: spacing.lg,
  },
  completedTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  completedSubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  tripSummary: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    width: '100%',
    marginBottom: spacing.xl,
    ...shadows.md,
  },
  summaryHeader: {
    marginBottom: spacing.md,
  },
  summaryTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.xs,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  ratingTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  stars: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  newRideButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    width: '100%',
    alignItems: 'center',
    ...shadows.md,
  },
  newRideButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.white,
  },
});

export default TaxiScreen;
