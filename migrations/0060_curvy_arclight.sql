CREATE TABLE `ApplicationDocuments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`applicationId` int NOT NULL,
	`documentId` int NOT NULL,
	CONSTRAINT `ApplicationDocuments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `JobApplications` DROP FOREIGN KEY `JobApplications_coverLetterId_Documents_id_fk`;
--> statement-breakpoint
ALTER TABLE `JobApplications` DROP FOREIGN KEY `JobApplications_resumeId_Documents_id_fk`;
--> statement-breakpoint
DROP INDEX `coverLetterId` ON `JobApplications`;--> statement-breakpoint
ALTER TABLE `JobApplications` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `Documents` ADD `source` enum('builder','uploaded') NOT NULL;--> statement-breakpoint
ALTER TABLE `Documents` ADD `url` varchar(512);--> statement-breakpoint
ALTER TABLE `ApplicationDocuments` ADD CONSTRAINT `ApplicationDocuments_applicationId_JobApplications_id_fk` FOREIGN KEY (`applicationId`) REFERENCES `JobApplications`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ApplicationDocuments` ADD CONSTRAINT `ApplicationDocuments_documentId_Documents_id_fk` FOREIGN KEY (`documentId`) REFERENCES `Documents`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `applicationId` ON `ApplicationDocuments` (`applicationId`);--> statement-breakpoint
CREATE INDEX `documentId` ON `ApplicationDocuments` (`documentId`);--> statement-breakpoint
ALTER TABLE `JobApplications` DROP COLUMN `coverLetterId`;--> statement-breakpoint
ALTER TABLE `JobApplications` DROP COLUMN `resumeId`;