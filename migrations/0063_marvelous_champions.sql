ALTER TABLE `Users` ADD `googleId` varchar(255);--> statement-breakpoint
CREATE INDEX `googleId` ON `Users` (`googleId`);