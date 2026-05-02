"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const [totalRfqs, pendingRfqs, totalCustomers, recentRfqs] = await Promise.all([
    prisma.rfqRequest.count(),
    prisma.rfqRequest.count({ where: { status: "pending" } }),
    prisma.rfqRequest.groupBy({ by: ["companyName"] }).then(res => res.length),
    prisma.rfqRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 5
    })
  ]);

  // Monthly Data for Chart
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  
  const rfqs = await prisma.rfqRequest.findMany({
    where: {
      createdAt: { gte: sixMonthsAgo }
    },
    select: { createdAt: true }
  });

  const months = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
  const monthlyData: any = {};

  // Initialize last 6 months
  for (let i = 0; i < 6; i++) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const monthName = months[d.getMonth()];
    monthlyData[monthName] = 0;
  }

  rfqs.forEach(rfq => {
    const monthName = months[new Date(rfq.createdAt).getMonth()];
    if (monthlyData[monthName] !== undefined) {
      monthlyData[monthName]++;
    }
  });

  const chartData = Object.keys(monthlyData).map(name => ({
    name,
    talep: monthlyData[name]
  })).reverse();

  // Status Distribution
  const statusCounts = await prisma.rfqRequest.groupBy({
    by: ["status"],
    _count: { id: true }
  });

  const statusData = statusCounts.map(s => ({
    name: s.status === "pending" ? "Bekliyor" : 
          s.status === "priced" ? "Fiyat Verildi" :
          s.status === "approved" ? "Onaylandı" : "Reddedildi",
    value: s._count.id
  }));

  return {
    stats: {
      totalRfqs,
      pendingRfqs,
      totalCustomers,
    },
    recentRfqs,
    chartData,
    statusData
  };
}
