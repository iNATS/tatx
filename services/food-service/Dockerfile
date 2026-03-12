FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages/database/package.json ./packages/database/
COPY packages/types/package.json ./packages/types/
COPY packages/utils/package.json ./packages/utils/
COPY packages/config/package.json ./packages/config/
COPY services/food-service/package.json ./services/food-service/
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY . .
RUN pnpm --filter @tatx/database build && pnpm --filter @tatx/types build && pnpm --filter @tatx/utils build && pnpm --filter @tatx/config build && pnpm --filter @tatx/food-service build

FROM node:20-alpine
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages/database/package.json ./packages/database/
COPY packages/types/package.json ./packages/types/
COPY packages/utils/package.json ./packages/utils/
COPY packages/config/package.json ./packages/config/
COPY services/food-service/package.json ./services/food-service/
RUN pnpm install --prod --frozen-lockfile --ignore-scripts
COPY --from=builder /app/packages/database/dist ./packages/database/dist
COPY --from=builder /app/packages/types/dist ./packages/types/dist
COPY --from=builder /app/packages/utils/dist ./packages/utils/dist
COPY --from=builder /app/services/food-service/dist ./services/food-service/dist
COPY --from=builder /app/packages/database/prisma ./packages/database/prisma
COPY --from=builder /app/packages/database/node_modules/.prisma ./packages/database/node_modules/.prisma
RUN pnpm --filter @tatx/database db:generate
WORKDIR /app/services/food-service
EXPOSE 3005
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget --no-verbose --tries=1 --spider http://localhost:3005/health || exit 1
CMD ["node", "dist/main"]
