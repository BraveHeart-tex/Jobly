ALTER TABLE `Documents` ADD `mimeType` varchar(512);--> statement-breakpoint
CREATE INDEX `source` ON `Documents` (`source`);