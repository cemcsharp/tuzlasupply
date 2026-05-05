require('dotenv').config();
const { PrismaClient } = require('../prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const count = await prisma.technicalPart.count();
  const samples = await prisma.technicalPart.findMany({ take: 5 });
  
  console.log(`--- Veritabanı Durumu ---`);
  console.log(`Toplam Teknik Parça: ${count}`);
  console.log(`Örnek Parçalar:`, samples.map(s => `${s.brand} - ${s.name} (${s.partNumber})`));
}

main().finally(async () => {
  await prisma.$disconnect();
  await pool.end();
});
