import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/PageHeader';

const menuItems = [
  { id: 'orders', label: 'طلباتي', icon: 'receipt-outline', screen: 'Orders' },
  { id: 'payment', label: 'طرق الدفع', icon: 'card-outline', screen: 'Payment' },
  { id: 'location', label: 'العناوين', icon: 'location-outline', screen: 'Location' },
  { id: 'notifications', label: 'الإشعارات', icon: 'notifications-outline', screen: 'Notifications' },
  { id: 'support', label: 'الدعم والمساعدة', icon: 'chatbubble-ellipses-outline', screen: 'Chat' },
  { id: 'vendor', label: 'تطبيق مقدم الخدمة', icon: 'storefront-outline', screen: 'VendorApp' },
];

const AccountScreen = ({ navigation }) => {
  const { user, setIsAuthenticated, rowDirection, textAlignStart, isRTL } = useApp();
  const chevronIcon = isRTL ? 'chevron-back' : 'chevron-forward';

  return (
    <View style={styles.container}>
      <PageHeader
        navigation={navigation}
        showBack={false}
        title="حسابي"
        subtitle="بياناتك وإدارة خدماتك من مكان واحد"
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Payment')}>
            <Ionicons name="settings-outline" size={20} color={colors.primary} />
          </TouchableOpacity>

          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={[styles.name, { textAlign: textAlignStart }]}>{user?.name || 'ضيفنا'}</Text>
          <Text style={[styles.subtitle, { textAlign: textAlignStart }]}>{user?.phone || '+966 55 500 0001'}</Text>
          <Text style={styles.tagline}>دائما معك</Text>

          <View style={[styles.identityCard, { flexDirection: rowDirection }]}>
            <View style={styles.identityIcon}>
              <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.identityBody}>
              <Text style={[styles.identityTitle, { textAlign: textAlignStart }]}>حساب موثق وجاهز للطلب</Text>
              <Text style={[styles.identitySubtitle, { textAlign: textAlignStart }]}>
                يمكنك إدارة العناوين والدفع والإشعارات ومتابعة الطلبات من هنا.
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.quickStatsCard, { flexDirection: rowDirection }]}>
          <View style={styles.quickStat}>
            <Text style={styles.quickStatValue}>3</Text>
            <Text style={styles.quickStatLabel}>عناوين محفوظة</Text>
          </View>
          <View style={styles.quickDivider} />
          <View style={styles.quickStat}>
            <Text style={styles.quickStatValue}>2</Text>
            <Text style={styles.quickStatLabel}>بطاقات دفع</Text>
          </View>
          <View style={styles.quickDivider} />
          <View style={styles.quickStat}>
            <Text style={styles.quickStatValue}>12</Text>
            <Text style={styles.quickStatLabel}>طلبات مكتملة</Text>
          </View>
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
              <View style={styles.menuIconWrap}>
                <Ionicons name={item.icon} size={20} color={colors.primary} />
              </View>
              <Text style={[styles.menuLabel, { textAlign: textAlignStart }]}>{item.label}</Text>
              <Ionicons name={chevronIcon} size={18} color={colors.textTertiary} />
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
  content: { paddingHorizontal: spacing.md, paddingBottom: 120 },
  profileCard: { backgroundColor: colors.card, borderRadius: 30, padding: spacing.lg, alignItems: 'stretch', ...shadows.md },
  settingsButton: { alignSelf: 'flex-end', width: 40, height: 40, borderRadius: 20, backgroundColor: colors.cardSecondary, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 88, height: 88, marginTop: spacing.sm, alignSelf: 'center' },
  name: { color: colors.text, fontFamily: fonts.bold, fontSize: 24, marginTop: spacing.md, alignSelf: 'stretch' },
  subtitle: { color: colors.textSecondary, marginTop: spacing.xs, fontSize: 13, alignSelf: 'stretch' },
  tagline: { color: colors.primary, marginTop: spacing.sm, fontFamily: fonts.semiBold, fontSize: 15, textAlign: 'right' },
  identityCard: {
    width: '100%',
    backgroundColor: '#FFF4F6',
    borderRadius: 22,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  identityIcon: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  identityBody: { flex: 1, marginHorizontal: spacing.md, alignItems: 'flex-end' },
  identityTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 15 },
  identitySubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 4, lineHeight: 20 },
  quickStatsCard: { backgroundColor: colors.card, borderRadius: 24, padding: spacing.md, alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.md, ...shadows.sm },
  quickStat: { flex: 1, alignItems: 'center' },
  quickStatValue: { color: colors.text, fontFamily: fonts.bold, fontSize: 20 },
  quickStatLabel: { color: colors.textSecondary, fontSize: 12, marginTop: 4, textAlign: 'center' },
  quickDivider: { width: 1, alignSelf: 'stretch', backgroundColor: colors.borderLight, marginHorizontal: spacing.sm },
  sectionHeader: { marginTop: spacing.xl, marginBottom: spacing.md },
  sectionTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 18, textAlign: 'right' },
  menuCard: { backgroundColor: colors.card, borderRadius: 24, paddingHorizontal: spacing.md, ...shadows.sm },
  menuItem: { alignItems: 'center', paddingVertical: spacing.md },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  menuLabel: { flex: 1, color: colors.text, fontFamily: fonts.semiBold, textAlign: 'right' },
  menuIconWrap: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.cardSecondary, alignItems: 'center', justifyContent: 'center', marginHorizontal: spacing.md },
  logoutButton: { marginTop: spacing.xl, backgroundColor: colors.card, borderRadius: borderRadius.full, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row-reverse', gap: spacing.sm, ...shadows.sm },
  logoutText: { color: colors.error, fontFamily: fonts.semiBold, fontSize: 15 },
});

export default AccountScreen;
