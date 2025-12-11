# -----------------------------------------------------------------------------
# STAGE 1: Base
# -----------------------------------------------------------------------------
FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && \
    apk add --no-cache dumb-init

WORKDIR /app

# -----------------------------------------------------------------------------
# STAGE 2: Dependencies & Prune
# -----------------------------------------------------------------------------
FROM base AS deps

# Install turbo (needed for prune)
RUN pnpm add -g turbo

# Copy monorepo
COPY . .

# Prune only API dependencies
RUN turbo prune --scope=api --docker

# -----------------------------------------------------------------------------
# STAGE 3: Build
# -----------------------------------------------------------------------------
FROM base AS builder

WORKDIR /app

# Copy pruned package manifests
COPY --from=deps /app/out/json/ .
COPY --from=deps /app/out/pnpm-lock.yaml ./

# Install ALL deps (prod + dev needed for build)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# Copy pruned source
COPY --from=deps /app/out/full/ .

# Remove env files
RUN find . -name ".env*" -delete

# Prisma: generate client
WORKDIR /app/apps/api
RUN DATABASE_URL="postgresql://placeholder" \
    pnpm prisma generate --schema=./prisma/schema.prisma

# Build API
WORKDIR /app
RUN pnpm turbo run build --filter=api...

# -----------------------------------------------------------------------------
# STAGE 4: Production Dependencies Only
# -----------------------------------------------------------------------------
FROM base AS prod-deps

WORKDIR /app

COPY --from=deps /app/out/json/ .
COPY --from=deps /app/out/pnpm-lock.yaml ./

# Install only production deps
RUN --mount=type=cache,id=pnpm-prod,target=/pnpm/store \
    pnpm install --frozen-lockfile --prod

# -----------------------------------------------------------------------------
# STAGE 5: Runner
# -----------------------------------------------------------------------------
FROM node:20-alpine AS runner

RUN apk add --no-cache dumb-init

WORKDIR /app

# Create user
RUN addgroup -S nodejs && adduser -S nestjs -G nodejs

# Copy node_modules
COPY --from=prod-deps --chown=nestjs:nodejs /app/node_modules ./node_modules

# Copy built output
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/package.json ./package.json

# Prisma schema (optional but safe)
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/prisma/schema.prisma ./prisma/schema.prisma

# Prisma Client
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/node_modules/@prisma ./node_modules/@prisma

USER nestjs

HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
    CMD wget -qO- http://localhost:3000/health || exit 1

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
