CREATE TABLE `FieldValue` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fieldId` int NOT NULL,
	CONSTRAINT `FieldValue_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `FieldValue` ADD CONSTRAINT `FieldValue_fieldId_Field_id_fk` FOREIGN KEY (`fieldId`) REFERENCES `Field`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `fieldId` ON `FieldValue` (`fieldId`);