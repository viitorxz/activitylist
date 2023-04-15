-- CreateTable
CREATE TABLE "activity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "doneAt" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "activity_id_key" ON "activity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "activity_name_key" ON "activity"("name");
