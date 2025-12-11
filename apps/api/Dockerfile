# -----------------------------------------------------------------------------
# STAGE 1: Base
# -----------------------------------------------------------------------------
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# -----------------------------------------------------------------------------
# STAGE 2: Prune
# -----------------------------------------------------------------------------
FROM base AS prune
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=api --docker

# -----------------------------------------------------------------------------
# STAGE 3: Builder
# -----------------------------------------------------------------------------
FROM base AS builder
WORKDIR /app

# Copy lockfile and package.json's from prune stage
COPY --from=prune /app/out/json/ .
COPY --from=prune /app/out/pnpm-lock.yaml ./

# Install ALL dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY --from=prune /app/out/full/ .

# Build the project
# Pass dummy URL inline so it DOES NOT persist in the image
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" pnpm turbo run build --filter=api...

# --- PREPARE DEPLOYMENT ---

# 1. Use 'pnpm deploy' to create a clean production folder
RUN pnpm deploy --filter=api --prod /app/deploy

# 2. Copy the built artifacts (dist) and prisma schema to the deploy folder
RUN cp -r apps/api/dist /app/deploy/dist
RUN cp -r apps/api/prisma /app/deploy/prisma

# 3. Generate Prisma Client for the deployed app
# [FIX] We pass DATABASE_URL inline here. This allows 'prisma generate' to pass validation
# without permanently setting the ENV variable in the final Docker image.
WORKDIR /app/deploy
RUN cd /app/apps/api && \
    DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" npx prisma generate --schema=/app/deploy/prisma/schema.prisma

# -----------------------------------------------------------------------------
# STAGE 4: Runner
# -----------------------------------------------------------------------------
FROM node:20-alpine AS runner
WORKDIR /app

# Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

# Copy the fully prepared /app/deploy folder
COPY --from=builder --chown=nestjs:nodejs /app/deploy .

EXPOSE 3000

CMD ["node", "dist/main.js"]