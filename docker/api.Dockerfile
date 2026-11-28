FROM node:22-alpine AS builder
RUN corepack enable
WORKDIR /workspace
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm run build:shared && pnpm --filter @sapling/api build
RUN pnpm --filter @sapling/api deploy --prod /output

FROM node:22-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder --chown=node:node /output ./
# The runtime executes the prebuilt server directly. Removing npm/npx avoids
# shipping an unused package manager and its transitive dependency surface.
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx
USER node
EXPOSE 4000
CMD ["node","dist/app/server.js"]
