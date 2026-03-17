import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { colors, spacing, borderRadius } from '../constants/theme';

// Shadow styles as plain objects (must be defined outside StyleSheet.create)
const shadowStyles = {
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonShadow: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
};

const SplashScreen = ({ navigation }) => {
  const { setLanguage } = useApp();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Auto-navigate after delay if needed
    const timer = setTimeout(() => {
      // Keep showing language selection
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    navigation.replace('Onboarding');
  };

  return (
    <View style={styles.container}>
      {/* Top Section with Logo */}
      <View style={[styles.topSection, { paddingTop: Math.max(insets.top, spacing.xl * 2) }]}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.appName}>TATX</Text>
          <Text style={styles.tagline}>دائماً معك</Text>
        </View>
      </View>

      {/* Bottom White Section */}
      <View style={[styles.bottomSection, shadowStyles.shadow, { paddingBottom: Math.max(insets.bottom, spacing.lg) }]}>
        <View style={styles.handle} />
        <Text style={styles.selectTitle}>حدد اللغة</Text>

        <TouchableOpacity
          style={styles.arabicButton}
          onPress={() => handleLanguageSelect('ar')}
          activeOpacity={0.8}
        >
          <Text style={styles.arabicButtonText}>اللغة العربية</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.englishButton}
          onPress={() => handleLanguageSelect('en')}
          activeOpacity={0.8}
        >
          <Text style={styles.englishButtonText}>ENGLISH</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topSection: {
    flex: 2,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: spacing.lg,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: spacing.sm,
  },
  tagline: {
    fontSize: 22,
    color: colors.white,
    opacity: 0.9,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: spacing.lg,
    alignItems: 'center',
  },
  handle: {
    width: 50,
    height: 4,
    backgroundColor: colors.gray,
    borderRadius: 2,
    marginBottom: spacing.xl,
  },
  selectTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.lg,
    alignSelf: 'flex-start',
    width: '100%',
    paddingRight: spacing.md,
  },
  arabicButton: {
    backgroundColor: colors.primary,
    width: '100%',
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  arabicButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  englishButton: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    width: '100%',
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
  },
  englishButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
});

// Apply shadows using Object.assign for Android compatibility
if (Platform.OS === 'android') {
  styles.arabicButton = Object.assign({}, styles.arabicButton, shadowStyles.buttonShadow);
}

export default SplashScreen;
