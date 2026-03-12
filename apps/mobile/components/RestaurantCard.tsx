import React from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  promoted?: boolean;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress?: () => void;
}

export function RestaurantCard({ restaurant, onPress }: RestaurantCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: restaurant.image }}
          style={styles.image}
          resizeMode="cover"
        />
        {restaurant.promoted && (
          <View style={styles.promotedBadge}>
            <Text style={styles.promotedText}>Promoted</Text>
          </View>
        )}
        <View style={styles.deliveryBadge}>
          <Text style={styles.deliveryTime}>{restaurant.deliveryTime}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
        
        <View style={styles.footer}>
          <View style={styles.ratingContainer}>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.rating}>{restaurant.rating}</Text>
            <Text style={styles.reviews}>({restaurant.reviews})</Text>
          </View>
          
          {restaurant.deliveryFee === 0 ? (
            <View style={styles.freeDeliveryBadge}>
              <Text style={styles.freeDeliveryText}>Free Delivery</Text>
            </View>
          ) : (
            <Text style={styles.deliveryFee}>${restaurant.deliveryFee} delivery</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    ...Colors.Shadows.md,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  promotedBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: Colors.warning,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  promotedText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textInverse,
  },
  deliveryBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  deliveryTime: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textInverse,
  },
  content: {
    padding: 14,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  cuisine: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 14,
    marginRight: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginRight: 4,
  },
  reviews: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  freeDeliveryBadge: {
    backgroundColor: `${Colors.success}15`,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  freeDeliveryText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.success,
  },
  deliveryFee: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
});

export default RestaurantCard;
