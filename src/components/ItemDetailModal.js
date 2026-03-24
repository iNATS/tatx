import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';
import ModalSheet from './ModalSheet';
import PriceDisplay from './PriceDisplay';

/**
 * Apple HIG Compliant Item Detail Modal
 * 
 * Features:
 * - Sheet presentation with drag-to-dismiss
 * - Large hero image
 * - Clear typography hierarchy
 * - Quantity selector
 * - Customization options
 * - Prominent add to cart button
 */
const ItemDetailModal = ({ visible, item, onClose, onAddToCart }) => {
  const insets = useSafeAreaInsets();
  const { formatCurrency } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedNotes, setSelectedNotes] = useState([]);

  if (!item) return null;

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const totalPrice = (item.price * quantity).toFixed(2);

  const itemNotes = [
    { id: '1', text: 'بدون بصل' },
    { id: '2', text: 'بدون طماطم' },
    { id: '3', text: 'زيادة صوص' },
    { id: '4', text: 'حار' },
  ];

  const toggleNote = (noteId) => {
    setSelectedNotes(prev => 
      prev.includes(noteId) 
        ? prev.filter(id => id !== noteId)
        : [...prev, noteId]
    );
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...item,
      quantity,
      notes: selectedNotes,
    });
    onClose();
    setQuantity(1);
    setSelectedNotes([]);
  };

  return (
    <ModalSheet
      visible={visible}
      onClose={onClose}
      height="95%"
      showHandle={true}
      showCloseButton={true}
    >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          {item.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{item.discount}% خصم</Text>
            </View>
          )}
          <TouchableOpacity style={styles.wishlistButton} activeOpacity={0.8} onPress={() => Alert.alert('المفضلة', 'تم حفظ العنصر في المفضلة.')}>
            <Ionicons name="heart-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Item Info */}
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          
          {item.description && (
            <Text style={styles.itemDescription}>{item.description}</Text>
          )}

          {/* Rating & Time */}
          <View style={styles.itemMeta}>
            {item.rating && (
              <View style={styles.metaItem}>
                <Ionicons name="star" size={18} color={colors.warning} />
                <Text style={styles.metaText}>{item.rating}</Text>
              </View>
            )}
            {item.time && (
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={18} color={colors.textSecondary} />
                <Text style={styles.metaText}>{item.time}</Text>
              </View>
            )}
            {item.deliveryFee && (
              <View style={styles.metaItem}>
                <Ionicons name="bicycle-outline" size={18} color={colors.textSecondary} />
                <Text style={styles.metaText}>{formatCurrency(item.deliveryFee)}</Text>
              </View>
            )}
          </View>

          {/* Price */}
          <View style={styles.priceContainer}>
            <PriceDisplay value={item.price} color={colors.primary} size={28} iconSize={20} bold />
            {item.oldPrice && <PriceDisplay value={item.oldPrice} muted strike size={18} iconSize={14} />}
          </View>
        </View>

        {/* Quantity Selector */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>الكمية</Text>
            <Text style={styles.sectionSubtitle}>اختر الكمية المطلوبة</Text>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]} 
              onPress={handleDecrement}
              disabled={quantity <= 1}
              activeOpacity={0.7}
            >
              <Ionicons 
                name="remove" 
                size={24} 
                color={quantity <= 1 ? colors.textTertiary : colors.white} 
              />
            </TouchableOpacity>
            <View style={styles.quantityValue}>
              <Text style={styles.quantityText}>{quantity}</Text>
            </View>
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={handleIncrement}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Notes/Customization */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>تخصيص الطلب</Text>
            <Text style={styles.sectionSubtitle}>اختر الإضافات أو الملاحظات</Text>
          </View>
          <View style={styles.notesContainer}>
            {itemNotes.map((note) => (
              <TouchableOpacity
                key={note.id}
                style={[
                  styles.noteItem,
                  selectedNotes.includes(note.id) && styles.noteItemSelected,
                ]}
                onPress={() => toggleNote(note.id)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.checkbox,
                  selectedNotes.includes(note.id) && styles.checkboxSelected,
                ]}>
                  {selectedNotes.includes(note.id) && (
                    <Ionicons name="checkmark" size={16} color={colors.white} />
                  )}
                </View>
                <Text style={[
                  styles.noteText,
                  selectedNotes.includes(note.id) && styles.noteTextSelected,
                ]}>
                  {note.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom spacing for button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>المجموع</Text>
          <PriceDisplay value={totalPrice} color={colors.text} size={20} iconSize={16} bold align="row-reverse" />
        </View>
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <LinearGradient colors={colors.primaryGradient} style={styles.addToCartGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <View style={styles.addToCartMain}>
              <Ionicons name="bag-add-outline" size={22} color={colors.white} />
              <View>
                <Text style={styles.addToCartText}>إضافة للسلة</Text>
                <Text style={styles.addToCartSubtext}>سريعة مع التخصيص</Text>
              </View>
            </View>
            <View style={styles.quantityBadge}>
              <Text style={styles.quantityBadgeText}>x{quantity}</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ModalSheet>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  itemImage: {
    width: '100%',
    height: 280,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.grayLight,
    ...shadows.md,
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: colors.error,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    ...shadows.md,
  },
  discountText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.white,
  },
  wishlistButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  itemInfo: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  itemName: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'right',
  },
  itemDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 24,
    textAlign: 'right',
    marginBottom: spacing.md,
  },
  itemMeta: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  priceContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: spacing.md,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'right',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'right',
    marginTop: 2,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.md,
  },
  quantityButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  quantityButtonDisabled: {
    backgroundColor: colors.grayLight,
  },
  quantityValue: {
    width: 60,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.cardSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  notesContainer: {
    gap: spacing.sm,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardSecondary,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.md,
  },
  noteItemSelected: {
    backgroundColor: colors.primary + '10',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  noteText: {
    flex: 1,
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  noteTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.md,
  },
  totalContainer: {
    flex: 1,
    paddingRight: spacing.md,
  },
  totalLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 2,
    textAlign: 'right',
  },
  addToCartButton: {
    flex: 1.5,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  addToCartGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  addToCartMain: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: spacing.sm,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'right',
  },
  addToCartSubtext: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.78)',
    marginTop: 2,
    textAlign: 'right',
  },
  quantityBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  quantityBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
});

export default ItemDetailModal;
