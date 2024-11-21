-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `city` INTEGER NOT NULL,
    `status` VARCHAR(20) NOT NULL,
    `plan_type` VARCHAR(20) NOT NULL,
    `creation_date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Company_name_key`(`name`),
    INDEX `Company_name_city_creation_date_idx`(`name`, `city`, `creation_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Driver` (
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

    UNIQUE INDEX `Driver_email_key`(`email`),
    INDEX `Driver_city_first_name_creation_date_idx`(`city`, `first_name`, `creation_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehicle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plate` VARCHAR(100) NOT NULL,
    `model` VARCHAR(100) NOT NULL,
    `type` VARCHAR(20) NOT NULL,
    `capacity` VARCHAR(20) NOT NULL,
    `creation_date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `driver_id` INTEGER NULL,

    INDEX `Vehicle_type_creation_date_idx`(`type`, `creation_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Driver` ADD CONSTRAINT `Driver_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehicle` ADD CONSTRAINT `Vehicle_driver_id_fkey` FOREIGN KEY (`driver_id`) REFERENCES `Driver`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
