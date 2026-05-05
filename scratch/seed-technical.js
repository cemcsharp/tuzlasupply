require('dotenv').config();
const { PrismaClient } = require('../prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 1
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const parts = [
    // MAN L23/30H
    { partNumber: '601.01.12', name: 'Piston Ring Set', brand: 'MAN B&W', model: 'L23/30H', description: 'Complete set of compression and oil scraper rings for L23/30H engines.', impaCode: '6010112' },
    { partNumber: '601.02.04', name: 'Cylinder Liner', brand: 'MAN B&W', model: 'L23/30H', description: 'Cast iron cylinder liner with flame ring grooves.', impaCode: '6010204' },
    { partNumber: '601.04.05', name: 'Fuel Injector Nozzle', brand: 'MAN B&W', model: 'L23/30H', description: 'Precision fuel injection nozzle, multi-hole type.', impaCode: '6010405' },
    
    // Wärtsilä 32
    { partNumber: 'W32-120-001', name: 'Cylinder Head Gasket', brand: 'Wärtsilä', model: 'W32', description: 'High-temperature cylinder head sealing gasket.', impaCode: 'W32120' },
    { partNumber: 'W32-040-001', name: 'Fuel Injection Pump', brand: 'Wärtsilä', model: 'W32', description: 'High-pressure fuel injection pump assembly.', impaCode: 'W32040' },
    
    // Alfa Laval
    { partNumber: '554212-01', name: 'Sealing Ring', brand: 'Alfa Laval', model: 'S-Type', description: 'NBR sealing ring for centrifugal separator bowls.', impaCode: '554212' },
    { partNumber: '553145-02', name: 'Friction Pad', brand: 'Alfa Laval', model: 'S-Type', description: 'Friction clutch pad for separator motor drive.', impaCode: '553145' },
    
    // Generic IMPA
    { partNumber: '750501', name: 'Bronze Globe Valve (JIS F7301)', brand: 'Generic', model: '5K 15mm', description: 'Maritime standard bronze globe valve for steam and water.', impaCode: '750501' },
    { partNumber: '330101', name: 'Centrifugal Pump (Self-Priming)', brand: 'Generic', model: 'Horizontal', description: 'Self-priming centrifugal pump for bilge and ballast services.', impaCode: '330101' }
  ];

  console.log('--- Teknik Veri Yükleme Başladı (Production Adapter Mode) ---');

  for (const part of parts) {
    try {
      await prisma.technicalPart.upsert({
        where: { partNumber: part.partNumber },
        update: part,
        create: part
      });
      console.log(`✓ Eklendi: ${part.partNumber} - ${part.name}`);
    } catch (err) {
      console.error(`✗ Hata (${part.partNumber}):`, err.message);
    }
  }

  console.log('--- İşlem Tamamlandı ---');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
