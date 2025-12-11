# 1. Base setup
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# 2. Builder Stage
FROM base AS builder
WORKDIR /app

# Copy the entire repository
# (Ensure your .dockerignore excludes node_modules to keep this fast)
COPY . .

# Install dependencies (including dev deps for building)
RUN pnpm install --frozen-lockfile

# Generate Prisma Client
# We run this explicitly to ensure the client is generated for the build
RUN pnpm --filter=api exec prisma generate

# Build the API application
RUN pnpm --filter=api build

# Create a deployed production version of the app
# This isolates the specific app and installs ONLY production dependencies into /prod/api
RUN pnpm --filter=api deploy --prod /prod/api

# 3. Runner Stage (Production)
FROM node:20-slim AS runner
WORKDIR /app

# Install OpenSSL (Required for Prisma Client in production)
RUN apt-get update -y && \
    apt-get install -y openssl ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy the isolated production dependencies and package files
COPY --from=builder /prod/api ./

# Copy the compiled application from the builder
COPY --from=builder /app/apps/api/dist ./dist

# Copy the prisma schema (Required if your app reads it at runtime, usually usually bundled but good safety)
COPY --from=builder /app/apps/api/prisma ./prisma

# Set production environment
ENV NODE_ENV=production

EXPOSE 3000

# Run the compiled app directly (Bypassing Nest CLI)
CMD ["node", "dist/main"]