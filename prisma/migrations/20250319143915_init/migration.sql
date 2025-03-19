/*
  Warnings:

  - You are about to drop the `UserInteraction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProductPreference` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserInteraction" DROP CONSTRAINT "UserInteraction_product_id_fkey";

-- DropForeignKey
ALTER TABLE "UserInteraction" DROP CONSTRAINT "UserInteraction_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserProductPreference" DROP CONSTRAINT "UserProductPreference_product_id_fkey";

-- DropForeignKey
ALTER TABLE "UserProductPreference" DROP CONSTRAINT "UserProductPreference_user_id_fkey";

-- DropTable
DROP TABLE "UserInteraction";

-- DropTable
DROP TABLE "UserProductPreference";

-- CreateTable
CREATE TABLE "UserSuggestion" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSuggestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserSuggestion" ADD CONSTRAINT "UserSuggestion_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSuggestion" ADD CONSTRAINT "UserSuggestion_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
