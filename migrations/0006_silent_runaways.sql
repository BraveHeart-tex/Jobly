ALTER TABLE `Company` MODIFY COLUMN `updatedAt` datetime NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `Document` MODIFY COLUMN `createdAt` datetime NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `Document` MODIFY COLUMN `updatedAt` datetime NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `Job` MODIFY COLUMN `updatedAt` datetime NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `UserProfile` MODIFY COLUMN `updatedAt` datetime NOT NULL DEFAULT (now());