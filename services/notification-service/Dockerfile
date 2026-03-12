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
COPY services/notification-service/package.json ./services/notification-service/

# Install dependencies (skip scripts)
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy source code
COPY . .

# Generate Prisma Client (don't build database package)
WORKDIR /app/packages/database
RUN npx prisma generate

WORKDIR /app
# Build service only (skip database build)
RUN pnpm --filter @tatx/notification-service build

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
COPY services/notification-service/package.json ./services/notification-service/

# Install production dependencies
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# Copy built files
COPY --from=builder /app/packages/types/dist ./packages/types/dist
COPY --from=builder /app/packages/utils/dist ./packages/utils/dist
COPY --from=builder /app/packages/config/dist ./packages/config/dist
COPY --from=builder /app/services/notification-service/dist ./services/notification-service/dist

# Copy Prisma schema and generated client
COPY --from=builder /app/packages/database/prisma ./packages/database/prisma
COPY --from=builder /app/packages/database/node_modules/.prisma ./packages/database/node_modules/.prisma

WORKDIR /app/services/notification-service

EXPOSE 3008

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3008/health || exit 1

CMD ["node", "dist/main"]
