import { RTL, RTLStyles, formatNumber, getBackIcon } from './rtl';

// Re-export RTL constants for easy access
export const isRTL = RTL.IS_RTL;
export const RTL_DIRECTION = RTL;
export const RTL_TEXT = {
  START: RTL.TEXT_ALIGN_START,
  END: RTL.TEXT_ALIGN_END,
  CENTER: RTL.TEXT_ALIGN_CENTER,
};
export const RTL_ROW = {
  NORMAL: RTL.ROW,
  REVERSE: RTL.ROW_REVERSE,
};
export const RTL_SPACING = {
  marginStart: (value) => ({ [RTL.MARGIN_START]: value }),
  marginEnd: (value) => ({ [RTL.MARGIN_END]: value }),
  paddingStart: (value) => ({ [RTL.PADDING_START]: value }),
  paddingEnd: (value) => ({ [RTL.PADDING_END]: value }),
};

// Common RTL styles (pre-defined)
export const commonRTLStyles = RTLStyles;

/**
 * Phone validation for Saudi numbers
 * Validates format: 05XXXXXXXX (10 digits, starts with 05)
 */
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

/**
 * Name validation for Arabic names
 * Minimum 3 characters
 */
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

/**
 * OTP validation
 * Must be exactly 4 digits
 */
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

/**
 * Get back arrow icon (points right in RTL)
 * Following Apple HIG: Back button points right in RTL
 */
export const getBackArrow = () => getBackIcon();

/**
 * Format number for display (maintains digit order)
 * Apple HIG: Never reverse digit order in numbers
 */
export const formatNumberRTL = formatNumber;

/**
 * Check if text is RTL script (Arabic/Hebrew)
 */
export const isRTLText = (text) => {
  if (!text) return false;
  const rtlPattern = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
  return rtlPattern.test(text);
};

/**
 * Get RTL-aware style
 */
export const createRTLStyle = (styleObj) => {
  return {
    ...styleObj,
    textAlign: styleObj.textAlign || RTL.TEXT_ALIGN,
  };
};
