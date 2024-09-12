ALTER TABLE `JobPostingBenefits` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `JobPostingSkills` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `JobPostingBenefits` ADD `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `JobPostingSkills` ADD `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `JobPostingBenefits` DROP PRIMARY KEY, ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `JobPostingSkills` DROP PRIMARY KEY, ADD PRIMARY KEY(`id`);