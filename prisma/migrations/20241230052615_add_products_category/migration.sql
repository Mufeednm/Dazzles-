-- CreateTable
CREATE TABLE "products_category" (
    "productsCategoryId" SERIAL NOT NULL,
    "productsCategory" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "products_category_pkey" PRIMARY KEY ("productsCategoryId")
);
