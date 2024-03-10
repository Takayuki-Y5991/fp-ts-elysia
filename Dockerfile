FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY src src
COPY prisma prisma
COPY tsconfig.json .
COPY .env .env

RUN bunx prisma generate

CMD ["bun", "src/index.ts"]

EXPOSE 3000