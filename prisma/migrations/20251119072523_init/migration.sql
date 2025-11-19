-- CreateTable
CREATE TABLE "sklad" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "sklad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "okna" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "img" TEXT NOT NULL DEFAULT 'no_image',
    "skladId" INTEGER,

    CONSTRAINT "okna_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "production" (
    "id" SERIAL NOT NULL,
    "skladId" INTEGER NOT NULL,

    CONSTRAINT "production_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "okna" ADD CONSTRAINT "okna_skladId_fkey" FOREIGN KEY ("skladId") REFERENCES "sklad"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production" ADD CONSTRAINT "production_skladId_fkey" FOREIGN KEY ("skladId") REFERENCES "sklad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
