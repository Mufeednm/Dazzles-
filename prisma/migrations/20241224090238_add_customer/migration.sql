-- CreateTable
CREATE TABLE "customer" (
    "customerId" SERIAL NOT NULL,
    "customerName" VARCHAR(255) NOT NULL,
    "customerEmail" VARCHAR(255) NOT NULL,
    "customerMobile" VARCHAR(255) NOT NULL,
    "customerAddress" VARCHAR(255) NOT NULL,
    "baseStore" INTEGER NOT NULL,
    "customerMembership" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("customerId")
);
