-- AddForeignKey
ALTER TABLE "customer_visit" ADD CONSTRAINT "customer_visit_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("storeId") ON DELETE SET NULL ON UPDATE CASCADE;
