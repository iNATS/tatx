#!/bin/bash

# Tatx Production Build Script

set -e

echo "🏗️  Building Tatx for production..."

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Generate Prisma client
echo "🔧 Generating Prisma client..."
pnpm db:generate

# Build all packages
echo "📦 Building packages..."
pnpm build

# Build Docker images
echo "🐳 Building Docker images..."
docker-compose build

echo ""
echo "✅ Production build completed!"
echo ""
echo "📝 To deploy, run:"
echo "   docker-compose up -d"
