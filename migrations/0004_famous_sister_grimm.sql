CREATE TABLE `JobPostingBenefits` (
	`id` int AUTO_INCREMENT NOT NULL,
	`jobPostingId` int NOT NULL,
	`benefitName` varchar(256) NOT NULL,
	CONSTRAINT `JobPostingBenefits_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `JobPostingSkills` MODIFY COLUMN `skillName` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `JobPostingBenefits` ADD CONSTRAINT `JobPostingBenefits_jobPostingId_JobPostings_id_fk` FOREIGN KEY (`jobPostingId`) REFERENCES `JobPostings`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `jobId` ON `JobPostingBenefits` (`jobPostingId`);