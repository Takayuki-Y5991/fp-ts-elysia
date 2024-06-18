# Stage 1 : Install dependencies
FROM oven/bun as dependencies

WORKDIR /app
COPY package.json .
COPY bun.lockb .
RUN bun install
RUN bun install firebase-admin

# Stage 2 : Copy application code
FROM oven/bun

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY src src
COPY drizzle drizzle
COPY tsconfig.json .
COPY .env .env

CMD ["bun", "src/index.ts"]

EXPOSE 3000