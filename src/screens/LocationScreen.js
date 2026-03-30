import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';

const LocationScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { isRTL, rowDirection, textAlignStart, user, setUser } = useApp();
  const [addresses, setAddresses] = useState(user?.addresses || []);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ label: '', address: '', details: '', icon: 'home-outline' });

  const selected = useMemo(() => addresses.find((item) => item.isDefault), [addresses]);

  useEffect(() => {
    setAddresses(user?.addresses || []);
  }, [user?.addresses]);

  const syncAddresses = (nextAddresses) => {
    setAddresses(nextAddresses);
    setUser((prev) => ({
      ...prev,
      addresses: nextAddresses,
    }));
  };

  const openNewModal = () => {
    setEditingId(null);
    setForm({ label: '', address: '', details: '', icon: 'home-outline' });
    setShowModal(true);
  };

  const openEditModal = (address) => {
    setEditingId(address.id);
    setForm({ label: address.label, address: address.address, details: address.details, icon: address.icon });
    setShowModal(true);
  };

  const saveAddress = () => {
    if (!form.label.trim() || !form.address.trim()) {
      Alert.alert('تنبيه', 'أدخل اسم العنوان وتفاصيله أولاً.');
      return;
    }

    if (editingId) {
      syncAddresses(addresses.map((item) => (item.id === editingId ? { ...item, ...form } : item)));
    } else {
      syncAddresses([...addresses, { id: Date.now().toString(), ...form, isDefault: false }]);
    }
    setShowModal(false);
  };

  const makeDefault = (id) => {
    syncAddresses(addresses.map((item) => ({ ...item, isDefault: item.id === id })));
  };

  const removeAddress = (id) => {
    Alert.alert('حذف العنوان', 'هل تريد حذف هذا العنوان؟', [
      { text: 'إلغاء', style: 'cancel' },
      {
        text: 'حذف',
        style: 'destructive',
        onPress: () => syncAddresses(addresses.filter((item) => item.id !== id)),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm, flexDirection: rowDirection }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name={isRTL ? 'arrow-forward' : 'arrow-back'} size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>العناوين</Text>
        <TouchableOpacity style={styles.headerButton} onPress={openNewModal}>
          <Ionicons name="add" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={[styles.currentBanner, { flexDirection: 'row-reverse' }]}>
          <Ionicons name="navigate-circle-outline" size={26} color={colors.primary} />
          <View style={styles.currentBannerText}>
            <Text style={styles.bannerTitle}>العنوان الحالي</Text>
            <Text style={styles.bannerSubtitle}>{selected?.address || 'لم يتم تحديد عنوان افتراضي بعد'}</Text>
          </View>
          <TouchableOpacity style={styles.bannerButton} onPress={() => selected && navigation.goBack()}>
            <Text style={styles.bannerButtonText}>تم</Text>
          </TouchableOpacity>
        </View>

        {addresses.map((address) => (
          <View key={address.id} style={styles.addressCard}>
          <View style={[styles.cardTop, { flexDirection: 'row-reverse' }]}>
              <View style={[styles.actionRow, { flexDirection: 'row-reverse' }]}>
                <TouchableOpacity style={styles.smallButton} onPress={() => removeAddress(address.id)}>
                  <Ionicons name="trash-outline" size={18} color={colors.error} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallButton} onPress={() => openEditModal(address)}>
                  <Ionicons name="create-outline" size={18} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
              <View style={[styles.titleRow, { flexDirection: 'row-reverse' }]}>
                {address.isDefault && <Text style={styles.defaultPill}>الافتراضي</Text>}
                <Text style={styles.addressTitle}>{address.label}</Text>
              </View>
            </View>
            <Text style={styles.addressLine}>{address.address}</Text>
            <Text style={styles.addressDetails}>{address.details}</Text>
            <View style={[styles.cardBottom, { flexDirection: 'row-reverse' }]}>
              <TouchableOpacity style={styles.outlineButton} onPress={() => makeDefault(address.id)}>
                <Text style={styles.outlineButtonText}>تعيين كافتراضي</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryMiniButton} onPress={() => navigation.goBack()}>
                <Text style={styles.primaryMiniText}>اختيار</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity style={[styles.addButton, { flexDirection: 'row-reverse' }]} onPress={openNewModal}>
          <Ionicons name="add-circle-outline" size={22} color={colors.primary} />
          <Text style={styles.addButtonText}>إضافة عنوان جديد</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showModal} transparent animationType="slide" onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>{editingId ? 'تعديل العنوان' : 'إضافة عنوان'}</Text>

            <View style={styles.inputWrap}>
              <TextInput style={styles.textInput} value={form.label} onChangeText={(value) => setForm((prev) => ({ ...prev, label: value }))} placeholder="اسم العنوان" placeholderTextColor={colors.textTertiary} />
            </View>
            <View style={styles.inputWrap}>
              <TextInput style={styles.textInput} value={form.address} onChangeText={(value) => setForm((prev) => ({ ...prev, address: value }))} placeholder="المدينة والحي والشارع" placeholderTextColor={colors.textTertiary} />
            </View>
            <View style={styles.inputWrap}>
              <TextInput style={styles.textInput} value={form.details} onChangeText={(value) => setForm((prev) => ({ ...prev, details: value }))} placeholder="تفاصيل إضافية" placeholderTextColor={colors.textTertiary} />
            </View>

            <View style={[styles.modalActions, { flexDirection: 'row-reverse' }]}>
              <TouchableOpacity style={styles.outlineButtonLarge} onPress={() => setShowModal(false)}>
                <Text style={styles.outlineButtonText}>إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryButtonLarge} onPress={saveAddress}>
                <Text style={styles.primaryButtonLargeText}>حفظ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.card, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.md, paddingBottom: spacing.md },
  headerButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.cardSecondary, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontFamily: fonts.bold, color: colors.text },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  currentBanner: { backgroundColor: colors.card, borderRadius: borderRadius.xl, padding: spacing.md, alignItems: 'center', marginBottom: spacing.md, ...shadows.sm },
  currentBannerText: { flex: 1, width: '100%', marginHorizontal: spacing.md, alignItems: 'flex-end' },
  bannerTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 15, textAlign: 'right', alignSelf: 'stretch' },
  bannerSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 4, textAlign: 'right', alignSelf: 'stretch' },
  bannerButton: { backgroundColor: colors.cardSecondary, paddingHorizontal: spacing.md, paddingVertical: 10, borderRadius: borderRadius.full },
  bannerButtonText: { color: colors.primary, fontFamily: fonts.semiBold, textAlign: 'right' },
  addressCard: { backgroundColor: colors.card, borderRadius: borderRadius.xl, padding: spacing.md, marginBottom: spacing.md, writingDirection: 'rtl', ...shadows.sm },
  cardTop: { justifyContent: 'space-between', alignItems: 'center' },
  titleRow: { alignItems: 'center', gap: spacing.sm },
  addressTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 16, textAlign: 'right' },
  defaultPill: { color: colors.primary, backgroundColor: colors.cardSecondary, paddingHorizontal: spacing.sm, paddingVertical: 5, borderRadius: borderRadius.full, fontSize: 11, fontFamily: fonts.semiBold },
  actionRow: { gap: spacing.sm },
  smallButton: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.cardSecondary, alignItems: 'center', justifyContent: 'center' },
  addressLine: { marginTop: spacing.md, color: colors.text, textAlign: 'right' },
  addressDetails: { marginTop: 4, color: colors.textSecondary, textAlign: 'right', fontSize: 12 },
  cardBottom: { marginTop: spacing.md, justifyContent: 'space-between' },
  outlineButton: { backgroundColor: colors.cardSecondary, borderRadius: borderRadius.full, paddingHorizontal: spacing.md, paddingVertical: 10 },
  outlineButtonText: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 13, textAlign: 'right' },
  primaryMiniButton: { backgroundColor: colors.primary, borderRadius: borderRadius.full, paddingHorizontal: spacing.lg, paddingVertical: 10 },
  primaryMiniText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 13, textAlign: 'right' },
  addButton: { backgroundColor: colors.card, borderRadius: borderRadius.xl, padding: spacing.md, alignItems: 'center', justifyContent: 'center', gap: spacing.sm, ...shadows.sm },
  addButtonText: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 15, textAlign: 'right' },
  modalOverlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' },
  modalCard: { backgroundColor: colors.card, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: spacing.lg },
  modalHandle: { alignSelf: 'center', width: 46, height: 5, borderRadius: 999, backgroundColor: colors.border, marginBottom: spacing.md },
  modalTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 18, textAlign: 'center', marginBottom: spacing.md },
  inputWrap: { backgroundColor: colors.cardSecondary, borderRadius: borderRadius.lg, marginBottom: spacing.sm, paddingHorizontal: spacing.md },
  textInput: { minHeight: 52, color: colors.text, textAlign: 'right' },
  modalActions: { gap: spacing.sm, marginTop: spacing.md },
  outlineButtonLarge: { flex: 1, backgroundColor: colors.cardSecondary, borderRadius: borderRadius.full, alignItems: 'center', paddingVertical: 14 },
  primaryButtonLarge: { flex: 1, backgroundColor: colors.primary, borderRadius: borderRadius.full, alignItems: 'center', paddingVertical: 14 },
  primaryButtonLargeText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 15, textAlign: 'right' },
});

export default LocationScreen;
