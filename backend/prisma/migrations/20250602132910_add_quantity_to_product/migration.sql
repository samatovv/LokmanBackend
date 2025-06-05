-- CreateTable
CREATE TABLE "Banners" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Banners_pkey" PRIMARY KEY ("id")
);
