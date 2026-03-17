import * as Font from 'expo-font';
import { Platform } from 'react-native';

export const fontFilesMap = {
  Cairo_400Regular: require('../../assets/fonts/Cairo-Regular.ttf'),
  Cairo_600SemiBold: require('../../assets/fonts/Cairo-SemiBold.ttf'),
  Cairo_700Bold: require('../../assets/fonts/Cairo-Bold.ttf'),
};

export const loadFonts = async () => {
  // On web, fonts are loaded via CSS (injected dynamically)
  if (Platform.OS === 'web') {
    // Inject Google Fonts CSS if not already present
    if (typeof document !== 'undefined' && !document.getElementById('cairo-fonts')) {
      const link = document.createElement('link');
      link.id = 'cairo-fonts';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap';
      document.head.appendChild(link);
    }
    // Wait for fonts to load
    if (typeof document !== 'undefined' && document.fonts) {
      await document.fonts.ready;
    }
    return;
  }

  // On native platforms, load fonts using expo-font
  try {
    await Font.loadAsync(fontFilesMap);
  } catch (error) {
    console.warn('Font loading error (using system fonts):', error.message);
    // Continue even if fonts fail to load - system fonts will be used
  }
};
