/*
  Warnings:

  - Added the required column `file_name` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "file_name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Image" ("id", "userId") SELECT "id", "userId" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
