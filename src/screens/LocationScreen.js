import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';

const LocationScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const addresses = [
    {
      id: '1',
      label: 'المنزل',
      address: 'الدمام، شارع الملك عبد العزيز',
      details: 'عمور 12، شقة 4',
      isDefault: true,
      icon: 'home',
      color: colors.primary,
    },
    {
      id: '2',
      label: 'العمل',
      address: 'الظهران، طريق الملك فهد',
      details: 'برج الأعمال، دور 15',
      isDefault: false,
      icon: 'business',
      color: colors.info,
    },
    {
      id: '3',
      label: 'الفيلا',
      address: 'الخبر، حي الشاطئ',
      details: 'شارع 5، فيلا 23',
      isDefault: false,
      icon: 'location',
      color: colors.success,
    },
  ];

  const handleAddAddress = () => {
    setShowAddModal(true);
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.sm) }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>عناويني</Text>
        <TouchableOpacity style={styles.headerButton} onPress={handleAddAddress}>
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Current Location Banner */}
      <View style={styles.locationBanner}>
        <LinearGradient colors={[colors.primary, colors.primaryDark]} style={styles.locationGradient}>
          <Ionicons name="location" size={24} color={colors.white} />
          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>موقعك الحالي</Text>
            <Text style={styles.locationSubtext}>الدمام، حي الشاطئ</Text>
          </View>
          <TouchableOpacity style={styles.useLocationButton}>
            <Text style={styles.useLocationText}>استخدام</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Saved Addresses */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>العناوين المحفوظة</Text>

        {addresses.map((address) => (
          <TouchableOpacity
            key={address.id}
            style={styles.addressCard}
            onPress={() => handleSelectAddress(address)}
            activeOpacity={0.8}
          >
            <View style={[styles.addressIcon, { backgroundColor: address.color + '15' }]}>
              <Ionicons name={address.icon} size={24} color={address.color} />
            </View>
            <View style={styles.addressInfo}>
              <View style={styles.addressHeader}>
                <Text style={styles.addressLabel}>{address.label}</Text>
                {address.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>افتراضي</Text>
                  </View>
                )}
              </View>
              <Text style={styles.addressText}>{address.address}</Text>
              <Text style={styles.addressDetails}>{address.details}</Text>
            </View>
            <View style={styles.addressActions}>
              <TouchableOpacity style={styles.editButton}>
                <Ionicons name="create-outline" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton}>
                <Ionicons name="trash-outline" size={20} color={colors.error} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.radioButton, address.isDefault && styles.radioButtonSelected]}
              >
                {address.isDefault && <Ionicons name="checkmark" size={16} color={colors.white} />}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {/* Add New Address Button */}
        <TouchableOpacity style={styles.addAddressButton} onPress={handleAddAddress}>
          <Ionicons name="add-circle" size={24} color={colors.primary} />
          <Text style={styles.addAddressText}>إضافة عنوان جديد</Text>
        </TouchableOpacity>

        {/* Bottom spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Add Address Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>إضافة عنوان جديد</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>تصنيف العنوان</Text>
              <View style={styles.iconSelector}>
                {['home', 'business', 'location', 'heart'].map((icon) => (
                  <TouchableOpacity key={icon} style={styles.iconOption}>
                    <Ionicons name={icon} size={24} color={colors.text} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>العنوان</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="location-outline" size={20} color={colors.textTertiary} />
                <TextInput
                  style={styles.input}
                  placeholder="المدينة، الحي، الشارع"
                  placeholderTextColor={colors.textTertiary}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>التفاصيل</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="document-text-outline" size={20} color={colors.textTertiary} />
                <TextInput
                  style={styles.input}
                  placeholder="رقم المبنى، الشقة، الطابق"
                  placeholderTextColor={colors.textTertiary}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>ملاحظات للتوصيل</Text>
              <View style={[styles.inputContainer, styles.textAreaContainer]}>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="أي ملاحظات إضافية للسائق"
                  placeholderTextColor={colors.textTertiary}
                  multiline
                  numberOfLines={3}
                />
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelButtonText}>إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.saveButton]}>
                <Text style={styles.saveButtonText}>حفظ العنوان</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: colors.white,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  locationBanner: {
    margin: spacing.md,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  locationGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  locationInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  locationSubtext: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  useLocationButton: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backdropFilter: 'blur(10px)',
  },
  useLocationText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
  },
  scrollContent: {
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  addressIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  addressLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  defaultBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    marginLeft: spacing.sm,
  },
  defaultText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.white,
  },
  addressText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  addressDetails: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  addressActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.cardSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.error + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    gap: spacing.sm,
    marginTop: spacing.md,
    ...shadows.sm,
  },
  addAddressText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: borderRadius.xl * 1.5,
    borderTopRightRadius: borderRadius.xl * 1.5,
    padding: spacing.md,
    maxHeight: '90%',
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
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  formGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'right',
  },
  iconSelector: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'center',
  },
  iconOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.cardSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardSecondary,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    minHeight: 50,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  textAreaContainer: {
    minHeight: 100,
    paddingTop: spacing.md,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  modalButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.cardSecondary,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
});

export default LocationScreen;
