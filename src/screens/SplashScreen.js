import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { colors, spacing, borderRadius, shadows, typography, fonts } from '../constants/theme';

const SplashScreen = ({ navigation }) => {
  const { setLanguage } = useApp();
  const insets = useSafeAreaInsets();

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    navigation.replace('Onboarding');
  };

  return (
    <LinearGradient colors={['#F8FBFF', '#EAF3FF']} style={styles.container}>
      <View style={[styles.hero, { paddingTop: insets.top + spacing.xl }]}>
        <View style={styles.logoShell}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        </View>
        <Text style={styles.appName}>TATX</Text>
        <Text style={styles.subtitle}>دائما معك</Text>
      </View>

      <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, spacing.lg) }]}>
        <View style={styles.handle} />
        <Text style={styles.sheetTitle}>اختر لغة البداية</Text>
        <Text style={styles.sheetSubtitle}>اختر اللغة المناسبة لك للبدء واستعراض الخدمات.</Text>

        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.9} onPress={() => handleLanguageSelect('ar')}>
          <Text style={styles.primaryButtonText}>العربية</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.85} onPress={() => handleLanguageSelect('en')}>
          <Text style={styles.secondaryButtonText}>English</Text>
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
  secondaryButton: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.text,
    fontFamily: fonts.semiBold,
    fontSize: 17,
  },
});

export default SplashScreen;
