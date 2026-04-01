import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Image, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { colors, spacing, borderRadius, typography, fonts } from '../constants/theme';
import { requestAuthCode } from '../services/authService';
import { validateSaudiPhone, validateName, RTL } from '../utils/rtlHelpers';

const authModes = [
  { id: 'login', label: 'تسجيل الدخول', subtitle: 'ادخل برقم الجوال إذا كان لديك حساب' },
  { id: 'register', label: 'إنشاء حساب', subtitle: 'أنشئ حسابًا جديدًا قبل استخدام التطبيق' },
];

const LoginScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { demoMarket } = useApp();

  const [authMode, setAuthMode] = useState('login');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: demoMarket?.city || 'الرياض',
  });
  const [loading, setLoading] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (field === 'phone') setPhoneError('');
    if (field === 'name') setNameError('');
  };

  const validateForm = () => {
    // Validate phone number first
    const phoneValidation = validateSaudiPhone(form.phone);
    if (!phoneValidation.valid) {
      setPhoneError(phoneValidation.error);
      Alert.alert('رقم الجوال غير صحيح', phoneValidation.error);
      return false;
    }
    setPhoneError('');

    // Validate name for registration
    if (authMode === 'register') {
      const nameValidation = validateName(form.name);
      if (!nameValidation.valid) {
        setNameError(nameValidation.error);
        Alert.alert('الاسم غير صحيح', nameValidation.error);
        return false;
      }
      setNameError('');
    }

    return true;
  };

  const handleContinue = async () => {
    if (!validateForm()) {
      return;
    }

    setButtonPressed(true);
    setLoading(true);

    const cityValue = form.city?.trim() || 'الرياض';

    try {
      const { data, error } = await requestAuthCode({
        phone: form.phone.trim(),
        mode: authMode,
        profile: {
          name: form.name.trim(),
          city: cityValue,
        },
      });

      if (error) {
        console.error('Auth error:', error);
        if (Platform.OS === 'web') {
          window.alert('تعذر إرسال الرمز: ' + (error.message || 'حاول مرة أخرى بعد قليل.'));
        } else {
          Alert.alert('تعذر إرسال الرمز', error.message || 'حاول مرة أخرى بعد قليل.');
        }
        setLoading(false);
        setButtonPressed(false);
        return;
      }

      setLoading(false);
      setButtonPressed(false);

      // Show OTP code in alert for testing
      const testCode = data?.code || '1234';

      if (Platform.OS === 'web') {
        // Web: Use browser alert and redirect
        window.alert(
          `تم إرسال رمز التحقق\n\nرمز التحقق هو: ${testCode}\n(للاختبار استخدم هذا الرمز)`
        );
        navigation.navigate('OTP', {
          phone: form.phone.trim(),
          authMode,
          profile: {
            name: form.name.trim(),
            city: cityValue,
          },
          otpCode: testCode,
        });
      } else {
        // Mobile: Use React Native Alert with button
        Alert.alert(
          'تم إرسال رمز التحقق',
          `رمز التحقق هو: ${testCode}\n(للاختبار استخدم هذا الرمز)`,
          [
            {
              text: 'متابعة',
              onPress: () =>
                navigation.navigate('OTP', {
                  phone: form.phone.trim(),
                  authMode,
                  profile: {
                    name: form.name.trim(),
                    city: cityValue,
                  },
                  otpCode: testCode,
                }),
            },
          ]
        );
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setLoading(false);
      setButtonPressed(false);
      Alert.alert('حدث خطأ', 'يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={insets.top}
    >
      <LinearGradient colors={['#FBF6F8', '#FFF9FA']} style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + spacing.xl, paddingBottom: insets.bottom + spacing.xxxl }]}
          keyboardShouldPersistTaps="handled"
        >
        {/* Hero Section - Apple HIG: Centered content */}
        <View style={styles.hero}>
          <View style={styles.logoWrap}>
            <LinearGradient colors={['#FCE2E7', '#FFF7F8']} style={styles.logoShell}>
              <Image source={require('../../assets/logo.png')} style={styles.heroLogo} resizeMode="contain" />
            </LinearGradient>
          </View>
          <Text style={styles.heroBrand}>Tatx SA</Text>
          <Text style={styles.heroTitle}>ابدأ باستخدام التطبيق</Text>
          <Text style={styles.heroSubtitle}>سجّل أو أنشئ حسابًا أولًا ثم فعّل رقم الجوال قبل الدخول إلى الخدمات.</Text>
        </View>

        {/* Auth Mode Cards - Apple HIG: Stack layout */}
        <View style={styles.card}>
          <View style={styles.modeList}>
            {authModes.map((mode) => {
              const isSelected = authMode === mode.id;

              return (
                <TouchableOpacity
                  key={mode.id}
                  style={[styles.modeCard, isSelected && styles.modeCardSelected]}
                  onPress={() => setAuthMode(mode.id)}
                  activeOpacity={0.9}
                >
                  <Text style={[styles.modeTitle, isSelected && styles.modeTitleSelected]}>{mode.label}</Text>
                  <Text style={[styles.modeSubtitle, isSelected && styles.modeSubtitleSelected]}>{mode.subtitle}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Name Input (Register only) - Apple HIG: Input field layout */}
          {authMode === 'register' ? (
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>الاسم الكامل</Text>
              <View style={[styles.inputShell, nameError && styles.inputError]}>
                <TextInput
                  style={styles.input}
                  placeholder="أدخل الاسم الكامل"
                  placeholderTextColor={colors.textTertiary}
                  value={form.name}
                  onChangeText={(value) => updateField('name', value)}
                  returnKeyType="next"
                  autoCapitalize="words"
                />
              </View>
              {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
            </View>
          ) : null}

          {/* Phone Input - Apple HIG: Input field layout */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>رقم الجوال</Text>
            <View style={[styles.inputShell, phoneError && styles.inputError]}>
              <TextInput
                style={styles.input}
                placeholder="05XXXXXXXX"
                placeholderTextColor={colors.textTertiary}
                keyboardType="phone-pad"
                value={form.phone}
                onChangeText={(value) => updateField('phone', value)}
                returnKeyType="done"
                maxLength={10}
              />
            </View>
            {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
          </View>

          {/* City Input (Register only) - Apple HIG: Input field layout */}
          {authMode === 'register' ? (
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>المدينة</Text>
              <View style={styles.inputShell}>
                <TextInput
                  style={styles.input}
                  placeholder="الرياض"
                  placeholderTextColor={colors.textTertiary}
                  value={form.city}
                  onChangeText={(value) => updateField('city', value)}
                  returnKeyType="done"
                />
              </View>
            </View>
          ) : null}

          {/* Primary Action Button - Apple HIG: Full width, 54pt height */}
          <TouchableOpacity
            style={[styles.primaryButton, buttonPressed && styles.primaryButtonPressed]}
            onPress={handleContinue}
            activeOpacity={0.8}
            disabled={loading}
          >
            <LinearGradient
              colors={loading ? [colors.primaryLight, colors.primaryLight] : colors.primaryGradient}
              style={styles.primaryButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {loading ? (
                <ActivityIndicator color={colors.white} size="small" />
              ) : (
                <Text style={styles.primaryButtonText}>إرسال رمز التحقق</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl },
  
  // Hero Section - Apple HIG: Centered layout
  hero: { 
    marginBottom: spacing.xl, 
    alignItems: 'center',
    paddingHorizontal: spacing.md,
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
  heroLogo: { width: 48, height: 48 },
  heroBrand: { 
    color: colors.primary, 
    fontFamily: fonts.semiBold, 
    fontSize: 15, 
    textAlign: 'center', 
    marginBottom: spacing.xs,
    writingDirection: 'ltr', // Brand name stays LTR
  },
  heroTitle: { 
    ...typography.title1, 
    color: colors.text, 
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  heroSubtitle: { 
    ...typography.body, 
    color: colors.textSecondary, 
    textAlign: 'center', 
    marginTop: spacing.sm,
    writingDirection: 'rtl',
    paddingHorizontal: spacing.md,
  },
  
  // Card - Apple HIG: Elevated surface with 32pt radius, no shadows
  card: { 
    backgroundColor: colors.card, 
    borderRadius: 32, 
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  
  // Mode List - Apple HIG: Stack layout with gap
  modeList: { gap: spacing.sm, marginBottom: spacing.lg },
  modeCard: { 
    backgroundColor: colors.cardSecondary, 
    borderRadius: 20, 
    padding: spacing.md, 
    borderWidth: 1, 
    borderColor: 'transparent',
  },
  modeCardSelected: { 
    borderColor: 'rgba(218,60,87,0.18)', 
    backgroundColor: '#FFF4F6',
  },
  modeTitle: { 
    color: colors.text, 
    fontFamily: fonts.bold, 
    fontSize: 16, 
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  modeTitleSelected: { color: colors.primary },
  modeSubtitle: { 
    color: colors.textSecondary, 
    fontSize: 12, 
    marginTop: 4, 
    textAlign: 'right',
    writingDirection: 'rtl',
    lineHeight: 18,
  },
  modeSubtitleSelected: { color: colors.text },
  
  // Input Fields - Apple HIG: 54pt height, right-aligned
  fieldGroup: { marginBottom: spacing.md },
  fieldLabel: { 
    color: colors.text, 
    fontFamily: fonts.semiBold, 
    fontSize: 14, 
    textAlign: 'right', 
    marginBottom: spacing.sm,
    writingDirection: 'rtl',
  },
  inputShell: { 
    backgroundColor: colors.cardSecondary, 
    borderRadius: borderRadius.lg, 
    paddingHorizontal: spacing.md, 
    minHeight: 54, // Apple HIG: Minimum 44pt touch target
    justifyContent: 'center',
  },
  inputError: { 
    borderColor: colors.error, 
    borderWidth: 1,
  },
  input: { 
    minHeight: 54, 
    color: colors.text, 
    textAlign: 'right', 
    fontFamily: fonts.regular, 
    writingDirection: 'rtl',
    fontSize: 17, // Apple HIG: Body text size
  },
  errorText: { 
    color: colors.error, 
    fontSize: 12, 
    fontFamily: fonts.regular, 
    textAlign: 'right', 
    marginTop: 4, 
    writingDirection: 'rtl',
  },
  
  // Primary Button - Apple HIG: 54pt height, full width
  primaryButton: { 
    marginTop: spacing.lg, 
    transform: [{ scale: 1 }],
  },
  primaryButtonPressed: { 
    transform: [{ scale: 0.98 }],
  },
  primaryButtonGradient: { 
    borderRadius: borderRadius.full, 
    alignItems: 'center', 
    justifyContent: 'center', 
    minHeight: 54, // Apple HIG: Minimum 44pt, using 54pt
    paddingHorizontal: spacing.xl,
  },
  primaryButtonText: { 
    color: colors.white, 
    fontFamily: fonts.semiBold, 
    fontSize: 17, // Apple HIG: Button text size
    letterSpacing: 0, // Arabic doesn't use letter-spacing
    textAlign: 'center',
    writingDirection: 'rtl',
  },
});

export default LoginScreen;
