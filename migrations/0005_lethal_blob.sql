CREATE TABLE `JobPostingContents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`jobPostingId` int NOT NULL,
	`content` text NOT NULL,
	CONSTRAINT `JobPostingContents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `JobPostingContents` ADD CONSTRAINT `JobPostingContents_jobPostingId_JobPostings_id_fk` FOREIGN KEY (`jobPostingId`) REFERENCES `JobPostings`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `jobId` ON `JobPostingContents` (`jobPostingId`);--> statement-breakpoint
ALTER TABLE `JobPostings` DROP COLUMN `content`;--> statement-breakpoint
ALTER TABLE `JobPostings` DROP COLUMN `benefits`;