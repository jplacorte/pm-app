# -------------------------------------
# BUILDER
# -------------------------------------
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace root files
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./

# Copy monorepo
COPY apps ./apps
COPY packages ./packages

# Install all dependencies (workspace)
RUN pnpm install --frozen-lockfile

# 🟢 Generate Prisma Client inside API workspace
RUN DATABASE_URL="postgresql://placeholder" \
    pnpm --filter api prisma generate

# 🟢 Build NestJS API
RUN pnpm --filter api build

# -------------------------------------
# RUNTIME IMAGE
# -------------------------------------
FROM node:20-alpine AS runner

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace node_modules (includes Prisma)
COPY --from=builder /app/node_modules ./node_modules

# Copy only the API project
COPY --from=builder /app/apps/api ./apps/api

USER node

EXPOSE 3000
CMD ["pnpm", "--filter", "api", "start"]
