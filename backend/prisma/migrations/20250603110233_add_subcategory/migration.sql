/*
  Warnings:

  - You are about to drop the `Subcategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subcategory" DROP CONSTRAINT "Subcategory_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "parentId" INTEGER;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "categoryId" DROP DEFAULT;

-- DropTable
DROP TABLE "Subcategory";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
