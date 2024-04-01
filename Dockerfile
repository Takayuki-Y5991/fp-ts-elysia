FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .
COPY node_modules .

RUN bun install

COPY src src
COPY drizzle drizzle
COPY tsconfig.json .
COPY .env .env

CMD ["bun", "src/index.ts"]

EXPOSE 3000