-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "permissionID" INTEGER;

-- CreateTable
CREATE TABLE "permission" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "permission_name_key" ON "permission"("name");

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_permissionID_fkey" FOREIGN KEY ("permissionID") REFERENCES "permission"("id") ON DELETE SET NULL ON UPDATE CASCADE;
