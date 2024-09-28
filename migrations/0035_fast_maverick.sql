CREATE TABLE `UserBios` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`bio` varchar(2600) NOT NULL,
	CONSTRAINT `UserBios_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `UserBios` ADD CONSTRAINT `UserBios_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;