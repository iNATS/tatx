import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';
import PriceDisplay from '../components/PriceDisplay';

const rideTypes = [
  { id: 'economy', name: 'Economy', label: 'اقتصادي', eta: '3 دقائق', price: 18, seats: 4, note: 'أفضل سعر للمشاوير اليومية', icon: 'car-outline' },
  { id: 'comfort', name: 'Comfort', label: 'راحة', eta: '5 دقائق', price: 28, seats: 4, note: 'أسرع وصول وسيارات أحدث', icon: 'car-sport-outline' },
  { id: 'family', name: 'Family', label: 'عائلي', eta: '7 دقائق', price: 36, seats: 6, note: 'مساحة أكبر للأفراد أو الأمتعة', icon: 'people-outline' },
];

const suggestedPlaces = [
  { id: '1', title: 'المنزل', address: 'حي الياسمين، الرياض', lat: 24.8396, lng: 46.6437, icon: 'home-outline' },
  { id: '2', title: 'العمل', address: 'مركز الملك عبدالله المالي', lat: 24.7667, lng: 46.6436, icon: 'briefcase-outline' },
  { id: '3', title: 'المطار', address: 'مطار الملك خالد الدولي', lat: 24.9576, lng: 46.6988, icon: 'airplane-outline' },
];

const mapHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    html, body, #map { height: 100%; width: 100%; margin: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #f7f1f3; }
    .leaflet-control-attribution { display: none; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    const map = L.map('map', { zoomControl: false }).setView([24.774265, 46.738586], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

    let pickupMarker = null;
    let destinationMarker = null;
    let routeLine = null;

    const pickupIcon = L.divIcon({
      html: '<div style="width:18px;height:18px;border-radius:9px;background:#34C759;border:3px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,.18)"></div>',
      className: '',
      iconSize: [18, 18],
      iconAnchor: [9, 9]
    });

    const destinationIcon = L.divIcon({
      html: '<div style="width:18px;height:18px;border-radius:9px;background:#DA3C57;border:3px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,.18)"></div>',
      className: '',
      iconSize: [18, 18],
      iconAnchor: [9, 9]
    });

    function send(data) {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify(data));
      }
    }

    function drawRoute() {
      if (!pickupMarker || !destinationMarker) return;
      const a = pickupMarker.getLatLng();
      const b = destinationMarker.getLatLng();
      if (routeLine) map.removeLayer(routeLine);
      routeLine = L.polyline([a, b], {
        color: '#DA3C57',
        weight: 5,
        opacity: 0.9,
        dashArray: '10 8'
      }).addTo(map);
      map.fitBounds(routeLine.getBounds(), { padding: [60, 60] });
    }

    function setPickup(lat, lng, label) {
      if (pickupMarker) map.removeLayer(pickupMarker);
      pickupMarker = L.marker([lat, lng], { icon: pickupIcon }).addTo(map);
      send({ type: 'pickup-set', label, lat, lng });
      drawRoute();
    }

    function setDestination(lat, lng, label) {
      if (destinationMarker) map.removeLayer(destinationMarker);
      destinationMarker = L.marker([lat, lng], { icon: destinationIcon }).addTo(map);
      send({ type: 'destination-set', label, lat, lng });
      drawRoute();
    }

    function setCurrentLocation() {
      if (!navigator.geolocation) {
        setPickup(24.774265, 46.738586, 'موقعي الحالي');
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          map.setView([lat, lng], 14);
          setPickup(lat, lng, 'موقعي الحالي');
        },
        () => {
          setPickup(24.774265, 46.738586, 'موقعي الحالي');
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }

    async function searchPlace(query, kind) {
      if (!query) return;
      try {
        const url = 'https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + encodeURIComponent(query + ' الرياض');
        const res = await fetch(url, { headers: { 'Accept-Language': 'ar' } });
        const data = await res.json();
        if (!data || !data.length) return;
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        if (kind === 'pickup') setPickup(lat, lng, query);
        if (kind === 'destination') setDestination(lat, lng, query);
      } catch (e) {}
    }

    window.addEventListener('message', async (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'init') setCurrentLocation();
        if (data.type === 'pickup-search') searchPlace(data.query, 'pickup');
        if (data.type === 'destination-search') searchPlace(data.query, 'destination');
        if (data.type === 'destination-coords') setDestination(data.lat, data.lng, data.label);
      } catch (e) {}
    });

    setTimeout(() => send({ type: 'ready' }), 300);
  </script>
