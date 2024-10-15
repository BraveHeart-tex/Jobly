CREATE TABLE `Cities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`countryId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `Cities_id` PRIMARY KEY(`id`)
) engine=InnoDB;
--> statement-breakpoint
CREATE TABLE `Countries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `Countries_id` PRIMARY KEY(`id`)
) engine=InnoDB;
--> statement-breakpoint
CREATE TABLE `Schools` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `School_id` PRIMARY KEY(`id`)
) engine=InnoDB;
--> statement-breakpoint
CREATE TABLE `UserProfiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`title` varchar(255),
	`sector` varchar(255),
	`presentedSchoolId` int,
	`countryId` int,
	`cityId` int,
	`websiteLink` varchar(255),
	`websiteLinkText` varchar(255),
	CONSTRAINT `UserProfiles_id` PRIMARY KEY(`id`)
) engine=InnoDB;
--> statement-breakpoint
ALTER TABLE `Users` ADD `avatarUrl` varchar(2048);--> statement-breakpoint
ALTER TABLE `Cities` ADD CONSTRAINT `Cities_countryId_Countries_id_fk` FOREIGN KEY (`countryId`) REFERENCES `Countries`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserProfiles` ADD CONSTRAINT `UserProfiles_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserProfiles` ADD CONSTRAINT `UserProfiles_countryId_Countries_id_fk` FOREIGN KEY (`countryId`) REFERENCES `Countries`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `countryId` ON `Cities` (`countryId`);--> statement-breakpoint
CREATE INDEX `name` ON `Cities` (`name`);--> statement-breakpoint
CREATE INDEX `name` ON `Countries` (`name`);--> statement-breakpoint
CREATE INDEX `name` ON `Schools` (`name`);--> statement-breakpoint
CREATE INDEX `userId` ON `UserProfiles` (`userId`);--> statement-breakpoint
CREATE INDEX `countryId` ON `UserProfiles` (`countryId`);--> statement-breakpoint
CREATE INDEX `cityId` ON `UserProfiles` (`cityId`);