"use server";

// DB sync verified, triggering redeploy.

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateInternalNotes(rfqId: string, notes: string) {
  try {
    await prisma.rfqRequest.update({
      where: { id: rfqId },
      data: { internalNotes: notes }
    });
    
    // Add to audit log
    await addAuditLog(rfqId, "NOT_GUNCELLEME", "İç notlar güncellendi.");
    
    revalidatePath(`/admin/rfqs/${rfqId}`);
    return { success: true };
  } catch (error: any) {
    console.error("Update Notes Error:", error);
    return { success: false, error: error.message };
  }
}

export async function addAuditLog(rfqId: string, action: string, details?: string) {
  try {
    await prisma.auditLog.create({
      data: {
        rfqId,
        action,
        details
      }
    });
    return { success: true };
  } catch (error) {
    console.error("Add Audit Log Error:", error);
    return { success: false };
  }
}

export async function updateRfqStatus(rfqId: string, newStatus: string) {
  try {
    const oldRfq = await prisma.rfqRequest.findUnique({
      where: { id: rfqId },
      select: { status: true }
    });

    await prisma.rfqRequest.update({
      where: { id: rfqId },
      data: { status: newStatus }
    });

    await addAuditLog(rfqId, "STATU_DEGISIKLIGI", `Statü "${oldRfq?.status}" -> "${newStatus}" olarak güncellendi.`);

    revalidatePath(`/admin/rfqs/${rfqId}`);
    revalidatePath("/admin/rfqs");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
