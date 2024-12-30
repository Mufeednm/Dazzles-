-- CreateTable
CREATE TABLE "hsn" (
    "hsnId" SERIAL NOT NULL,
    "hsn" VARCHAR(255) NOT NULL,
    "taxPercent" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "hsn_pkey" PRIMARY KEY ("hsnId")
);
