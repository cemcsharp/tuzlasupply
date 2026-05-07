import { PrismaClient } from "./prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Updating Hero Slides with new visuals (final fixed fields)...");

  await prisma.heroSlide.deleteMany({});

  await prisma.heroSlide.create({
    data: {
      title: "Global Tedarik Zinciri Yönetimi",
      subtitle: "Endüstriyel tesisler için kesintisiz ve hızlı ikmal çözümleri.",
      imageUrl: "/images/hero/slide1.png",
      order: 1,
    }
  });

  await prisma.heroSlide.create({
    data: {
      title: "Kurumsal İş Ortaklığı",
      subtitle: "Profesyonel kadromuzla işletmenizin stratejik çözüm ortağıyız.",
      imageUrl: "/images/hero/slide2.png",
      order: 2,
    }
  });

  await prisma.heroSlide.create({
    data: {
      title: "Endüstriyel Mükemmellik",
      subtitle: "En zorlu teknik malzeme taleplerinde global standartlar.",
      imageUrl: "/images/hero/slide3.png",
      order: 3,
    }
  });

  console.log("Hero slides updated successfully.");
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
