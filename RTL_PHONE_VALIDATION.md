# RTL Layout & Phone Validation Implementation

## Overview
This document describes the RTL (Right-to-Left) layout improvements and phone number validation implemented in the Tatx SA app following Apple HIG (Human Interface Guidelines) for RTL languages.

---

## 1. Phone Number Validation

### Saudi Phone Number Format
- **Format**: `05XXXXXXXX` (10 digits)
- **Must start with**: `05`
- **Validation**: Real-time validation before navigating to OTP screen

### Validation Rules

#### LoginScreen
1. **Phone Number**
   - Required field
   - Must match Saudi format: `/^05[0-9]{8}$/`
   - Shows inline error when invalid
   - Maximum 10 characters

2. **Name (Registration only)**
   - Required for registration
   - Minimum 3 characters
   - Shows inline error when invalid

3. **City (Registration only)**
   - Optional field
   - Defaults to 'الرياض' if empty

### Validation Flow
```
User enters phone → Validates format → Shows error if invalid → 
If valid, proceeds to OTP screen
```

### Error Messages (Arabic)
- **Missing phone**: "رقم الجوال مطلوب"
- **Invalid format**: "أدخل رقم جوال سعودي صحيح (يبدأ بـ 05 ويتكون من 10 أرقام)"
- **Missing name**: "الاسم مطلوب"
- **Short name**: "أدخل اسمًا كاملاً من 3 أحرف على الأقل"

---

## 2. RTL Layout Implementation

### Apple HIG RTL Guidelines Followed

#### 2.1 Layout Mirroring
- **Navigation**: Back arrow points right (→) in RTL
- **Text Alignment**: All text aligned right
- **Flex Direction**: Rows use `row-reverse` for RTL
- **Input Fields**: Text aligned right, cursor starts from right

#### 2.2 Key RTL Components

##### LoginScreen
```javascript
// Hero section - centered layout
hero: { alignItems: 'center' }
heroTitle: { textAlign: 'center' }
heroSubtitle: { textAlign: 'center' }

// Form elements - RTL aligned
fieldLabel: { textAlign: 'right' }
input: { textAlign: 'right' }
modeTitle: { textAlign: 'right' }
modeSubtitle: { textAlign: 'right' }
```

##### OTPScreen
```javascript
// Header - RTL row layout
header: { flexDirection: 'row-reverse' }
title: { textAlign: 'right' }

// OTP inputs - RTL layout
codeContainer: { flexDirection: 'row-reverse' }
codeInput: { textAlign: 'center' }

// Content - centered with RTL text
content: { alignItems: 'center' }
subtitle: { textAlign: 'center' }
```

### RTL Helper Utilities (`src/utils/rtlHelpers.js`)

#### Available Functions
```javascript
// Phone validation
validateSaudiPhone(phone) → { valid, error, formatted }

// Name validation
validateName(name, isRequired) → { valid, error, formatted }

// OTP validation
validateOTP(code) → { valid, error, code }

// RTL helpers
getBackArrow() → '→' (for RTL) or '←' (for LTR)
RTL_TEXT.START → 'right' (for RTL) or 'left' (for LTR)
RTL_ROW.NORMAL → 'row-reverse' (for RTL) or 'row' (for LTR)
```

---

## 3. Visual Feedback

### Input Error States
- **Border Color**: Changes to red (`colors.error`) when invalid
- **Error Text**: Displays below input in red, 12px
- **Real-time Clear**: Error clears when user starts typing

### Button States
- **Normal**: Gradient from `#F16A82` to `#DA3C57`
- **Pressed**: Scale animation (0.98)
- **Loading**: Solid `#F16A82` with spinner
- **Disabled**: Gray background when form invalid

### OTP Input States
- **Normal**: Gray border (`colors.border`)
- **Error**: Red border (2px) with error message below
- **Focused**: Auto-highlighted for easy editing

---

## 4. Keyboard Handling

### KeyboardAvoidingView Configuration
```javascript
<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  keyboardVerticalOffset={insets.top}
>
```

### Features
- **iOS**: Uses padding behavior
- **Android**: Uses height behavior
- **Safe Area**: Respects notch and home indicator
- **Persist Taps**: `keyboardShouldPersistTaps="handled"` allows button taps without dismissing keyboard

