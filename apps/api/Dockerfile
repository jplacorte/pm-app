# -----------------------------------------------------------------------------
# STAGE 1: Base
# Setup pnpm environment variables and enable corepack
# -----------------------------------------------------------------------------
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# -----------------------------------------------------------------------------
# STAGE 2: Prune
# Isolate the API and its dependencies from the monorepo
# -----------------------------------------------------------------------------
FROM base AS prune
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=api --docker

# -----------------------------------------------------------------------------
# STAGE 3: Builder
# Install dependencies, build, and prepare the deployment directory
# -----------------------------------------------------------------------------
FROM base AS builder
WORKDIR /app

# Copy lockfile and package.json's from prune stage
COPY --from=prune /app/out/json/ .
COPY --from=prune /app/out/pnpm-lock.yaml ./

# Install ALL dependencies (including devDependencies like @nestjs/cli)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY --from=prune /app/out/full/ .

# Generate Prisma Client
# We provide a dummy URL so Prisma can validate the schema/config during generation
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
RUN cd apps/api && npx prisma generate

# Build the project
RUN pnpm turbo run build --filter=api...

# [FIX] Use 'pnpm deploy' to create a production-ready slice of the app
# This installs only production dependencies into /app/deploy/node_modules
# and handles workspace links (like @pm-web/types) automatically.
RUN pnpm deploy --filter=api --prod /app/deploy

# [FIX] Copy the built artifacts to the deploy folder
# pnpm deploy essentially copies the source/package.json, but not ignored build artifacts like 'dist'
RUN cp -r apps/api/dist /app/deploy/dist
RUN cp -r apps/api/prisma /app/deploy/prisma

# -----------------------------------------------------------------------------
# STAGE 4: Runner
# Final production image
# -----------------------------------------------------------------------------
FROM base AS runner
WORKDIR /app

# Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

# Copy the completely self-contained application from the builder
COPY --from=builder --chown=nestjs:nodejs /app/deploy .

# Expose port
EXPOSE 3000

# Start the application
# Note: pnpm deploy flattens the structure, so we are running from the root of the deployed app
CMD ["node", "dist/main.js"]