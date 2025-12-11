FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files first
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./

# Copy all packages (monorepo)
COPY packages ./packages
COPY apps/api ./apps/api

# Install deps inside monorepo
RUN pnpm install --frozen-lockfile

# Generate Prisma client using the correct schema
RUN DATABASE_URL="postgresql://placeholder" pnpm --filter api prisma generate

# Build the API (if you have build script)
RUN pnpm --filter api build

# ---------------------------
# RUNTIME STAGE
# ---------------------------
FROM node:20-alpine AS runner

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy node_modules and built files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api ./apps/api

CMD ["pnpm", "--filter", "api", "start"]
