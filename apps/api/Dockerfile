FROM node:18-alpine AS builder
WORKDIR /workspace
RUN corepack enable && corepack prepare pnpm@latest --activate

# copy root manifests and turbo config first (for cached installs)
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json ./
# if you use turbo.jsonc, replace the line above with turbo.jsonc
COPY apps/api/package.json apps/api/package.json
COPY packages ./packages

ARG SKIP_PRISMA_POSTINSTALL=1
ENV SKIP_PRISMA_POSTINSTALL=${SKIP_PRISMA_POSTINSTALL}

RUN pnpm install --frozen-lockfile

# copy rest of repo and build
COPY . .
RUN pnpm -w turbo run build --filter=api... --no-cache


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
