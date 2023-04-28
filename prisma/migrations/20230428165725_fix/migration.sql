/*
  Warnings:

  - You are about to drop the column `email_verified` on the `CompanyAccount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `CompanyAccount` DROP COLUMN `email_verified`,
    ADD COLUMN `emailVerified` DATETIME(3) NULL;
