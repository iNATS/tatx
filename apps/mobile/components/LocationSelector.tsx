import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Modal, FlatList } from 'react-native';
import { Colors } from '@/constants/Colors';

interface Location {
  id: string;
  name: string;
  address: string;
  type: 'home' | 'work' | 'other';
}

interface LocationSelectorProps {
  selectedLocation?: Location;
  onLocationSelect?: (location: Location) => void;
}

const SAVED_LOCATIONS: Location[] = [
  { id: '1', name: 'Home', address: 'King Fahd Road, Riyadh', type: 'home' },
  { id: '2', name: 'Work', address: 'Olaya District, Riyadh', type: 'work' },
  { id: '3', name: 'Gym', address: 'Takhassusi St, Riyadh', type: 'other' },
];

export function LocationSelector({
  selectedLocation,
  onLocationSelect,
}: LocationSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState<Location | undefined>(selectedLocation);

  const handleSelectLocation = (location: Location) => {
    setSelected(location);
    setModalVisible(false);
    onLocationSelect?.(location);
  };

  const getIconForType = (type: string) => {
    const icons: Record<string, string> = {
      home: '🏠',
      work: '🏢',
      other: '📍',
    };
    return icons[type] || '📍';
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📍</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Current Location</Text>
          <Text style={styles.address}>
            {selected ? selected.address : 'Select your location'}
          </Text>
        </View>
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            {selected ? 'Change' : 'Select'}
          </Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Location</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={SAVED_LOCATIONS}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.locationItem,
                    selected?.id === item.id && styles.locationItemSelected,
                  ]}
                  onPress={() => handleSelectLocation(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.locationIconContainer}>
                    <Text style={styles.locationIcon}>
                      {getIconForType(item.type)}
                    </Text>
                  </View>
                  <View style={styles.locationContent}>
                    <Text style={styles.locationName}>{item.name}</Text>
                    <Text style={styles.locationAddress}>{item.address}</Text>
                  </View>
                  {selected?.id === item.id && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.addLocationButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.addLocationButtonText}>+ Add New Location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 16,
    ...Colors.Shadows.sm,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: `${Colors.primary}08`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  address: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textInverse,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.backgroundSecondary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.backgroundMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  locationItemSelected: {
    backgroundColor: `${Colors.primary}08`,
  },
  locationIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.backgroundMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  locationIcon: {
    fontSize: 22,
  },
  locationContent: {
    flex: 1,
  },
  locationName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 3,
  },
  locationAddress: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textInverse,
  },
  addLocationButton: {
    padding: 18,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  addLocationButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.primary,
  },
});

export default LocationSelector;
