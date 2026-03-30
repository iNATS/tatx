import 'package:flutter/material.dart';

class OfferBannerCard extends StatelessWidget {
  const OfferBannerCard({
    super.key,
    required this.title,
    required this.subtitle,
    required this.vendor,
    required this.imageUrl,
  });

  final String title;
  final String subtitle;
  final String vendor;
  final String imageUrl;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Card(
      clipBehavior: Clip.antiAlias,
      child: Stack(
        children: [
          Image.network(imageUrl, height: 170, width: double.infinity, fit: BoxFit.cover),
          Container(
            height: 170,
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [Colors.transparent, Color(0xBF111827)],
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
                Text(vendor, style: theme.textTheme.labelLarge?.copyWith(color: Colors.white70)),
                const SizedBox(height: 4),
                Text(title, style: theme.textTheme.headlineSmall?.copyWith(color: Colors.white, fontWeight: FontWeight.w800)),
                const SizedBox(height: 4),
                Text(subtitle, textAlign: TextAlign.right, style: theme.textTheme.bodyMedium?.copyWith(color: Colors.white70)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