</body>
</html>
`;

const TaxiScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { rowDirection, textAlignStart, isRTL } = useApp();
  const webViewRef = useRef(null);
  const timersRef = useRef([]);
  const [pickup, setPickup] = useState('جاري تحديد موقعك');
  const [destination, setDestination] = useState('');
  const [selectedRide, setSelectedRide] = useState(rideTypes[0].id);
  const [tripPhase, setTripPhase] = useState('idle');
  const backIcon = isRTL ? 'arrow-forward' : 'arrow-back';
  const driver = { name: 'الكابتن سامي', car: 'هيونداي سوناتا', plate: 'ح ر س 4821' };

  const selectedRideData = useMemo(
    () => rideTypes.find((ride) => ride.id === selectedRide) || rideTypes[0],
    [selectedRide]
  );

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const handleMapMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'ready') {
        webViewRef.current?.postMessage(JSON.stringify({ type: 'init' }));
      }
      if (data.type === 'pickup-set') {
        setPickup(data.label);
      }
      if (data.type === 'destination-set') {
        setDestination(data.label);
      }
    } catch (error) {
      console.warn('Taxi map message error', error);
    }
  };

  const searchPickup = (value) => {
    setPickup(value);
    webViewRef.current?.postMessage(JSON.stringify({ type: 'pickup-search', query: value }));
  };

  const searchDestination = (value) => {
    setDestination(value);
    webViewRef.current?.postMessage(JSON.stringify({ type: 'destination-search', query: value }));
  };

  const chooseSuggestedPlace = (place) => {
    setDestination(place.title);
    webViewRef.current?.postMessage(
      JSON.stringify({ type: 'destination-coords', lat: place.lat, lng: place.lng, label: place.title })
    );
  };

  const requestRide = () => {
    if (!destination.trim()) {
      Alert.alert('الوجهة مطلوبة', 'أدخل وجهتك أو اختر مكانًا سريعًا أولاً.');
      return;
    }
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setTripPhase('searching');
    timersRef.current.push(setTimeout(() => setTripPhase('arriving'), 1800));
    timersRef.current.push(setTimeout(() => setTripPhase('on_trip'), 4200));
  };

  const resetTrip = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setTripPhase('idle');
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <View style={styles.webFallback}>
          <Text style={styles.webFallbackText}>الخريطة التفاعلية تعمل على الجوال. في الويب نعرض لك تدفق الحجز فقط.</Text>
        </View>
      ) : (
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html: mapHTML }}
          onMessage={handleMapMessage}
          style={styles.map}
          javaScriptEnabled
          domStorageEnabled
        />
      )}

      <View style={[styles.topBar, { top: insets.top + spacing.sm, flexDirection: rowDirection }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.topButton}>
          <Ionicons name={backIcon} size={22} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton} onPress={() => Alert.alert('جدولة الرحلة', 'سيتم إتاحة جدولة الرحلات في النسخة التالية.')}>
          <Ionicons name="time-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={[styles.sheet, { bottom: Math.max(insets.bottom + 84, 96) }]}>
        <View style={styles.sheetHandle} />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetContent}>
          {tripPhase === 'idle' ? (
            <>
            <Text style={[styles.sheetTitle, { textAlign: textAlignStart }]}>إلى أين؟</Text>
            <View style={styles.searchCard}>
              <View style={[styles.inputRow, { flexDirection: rowDirection }]}>
                <View style={[styles.pointDot, styles.pickupDot]} />
                <TextInput
                  value={pickup}
                  onChangeText={searchPickup}
                  placeholder="نقطة الانطلاق"
                  placeholderTextColor={colors.textTertiary}
                  style={[styles.input, { textAlign: textAlignStart }]}
                />
              </View>
              <View style={styles.inputDivider} />
              <View style={[styles.inputRow, { flexDirection: rowDirection }]}>
                <View style={[styles.pointDot, styles.destinationDot]} />
                <TextInput
                  value={destination}
                  onChangeText={searchDestination}
                  placeholder="أضف الوجهة"
                  placeholderTextColor={colors.textTertiary}
                  style={[styles.input, { textAlign: textAlignStart }]}
                />
              </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.miniPlacesRow, { flexDirection: rowDirection }]}>
              {suggestedPlaces.map((place) => (
                <TouchableOpacity key={place.id} style={styles.miniPlaceChip} onPress={() => chooseSuggestedPlace(place)}>
                  <Ionicons name={place.icon} size={16} color={colors.primary} />
                  <Text style={styles.miniPlaceText}>{place.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.ridesRow, { flexDirection: rowDirection }]}>
              {rideTypes.map((ride) => {
                const isSelected = selectedRide === ride.id;
                return (
                  <TouchableOpacity
                    key={ride.id}
                    style={[styles.rideCard, isSelected && styles.rideCardSelected]}
                    onPress={() => setSelectedRide(ride.id)}
                  >
                    <Text style={[styles.rideLabel, isSelected && styles.rideLabelSelected]}>{ride.label}</Text>
                    <PriceDisplay
                      value={ride.price}
                      color={isSelected ? colors.white : colors.primary}
                      size={16}
                      iconSize={13}
                      bold
                      align="row-reverse"
                      style={styles.ridePriceWrap}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View style={[styles.footer, { flexDirection: rowDirection }]}>
              <View style={styles.footerTextWrap}>
                <Text style={styles.footerLabel}>السعر المتوقع</Text>
                <PriceDisplay value={selectedRideData.price} color={colors.primary} size={20} iconSize={16} bold align="row-reverse" />
              </View>
              <TouchableOpacity style={styles.footerButton} onPress={requestRide}>
                <Text style={styles.footerButtonText}>طلب رحلة</Text>
              </TouchableOpacity>
            </View>
            </>
          ) : (
            <>
            <View style={[styles.tripHeader, { flexDirection: rowDirection }]}>
              <View style={[styles.tripBadge, tripPhase === 'on_trip' && styles.tripBadgeActive]}>
                <Text style={[styles.tripBadgeText, tripPhase === 'on_trip' && styles.tripBadgeTextActive]}>
                  {tripPhase === 'searching' ? 'جاري البحث' : tripPhase === 'arriving' ? 'الكابتن في الطريق' : 'الرحلة جارية'}
                </Text>
              </View>
              <Text style={[styles.sheetTitle, { textAlign: textAlignStart }]}>
                {tripPhase === 'searching' ? 'جارٍ تجهيز رحلتك' : driver.name}
              </Text>
            </View>

            <View style={[styles.tripInfoCard, { flexDirection: rowDirection }]}>
              <View style={styles.tripInfoText}>
                <Text style={[styles.tripInfoTitle, { textAlign: textAlignStart }]}>
                  {tripPhase === 'searching' ? 'جاري مطابقة السائق الأقرب' : `${driver.car} • ${driver.plate}`}
                </Text>
                <Text style={[styles.tripInfoSubtitle, { textAlign: textAlignStart }]}>
                  {tripPhase === 'searching' ? `الوجهة: ${destination}` : `من ${pickup} إلى ${destination}`}
                </Text>
              </View>
              <View style={styles.tripIconWrap}>
                <Ionicons name={tripPhase === 'on_trip' ? 'navigate-outline' : 'car-outline'} size={22} color={colors.primary} />
              </View>
            </View>

            <View style={[styles.tripActions, { flexDirection: rowDirection }]}>
              <TouchableOpacity style={styles.tripAction} onPress={() => Alert.alert('اتصال', `التواصل مع ${driver.name}`)}>
                <Ionicons name="call-outline" size={18} color={colors.primary} />
                <Text style={styles.tripActionText}>اتصال</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tripAction} onPress={() => navigation.navigate('Chat')}>
                <Ionicons name="chatbubble-outline" size={18} color={colors.primary} />
                <Text style={styles.tripActionText}>دردشة</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tripAction} onPress={resetTrip}>
                <Ionicons name="close-outline" size={18} color={colors.error} />
                <Text style={[styles.tripActionText, { color: colors.error }]}>إنهاء</Text>
              </TouchableOpacity>
            </View>
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBEFF2' },
  map: { flex: 1 },
  webFallback: {
    flex: 1,
    backgroundColor: '#F6DDE3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  webFallbackText: {
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: fonts.regular,
  },
  topBar: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    justifyContent: 'space-between',
  },
  topButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: colors.card,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    ...shadows.float,
  },
  sheetContent: {
    paddingBottom: spacing.sm,
  },
  sheetHandle: {
    width: 48,
    height: 5,
    borderRadius: 999,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  sheetTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 28 },
  sheetSubtitle: { color: colors.textSecondary, fontSize: 13, lineHeight: 20, marginTop: spacing.xs, marginBottom: spacing.md },
  searchCard: { backgroundColor: colors.cardSecondary, borderRadius: 24, paddingHorizontal: spacing.md },
  inputRow: { alignItems: 'center', minHeight: 56 },
  pointDot: { width: 12, height: 12, borderRadius: 6, marginHorizontal: spacing.md },
  pickupDot: { backgroundColor: colors.success },
  destinationDot: { backgroundColor: colors.primary },
  input: { flex: 1, color: colors.text, fontFamily: fonts.regular, fontSize: 15 },
  inputDivider: { height: 1, backgroundColor: colors.border },
  miniPlacesRow: { gap: spacing.sm, paddingTop: spacing.sm, paddingBottom: spacing.sm },
  miniPlaceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.cardSecondary,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  miniPlaceText: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 13 },
  ridesRow: { gap: spacing.sm, paddingTop: spacing.xs, paddingBottom: spacing.sm },
  rideCard: {
    width: 116,
    backgroundColor: colors.cardSecondary,
    borderRadius: 18,
    padding: spacing.md,
  },
  rideCardSelected: {
    backgroundColor: colors.primary,
  },
  rideIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rideLabel: { marginTop: spacing.md, color: colors.text, fontFamily: fonts.bold, fontSize: 16 },
  rideLabelSelected: { color: colors.white },
  ridePriceWrap: { marginTop: spacing.sm, alignSelf: 'flex-end' },
  footer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  footerTextWrap: { flex: 1 },
  footerLabel: { color: colors.textSecondary, fontSize: 12 },
  footerButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: 15,
  },
  footerButtonText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 15 },
  tripHeader: { justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  tripBadge: { backgroundColor: colors.warningLight, borderRadius: borderRadius.full, paddingHorizontal: 12, paddingVertical: 8 },
  tripBadgeActive: { backgroundColor: colors.successLight },
  tripBadgeText: { color: colors.warning, fontFamily: fonts.semiBold, fontSize: 12 },
  tripBadgeTextActive: { color: colors.success },
  tripInfoCard: {
    alignItems: 'center',
    backgroundColor: colors.cardSecondary,
    borderRadius: 22,
    padding: spacing.md,
  },
  tripInfoText: { flex: 1, marginHorizontal: spacing.md },
  tripInfoTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 15 },
  tripInfoSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 4 },
  tripIconWrap: { width: 44, height: 44, borderRadius: 16, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' },
  tripActions: { gap: spacing.sm, marginTop: spacing.md },
  tripAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: colors.cardSecondary,
    borderRadius: borderRadius.full,
    paddingVertical: 12,
  },
  tripActionText: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 13 },
});

export default TaxiScreen;
