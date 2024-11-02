CREATE TABLE `CandidateNotificationSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`jobRecommendations` boolean NOT NULL DEFAULT true,
	`applicationStatus` boolean NOT NULL DEFAULT true,
	CONSTRAINT `CandidateNotificationSettings_id` PRIMARY KEY(`id`),
	CONSTRAINT `CandidateNotificationSettings_userId_unique` UNIQUE(`userId`)
) ENGINE = InnoDB;
--> statement-breakpoint
ALTER TABLE `CandidateNotificationSettings` ADD CONSTRAINT `CandidateNotificationSettings_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `userId` ON `CandidateNotificationSettings` (`userId`);