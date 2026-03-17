import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';

const AccountScreen = ({ navigation }) => {
  const { user, isRTL, setIsAuthenticated } = useApp();
  const insets = useSafeAreaInsets();

  const menuItems = [
    { id: '1', label: 'مرحبا, زائر', labelEn: 'Welcome, Guest', icon: 'person', color: colors.primary },
    { id: '2', label: 'المحفظة', labelEn: 'Wallet', icon: 'wallet', color: colors.success },
    { id: '3', label: 'عناويني', labelEn: 'My Addresses', icon: 'location', color: colors.info },
    { id: '4', label: 'المساعدة', labelEn: 'Help', icon: 'help-circle', color: colors.warning },
    { id: '5', label: 'عن تاتكس', labelEn: 'About TATX', icon: 'information-circle', color: colors.primary },
    { id: '6', label: 'مشاركة التطبيق', labelEn: 'Share App', icon: 'share', color: colors.accent },
    { id: '7', label: 'تغيير اللغة', labelEn: 'Change Language', icon: 'language', color: colors.secondary },
    { id: '8', label: 'رأيك يهمنا', labelEn: 'Your Opinion Matters', icon: 'chatbubbles', color: colors.green },
    { id: '9', label: 'تسجيل خروج', labelEn: 'Logout', icon: 'log-out', color: colors.error },
  ];

  return (
    <View style={styles.container}>
      {/* Header with Safe Area */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.md) }]}>
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={32} color={colors.white} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>مرحباً, زائر</Text>
              <Text style={styles.userEmail}>أهلاً بك في تاتكس</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Add Store Banner */}
        <TouchableOpacity 
          style={styles.addStoreBanner}
          activeOpacity={0.8}
        >
          <View style={styles.bannerContent}>
            <Text style={styles.addStoreTitle}>اضف متجرك</Text>
            <Text style={styles.addStoreSubtitle}>زد مبيعاتك و ضاعف اموالك</Text>
          </View>
          <View style={styles.addStoreIcon}>
            <Ionicons name="storefront" size={40} color={colors.white} />
            <View style={styles.addStorePlus}>
              <Ionicons name="add" size={16} color={colors.primary} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: colors.success + '20' }]}>
              <Ionicons name="wallet" size={24} color={colors.success} />
            </View>
            <Text style={styles.statValue}>ر.س 0</Text>
            <Text style={styles.statLabel}>الرصيد</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: colors.primary + '20' }]}>
              <Ionicons name="bag" size={24} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>الطلبات</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: colors.warning + '20' }]}>
              <Ionicons name="pricetag" size={24} color={colors.warning} />
            </View>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>النقاط</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={[styles.menuContainer, shadows.md]}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => {
                if (item.id === '2') {
                  navigation.navigate('Wallet');
                } else if (item.id === '9') {
                  setIsAuthenticated(false);
                } else if (item.id === '4') {
                  navigation.navigate('Chat');
                }
              }}
              activeOpacity={0.6}
            >
              <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon} size={22} color={item.color} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.gray} />
            </TouchableOpacity>
          ))}
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>الإصدار 1.1.0</Text>
          <Text style={styles.copyrightText}>© 2026 تاتكس. جميع الحقوق محفوظة.</Text>
        </View>

        {/* Bottom padding for tab bar */}
        <View style={{ height: 20 }} />
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
    backgroundColor: colors.primary,
    paddingBottom: spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addStoreBanner: {
    backgroundColor: colors.primary,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.md,
  },
  bannerContent: {
    flex: 1,
  },
  addStoreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'right',
    marginBottom: spacing.xs,
  },
  addStoreSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'right',
  },
  addStoreIcon: {
    position: 'relative',
    marginLeft: spacing.sm,
  },
  addStorePlus: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.grayLight,
    marginHorizontal: spacing.sm,
  },
  menuContainer: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    textAlign: 'right',
    marginRight: spacing.md,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  versionText: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: spacing.xs,
  },
  copyrightText: {
    fontSize: 12,
    color: colors.gray,
  },
});

export default AccountScreen;
