ALTER TABLE `UserCompanies` DROP INDEX `UserCompanies_userId_companyId_unique`;--> statement-breakpoint
ALTER TABLE `UserCompanies` ADD CONSTRAINT `UserCompanies_userId_unique` UNIQUE(`userId`);