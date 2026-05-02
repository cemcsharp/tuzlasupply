"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const unit = formData.get("unit") as string;
    const priceStr = formData.get("price") as string;
    const description = formData.get("description") as string;

    if (!name || !category || !unit) {
      return { success: false, error: "İsim, kategori ve birim zorunludur." };
    }

    const price = priceStr ? parseFloat(priceStr) : null;

    await prisma.product.create({
      data: {
        name,
        category,
        unit,
        price,
        description
      }
    });

    revalidatePath("/admin/products");
    revalidatePath("/rfq");
    return { success: true };
  } catch (error) {
    console.error("Error adding product:", error);
    return { success: false, error: "Ürün eklenirken bir hata oluştu." };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/products");
    revalidatePath("/rfq");
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Ürün silinemedi." };
  }
}
