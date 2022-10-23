/*
  Warnings:

  - You are about to drop the column `username` on the `IAM` table. All the data in the column will be lost.
  - Added the required column `tagname` to the `IAM` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `IAM` DROP COLUMN `username`,
    ADD COLUMN `tagname` VARCHAR(191) NOT NULL;
