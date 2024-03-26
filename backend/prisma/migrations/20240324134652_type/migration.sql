/*
  Warnings:

  - A unique constraint covering the columns `[password]` on the table `Verify` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Verify_password_key" ON "Verify"("password");
