import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';

const quickServices = [
  { id: 'services', title: 'تصفح جميع الخدمات', icon: 'grid-outline', screen: 'Services' },
  { id: 'wholesale', title: 'خدمات الجملة', icon: 'layers-outline', screen: 'Wholesale' },
  { id: 'doctor', title: 'حجز موعد دكتور', icon: 'medkit-outline', screen: 'DoctorBooking' },
  { id: 'stay', title: 'فنادق وشاليهات وقاعات', icon: 'bed-outline', screen: 'StayBooking' },
];

const menuItems = [
  { id: 'orders', label: 'طلباتي', icon: 'receipt-outline', screen: 'Orders' },
  { id: 'wallet', label: 'المحفظة', icon: 'wallet-outline', screen: 'Wallet' },
  { id: 'payment', label: 'طرق الدفع', icon: 'card-outline', screen: 'Payment' },
  { id: 'location', label: 'العناوين', icon: 'location-outline', screen: 'Location' },
  { id: 'notifications', label: 'الإشعارات', icon: 'notifications-outline', screen: 'Notifications' },
  { id: 'support', label: 'الدعم والمساعدة', icon: 'chatbubble-ellipses-outline', screen: 'Chat' },
  { id: 'vendor', label: 'تطبيق مقدم الخدمة', icon: 'storefront-outline', screen: 'VendorApp' },
];

const AccountScreen = ({ navigation }) => {
  const { user, setIsAuthenticated, language, setLanguage, rowDirection, textAlignStart, isRTL } = useApp();
  const chevronIcon = isRTL ? 'chevron-back' : 'chevron-forward';

  return (
    <View style={styles.container}>
      <PageHeader
        navigation={navigation}
        showBack={false}
        title="حسابي"
        subtitle="إدارة الملف الشخصي، اللغة، والخدمات السريعة"
        actionIcon="language-outline"
        onActionPress={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.content, { paddingBottom: 120 }]}>
        <View style={styles.profileCard}>
          <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Payment')}>
            <Ionicons name="settings-outline" size={20} color={colors.primary} />
          </TouchableOpacity>

          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={[styles.name, { textAlign: textAlignStart }]}>{user?.name || 'ضيفنا'}</Text>
          <Text style={[styles.subtitle, { textAlign: textAlignStart }]}>{user?.phone || '+966 55 500 0001'}</Text>
          <Text style={styles.tagline}>دائما معك</Text>

          <View style={styles.statsRow}>
            <View style={styles.statCard}><Text style={styles.statValue}>12</Text><Text style={styles.statLabel}>طلبات</Text></View>
            <View style={styles.statCard}><Text style={styles.statValue}>300</Text><Text style={styles.statLabel}>الرصيد</Text></View>
            <View style={styles.statCard}><Text style={styles.statValue}>4.9</Text><Text style={styles.statLabel}>التقييم</Text></View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>خدماتك السريعة</Text>
        </View>
        <View style={[styles.quickGrid, { flexDirection: rowDirection }]}>
          {quickServices.map((service) => (
            <TouchableOpacity key={service.id} style={styles.quickCard} onPress={() => navigation.navigate(service.screen)}>
              <View style={styles.quickIcon}><Ionicons name={service.icon} size={24} color={colors.primary} /></View>
              <Text style={styles.quickText}>{service.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>الحساب</Text>
        </View>
        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItem, { flexDirection: rowDirection }, index < menuItems.length - 1 && styles.menuItemBorder]}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Ionicons name={chevronIcon} size={18} color={colors.textTertiary} />
              <Text style={[styles.menuLabel, { textAlign: textAlignStart }]}>{item.label}</Text>
              <View style={styles.menuIconWrap}>
                <Ionicons name={item.icon} size={20} color={colors.primary} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={() => setIsAuthenticated(false)}>
          <Ionicons name="log-out-outline" size={18} color={colors.error} />
          <Text style={styles.logoutText}>تسجيل الخروج</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.md },
  profileCard: { backgroundColor: colors.card, borderRadius: 30, padding: spacing.lg, alignItems: 'center', ...shadows.md },
  settingsButton: { alignSelf: 'flex-start', width: 40, height: 40, borderRadius: 20, backgroundColor: colors.cardSecondary, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 88, height: 88, marginTop: spacing.sm },
  name: { color: colors.text, fontFamily: fonts.bold, fontSize: 24, marginTop: spacing.md },
  subtitle: { color: colors.textSecondary, marginTop: spacing.xs, fontSize: 13 },
  tagline: { color: colors.primary, marginTop: spacing.sm, fontFamily: fonts.semiBold, fontSize: 15 },
  statsRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  statCard: { flex: 1, backgroundColor: colors.cardSecondary, borderRadius: 20, paddingVertical: spacing.md, alignItems: 'center' },
  statValue: { color: colors.text, fontFamily: fonts.bold, fontSize: 18 },
  statLabel: { color: colors.textSecondary, marginTop: 4, fontSize: 12 },
  sectionHeader: { marginTop: spacing.xl, marginBottom: spacing.md },
  sectionTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 18, textAlign: 'right' },
  quickGrid: { flexWrap: 'wrap', justifyContent: 'space-between', gap: spacing.sm },
  quickCard: { width: '48%', backgroundColor: colors.card, borderRadius: 22, padding: spacing.md, alignItems: 'center', ...shadows.sm },
  quickIcon: { width: 52, height: 52, borderRadius: 18, backgroundColor: colors.cardSecondary, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  quickText: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 13, textAlign: 'center', lineHeight: 20 },
  menuCard: { backgroundColor: colors.card, borderRadius: 24, paddingHorizontal: spacing.md, ...shadows.sm },
  menuItem: { alignItems: 'center', paddingVertical: spacing.md },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  menuLabel: { flex: 1, color: colors.text, fontFamily: fonts.semiBold, textAlign: 'right' },
  menuIconWrap: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.cardSecondary, alignItems: 'center', justifyContent: 'center', marginHorizontal: spacing.md },
  logoutButton: { marginTop: spacing.xl, backgroundColor: colors.card, borderRadius: borderRadius.full, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row-reverse', gap: spacing.sm, ...shadows.sm },
  logoutText: { color: colors.error, fontFamily: fonts.semiBold, fontSize: 15 },
});

export default AccountScreen;
