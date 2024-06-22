--> statement-breakpoint
ALTER TABLE `Application` DROP FOREIGN KEY `Application_coverLetterId_CoverLetter_id_fk`;
DROP TABLE `CoverLetter`;--> statement-breakpoint
--> statement-breakpoint
CREATE TABLE `Document` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(512) NOT NULL,
	`userId` int NOT NULL,
	`type` enum('resume','cover_letter') NOT NULL,
	`language` varchar(100) NOT NULL,
	`createdAt` datetime DEFAULT (now()),
	`updatedAt` datetime DEFAULT (now()),
	CONSTRAINT `Document_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
ALTER TABLE `ResumeView` DROP FOREIGN KEY `ResumeView_viewedResumeId_Resume_id_fk`;
--> statement-breakpoint
ALTER TABLE `UserSection` DROP FOREIGN KEY `UserSection_resumeId_Resume_id_fk`;
--> statement-breakpoint
ALTER TABLE `Application` ADD `resumeId` int;--> statement-breakpoint
ALTER TABLE `Document` ADD CONSTRAINT `Document_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `userId` ON `Document` (`userId`);--> statement-breakpoint
ALTER TABLE `Application` ADD CONSTRAINT `Application_coverLetterId_Document_id_fk` FOREIGN KEY (`coverLetterId`) REFERENCES `Document`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Application` ADD CONSTRAINT `Application_resumeId_Document_id_fk` FOREIGN KEY (`resumeId`) REFERENCES `Document`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ResumeView` ADD CONSTRAINT `ResumeView_viewedResumeId_Document_id_fk` FOREIGN KEY (`viewedResumeId`) REFERENCES `Document`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserSection` ADD CONSTRAINT `UserSection_resumeId_Document_id_fk` FOREIGN KEY (`resumeId`) REFERENCES `Document`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
DROP TABLE `Resume`;--> statement-breakpoint
ALTER TABLE `Application` DROP COLUMN `resume`;