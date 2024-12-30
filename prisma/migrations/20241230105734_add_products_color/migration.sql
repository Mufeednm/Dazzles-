-- CreateTable
CREATE TABLE "products_color" (
    "productsColorId" SERIAL NOT NULL,
    "productsColor" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "products_color_pkey" PRIMARY KEY ("productsColorId")
);
