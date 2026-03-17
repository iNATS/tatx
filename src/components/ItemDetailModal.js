import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';

/**
 * Item Detail Modal Component
 * Shows full item information with add to cart functionality
 */
const ItemDetailModal = ({ visible, item, onClose, onAddToCart }) => {
  const insets = useSafeAreaInsets();
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
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Handle */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Item Image */}
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              {item.discount && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{item.discount}% خصم</Text>
                </View>
              )}
            </View>

            {/* Item Info */}
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              
              {item.description && (
                <Text style={styles.itemDescription}>{item.description}</Text>
              )}

              {/* Rating and Time */}
              <View style={styles.itemMeta}>
                {item.rating && (
                  <View style={styles.metaItem}>
                    <Ionicons name="star" size={16} color={colors.warning} />
                    <Text style={styles.metaText}>{item.rating}</Text>
                  </View>
                )}
                {item.time && (
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
                    <Text style={styles.metaText}>{item.time}</Text>
                  </View>
                )}
              </View>

              {/* Price */}
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{item.price} ر.س</Text>
                {item.oldPrice && (
                  <Text style={styles.oldPrice}>{item.oldPrice} ر.س</Text>
                )}
              </View>
            </View>

            {/* Quantity Selector */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>الكمية</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity 
                  style={styles.quantityButton} 
                  onPress={handleDecrement}
                  disabled={quantity <= 1}
                >
                  <Ionicons 
                    name="remove" 
                    size={20} 
                    color={quantity <= 1 ? colors.gray : colors.white} 
                  />
                </TouchableOpacity>
                <View style={styles.quantityValue}>
                  <Text style={styles.quantityText}>{quantity}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.quantityButton} 
                  onPress={handleIncrement}
                >
                  <Ionicons name="add" size={20} color={colors.white} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Notes/Customization */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>ملاحظات (اختياري)</Text>
              <View style={styles.notesContainer}>
                {itemNotes.map((note) => (
                  <TouchableOpacity
                    key={note.id}
                    style={[
                      styles.noteItem,
                      selectedNotes.includes(note.id) && styles.noteItemSelected,
                    ]}
                    onPress={() => toggleNote(note.id)}
                  >
                    <Ionicons 
                      name={selectedNotes.includes(note.id) ? 'checkbox' : 'square-outline'} 
                      size={20} 
                      color={selectedNotes.includes(note.id) ? colors.primary : colors.textSecondary} 
                    />
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

            {/* Bottom spacing */}
            <View style={{ height: 100 }} />
          </ScrollView>

          {/* Add to Cart Button */}
          <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>المجموع</Text>
              <Text style={styles.totalPrice}>{totalPrice} ر.س</Text>
            </View>
            <TouchableOpacity 
              style={styles.addToCartButton}
              onPress={handleAddToCart}
              activeOpacity={0.8}
            >
              <Ionicons name="cart" size={22} color={colors.white} />
              <Text style={styles.addToCartText}>أضف للسلة</Text>
              <Text style={styles.addToCartQuantity}>x{quantity}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl * 1.5,
    borderTopRightRadius: borderRadius.xl * 1.5,
    maxHeight: '90%',
    position: 'relative',
    ...shadows.xl,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.gray,
    borderRadius: 2,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  itemImage: {
    width: '100%',
    height: 250,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.grayLight,
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: colors.error,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
  itemInfo: {
    marginBottom: spacing.lg,
  },
  itemName: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'right',
  },
  itemDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
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
    color: colors.text,
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  oldPrice: {
    fontSize: 16,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'right',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.md,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityValue: {
    width: 50,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  notesContainer: {
    gap: spacing.sm,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grayLight,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  noteItemSelected: {
    backgroundColor: colors.primary + '10',
  },
  noteText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  noteTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
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
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  addToCartButton: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    gap: spacing.sm,
    ...shadows.md,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  addToCartQuantity: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
});

export default ItemDetailModal;
