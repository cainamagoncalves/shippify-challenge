/*
  Warnings:

  - Made the column `phone` on table `drivers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `drivers` MODIFY `phone` VARCHAR(20) NOT NULL;
