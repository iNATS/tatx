import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Apple HIG Compliant Modal Component
 * 
 * Features:
 * - Sheet presentation with drag-to-dismiss
 * - Blur backdrop (iOS)
 * - Proper safe area handling
 * - Smooth animations
 * - Accessible
 */
const ModalSheet = ({
  visible,
  onClose,
  children,
  height = '90%',
  showHandle = true,
  showCloseButton = false,
  title,
  subtitle,
  headerActions,
}) => {
  const insets = useSafeAreaInsets();
  const { rowDirection, textAlignStart } = useApp();
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const panY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      closeModal();
    }
  }, [visible]);

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > SCREEN_HEIGHT * 0.3) {
          closeModal();
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const combinedY = Animated.add(slideAnim, panY).interpolate({
    inputRange: [0, SCREEN_HEIGHT],
    outputRange: [0, SCREEN_HEIGHT],
    extrapolate: 'clamp',
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={closeModal}
      statusBarTranslucent
    >
      {/* Backdrop */}
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: backdropAnim,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backdropTouchable}
          activeOpacity={1}
          onPress={closeModal}
        />
      </Animated.View>

      {/* Sheet */}
      <Animated.View
        style={[
          styles.sheetContainer,
          {
            transform: [{ translateY: combinedY }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View
          style={[
            styles.sheet,
            {
              height: height === 'auto' ? 'auto' : typeof height === 'string' ? height : SCREEN_HEIGHT * height,
              paddingBottom: Math.max(insets.bottom, spacing.md),
            },
          ]}
        >
          {/* Handle */}
          {showHandle && (
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>
          )}

          {/* Header */}
          {(title || showCloseButton || headerActions) && (
            <View style={[styles.header, { flexDirection: rowDirection }]}>
              <View style={[styles.headerSide, rowDirection === 'row-reverse' ? styles.headerSideStart : styles.headerSideEnd]}>
                {headerActions?.left}
              </View>
              
              {(title || subtitle) && (
                <View style={styles.headerCenter}>
                  {title && <Text style={[styles.title, { textAlign: textAlignStart }]}>{title}</Text>}
                  {subtitle && <Text style={[styles.subtitle, { textAlign: textAlignStart }]}>{subtitle}</Text>}
                </View>
              )}
              
              <View style={[styles.headerSide, rowDirection === 'row-reverse' ? styles.headerSideEnd : styles.headerSideStart]}>
                {headerActions?.right}
                {showCloseButton && (
                  <TouchableOpacity
                    onPress={closeModal}
                    style={styles.closeButton}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="close" size={24} color={colors.text} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}

          {/* Content */}
          <View style={styles.content}>
            {children}
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
  backdropTouchable: {
    flex: 1,
  },
  sheetContainer: {
    ...StyleSheet.absoluteFillObject,
    top: null,
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.card,
    borderTopLeftRadius: borderRadius.xl * 1.5,
    borderTopRightRadius: borderRadius.xl * 1.5,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.borderLight,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  handle: {
    width: 36,
    height: 5,
    backgroundColor: colors.gray,
    borderRadius: 2.5,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  headerSide: {
    width: 40,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'stretch',
  },
  headerSideStart: {
    alignItems: 'flex-start',
  },
  headerSideEnd: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.cardSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
});

export default ModalSheet;
