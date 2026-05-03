const { PrismaClient } = require('../prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const columns = await prisma.$queryRaw`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'RfqRequest'
    `;
    console.log("Columns in RfqRequest:", columns);
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}

check();
