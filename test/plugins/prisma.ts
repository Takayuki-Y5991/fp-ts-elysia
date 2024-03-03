// // plugins/prismaPgMem.ts
// import { newDb } from 'pg-mem';
// import { PrismaClient } from '@prisma/client';
// import { Plugin } from 'elysia'; // Elysiaの型定義をインポート

// const prismaPgMemPlugin: Plugin = () => ({
//   name: 'prisma-pg-mem',
//   setup: async ({ onBeforeStart }) => {
//     onBeforeStart(async () => {
//       // pg-memデータベースを生成
//       const pgMem = newDb();

//       // Prismaの接続URLをpg-memのURLに設定
//       process.env.DATABASE_URL =
//         pgMem.adapters.createPgPromiseAdapter().connectionString;

//       // PrismaClientのインスタンスを生成
//       const prisma = new PrismaClient();

//       // 必要に応じてPrismaClientをアプリケーションに渡す処理を追加
//       // 例: global.prisma = prisma;

//       // pg-memの初期化やスキーマのロードなどの処理を追加
//       // 例: await pgMem.runMigrations(); またはスキーマの適用など

//       console.log('Prisma with pg-mem has been set up for testing.');
//     });
//   },
// });

// export default prismaPgMemPlugin;
