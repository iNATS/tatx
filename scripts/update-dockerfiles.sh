#!/bin/bash

# Script to update all Dockerfiles to skip prepare scripts

echo "🔧 Updating all service Dockerfiles..."

# List of all services
SERVICES=(
    "services/auth-service"
    "services/user-service"
    "services/driver-service"
    "services/ride-service"
    "services/food-service"
    "services/order-service"
    "services/payment-service"
    "services/notification-service"
    "services/location-service"
    "services/admin-service"
)

for service in "${SERVICES[@]}"; do
    if [ -f "$service/Dockerfile" ]; then
        echo "Updating $service/Dockerfile..."
        
        # Replace pnpm install commands to skip prepare scripts
        sed -i 's/pnpm install --prod --frozen-lockfile/pnpm install --prod --frozen-lockfile --ignore-scripts/g' "$service/Dockerfile"
        sed -i 's/pnpm install --frozen-lockfile/pnpm install --frozen-lockfile --ignore-scripts/g' "$service/Dockerfile"
        
        echo "✓ Updated $service"
    else
        echo "⚠️  $service/Dockerfile not found"
    fi
done

echo ""
echo "✅ All Dockerfiles updated!"
echo ""
echo "Now rebuild with: docker compose -f docker-compose.prod.yml build"
