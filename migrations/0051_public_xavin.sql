CREATE TABLE `UserSkillEducationalBackgrounds` (
	`userSkillId` int NOT NULL,
	`educationalBackgroundId` int NOT NULL,
	CONSTRAINT `UserSkillEducationalBackgrounds_pk` PRIMARY KEY(`userSkillId`,`educationalBackgroundId`)
);
--> statement-breakpoint
CREATE TABLE `UserSkillWorkExperiences` (
	`userSkillId` int NOT NULL,
	`workExperienceId` int NOT NULL,
	CONSTRAINT `UserSkillWorkExperiences_pk` PRIMARY KEY(`userSkillId`,`workExperienceId`)
);
--> statement-breakpoint
ALTER TABLE `UserSkills` DROP FOREIGN KEY `UserSkills_attributedWorkExperienceId_WorkExperiences_id_fk`;
--> statement-breakpoint
ALTER TABLE `UserSkills` DROP FOREIGN KEY `UserSkills_attributedEducationalBackgroundId_EducationalBackgrounds_id_fk`;
--> statement-breakpoint
ALTER TABLE `UserSkills` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `UserSkills` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `UserSkills` ADD `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `UserSkillEducationalBackgrounds` ADD CONSTRAINT `UserSkillEducationalBackgrounds_userSkillId_UserSkills_id_fk` FOREIGN KEY (`userSkillId`) REFERENCES `UserSkills`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserSkillEducationalBackgrounds` ADD CONSTRAINT `UserSkillEducationalBackgrounds_educationalBackgroundId_EducationalBackgrounds_id_fk` FOREIGN KEY (`educationalBackgroundId`) REFERENCES `EducationalBackgrounds`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserSkillWorkExperiences` ADD CONSTRAINT `UserSkillWorkExperiences_userSkillId_UserSkills_id_fk` FOREIGN KEY (`userSkillId`) REFERENCES `UserSkills`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserSkillWorkExperiences` ADD CONSTRAINT `UserSkillWorkExperiences_workExperienceId_WorkExperiences_id_fk` FOREIGN KEY (`workExperienceId`) REFERENCES `WorkExperiences`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `userSkillId` ON `UserSkillEducationalBackgrounds` (`userSkillId`);--> statement-breakpoint
CREATE INDEX `educationalBackgroundId` ON `UserSkillEducationalBackgrounds` (`educationalBackgroundId`);--> statement-breakpoint
CREATE INDEX `userSkillId` ON `UserSkillWorkExperiences` (`userSkillId`);--> statement-breakpoint
CREATE INDEX `workExperienceId` ON `UserSkillWorkExperiences` (`workExperienceId`);--> statement-breakpoint
ALTER TABLE `UserSkills` DROP COLUMN `attributedWorkExperienceId`;--> statement-breakpoint
ALTER TABLE `UserSkills` DROP COLUMN `attributedEducationalBackgroundId`;