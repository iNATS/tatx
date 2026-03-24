import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { colors, spacing, borderRadius, shadows, typography, fonts } from '../constants/theme';
import { demoAccounts, demoMarket } from '../data/staticData';

const roles = [
  { id: 'user', label: 'عميل', subtitle: 'تصفح واطلب من المتاجر', icon: 'person-outline' },
  { id: 'vendor', label: 'تاجر', subtitle: 'تابع الطلبات والعروض', icon: 'storefront-outline' },
  { id: 'admin', label: 'إدارة', subtitle: 'نسخة مراجعة تشغيلية', icon: 'shield-checkmark-outline' },
];

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const { setIsAuthenticated, setUser } = useApp();
  const [selectedRole, setSelectedRole] = useState('user');
  const [phone, setPhone] = useState(demoAccounts.user.phone);
  const [loading, setLoading] = useState(false);

  const activeAccount = demoAccounts[selectedRole];

  const handleRolePress = (role) => {
    setSelectedRole(role);
    setPhone(demoAccounts[role].phone);
  };

  const handleLogin = () => {
    setLoading(true);

    setTimeout(() => {
      setUser({
        name: activeAccount.name,
        phone: activeAccount.phone,
        role: selectedRole,
        city: activeAccount.city,
        walletBalance: 300,
      });
      setIsAuthenticated(true);
      setLoading(false);
    }, 700);
  };

  return (
    <LinearGradient colors={['#FBF6F8', '#FFF9FA']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + spacing.lg }]}>
        <View style={styles.hero}>
          <View style={styles.logoWrap}>
            <LinearGradient colors={['#FCE2E7', '#FFF7F8']} style={styles.logoShell}>
              <Image source={require('../../assets/logo.png')} style={styles.heroLogo} resizeMode="contain" />
            </LinearGradient>
          </View>
          <Text style={styles.heroBrand}>دائما معك</Text>
          <Text style={styles.heroTitle}>تسجيل سريع للتجربة</Text>
          <Text style={styles.heroSubtitle}>اختر نوع الحساب وأدخل رقم الجوال للمتابعة داخل خدمات {demoMarket.city}.</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.roleList}>
            {roles.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <TouchableOpacity
                  key={role.id}
                  style={[styles.roleCard, isSelected && styles.roleCardSelected]}
                  activeOpacity={0.9}
                  onPress={() => handleRolePress(role.id)}
                >
                  <View style={[styles.roleIcon, isSelected && styles.roleIconSelected]}>
                    <Ionicons name={role.icon} size={20} color={isSelected ? colors.white : colors.primary} />
                  </View>
                  <View style={styles.roleTextBlock}>
                    <Text style={[styles.roleTitle, isSelected && styles.roleTitleSelected]}>{role.label}</Text>
                    <Text style={styles.roleSubtitle}>{role.subtitle}</Text>
                  </View>
                  {isSelected && <Ionicons name="checkmark-circle" size={22} color={colors.primary} />}
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>رقم الجوال</Text>
            <View style={styles.inputShell}>
              <TextInput
                style={styles.input}
                placeholder="05XXXXXXXX"
                placeholderTextColor={colors.textTertiary}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
              <Text style={styles.countryCode}>+966</Text>
            </View>
            <Text style={styles.helperText}>الحساب المختار: {activeAccount.name}</Text>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} activeOpacity={0.9} disabled={loading}>
            <LinearGradient colors={colors.primaryGradient} style={styles.primaryButtonGradient}>
              {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.primaryButtonText}>تسجيل الدخول</Text>}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color={colors.primary} />
            <Text style={styles.infoText}>الخدمات المتاحة حالياً في {demoMarket.city}، {demoMarket.country}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="card-outline" size={18} color={colors.primary} />
            <Text style={styles.infoText}>طرق الدفع المعروضة: Apple Pay، مدى، بطاقات</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  hero: {
    marginBottom: spacing.xl,
    alignItems: 'flex-end',
  },
  logoWrap: {
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  logoShell: {
    width: 78,
    height: 78,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroLogo: {
    width: 48,
    height: 48,
  },
  heroBrand: {
    color: colors.primary,
    fontFamily: fonts.semiBold,
    fontSize: 15,
    textAlign: 'right',
    marginBottom: spacing.xs,
  },
  heroPill: {
    backgroundColor: colors.cardSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    marginBottom: spacing.md,
  },
  heroPillText: {
    color: colors.primary,
    fontFamily: fonts.semiBold,
    fontSize: 13,
  },
  heroTitle: {
    ...typography.display,
    color: colors.text,
    textAlign: 'right',
  },
  heroSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'right',
    marginTop: spacing.sm,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 32,
    padding: spacing.lg,
    ...shadows.xl,
  },
  roleList: {
    gap: spacing.sm,
  },
  roleCard: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.cardSecondary,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  roleCardSelected: {
    backgroundColor: colors.cardSecondary,
    borderColor: 'rgba(218,60,87,0.18)',
  },
  roleIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleIconSelected: {
    backgroundColor: colors.primary,
  },
  roleTextBlock: {
    flex: 1,
    marginHorizontal: spacing.md,
    alignItems: 'flex-end',
  },
  roleTitle: {
    ...typography.label,
    color: colors.text,
  },
  roleTitleSelected: {
    color: colors.primary,
  },
  roleSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
    textAlign: 'right',
  },
  fieldGroup: {
    marginTop: spacing.lg,
  },
  fieldLabel: {
    ...typography.label,
    color: colors.text,
    textAlign: 'right',
    marginBottom: spacing.sm,
  },
  inputShell: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.lg,
    backgroundColor: colors.cardSecondary,
    borderWidth: 1,
    borderColor: colors.borderLight,
    paddingHorizontal: spacing.md,
    height: 56,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontFamily: fonts.semiBold,
    fontSize: 16,
    textAlign: 'right',
  },
  countryCode: {
    color: colors.textSecondary,
    fontFamily: fonts.semiBold,
    fontSize: 15,
    marginLeft: spacing.sm,
  },
  helperText: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'right',
    marginTop: spacing.sm,
  },
  primaryButton: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginTop: spacing.lg,
    ...shadows.md,
  },
  primaryButtonGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  primaryButtonText: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 17,
  },
  infoCard: {
    marginTop: spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.78)',
    borderRadius: 24,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  infoRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: spacing.sm,
  },
  infoText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'right',
    flex: 1,
  },
});

export default LoginScreen;
