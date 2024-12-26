-- AddForeignKey
ALTER TABLE "customer_visit" ADD CONSTRAINT "customer_visit_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
