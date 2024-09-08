CREATE TABLE `Benefits` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	CONSTRAINT `Benefits_id` PRIMARY KEY(`id`),
	CONSTRAINT `Benefits_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `JobPostingBenefits` (
	`jobPostingId` int NOT NULL,
	`benefitId` int NOT NULL,
	CONSTRAINT `JobPostingBenefit_id` PRIMARY KEY(`jobPostingId`,`benefitId`)
);
--> statement-breakpoint
CREATE TABLE `JobPostingSkills` (
	`jobPostingId` int NOT NULL,
	`skillId` int NOT NULL,
	CONSTRAINT `JobPostingSkill_id` PRIMARY KEY(`jobPostingId`,`skillId`)
);
--> statement-breakpoint
CREATE TABLE `Skills` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	CONSTRAINT `Skills_id` PRIMARY KEY(`id`),
	CONSTRAINT `Skills_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
ALTER TABLE `JobPostingBenefits` ADD CONSTRAINT `JobPostingBenefits_jobPostingId_JobPostings_id_fk` FOREIGN KEY (`jobPostingId`) REFERENCES `JobPostings`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `JobPostingBenefits` ADD CONSTRAINT `JobPostingBenefits_benefitId_Benefits_id_fk` FOREIGN KEY (`benefitId`) REFERENCES `Benefits`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `JobPostingSkills` ADD CONSTRAINT `JobPostingSkills_jobPostingId_JobPostings_id_fk` FOREIGN KEY (`jobPostingId`) REFERENCES `JobPostings`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `JobPostingSkills` ADD CONSTRAINT `JobPostingSkills_skillId_Skills_id_fk` FOREIGN KEY (`skillId`) REFERENCES `Skills`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `name` ON `Benefits` (`name`);--> statement-breakpoint
CREATE INDEX `jobPostingId` ON `JobPostingBenefits` (`jobPostingId`);--> statement-breakpoint
CREATE INDEX `benefitId` ON `JobPostingBenefits` (`benefitId`);--> statement-breakpoint
CREATE INDEX `jobPostingId` ON `JobPostingSkills` (`jobPostingId`);--> statement-breakpoint
CREATE INDEX `skillId` ON `JobPostingSkills` (`skillId`);--> statement-breakpoint
CREATE INDEX `name` ON `Skills` (`name`);--> statement-breakpoint
ALTER TABLE `JobPostings` DROP COLUMN `skills`;--> statement-breakpoint
ALTER TABLE `JobPostings` DROP COLUMN `benefits`;