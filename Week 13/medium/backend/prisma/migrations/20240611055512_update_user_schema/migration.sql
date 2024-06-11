/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";
ALTER TABLE "User" ADD COLUMN     "firstName" STRING NOT NULL DEFAULT 'Guest User';
ALTER TABLE "User" ADD COLUMN     "lastName" STRING;
