DROP TABLE `BrandingAssets`;--> statement-breakpoint
DROP TABLE `CompanyBrandingAssets`;--> statement-breakpoint
ALTER TABLE `Companies` MODIFY COLUMN `verifiedAt` timestamp;--> statement-breakpoint
ALTER TABLE `Companies` MODIFY COLUMN `createdAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `Companies` MODIFY COLUMN `updatedAt` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `Documents` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `Documents` MODIFY COLUMN `updatedAt` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `EntityPermissions` MODIFY COLUMN `createdAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `EntityPermissions` MODIFY COLUMN `updatedAt` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `JobApplications` MODIFY COLUMN `appliedAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `JobPostings` MODIFY COLUMN `postedAt` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `JobPostings` MODIFY COLUMN `expiresAt` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `JobPostings` MODIFY COLUMN `updatedAt` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `JobTrackerApplications` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `JobTrackerApplications` MODIFY COLUMN `updatedAt` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `ResumeViews` MODIFY COLUMN `viewedAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `Roles` MODIFY COLUMN `createdAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `Roles` MODIFY COLUMN `updatedAt` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `UserBookmarksJobPosting` MODIFY COLUMN `bookmarkedAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `UserCompanies` MODIFY COLUMN `createdAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `UserProfiles` MODIFY COLUMN `createdAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `UserProfiles` MODIFY COLUMN `updatedAt` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `UserViewsJobPosting` MODIFY COLUMN `viewedAt` timestamp DEFAULT (now());