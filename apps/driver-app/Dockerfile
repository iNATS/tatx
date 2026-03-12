FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages/types/package.json ./packages/types/
COPY packages/ui/package.json ./packages/ui/
COPY packages/utils/package.json ./packages/utils/
COPY packages/config/package.json ./packages/config/
COPY apps/driver-app/package.json ./apps/driver-app/
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm --filter @tatx/types build && pnpm --filter @tatx/utils build && pnpm --filter @tatx/ui build && pnpm --filter @tatx/driver-app build

FROM node:20-alpine
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages/types/package.json ./packages/types/
COPY packages/ui/package.json ./packages/ui/
COPY packages/utils/package.json ./packages/utils/
COPY packages/config/package.json ./packages/config/
COPY apps/driver-app/package.json ./apps/driver-app/
RUN pnpm install --prod --frozen-lockfile
COPY --from=builder /app/packages/types/dist ./packages/types/dist
COPY --from=builder /app/packages/utils/dist ./packages/utils/dist
COPY --from=builder /app/packages/ui/dist ./packages/ui/dist
COPY --from=builder /app/apps/driver-app/.next ./apps/driver-app/.next
WORKDIR /app/apps/driver-app
EXPOSE 3101
CMD ["pnpm", "start"]
