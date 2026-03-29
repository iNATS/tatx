import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';
import PriceDisplay from '../components/PriceDisplay';

const DoctorBookingConfirmScreen = ({ route, navigation }) => {
  const { doctor, day, slot, patient } = route.params || {};
  const { rowDirection, textAlignStart } = useApp();

  const confirm = () => {
    Alert.alert('تم تأكيد الحجز', `تم تأكيد موعد ${doctor?.name} للمريض ${patient?.patientName}.`, [
      { text: 'حسنًا', onPress: () => navigation.navigate('DoctorBooking') },
    ]);
  };

  return (
    <View style={styles.container}>
      <PageHeader navigation={navigation} title="تأكيد الحجز" subtitle="راجع البيانات ثم أكد الموعد" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.successIcon}>
            <Ionicons name="calendar-outline" size={26} color={colors.primary} />
          </View>
          <Text style={styles.cardTitle}>ملخص الموعد</Text>
          <View style={[styles.row, { flexDirection: rowDirection }]}><Text style={styles.label}>الطبيب</Text><Text style={[styles.value, { textAlign: textAlignStart }]}>{doctor?.name}</Text></View>
          <View style={[styles.row, { flexDirection: rowDirection }]}><Text style={styles.label}>اليوم</Text><Text style={[styles.value, { textAlign: textAlignStart }]}>{day}</Text></View>
          <View style={[styles.row, { flexDirection: rowDirection }]}><Text style={styles.label}>الوقت</Text><Text style={[styles.value, { textAlign: textAlignStart }]}>{slot}</Text></View>
          <View style={[styles.row, { flexDirection: rowDirection }]}><Text style={styles.label}>المريض</Text><Text style={[styles.value, { textAlign: textAlignStart }]}>{patient?.patientName}</Text></View>
          <View style={[styles.row, { flexDirection: rowDirection }]}><Text style={styles.label}>الجوال</Text><Text style={[styles.value, { textAlign: textAlignStart }]}>{patient?.phone}</Text></View>
          <View style={[styles.row, { flexDirection: rowDirection }]}><Text style={styles.label}>العمر</Text><Text style={[styles.value, { textAlign: textAlignStart }]}>{patient?.age}</Text></View>
          <View style={[styles.row, styles.noBorder, { flexDirection: rowDirection }]}><Text style={styles.label}>رسوم الكشف</Text><PriceDisplay value={doctor?.fee || 0} color={colors.primary} size={16} iconSize={13} bold align={rowDirection} /></View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={confirm}>
          <Text style={styles.buttonText}>تأكيد الحجز</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.md, paddingBottom: 140 },
  card: { backgroundColor: colors.card, borderRadius: 26, padding: spacing.md, ...shadows.sm },
  successIcon: { width: 56, height: 56, borderRadius: 18, backgroundColor: '#FFF1F4', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: spacing.md },
  cardTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 17, textAlign: 'center', marginBottom: spacing.md },
  row: { justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  noBorder: { borderBottomWidth: 0 },
  label: { color: colors.textSecondary, fontSize: 13 },
  value: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 14, maxWidth: '58%' },
  footer: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: colors.card, padding: spacing.lg, ...shadows.float },
  button: { backgroundColor: colors.primary, borderRadius: borderRadius.full, paddingVertical: 16, alignItems: 'center' },
  buttonText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 15 },
});

export default DoctorBookingConfirmScreen;
