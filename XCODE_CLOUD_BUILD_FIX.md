# Xcode Cloud Build Configuration Fix
# 
# This file explains how to fix the Xcode Cloud build error for this Expo project.

## The Error

```
xcodebuild: error: '/Volumes/workspace/repository/ios/TatxSA.xcworkspace' does not exist.
```

## Root Cause

This is an **Expo project** that uses the managed workflow. The `ios/` folder is:
- Generated dynamically using `npx expo prebuild`
- Not committed to git (it's in .gitignore)
- Xcode Cloud expects a native iOS workspace that doesn't exist

## ✅ Solution: Use EAS Build Instead

### Why EAS Build?

Expo projects are designed to use **EAS Build**, not Xcode Cloud. EAS Build:
- Handles the prebuild process automatically
- Doesn't require committing the `ios/` folder
- Manages code signing automatically
- Works with Expo's managed workflow

### Steps to Use EAS Build

1. **Install EAS CLI** (if not already installed):
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**:
   ```bash
   eas login
   ```

3. **Build for iOS**:
   ```bash
   eas build --platform ios --profile production
   ```

4. **Submit to App Store**:
   ```bash
   eas submit --platform ios
   ```

### GitHub Actions Workflow (Optional)

If you want automated builds, create `.github/workflows/build.yml`:

```yaml
name: Build iOS
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: npm ci
      - run: eas build --platform ios --profile production --non-interactive
```

## ⚠️ Option 2: Fix Xcode Cloud (If Required)

If you MUST use Xcode Cloud, you need to:

### Step 1: Generate iOS Project Locally

On a Mac with proper UTF-8 encoding:

```bash
# Set UTF-8 encoding
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# Generate iOS project
cd /Users/aref/Desktop/tatx/tatx-app
npx expo prebuild --platform ios --clean

# Install pods
cd ios
pod install --repo-update
cd ..
```

### Step 2: Update .gitignore

Edit `.gitignore` to allow iOS files:

```
# Comment out or remove these lines:
# /ios
# /android

# Keep these ignored:
ios/Pods/
ios/build/
ios/.xcode.env.local
```

### Step 3: Commit iOS Files

```bash
git add ios/
git commit -m "Add iOS project for Xcode Cloud builds"
git push origin expo
```

### Step 4: Configure Xcode Cloud

In App Store Connect:
1. Select your app (Tatx SA, ASC ID: 6749879383)
2. Go to "App Store" tab
3. Click "Connect to Xcode Cloud"
4. Select repository and `expo` branch
5. Choose scheme: `TatxSA`
6. Save configuration

### Step 5: Create Xcode Cloud Post-Clone Script

Create `ios/xcode-cloud-post-clone.sh`:

```bash
#!/bin/bash
set -xe

cd "${CI_WORKSPACE}/ios"

# Install CocoaPods dependencies
pod install --repo-update

cd "${CI_WORKSPACE}"
```

Make it executable:
```bash
chmod +x ios/xcode-cloud-post-clone.sh
```

### Step 6: Update Xcode Cloud Build Plan

In Xcode Cloud build plan settings:
1. Go to "Build" action
2. Under "Post-clone script", select the script you created
3. Save and trigger a new build

## 🔧 Fix CocoaPods Encoding Error

If you see this error:
```
Unicode Normalization not appropriate for ASCII-8BIT
```

Fix it by adding to `~/.zprofile` or `~/.bash_profile`:

```bash
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
```

Then reload your shell:
```bash
source ~/.zprofile
```

Verify:
```bash
echo $LANG  # Should output: en_US.UTF-8
pod --version  # Should work without errors
```

## 📊 Comparison

| Aspect | EAS Build | Xcode Cloud |
|--------|-----------|-------------|
| Setup Time | 5 minutes | 1+ hour |
| iOS Folder | Not needed | Required |
| CocoaPods | Not needed | Required |
| Code Signing | Automatic | Manual |
| Git Repo Size | Small | +500MB |
| Expo Support | Native | Requires workarounds |
| **Recommended** | ✅ **YES** | ❌ No |

## ✅ Recommended Action

**Switch to EAS Build** for this Expo project:

1. Cancel the Xcode Cloud build
2. Install EAS CLI: `npm install -g eas-cli`
3. Login: `eas login`
4. Build: `eas build --platform ios --profile production`
5. Submit: `eas submit --platform ios`

This will work without any iOS workspace files and is the recommended approach for Expo projects.

## 📝 Your Project Info

- **App Name**: Tatx SA
- **Bundle ID**: com.tatx.app
- **App Store Connect ID**: 6749879383
- **Team ID**: 3P2Y6F66EF
- **Current Branch**: expo

## 🔗 Resources

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Expo Prebuild](https://docs.expo.dev/workflow/prebuild/)
- [Xcode Cloud for Expo](https://docs.expo.dev/build-reference/xcode-cloud/)
- [EAS Submit](https://docs.expo.dev/submit/introduction/)
