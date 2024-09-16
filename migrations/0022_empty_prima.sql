ALTER TABLE `JobPostings` DROP FOREIGN KEY `JobPostings_createdUserId_Users_id_fk`;
--> statement-breakpoint
ALTER TABLE `JobPostings` ADD CONSTRAINT `JobPostings_createdUserId_Users_id_fk` FOREIGN KEY (`createdUserId`) REFERENCES `Users`(`id`) ON DELETE no action ON UPDATE no action;