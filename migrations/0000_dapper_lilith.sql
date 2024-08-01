CREATE TABLE `Applications` (
    `id` int AUTO_INCREMENT NOT NULL,
    `userId` int NOT NULL,
    `jobId` int NOT NULL,
    `coverLetterId` int,
    `resumeId` int,
    `status` enum('pending','applied','rejected','interview','offer') DEFAULT 'applied',
                                `appliedAt` datetime DEFAULT (now()),
                                CONSTRAINT `Applications_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Documents` (
    `id` int AUTO_INCREMENT NOT NULL,
    `title` varchar(512) NOT NULL,
    `userId` int NOT NULL,
    `type` enum('resume','cover_letter') NOT NULL,
                             `language` varchar(100) NOT NULL,
                             `createdAt` datetime NOT NULL DEFAULT (now()),
                             `updatedAt` datetime NOT NULL DEFAULT (now()),
                             CONSTRAINT `Documents_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `DocumentSectionFields` (
    `id` int AUTO_INCREMENT NOT NULL,
    `sectionId` int NOT NULL,
    `fieldName` varchar(100) NOT NULL,
    `fieldType` varchar(100) NOT NULL,
    `displayOrder` int NOT NULL,
     CONSTRAINT `DocumentSectionFields_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `DocumentSectionFieldValues` (
    `id` int AUTO_INCREMENT NOT NULL,
    `fieldId` int NOT NULL,
    `value` text,
     CONSTRAINT `DocumentSectionFieldValues_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Jobs` (
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
                        CONSTRAINT `Jobs_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `JobSkills` (
    `id` int AUTO_INCREMENT NOT NULL,
    `jobId` int NOT NULL,
    `skillName` varchar(100) NOT NULL,
     CONSTRAINT `JobSkills_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ResumeViews` (
    `id` int AUTO_INCREMENT NOT NULL,
    `viewerCompanyId` int,
    `viewedResumeId` int NOT NULL,
    `viewedAt` datetime DEFAULT (now()),
     CONSTRAINT `ResumeViews_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Sessions` (
    `id` varchar(255) NOT NULL,
    `user_id` int NOT NULL,
    `expires_at` datetime NOT NULL,
     CONSTRAINT `Sessions_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Users` (
    `id` int AUTO_INCREMENT NOT NULL,
    `email` varchar(255) NOT NULL,
    `firstName` varchar(255) NOT NULL,
    `lastName` varchar(255) NOT NULL,
    `hashedPassword` varchar(255) NOT NULL,
    `role` enum('employer','candidate') NOT NULL,
                         CONSTRAINT `Users_id` PRIMARY KEY(`id`),
                         CONSTRAINT `Users_email_unique` UNIQUE(`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `UserBookmarksJob` (
    `id` int AUTO_INCREMENT NOT NULL,
    `userId` int NOT NULL,
    `jobId` int NOT NULL,
    `bookmarkedAt` datetime DEFAULT (now()),
     CONSTRAINT `UserBookmarksJob_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `UserFollowsCompany` (
    `id` int AUTO_INCREMENT NOT NULL,
    `companyId` int NOT NULL,
    `userId` int NOT NULL,
     CONSTRAINT `UserFollowsCompany_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `UserViewsJob` (
    `id` int AUTO_INCREMENT NOT NULL,
    `viewerUserId` int NOT NULL,
    `viewedJobId` int NOT NULL,
    `viewedAt` datetime DEFAULT (now()),
     CONSTRAINT `UserViewsJob_id` PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `Applications` ADD CONSTRAINT `Applications_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `Applications` ADD CONSTRAINT `Applications_jobId_Jobs_id_fk` FOREIGN KEY (`jobId`) REFERENCES `Jobs`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `Applications` ADD CONSTRAINT `Applications_coverLetterId_Documents_id_fk` FOREIGN KEY (`coverLetterId`) REFERENCES `Documents`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `Applications` ADD CONSTRAINT `Applications_resumeId_Documents_id_fk` FOREIGN KEY (`resumeId`) REFERENCES `Documents`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `Documents` ADD CONSTRAINT `Documents_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `DocumentSectionFields` ADD CONSTRAINT `DocumentSectionFields_sectionId_DocumentSections_id_fk` FOREIGN KEY (`sectionId`) REFERENCES `DocumentSections`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `DocumentSectionFieldValues` ADD CONSTRAINT `DocumentSectionFieldValues_fieldId_DocumentSectionFields_id_fk` FOREIGN KEY (`fieldId`) REFERENCES `DocumentSectionFields`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `Jobs` ADD CONSTRAINT `Jobs_companyId_Companies_id_fk` FOREIGN KEY (`companyId`) REFERENCES `Companies`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `JobSkills` ADD CONSTRAINT `JobSkills_jobId_Jobs_id_fk` FOREIGN KEY (`jobId`) REFERENCES `Jobs`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `JobTrackerApplications` ADD CONSTRAINT `JobTrackerApplications_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `ResumeViews` ADD CONSTRAINT `ResumeViews_viewerCompanyId_Companies_id_fk` FOREIGN KEY (`viewerCompanyId`) REFERENCES `Companies`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `ResumeViews` ADD CONSTRAINT `ResumeViews_viewedResumeId_Documents_id_fk` FOREIGN KEY (`viewedResumeId`) REFERENCES `Documents`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `DocumentSections` ADD CONSTRAINT `DocumentSections_documentId_Documents_id_fk` FOREIGN KEY (`documentId`) REFERENCES `Documents`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `Sessions` ADD CONSTRAINT `Sessions_user_id_Users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `UserBookmarksJob` ADD CONSTRAINT `UserBookmarksJob_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `UserBookmarksJob` ADD CONSTRAINT `UserBookmarksJob_jobId_Jobs_id_fk` FOREIGN KEY (`jobId`) REFERENCES `Jobs`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `UserFollowsCompany` ADD CONSTRAINT `UserFollowsCompany_companyId_Companies_id_fk` FOREIGN KEY (`companyId`) REFERENCES `Companies`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `UserFollowsCompany` ADD CONSTRAINT `UserFollowsCompany_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `UserProfiles` ADD CONSTRAINT `UserProfiles_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `UserViewsJob` ADD CONSTRAINT `UserViewsJob_viewerUserId_Users_id_fk` FOREIGN KEY (`viewerUserId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;
ALTER TABLE `UserViewsJob` ADD CONSTRAINT `UserViewsJob_viewedJobId_Jobs_id_fk` FOREIGN KEY (`viewedJobId`) REFERENCES `Jobs`(`id`) ON DELETE cascade ON UPDATE no action;
CREATE INDEX `jobId` ON `Applications` (`jobId`);
CREATE INDEX `userId` ON `Applications` (`userId`);
CREATE INDEX `status` ON `Applications` (`status`);
CREATE INDEX `coverLetterId` ON `Applications` (`coverLetterId`);
CREATE INDEX `name` ON `Companies` (`name`);
CREATE INDEX `userId` ON `Documents` (`userId`);
CREATE INDEX `sectionId` ON `DocumentSectionFields` (`sectionId`);
CREATE INDEX `fieldId` ON `DocumentSectionFieldValues` (`fieldId`);
CREATE INDEX `title` ON `Jobs` (`title`);
CREATE INDEX `companyId` ON `Jobs` (`companyId`);
CREATE INDEX `location` ON `Jobs` (`location`);
CREATE INDEX `workType` ON `Jobs` (`workType`);
CREATE INDEX `employmentType` ON `Jobs` (`employmentType`);
CREATE INDEX `jobId` ON `JobSkills` (`jobId`);
CREATE INDEX `viewerCompanyId` ON `ResumeViews` (`viewerCompanyId`);
CREATE INDEX `viewedResumeId` ON `ResumeViews` (`viewedResumeId`);
CREATE INDEX `documentId` ON `DocumentSections` (`documentId`);
CREATE INDEX `user_id` ON `Sessions` (`user_id`);
CREATE INDEX `email` ON `Users` (`email`);
CREATE INDEX `userId` ON `UserBookmarksJob` (`userId`);
CREATE INDEX `jobId` ON `UserBookmarksJob` (`jobId`);
CREATE INDEX `userId` ON `UserFollowsCompany` (`userId`);
CREATE INDEX `companyId` ON `UserFollowsCompany` (`companyId`);
CREATE INDEX `userId` ON `UserProfiles` (`userId`);
CREATE INDEX `viewerUserId` ON `UserViewsJob` (`viewerUserId`);
CREATE INDEX `viewedJobId` ON `UserViewsJob` (`viewedJobId`);