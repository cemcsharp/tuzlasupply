"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  let settings = await prisma.settings.findFirst({
    where: { id: 1 }
  });

  if (!settings) {
    settings = await prisma.settings.create({
      data: {
        id: 1,
        companyName: "Tuzla Supply",
      }
    });
  }

  return settings;
}

export async function updateSettings(formData: FormData) {
  try {
    const companyName = formData.get("companyName") as string;
    const address = formData.get("address") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const taxOffice = formData.get("taxOffice") as string;
    const taxNumber = formData.get("taxNumber") as string;
    const bankDetails = formData.get("bankDetails") as string;

    await prisma.settings.upsert({
      where: { id: 1 },
      update: {
        companyName,
        address,
        phone,
        email,
        taxOffice,
        taxNumber,
        bankDetails,
      },
      create: {
        id: 1,
        companyName,
        address,
        phone,
        email,
        taxOffice,
        taxNumber,
        bankDetails,
      },
    });

    revalidatePath("/admin/settings");
    revalidatePath("/admin/rfqs");
    return { success: true };
  } catch (error) {
    console.error("Error updating settings:", error);
    return { success: false, error: "Ayarlar güncellenemedi." };
  }
}
