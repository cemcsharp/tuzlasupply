
const { PrismaClient } = require('../prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- STARTING REAL IMPA SEEDING (FINAL) ---');
  
  const dataPath = path.join(__dirname, '../src/data/impa_master.json');
  const impaData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  // Clear existing products
  await prisma.product.deleteMany({});
  console.log('Cleared existing products.');

  for (const item of impaData) {
    try {
      await prisma.product.create({
        data: {
          name: item.name,
          category: item.category,
          sku: item.code,
          unit: item.unit || "PCS",
          price: 0
        }
      });
      console.log(`Added: [${item.code}] ${item.name}`);
    } catch (err) {
      console.error(`Failed to add ${item.code}:`, err);
    }
  }

  console.log('--- SEEDING COMPLETED ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
