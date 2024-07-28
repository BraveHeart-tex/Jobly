ALTER TABLE `JobTrackerApplication` ADD `createdAt` datetime DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `JobTrackerApplication` ADD `updatedAt` datetime DEFAULT (now()) NOT NULL;