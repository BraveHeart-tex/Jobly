ALTER TABLE `UserSkills` ADD `highlighted` boolean DEFAULT false;--> statement-breakpoint
CREATE INDEX `highlighted_index` ON `UserSkills` (`highlighted`);