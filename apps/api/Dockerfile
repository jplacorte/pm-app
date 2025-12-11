FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace files
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./

# Copy monorepo directories
COPY packages ./packages
COPY apps ./apps

# Install ALL monorepo deps
RUN pnpm install --frozen-lockfile

# 🟢 Generate prisma client INSIDE apps/api WITH deps installed
RUN DATABASE_URL="postgresql://placeholder" pnpm --filter api prisma generate

# 🟢 Build the NestJS API
RUN pnpm --filter api build


# -------------------------------------
# RUNTIME
# -------------------------------------
FROM node:20-alpine as runner

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy ONLY node_modules needed + built app
COPY --from=builder apps/api/node_modules ./node_modules
COPY --from=builder apps/api ./apps/api

CMD ["pnpm", "--filter", "api", "start"]
