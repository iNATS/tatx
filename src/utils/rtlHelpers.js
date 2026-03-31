import { I18nManager, Platform } from 'react-native';

// RTL Configuration
export const isRTL = I18nManager.isRTL;

// RTL-aware direction helpers
export const RTL_DIRECTION = {
  START: isRTL ? 'right' : 'left',
  END: isRTL ? 'left' : 'right',
};

// RTL-aware alignment helpers
export const RTL_ALIGN = {
  START: isRTL ? 'flex-end' : 'flex-start',
  END: isRTL ? 'flex-start' : 'flex-end',
  CENTER: 'center',
};

// RTL-aware text alignment
export const RTL_TEXT = {
  START: isRTL ? 'right' : 'left',
  END: isRTL ? 'left' : 'right',
  CENTER: 'center',
};

// RTL-aware flex direction for rows
export const RTL_ROW = {
  NORMAL: isRTL ? 'row-reverse' : 'row',
  REVERSE: isRTL ? 'row' : 'row-reverse',
};

// Phone validation for Saudi numbers
export const validateSaudiPhone = (phone) => {
  if (!phone) {
    return {
      valid: false,
      error: 'رقم الجوال مطلوب',
    };
  }

  const cleaned = phone.trim();

  // Check if it matches Saudi format (05XXXXXXXX)
  const saudiRegex = /^05[0-9]{8}$/;
  if (!saudiRegex.test(cleaned)) {
    return {
      valid: false,
      error: 'أدخل رقم جوال سعودي صحيح (يبدأ بـ 05 ويتكون من 10 أرقام)',
    };
  }

  return {
    valid: true,
    error: null,
    formatted: cleaned,
  };
};

// Name validation
export const validateName = (name, isRequired = true) => {
  if (!name || !name.trim()) {
    if (isRequired) {
      return {
        valid: false,
        error: 'الاسم مطلوب',
      };
    }
    return {
      valid: true,
      error: null,
    };
  }

  const trimmed = name.trim();
  if (trimmed.length < 3) {
    return {
      valid: false,
      error: 'أدخل اسمًا كاملاً من 3 أحرف على الأقل',
    };
  }

  return {
    valid: true,
    error: null,
    formatted: trimmed,
  };
};

// OTP validation
export const validateOTP = (code) => {
  if (!code || code.length !== 4) {
    return {
      valid: false,
      error: 'أدخل رمز التحقق المكون من 4 أرقام',
    };
  }

  const numericRegex = /^[0-9]{4}$/;
  if (!numericRegex.test(code)) {
    return {
      valid: false,
      error: 'رمز التحقق يجب أن يحتوي على 4 أرقام فقط',
    };
  }

  return {
    valid: true,
    error: null,
    code: code,
  };
};

// RTL-aware style helper
export const createRTLStyle = (styleObj) => {
  if (Platform.OS === 'web') {
    return styleObj;
  }
  return styleObj;
};

// Get back arrow based on RTL
export const getBackArrow = () => {
  return isRTL ? '→' : '←';
};

// RTL-aware margin/padding helpers
export const RTL_SPACING = {
  marginStart: (value) => ({ [isRTL ? 'marginRight' : 'marginLeft']: value }),
  marginEnd: (value) => ({ [isRTL ? 'marginLeft' : 'marginRight']: value }),
  paddingStart: (value) => ({ [isRTL ? 'paddingRight' : 'paddingLeft']: value }),
  paddingEnd: (value) => ({ [isRTL ? 'paddingLeft' : 'paddingRight']: value }),
};
