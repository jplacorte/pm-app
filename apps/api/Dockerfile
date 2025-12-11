# -----------------------------------------------------------------------------
# BASE
# -----------------------------------------------------------------------------
FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && \
    apk add --no-cache dumb-init openssl openssl-dev

WORKDIR /app

# -----------------------------------------------------------------------------
# PRUNE
# -----------------------------------------------------------------------------
FROM base AS prune

RUN pnpm add -g turbo

COPY . .

RUN turbo prune --scope=api --docker

# -----------------------------------------------------------------------------
# BUILD
# -----------------------------------------------------------------------------
FROM base AS build

WORKDIR /app

# Copy pruned manifests
COPY --from=prune /app/out/json/ .
COPY --from=prune /app/out/pnpm-lock.yaml ./

# Install ALL dependencies (dev + prod)
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile

# Copy pruned source
COPY --from=prune /app/out/full/ .

# ------------------------------------------------------------
# 🔥 Prisma Generate (AUTO-DETECT schema path)
# ------------------------------------------------------------
RUN schema_path=$(find /app -name schema.prisma | head -n 1) && \
    echo "Found schema at $schema_path" && \
    DATABASE_URL="postgresql://placeholder" pnpm prisma generate --schema="$schema_path"

# Build API
RUN pnpm turbo run build --filter=api...

# -----------------------------------------------------------------------------
# PRODUCTION DEPS
# -----------------------------------------------------------------------------
FROM base AS prod-deps

WORKDIR /app

COPY --from=prune /app/out/json/ .
COPY --from=prune /app/out/pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm-prod-store,target=/pnpm/store \
    pnpm install --prod --frozen-lockfile

# -----------------------------------------------------------------------------
# RUNNER
# -----------------------------------------------------------------------------
FROM node:20-alpine AS runner

RUN apk add --no-cache dumb-init openssl

WORKDIR /app

# Create non-root user
RUN addgroup -S nodejs && adduser -S nestjs -G nodejs

# Copy production node_modules
COPY --from=prod-deps --chown=nestjs:nodejs /app/node_modules ./node_modules

# Copy built files
COPY --from=build --chown=nestjs:nodejs /app/apps/api/dist ./dist
COPY --from=build --chown=nestjs:nodejs /app/apps/api/package.json ./package.json

# Copy Prisma Client (generated)
COPY --from=build --chown=nestjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build --chown=nestjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

USER nestjs

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
