/*
  Warnings:

  - The values [PROGRESS_UPDATED] on the enum `TaskEventType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `columnId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `columnId` on the `TaskEvent` table. All the data in the column will be lost.
  - You are about to drop the `Column` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `storyId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storyId` to the `TaskEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskEventType_new" AS ENUM ('CREATED', 'MOVED', 'DESCRIPTION_CHANGED', 'PRIORITY_CHANGED', 'STARTED', 'COMPLETED', 'REOPENED', 'DEADLINE_MISSED');
ALTER TABLE "TaskEvent" ALTER COLUMN "type" TYPE "TaskEventType_new" USING ("type"::text::"TaskEventType_new");
ALTER TYPE "TaskEventType" RENAME TO "TaskEventType_old";
ALTER TYPE "TaskEventType_new" RENAME TO "TaskEventType";
DROP TYPE "TaskEventType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Column" DROP CONSTRAINT "Column_boardId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_columnId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "columnId",
ADD COLUMN     "storyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TaskEvent" DROP COLUMN "columnId",
ADD COLUMN     "storyId" TEXT NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Column";

-- CreateTable
CREATE TABLE "Story" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "boardId" TEXT NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskDependency" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "dependsOn" TEXT NOT NULL,

    CONSTRAINT "TaskDependency_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskDependency" ADD CONSTRAINT "TaskDependency_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskDependency" ADD CONSTRAINT "TaskDependency_dependsOn_fkey" FOREIGN KEY ("dependsOn") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
