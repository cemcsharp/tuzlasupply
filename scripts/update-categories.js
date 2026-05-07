const { PrismaClient } = require("./prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function updateCategories() {
  const newCategories = [
    {
      id: 1,
      title: "Gemi Kumanya ve İkmal Yönetimi",
      description: "Taze/kuru gıda ve yaşam mahalli ihtiyaçları için 7/24 kesintisiz ikmal çözümleri.",
      icon: "shopping-bag"
    },
    {
      id: 2,
      title: "Teknik Malzeme Tedarik ve Yönetimi",
      description: "Güverte ve makine ekipmanları için global markaların yedek parça tedariki.",
      icon: "settings"
    },
    {
      id: 3,
      title: "Gemi Tamir, Bakım ve Onarım",
      description: "Tersane ve limanlarda uzman ekiplerle teknik servis ve motor revizyonu.",
      icon: "wrench"
    },
    {
      id: 4,
      title: "Food Trading",
      description: "Uluslararası gıda ticareti kapsamında dökme sevkiyat ve lojistik yönetimi.",
      icon: "globe"
    },
    {
      id: 5,
      title: "Elektrik & Elektronik",
      description: "Navigasyon cihazları, pano malzemeleri ve gemi içi otomasyon çözümleri.",
      icon: "zap"
    },
    {
      id: 6,
      title: "IT & Ofis Teknolojileri",
      description: "Gemi ve merkez ofisler için yazılım, donanım ve ağ altyapı hizmetleri.",
      icon: "laptop"
    }
  ];

  await prisma.siteContent.update({
    where: { id: "main" },
    data: {
      categories: JSON.stringify(newCategories)
    }
  });

  console.log("Categories merged and updated successfully!");
  process.exit(0);
}

updateCategories().catch(e => {
  console.error(e);
  process.exit(1);
});
