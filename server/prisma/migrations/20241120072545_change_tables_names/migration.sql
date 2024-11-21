/*
  Warnings:

  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Driver` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Driver` DROP FOREIGN KEY `Driver_company_id_fkey`;

-- DropForeignKey
ALTER TABLE `Vehicle` DROP FOREIGN KEY `Vehicle_driver_id_fkey`;

-- DropTable
DROP TABLE `Company`;

-- DropTable
DROP TABLE `Driver`;

-- DropTable
DROP TABLE `Vehicle`;

-- CreateTable
CREATE TABLE `companies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `city` INTEGER NOT NULL,
    `status` VARCHAR(20) NOT NULL,
    `plan_type` VARCHAR(20) NOT NULL,
    `creation_date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `companies_name_key`(`name`),
    INDEX `companies_name_city_creation_date_idx`(`name`, `city`, `creation_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `drivers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `city` INTEGER NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `avatar_url` VARCHAR(191) NULL,
    `status` VARCHAR(20) NOT NULL,
    `creation_date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `company_id` INTEGER NULL,

    UNIQUE INDEX `drivers_email_key`(`email`),
    INDEX `drivers_city_first_name_creation_date_idx`(`city`, `first_name`, `creation_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plate` VARCHAR(100) NOT NULL,
    `model` VARCHAR(100) NOT NULL,
    `type` VARCHAR(20) NOT NULL,
    `capacity` VARCHAR(20) NOT NULL,
    `creation_date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `driver_id` INTEGER NULL,

    INDEX `vehicles_type_creation_date_idx`(`type`, `creation_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `drivers` ADD CONSTRAINT `drivers_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_driver_id_fkey` FOREIGN KEY (`driver_id`) REFERENCES `drivers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
