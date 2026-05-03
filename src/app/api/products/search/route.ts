import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  try {
    const queryWords = query.split(" ").filter(w => w.length > 0);

    const products = await prisma.product.findMany({
      where: {
        AND: [
          ...queryWords.map(word => ({
            OR: [
              { name: { contains: word, mode: "insensitive" as any } },
              { description: { contains: word, mode: "insensitive" as any } },
              { category: { contains: word, mode: "insensitive" as any } }
            ]
          })),
          category ? { category } : {}
        ]
      },
      select: {
        id: true,
        name: true,
        category: true,
        unit: true,
        price: true
      },
      take: 20,
      orderBy: { name: "asc" }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Product Search API Error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
