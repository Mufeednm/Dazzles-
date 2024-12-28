-- CreateTable
CREATE TABLE "master_events" (
    "eventId" SERIAL NOT NULL,
    "eventName" TEXT,
    "eventType" TEXT DEFAULT 'BRIDAL',
    "categoryId" INTEGER,
    "create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(6),

    CONSTRAINT "master_events_pkey" PRIMARY KEY ("eventId")
);
