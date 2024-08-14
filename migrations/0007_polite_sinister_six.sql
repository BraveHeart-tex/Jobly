CREATE TABLE `EntityPermissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`entityId` int NOT NULL,
	`entityType` varchar(255) NOT NULL,
	`permissionId` int NOT NULL,
	`createdAt` datetime DEFAULT (now()),
	`updatedAt` datetime NOT NULL DEFAULT (now()),
	CONSTRAINT `EntityPermissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Permissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`permissionName` varchar(512) NOT NULL,
	CONSTRAINT `Permissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `RolePermissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`roleId` int NOT NULL,
	`permissionId` int NOT NULL,
	CONSTRAINT `RolePermissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Roles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(512) NOT NULL,
	`description` varchar(512) NOT NULL,
	`createdBy` int NOT NULL,
	`updatedBy` int,
	`createdAt` datetime DEFAULT (now()),
	`updatedAt` datetime NOT NULL DEFAULT (now()),
	CONSTRAINT `Roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `UserRoles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`roleId` int NOT NULL,
	`companyId` int,
	CONSTRAINT `UserRoles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `JobTrackerApplications` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `EntityPermissions` ADD CONSTRAINT `EntityPermissions_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `EntityPermissions` ADD CONSTRAINT `EntityPermissions_permissionId_Permissions_id_fk` FOREIGN KEY (`permissionId`) REFERENCES `Permissions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `RolePermissions` ADD CONSTRAINT `RolePermissions_roleId_Roles_id_fk` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `RolePermissions` ADD CONSTRAINT `RolePermissions_permissionId_Permissions_id_fk` FOREIGN KEY (`permissionId`) REFERENCES `Permissions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Roles` ADD CONSTRAINT `Roles_createdBy_Users_id_fk` FOREIGN KEY (`createdBy`) REFERENCES `Users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Roles` ADD CONSTRAINT `Roles_updatedBy_Users_id_fk` FOREIGN KEY (`updatedBy`) REFERENCES `Users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserRoles` ADD CONSTRAINT `UserRoles_userId_Users_id_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserRoles` ADD CONSTRAINT `UserRoles_roleId_Roles_id_fk` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserRoles` ADD CONSTRAINT `UserRoles_companyId_Companies_id_fk` FOREIGN KEY (`companyId`) REFERENCES `Companies`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `permissionName` ON `Permissions` (`permissionName`);--> statement-breakpoint
CREATE INDEX `roleId` ON `RolePermissions` (`roleId`);--> statement-breakpoint
CREATE INDEX `permissionId` ON `RolePermissions` (`permissionId`);--> statement-breakpoint
CREATE INDEX `userId` ON `UserRoles` (`userId`);--> statement-breakpoint
CREATE INDEX `roleId` ON `UserRoles` (`roleId`);--> statement-breakpoint
CREATE INDEX `companyId` ON `UserRoles` (`companyId`);--> statement-breakpoint
CREATE INDEX `userId` ON `JobTrackerApplications` (`userId`);