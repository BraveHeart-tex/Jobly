ALTER TABLE `EducationalBackgrounds` RENAME COLUMN `degree` TO `fieldOfStudy`;--> statement-breakpoint
ALTER TABLE `EducationalBackgrounds` ADD `gpa` decimal(10,2);--> statement-breakpoint
ALTER TABLE `EducationalBackgrounds` DROP COLUMN `city`;