-- CreateTable
CREATE TABLE "Lunch" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "file" TEXT NOT NULL,

    CONSTRAINT "Lunch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Super" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "file" TEXT NOT NULL,

    CONSTRAINT "Super_pkey" PRIMARY KEY ("id")
);
