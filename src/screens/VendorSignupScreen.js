import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';

const VendorSignupScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { rowDirection, isRTL } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    storeName: '',
    ownerName: '',
    phone: '',
    email: '',
    // Step 2: Store Details
    category: '',
    description: '',
    address: '',
    city: '',
    // Step 3: Documents
    crNumber: '',
    idNumber: '',
    // Step 4: Bank Info
    bankName: '',
    accountNumber: '',
    iban: '',
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const categories = [
    { id: 'restaurant', name: 'مطعم', icon: 'restaurant' },
    { id: 'market', name: 'متجر', icon: 'cart' },
    { id: 'pharmacy', name: 'صيدلية', icon: 'medkit' },
    { id: 'wholesale', name: 'جملة', icon: 'layers' },
    { id: 'hotel', name: 'فندق', icon: 'bed' },
    { id: 'chalet', name: 'شاليه', icon: 'home' },
    { id: 'hall', name: 'قاعة', icon: 'business' },
    { id: 'doctor', name: 'عيادة', icon: 'pulse' },
    { id: 'flowers', name: 'ورود', icon: 'flower' },
    { id: 'other', name: 'أخرى', icon: 'apps' },
  ];

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.storeName || !formData.ownerName || !formData.phone) {
        Alert.alert('تنبيه', 'يرجى ملء جميع الحقول المطلوبة');
        return false;
      }
    }
    if (step === 2) {
      if (!formData.category || !formData.address || !formData.city) {
        Alert.alert('تنبيه', 'يرجى ملء جميع الحقول المطلوبة');
        return false;
      }
    }
    if (step === 3) {
      if (!formData.crNumber || !formData.idNumber) {
        Alert.alert('تنبيه', 'يرجى إدخال رقم السجل التجاري ورقم الهوية');
        return false;
      }
    }
    if (step === 4) {
      if (!formData.bankName || !formData.accountNumber || !formData.iban) {
        Alert.alert('تنبيه', 'يرجى إدخال البيانات البنكية');
        return false;
      }
      if (!acceptedTerms) {
        Alert.alert('تنبيه', 'يرجى الموافقة على الشروط والأحكام');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 4) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    Alert.alert(
      'تم إرسال الطلب',
      'سيتم مراجعة طلبك والتواصل معك خلال 24 ساعة',
      [
        {
          text: 'حسناً',
          onPress: () =>
            navigation.replace('VendorApp', {
              providerType: formData.category || 'restaurant',
              providerName: formData.storeName || 'مقدم خدمة جديد',
              onboarded: true,
            }),
        },
      ]
    );
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3, 4].map((s) => (
        <React.Fragment key={s}>
          <View style={[
            styles.stepDot,
            s <= step && styles.stepDotActive,
            s < step && styles.stepDotCompleted,
          ]}>
            {s < step ? (
              <Ionicons name="checkmark" size={16} color={colors.white} />
            ) : (
              <Text style={[styles.stepText, s <= step && styles.stepTextActive]}>
                {s}
              </Text>
            )}
          </View>
          {s < 4 && <View style={[styles.stepLine, s < step && styles.stepLineActive]} />}
        </React.Fragment>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>المعلومات الأساسية</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>اسم المتجر <Text style={styles.required}>*</Text></Text>
        <View style={styles.inputContainer}>
          <Ionicons name="storefront" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="أدخل اسم المتجر"
            placeholderTextColor={colors.textSecondary}
            value={formData.storeName}
            onChangeText={(value) => updateField('storeName', value)}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>اسم المالك <Text style={styles.required}>*</Text></Text>
        <View style={styles.inputContainer}>
          <Ionicons name="person" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="أدخل اسم المالك"
            placeholderTextColor={colors.textSecondary}
            value={formData.ownerName}
            onChangeText={(value) => updateField('ownerName', value)}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>رقم الجوال <Text style={styles.required}>*</Text></Text>
        <View style={styles.inputContainer}>
          <Ionicons name="call" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="05xxxxxxxx"
            placeholderTextColor={colors.textSecondary}
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(value) => updateField('phone', value)}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>البريد الإلكتروني</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="name@domain.sa"
            placeholderTextColor={colors.textSecondary}
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(value) => updateField('email', value)}
          />
        </View>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>تفاصيل المتجر</Text>
      
      <Text style={styles.label}>تصنيف المتجر <Text style={styles.required}>*</Text></Text>
      <View style={styles.categoriesGrid}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryItem,
              formData.category === cat.id && styles.categoryItemSelected,
            ]}
            onPress={() => updateField('category', cat.id)}
          >
            <Ionicons 
              name={cat.icon} 
              size={24} 
              color={formData.category === cat.id ? colors.white : colors.textSecondary} 
            />
            <Text style={[
              styles.categoryText,
              formData.category === cat.id && styles.categoryTextSelected,
            ]}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>وصف المتجر</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="اكتب وصفاً مختصراً لمتجرك"
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={4}
          value={formData.description}
          onChangeText={(value) => updateField('description', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>العنوان <Text style={styles.required}>*</Text></Text>
        <View style={styles.inputContainer}>
          <Ionicons name="location" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="أدخل العنوان بالتفصيل"
            placeholderTextColor={colors.textSecondary}
            value={formData.address}
            onChangeText={(value) => updateField('address', value)}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>المدينة <Text style={styles.required}>*</Text></Text>
        <View style={styles.inputContainer}>
          <Ionicons name="map" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="الدمام، الرياض، جدة..."
            placeholderTextColor={colors.textSecondary}
            value={formData.city}
            onChangeText={(value) => updateField('city', value)}
          />
        </View>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>الوثائق المطلوبة</Text>
      
      <View style={styles.documentInfo}>
        <Ionicons name="information-circle" size={20} color={colors.info} />
        <Text style={styles.documentInfoText}>
          يرجى التأكد من صحة البيانات المدخلة لتسريع عملية المراجعة
        </Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>رقم السجل التجاري <Text style={styles.required}>*</Text></Text>
        <View style={styles.inputContainer}>
          <Ionicons name="document" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="أدخل رقم السجل التجاري"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            value={formData.crNumber}
            onChangeText={(value) => updateField('crNumber', value)}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>رقم الهوية / الإقامة <Text style={styles.required}>*</Text></Text>
        <View style={styles.inputContainer}>
          <Ionicons name="card" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="أدخل رقم الهوية"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            value={formData.idNumber}
            onChangeText={(value) => updateField('idNumber', value)}
          />
        </View>
      </View>

      <View style={styles.uploadSection}>
        <Text style={styles.label}>صورة السجل التجاري</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={() => Alert.alert('رفع الملف', 'تم اختيار صورة السجل التجاري.')}>
          <Ionicons name="cloud-upload" size={40} color={colors.textSecondary} />
          <Text style={styles.uploadText}>اضغط لرفع الصورة</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.uploadSection}>
        <Text style={styles.label}>صورة الهوية / الإقامة</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={() => Alert.alert('رفع الملف', 'تم اختيار صورة الهوية أو الإقامة.')}>
          <Ionicons name="cloud-upload" size={40} color={colors.textSecondary} />
          <Text style={styles.uploadText}>اضغط لرفع الصورة</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>البيانات البنكية</Text>
      
      <View style={styles.bankInfo}>
        <Ionicons name="shield-checkmark" size={20} color={colors.success} />
        <Text style={styles.bankInfoText}>
          بياناتك البنكية مشفرة وآمنة تماماً
        </Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>اسم البنك <Text style={styles.required}>*</Text></Text>
        <View style={styles.inputContainer}>
          <Ionicons name="business" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="أدخل اسم البنك"
            placeholderTextColor={colors.textSecondary}
            value={formData.bankName}
            onChangeText={(value) => updateField('bankName', value)}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>رقم الحساب <Text style={styles.required}>*</Text></Text>
        <View style={styles.inputContainer}>
          <Ionicons name="cash" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="أدخل رقم الحساب"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            value={formData.accountNumber}
            onChangeText={(value) => updateField('accountNumber', value)}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>الآيبان <Text style={styles.required}>*</Text></Text>
        <View style={styles.inputContainer}>
          <Ionicons name="swap-horizontal" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="SAxx xxxx xxxx xxxx xxxx xxxx"
            placeholderTextColor={colors.textSecondary}
            value={formData.iban}
            onChangeText={(value) => updateField('iban', value)}
          />
        </View>
      </View>

      <View style={styles.termsContainer}>
        <TouchableOpacity style={styles.checkbox} onPress={() => setAcceptedTerms((prev) => !prev)}>
          <Ionicons name={acceptedTerms ? 'checkbox' : 'square-outline'} size={22} color={acceptedTerms ? colors.primary : colors.textSecondary} />
        </TouchableOpacity>
        <Text style={styles.termsText}>
          أوافق على <Text style={styles.termsLink}>الشروط والأحكام</Text> و
          <Text style={styles.termsLink}> سياسة الخصوصية</Text>
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.sm), flexDirection: rowDirection }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Ionicons name={isRTL ? 'arrow-forward' : 'arrow-back'} size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>تسجيل متجر جديد</Text>
        <View style={styles.headerBtn} />
      </View>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Form Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}

        {/* Bottom spacing for button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.md), flexDirection: rowDirection }]}>
        {step > 1 && (
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setStep(step - 1)}
          >
            <Ionicons name={isRTL ? 'arrow-forward' : 'arrow-back'} size={20} color={colors.text} />
            <Text style={styles.backButtonText}>السابق</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          style={[styles.nextButton, { opacity: step === 4 ? 0.8 : 1 }]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {step === 4 ? 'إرسال الطلب' : 'التالي'}
          </Text>
          <Ionicons name={isRTL ? 'arrow-back' : 'arrow-forward'} size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.white,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  // Step Indicator
  stepIndicator: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  stepDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepDotActive: {
    backgroundColor: colors.primary,
  },
  stepDotCompleted: {
    backgroundColor: colors.success,
  },
  stepText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  stepTextActive: {
    color: colors.white,
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: colors.grayLight,
    marginHorizontal: spacing.sm,
  },
  stepLineActive: {
    backgroundColor: colors.success,
  },
  // Form Content
  scrollContent: {
    padding: spacing.md,
  },
  formSection: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: 'right',
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'right',
  },
  required: {
    color: colors.error,
  },
  inputContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: colors.grayLight,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    marginRight: spacing.sm,
    textAlign: 'right',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: spacing.md,
  },
  // Categories Grid
  categoriesGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  categoryItem: {
    width: '23%',
    backgroundColor: colors.grayLight,
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    alignItems: 'center',
    marginBottom: spacing.sm,
    marginHorizontal: '1%',
  },
  categoryItemSelected: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  categoryTextSelected: {
    color: colors.white,
  },
  // Document Info
  documentInfo: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: colors.info + '15',
    padding: spacing.sm,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  documentInfoText: {
    fontSize: 13,
    color: colors.info,
    marginRight: spacing.sm,
    flex: 1,
    textAlign: 'right',
  },
  // Upload Section
  uploadSection: {
    marginBottom: spacing.md,
  },
  uploadBox: {
    height: 100,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.grayLight,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grayLight + '50',
  },
  uploadText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  // Bank Info
  bankInfo: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: colors.success + '15',
    padding: spacing.sm,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  bankInfoText: {
    fontSize: 13,
    color: colors.success,
    marginRight: spacing.sm,
    flex: 1,
    textAlign: 'right',
  },
  // Terms
  termsContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  checkbox: {
    marginRight: spacing.sm,
  },
  termsText: {
    fontSize: 13,
    color: colors.textSecondary,
    flex: 1,
    textAlign: 'right',
  },
  termsLink: {
    color: colors.primary,
    fontWeight: '600',
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
    paddingTop: spacing.md,
  },
  backButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.grayLight,
    marginRight: spacing.sm,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginRight: spacing.xs,
  },
  nextButton: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    gap: spacing.sm,
    ...shadows.md,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    marginRight: spacing.xs,
  },
});

export default VendorSignupScreen;
