-- Companies definition

CREATE TABLE `Companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  `bio` text NOT NULL,
  `website` varchar(2048) DEFAULT NULL,
  `industry` varchar(255) DEFAULT NULL,
  `address` varchar(512) DEFAULT NULL,
  `yearOfEstablishment` varchar(4) NOT NULL,
  `companySize` varchar(50) NOT NULL,
  `logo` varchar(2048) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NOT NULL,
  `areasOfExpertise` varchar(256) DEFAULT NULL,
  `verifiedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- EntityPermissions definition

CREATE TABLE `EntityPermissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `entityId` int NOT NULL,
  `entityType` varchar(255) NOT NULL,
  `permissionId` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `EntityPermissions_userId_Users_id_fk` (`userId`),
  KEY `EntityPermissions_permissionId_Permissions_id_fk` (`permissionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- JobPostingSkills definition

CREATE TABLE `JobPostingSkills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jobPostingId` int NOT NULL,
  `skillId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobPostingId` (`jobPostingId`),
  KEY `skillId` (`skillId`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Permissions definition

CREATE TABLE `Permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `permissionName` varchar(512) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `permissionName` (`permissionName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- RolePermissions definition

CREATE TABLE `RolePermissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleId` int NOT NULL,
  `permissionId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  KEY `permissionId` (`permissionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Roles definition

CREATE TABLE `Roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  `description` varchar(512) NOT NULL,
  `createdBy` int NOT NULL,
  `updatedBy` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Roles_createdBy_Users_id_fk` (`createdBy`),
  KEY `Roles_updatedBy_Users_id_fk` (`updatedBy`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Skills definition

CREATE TABLE `Skills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Skills_name_unique` (`name`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- UserBios definition

CREATE TABLE `UserBios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `bio` varchar(2600) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- UserHighlightedSkills definition

CREATE TABLE `UserHighlightedSkills` (
  `userId` int NOT NULL,
  `skillId` int NOT NULL,
  `order` int NOT NULL,
  PRIMARY KEY (`userId`,`skillId`),
  KEY `UserHighlightedSkills_skillId_Skills_id_fk` (`skillId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- UserRoles definition

CREATE TABLE `UserRoles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `roleId` int NOT NULL,
  `companyId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `roleId` (`roleId`),
  KEY `companyId` (`companyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Users definition

CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `hashedPassword` varchar(255) NOT NULL,
  `role` enum('employer','candidate') NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Users_email_unique` (`email`),
  KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- CompanyUsers definition

CREATE TABLE `CompanyUsers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `companyId` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `companyId` (`companyId`),
  CONSTRAINT `CompanyUsers_companyId_Companies_id_fk` FOREIGN KEY (`companyId`) REFERENCES `Companies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `CompanyUsers_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Documents definition

CREATE TABLE `Documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(512) NOT NULL,
  `userId` int NOT NULL,
  `type` enum('resume','cover_letter') NOT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Documents_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- EducationalBackgrounds definition

CREATE TABLE `EducationalBackgrounds` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `school` varchar(255) NOT NULL,
  `degree` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `EducationalBackgrounds_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- JobPostings definition

CREATE TABLE `JobPostings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `companyId` int NOT NULL,
  `title` varchar(512) NOT NULL,
  `location` varchar(255) NOT NULL,
  `workType` enum('office','remote','hybrid','other') NOT NULL DEFAULT 'office',
  `salaryRange` varchar(50) DEFAULT NULL,
  `employmentType` enum('full-time','part-time','contract','internship','temporary','volunteer','other') NOT NULL DEFAULT 'full-time',
  `postedAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL,
  `expiresAt` timestamp NOT NULL,
  `status` enum('draft','published') NOT NULL,
  `postingContent` text NOT NULL,
  `createdUserId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `title` (`title`),
  KEY `companyId` (`companyId`),
  KEY `location` (`location`),
  KEY `workType` (`workType`),
  KEY `employmentType` (`employmentType`),
  KEY `JobPostings_createdUserId_Users_id_fk` (`createdUserId`),
  CONSTRAINT `JobPostings_companyId_Companies_id_fk` FOREIGN KEY (`companyId`) REFERENCES `Companies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `JobPostings_createdUserId_Users_id_fk` FOREIGN KEY (`createdUserId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- JobTrackerApplications definition

CREATE TABLE `JobTrackerApplications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` enum('shortlist','applied','interview','offer','rejected') NOT NULL,
  `userId` int NOT NULL,
  `company` varchar(512) NOT NULL,
  `jobTitle` varchar(512) NOT NULL,
  `location` varchar(512) NOT NULL,
  `url` text,
  `salary` decimal(10,2) DEFAULT NULL,
  `notes` text,
  `jobDescription` text,
  `displayOrder` int NOT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `status` (`status`),
  CONSTRAINT `JobTrackerApplications_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- ResumeViews definition

CREATE TABLE `ResumeViews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `viewerCompanyId` int DEFAULT NULL,
  `viewedResumeId` int NOT NULL,
  `viewedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `viewerCompanyId` (`viewerCompanyId`),
  KEY `viewedResumeId` (`viewedResumeId`),
  CONSTRAINT `ResumeViews_viewedResumeId_Documents_id_fk` FOREIGN KEY (`viewedResumeId`) REFERENCES `Documents` (`id`),
  CONSTRAINT `ResumeViews_viewerCompanyId_Companies_id_fk` FOREIGN KEY (`viewerCompanyId`) REFERENCES `Companies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Sessions definition

CREATE TABLE `Sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `expires_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Sessions_user_id_Users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- UserBookmarksJobPosting definition

CREATE TABLE `UserBookmarksJobPosting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `jobPostingId` int NOT NULL,
  `bookmarkedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `jobId` (`jobPostingId`),
  CONSTRAINT `UserBookmarksJobPosting_jobPostingId_JobPostings_id_fk` FOREIGN KEY (`jobPostingId`) REFERENCES `JobPostings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `UserBookmarksJobPosting_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- UserFollowsCompany definition

CREATE TABLE `UserFollowsCompany` (
  `id` int NOT NULL AUTO_INCREMENT,
  `companyId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `companyId` (`companyId`),
  CONSTRAINT `UserFollowsCompany_companyId_Companies_id_fk` FOREIGN KEY (`companyId`) REFERENCES `Companies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `UserFollowsCompany_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- UserSkills definition

CREATE TABLE `UserSkills` (
  `userId` int NOT NULL,
  `skillId` int NOT NULL,
  `level` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userId`,`skillId`),
  KEY `userId` (`userId`),
  KEY `skillId` (`skillId`),
  CONSTRAINT `UserSkills_skillId_Skills_id_fk` FOREIGN KEY (`skillId`) REFERENCES `Skills` (`id`) ON DELETE CASCADE,
  CONSTRAINT `UserSkills_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- UserViewsJobPosting definition

CREATE TABLE `UserViewsJobPosting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `viewerUserId` int NOT NULL,
  `viewedJobPostingId` int NOT NULL,
  `viewedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `viewerUserId` (`viewerUserId`),
  KEY `viewedJobId` (`viewedJobPostingId`),
  CONSTRAINT `UserViewsJobPosting_viewedJobPostingId_JobPostings_id_fk` FOREIGN KEY (`viewedJobPostingId`) REFERENCES `JobPostings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `UserViewsJobPosting_viewerUserId_Users_id_fk` FOREIGN KEY (`viewerUserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- WorkExperiences definition

CREATE TABLE `WorkExperiences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `jobTitle` varchar(255) NOT NULL,
  `employer` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text,
  `employmentType` enum('full-time','part-time','contract','internship','temporary','volunteer','other') NOT NULL DEFAULT 'full-time',
  `workType` enum('office','remote','hybrid','other') NOT NULL DEFAULT 'office',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `WorkExperiences_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- DocumentSections definition

CREATE TABLE `DocumentSections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `documentId` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `fieldsContainerType` enum('collapsible','static') NOT NULL DEFAULT 'static',
  `displayOrder` int NOT NULL,
  `internalSectionTag` enum('personal-details','professional-summary','employment-history','education','websites-social-links','skills','custom','internships','extra-curricular-activities','hobbies','references','courses','languages') NOT NULL,
  `defaultName` varchar(100) NOT NULL,
  `itemCountPerContainer` int NOT NULL DEFAULT '0',
  `metadata` text,
  PRIMARY KEY (`id`),
  KEY `documentId` (`documentId`),
  CONSTRAINT `DocumentSections_documentId_Documents_id_fk` FOREIGN KEY (`documentId`) REFERENCES `Documents` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- JobApplications definition

CREATE TABLE `JobApplications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `jobPostingId` int NOT NULL,
  `coverLetterId` int DEFAULT NULL,
  `resumeId` int DEFAULT NULL,
  `status` enum('pending','applied','rejected','interview','offer') DEFAULT 'applied',
  `appliedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `JobApplications_resumeId_Documents_id_fk` (`resumeId`),
  KEY `jobId` (`jobPostingId`),
  KEY `userId` (`userId`),
  KEY `status` (`status`),
  KEY `coverLetterId` (`coverLetterId`),
  CONSTRAINT `JobApplications_coverLetterId_Documents_id_fk` FOREIGN KEY (`coverLetterId`) REFERENCES `Documents` (`id`),
  CONSTRAINT `JobApplications_jobPostingId_JobPostings_id_fk` FOREIGN KEY (`jobPostingId`) REFERENCES `JobPostings` (`id`),
  CONSTRAINT `JobApplications_resumeId_Documents_id_fk` FOREIGN KEY (`resumeId`) REFERENCES `Documents` (`id`),
  CONSTRAINT `JobApplications_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- DocumentSectionFields definition

CREATE TABLE `DocumentSectionFields` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sectionId` int NOT NULL,
  `fieldName` varchar(100) NOT NULL,
  `fieldType` varchar(100) NOT NULL,
  `displayOrder` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sectionId` (`sectionId`),
  CONSTRAINT `DocumentSectionFields_sectionId_DocumentSections_id_fk` FOREIGN KEY (`sectionId`) REFERENCES `DocumentSections` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=609 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- DocumentSectionFieldValues definition

CREATE TABLE `DocumentSectionFieldValues` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fieldId` int NOT NULL,
  `value` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fieldId` (`fieldId`),
  CONSTRAINT `DocumentSectionFieldValues_fieldId_DocumentSectionFields_id_fk` FOREIGN KEY (`fieldId`) REFERENCES `DocumentSectionFields` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=609 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;