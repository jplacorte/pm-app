# -------------------------------------
# BUILDER
# -------------------------------------
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace files
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./

# Copy all monorepo sources
COPY apps ./apps
COPY packages ./packages

# Install ALL monorepo deps (dev + prod)
RUN pnpm install --frozen-lockfile

# 🟢 Generate Prisma Client INSIDE apps/api
RUN DATABASE_URL="postgresql://placeholder" \
    pnpm --filter api prisma generate

# 🟢 Build the NestJS API
RUN pnpm --filter api build


# -------------------------------------
# RUNTIME
# -------------------------------------
FROM node:20-alpine AS runner


RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy node_modules including prisma client + engines
COPY --from=builder apps/node_modules ./node_modules

# Copy only API package
COPY --from=builder apps/api ./apps/api

USER node

CMD ["pnpm", "--filter", "api", "start"]
