# -----------------------------------------------------------------------------
# STAGE 1: Prune
# -----------------------------------------------------------------------------
FROM node:20-alpine AS prune
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=api --docker

# -----------------------------------------------------------------------------
# STAGE 2: Install & Build
# -----------------------------------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app

RUNHP corepack enable && corepack prepare pnpm@9.0.0 --activate

# Force pnpm to hoist dependencies to the root node_modules
RUN echo "node-linker=hoisted" > .npmrc

COPY --from=prune /app/out/json/ .
COPY --from=prune /app/out/pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

COPY --from=prune /app/out/full/ .

# [FIX] Set a dummy DATABASE_URL so Prisma can validate the config/schema during generation
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

# Generate Prisma Client
RUN cd apps/api && npx prisma generate

# Build the project
RUN pnpm turbo run build --filter=api...

# -----------------------------------------------------------------------------
# STAGE 3: Production Runner
# -----------------------------------------------------------------------------
FROM node:20-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

# Copy the flat node_modules
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules

# Copy the built app
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/package.json ./apps/api/package.json

# Copy workspace packages (needed for shared code)
COPY --from=builder --chown=nestjs:nodejs /app/packages ./packages

# Copy prisma (needed for schema validation/migrations)
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/prisma ./apps/api/prisma

EXPOSE 3000

CMD ["node", "apps/api/dist/main"]