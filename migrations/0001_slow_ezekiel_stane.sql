ALTER TABLE `JobPostings` RENAME COLUMN `createdAt` TO `postedAt`;--> statement-breakpoint
ALTER TABLE `JobPostings` ADD `expiresAt` datetime DEFAULT (now());