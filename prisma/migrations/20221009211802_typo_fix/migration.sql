/*
  Warnings:

  - You are about to drop the column `typesId` on the `Item` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `Item_typesId_fkey`;

-- AlterTable
ALTER TABLE `Item` DROP COLUMN `typesId`,
    ADD COLUMN `typeId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
