import { I18nManager, Platform } from 'react-native';

// RTL Configuration - Force RTL for Arabic
export const isRTL = true; // Force RTL since app is Arabic

// RTL-aware direction helpers
export const RTL_DIRECTION = {
  START: 'right',
  END: 'left',
};

// RTL-aware alignment helpers
export const RTL_ALIGN = {
  START: 'flex-end',
  END: 'flex-start',
  CENTER: 'center',
};

// RTL-aware text alignment
export const RTL_TEXT = {
  START: 'right',
  END: 'left',
  CENTER: 'center',
};

// RTL-aware flex direction for rows
export const RTL_ROW = {
  NORMAL: 'row-reverse',
  REVERSE: 'row',
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
  return styleObj;
};

// Get back arrow based on RTL - Always right arrow for Arabic
export const getBackArrow = () => {
  return '→';
};

// RTL-aware margin/padding helpers
export const RTL_SPACING = {
  marginStart: (value) => ({ marginRight: value }),
  marginEnd: (value) => ({ marginLeft: value }),
  paddingStart: (value) => ({ paddingRight: value }),
  paddingEnd: (value) => ({ paddingLeft: value }),
};

// Common RTL styles
export const commonRTLStyles = {
  textRight: {
    textAlign: 'right',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  alignItemsFlexStart: {
    alignItems: 'flex-end',
  },
  justifyContentFlexStart: {
    justifyContent: 'flex-start',
  },
};
