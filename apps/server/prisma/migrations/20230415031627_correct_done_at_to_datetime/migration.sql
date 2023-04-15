-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_activity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "doneAt" DATETIME
);
INSERT INTO "new_activity" ("createdAt", "doneAt", "id", "name") SELECT "createdAt", "doneAt", "id", "name" FROM "activity";
DROP TABLE "activity";
ALTER TABLE "new_activity" RENAME TO "activity";
CREATE UNIQUE INDEX "activity_id_key" ON "activity"("id");
CREATE UNIQUE INDEX "activity_name_key" ON "activity"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
