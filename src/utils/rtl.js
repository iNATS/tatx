/**
 * RTL (Right-to-Left) Configuration for Tatx SA
 * Following Apple Human Interface Guidelines for RTL languages
 * 
 * Arabic is the primary language - all RTL rules apply
 */

import { I18nManager } from 'react-native';

// Force RTL for Arabic language
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

// Swap left and right for RTL
if (typeof I18nManager.swapLeftAndRightInRTL === 'function') {
  I18nManager.swapLeftAndRightInRTL(true);
}

/**
 * RTL Constants
 * Use these throughout the app for consistent RTL layout
 */
export const RTL = {
  // Direction
  IS_RTL: true,
  DIRECTION: 'rtl',
  
  // Text Alignment
  TEXT_ALIGN: 'right',
  TEXT_ALIGN_START: 'right',
  TEXT_ALIGN_END: 'left',
  TEXT_ALIGN_CENTER: 'center',
  
  // Flex Direction
  ROW: 'row-reverse',
  ROW_REVERSE: 'row',
  
  // Alignment
  ALIGN_START: 'flex-end',
  ALIGN_END: 'flex-start',
  ALIGN_CENTER: 'center',
  
  // Margins & Padding
  MARGIN_START: 'marginRight',
  MARGIN_END: 'marginLeft',
  PADDING_START: 'paddingRight',
  PADDING_END: 'paddingLeft',
  
  // Navigation
  BACK_ARROW: '→', // Points right in RTL
  FORWARD_ARROW: '←',
  SLIDE_FROM: 'right',
  
  // Horizontal Scroll
  SCROLL_INVERTED: true,
};

/**
 * RTL-aware style helpers
 */
export const RTLStyles = {
  // Text
  textRight: { textAlign: 'right' },
  textLeft: { textAlign: 'left' },
  textCenter: { textAlign: 'center' },
  
  // Layout
  rowReverse: { flexDirection: 'row-reverse' },
  rowNormal: { flexDirection: 'row' },
  alignStart: { alignItems: 'flex-end' },
  alignEnd: { alignItems: 'flex-start' },
  
  // Common RTL patterns
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  
  input: {
    textAlign: 'right',
  },
  
  button: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  list: {
    flexDirection: 'row-reverse',
  },
};

/**
 * Get RTL-aware value
 * @param {any} rtlValue - Value for RTL
 * @param {any} ltrValue - Value for LTR (fallback)
 * @returns {any} RTL value since app is Arabic-first
 */
export const getRTLValue = (rtlValue, ltrValue) => rtlValue;

/**
 * Check if string is Arabic/RTL script
 * @param {string} text - Text to check
 * @returns {boolean} True if RTL script
 */
export const isRTLText = (text) => {
  if (!text) return false;
  const rtlPattern = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
  return rtlPattern.test(text);
};

/**
 * Format number for RTL display
 * Numbers maintain their digit order (never reversed)
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  return new Intl.NumberFormat('ar-SA').format(num);
};

/**
 * Get localized back icon
 * @returns {string} Back arrow (points right in RTL)
 */
export const getBackIcon = () => '→';

/**
 * Get localized forward icon
 * @returns {string} Forward arrow (points left in RTL)
 */
export const getForwardIcon = () => '←';
