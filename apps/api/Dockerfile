# -----------------------------------------------------------------------------
# STAGE 1: Base
# -----------------------------------------------------------------------------
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && \
    apk add --no-cache dumb-init

# -----------------------------------------------------------------------------
# STAGE 2: Dependencies
# -----------------------------------------------------------------------------
FROM base AS deps
WORKDIR /app

# Install turbo globally for pruning
RUN pnpm add -g turbo

# Copy entire monorepo for pruning
COPY . .

# Prune to get only the files needed for the api package
RUN turbo prune --scope=api --docker

# -----------------------------------------------------------------------------
# STAGE 3: Builder
# -----------------------------------------------------------------------------
FROM base AS builder
WORKDIR /app

# Copy pruned lockfile and package.json files
COPY --from=deps /app/out/json/ .
COPY --from=deps /app/out/pnpm-lock.yaml ./

# Install dependencies (production + dev dependencies for building)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# Copy source code from pruned output
COPY --from=deps /app/out/full/ .

# Remove any .env files to prevent secrets from being baked in
RUN find . -name ".env*" -type f -delete

# Build the project with dummy DATABASE_URL
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" \
    pnpm turbo run build --filter=api...

# Create production deployment with only runtime dependencies
RUN pnpm deploy --filter=api --prod /prod

# Copy build artifacts and prisma schema to production folder
RUN cp -r apps/api/dist /prod/ && \
    cp -r apps/api/prisma /prod/

# Generate Prisma Client in production folder
WORKDIR /prod
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" \
    npx prisma generate --schema=./prisma/schema.prisma

# Final cleanup
RUN find /prod -name ".env*" -type f -delete && \
    rm -rf /prod/.pnpm-store

# -----------------------------------------------------------------------------
# STAGE 4: Runner (Production)
# -----------------------------------------------------------------------------
FROM node:20-alpine AS runner

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

WORKDIR /app

# Create non-root user and group
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

# Copy production dependencies and built application
COPY --from=builder --chown=nestjs:nodejs /prod ./

# Switch to non-root user
USER nestjs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

EXPOSE 3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]