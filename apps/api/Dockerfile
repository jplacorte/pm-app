# Stage 1 — builder: install deps and build
FROM node:18-alpine AS builder
WORKDIR /workspace

# Activate pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace manifests and turbo config for correct installs
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages ./packages

# Copy source needed for build (copying apps/api early helps prisma if needed)
COPY apps/api ./apps/api
COPY .npmrc ./

# Install all deps (dev + prod) in builder
RUN pnpm install --frozen-lockfile --reporter=append-only

# Copy remaining repo files (if any) and build the api
COPY . .
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN pnpm -w turbo run build --filter=api... --no-cache

# Prune dev dependencies to keep only production deps for runtime
# This modifies node_modules in-place to remove devDependencies
RUN pnpm -w prune --prod --no-optional

# Optional: rename entry if your runtime expects server.js
RUN if [ -f apps/api/dist/main.js ] && [ ! -f apps/api/dist/server.js ]; then \
      mv apps/api/dist/main.js apps/api/dist/server.js || true; \
    fi

# Stage 2 — runtime: tiny image with only what we need
FROM node:18-alpine AS runner
WORKDIR /app

# Create non-root user
RUN addgroup -S app && adduser -S -G app app

# Copy built app and pruned node_modules from builder
COPY --from=builder /workspace/apps/api/dist ./dist
COPY --from=builder /workspace/apps/api/package.json ./package.json
COPY --from=builder /workspace/node_modules ./node_modules
# Copy pnpm internal layout if present (keeps symlinks intact)
COPY --from=builder /workspace/node_modules/.pnpm ./node_modules/.pnpm || true

ENV NODE_ENV=production
# Limit Node memory to be safe on 512MB hosts
ENV NODE_OPTIONS="--max-old-space-size=256"

# Use non-root user
USER app

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s CMD wget -qO- http://localhost:3000/health || exit 1

# Run the built entry directly (avoid pnpm at runtime)
CMD ["node", "dist/main.js"]