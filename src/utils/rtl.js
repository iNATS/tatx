/**
 * RTL (Right-to-Left) Configuration for Tatx SA
 * Following Apple Human Interface Guidelines for RTL languages
 *
 * Arabic is the primary language - all RTL rules apply
 */

// DO NOT import I18nManager at module level - this causes Expo Go crashes
// I18nManager must only be called in App.js at the top level

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

/**
 * Apple HIG RTL Layout Helpers
 * Comprehensive utilities for consistent RTL implementation
 */

/**
 * Create RTL-aware flex row style
 * @param {boolean} reverse - If true, use normal row (for nested RTL-in-RTL)
 * @returns {object} Flex direction style
 */
export const getFlexRow = (reverse = false) => ({
  flexDirection: reverse ? 'row' : 'row-reverse',
});

/**
 * Create RTL-aware alignment style
 * @param {string} align - 'start', 'end', or 'center'
 * @returns {object} Alignment style
 */
export const getAlign = (align) => {
  const alignments = {
    start: 'flex-end',
    end: 'flex-start',
    center: 'center',
  };
  return { alignItems: alignments[align] || alignments.start };
};

/**
 * Create RTL-aware margin style
 * @param {string} side - 'start', 'end', 'horizontal', 'vertical'
 * @param {number} value - Margin value
 * @returns {object} Margin style
 */
export const getMargin = (side, value) => {
  const margins = {
    start: { marginRight: value },
    end: { marginLeft: value },
    horizontal: { marginRight: value, marginLeft: value },
    vertical: { marginTop: value, marginBottom: value },
  };
  return margins[side] || {};
};

/**
 * Create RTL-aware padding style
 * @param {string} side - 'start', 'end', 'horizontal', 'vertical'
 * @param {number} value - Padding value
 * @returns {object} Padding style
 */
export const getPadding = (side, value) => {
  const paddings = {
    start: { paddingRight: value },
    end: { paddingLeft: value },
    horizontal: { paddingRight: value, paddingLeft: value },
    vertical: { paddingTop: value, paddingBottom: value },
  };
  return paddings[side] || {};
};

/**
 * Get text alignment for RTL
 * @param {string} align - 'start', 'end', 'center', 'auto'
 * @returns {object} Text alignment style
 */
export const getTextAlign = (align = 'start') => {
  const alignments = {
    start: 'right',
    end: 'left',
    center: 'center',
    auto: 'auto',
  };
  return { textAlign: alignments[align] || alignments.start };
};

/**
 * Create writing direction style
 * @param {string} direction - 'rtl', 'ltr', 'auto'
 * @returns {object} Writing direction style
 */
export const getWritingDirection = (direction = 'rtl') => ({
  writingDirection: direction,
});

/**
 * Apple HIG: Numbers should maintain LTR digit order
 * Use this for numeric displays (timers, OTP, prices)
 */
export const numericLTR = {
  writingDirection: 'ltr',
  textAlign: 'center',
};

/**
 * Apple HIG: Header layout for RTL
 * Back button on right, title in middle, actions on left
 */
export const headerRTL = {
  flexDirection: 'row-reverse',
  alignItems: 'center',
  justifyContent: 'space-between',
};

/**
 * Apple HIG: Section header layout
 * Title on right, link/action on left
 */
export const sectionHeader = {
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  alignItems: 'center',
};

/**
 * Apple HIG: Card content layout
 * Content aligned to right (start)
 */
export const cardContent = {
  alignItems: 'flex-end',
};

/**
 * Apple HIG: Horizontal scroll for RTL
 * Start from right side
 */
export const horizontalScrollRTL = {
  flexDirection: 'row',
};

/**
 * Apple HIG: Icon + Text layout
 * Icon on right, text flows left
 */
export const iconWithText = (iconSize = 24, gap = 8) => ({
  flexDirection: 'row-reverse',
  alignItems: 'center',
  gap,
});

/**
 * Apple HIG: Input field layout
 * Label on top-right, input flows right-to-left
 */
export const inputField = {
  flexDirection: 'column',
  alignItems: 'flex-end',
};

/**
 * Apple HIG: Button with icon layout
 * Icon on right, text on left, centered
 */
export const buttonWithIcon = {
  flexDirection: 'row-reverse',
  alignItems: 'center',
  justifyContent: 'center',
};

/**
 * Apple HIG: List item layout
 * Content flows right-to-left
 */
export const listItem = {
  flexDirection: 'row-reverse',
  alignItems: 'center',
};

/**
 * Apple HIG: Navigation bar layout
 * Back on right, title center-right, actions left
 */
export const navBar = {
  flexDirection: 'row-reverse',
  alignItems: 'center',
  paddingHorizontal: 16,
  height: 44,
};

/**
 * Apple HIG: Tab bar layout
 * Items start from right
 */
export const tabBar = {
  flexDirection: 'row-reverse',
  justifyContent: 'space-around',
};

/**
 * Apple HIG: Safe area padding for RTL screens
 * @param {object} insets - Safe area insets
 * @returns {object} Padding style
 */
export const getSafeAreaPadding = (insets) => ({
  paddingTop: insets.top,
  paddingBottom: insets.bottom,
  paddingLeft: insets.left,
  paddingRight: insets.right,
});

/**
 * Apple HIG: Content container for RTL
 * Standard padding and alignment
 * @param {object} insets - Safe area insets
 * @param {number} horizontalPadding - Horizontal padding (default 16)
 * @returns {object} Container style
 */
export const getContentContainer = (insets, horizontalPadding = 16) => ({
  flex: 1,
  paddingTop: insets.top + 8,
  paddingBottom: insets.bottom + 8,
  paddingLeft: horizontalPadding,
  paddingRight: horizontalPadding,
});

/**
 * Apple HIG: Hero section layout
 * Centered content for logos, titles
 */
export const heroSection = {
  alignItems: 'center',
  textAlign: 'center',
};

/**
 * Apple HIG: Grid layout for RTL
 * Items flow right-to-left, top-to-bottom
 */
export const gridLayout = {
  flexDirection: 'row-reverse',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
};

/**
 * Apple HIG: Stack layout (vertical)
 * Items stacked with gap, aligned to right
 */
export const stackLayout = (gap = 8) => ({
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap,
});

/**
 * Apple HIG: Center layout
 * Horizontally centered content
 */
export const centerLayout = {
  alignItems: 'center',
  justifyContent: 'center',
};

/**
 * Apple HIG: Space between layout
 * Content on right, action on left
 */
export const spaceBetween = {
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  alignItems: 'center',
};
