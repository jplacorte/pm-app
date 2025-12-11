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

# Install ALL dependencies (so we have the 'prisma' CLI available)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY --from=prune /app/out/full/ .

# Build the project
RUN pnpm turbo run build --filter=api...

# --- PREPARE DEPLOYMENT ---

# 1. Use 'pnpm deploy' to create a clean production folder with prod-deps
RUN pnpm deploy --filter=api --prod /app/deploy

# 2. Copy the built artifacts (dist) and prisma schema to the deploy folder
RUN cp -r apps/api/dist /app/deploy/dist
RUN cp -r apps/api/prisma /app/deploy/prisma

# 3. [CRITICAL FIX] Generate Prisma Client INSIDE the deploy folder
# We must use the 'prisma' CLI from the root node_modules because
# 'pnpm deploy --prod' removed it from the /app/deploy directory.
WORKDIR /app/deploy
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
RUN /app/node_modules/.bin/prisma generate

# -----------------------------------------------------------------------------
# STAGE 4: Runner
# -----------------------------------------------------------------------------
FROM node:20-alpine AS runner
WORKDIR /app

# Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

# Copy the fully prepared /app/deploy folder (which now includes the generated client)
COPY --from=builder --chown=nestjs:nodejs /app/deploy .

EXPOSE 3000

CMD ["node", "dist/main.js"]