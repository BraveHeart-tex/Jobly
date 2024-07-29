CREATE TABLE `JobTrackerApplication` (
	`id` int AUTO_INCREMENT NOT NULL,
	`status` enum('shortlist','applied','interview','offer','rejected') NOT NULL,
	`userId` int,
	`jobTitle` varchar(512),
	`location` varchar(512),
	`url` text,
	`salary` decimal(10,2),
	`notes` text,
	`jobDescription` text,
	CONSTRAINT `JobTrackerApplication_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `JobTrackerApplication` ADD CONSTRAINT `JobTrackerApplication_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE no action;