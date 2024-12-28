-- CreateTable
CREATE TABLE "terms_and_conditions" (
    "termsID" SERIAL NOT NULL,
    "terms_type" VARCHAR(255) NOT NULL,
    "terms" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "terms_and_conditions_pkey" PRIMARY KEY ("termsID")
);
