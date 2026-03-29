import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows, typography, fonts } from '../constants/theme';

const SplashScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const handleStart = () => {
    navigation.replace('Onboarding');
  };

  return (
    <LinearGradient colors={['#F8FBFF', '#EAF3FF']} style={styles.container}>
      <View style={[styles.hero, { paddingTop: insets.top + spacing.xl }]}>
        <View style={styles.logoShell}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        </View>
        <Text style={styles.appName}>تاتكس</Text>
        <Text style={styles.subtitle}>دائما معك</Text>
      </View>

      <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, spacing.lg) }]}>
        <View style={styles.handle} />
        <Text style={styles.sheetTitle}>ابدأ التجربة</Text>
        <Text style={styles.sheetSubtitle}>واجهة عربية كاملة بتصميم مريح وواضح يراعي أنماط الاستخدام على أجهزة آبل.</Text>

        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.9} onPress={handleStart}>
          <Text style={styles.primaryButtonText}>متابعة</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    flex: 1.1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  heroBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.cardSecondary,
    marginBottom: spacing.lg,
  },
  heroBadgeText: {
    color: colors.primary,
    fontFamily: fonts.semiBold,
    fontSize: 13,
  },
  logoShell: {
    width: 128,
    height: 128,
    borderRadius: 36,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.xl,
  },
  logo: {
    width: 88,
    height: 88,
  },
  appName: {
    ...typography.display,
    color: colors.text,
    marginTop: spacing.lg,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    maxWidth: 280,
  },
  sheet: {
    backgroundColor: colors.glass,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  handle: {
    alignSelf: 'center',
    width: 52,
    height: 5,
    borderRadius: borderRadius.full,
    backgroundColor: colors.border,
    marginBottom: spacing.lg,
  },
  sheetTitle: {
    ...typography.h3,
    color: colors.text,
    textAlign: 'right',
  },
  sheetSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    textAlign: 'right',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: 18,
    alignItems: 'center',
    ...shadows.md,
  },
  primaryButtonText: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 17,
  },
});

export default SplashScreen;
