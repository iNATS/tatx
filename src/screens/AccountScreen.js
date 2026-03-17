import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';

const AccountScreen = ({ navigation }) => {
  const { user, isRTL, setIsAuthenticated } = useApp();
  const insets = useSafeAreaInsets();

  const menuSections = [
    {
      title: 'الحساب',
      items: [
        { id: 'profile', label: 'الملف الشخصي', icon: 'person', color: colors.primary, screen: null },
        { id: 'wallet', label: 'المحفظة', icon: 'wallet', color: colors.success, screen: 'Wallet' },
        { id: 'addresses', label: 'عناويني', icon: 'location', color: colors.info, screen: 'Location' },
        { id: 'cards', label: 'طرق الدفع', icon: 'card', color: colors.warning, screen: null },
      ],
    },
    {
      title: 'المساعدة',
      items: [
        { id: 'help', label: 'المساعدة', icon: 'help-circle', color: colors.accent, screen: 'Chat' },
        { id: 'chat', label: 'تواصل معنا', icon: 'chatbubbles', color: colors.green, screen: 'Chat' },
        { id: 'about', label: 'عن تاتكس', icon: 'information-circle', color: colors.secondary, screen: null },
      ],
    },
    {
      title: 'المزيد',
      items: [
        { id: 'share', label: 'مشاركة التطبيق', icon: 'share', color: colors.primary, screen: null },
        { id: 'language', label: 'اللغة', icon: 'language', color: colors.info, screen: null },
        { id: 'feedback', label: 'رأيك يهمنا', icon: 'star', color: colors.warning, screen: null },
        { id: 'logout', label: 'تسجيل خروج', icon: 'log-out', color: colors.error, screen: null, action: 'logout' },
      ],
    },
  ];

  const userStats = [
    { label: 'الرصيد', value: '0 ر.س', icon: 'wallet', color: colors.success },
    { label: 'الطلبات', value: '0', icon: 'bag', color: colors.primary },
    { label: 'النقاط', value: '0', icon: 'star', color: colors.warning },
    { label: 'القسائم', value: '0', icon: 'pricetag', color: colors.info },
  ];

  const handleMenuItemPress = (item) => {
    if (item.action === 'logout') {
      setIsAuthenticated(false);
    } else if (item.screen) {
      navigation.navigate(item.screen);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Safe Area */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.sm) }]}>
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={32} color={colors.white} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>مرحباً، زائر</Text>
              <Text style={styles.userEmail}>أهلاً بك في تاتكس</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.settingsBtn} activeOpacity={0.7}>
            <Ionicons name="settings" size={22} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Add Store Banner */}
        <TouchableOpacity 
          style={styles.storeBanner}
          activeOpacity={0.8}
          onPress={() => {}}
        >
          <View style={styles.bannerContent}>
            <View style={styles.bannerIcon}>
              <Ionicons name="storefront" size={32} color={colors.white} />
              <View style={styles.bannerPlus}>
                <Ionicons name="add" size={14} color={colors.primary} />
              </View>
            </View>
            <View style={styles.bannerText}>
              <Text style={styles.bannerTitle}>اضف متجرك</Text>
              <Text style={styles.bannerSubtitle}>زد مبيعاتك و ضاعف اموالك</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward" size={24} color={colors.white} />
        </TouchableOpacity>

        {/* User Stats */}
        <View style={styles.statsContainer}>
          {userStats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
                <Ionicons name={stat.icon} size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={[styles.menuContainer, shadows.sm]}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    itemIndex < section.items.length - 1 && styles.menuItemBorder,
                  ]}
                  onPress={() => handleMenuItemPress(item)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
                    <Ionicons name={item.icon} size={22} color={item.color} />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  {item.id === 'logout' ? (
                    <Ionicons name="arrow-forward" size={18} color={colors.error} />
                  ) : (
                    <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* App Version */}
        <View style={styles.versionContainer}>
          <View style={styles.versionBadge}>
            <Ionicons name="shield-checkmark" size={16} color={colors.success} />
            <Text style={styles.versionText}>الإصدار 1.1.0</Text>
          </View>
          <Text style={styles.copyrightText}>© 2026 تاتكس. جميع الحقوق محفوظة.</Text>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: Math.max(insets.bottom, spacing.lg) }} />
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
    paddingBottom: spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
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
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: spacing.md,
  },
  // Store Banner
  storeBanner: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.md,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bannerIcon: {
    position: 'relative',
    marginLeft: spacing.md,
  },
  bannerPlus: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.white,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  // Stats Container
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  // Menu Sections
  menuSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    marginRight: spacing.sm,
  },
  menuContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
    marginRight: spacing.md,
  },
  // Version
  versionContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  versionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '15',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  versionText: {
    fontSize: 13,
    color: colors.success,
    fontWeight: '600',
  },
  copyrightText: {
    fontSize: 11,
    color: colors.gray,
  },
});

export default AccountScreen;
