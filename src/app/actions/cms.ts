"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSiteContent() {
  let content = await prisma.siteContent.findUnique({
    where: { id: "main" }
  });

  if (!content) {
    const defaultCategories = [
      { id: 1, title: "Teknik Malzeme", description: "Gemi ve endüstriyel tesisler için yedek parçalar.", icon: "⚓" },
      { id: 2, title: "Elektrik & Elektronik", description: "Navigasyon ve pano malzemeleri.", icon: "⚡" },
      { id: 3, title: "Mekanik Parçalar", description: "Pompa, vana ve motor ekipmanları.", icon: "⚙️" },
      { id: 4, title: "IT & Ofis", description: "Yazılım ve donanım çözümleri.", icon: "💻" }
    ];

    content = await prisma.siteContent.create({
      data: {
        id: "main",
        categories: JSON.stringify(defaultCategories)
      }
    });
  }

  return {
    ...content,
    categories: JSON.parse(content.categories)
  };
}

export async function getHeroSlides() {
  return await prisma.heroSlide.findMany({
    orderBy: { order: "asc" }
  });
}

export async function addHeroSlide(data: { title: string, subtitle: string, imageUrl: string, order: number }) {
  await prisma.heroSlide.create({ data });
  revalidatePath("/");
  revalidatePath("/admin/cms");
  return { success: true };
}

export async function deleteHeroSlide(id: string) {
  await prisma.heroSlide.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/cms");
  return { success: true };
}

export async function updateSiteContent(formData: FormData) {
  try {
    const heroTitle = formData.get("heroTitle") as string;
    const heroSub = formData.get("heroSub") as string;
    const aboutText = formData.get("aboutText") as string;
    const categoriesJson = formData.get("categoriesJson") as string;

    await prisma.siteContent.upsert({
      where: { id: "main" },
      update: {
        heroTitle,
        heroSub,
        aboutText,
        categories: categoriesJson,
      },
      create: {
        id: "main",
        heroTitle,
        heroSub,
        aboutText,
        categories: categoriesJson,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/cms");
    return { success: true };
  } catch (error) {
    console.error("CMS update error:", error);
    return { success: false, error: "İçerik güncellenemedi." };
  }
}
