#!/bin/bash

# Script to simplify all Dockerfiles - skip database build, just generate Prisma Client

echo "🔧 Simplifying all service Dockerfiles..."

cat > /tmp/dockerfile.template << 'EOF'
FROM node:20-alpine AS builder

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

# Copy package files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages/database/package.json ./packages/database/
COPY packages/types/package.json ./packages/types/
COPY packages/utils/package.json ./packages/utils/
COPY packages/config/package.json ./packages/config/
COPY services/SERVICE_NAME/package.json ./services/SERVICE_NAME/

# Install dependencies (skip scripts)
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy source code
COPY . .

# Generate Prisma Client (don't build database package)
WORKDIR /app/packages/database
RUN npx prisma generate

WORKDIR /app
# Build service only (skip database build)
RUN pnpm --filter @tatx/SERVICE_NAME build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

# Copy package files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages/database/package.json ./packages/database/
COPY packages/types/package.json ./packages/types/
COPY packages/utils/package.json ./packages/utils/
COPY packages/config/package.json ./packages/config/
COPY services/SERVICE_NAME/package.json ./services/SERVICE_NAME/

# Install production dependencies
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# Copy built files
COPY --from=builder /app/packages/types/dist ./packages/types/dist
COPY --from=builder /app/packages/utils/dist ./packages/utils/dist
COPY --from=builder /app/packages/config/dist ./packages/config/dist
COPY --from=builder /app/services/SERVICE_NAME/dist ./services/SERVICE_NAME/dist

# Copy Prisma schema and generated client
COPY --from=builder /app/packages/database/prisma ./packages/database/prisma
COPY --from=builder /app/packages/database/node_modules/.prisma ./packages/database/node_modules/.prisma

WORKDIR /app/services/SERVICE_NAME

EXPOSE SERVICE_PORT

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:SERVICE_PORT/health || exit 1

CMD ["node", "dist/main"]
EOF

# Services to update
declare -A services
services["auth-service"]="3001"
services["user-service"]="3002"
services["driver-service"]="3003"
services["ride-service"]="3004"
services["food-service"]="3005"
services["order-service"]="3006"
services["payment-service"]="3007"
services["notification-service"]="3008"
services["location-service"]="3009"
services["admin-service"]="3010"

for service in "${!services[@]}"; do
    port=${services[$service]}
    echo "Updating $service..."
    
    # Replace SERVICE_NAME and SERVICE_PORT in template
    sed "s/SERVICE_NAME/$service/g; s/SERVICE_PORT/$port/g" /tmp/dockerfile.template > "services/$service/Dockerfile"
    
    echo "✓ Updated $service"
done

echo ""
echo "✅ All Dockerfiles simplified!"
echo ""
echo "Now the Docker build will:"
echo "1. Install dependencies"
echo "2. Generate Prisma Client (no build)"
echo "3. Build only the service (not database)"
echo "4. Copy to production image"
echo ""
echo "Commit and push to redeploy!"
