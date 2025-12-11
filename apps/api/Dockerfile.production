FROM node:18-alpine AS builder
WORKDIR /workspace

RUN corepack enable && corepack prepare pnpm@latest --activate

# copy root manifests and turbo config
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages ./packages

# copy prisma schema for api so postinstall can run
COPY apps/api/prisma ./apps/api/prisma

RUN pnpm install --frozen-lockfile

# now copy rest of repo and build
COPY . .
RUN pnpm -w turbo run build --filter=api... --no-cache

RUN pnpm -w prune --prod --no-optional

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /workspace/apps/api/dist ./dist
COPY --from=builder /workspace/node_modules ./node_modules
COPY --from=builder /workspace/apps/api/package.json ./package.json
ENV NODE_ENV=production
CMD ["node","dist/main.js"]