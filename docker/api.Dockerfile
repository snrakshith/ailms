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
USER node
EXPOSE 4000
CMD ["node","dist/app/server.js"]
