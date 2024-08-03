CREATE TABLE `Companies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(512) NOT NULL,
	`bio` text,
	`website` varchar(512),
	`industry` varchar(255),
	`address` varchar(512),
	`foundedYear` varchar(50),
	`employeeCount` varchar(50),
	`logo` varchar(512),
	`coverImage` varchar(512),
	`description` text,
	`createdAt` datetime DEFAULT (now()),
	`updatedAt` datetime NOT NULL DEFAULT (now()),
	CONSTRAINT `Companies_id` PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--> statement-breakpoint
CREATE TABLE `DocumentSectionFieldValues` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fieldId` int NOT NULL,
	`value` text,
	CONSTRAINT `DocumentSectionFieldValues_id` PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--> statement-breakpoint
CREATE TABLE `DocumentSectionFields` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sectionId` int NOT NULL,
	`fieldName` varchar(100) NOT NULL,
	`fieldType` varchar(100) NOT NULL,
	`displayOrder` int NOT NULL,
	CONSTRAINT `DocumentSectionFields_id` PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--> statement-breakpoint
CREATE TABLE `DocumentSections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`documentId` int NOT NULL,
	`name` varchar(100) NOT NULL,
	`fieldsContainerType` enum('collapsible','static') NOT NULL DEFAULT 'static',
	`displayOrder` int NOT NULL,
	`internalSectionTag` enum('personal-details','professional-summary','employment-history','education','websites-social-links','skills','custom','internships','extra-curricular-activities','hobbies','references','courses','languages') NOT NULL,
	`defaultName` varchar(100) NOT NULL,
	`itemCountPerContainer` int NOT NULL DEFAULT 0,
	`metadata` text,
	CONSTRAINT `DocumentSections_id` PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--> statement-breakpoint
CREATE TABLE `Documents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(512) NOT NULL,
	`userId` int NOT NULL,
	`type` enum('resume','cover_letter') NOT NULL,
	`language` varchar(100) NOT NULL,
	`createdAt` datetime NOT NULL DEFAULT (now()),
	`updatedAt` datetime NOT NULL DEFAULT (now()),
	CONSTRAINT `Documents_id` PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--> statement-breakpoint
CREATE TABLE `JobApplications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`jobPostingId` int NOT NULL,
	`coverLetterId` int,
	`resumeId` int,
	`status` enum('pending','applied','rejected','interview','offer') DEFAULT 'applied',
	`appliedAt` datetime DEFAULT (now()),
	CONSTRAINT `JobApplications_id` PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--> statement-breakpoint
