import 'package:flutter/material.dart';

import '../data/mock_data.dart';
import '../widgets/md3_list_card.dart';

class WholesaleScreen extends StatelessWidget {
  const WholesaleScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Text('سوق الجملة', textAlign: TextAlign.right, style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w800)),
        const SizedBox(height: 8),
        Text('توريدات ومجموعات شراء متكررة للمطاعم والفنادق والمنشآت.', textAlign: TextAlign.right, style: Theme.of(context).textTheme.bodyMedium),
        const SizedBox(height: 16),
        ...wholesaleGroups.map(
          (group) => Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: Md3ListCard(
              title: group.title,
              subtitle: group.subtitle,
              imageUrl: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=700',
              meta: 'الحالة',
              value: 'متاح الآن',
              buttonLabel: 'فتح',
              note: 'واجهة مبنية بFlutter وMaterial 3',
            ),
          ),
        ),
      ],
    );
  }
}
