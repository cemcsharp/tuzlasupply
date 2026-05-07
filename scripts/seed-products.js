const { PrismaClient } = require("./prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seed() {
  const products = [
    { name: "Santrifüj Pompa Yüzük", category: "Mekanik", unit: "Adet", price: 120.0 },
    { name: "Bronz Burç (50x70x100)", category: "Mekanik", unit: "Adet", price: 350.0 },
    { name: "Pano İçi Kontaktör 24V", category: "Elektrik", unit: "Adet", price: 85.0 },
    { name: "Navigasyon Lambası (İskele)", category: "Elektrik", unit: "Adet", price: 210.0 },
    { name: "Hidrolik Filtre (HP-06)", category: "Hidrolik", unit: "Adet", price: 145.0 },
    { name: "Sintine Vanası DN80 PN16", category: "Vana", unit: "Adet", price: 420.0 },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log("Products seeded!");
  process.exit(0);
}

seed().catch(e => {
  console.error(e);
  process.exit(1);
});
