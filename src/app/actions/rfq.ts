"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";

export async function submitRfq(formData: FormData) {
  console.log("RFQ Submission Started...");
  try {
    const companyName = formData.get("companyName") as string;
    const contactName = formData.get("contactName") as string;
    const email = formData.get("email") as string;
    const deliveryPoint = formData.get("deliveryPoint") as string;
    const details = formData.get("details") as string;
    const itemsJson = formData.get("itemsJson") as string;
    const files = formData.getAll("attachment") as File[];

    console.log(`Processing RFQ for ${companyName} with ${files.length} files.`);

    let attachmentUrls: string[] = [];

    // Handle Multiple File Uploads
    if (files && files.length > 0) {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      console.log("Uploads Directory:", uploadsDir);
      
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      for (const file of files) {
        if (!file || file.size === 0 || !file.name) continue;
        
        console.log(`Uploading: ${file.name} (${file.size} bytes)`);
        
        try {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);

          const filename = `${Date.now()}-${file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase()}`;
          const filepath = path.join(uploadsDir, filename);
          await writeFile(filepath, buffer);
          attachmentUrls.push(`/uploads/${filename}`);
          console.log(`Saved: ${filename}`);
        } catch (fileErr) {
          console.error(`Error saving file ${file.name}:`, fileErr);
        }
      }
    }

    console.log("Creating Database Record...");
    const rfq = await prisma.rfqRequest.create({
      data: {
        companyName,
        contactName,
        email,
        deliveryPoint,
        details,
        attachmentUrls,
        status: "pending"
      }
    });

    if (itemsJson) {
      const items = JSON.parse(itemsJson);
      console.log(`Adding ${items.length} items to RFQ...`);
      for (const item of items) {
        // Check if item.id is a valid product in the database
        let validProductId = null;
        if (item.id && item.id.length > 20) { // Simple check for UUID-like strings
          const productExists = await prisma.product.findUnique({
            where: { id: item.id },
            select: { id: true }
          });
          if (productExists) validProductId = item.id;
        }

        await prisma.rfqItem.create({
          data: {
            rfqId: rfq.id,
            productId: validProductId,
            name: item.name,
            quantity: Number(item.quantity),
            unit: item.unit || "Adet"
          }
        });
      }
    }

    console.log("RFQ Successfully Created:", rfq.id);
    revalidatePath("/admin/rfqs");
    return { success: true, id: rfq.id, error: null };
  } catch (error: any) {
    console.error("CRITICAL RFQ ERROR:", error);
    return { success: false, error: error.message || "Talebiniz gönderilemedi." };
  }
}

export async function updateRfqStatus(id: string, status: string) {
  await prisma.rfqRequest.update({
    where: { id },
    data: { status }
  });
  revalidatePath("/admin/rfqs");
}

export async function deleteRfq(id: string) {
  await prisma.rfqItem.deleteMany({ where: { rfqId: id } });
  await prisma.rfqRequest.delete({ where: { id } });
  revalidatePath("/admin/rfqs");
}
