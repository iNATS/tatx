FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages/types/package.json ./packages/types/
COPY packages/ui/package.json ./packages/ui/
COPY packages/utils/package.json ./packages/utils/
COPY packages/config/package.json ./packages/config/
COPY apps/customer-app/package.json ./apps/customer-app/

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm --filter @tatx/types build
RUN pnpm --filter @tatx/utils build
RUN pnpm --filter @tatx/ui build
RUN pnpm --filter @tatx/config build
RUN pnpm --filter @tatx/customer-app build

FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages/types/package.json ./packages/types/
COPY packages/ui/package.json ./packages/ui/
COPY packages/utils/package.json ./packages/utils/
COPY packages/config/package.json ./packages/config/
COPY apps/customer-app/package.json ./apps/customer-app/

RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# Create necessary directories if they don't exist
RUN mkdir -p ./packages/types/dist ./packages/utils/dist ./packages/ui/dist ./apps/customer-app/public

COPY --from=builder /app/packages/types/dist ./packages/types/dist
COPY --from=builder /app/packages/utils/dist ./packages/utils/dist
COPY --from=builder /app/packages/ui/dist ./packages/ui/dist
COPY --from=builder /app/apps/customer-app/.next ./apps/customer-app/.next
COPY --from=builder /app/apps/customer-app/public ./apps/customer-app/public

WORKDIR /app/apps/customer-app

EXPOSE 3100

CMD ["pnpm", "start"]
