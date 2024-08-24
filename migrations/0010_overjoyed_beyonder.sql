ALTER TABLE `Companies` RENAME COLUMN `foundedYear` TO `yearOfEstablishment`;--> statement-breakpoint
ALTER TABLE `Companies` RENAME COLUMN `employeeCount` TO `companySize`;--> statement-breakpoint
ALTER TABLE `Companies` MODIFY COLUMN `yearOfEstablishment` varchar(4);--> statement-breakpoint
ALTER TABLE `Companies` ADD `areasOfExpertise` varchar(256);--> statement-breakpoint
ALTER TABLE `Companies` ADD `verifiedAt` datetime;