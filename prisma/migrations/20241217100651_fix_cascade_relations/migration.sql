/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `List` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_listId_fkey";

-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_boardId_fkey";

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "description",
DROP COLUMN "order";

-- AlterTable
ALTER TABLE "List" DROP COLUMN "order";

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;
