CREATE TABLE `FieldValue` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fieldId` int NOT NULL,
	CONSTRAINT `FieldValue_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `FieldValue` ADD CONSTRAINT `FieldValue_fieldId_Field_id_fk` FOREIGN KEY (`fieldId`) REFERENCES `Field`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint


CREATE TABLE `FieldValue` (
    `id` int AUTO_INCREMENT NOT NULL,
    `fieldId` int NOT NULL,
    CONSTRAINT `FieldValue_id` PRIMARY KEY(`id`),
    CONSTRAINT `Field_id` FOREIGN KEY (`fieldId`) REFERENCES `Field` (`id`) ON DELETE CASCADE
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 CREATE INDEX `fieldId` ON `FieldValue` (`fieldId`);