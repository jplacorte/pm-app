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


# Stage 2: runtime
FROM node:18-alpine AS runner
WORKDIR /app

# enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only what we need to install production deps for api
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages ./packages

# Install only production deps for the api package
ENV NODE_ENV=production
RUN pnpm install --frozen-lockfile --prod --filter=api...

# Copy built artifacts from builder
COPY --from=builder /workspace/apps/api/dist ./dist
COPY --from=builder /workspace/apps/api/package.json ./package.json

EXPOSE 3000
# Run the built entry directly so pnpm is not required at runtime
CMD ["node", "dist/main.js"]
