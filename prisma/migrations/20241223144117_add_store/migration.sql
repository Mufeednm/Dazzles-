/*
  Warnings:

  - You are about to drop the column `userStore` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "userStore";

-- CreateTable
CREATE TABLE "store" (
    "storeId" SERIAL NOT NULL,
    "storeName" VARCHAR(255) NOT NULL,
    "storeShortName" VARCHAR(255) NOT NULL,
    "storeAddress" VARCHAR(255) NOT NULL,
    "storeLattitude" VARCHAR(255) NOT NULL,
    "storeLongitude" VARCHAR(255) NOT NULL,
    "storePhone" VARCHAR(255) NOT NULL,
    "storeGST" VARCHAR(255) NOT NULL,
    "storeAPIKey" VARCHAR(255) NOT NULL,
    "alternateStoreName" VARCHAR(255) NOT NULL,
    "alternateStoreAddress" VARCHAR(255) NOT NULL,
    "alternateStoreGST" VARCHAR(255) NOT NULL,
    "invoicePrefix" VARCHAR(255) NOT NULL,
    "invoiceNumber" INTEGER NOT NULL,
    "whatsappNumber" VARCHAR(255) NOT NULL,
    "whatsappAPI" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "store_pkey" PRIMARY KEY ("storeId")
);

-- CreateTable
CREATE TABLE "store_users" (
    "storeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "store_users_pkey" PRIMARY KEY ("storeId","userId")
);

-- AddForeignKey
ALTER TABLE "store_users" ADD CONSTRAINT "store_users_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("storeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_users" ADD CONSTRAINT "store_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
