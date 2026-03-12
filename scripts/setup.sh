#!/bin/bash

# Tatx Development Setup Script

set -e

echo "🚀 Setting up Tatx development environment..."

# Check for required tools
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed."; exit 1; }
command -v pnpm >/dev/null 2>&1 || { echo "❌ pnpm is required but not installed."; exit 1; }
command -v docker >/dev/null 2>&1 || { echo "❌ Docker is required but not installed."; exit 1; }

echo "✅ All required tools are installed"

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Copy environment files
echo "📝 Setting up environment files..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file"
fi

# Start development infrastructure
echo "🐳 Starting development infrastructure..."
docker-compose -f docker-compose.dev.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Generate Prisma client
echo "🔧 Generating Prisma client..."
pnpm db:generate

# Run database migrations
echo "🗄️  Running database migrations..."
pnpm db:migrate

# Seed database
echo "🌱 Seeding database..."
pnpm db:seed

echo ""
echo "✅ Development environment is ready!"
echo ""
echo "📱 Frontend Apps:"
echo "   Customer App:    http://localhost:3100"
echo "   Driver App:      http://localhost:3101"
echo "   Merchant App:    http://localhost:3102"
echo "   Admin Dashboard: http://localhost:3103"
echo ""
echo "🔧 Backend Services:"
echo "   Auth Service:         http://localhost:3001"
echo "   User Service:         http://localhost:3002"
echo "   Driver Service:       http://localhost:3003"
echo "   Ride Service:         http://localhost:3004"
echo "   Food Service:         http://localhost:3005"
echo "   Order Service:        http://localhost:3006"
echo "   Payment Service:      http://localhost:3007"
echo "   Notification Service: http://localhost:3008"
echo "   Location Service:     http://localhost:3009"
echo "   Admin Service:        http://localhost:3010"
echo ""
echo "📚 API Documentation:"
echo "   Each service has Swagger docs at /docs endpoint"
echo ""
echo "🎉 Run 'pnpm dev:all' to start all services and apps!"
