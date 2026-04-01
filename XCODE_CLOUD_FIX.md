# Xcode Cloud Build Fix - Tatx SA

## Problem
Xcode Cloud is trying to build a native iOS workspace that doesn't exist because this is an **Expo project** that should use **EAS Build** instead.

## ✅ Solution: Use EAS Build for Expo Projects

### Option 1: EAS Build (Recommended for Expo)

Since this is an Expo project, use EAS Build instead of Xcode Cloud:

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to your Expo account
eas login

# Configure EAS Build for the project
eas build:configure

# Build for iOS (Production)
eas build --platform ios --profile production

# Build for iOS (Preview/TestFlight)
eas build --platform ios --profile preview

# Submit to App Store Connect
eas submit --platform ios
```

### Option 2: Generate Native iOS Project (If You Must Use Xcode Cloud)

If you need to use Xcode Cloud specifically, you must generate the native iOS project:

```bash
# Generate native iOS project
npx expo prebuild --platform ios --clean

# This creates the ios/ folder with:
# - TatxSA.xcworkspace
# - Podfile
# - Native iOS code
```

Then commit the generated files:
```bash
git add ios/
git commit -m "Add native iOS project for Xcode Cloud"
git push origin expo
```

## 📝 EAS.json Configuration

The current `eas.json` is configured for EAS Build:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

## 🚀 Recommended CI/CD Flow for Expo

### Using GitHub Actions with EAS Build

Create `.github/workflows/ios-build.yml`:

```yaml
name: iOS Build

on:
  push:
    branches: [ main, expo ]

jobs:
  build:
    name: Build iOS
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Setup EAS
        uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: Install dependencies
        run: npm ci

      - name: Build iOS
        run: eas build --platform ios --profile production --non-interactive

      - name: Submit to App Store
        run: eas submit --platform ios --non-interactive
```

## 🔧 Fix Xcode Cloud Configuration (If Required)

If you must use Xcode Cloud, create these files:

### 1. Create `ios/Podfile`

```ruby
require_relative '../node_modules/react-native/scripts/react_native_pods'
require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'

platform :ios, '15.1'
prepare_react_native_project!

target 'TatxSA' do
  config = use_native_modules!
  use_react_native!(
    :path => config[:reactNativePath],
    :app_path => "#{Pod::Config.instance.installation_root}/.."
  )
end

post_install do |installer|
  react_native_post_install(
    installer,
    config[:reactNativePath],
    :mac_catalyst_enabled => false
  )
end
```

### 2. Create `ios/TatxSA.xcworkspace`

This is auto-generated when you run:
```bash
cd ios
pod install
```

### 3. Update `app.json` for Native Builds

```json
{
  "expo": {
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.tatx.app",
      "buildNumber": "1.1.0",
      "infoPlist": {
        "ITSAppUsesNonExemptEncryption": false
      }
    }
  }
}
```

## ⚠️ Important Notes

1. **Expo Projects Should Use EAS Build**: Xcode Cloud is designed for native iOS projects. Expo projects work best with EAS Build.

2. **Generated iOS Folder**: The `ios/` folder is typically git-ignored in Expo projects because it's generated. If using Xcode Cloud, you need to commit it.

3. **Prebuild Required**: Running `npx expo prebuild` generates native iOS code from your Expo config.

4. **App Store Connect**: Your App Store Connect ID is `6749879383` (from eas.json).

## 📋 Quick Fix Steps

### For EAS Build (Recommended):
```bash
# 1. Install EAS CLI
npm install -g eas-cli

# 2. Login
eas login

# 3. Build
eas build --platform ios --profile production

# 4. Submit
eas submit --platform ios
```

### For Xcode Cloud:
```bash
# 1. Generate native iOS project
npx expo prebuild --platform ios --clean

# 2. Install pods
cd ios && pod install && cd ..

# 3. Commit generated files
git add ios/
git commit -m "Add iOS project for Xcode Cloud"
git push origin expo
```

## 🔗 Resources

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Expo Prebuild](https://docs.expo.dev/workflow/prebuild/)
- [Xcode Cloud for Expo](https://docs.expo.dev/build-reference/xcode-cloud/)
- [EAS Submit](https://docs.expo.dev/submit/introduction/)

## Summary

**Best Practice**: Use **EAS Build** for Expo projects, not Xcode Cloud.

**If You Must Use Xcode Cloud**: 
1. Run `npx expo prebuild --platform ios --clean`
2. Run `cd ios && pod install`
3. Commit the `ios/` folder
4. Configure Xcode Cloud to use the generated workspace
