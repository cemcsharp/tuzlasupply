"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addManualRfqItem(rfqId: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const quantity = parseInt(formData.get("quantity") as string || "1");
    const unit = formData.get("unit") as string || "Pcs";

    if (!name) return { success: false, error: "Ürün adı zorunludur." };

    await prisma.rfqItem.create({
      data: {
        rfqId,
        name,
        quantity,
        unit,
        price: 0
      }
    });

    revalidatePath(`/admin/rfqs/${rfqId}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
