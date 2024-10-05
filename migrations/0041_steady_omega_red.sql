CREATE TABLE `CompanyUsers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`companyId` int NOT NULL,
	`createdAt` timestamp,
	CONSTRAINT `CompanyUsers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `CompanyUsers` ADD CONSTRAINT `CompanyUsers_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `CompanyUsers` ADD CONSTRAINT `CompanyUsers_companyId_Companies_id_fk` FOREIGN KEY (`companyId`) REFERENCES `Companies`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `userId` ON `CompanyUsers` (`userId`);--> statement-breakpoint
CREATE INDEX `companyId` ON `CompanyUsers` (`companyId`);