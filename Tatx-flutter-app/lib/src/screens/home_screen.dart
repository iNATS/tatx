import 'package:flutter/material.dart';

import '../data/mock_data.dart';
import '../models/app_models.dart';
import '../widgets/md3_list_card.dart';
import '../widgets/offer_banner_card.dart';
import '../widgets/section_header.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({
    super.key,
    required this.onOpenRestaurants,
    required this.onOpenRestaurant,
    required this.onOpenWholesale,
    required this.onOpenNotifications,
  });

  final VoidCallback onOpenRestaurants;
  final void Function(Restaurant restaurant) onOpenRestaurant;
  final VoidCallback onOpenWholesale;
  final VoidCallback onOpenNotifications;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Row(
          children: [
            IconButton(
              onPressed: onOpenNotifications,
              icon: const Icon(Icons.notifications_none_rounded),
            ),
            CircleAvatar(
              radius: 24,
              backgroundColor: theme.colorScheme.primaryContainer,
              child: Image.asset('assets/images/logo.png', width: 28),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text('أهلاً بك في Tatx', style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800)),
                  Text('تطبيق خدمات يومية بتصميم Flutter و Material 3', textAlign: TextAlign.right, style: theme.textTheme.bodySmall),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        TextField(
          textAlign: TextAlign.right,
          decoration: const InputDecoration(
            hintText: 'ابحث عن مطعم أو خدمة أو منتج',
            prefixIcon: Icon(Icons.search),
          ),
        ),
        const SizedBox(height: 16),
        const OfferBannerCard(
          title: 'خصم 30%',
          subtitle: 'على الوجبات العائلية حتى 11 مساءً',
          vendor: 'برجر السرايا',
          imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900',
        ),
        const SizedBox(height: 20),
        const SectionHeader(title: 'الخدمات'),
        const SizedBox(height: 12),
        SizedBox(
          height: 104,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            reverse: true,
            itemCount: appCategories.length,
            separatorBuilder: (_, __) => const SizedBox(width: 10),
            itemBuilder: (context, index) {
              final item = appCategories[index];
              return FilledButton.tonal(
                onPressed: item.id == 'restaurants'
                    ? onOpenRestaurants
                    : item.id == 'wholesale'
                        ? onOpenWholesale
                        : null,
                style: FilledButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(_iconData(item.icon), color: Color(item.colorHex)),
                    const SizedBox(height: 8),
                    Text(item.name),
                  ],
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 20),
        SectionHeader(title: 'مطاعم', actionLabel: 'عرض الكل', onAction: onOpenRestaurants),
        const SizedBox(height: 12),
        ...restaurants.take(3).map(
          (restaurant) => Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: Md3ListCard(
              title: restaurant.name,
              subtitle: restaurant.subtitle,
              imageUrl: restaurant.imageUrl,
              meta: 'الحد الأدنى',
              value: '${restaurant.minimumOrder.toStringAsFixed(0)} ر.س',
              note: '${restaurant.deliveryTime} • التقييم ${restaurant.rating}',
              badge: restaurant.promo,
              buttonLabel: 'المنيو',
              onTap: () => onOpenRestaurant(restaurant),
            ),
          ),
        ),
        const SizedBox(height: 12),
        SectionHeader(title: 'سوق الجملة', actionLabel: 'فتح القسم', onAction: onOpenWholesale),
        const SizedBox(height: 12),
        ...wholesaleGroups.map(
          (group) => Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: Md3ListCard(
              title: group.title,
              subtitle: group.subtitle,
              imageUrl: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=700',
              meta: 'القسم',
              value: 'نشط',
              buttonLabel: 'استعراض',
              note: 'خدمات تشغيل وشراء متكرر',
              onTap: onOpenWholesale,
            ),
          ),
        ),
      ],
    );
  }
}

IconData _iconData(String iconName) {
  switch (iconName) {
    case 'restaurant':
      return Icons.restaurant;
    case 'local_cafe':
      return Icons.local_cafe;
    case 'shopping_basket':
      return Icons.shopping_basket;
    case 'layers':
      return Icons.layers;
    case 'toys':
      return Icons.toys;
    case 'redeem':
      return Icons.redeem;
    case 'medication':
      return Icons.medication;
    default:
      return Icons.drive_eta;
  }
}
