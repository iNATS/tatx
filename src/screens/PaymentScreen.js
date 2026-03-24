import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';

const initialMethods = [
  { id: 'apple', title: 'Apple Pay', subtitle: 'الدفع الافتراضي', icon: 'logo-apple', color: colors.text, isDefault: true },
  { id: 'mada', title: 'مدى', subtitle: '•••• 8921', icon: 'card-outline', color: colors.info, isDefault: false },
  { id: 'cash', title: 'الدفع عند الاستلام', subtitle: 'نقداً أو شبكة', icon: 'cash-outline', color: colors.success, isDefault: false },
];

const PaymentScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [methods, setMethods] = useState(initialMethods);
  const [selectedMethod, setSelectedMethod] = useState(initialMethods.find((item) => item.isDefault)?.id || initialMethods[0].id);
  const [showModal, setShowModal] = useState(false);
  const [saveCard, setSaveCard] = useState(true);
  const [form, setForm] = useState({ number: '', name: '', expiry: '', cvv: '' });

  const activeMethod = useMemo(() => methods.find((item) => item.id === selectedMethod), [methods, selectedMethod]);

  const setAsDefault = (id) => {
    setMethods((prev) => prev.map((item) => ({ ...item, isDefault: item.id === id })));
    setSelectedMethod(id);
  };

  const saveMethod = () => {
    if (!form.number.trim() || !form.name.trim() || !form.expiry.trim() || !form.cvv.trim()) {
      Alert.alert('تنبيه', 'أكمل بيانات البطاقة أولاً.');
      return;
    }

    const lastDigits = form.number.replace(/\s/g, '').slice(-4);
    const nextId = `card-${Date.now()}`;
    const newMethod = {
      id: nextId,
      title: saveCard ? 'بطاقة محفوظة' : 'بطاقة جديدة',
      subtitle: `•••• ${lastDigits}`,
      icon: 'card-outline',
      color: colors.primary,
      isDefault: false,
    };

    setMethods((prev) => [...prev, newMethod]);
    setSelectedMethod(nextId);
    setShowModal(false);
    setForm({ number: '', name: '', expiry: '', cvv: '' });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>طرق الدفع</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => setShowModal(true)}>
          <Ionicons name="add" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.currentCard}>
          <Text style={styles.currentLabel}>الطريقة المختارة</Text>
          <View style={styles.currentRow}>
            <Ionicons name={activeMethod?.icon || 'card-outline'} size={26} color={colors.primary} />
            <View style={styles.currentText}>
              <Text style={styles.currentTitle}>{activeMethod?.title}</Text>
              <Text style={styles.currentSubtitle}>{activeMethod?.subtitle}</Text>
            </View>
          </View>
        </View>

        {methods.map((method) => (
          <View key={method.id} style={styles.methodCard}>
            <TouchableOpacity style={styles.methodMain} onPress={() => setSelectedMethod(method.id)}>
              <View style={styles.radioWrap}>
                {selectedMethod === method.id && <Ionicons name="checkmark-circle" size={20} color={colors.primary} />}
              </View>
              <View style={styles.methodInfo}>
                <Text style={styles.methodTitle}>{method.title}</Text>
                <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
              </View>
              <View style={[styles.methodIcon, { backgroundColor: `${method.color}15` }]}>
                <Ionicons name={method.icon} size={22} color={method.color} />
              </View>
            </TouchableOpacity>
            <View style={styles.methodActions}>
              {!method.isDefault && (
                <TouchableOpacity style={styles.outlineMiniButton} onPress={() => setAsDefault(method.id)}>
                  <Text style={styles.outlineMiniText}>تعيين كافتراضي</Text>
                </TouchableOpacity>
              )}
              {method.isDefault && <Text style={styles.defaultText}>الطريقة الافتراضية</Text>}
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal visible={showModal} transparent animationType="slide" onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>إضافة بطاقة جديدة</Text>

            <View style={styles.inputWrap}><TextInput style={styles.input} value={form.number} onChangeText={(value) => setForm((prev) => ({ ...prev, number: value }))} placeholder="رقم البطاقة" placeholderTextColor={colors.textTertiary} keyboardType="number-pad" /></View>
            <View style={styles.inputWrap}><TextInput style={styles.input} value={form.name} onChangeText={(value) => setForm((prev) => ({ ...prev, name: value }))} placeholder="اسم حامل البطاقة" placeholderTextColor={colors.textTertiary} /></View>
            <View style={styles.row}>
              <View style={styles.inputHalf}><TextInput style={styles.input} value={form.expiry} onChangeText={(value) => setForm((prev) => ({ ...prev, expiry: value }))} placeholder="MM/YY" placeholderTextColor={colors.textTertiary} /></View>
              <View style={styles.inputHalf}><TextInput style={styles.input} value={form.cvv} onChangeText={(value) => setForm((prev) => ({ ...prev, cvv: value }))} placeholder="CVV" placeholderTextColor={colors.textTertiary} keyboardType="number-pad" secureTextEntry /></View>
            </View>

            <TouchableOpacity style={styles.saveCardRow} onPress={() => setSaveCard((prev) => !prev)}>
              <Text style={styles.saveCardText}>حفظ البطاقة لاستخدامها لاحقاً</Text>
              <Ionicons name={saveCard ? 'checkbox' : 'square-outline'} size={22} color={colors.primary} />
            </TouchableOpacity>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.outlineButton} onPress={() => setShowModal(false)}>
                <Text style={styles.outlineButtonText}>إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryButton} onPress={saveMethod}>
                <Text style={styles.primaryButtonText}>حفظ البطاقة</Text>
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
  header: { backgroundColor: colors.card, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.md, paddingBottom: spacing.md },
  headerButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.cardSecondary, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontFamily: fonts.bold, color: colors.text },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  currentCard: { backgroundColor: colors.card, borderRadius: borderRadius.xl, padding: spacing.md, marginBottom: spacing.md, ...shadows.sm },
  currentLabel: { color: colors.textSecondary, fontSize: 12, textAlign: 'right' },
  currentRow: { flexDirection: 'row-reverse', alignItems: 'center', marginTop: spacing.sm },
  currentText: { flex: 1, marginRight: spacing.md, alignItems: 'flex-end' },
  currentTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 16 },
  currentSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 4 },
  methodCard: { backgroundColor: colors.card, borderRadius: borderRadius.xl, padding: spacing.md, marginBottom: spacing.md, ...shadows.sm },
  methodMain: { flexDirection: 'row-reverse', alignItems: 'center' },
  radioWrap: { width: 28, alignItems: 'center' },
  methodInfo: { flex: 1, alignItems: 'flex-end', marginHorizontal: spacing.md },
  methodTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 15 },
  methodSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 4 },
  methodIcon: { width: 46, height: 46, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  methodActions: { marginTop: spacing.md, flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },
  outlineMiniButton: { backgroundColor: colors.cardSecondary, borderRadius: borderRadius.full, paddingHorizontal: spacing.md, paddingVertical: 10 },
  outlineMiniText: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 12 },
  defaultText: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 12 },
  modalOverlay: { flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' },
  modalCard: { backgroundColor: colors.card, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: spacing.lg },
  modalHandle: { alignSelf: 'center', width: 46, height: 5, borderRadius: 999, backgroundColor: colors.border, marginBottom: spacing.md },
  modalTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 18, textAlign: 'center', marginBottom: spacing.md },
  inputWrap: { backgroundColor: colors.cardSecondary, borderRadius: borderRadius.lg, paddingHorizontal: spacing.md, marginBottom: spacing.sm },
  input: { minHeight: 52, color: colors.text, textAlign: 'right' },
  row: { flexDirection: 'row-reverse', gap: spacing.sm },
  inputHalf: { flex: 1, backgroundColor: colors.cardSecondary, borderRadius: borderRadius.lg, paddingHorizontal: spacing.md },
  saveCardRow: { marginTop: spacing.sm, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' },
  saveCardText: { color: colors.textSecondary, fontSize: 13 },
  modalActions: { flexDirection: 'row-reverse', gap: spacing.sm, marginTop: spacing.lg },
  outlineButton: { flex: 1, backgroundColor: colors.cardSecondary, borderRadius: borderRadius.full, alignItems: 'center', paddingVertical: 14 },
  outlineButtonText: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 15 },
  primaryButton: { flex: 1, backgroundColor: colors.primary, borderRadius: borderRadius.full, alignItems: 'center', paddingVertical: 14 },
  primaryButtonText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 15 },
});

export default PaymentScreen;
