/*
  Warnings:

  - A unique constraint covering the columns `[apiKey]` on the table `CompanyAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `CompanyAccount` ADD COLUMN `apiKey` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `CompanyAccount_apiKey_key` ON `CompanyAccount`(`apiKey`);
