ALTER TABLE `UserBios` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `Users` ADD `createdAt` timestamp;--> statement-breakpoint
ALTER TABLE `Users` ADD `updatedAt` timestamp NOT NULL;--> statement-breakpoint
CREATE INDEX `status` ON `JobTrackerApplications` (`status`);--> statement-breakpoint
CREATE INDEX `userId` ON `UserBios` (`userId`);--> statement-breakpoint
ALTER TABLE `Companies` DROP COLUMN `coverImage`;