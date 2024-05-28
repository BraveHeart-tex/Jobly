-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Application` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`jobId` int NOT NULL,
	`coverLetter` text,
	`resume` varchar(255),
	`status` varchar(50) DEFAULT 'pending',
	`appliedAt` datetime DEFAULT (now()),
	CONSTRAINT `Application_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Company` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`website` varchar(100),
	`industry` varchar(100),
	`location` varchar(100),
	`logo` varchar(500),
	`description` text,
	`createdAt` datetime DEFAULT (now()),
	`updatedAt` datetime DEFAULT (now()),
	CONSTRAINT `Company_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Job` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`title` varchar(100) NOT NULL,
	`description` text,
	`location` varchar(100),
	`salaryRange` varchar(50),
	`employmentType` varchar(50),
	`isAnonymous` tinyint DEFAULT 0,
	`createdAt` datetime DEFAULT (now()),
	`updatedAt` datetime DEFAULT (now()),
	CONSTRAINT `Job_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `JobSkill` (
	`id` int AUTO_INCREMENT NOT NULL,
	`hobId` int NOT NULL,
	`skillName` varchar(100) NOT NULL,
	CONSTRAINT `JobSkill_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `UserProfile` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`bio` text,
	`experience` text,
	`education` text,
	`linkedin` varchar(100),
	`github` varchar(100),
	`image` varchar(500),
	`createdAt` datetime DEFAULT (now()),
	`updatedAt` datetime DEFAULT (now()),
	CONSTRAINT `UserProfile_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `UserSkill` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`skillName` varchar(100) NOT NULL,
	CONSTRAINT `UserSkill_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `jobId` ON `Application` (`jobId`);--> statement-breakpoint
CREATE INDEX `companyId` ON `Job` (`companyId`);--> statement-breakpoint
CREATE INDEX `hobId` ON `JobSkill` (`hobId`);
*/