---

## 5. Files Modified

### Core Files
- `/src/screens/LoginScreen.js` - Login/registration with validation
- `/src/screens/OTPScreen.js` - OTP verification with validation
- `/src/utils/rtlHelpers.js` - NEW: RTL and validation utilities

### Configuration Files
- `/App.js` - RTL enabled at app level (already configured)

---

## 6. Testing Checklist

### Phone Validation
- [ ] Enter invalid phone (e.g., "1234567890") → Shows error
- [ ] Enter non-Saudi phone (e.g., "0777123456") → Shows error
- [ ] Enter valid Saudi phone (e.g., "0555123456") → Proceeds to OTP
- [ ] Leave phone empty → Shows error
- [ ] Phone with spaces → Trims and validates

### Registration Flow
- [ ] Enter short name (< 3 chars) → Shows error
- [ ] Enter valid name → Proceeds to OTP
- [ ] Leave name empty → Shows error

### OTP Validation
- [ ] Enter less than 4 digits → Button disabled
- [ ] Enter 4 digits → Button enabled
- [ ] Enter wrong OTP → Shows error message
- [ ] Enter correct OTP (1234) → Logs in successfully

### RTL Layout
- [ ] All text aligned right
- [ ] Back arrow points right (→)
- [ ] Input text starts from right
- [ ] Mode cards layout correct
- [ ] Button text centered
- [ ] Hero section centered

### Keyboard Behavior
- [ ] Keyboard doesn't cover inputs
- [ ] Can tap button while keyboard visible
- [ ] Input fields scroll into view
- [ ] Keyboard dismisses on submit

---

## 7. Apple HIG Compliance

### Layout and Appearance
✅ **Mirrored Layout**: All elements properly mirrored for RTL
✅ **Text Alignment**: Consistent right alignment
✅ **Navigation**: Back button direction correct
✅ **Icons**: Directional icons mirrored appropriately

### Typography
✅ **Arabic Font**: Cairo font family used
✅ **Font Sizes**: Follow Apple HIG recommendations
✅ **Line Heights**: Proper spacing for Arabic text

### Interaction
✅ **Touch Targets**: Minimum 44x44 points
✅ **Feedback**: Visual feedback on all interactions
✅ **Keyboard**: Proper handling for RTL input

---

## 8. Common Issues & Solutions

### Issue: Keyboard covers input
**Solution**: KeyboardAvoidingView with proper offset

### Issue: Text alignment inconsistent
**Solution**: Explicit `textAlign: 'right'` on all text elements

### Issue: Back arrow wrong direction
**Solution**: Use `getBackArrow()` helper function

### Issue: Validation doesn't trigger
**Solution**: Validate on button press with clear error states

### Issue: Error doesn't clear
**Solution**: Clear errors in `updateField` when user types

---

## 9. Code Examples

### Phone Validation Example
```javascript
const phoneValidation = validateSaudiPhone(form.phone);
if (!phoneValidation.valid) {
  setPhoneError(phoneValidation.error);
  Alert.alert('رقم الجوال غير صحيح', phoneValidation.error);
  return false;
}
```

### RTL Layout Example
```javascript
<View style={styles.header}>
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Text style={styles.backButton}>{getBackArrow()}</Text>
  </TouchableOpacity>
  <Text style={styles.title}>تأكيد كود التفعيل</Text>
</View>
```

### Error State Example
```javascript
<View style={[styles.inputShell, phoneError && styles.inputError]}>
  <TextInput
    style={styles.input}
    value={form.phone}
    onChangeText={(value) => updateField('phone', value)}
  />
</View>
{phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
```

---

## 10. Future Enhancements

1. **Auto-format phone number** as user types (05X XXX XXXX)
2. **SMS auto-fill** for OTP on iOS
3. **Country code selector** for international numbers
4. **Biometric authentication** after first login
5. **Haptic feedback** on validation errors

---

## Support

For questions or issues related to RTL implementation or validation:
- Check Apple HIG RTL guidelines: https://developer.apple.com/design/human-interface-guidelines/layout
- Review React Native I18nManager docs
- Test on both iOS and Android for platform-specific behavior