CREATE TABLE `JobPostingSkills` (
	`id` int AUTO_INCREMENT NOT NULL,
	`jobPostingId` int NOT NULL,
	`skillName` varchar(100) NOT NULL,
	CONSTRAINT `JobPostingSkills_id` PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--> statement-breakpoint
CREATE TABLE `JobPostings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`title` varchar(512) NOT NULL,
	`content` text,
	`location` varchar(255),
	`workType` enum('office','remote','hybrid','other') DEFAULT 'office',
	`salaryRange` varchar(50),
	`employmentType` enum('full-time','part-time','contract','internship','temporary','volunteer','other') DEFAULT 'full-time',
	`benefits` text,
	`createdAt` datetime DEFAULT (now()),
	`updatedAt` datetime NOT NULL DEFAULT (now()),
	CONSTRAINT `JobPostings_id` PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--> statement-breakpoint
CREATE TABLE `JobTrackerApplications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`status` enum('shortlist','applied','interview','offer','rejected') NOT NULL,
	`userId` int NOT NULL,
	`company` varchar(512) NOT NULL,
	`jobTitle` varchar(512) NOT NULL,
	`location` varchar(512) NOT NULL,
	`url` text,
	`salary` decimal(10,2),
	`notes` text,
	`jobDescription` text,
	`displayOrder` int NOT NULL,
	`createdAt` datetime NOT NULL DEFAULT (now()),
	`updatedAt` datetime NOT NULL DEFAULT (now()),
	CONSTRAINT `JobTrackerApplications_id` PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--> statement-breakpoint
CREATE TABLE `ResumeViews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`viewerCompanyId` int,
	`viewedResumeId` int NOT NULL,
	`viewedAt` datetime DEFAULT (now()),
	CONSTRAINT `ResumeViews_id` PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--> statement-breakpoint
CREATE TABLE `Sessions` (
	`id` varchar(255) NOT NULL,
	`user_id` int NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `Sessions_id` PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--> statement-breakpoint
CREATE TABLE `UserBookmarksJobPosting` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`jobPostingId` int NOT NULL,
	`bookmarkedAt` datetime DEFAULT (now()),
	CONSTRAINT `UserBookmarksJobPosting_id` PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--> statement-breakpoint
CREATE TABLE `UserFollowsCompany` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`userId` int NOT NULL,
	CONSTRAINT `UserFollowsCompany_id` PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--> statement-breakpoint
CREATE TABLE `UserProfiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`bio` text,
	`linkedin` varchar(255),
	`github` varchar(255),
	`portfolio` varchar(255),
	`image` varchar(512),
	`createdAt` datetime DEFAULT (now()),
	`updatedAt` datetime NOT NULL DEFAULT (now()),
	CONSTRAINT `UserProfiles_id` PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--> statement-breakpoint
CREATE TABLE `UserViewsJobPosting` (
	`id` int AUTO_INCREMENT NOT NULL,
	`viewerUserId` int NOT NULL,
	`viewedJobPostingId` int NOT NULL,
	`viewedAt` datetime DEFAULT (now()),
	CONSTRAINT `UserViewsJobPosting_id` PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--> statement-breakpoint
CREATE TABLE `Users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`firstName` varchar(255) NOT NULL,
	`lastName` varchar(255) NOT NULL,
	`hashedPassword` varchar(255) NOT NULL,
	`role` enum('employer','candidate') NOT NULL,
	CONSTRAINT `Users_id` PRIMARY KEY(`id`),
	CONSTRAINT `Users_email_unique` UNIQUE(`email`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--> statement-breakpoint
ALTER TABLE `DocumentSectionFieldValues` ADD CONSTRAINT `DocumentSectionFieldValues_fieldId_DocumentSectionFields_id_fk` FOREIGN KEY (`fieldId`) REFERENCES `DocumentSectionFields`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `DocumentSectionFields` ADD CONSTRAINT `DocumentSectionFields_sectionId_DocumentSections_id_fk` FOREIGN KEY (`sectionId`) REFERENCES `DocumentSections`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `DocumentSections` ADD CONSTRAINT `DocumentSections_documentId_Documents_id_fk` FOREIGN KEY (`documentId`) REFERENCES `Documents`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `JobApplications` ADD CONSTRAINT `JobApplications_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `JobApplications` ADD CONSTRAINT `JobApplications_jobPostingId_JobPostings_id_fk` FOREIGN KEY (`jobPostingId`) REFERENCES `JobPostings`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `JobApplications` ADD CONSTRAINT `JobApplications_coverLetterId_Documents_id_fk` FOREIGN KEY (`coverLetterId`) REFERENCES `Documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `JobApplications` ADD CONSTRAINT `JobApplications_resumeId_Documents_id_fk` FOREIGN KEY (`resumeId`) REFERENCES `Documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `JobPostingSkills` ADD CONSTRAINT `JobPostingSkills_jobPostingId_JobPostings_id_fk` FOREIGN KEY (`jobPostingId`) REFERENCES `JobPostings`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `JobPostings` ADD CONSTRAINT `JobPostings_companyId_Companies_id_fk` FOREIGN KEY (`companyId`) REFERENCES `Companies`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `JobTrackerApplications` ADD CONSTRAINT `JobTrackerApplications_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ResumeViews` ADD CONSTRAINT `ResumeViews_viewerCompanyId_Companies_id_fk` FOREIGN KEY (`viewerCompanyId`) REFERENCES `Companies`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ResumeViews` ADD CONSTRAINT `ResumeViews_viewedResumeId_Documents_id_fk` FOREIGN KEY (`viewedResumeId`) REFERENCES `Documents`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Sessions` ADD CONSTRAINT `Sessions_user_id_Users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserBookmarksJobPosting` ADD CONSTRAINT `UserBookmarksJobPosting_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserBookmarksJobPosting` ADD CONSTRAINT `UserBookmarksJobPosting_jobPostingId_JobPostings_id_fk` FOREIGN KEY (`jobPostingId`) REFERENCES `JobPostings`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserFollowsCompany` ADD CONSTRAINT `UserFollowsCompany_companyId_Companies_id_fk` FOREIGN KEY (`companyId`) REFERENCES `Companies`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserFollowsCompany` ADD CONSTRAINT `UserFollowsCompany_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserProfiles` ADD CONSTRAINT `UserProfiles_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserViewsJobPosting` ADD CONSTRAINT `UserViewsJobPosting_viewerUserId_Users_id_fk` FOREIGN KEY (`viewerUserId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserViewsJobPosting` ADD CONSTRAINT `UserViewsJobPosting_viewedJobPostingId_JobPostings_id_fk` FOREIGN KEY (`viewedJobPostingId`) REFERENCES `JobPostings`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `name` ON `Companies` (`name`);--> statement-breakpoint
CREATE INDEX `fieldId` ON `DocumentSectionFieldValues` (`fieldId`);--> statement-breakpoint
CREATE INDEX `sectionId` ON `DocumentSectionFields` (`sectionId`);--> statement-breakpoint
CREATE INDEX `documentId` ON `DocumentSections` (`documentId`);--> statement-breakpoint
CREATE INDEX `userId` ON `Documents` (`userId`);--> statement-breakpoint
CREATE INDEX `jobId` ON `JobApplications` (`jobPostingId`);--> statement-breakpoint
CREATE INDEX `userId` ON `JobApplications` (`userId`);--> statement-breakpoint
CREATE INDEX `status` ON `JobApplications` (`status`);--> statement-breakpoint
CREATE INDEX `coverLetterId` ON `JobApplications` (`coverLetterId`);--> statement-breakpoint
CREATE INDEX `jobId` ON `JobPostingSkills` (`jobPostingId`);--> statement-breakpoint
CREATE INDEX `title` ON `JobPostings` (`title`);--> statement-breakpoint
CREATE INDEX `companyId` ON `JobPostings` (`companyId`);--> statement-breakpoint
CREATE INDEX `location` ON `JobPostings` (`location`);--> statement-breakpoint
CREATE INDEX `workType` ON `JobPostings` (`workType`);--> statement-breakpoint
CREATE INDEX `employmentType` ON `JobPostings` (`employmentType`);--> statement-breakpoint
CREATE INDEX `viewerCompanyId` ON `ResumeViews` (`viewerCompanyId`);--> statement-breakpoint
CREATE INDEX `viewedResumeId` ON `ResumeViews` (`viewedResumeId`);--> statement-breakpoint
CREATE INDEX `user_id` ON `Sessions` (`user_id`);--> statement-breakpoint
CREATE INDEX `userId` ON `UserBookmarksJobPosting` (`userId`);--> statement-breakpoint
CREATE INDEX `jobId` ON `UserBookmarksJobPosting` (`jobPostingId`);--> statement-breakpoint
CREATE INDEX `userId` ON `UserFollowsCompany` (`userId`);--> statement-breakpoint
CREATE INDEX `companyId` ON `UserFollowsCompany` (`companyId`);--> statement-breakpoint
CREATE INDEX `userId` ON `UserProfiles` (`userId`);--> statement-breakpoint
CREATE INDEX `viewerUserId` ON `UserViewsJobPosting` (`viewerUserId`);--> statement-breakpoint
CREATE INDEX `viewedJobId` ON `UserViewsJobPosting` (`viewedJobPostingId`);--> statement-breakpoint
CREATE INDEX `email` ON `Users` (`email`);