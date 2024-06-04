CREATE TABLE `Application` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`jobId` int NOT NULL,
	`coverLetter` text,
	`resume` varchar(255),
	`status` enum('pending','applied','rejected','interview','offer') DEFAULT 'applied',
	`appliedAt` datetime DEFAULT (now()),
	CONSTRAINT `Application_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Company` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(512) NOT NULL,
	`bio` text,
	`website` varchar(512),
	`followerCount` int DEFAULT 0,
	`industry` varchar(255),
	`address` varchar(512),
	`foundedYear` varchar(50),
	`employeeCount` varchar(50),
	`logo` varchar(512),
	`coverImage` varchar(512),
	`description` text,
	`createdAt` datetime DEFAULT (now()),
	`updatedAt` datetime DEFAULT (now()),
	CONSTRAINT `Company_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `CoverLetter` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`content` text NOT NULL,
	CONSTRAINT `CoverLetter_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Field` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sectionId` int NOT NULL,
	`name` varchar(100) NOT NULL,
	`dataType` varchar(100) NOT NULL,
	CONSTRAINT `Field_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Job` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`title` varchar(512) NOT NULL,
	`description` text,
	`location` varchar(255),
	`workType` enum('office','remote','hybrid','other') DEFAULT 'office',
	`salaryRange` varchar(50),
	`employmentType` enum('full-time','part-time','contract','internship','temporary','volunteer','other') DEFAULT 'full-time',
	`applicationCount` int DEFAULT 0,
	`benefits` text,
	`createdAt` datetime DEFAULT (now()),
	`updatedAt` datetime DEFAULT (now()),
	CONSTRAINT `Job_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `JobSkill` (
	`id` int AUTO_INCREMENT NOT NULL,
	`jobId` int NOT NULL,
	`skillName` varchar(100) NOT NULL,
	CONSTRAINT `JobSkill_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Resume` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(512) NOT NULL,
	`userId` int NOT NULL,
	`language` varchar(100) NOT NULL,
	`createdAt` datetime DEFAULT (now()),
	`updatedAt` datetime DEFAULT (now()),
	CONSTRAINT `Resume_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ResumeView` (
	`id` int AUTO_INCREMENT NOT NULL,
	`viewerCompanyId` int,
	`viewedUserId` int NOT NULL,
	`viewedAt` datetime NOT NULL,
	CONSTRAINT `ResumeView_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Section` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`displayOrder` int NOT NULL,
	CONSTRAINT `Section_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Session` (
	`id` varchar(255) NOT NULL,
	`user_id` int NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `Session_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `User` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`firstName` varchar(255) NOT NULL,
	`lastName` varchar(255) NOT NULL,
	`hashedPassword` varchar(255) NOT NULL,
	CONSTRAINT `User_id` PRIMARY KEY(`id`),
	CONSTRAINT `User_email_unique` UNIQUE(`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `UserBookmarksJob` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`jobId` int NOT NULL,
	`bookmarkedAt` datetime NOT NULL,
	CONSTRAINT `UserBookmarksJob_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `UserField` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userSectionId` int NOT NULL,
	`fieldId` int NOT NULL,
	`label` varchar(255) NOT NULL,
	CONSTRAINT `UserField_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `UserFollowsCompany` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`userId` int NOT NULL,
	CONSTRAINT `UserFollowsCompany_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `UserProfile` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`bio` text,
	`linkedin` varchar(255),
	`github` varchar(255),
	`portfolio` varchar(255),
	`image` varchar(512),
	`createdAt` datetime DEFAULT (now()),
	`updatedAt` datetime DEFAULT (now()),
	CONSTRAINT `UserProfile_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `UserSection` (
	`id` int AUTO_INCREMENT NOT NULL,
	`resumeId` int NOT NULL,
	`sectionId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`displayOrder` int NOT NULL,
	CONSTRAINT `UserSection_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `UserViewsJob` (
	`id` int AUTO_INCREMENT NOT NULL,
	`viewerUserId` int NOT NULL,
	`viewedJobId` int NOT NULL,
	CONSTRAINT `UserViewsJob_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `Application` ADD CONSTRAINT `Application_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `Application` ADD CONSTRAINT `Application_jobId_Job_id_fk` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `CoverLetter` ADD CONSTRAINT `CoverLetter_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `Field` ADD CONSTRAINT `Field_sectionId_Section_id_fk` FOREIGN KEY (`sectionId`) REFERENCES `Section`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `Job` ADD CONSTRAINT `Job_companyId_Company_id_fk` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `JobSkill` ADD CONSTRAINT `JobSkill_jobId_Job_id_fk` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `Resume` ADD CONSTRAINT `Resume_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `ResumeView` ADD CONSTRAINT `ResumeView_viewerCompanyId_Company_id_fk` FOREIGN KEY (`viewerCompanyId`) REFERENCES `Company`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `ResumeView` ADD CONSTRAINT `ResumeView_viewedUserId_User_id_fk` FOREIGN KEY (`viewedUserId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `Session` ADD CONSTRAINT `Session_user_id_User_id_fk` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `UserBookmarksJob` ADD CONSTRAINT `UserBookmarksJob_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `UserBookmarksJob` ADD CONSTRAINT `UserBookmarksJob_jobId_Job_id_fk` FOREIGN KEY (`jobId`) REFERENCES `Job`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `UserField` ADD CONSTRAINT `UserField_userSectionId_UserSection_id_fk` FOREIGN KEY (`userSectionId`) REFERENCES `UserSection`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `UserField` ADD CONSTRAINT `UserField_fieldId_Field_id_fk` FOREIGN KEY (`fieldId`) REFERENCES `Field`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `UserFollowsCompany` ADD CONSTRAINT `UserFollowsCompany_companyId_Company_id_fk` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `UserFollowsCompany` ADD CONSTRAINT `UserFollowsCompany_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `UserProfile` ADD CONSTRAINT `UserProfile_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `UserSection` ADD CONSTRAINT `UserSection_resumeId_Resume_id_fk` FOREIGN KEY (`resumeId`) REFERENCES `Resume`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `UserSection` ADD CONSTRAINT `UserSection_sectionId_Section_id_fk` FOREIGN KEY (`sectionId`) REFERENCES `Section`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `UserViewsJob` ADD CONSTRAINT `UserViewsJob_viewerUserId_User_id_fk` FOREIGN KEY (`viewerUserId`) REFERENCES `User`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `UserViewsJob` ADD CONSTRAINT `UserViewsJob_viewedJobId_Job_id_fk` FOREIGN KEY (`viewedJobId`) REFERENCES `Job`(`id`) ON DELETE cascade ON UPDATE no action;
CREATE INDEX `jobId` ON `Application` (`jobId`);
CREATE INDEX `userId` ON `Application` (`userId`);
CREATE INDEX `status` ON `Application` (`status`);
CREATE INDEX `name` ON `Company` (`name`);
CREATE INDEX `userId` ON `CoverLetter` (`userId`);
CREATE INDEX `sectionId` ON `Field` (`sectionId`);
CREATE INDEX `title` ON `Job` (`title`);
CREATE INDEX `companyId` ON `Job` (`companyId`);
CREATE INDEX `location` ON `Job` (`location`);
CREATE INDEX `workType` ON `Job` (`workType`);
CREATE INDEX `employmentType` ON `Job` (`employmentType`);
CREATE INDEX `jobId` ON `JobSkill` (`jobId`);
CREATE INDEX `userId` ON `Resume` (`userId`);
CREATE INDEX `viewerCompanyId` ON `ResumeView` (`viewerCompanyId`);
CREATE INDEX `viewedUserId` ON `ResumeView` (`viewedUserId`);
CREATE INDEX `user_id` ON `Session` (`user_id`);
CREATE INDEX `email` ON `User` (`email`);
CREATE INDEX `userId` ON `UserBookmarksJob` (`userId`);
CREATE INDEX `jobId` ON `UserBookmarksJob` (`jobId`);
CREATE INDEX `userSectionId` ON `UserField` (`userSectionId`);
CREATE INDEX `fieldId` ON `UserField` (`fieldId`);
CREATE INDEX `userId` ON `UserFollowsCompany` (`userId`);
CREATE INDEX `companyId` ON `UserFollowsCompany` (`companyId`);
CREATE INDEX `userId` ON `UserProfile` (`userId`);
CREATE INDEX `resumeId` ON `UserSection` (`resumeId`);
CREATE INDEX `sectionId` ON `UserSection` (`sectionId`);
CREATE INDEX `viewerUserId` ON `UserViewsJob` (`viewerUserId`);
CREATE INDEX `viewedJobId` ON `UserViewsJob` (`viewedJobId`);