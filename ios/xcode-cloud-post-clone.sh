#!/bin/bash
# Xcode Cloud Post-Clone Script
# This script runs after Xcode Cloud clones the repository

set -e

echo "🔧 Setting up iOS build environment..."

# Navigate to iOS directory
cd "${CI_WORKSPACE}/ios"

# Set UTF-8 encoding for CocoaPods
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

echo "📦 Installing CocoaPods dependencies..."

# Install CocoaPods dependencies
pod install --repo-update --verbose

echo "✅ CocoaPods installation complete!"

# Navigate back to workspace root
cd "${CI_WORKSPACE}"

echo "🎉 iOS setup complete!"
