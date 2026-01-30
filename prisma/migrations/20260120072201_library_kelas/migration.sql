/*
  Warnings:

  - Added the required column `borrower` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `loan` ADD COLUMN `borrower` VARCHAR(191) NOT NULL;
