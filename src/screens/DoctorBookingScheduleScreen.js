import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, borderRadius, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';

const DoctorBookingScheduleScreen = ({ route, navigation }) => {
  const { doctor } = route.params || {};
  const { rowDirection, textAlignStart } = useApp();
  const [selectedDay, setSelectedDay] = useState(doctor?.days?.[0] || '');
  const [selectedSlot, setSelectedSlot] = useState('');

  if (!doctor) {
    return <View style={styles.container}><PageHeader navigation={navigation} title="المواعيد" subtitle="لا توجد بيانات للطبيب" /></View>;
  }

  return (
    <View style={styles.container}>
      <PageHeader navigation={navigation} title={doctor.name} subtitle="اختر اليوم ثم الموعد المتاح" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={[styles.sectionTitle, { textAlign: textAlignStart }]}>الأيام المتاحة</Text>
          <View style={[styles.wrap, { flexDirection: rowDirection }]}>
            {doctor.days.map((day) => {
              const active = selectedDay === day;
              return (
                <TouchableOpacity key={day} style={[styles.chip, active && styles.chipActive]} onPress={() => setSelectedDay(day)}>
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{day}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={[styles.sectionTitle, { textAlign: textAlignStart }]}>المواعيد المتاحة</Text>
          <View style={[styles.wrap, { flexDirection: rowDirection }]}>
            {doctor.slots.map((slot) => {
              const active = selectedSlot === slot;
              return (
                <TouchableOpacity key={slot} style={[styles.slotChip, active && styles.chipActive]} onPress={() => setSelectedSlot(slot)}>
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{slot}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, !selectedSlot && styles.buttonDisabled]}
          disabled={!selectedSlot}
          onPress={() => navigation.navigate('DoctorBookingPatient', { doctor, day: selectedDay, slot: selectedSlot })}
        >
          <Text style={styles.buttonText}>متابعة</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.md, paddingBottom: 140 },
  card: { backgroundColor: colors.card, borderRadius: 26, padding: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.borderLight },
  sectionTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 16, marginBottom: spacing.md },
  wrap: { flexWrap: 'wrap', gap: spacing.sm },
  chip: { backgroundColor: colors.cardSecondary, borderRadius: borderRadius.full, paddingHorizontal: spacing.md, paddingVertical: 12 },
  slotChip: { minWidth: '30%', alignItems: 'center', backgroundColor: colors.cardSecondary, borderRadius: borderRadius.full, paddingHorizontal: spacing.md, paddingVertical: 12 },
  chipActive: { backgroundColor: colors.primary },
  chipText: { color: colors.textSecondary, fontFamily: fonts.semiBold, fontSize: 13 },
  chipTextActive: { color: colors.white },
  footer: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: colors.card, padding: spacing.lg, borderWidth: 1, borderColor: colors.borderLight },
  button: { backgroundColor: colors.primary, borderRadius: borderRadius.full, paddingVertical: 16, alignItems: 'center' },
  buttonDisabled: { opacity: 0.45 },
  buttonText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 15 },
});

export default DoctorBookingScheduleScreen;
