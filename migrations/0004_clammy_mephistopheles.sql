ALTER TABLE `CoverLetter` ADD `language` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `CoverLetter` ADD `createdAt` datetime DEFAULT (now());--> statement-breakpoint
ALTER TABLE `CoverLetter` ADD `updatedAt` datetime DEFAULT (now());