DROP TABLE `UserField`;--> statement-breakpoint
DROP TABLE `UserSection`;--> statement-breakpoint
ALTER TABLE `Field` RENAME COLUMN `name` TO `fieldName`;--> statement-breakpoint
ALTER TABLE `Field` RENAME COLUMN `dataType` TO `fieldType`;--> statement-breakpoint
ALTER TABLE `Job` RENAME COLUMN `description` TO `content`;--> statement-breakpoint
ALTER TABLE `Field` DROP FOREIGN KEY `Field_sectionId_Section_id_fk`;
--> statement-breakpoint
ALTER TABLE `Section` ADD `documentId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `Field` ADD CONSTRAINT `Field_sectionId_Section_id_fk` FOREIGN KEY (`sectionId`) REFERENCES `Section`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Section` ADD CONSTRAINT `Section_documentId_Document_id_fk` FOREIGN KEY (`documentId`) REFERENCES `Document`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Company` DROP COLUMN `followerCount`;--> statement-breakpoint
ALTER TABLE `Job` DROP COLUMN `applicationCount`;