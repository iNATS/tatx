# Tatx SA - iOS Build Guide

## ⚠️ Important: Use EAS Build for Expo Projects

This is an **Expo project**, which means **EAS Build** is the recommended way to build for iOS, NOT Xcode Cloud.

---

## ✅ Option 1: EAS Build (Recommended)

### Step 1: Install EAS CLI
```bash
npm install -g eas-cli
```

### Step 2: Login to Expo
```bash
eas login
```

### Step 3: Configure EAS Build (if not already configured)
```bash
eas build:configure
```

### Step 4: Build for iOS
```bash
# Production build (App Store)
eas build --platform ios --profile production

# Preview build (TestFlight)
eas build --platform ios --profile preview

# Development build
eas build --platform ios --profile development
```

### Step 5: Submit to App Store
```bash
eas submit --platform ios
```

### Why EAS Build?
- ✅ No need for native iOS code
- ✅ No CocoaPods issues
- ✅ No Xcode workspace needed
- ✅ Automatic code signing
- ✅ Works with Expo's managed workflow
- ✅ Your `ios/` folder can stay git-ignored

---

## ⚠️ Option 2: Xcode Cloud (Not Recommended for Expo)

If you MUST use Xcode Cloud, follow these steps:

### Step 1: Generate Native iOS Project
```bash
# Generate iOS native code
npx expo prebuild --platform ios --clean
```

### Step 2: Install CocoaPods
```bash
cd ios
pod install
cd ..
```

### Step 3: Update .gitignore
Remove or comment out the `/ios` line in `.gitignore`:
```
# /ios  # Commented out to allow iOS tracking
```

### Step 4: Commit iOS Files
```bash
git add ios/
git commit -m "Add iOS project for Xcode Cloud"
git push origin expo
```

### Step 5: Configure Xcode Cloud
1. Go to App Store Connect
2. Select your app
3. Go to "App Store" tab
4. Click "Connect to Xcode Cloud"
5. Select the `expo` branch
6. Choose the `TatxSA` scheme

### ⚠️ Issues with Xcode Cloud for Expo

1. **CocoaPods Encoding Error**: Your system has a Ruby/CocoaPods encoding issue that prevents `pod install` from running properly.

2. **Generated Code**: The `ios/` folder is generated code that changes with Expo SDK updates.

3. **Merge Conflicts**: Committing `ios/` can cause merge conflicts when multiple developers work on the project.

4. **Large Repository**: The `ios/` folder adds ~500MB to your git repository.

---

## 🔧 Fix CocoaPods Encoding Issue (If Using Xcode Cloud)

If you encounter the encoding error:
```
Unicode Normalization not appropriate for ASCII-8BIT
```

Fix it by setting UTF-8 encoding:

### Add to ~/.zprofile or ~/.bash_profile:
```bash
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
```

### Then reload your shell:
```bash
source ~/.zprofile  # or source ~/.bash_profile
```

### Verify encoding:
```bash
echo $LANG
# Should output: en_US.UTF-8

pod --version
# Should work without errors
```

### Then retry pod install:
```bash
cd ios
pod install --repo-update
```

---

## 📊 Comparison: EAS Build vs Xcode Cloud

| Feature | EAS Build | Xcode Cloud |
|---------|-----------|-------------|
| **Expo Support** | ✅ Native | ⚠️ Requires prebuild |
| **Setup Time** | 5 minutes | 30+ minutes |
| **Repository Size** | Small | +500MB |
| **CocoaPods** | Not needed | Required |
| **Code Signing** | Automatic | Manual setup |
| **Cost** | Free tier available | Included in Apple Dev |
| **Build Speed** | Fast | Fast |
| **Recommended for Expo** | ✅ YES | ❌ NO |

---

## 🚀 Quick Start with EAS Build

```bash
# 1. Install EAS CLI
npm install -g eas-cli

# 2. Login
eas login

# 3. Build for production
eas build --platform ios --profile production

# 4. Wait for build to complete (check status)
eas build:list

# 5. Submit to App Store
eas submit --platform ios
```

---

## 📝 Your Current Configuration

### eas.json
```json
{
  "build": {
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {
      "ios": {
        "ascAppId": "6749879383"
      }
    }
  }
}
```

### app.json (iOS settings)
```json
{
  "expo": {
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.tatx.app"
    }
  }
}
```

---

## ✅ Recommendation

**Use EAS Build** for this Expo project. It's:
- Easier to set up
- Better maintained for Expo
- No CocoaPods issues
- No encoding problems
- Automatic code signing
- Smaller git repository

**Only use Xcode Cloud if:**
- You have specific enterprise requirements
- You need custom native modules not supported by EAS
- Your organization requires Xcode Cloud

---

## 🔗 Resources

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [EAS Submit Documentation](https://docs.expo.dev/submit/introduction/)
- [Expo Prebuild Documentation](https://docs.expo.dev/workflow/prebuild/)
- [Xcode Cloud for Expo](https://docs.expo.dev/build-reference/xcode-cloud/)

---

## Summary

**For Expo projects, use EAS Build, not Xcode Cloud.**

Command to build:
```bash
eas build --platform ios --profile production
```

This will create an iOS build without needing the `ios/` folder or dealing with CocoaPods issues.
