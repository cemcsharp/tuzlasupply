"use server";

import { prisma } from "@/lib/prisma";

export async function searchTechnicalPart(query: string) {
  if (!query || query.length < 2) return null;

  try {
    const parts = await prisma.technicalPart.findMany({
      where: {
        OR: [
          { partNumber: { contains: query, mode: "insensitive" } },
          { name: { contains: query, mode: "insensitive" } },
          { brand: { contains: query, mode: "insensitive" } },
          { model: { contains: query, mode: "insensitive" } },
          { impaCode: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 5,
    });

    return parts;
  } catch (error) {
    console.error("Search error:", error);
    return null;
  }
}
