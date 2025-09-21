-- CreateTable
CREATE TABLE "Services" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "diagnostics" JSONB NOT NULL,
    "methods" JSONB NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);
