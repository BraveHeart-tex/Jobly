ALTER TABLE `Companies` MODIFY COLUMN `bio` text NOT NULL;--> statement-breakpoint
ALTER TABLE `UserCompanies` ADD CONSTRAINT `UserCompanies_userId_companyId_unique` UNIQUE(`userId`,`companyId`);