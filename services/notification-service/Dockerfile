FROM node:20-alpine AS builder
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

# Copy root package files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./

# Copy package.json files for all dependencies
COPY packages/database/package.json ./packages/database/
COPY packages/types/package.json ./packages/types/
COPY packages/utils/package.json ./packages/utils/
COPY packages/config/package.json ./packages/config/
COPY services/notification-service/package.json ./services/notification-service/

# Install dependencies (skip prepare scripts)
RUN pnpm install --frozen-lockfile --ignore-scripts --ignore-scripts

# Copy source code
COPY . .

# Build all dependencies
RUN pnpm --filter @tatx/database build && \
    pnpm --filter @tatx/types build && \
    pnpm --filter @tatx/utils build && \
    pnpm --filter @tatx/config build && \
    pnpm --filter @tatx/notification-service build

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

# Install production dependencies only (skip prepare scripts)
RUN pnpm install --prod --frozen-lockfile --ignore-scripts --ignore-scripts

# Copy built files from builder
COPY --from=builder /app/packages/database/dist ./packages/database/dist
COPY --from=builder /app/packages/types/dist ./packages/types/dist
COPY --from=builder /app/packages/utils/dist ./packages/utils/dist
COPY --from=builder /app/services/notification-service/dist ./services/notification-service/dist

# Copy Prisma schema and generated client
COPY --from=builder /app/packages/database/prisma ./packages/database/prisma
COPY --from=builder /app/packages/database/node_modules/.prisma ./packages/database/node_modules/.prisma

# Generate Prisma Client
WORKDIR /app/packages/database
RUN npx prisma generate

WORKDIR /app/services/notification-service

# Expose port
EXPOSE 3008

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3008/health || exit 1

# Start service
CMD ["node", "dist/main"]
