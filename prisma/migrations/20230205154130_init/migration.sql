-- CreateTable
CREATE TABLE "stihi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stih" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "stihi_stih_key" ON "stihi"("stih");
