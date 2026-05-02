import { PrismaClient } from "./prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
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
  console.log("Updating to Global Corporate Vision...");

  // Update Settings
  await prisma.settings.upsert({
    where: { id: 1 },
    update: {
      companyName: "Tuzla Supply",
      address: "Aydınlı Mah. Tuzla / İstanbul",
    },
    create: {
      id: 1,
      companyName: "Tuzla Supply",
      address: "Aydınlı Mah. Tuzla / İstanbul",
      phone: "+90 (216) 123 45 67",
      email: "info@tuzlasupply.com",
      taxOffice: "Tuzla V.D.",
      taxNumber: "1234567890",
      bankDetails: "TR00 0000 0000 0000 0000 0000 00\nAkbank - Tuzla Şubesi",
    },
  });

  // Update SiteContent with Corporate Vision
  await prisma.siteContent.upsert({
    where: { id: "main" },
    update: {
      heroTitle: "Global Kurumsal Tedarik & Endüstriyel Mükemmellik",
      heroSub: "İşletmeniz için uçtan uca profesyonel tedarik çözümleri.",
      aboutText: "Tuzla Supply olarak, endüstriyel tesisler, üretim hatları ve kurumsal işletmelerin her türlü malzeme ihtiyacını global standartlarda karşılıyoruz.",
      categories: JSON.stringify([
        { id: "1", title: "Endüstriyel Ekipman", description: "Üretim hatları, yedek parçalar, valfler ve otomasyon sistemleri." },
        { id: "2", title: "Kurumsal Tedarik", description: "İşletmenizin operasyonel devamlılığı için gerekli tüm sarf malzemeleri." },
        { id: "3", title: "İSG & Koruyucu Ekipman", description: "Uluslararası standartlarda iş sağlığı ve güvenliği donanımları." },
        { id: "4", title: "Bakım & Teknik Hizmet", description: "Periyodik bakım ve profesyonel teknik destek çözümleri." },
        { id: "5", title: "IT & Teknoloji Altyapısı", description: "Kurumsal teknoloji ihtiyaçları ve donanım tedariği." },
        { id: "6", title: "Hızlı Tüketim (FMCG)", description: "Ofis, tesis ve personel için gıda ve sarf malzeme ikmali." }
      ]),
    },
    create: {
      id: "main",
      heroTitle: "Global Kurumsal Tedarik & Endüstriyel Mükemmellik",
      heroSub: "İşletmeniz için uçtan uca profesyonel tedarik çözümleri.",
      aboutText: "Tuzla Supply olarak, endüstriyel tesisler, üretim hatları ve kurumsal işletmelerin her türlü malzeme ihtiyacını global standartlarda karşılıyoruz.",
      categories: JSON.stringify([
        { id: "1", title: "Endüstriyel Ekipman", description: "Üretim hatları, yedek parçalar, valfler ve otomasyon sistemleri." },
        { id: "2", title: "Kurumsal Tedarik", description: "İşletmenizin operasyonel devamlılığı için gerekli tüm sarf malzemeleri." },
        { id: "3", title: "İSG & Koruyucu Ekipman", description: "Uluslararası standartlarda iş sağlığı ve güvenliği donanımları." },
        { id: "4", title: "Bakım & Teknik Hizmet", description: "Periyodik bakım ve profesyonel teknik destek çözümleri." },
        { id: "5", title: "IT & Teknoloji Altyapısı", description: "Kurumsal teknoloji ihtiyaçları ve donanım tedariği." },
        { id: "6", title: "Hızlı Tüketim (FMCG)", description: "Ofis, tesis ve personel için gıda ve sarf malzeme ikmali." }
      ]),
    },
  });

  console.log("Corporate Vision seeding finished.");
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
