import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import PageHeader from '../components/PageHeader';

const DoctorBookingPatientScreen = ({ route, navigation }) => {
  const { doctor, day, slot } = route.params || {};
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [notes, setNotes] = useState('');

  const continueNext = () => {
    if (!patientName.trim() || !phone.trim() || !age.trim()) {
      Alert.alert('بيانات ناقصة', 'أدخل اسم المريض ورقم الجوال والعمر.');
      return;
    }
    navigation.navigate('DoctorBookingConfirm', {
      doctor,
      day,
      slot,
      patient: { patientName, phone, age, notes },
    });
  };

  return (
    <View style={styles.container}>
      <PageHeader navigation={navigation} title="بيانات المريض" subtitle={`${doctor?.name || ''} • ${day || ''} • ${slot || ''}`} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <TextInput value={patientName} onChangeText={setPatientName} style={styles.input} placeholder="اسم المريض" placeholderTextColor={colors.textTertiary} />
          <TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" style={styles.input} placeholder="رقم الجوال" placeholderTextColor={colors.textTertiary} />
          <TextInput value={age} onChangeText={setAge} keyboardType="number-pad" style={styles.input} placeholder="العمر" placeholderTextColor={colors.textTertiary} />
          <TextInput value={notes} onChangeText={setNotes} style={styles.notes} placeholder="ملاحظات إضافية" placeholderTextColor={colors.textTertiary} multiline />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={continueNext}>
          <Text style={styles.buttonText}>مراجعة الحجز</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.md, paddingBottom: 140 },
  card: { backgroundColor: colors.card, borderRadius: 26, padding: spacing.md, ...shadows.sm },
  input: { backgroundColor: colors.cardSecondary, borderRadius: 18, paddingHorizontal: spacing.md, paddingVertical: 14, color: colors.text, marginBottom: spacing.md, fontFamily: fonts.regular },
  notes: { backgroundColor: colors.cardSecondary, borderRadius: 18, paddingHorizontal: spacing.md, paddingVertical: 14, color: colors.text, minHeight: 120, textAlignVertical: 'top', fontFamily: fonts.regular },
  footer: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: colors.card, padding: spacing.lg, ...shadows.float },
  button: { backgroundColor: colors.primary, borderRadius: borderRadius.full, paddingVertical: 16, alignItems: 'center' },
  buttonText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 15 },
});

export default DoctorBookingPatientScreen;
