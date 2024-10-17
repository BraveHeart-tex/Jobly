DROP TABLE `Schools`;--> statement-breakpoint
ALTER TABLE `UserProfiles` DROP FOREIGN KEY `UserProfiles_presentedSchoolId_Schools_id_fk`;
--> statement-breakpoint
ALTER TABLE `UserProfiles` DROP COLUMN `presentedSchoolId`;