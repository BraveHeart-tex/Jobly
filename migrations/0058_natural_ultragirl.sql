CREATE TABLE `DeviceSessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`sessionId` varchar(255) NOT NULL,
	`deviceName` varchar(255) NOT NULL,
	`browser` varchar(255),
	`operatingSystem` varchar(255),
	`lastActive` timestamp,
	`ipAddress` varchar(45),
	`location` text,
	CONSTRAINT `DeviceSessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `DeviceSessions_sessionId_unique` UNIQUE(`sessionId`)
) ENGINE=InnoDB;
--> statement-breakpoint
ALTER TABLE `DeviceSessions` ADD CONSTRAINT `DeviceSessions_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `DeviceSessions` ADD CONSTRAINT `DeviceSessions_sessionId_Sessions_id_fk` FOREIGN KEY (`sessionId`) REFERENCES `Sessions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `user_id` ON `DeviceSessions` (`userId`);--> statement-breakpoint
CREATE INDEX `session_id` ON `DeviceSessions` (`sessionId`);