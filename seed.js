const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seed() {
  // 1. Seed Admin
  const hashedPassword = await bcrypt.hash("admin123456", 10);
  await prisma.user.upsert({
    where: { email: "admin@tuzlasupply.com" },
    update: { password: hashedPassword },
    create: {
      email: "admin@tuzlasupply.com",
      password: hashedPassword,
      name: "Tuzla Admin",
    },
  });

  // 2. Seed Hero Slides
  const slides = [
    {
      title: "Global Maritime Supply Solutions",
      subtitle: "Professional procurement for vessels worldwide.",
      imageUrl: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=1920&auto=format&fit=crop",
      order: 0
    },
    {
      title: "Fast Delivery in Tuzla & Beyond",
      subtitle: "We ensure your spare parts reach your ship on time.",
      imageUrl: "https://images.unsplash.com/photo-1559139225-421a021395df?q=80&w=1920&auto=format&fit=crop",
      order: 1
    },
    {
      title: "7/24 Technical Support",
      subtitle: "Always available for your engine and deck requirements.",
      imageUrl: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1920&auto=format&fit=crop",
      order: 2
    }
  ];

  for (const slide of slides) {
    await prisma.heroSlide.create({ data: slide });
  }

  console.log("Admin and Hero Slides seeded!");
  process.exit(0);
}

seed().catch(e => {
  console.error(e);
  process.exit(1);
});
