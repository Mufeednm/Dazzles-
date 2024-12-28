-- CreateTable
CREATE TABLE "city" (
    "cityId" SERIAL NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "city_pkey" PRIMARY KEY ("cityId")
);
