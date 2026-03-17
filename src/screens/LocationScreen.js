import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../constants/theme';
import { user } from '../data/staticData';

const LocationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.closeButton}>
            <Ionicons name="close" size={20} color={colors.white} />
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>حدد موقعك</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Saved Address */}
        <TouchableOpacity style={styles.addressCard}>
          <View style={styles.addressContent}>
            <View style={styles.addressTextContainer}>
              <Text style={styles.addressLabel}>المنزل</Text>
              <Text style={styles.addressText}>
                شارع الملك فهد طريق الجبيل السريع , الدمام , السعوديه
              </Text>
            </View>
            <Ionicons name="location" size={32} color={colors.text} />
          </View>
        </TouchableOpacity>

        {/* Add New Address */}
        <TouchableOpacity style={styles.addAddressCard}>
          <Ionicons name="add" size={24} color={colors.text} />
          <Text style={styles.addAddressText}>إضافة موقع</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.grayDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
    textAlign: 'right',
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  addressCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  addressContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressTextContainer: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'right',
    marginBottom: spacing.xs,
  },
  addressText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'right',
    lineHeight: 20,
  },
  addAddressCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addAddressText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});

export default LocationScreen;
