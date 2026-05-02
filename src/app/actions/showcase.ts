"use server";

import { prisma } from "@/lib/prisma";
// Action forced refresh

import { revalidatePath } from "next/cache";

// ── REFERENCES ──

export async function getReferences() {
  return prisma.reference.findMany({ orderBy: { order: "asc" } });
}

export async function getActiveReferences() {
  return prisma.reference.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
}

export async function createReference(formData: FormData) {
  const count = await prisma.reference.count();
  await prisma.reference.create({
    data: {
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      description: formData.get("description") as string || "",
      icon: formData.get("icon") as string || "Ship",
      order: count,
    },
  });
  revalidatePath("/admin/references");
  revalidatePath("/");
}

export async function updateReference(id: string, formData: FormData) {
  await prisma.reference.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      description: formData.get("description") as string || "",
      icon: formData.get("icon") as string || "Ship",
    },
  });
  revalidatePath("/admin/references");
  revalidatePath("/");
}

export async function toggleReference(id: string) {
  const ref = await prisma.reference.findUnique({ where: { id } });
  if (!ref) return;
  await prisma.reference.update({ where: { id }, data: { isActive: !ref.isActive } });
  revalidatePath("/admin/references");
  revalidatePath("/");
}

export async function deleteReference(id: string) {
  await prisma.reference.delete({ where: { id } });
  revalidatePath("/admin/references");
  revalidatePath("/");
}

// ── PARTNERS ──

export async function getPartners() {
  return prisma.partner.findMany({ orderBy: { order: "asc" } });
}

export async function getActivePartners() {
  return prisma.partner.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
}

export async function createPartner(formData: FormData) {
  const count = await prisma.partner.count();
  await prisma.partner.create({
    data: {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      color: formData.get("color") as string || "#0072CE",
      order: count,
    },
  });
  revalidatePath("/admin/partners");
  revalidatePath("/");
}

export async function updatePartner(id: string, formData: FormData) {
  await prisma.partner.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      color: formData.get("color") as string || "#0072CE",
    },
  });
  revalidatePath("/admin/partners");
  revalidatePath("/");
}

export async function togglePartner(id: string) {
  const p = await prisma.partner.findUnique({ where: { id } });
  if (!p) return;
  await prisma.partner.update({ where: { id }, data: { isActive: !p.isActive } });
  revalidatePath("/admin/partners");
  revalidatePath("/");
}

export async function deletePartner(id: string) {
  await prisma.partner.delete({ where: { id } });
  revalidatePath("/admin/partners");
  revalidatePath("/");
}

// ── SECTION VISIBILITY ──

export async function getSectionVisibility() {
  const settings = await prisma.settings.findFirst();
  return {
    showReferences: settings?.showReferences ?? false,
    showPartners: settings?.showPartners ?? false,
    showStats: settings?.showStats ?? false,
    statOrders: settings?.statOrders ?? "500+",
    statCustomers: settings?.statCustomers ?? "150+",
    statExperience: settings?.statExperience ?? "25+",
    statSupport: settings?.statSupport ?? "7/24",
  };
}

export async function updateStats(formData: FormData) {
  await prisma.settings.upsert({
    where: { id: 1 },
    update: {
      statOrders: formData.get("statOrders") as string,
      statCustomers: formData.get("statCustomers") as string,
      statExperience: formData.get("statExperience") as string,
      statSupport: formData.get("statSupport") as string,
    },
    create: {
      id: 1,
      statOrders: formData.get("statOrders") as string,
      statCustomers: formData.get("statCustomers") as string,
      statExperience: formData.get("statExperience") as string,
      statSupport: formData.get("statSupport") as string,
    },
  });
  revalidatePath("/admin/showcase");
  revalidatePath("/");
}

export async function toggleSectionVisibility(section: "showReferences" | "showPartners" | "showStats") {
  const settings = await prisma.settings.findFirst();
  const current = settings?.[section] ?? false;
  await prisma.settings.upsert({
    where: { id: 1 },
    update: { [section]: !current },
    create: { [section]: !current },
  });
  revalidatePath("/admin/references");
  revalidatePath("/admin/partners");
  revalidatePath("/");
}
