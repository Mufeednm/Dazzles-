-- CreateTable
CREATE TABLE "expense_categoriesn" (
    "expenseCategoryId" SERIAL NOT NULL,
    "expenseCategory" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "expense_categoriesn_pkey" PRIMARY KEY ("expenseCategoryId")
);
