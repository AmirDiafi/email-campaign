/*
  Warnings:

  - Added the required column `interactType` to the `UserSuggestion` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InteractionEnum" AS ENUM ('LIKE', 'DISLIKE', 'VIEW');

-- AlterTable
ALTER TABLE "UserSuggestion" ADD COLUMN     "interactType" "InteractionEnum" NOT NULL;
