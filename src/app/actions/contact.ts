"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return { success: false, error: "Tüm alanları doldurunuz." };
    }

    // 1. Save to Database
    await prisma.contactMessage.create({
      data: { name, email, message }
    });

    // 2. Send Email Notification
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Tuzla Supply System" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `Yeni İletişim Mesajı: ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #00A3FF;">Yeni İletişim Formu Mesajı</h2>
          <p><strong>Gönderen:</strong> ${name}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Mesaj:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #999;">
            Bu mesaj Tuzla Supply ERP sistemi üzerinden otomatik olarak gönderilmiştir.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    
    revalidatePath("/");
  } catch (error) {
    console.error("Contact Form Error:", error);
  }
}

export async function getContactMessages() {
  return await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export async function markMessageAsRead(id: string) {
  await prisma.contactMessage.update({
    where: { id },
    data: { isRead: true }
  });
  revalidatePath("/admin/messages");
}
