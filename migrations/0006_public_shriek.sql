CREATE TABLE `UserCompanies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`companyId` int NOT NULL,
	`createdAt` datetime DEFAULT (now()),
	CONSTRAINT `UserCompanies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `UserCompanies` ADD CONSTRAINT `UserCompanies_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserCompanies` ADD CONSTRAINT `UserCompanies_companyId_Companies_id_fk` FOREIGN KEY (`companyId`) REFERENCES `Companies`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `userId` ON `UserCompanies` (`userId`);--> statement-breakpoint
CREATE INDEX `companyId` ON `UserCompanies` (`companyId`);