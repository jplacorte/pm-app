# Use the official Node.js image for the build stage.
FROM node:20 AS builder

# Set the working directory.
WORKDIR /app

# Install dependencies.
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy monorepo directories
COPY packages ./packages
COPY apps ./apps

# Build the application.
RUN pnpm build

# Use a smaller image for the runtime.
FROM node:20-slim

# Set the working directory.
WORKDIR /app

# Install required dependencies, including OpenSSL.
RUN apt-get update && \
    apt-get install -y openssl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy the build files from the previous stage.
COPY --from=build /app ./

# Install production dependencies.
RUN pnpm install --production

# Copy the .env.development file to .env in the container.
COPY .env .env

# Expose the port that the app runs on.
EXPOSE 3000

RUN corepack enable && corepack prepare pnpm@latest --activate

CMD ["pnpm", "start"]
