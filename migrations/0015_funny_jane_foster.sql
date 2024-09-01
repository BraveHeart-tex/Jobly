CREATE TABLE `BrandingAssets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`fileUrl` varchar(2048) NOT NULL,
	`createdAt` datetime DEFAULT (now()),
	`createdBy` int NOT NULL,
	`updatedAt` datetime NOT NULL DEFAULT (now()),
	`updatedBy` int NOT NULL,
	CONSTRAINT `BrandingAssets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `CompanyBrandingAssets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`brandingAssetId` int NOT NULL,
	CONSTRAINT `CompanyBrandingAssets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `CompanyBrandingAssets` ADD CONSTRAINT `CompanyBrandingAssets_companyId_Companies_id_fk` FOREIGN KEY (`companyId`) REFERENCES `Companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `CompanyBrandingAssets` ADD CONSTRAINT `CompanyBrandingAssets_brandingAssetId_BrandingAssets_id_fk` FOREIGN KEY (`brandingAssetId`) REFERENCES `BrandingAssets`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `createdBy` ON `BrandingAssets` (`createdBy`);--> statement-breakpoint
CREATE INDEX `updatedBy` ON `BrandingAssets` (`updatedBy`);--> statement-breakpoint
CREATE INDEX `companyId` ON `CompanyBrandingAssets` (`companyId`);--> statement-breakpoint
CREATE INDEX `brandingAssetId` ON `CompanyBrandingAssets` (`brandingAssetId`);