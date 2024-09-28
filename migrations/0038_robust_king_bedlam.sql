CREATE TABLE `UserHighlightedSkills` (
	`userId` int NOT NULL,
	`skillId` int NOT NULL,
	`order` int NOT NULL,
	CONSTRAINT `UserHighlightedSkills_userId_skillId_pk` PRIMARY KEY(`userId`,`skillId`)
);
--> statement-breakpoint
DROP INDEX `highlighted_index` ON `UserSkills`;--> statement-breakpoint
ALTER TABLE `UserHighlightedSkills` ADD CONSTRAINT `UserHighlightedSkills_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserHighlightedSkills` ADD CONSTRAINT `UserHighlightedSkills_skillId_Skills_id_fk` FOREIGN KEY (`skillId`) REFERENCES `Skills`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserSkills` DROP COLUMN `highlighted`;