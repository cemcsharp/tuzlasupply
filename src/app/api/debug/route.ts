import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL;
  const hasUrl = !!dbUrl;
  const urlStart = dbUrl ? dbUrl.substring(0, 20) + "..." : "none";
  
  try {
    // Basit bir test sorgusu
    const userCount = await prisma.user.count();
    return NextResponse.json({
      status: "success",
      database: "connected",
      userCount,
      env: {
        hasDatabaseUrl: hasUrl,
        databaseUrlPrefix: urlStart,
        nodeEnv: process.env.NODE_ENV
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: error.message,
      code: error.code,
      env: {
        hasDatabaseUrl: hasUrl,
        databaseUrlPrefix: urlStart
      }
    }, { status: 500 });
  }
}
