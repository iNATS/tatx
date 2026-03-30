import 'package:flutter/material.dart';

import '../data/mock_data.dart';
import '../models/app_models.dart';
import '../widgets/md3_list_card.dart';
import '../widgets/section_header.dart';

class RestaurantsScreen extends StatelessWidget {
  const RestaurantsScreen({
    super.key,
    required this.onOpenRestaurant,
  });

  final void Function(Restaurant restaurant) onOpenRestaurant;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        const SectionHeader(title: 'كل المطاعم'),
        const SizedBox(height: 12),
        ...restaurants.map(
          (restaurant) => Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: Md3ListCard(
              title: restaurant.name,
              subtitle: restaurant.subtitle,
              imageUrl: restaurant.imageUrl,
              meta: 'رسوم التوصيل',
              value: '${restaurant.deliveryFee.toStringAsFixed(0)} ر.س',
              note: '${restaurant.deliveryTime} • التقييم ${restaurant.rating}',
              badge: restaurant.promo,
              buttonLabel: 'عرض المنيو',
              onTap: () => onOpenRestaurant(restaurant),
            ),
          ),
        ),
      ],
    );
  }
}
