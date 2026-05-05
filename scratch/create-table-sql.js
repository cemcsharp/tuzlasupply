require('dotenv').config();
const { Client } = require('pg');

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  
  const sql = `
    CREATE TABLE IF NOT EXISTS "TechnicalPart" (
      "id" TEXT NOT NULL,
      "partNumber" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "brand" TEXT NOT NULL,
      "model" TEXT,
      "description" TEXT,
      "impaCode" TEXT,
      "technicalSpecs" TEXT,
      "diagramUrl" TEXT,
      "manualUrl" TEXT,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL,

      CONSTRAINT "TechnicalPart_pkey" PRIMARY KEY ("id")
    );

    CREATE UNIQUE INDEX IF NOT EXISTS "TechnicalPart_partNumber_key" ON "TechnicalPart"("partNumber");
    CREATE INDEX IF NOT EXISTS "TechnicalPart_partNumber_idx" ON "TechnicalPart"("partNumber");
    CREATE INDEX IF NOT EXISTS "TechnicalPart_impaCode_idx" ON "TechnicalPart"("impaCode");
    CREATE INDEX IF NOT EXISTS "TechnicalPart_brand_model_idx" ON "TechnicalPart"("brand", "model");
  `;

  console.log('--- Tablo Oluşturuluyor... ---');
  await client.query(sql);
  console.log('--- Tablo Başarıyla Oluşturuldu! ---');
  
  await client.end();
}

main().catch(console.error);
