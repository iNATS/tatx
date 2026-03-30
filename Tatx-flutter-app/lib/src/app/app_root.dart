import 'package:flutter/material.dart';

import '../screens/login_screen.dart';
import '../screens/onboarding_screen.dart';
import '../screens/shell_screen.dart';

class AppRoot extends StatefulWidget {
  const AppRoot({super.key});

  @override
  State<AppRoot> createState() => _AppRootState();
}

class _AppRootState extends State<AppRoot> {
  bool hasSeenOnboarding = false;
  bool isLoggedIn = false;

  @override
  Widget build(BuildContext context) {
    if (!hasSeenOnboarding) {
      return OnboardingScreen(
        onDone: () => setState(() => hasSeenOnboarding = true),
      );
    }

    if (!isLoggedIn) {
      return LoginScreen(
        onLogin: () => setState(() => isLoggedIn = true),
      );
    }

    return const AppShellScreen();
  }
}
