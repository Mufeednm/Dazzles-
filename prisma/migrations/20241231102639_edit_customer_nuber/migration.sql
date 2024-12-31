/*
  Warnings:

  - A unique constraint covering the columns `[customerMobile]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "customer_customerMobile_key" ON "customer"("customerMobile");
