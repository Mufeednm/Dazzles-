-- This is an empty migration.
CREATE TABLE "master_events" (
    "eventId" SERIAL PRIMARY KEY,
    "eventName" VARCHAR(255) NOT NULL,
    "eventType" VARCHAR(100) NOT NULL,
    "eventDate" TIMESTAMP NOT NULL,
    "description" TEXT,
    "createdBy" INT NOT NULL,
    "create_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT FALSE
);
