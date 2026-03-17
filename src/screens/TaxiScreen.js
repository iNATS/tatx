import React, { useState, useEffect, useRef } from 'react';
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
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
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
  const [showBookModal, setShowBookModal] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const webViewRef = useRef(null);

  const rideTypes = [
    { 
      id: 'uberx', 
      name: 'تاكسي', 
      icon: 'car-outline', 
      price: 15, 
      time: '٣ دقائق', 
      capacity: 4,
      description: 'رحلات يومية ميسورة',
    },
    { 
      id: 'comfort', 
      name: 'مريح', 
      icon: 'directions-car', 
      price: 25, 
      time: '٥ دقائق', 
      capacity: 4,
      description: 'سيارات أحدث وأوسع',
    },
    { 
      id: 'premium', 
      name: 'فاخر', 
      icon: 'diamond-outline', 
      price: 40, 
      time: '٧ دقائق', 
      capacity: 4,
      description: 'فخامة وتميز',
    },
    { 
      id: 'van', 
      name: 'عائلي', 
      icon: 'people-outline', 
      price: 35, 
      time: '١٠ دقائق', 
      capacity: 7,
      description: 'للعائلات والمجموعات',
    },
    { 
      id: 'moto', 
      name: 'دراجة', 
      icon: 'bicycle-outline', 
      price: 10, 
      time: '٢ دقائق', 
      capacity: 1,
      description: 'سريع وعملي',
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

  // Leaflet map HTML with routing and search
  const mapHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css" />
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        #map { position: absolute; top: 0; bottom: 0; width: 100%; }
        .search-box {
          position: absolute;
          top: 50px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          background: white;
          padding: 12px 16px;
          border-radius: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          gap: 8px;
          width: 90%;
          max-width: 400px;
        }
        .search-box input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 15px;
        }
        .search-box button {
          background: #E91E63;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          color: white;
          cursor: pointer;
        }
        .location-btn {
          position: absolute;
          bottom: 100px;
          right: 20px;
          z-index: 1000;
          background: white;
          width: 50px;
          height: 50px;
          border-radius: 25px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .leaflet-container { font-family: inherit; }
        .leaflet-routing-container { display: none; }
      </style>
    </head>
    <body>
      <div class="search-box">
        <span style="color: #666;">🔍</span>
        <input type="text" id="searchInput" placeholder="ابحث عن مكان..." />
        <button onclick="searchLocation()">بحث</button>
      </div>
      <div class="location-btn" onclick="getCurrentLocation()">
        <span style="font-size: 24px;">📍</span>
      </div>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js"></script>
      <script>
        let map, marker, routingControl;
        let pickupCoords = null;
        let destinationCoords = null;

        // Initialize map centered on Dammam
        map = L.map('map').setView([26.4207, 50.0888], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add marker for current location
        marker = L.marker([26.4207, 50.0888], {
          icon: L.divIcon({
            html: '<div style="background: #E91E63; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          })
        }).addTo(map);

        // Get current location
        function getCurrentLocation() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                map.setView([lat, lng], 15);
                marker.setLatLng([lat, lng]);
                pickupCoords = [lat, lng];
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'location',
                  latitude: lat,
                  longitude: lng,
                  address: 'موقعك الحالي'
                }));
              },
              (error) => {
                console.error('Error getting location:', error);
              }
            );
          }
        }

        // Search location
        function searchLocation() {
          const query = document.getElementById('searchInput').value;
          if (query) {
            fetch(\`https://nominatim.openstreetmap.org/search?format=json&q=\${encodeURIComponent(query)}&limit=1\`)
              .then(response => response.json())
              .then(data => {
                if (data.length > 0) {
                  const lat = parseFloat(data[0].lat);
                  const lng = parseFloat(data[0].lon);
                  map.setView([lat, lng], 15);
                  
                  // Add destination marker
                  if (destinationCoords) {
                    L.marker([lat, lng], {
                      icon: L.divIcon({
                        html: '<div style="background: #10B981; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"></div>',
                        iconSize: [20, 20],
                        iconAnchor: [10, 10]
                      })
                    }).addTo(map);
                  }
                  
                  destinationCoords = [lat, lng];
                  window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'destination',
                    latitude: lat,
                    longitude: lng,
                    address: query
                  }));
                }
              })
              .catch(error => console.error('Search error:', error));
          }
        }

        // Draw route
        function drawRoute(start, end) {
          if (routingControl) {
            routingControl.remove();
          }
          routingControl = L.Routing.control({
            waypoints: [
              L.latLng(start[0], start[1]),
              L.latLng(end[0], end[1])
            ],
            routeWhileDragging: true,
            show: false,
            createMarker: function() { return null; }
          }).addTo(map);
        }

        // Listen for messages from React Native
        window.addEventListener('message', (event) => {
          const data = event.data;
          if (data.type === 'setPickup') {
            pickupCoords = [data.lat, data.lng];
            map.setView([data.lat, data.lng], 15);
            marker.setLatLng([data.lat, data.lng]);
          }
          if (data.type === 'setDestination') {
            destinationCoords = [data.lat, data.lng];
            if (pickupCoords) {
              drawRoute(pickupCoords, destinationCoords);
            }
          }
          if (data.type === 'centerOnDriver') {
            map.setView([data.lat, data.lng], 16);
          }
        });

        // Send initial ready state
        setTimeout(() => {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'ready' }));
        }, 1000);
      </script>
    </body>
    </html>
  `;

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
      setShowBookModal(true);
    }
  };

  const handleBookRide = () => {
    if (selectedRide) {
      setShowBookModal(false);
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

  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'ready') {
        setMapReady(true);
      }
      if (data.type === 'location' || data.type === 'destination') {
        console.log('Map message:', data);
      }
    } catch (error) {
      console.error('Message parsing error:', error);
    }
  };

  // Location Input View
  const renderLocationInput = () => (
    <View style={styles.locationContainer}>
      <View style={styles.locationHeader}>
        <Text style={styles.locationTitle}>
          {tripState === TRIP_STATES.IDLE ? 'موقعpickup' : 'الوجهة'}
        </Text>
      </View>

      <View style={styles.locationInputWrapper}>
        <View style={[styles.locationDot, { backgroundColor: tripState === TRIP_STATES.IDLE ? colors.success : colors.primary }]} />
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
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  // Book Modal
  const renderBookModal = () => (
    <Modal
      visible={showBookModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowBookModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHandle} />
          
          <Text style={styles.modalTitle}>تأكيد الحجز</Text>
          
          {selectedRide && (
            <View style={styles.selectedRideInfo}>
              <View style={styles.selectedRideHeader}>
                <Ionicons name={selectedRide.icon} size={32} color={colors.text} />
                <View style={styles.selectedRideDetails}>
                  <Text style={styles.selectedRideName}>{selectedRide.name}</Text>
                  <Text style={styles.selectedRideTime}>{selectedRide.time} • {selectedRide.capacity} ركاب</Text>
                </View>
                <Text style={styles.selectedRidePrice}>{selectedRide.price} ر.س</Text>
              </View>
              <Text style={styles.selectedRideDescription}>{selectedRide.description}</Text>
            </View>
          )}

          <View style={styles.modalRoute}>
            <View style={styles.modalRoutePoint}>
              <View style={[styles.modalRouteDot, { backgroundColor: colors.success }]} />
              <Text style={styles.modalRouteText}>{pickup || 'موقعpickup'}</Text>
            </View>
            <View style={styles.modalRouteLine} />
            <View style={styles.modalRoutePoint}>
              <View style={[styles.modalRouteDot, { backgroundColor: colors.primary }]} />
              <Text style={styles.modalRouteText}>{destination}</Text>
            </View>
          </View>

          <View style={styles.modalPayment}>
            <Ionicons name="wallet" size={20} color={colors.text} />
            <Text style={styles.modalPaymentText}>الدفع نقداً</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
          </View>

          <TouchableOpacity
            style={styles.modalBookButton}
            onPress={handleBookRide}
            disabled={!selectedRide}
            activeOpacity={0.8}
          >
            <Text style={styles.modalBookButtonText}>تأكيد الحجز</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modalCancelButton}
            onPress={() => setShowBookModal(false)}
          >
            <Text style={styles.modalCancelButtonText}>إلغاء</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* Full Screen Map */}
      <View style={styles.mapContainer}>
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html: mapHTML }}
          style={styles.map}
          onMessage={handleMessage}
          javaScriptEnabled
          domStorageEnabled
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top + 8, spacing.md) }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>تاتكس</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="help-circle-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Location Input Overlay */}
      {(tripState === TRIP_STATES.IDLE || tripState === TRIP_STATES.DESTINATION) && (
        <View style={[styles.overlayContainer, { paddingTop: Math.max(insets.top + 100, 120) }]}>
          <View style={styles.overlayCard}>
            {renderLocationInput()}
          </View>
        </View>
      )}

      {/* Ride Selection Slider */}
      {tripState === TRIP_STATES.RIDE_SELECT && (
        <View style={[styles.rideContainer, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
          <View style={styles.rideCard}>
            <Text style={styles.rideTitle}>اختر الرحلة</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.rideSlider}
            >
              {rideTypes.map((ride) => (
                <TouchableOpacity
                  key={ride.id}
                  style={[
                    styles.rideSliderCard,
                    selectedRide?.id === ride.id && styles.rideSliderCardSelected,
                  ]}
                  onPress={() => setSelectedRide(ride)}
                  activeOpacity={0.8}
                >
                  <View style={styles.rideSliderIcon}>
                    <Ionicons name={ride.icon} size={36} color={colors.text} />
                  </View>
                  <Text style={styles.rideSliderName}>{ride.name}</Text>
                  <Text style={styles.rideSliderTime}>{ride.time}</Text>
                  <Text style={styles.rideSliderPrice}>{ride.price} ر.س</Text>
                  {selectedRide?.id === ride.id && (
                    <View style={styles.rideSliderCheck}>
                      <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => setShowBookModal(true)}
              disabled={!selectedRide}
              activeOpacity={0.8}
            >
              <Text style={styles.bookButtonText}>
                {selectedRide ? `حجز ${selectedRide.name}` : 'اختر رحلة'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Book Modal */}
      {renderBookModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    zIndex: 1000,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.md,
    zIndex: 999,
  },
  overlayCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    ...shadows.lg,
  },
  locationContainer: {
    maxHeight: SCREEN_HEIGHT * 0.5,
  },
  locationHeader: {
    marginBottom: spacing.md,
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
    width: 10,
    height: 10,
    borderRadius: 5,
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.md,
    zIndex: 999,
  },
  rideCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    paddingBottom: spacing.md,
    ...shadows.lg,
  },
  rideTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  rideSlider: {
    gap: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  rideSliderCard: {
    width: 140,
    backgroundColor: colors.grayLight,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    alignItems: 'center',
    position: 'relative',
  },
  rideSliderCardSelected: {
    backgroundColor: colors.primary + '15',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  rideSliderIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  rideSliderName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  rideSliderTime: {
    fontSize: 12,
    color: colors.textTertiary,
    marginBottom: 4,
  },
  rideSliderPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  rideSliderCheck: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  bookButton: {
    backgroundColor: colors.text,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl * 1.5,
    borderTopRightRadius: borderRadius.xl * 1.5,
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.gray,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  selectedRideInfo: {
    backgroundColor: colors.grayLight,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  selectedRideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  selectedRideDetails: {
    flex: 1,
    marginLeft: spacing.md,
  },
  selectedRideName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  selectedRideTime: {
    fontSize: 13,
    color: colors.textTertiary,
    marginTop: 2,
  },
  selectedRidePrice: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  selectedRideDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  modalRoute: {
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  modalRoutePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  modalRouteDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  modalRouteText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: spacing.sm,
    flex: 1,
  },
  modalRouteLine: {
    width: 2,
    height: 20,
    backgroundColor: colors.grayLight,
    marginLeft: 5,
    marginVertical: -spacing.sm,
  },
  modalPayment: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    marginBottom: spacing.md,
  },
  modalPaymentText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginLeft: spacing.sm,
    flex: 1,
  },
  modalBookButton: {
    backgroundColor: colors.text,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  modalBookButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  modalCancelButton: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  modalCancelButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});

export default TaxiScreen;
