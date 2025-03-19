/*
  Warnings:

  - The values [DISLIKE] on the enum `InteractionEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InteractionEnum_new" AS ENUM ('LIKE', 'VIEW', 'SAVE', 'SHARE', 'COMMENT');
ALTER TABLE "UserSuggestion" ALTER COLUMN "interactType" TYPE "InteractionEnum_new" USING ("interactType"::text::"InteractionEnum_new");
ALTER TYPE "InteractionEnum" RENAME TO "InteractionEnum_old";
ALTER TYPE "InteractionEnum_new" RENAME TO "InteractionEnum";
DROP TYPE "InteractionEnum_old";
COMMIT;
