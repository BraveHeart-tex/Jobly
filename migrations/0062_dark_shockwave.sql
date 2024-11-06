CREATE TABLE `CoverLetters` (
	`id` int AUTO_INCREMENT NOT NULL,
	`documentId` int NOT NULL,
	`content` text NOT NULL,
	`lastUpdated` timestamp,
	CONSTRAINT `CoverLetters_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `Documents` MODIFY COLUMN `type` enum('resume','cover_letter','training_certificate','presentation','project','article','portfolio','other') NOT NULL;--> statement-breakpoint
ALTER TABLE `Documents` MODIFY COLUMN `source` enum('builder','upload','rich_text') NOT NULL;--> statement-breakpoint
ALTER TABLE `CoverLetters` ADD CONSTRAINT `CoverLetters_documentId_Documents_id_fk` FOREIGN KEY (`documentId`) REFERENCES `Documents`(`id`) ON DELETE cascade ON UPDATE no action;