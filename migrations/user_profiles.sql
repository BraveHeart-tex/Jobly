CREATE TABLE `EducationalBackgrounds` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`school` varchar(255) NOT NULL,
	`degree` varchar(255) NOT NULL,
	`startDate` date NOT NULL,
	`endDate` date,
	`city` varchar(100),
	`description` text,
	CONSTRAINT `EducationalBackgrounds_id` PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--> statement-breakpoint
CREATE TABLE `PersonalDetails` (
	`userId` int,
	`phoneNumber` varchar(20),
	`country` varchar(100),
	`city` varchar(100),
	`address` text,
	`postalCode` varchar(20),
	`drivingLicense` varchar(50),
	`placeOfBirth` varchar(100),
	`dateOfBirth` date,
	`professionalSummary` text
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--> statement-breakpoint
CREATE TABLE `UserSkills` (
	`userId` int NOT NULL,
	`skillId` int NOT NULL,
	`level` varchar(50) NOT NULL,
	CONSTRAINT `UserSkills_userId_skillId_pk` PRIMARY KEY(`userId`,`skillId`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--> statement-breakpoint
CREATE TABLE `WorkExperiences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`jobTitle` varchar(255) NOT NULL,
	`employer` varchar(255),
	`startDate` date NOT NULL,
	`endDate` date,
	`location` varchar(255),
	`description` text,
	CONSTRAINT `WorkExperiences_id` PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--> statement-breakpoint
DROP TABLE `UserProfiles`;--> statement-breakpoint
ALTER TABLE `EducationalBackgrounds` ADD CONSTRAINT `EducationalBackgrounds_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `PersonalDetails` ADD CONSTRAINT `PersonalDetails_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserSkills` ADD CONSTRAINT `UserSkills_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserSkills` ADD CONSTRAINT `UserSkills_skillId_Skills_id_fk` FOREIGN KEY (`skillId`) REFERENCES `Skills`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `WorkExperiences` ADD CONSTRAINT `WorkExperiences_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `userId` ON `EducationalBackgrounds` (`userId`);--> statement-breakpoint
CREATE INDEX `PersonalDetail_User_id` ON `PersonalDetails` (`userId`);--> statement-breakpoint
CREATE INDEX `userId` ON `UserSkills` (`userId`);--> statement-breakpoint
CREATE INDEX `skillId` ON `UserSkills` (`skillId`);--> statement-breakpoint
CREATE INDEX `userId` ON `WorkExperiences` (`userId`);