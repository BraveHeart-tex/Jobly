ALTER TABLE `JobPostingBenefits` DROP FOREIGN KEY `JobPostingBenefits_jobPostingId_JobPostings_id_fk`;
--> statement-breakpoint
ALTER TABLE `JobPostingSkills` DROP FOREIGN KEY `JobPostingSkills_jobPostingId_JobPostings_id_fk`;
--> statement-breakpoint
ALTER TABLE `JobPostingBenefits` ADD CONSTRAINT `JobPostingBenefits_jobPostingId_JobPostings_id_fk` FOREIGN KEY (`jobPostingId`) REFERENCES `JobPostings`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `JobPostingSkills` ADD CONSTRAINT `JobPostingSkills_jobPostingId_JobPostings_id_fk` FOREIGN KEY (`jobPostingId`) REFERENCES `JobPostings`(`id`) ON DELETE cascade ON UPDATE no action;