/*
  Warnings:

  - The primary key for the `stihi` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_stihi" (
    "id" INTEGER NOT NULL,
    "stih" TEXT NOT NULL
);
INSERT INTO "new_stihi" ("id", "stih") SELECT "id", "stih" FROM "stihi";
DROP TABLE "stihi";
ALTER TABLE "new_stihi" RENAME TO "stihi";
CREATE UNIQUE INDEX "stihi_stih_key" ON "stihi"("stih");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
