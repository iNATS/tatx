FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages/types/package.json ./packages/types/
COPY packages/ui/package.json ./packages/ui/
COPY packages/utils/package.json ./packages/utils/
COPY packages/config/package.json ./packages/config/
COPY apps/admin-dashboard/package.json ./apps/admin-dashboard/
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm --filter @tatx/types build && pnpm --filter @tatx/utils build && pnpm --filter @tatx/ui build && pnpm --filter @tatx/admin-dashboard build

FROM node:20-alpine
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages/types/package.json ./packages/types/
COPY packages/ui/package.json ./packages/ui/
COPY packages/utils/package.json ./packages/utils/
COPY packages/config/package.json ./packages/config/
COPY apps/admin-dashboard/package.json ./apps/admin-dashboard/
RUN pnpm install --prod --frozen-lockfile --ignore-scripts
COPY --from=builder /app/packages/types/dist ./packages/types/dist
COPY --from=builder /app/packages/utils/dist ./packages/utils/dist
COPY --from=builder /app/packages/ui/dist ./packages/ui/dist
COPY --from=builder /app/apps/admin-dashboard/.next ./apps/admin-dashboard/.next
WORKDIR /app/apps/admin-dashboard
EXPOSE 3103
CMD ["pnpm", "start"]
