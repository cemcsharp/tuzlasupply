
import { prisma } from "../src/lib/prisma";
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  console.log('--- STARTING REAL IMPA SEEDING (TS) ---');
  
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
          price: 0,
          status: "ACTIVE",
          stock: 100
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
  });
