import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { colors, spacing, borderRadius, shadows, typography, fonts } from '../constants/theme';
import { requestAuthCode } from '../services/authService';

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
    city: demoMarket.city || 'الرياض',
  });
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = async () => {
    if (!form.phone.trim()) {
      Alert.alert('رقم الجوال مطلوب', 'أدخل رقم الجوال للمتابعة.');
      return;
    }

    if (authMode === 'register' && !form.name.trim()) {
      Alert.alert('الاسم مطلوب', 'أدخل الاسم الكامل لإنشاء الحساب.');
      return;
    }

    setLoading(true);

    const { data, error } = await requestAuthCode({
      phone: form.phone.trim(),
      mode: authMode,
      profile: {
        name: form.name.trim(),
        city: form.city.trim() || demoMarket.city,
      },
    });

    setLoading(false);

    if (error) {
      Alert.alert('تعذر إرسال الرمز', 'حاول مرة أخرى بعد قليل.');
      return;
    }

    Alert.alert(
      'تم إرسال رمز التحقق',
      `للاختبار الحالي استخدم الرمز: ${data?.code || '1234'}`,
      [
        {
          text: 'متابعة',
          onPress: () =>
            navigation.navigate('OTP', {
              phone: form.phone.trim(),
              authMode,
              profile: {
                name: form.name.trim(),
                city: form.city.trim() || demoMarket.city,
              },
            }),
        },
      ]
    );
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
          <Text style={styles.heroBrand}>Tatx SA</Text>
          <Text style={styles.heroTitle}>ابدأ باستخدام التطبيق</Text>
          <Text style={styles.heroSubtitle}>سجّل أو أنشئ حسابًا أولًا ثم فعّل رقم الجوال قبل الدخول إلى الخدمات.</Text>
        </View>

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

          {authMode === 'register' ? (
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>الاسم الكامل</Text>
              <View style={styles.inputShell}>
                <TextInput
                  style={styles.input}
                  placeholder="أدخل الاسم الكامل"
                  placeholderTextColor={colors.textTertiary}
                  value={form.name}
                  onChangeText={(value) => updateField('name', value)}
                />
              </View>
            </View>
          ) : null}

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>رقم الجوال</Text>
            <View style={styles.inputShell}>
              <TextInput
                style={styles.input}
                placeholder="05XXXXXXXX"
                placeholderTextColor={colors.textTertiary}
                keyboardType="phone-pad"
                value={form.phone}
                onChangeText={(value) => updateField('phone', value)}
              />
            </View>
          </View>

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
                />
              </View>
            </View>
          ) : null}

          <TouchableOpacity style={styles.primaryButton} onPress={handleContinue} activeOpacity={0.9} disabled={loading}>
            <LinearGradient colors={colors.primaryGradient} style={styles.primaryButtonGradient}>
              {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.primaryButtonText}>إرسال رمز التحقق</Text>}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl },
  hero: { marginBottom: spacing.xl, alignItems: 'flex-end' },
  logoWrap: { alignSelf: 'center', marginBottom: spacing.md },
  logoShell: { width: 78, height: 78, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  heroLogo: { width: 48, height: 48 },
  heroBrand: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 15, textAlign: 'right', marginBottom: spacing.xs },
  heroTitle: { ...typography.display, color: colors.text, textAlign: 'right' },
  heroSubtitle: { ...typography.body, color: colors.textSecondary, textAlign: 'right', marginTop: spacing.sm },
  card: { backgroundColor: colors.card, borderRadius: 32, padding: spacing.lg, ...shadows.xl },
  modeList: { gap: spacing.sm, marginBottom: spacing.lg },
  modeCard: { backgroundColor: colors.cardSecondary, borderRadius: 20, padding: spacing.md, borderWidth: 1, borderColor: 'transparent' },
  modeCardSelected: { borderColor: 'rgba(218,60,87,0.18)', backgroundColor: '#FFF4F6' },
  modeTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 16, textAlign: 'right' },
  modeTitleSelected: { color: colors.primary },
  modeSubtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 4, textAlign: 'right' },
  modeSubtitleSelected: { color: colors.text },
  fieldGroup: { marginBottom: spacing.md },
  fieldLabel: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 14, textAlign: 'right', marginBottom: spacing.sm },
  inputShell: { backgroundColor: colors.cardSecondary, borderRadius: borderRadius.lg, paddingHorizontal: spacing.md },
  input: { minHeight: 52, color: colors.text, textAlign: 'right', fontFamily: fonts.regular },
  primaryButton: { marginTop: spacing.sm },
  primaryButtonGradient: { borderRadius: borderRadius.full, alignItems: 'center', justifyContent: 'center', minHeight: 54 },
  primaryButtonText: { color: colors.white, fontFamily: fonts.semiBold, fontSize: 16 },
});

export default LoginScreen;
