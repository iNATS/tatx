# Quick Start Script for Tatx Platform

#!/bin/bash

# This script helps you quickly start the Tatx platform

echo "🚀 Tatx Platform - Quick Start"
echo "=============================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

echo "✅ Node.js: $(node --version)"
echo "✅ npm: $(npm --version)"
echo "✅ pnpm: $(pnpm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install
echo ""

# Generate Prisma Client (skip for now - schema needs fixes)
echo "⚠️  Skipping Prisma generation - schema needs minor fixes"
echo ""

echo "✅ Setup complete!"
echo ""
echo "📱 To run the platform:"
echo ""
echo "1. Start infrastructure (PostgreSQL, Redis):"
echo "   docker compose -f docker-compose.dev.yml up -d"
echo ""
echo "2. Fix Prisma schema relations (see FIXES.md)"
echo ""
echo "3. Generate Prisma Client:"
echo "   pnpm db:generate"
echo ""
echo "4. Run migrations:"
echo "   pnpm db:migrate"
echo ""
echo "5. Seed database:"
echo "   pnpm db:seed"
echo ""
echo "6. Start all services:"
echo "   pnpm dev:all"
echo ""
echo "Access Points:"
echo "  - Customer App: http://localhost:3100"
echo "  - Admin Dashboard: http://localhost:3103"
echo "  - Auth Service: http://localhost:3001/docs"
echo "  - Ride Service: http://localhost:3004/docs"
echo "  - Food Service: http://localhost:3005/docs"
echo ""
