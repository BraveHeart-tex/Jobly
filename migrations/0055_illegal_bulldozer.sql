CREATE TABLE `UserPrivacySettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`searchableProfile` boolean NOT NULL DEFAULT true,
	CONSTRAINT `UserPrivacySettings_id` PRIMARY KEY(`id`)
) ENGINE = InnoDb;

--> statement-breakpoint
ALTER TABLE `UserPrivacySettings` ADD CONSTRAINT `UserPrivacySettings_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `userId` ON `UserPrivacySettings` (`userId`);