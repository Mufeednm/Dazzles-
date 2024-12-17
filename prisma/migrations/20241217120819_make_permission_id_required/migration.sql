/*
  Warnings:

  - Made the column `permissionID` on table `Role` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_permissionID_fkey";

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "permissionID" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_permissionID_fkey" FOREIGN KEY ("permissionID") REFERENCES "permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
