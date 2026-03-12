import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { VehicleTypes } from '@/constants/Data';
import { VehicleTypeCard } from '@/components/VehicleTypeCard';

export default function RidesScreen() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('comfort');
  const [isSearching, setIsSearching] = useState(false);

  const handleBookRide = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      // Handle booking logic
    }, 2000);
  };

  const estimatedDistance = 5; // km

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Book a Ride</Text>
        <TouchableOpacity style={styles.historyButton}>
          <Text style={styles.historyIcon}>🕐</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderIcon}>🗺️</Text>
            <Text style={styles.mapPlaceholderText}>Map View</Text>
            <Text style={styles.mapPlaceholderSubtext}>
              Interactive map will appear here
            </Text>
          </View>
          
          {/* Floating Location Cards */}
          <View style={styles.locationCards}>
            <View style={styles.locationCard}>
              <View style={styles.locationDot}>
                <View style={[styles.dot, { backgroundColor: Colors.primary }]} />
              </View>
              <TextInput
                style={styles.locationInput}
                placeholder="Pickup location"
                placeholderTextColor={Colors.textMuted}
                value={pickup}
                onChangeText={setPickup}
              />
            </View>
            
            <View style={styles.locationLine} />
            
            <View style={styles.locationCard}>
              <View style={styles.locationDot}>
                <View style={[styles.dot, { backgroundColor: Colors.accent }]} />
              </View>
              <TextInput
                style={styles.locationInput}
                placeholder="Where to?"
                placeholderTextColor={Colors.textMuted}
                value={dropoff}
                onChangeText={setDropoff}
              />
            </View>
          </View>
        </View>

        {/* Saved Places */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Places</Text>
          <View style={styles.savedPlaces}>
            <TouchableOpacity style={styles.savedPlace}>
              <View style={[styles.savedPlaceIcon, { backgroundColor: '#FEF3C7' }]}>
                <Text style={styles.savedPlaceEmoji}>🏠</Text>
              </View>
              <View style={styles.savedPlaceContent}>
                <Text style={styles.savedPlaceName}>Home</Text>
                <Text style={styles.savedPlaceAddress}>King Fahd Road, Riyadh</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.savedPlace}>
              <View style={[styles.savedPlaceIcon, { backgroundColor: '#DBEAFE' }]}>
                <Text style={styles.savedPlaceEmoji}>🏢</Text>
              </View>
              <View style={styles.savedPlaceContent}>
                <Text style={styles.savedPlaceName}>Work</Text>
                <Text style={styles.savedPlaceAddress}>Olaya District, Riyadh</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Vehicle Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Vehicle</Text>
          {VehicleTypes.map((vehicle) => (
            <VehicleTypeCard
              key={vehicle.id}
              vehicle={vehicle}
              distance={estimatedDistance}
              selected={selectedVehicle === vehicle.id}
              onSelect={() => setSelectedVehicle(vehicle.id)}
            />
          ))}
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <View style={styles.paymentMethod}>
            <View style={styles.paymentLeft}>
              <Text style={styles.paymentIcon}>💳</Text>
              <View>
                <Text style={styles.paymentLabel}>Payment Method</Text>
                <Text style={styles.paymentValue}>Visa ending in 4242</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Book Button */}
      <View style={styles.footer}>
        <View style={styles.fareSummary}>
          <Text style={styles.fareLabel}>Estimated Fare</Text>
          <Text style={styles.fareAmount}>$16.50</Text>
        </View>
        <TouchableOpacity
          style={[styles.bookButton, isSearching && styles.bookButtonDisabled]}
          onPress={handleBookRide}
          disabled={isSearching}
          activeOpacity={0.8}
        >
          {isSearching ? (
            <ActivityIndicator color={Colors.textInverse} />
          ) : (
            <Text style={styles.bookButtonText}>Book Ride</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  historyButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyIcon: {
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
  },
  mapContainer: {
    height: 280,
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.backgroundMuted,
    ...Colors.Shadows.md,
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E2E8F0',
  },
  mapPlaceholderIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 4,
  },
  locationCards: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
    ...Colors.Shadows.lg,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.backgroundMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  locationInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    paddingVertical: 10,
  },
  locationLine: {
    width: 2,
    height: 20,
    backgroundColor: Colors.border,
    marginLeft: 16,
    marginVertical: 4,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  savedPlaces: {
    flexDirection: 'row',
    gap: 12,
  },
  savedPlace: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 14,
    padding: 12,
    ...Colors.Shadows.sm,
  },
  savedPlaceIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  savedPlaceEmoji: {
    fontSize: 20,
  },
  savedPlaceContent: {
    flex: 1,
  },
  savedPlaceName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  savedPlaceAddress: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
    ...Colors.Shadows.sm,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  paymentLabel: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  paymentValue: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  bottomPadding: {
    height: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  fareSummary: {
    flex: 1,
  },
  fareLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  fareAmount: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    ...Colors.Shadows.md,
  },
  bookButtonDisabled: {
    opacity: 0.7,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textInverse,
  },
});
