ALTER TABLE `UserRoles` DROP FOREIGN KEY `UserRoles_roleId_Roles_id_fk`;
--> statement-breakpoint
ALTER TABLE `Companies` MODIFY COLUMN `createdAt` timestamp;--> statement-breakpoint
ALTER TABLE `Companies` MODIFY COLUMN `updatedAt` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `Documents` MODIFY COLUMN `createdAt` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `Documents` MODIFY COLUMN `updatedAt` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `EntityPermissions` MODIFY COLUMN `createdAt` timestamp;--> statement-breakpoint
ALTER TABLE `EntityPermissions` MODIFY COLUMN `updatedAt` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `JobApplications` MODIFY COLUMN `appliedAt` timestamp;--> statement-breakpoint
ALTER TABLE `JobPostings` MODIFY COLUMN `postedAt` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `JobPostings` MODIFY COLUMN `updatedAt` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `JobTrackerApplications` MODIFY COLUMN `createdAt` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `JobTrackerApplications` MODIFY COLUMN `updatedAt` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `ResumeViews` MODIFY COLUMN `viewedAt` timestamp;--> statement-breakpoint
ALTER TABLE `Roles` MODIFY COLUMN `createdAt` timestamp;--> statement-breakpoint
ALTER TABLE `Roles` MODIFY COLUMN `updatedAt` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `UserBookmarksJobPosting` MODIFY COLUMN `bookmarkedAt` timestamp;--> statement-breakpoint
ALTER TABLE `UserCompanies` MODIFY COLUMN `createdAt` timestamp;--> statement-breakpoint
ALTER TABLE `UserProfiles` MODIFY COLUMN `createdAt` timestamp;--> statement-breakpoint
ALTER TABLE `UserProfiles` MODIFY COLUMN `updatedAt` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `UserViewsJobPosting` MODIFY COLUMN `viewedAt` timestamp;--> statement-breakpoint
ALTER TABLE `UserRoles` ADD CONSTRAINT `UserRoles_roleId_Roles_id_fk` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`id`) ON DELETE cascade ON UPDATE no action;