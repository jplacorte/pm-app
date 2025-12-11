# Stage 1 builder
FROM node:18-alpine AS builder
WORKDIR /workspace
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages ./packages
COPY apps/api ./apps/api

RUN pnpm install --frozen-lockfile
RUN pnpm -w turbo run build --filter=api...

# Stage 2 runtime
FROM node:18-alpine AS runner
WORKDIR /app

# Copy only runtime artifacts
COPY --from=builder /workspace/apps/api/dist ./dist
COPY --from=builder /workspace/apps/api/package.json ./package.json
COPY --from=builder /workspace/node_modules ./node_modules

ENV NODE_ENV=production
EXPOSE 3000

# Run the built entry directly so pnpm is not required at runtime
CMD ["node", "dist/main.js"]
