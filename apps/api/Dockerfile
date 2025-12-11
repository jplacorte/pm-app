# -----------------------------------------------------------------------------
# STAGE 1: Prune
# This stage isolates the "api" app and only its specific dependencies
# from the rest of the monorepo.
# -----------------------------------------------------------------------------
FROM node:20-alpine AS prune
WORKDIR /app

# Install turbo globally to run the prune command
RUN npm install -g turbo

# Copy all source files (package.json, lockfile, turbo.json, workspace configs)
COPY . .

# Prune the workspace to include only "api" and its internal dependencies (like @pm-web/types)
# "api" here matches the "name" field in apps/api/package.json
RUN turbo prune --scope=api --docker

# -----------------------------------------------------------------------------
# STAGE 2: Install & Build
# This stage installs dependencies and builds the application.
# -----------------------------------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# Enable pnpm (using the version specified in root package.json)
# [FIXED TYPO HERE] Changed RUNHP to RUN
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# [FIX] Force pnpm to hoist dependencies to the root node_modules
# This prevents "Cannot find module" errors caused by pnpm's default symlinked structure
RUN echo "node-linker=hoisted" > .npmrc

# Copy the "json" folder from the prune stage.
# This contains package.json files for the API and its dependencies.
COPY --from=prune /app/out/json/ .
COPY --from=prune /app/out/pnpm-lock.yaml ./

# Install dependencies (only what's needed for the API)
RUN pnpm install --frozen-lockfile

# Copy the "full" folder from the prune stage.
# This contains the actual source code for the API and packages.
COPY --from=prune /app/out/full/ .

# [FIX] Set a dummy DATABASE_URL so Prisma can validate the config/schema during generation
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

# [FIX] Generate Prisma Client
# This creates the necessary client files in node_modules based on your schema
RUN cd apps/api && npx prisma generate

# Build the project
# This runs the "build" script defined in apps/api/package.json
RUN pnpm turbo run build --filter=api...


# -----------------------------------------------------------------------------
# STAGE 3: Production Runner
# This stage creates the final, minimal image for production.
# -----------------------------------------------------------------------------
FROM node:20-alpine AS runner
WORKDIR /app

# Don't run as root for security reasons
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

# Copy the flat node_modules
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules

# Copy the built application from the builder stage
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/package.json ./apps/api/package.json

# [FIX] Copy workspace packages
# Without these, resolving @pm-web/types might fail if code relies on them at runtime
COPY --from=builder --chown=nestjs:nodejs /app/packages ./packages

# [FIX] Copy prisma directory
# Useful if you ever need to run migrations in production
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/prisma ./apps/api/prisma

# Expose the port NestJS listens on (matches main.ts)
EXPOSE 3000

# Start the application
CMD ["node", "apps/api/dist/main"]