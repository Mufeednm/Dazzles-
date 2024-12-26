-- CreateTable
CREATE TABLE "customer_visit" (
    "visitId" SERIAL NOT NULL,
    "storeId" INTEGER,
    "customerId" INTEGER NOT NULL,
    "eventDate" TIMESTAMP(3),
    "sampleDate" TIMESTAMP(3),
    "boomerangDate" TIMESTAMP(3),
    "purchaseDate" TIMESTAMP(3),
    "cityId" INTEGER,
    "bridalEvents" TEXT NOT NULL,
    "generalOcassions" TEXT NOT NULL,
    "salesPersonId" INTEGER,
    "supportExecutiveId" INTEGER,
    "supervisorId" INTEGER,
    "catalystId" INTEGER,
    "consultantId" INTEGER,
    "serviceType" TEXT NOT NULL DEFAULT 'FSS',
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "remarks" TEXT,
    "createdBy" INTEGER,
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6),

    CONSTRAINT "customer_visit_pkey" PRIMARY KEY ("visitId")
);

-- AddForeignKey
ALTER TABLE "customer_visit" ADD CONSTRAINT "customer_visit_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;
