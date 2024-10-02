ALTER TABLE `DocumentSectionFieldValues` MODIFY COLUMN `value` text NOT NULL;--> statement-breakpoint
ALTER TABLE `Documents` DROP COLUMN `language`;