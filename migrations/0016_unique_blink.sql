ALTER TABLE `JobPostings` MODIFY COLUMN `location` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `JobPostings` MODIFY COLUMN `workType` enum('office','remote','hybrid','other') NOT NULL DEFAULT 'office';--> statement-breakpoint
ALTER TABLE `JobPostings` MODIFY COLUMN `employmentType` enum('full-time','part-time','contract','internship','temporary','volunteer','other') NOT NULL DEFAULT 'full-time';--> statement-breakpoint
ALTER TABLE `JobPostings` ADD `postingContent` text NOT NULL;