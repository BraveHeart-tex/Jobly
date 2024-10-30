CREATE TABLE `UserEmailNotificationSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`enabled` boolean DEFAULT false,
	`jobAlerts` boolean DEFAULT false,
	`suitableJobPostings` boolean DEFAULT false,
	`followedJobPostingClosingDates` boolean DEFAULT false,
	CONSTRAINT `UserEmailNotificationSettings_id` PRIMARY KEY(`id`)
) ENGINE = InnoDB;
--> statement-breakpoint
CREATE TABLE `UserSecuritySettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`enableTwoFactorAuth` boolean DEFAULT false,
	`twoFactorAuthMethod` enum('email','auth_app'),
	CONSTRAINT `UserSecuritySettings_id` PRIMARY KEY(`id`)
) ENGINE = InnoDB;
--> statement-breakpoint
ALTER TABLE `UserEmailNotificationSettings` ADD CONSTRAINT `UserEmailNotificationSettings_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserSecuritySettings` ADD CONSTRAINT `UserSecuritySettings_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `userId` ON `UserEmailNotificationSettings` (`userId`);--> statement-breakpoint
CREATE INDEX `userId` ON `UserSecuritySettings` (`userId`);