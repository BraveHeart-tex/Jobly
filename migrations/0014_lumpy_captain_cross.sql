ALTER TABLE `FieldValue` DROP FOREIGN KEY `FieldValue_fieldId_Field_id_fk`;
--> statement-breakpoint
ALTER TABLE `FieldValue` ADD CONSTRAINT `FieldValue_fieldId_Field_id_fk` FOREIGN KEY (`fieldId`) REFERENCES `Field`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `documentId` ON `Section` (`documentId`);