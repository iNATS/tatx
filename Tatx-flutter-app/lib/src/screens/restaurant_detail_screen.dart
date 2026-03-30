import 'package:flutter/material.dart';

import '../models/app_models.dart';
import '../widgets/md3_list_card.dart';

class RestaurantDetailScreen extends StatelessWidget {
  const RestaurantDetailScreen({
    super.key,
    required this.restaurant,
    required this.onAddToCart,
  });

  final Restaurant restaurant;
  final void Function(MenuItem item) onAddToCart;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(title: Text(restaurant.name)),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            clipBehavior: Clip.antiAlias,
            child: Stack(
              children: [
                Image.network(restaurant.imageUrl, height: 220, width: double.infinity, fit: BoxFit.cover),
                Container(
                  height: 220,
                  decoration: const BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [Colors.transparent, Color(0xCC111827)],
                    ),
                  ),
                ),
                Positioned(
                  right: 16,
                  left: 16,
                  bottom: 16,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(restaurant.name, style: theme.textTheme.headlineSmall?.copyWith(color: Colors.white, fontWeight: FontWeight.w800)),
                      const SizedBox(height: 4),
                      Text(
                        '${restaurant.subtitle} • ${restaurant.deliveryTime} • ${restaurant.deliveryFee.toStringAsFixed(0)} ر.س',
                        textAlign: TextAlign.right,
                        style: theme.textTheme.bodyMedium?.copyWith(color: Colors.white70),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          ...restaurant.groups.map(
            (group) => Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Padding(
                  padding: const EdgeInsets.only(bottom: 10, top: 6),
                  child: Text(group.title, style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800)),
                ),
                ...group.items.map(
                  (item) => Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: Md3ListCard(
                      title: item.name,
                      subtitle: item.description,
                      imageUrl: item.imageUrl,
                      meta: 'السعر',
                      value: '${item.price.toStringAsFixed(0)} ر.س',
                      note: item.time,
                      badge: item.tag,
                      buttonLabel: 'إضافة',
                      onTap: () => onAddToCart(item),
                      onButtonTap: () => onAddToCart(item),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
