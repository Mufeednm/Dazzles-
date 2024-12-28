/*
  Warnings:

  - You are about to alter the column `eventName` on the `master_events` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Made the column `eventName` on table `master_events` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "master_events" ALTER COLUMN "eventName" SET NOT NULL,
ALTER COLUMN "eventName" SET DATA TYPE VARCHAR(255);

-- CreateTable
CREATE TABLE "master_supplier_categories" (
    "categoryId" SERIAL NOT NULL,
    "categoryName" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "master_supplier_categories_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "master_lead_source" (
    "sourceId" SERIAL NOT NULL,
    "source" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "master_lead_source_pkey" PRIMARY KEY ("sourceId")
);

-- CreateTable
CREATE TABLE "master_color_category" (
    "colorcategoryId" SERIAL NOT NULL,
    "colorcategory" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "master_color_category_pkey" PRIMARY KEY ("colorcategoryId")
);

-- CreateTable
CREATE TABLE "master_material" (
    "materialId" SERIAL NOT NULL,
    "materialName" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "master_material_pkey" PRIMARY KEY ("materialId")
);

-- CreateTable
CREATE TABLE "master_price_range" (
    "rangeId" SERIAL NOT NULL,
    "range" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "master_price_range_pkey" PRIMARY KEY ("rangeId")
);
