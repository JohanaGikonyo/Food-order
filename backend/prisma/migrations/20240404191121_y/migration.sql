/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Food` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Lunch` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Super` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Food_id_key" ON "Food"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Lunch_id_key" ON "Lunch"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Super_id_key" ON "Super"("id");
