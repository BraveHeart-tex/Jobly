ALTER TABLE `UserProfiles` DROP FOREIGN KEY `UserProfiles_countryId_Countries_id_fk`;
--> statement-breakpoint
ALTER TABLE `UserProfiles` ADD `presentedWorkExperienceId` int;--> statement-breakpoint
ALTER TABLE `UserProfiles` ADD CONSTRAINT `UserProfiles_presentedSchoolId_Schools_id_fk` FOREIGN KEY (`presentedSchoolId`) REFERENCES `Schools`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserProfiles` ADD CONSTRAINT `UserProfiles_presentedWorkExperienceId_WorkExperiences_id_fk` FOREIGN KEY (`presentedWorkExperienceId`) REFERENCES `WorkExperiences`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserProfiles` ADD CONSTRAINT `UserProfiles_cityId_Cities_id_fk` FOREIGN KEY (`cityId`) REFERENCES `Cities`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserProfiles` ADD CONSTRAINT `UserProfiles_countryId_Countries_id_fk` FOREIGN KEY (`countryId`) REFERENCES `Countries`(`id`) ON DELETE set null ON UPDATE no action;