# Stage 1: deps + build
FROM node:18-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only lockfiles and package manifests to leverage layer caching
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json apps/api/
COPY packages ./packages

# copy prisma schema early
COPY apps/api/prisma ./apps/api/prisma

# Install dependencies (no build yet)
RUN pnpm install --frozen-lockfile --prefer-offline

# Copy source and build only the api app
COPY . .
RUN pnpm -w turbo run build --filter=api...

# Stage 2: production image
FROM node:18-alpine AS runner
WORKDIR /app

# Create non-root user
RUN addgroup -S app && adduser -S -G app app
USER app

# Copy built artifacts and production deps
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/package.json ./package.json

ENV NODE_ENV=production
EXPOSE 3000

# Healthcheck (adjust path/port to your app)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["pnpm", "start:prod"]