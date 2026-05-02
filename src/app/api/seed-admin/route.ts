import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const email = "admin@tuzlasupply.com";
    const password = "admin123456";
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword
      },
      create: {
        email,
        password: hashedPassword,
        name: "Tuzla Supply Admin"
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Admin user created/updated successfully.",
      user: { email: user.email, name: user.name }
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, error: "Seed failed." }, { status: 500 });
  }
}
