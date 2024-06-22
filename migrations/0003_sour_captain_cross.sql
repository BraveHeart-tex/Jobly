ALTER TABLE `Application` RENAME COLUMN `coverLetter` TO `coverLetterId`;--> statement-breakpoint
ALTER TABLE `ResumeView` RENAME COLUMN `viewedUserId` TO `viewedResumeId`;--> statement-breakpoint
ALTER TABLE `ResumeView` DROP FOREIGN KEY `ResumeView_viewedUserId_User_id_fk`;
--> statement-breakpoint
DROP INDEX `viewedUserId` ON `ResumeView`;--> statement-breakpoint
ALTER TABLE `Application` MODIFY COLUMN `coverLetterId` int;--> statement-breakpoint
ALTER TABLE `ResumeView` MODIFY COLUMN `viewedAt` datetime DEFAULT (now());--> statement-breakpoint
ALTER TABLE `CoverLetter` ADD `title` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `Application` ADD CONSTRAINT `Application_coverLetterId_CoverLetter_id_fk` FOREIGN KEY (`coverLetterId`) REFERENCES `CoverLetter`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ResumeView` ADD CONSTRAINT `ResumeView_viewedResumeId_Resume_id_fk` FOREIGN KEY (`viewedResumeId`) REFERENCES `Resume`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `coverLetterId` ON `Application` (`coverLetterId`);--> statement-breakpoint
CREATE INDEX `viewedResumeId` ON `ResumeView` (`viewedResumeId`);