-- DropIndex
DROP INDEX "CartItem_productId_key";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "description" DROP NOT NULL;
