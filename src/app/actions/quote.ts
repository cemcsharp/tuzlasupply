"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";
import { generateQuotePdf } from "@/lib/generateQuotePdf";

export async function sendQuoteEmail(rfqId: string, formData: FormData) {
  try {
    // 1. Parse form data
    const priceEntries: { itemId: string; price: number }[] = [];
    const extraNote = formData.get("extraNote") as string || "";
    const kdvRate = parseFloat(formData.get("kdvRate") as string || "20");
    const currency = formData.get("currency") as string || "USD";
    const validity = formData.get("validity") as string || "15 gün";
    const deliveryTime = formData.get("deliveryTime") as string || "3-5 iş günü";
    const paymentTerms = formData.get("paymentTerms") as string || "";

    const currencySymbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : "₺";

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("price-")) {
        const itemId = key.replace("price-", "");
        const price = parseFloat(value as string);
        if (!isNaN(price) && price > 0) {
          priceEntries.push({ itemId, price });
        }
      }
    }

    // 2. Update item prices in DB
    for (const entry of priceEntries) {
      await prisma.rfqItem.update({
        where: { id: entry.itemId },
        data: { price: entry.price },
      });
    }

    // 3. Update RFQ status to "priced"
    await prisma.rfqRequest.update({
      where: { id: rfqId },
      data: { status: "priced" },
    });

    // 4. Fetch RFQ + Settings
    const [rfq, settings] = await Promise.all([
      prisma.rfqRequest.findUnique({ where: { id: rfqId }, include: { items: true } }),
      prisma.settings.findFirst(),
    ]);

    if (!rfq) return { success: false, error: "RFQ bulunamadı." };

    const companyName = settings?.companyName || "Tuzla Supply";
    const companyAddress = settings?.address || "Aydınlı Mah. Tuzla / İstanbul";
    const companyPhone = settings?.phone || "+90 (216) 123 45 67";
    const companyEmail = settings?.email || "info@tuzlasupply.com";
    const taxOffice = settings?.taxOffice || "Tuzla V.D.";
    const taxNumber = settings?.taxNumber || "1234567890";
    const bankDetails = settings?.bankDetails || "";

    // 5. Calculate totals
    const pricedItems = rfq.items.filter(i => i.price && i.price > 0);
    const subtotal = pricedItems.reduce((sum, i) => sum + (i.price! * i.quantity), 0);
    const kdvAmount = subtotal * (kdvRate / 100);
    const grandTotal = subtotal + kdvAmount;

    const quoteNumber = `TS-${new Date().getFullYear()}-${rfq.id.split('-')[0].toUpperCase()}`;
    const quoteDate = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    const validityText = validity || "15 gün";

    // 6. Build cover letter email (all details are in the PDF)
    const htmlEmail = `<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F1F5F9;font-family:Arial,'Helvetica Neue',sans-serif;color:#1E293B">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #E2E8F0;border-radius:8px;overflow:hidden">

<tr><td style="background:#0F172A;padding:28px 36px">
<table width="100%"><tr>
<td><div style="font-size:22px;font-weight:bold;color:#fff">&#9670; ${companyName}</div>
<div style="font-size:10px;color:#94A3B8;margin-top:4px;letter-spacing:1px;text-transform:uppercase">Global Corporate Supply &amp; Industrial Excellence</div></td>
<td style="text-align:right;font-size:10px;color:#94A3B8;line-height:1.8">${companyAddress}<br>Tel: ${companyPhone}<br>${companyEmail}</td>
</tr></table></td></tr>

<tr><td style="padding:36px">
<p style="font-size:15px;line-height:1.8;margin:0 0 20px;color:#1E293B">
Say&#305;n <strong>${rfq.contactName}</strong>,
</p>

<p style="font-size:14px;line-height:1.8;margin:0 0 20px;color:#475569">
<strong>${rfq.companyName}</strong> ad&#305;na iletmi&#351; oldu&#287;unuz talep taraf&#305;m&#305;zca de&#287;erlendirilmi&#351; olup, haz&#305;rlanan fiyat teklifimiz bu e-postan&#305;n ekinde PDF format&#305;nda bilgilerinize sunulmu&#351;tur.
</p>

<table width="100%" style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;border-collapse:collapse;margin-bottom:24px">
<tr><td style="padding:14px 20px;font-size:13px;color:#64748B;width:130px;border-bottom:1px solid #E2E8F0">Teklif No:</td><td style="padding:14px 20px;font-size:13px;font-weight:bold;color:#0F172A;border-bottom:1px solid #E2E8F0">${quoteNumber}</td></tr>
<tr><td style="padding:14px 20px;font-size:13px;color:#64748B;border-bottom:1px solid #E2E8F0">Tarih:</td><td style="padding:14px 20px;font-size:13px;font-weight:bold;color:#0F172A;border-bottom:1px solid #E2E8F0">${quoteDate}</td></tr>
<tr><td style="padding:14px 20px;font-size:13px;color:#64748B;border-bottom:1px solid #E2E8F0">Ge&#231;erlilik:</td><td style="padding:14px 20px;font-size:13px;font-weight:bold;color:#0F172A;border-bottom:1px solid #E2E8F0">${validityText}</td></tr>
<tr><td style="padding:14px 20px;font-size:13px;color:#64748B">Kalem Say&#305;s&#305;:</td><td style="padding:14px 20px;font-size:13px;font-weight:bold;color:#0F172A">${pricedItems.length} &#252;r&#252;n / hizmet</td></tr>
</table>

<p style="font-size:14px;line-height:1.8;margin:0 0 24px;color:#475569">
Ekteki <strong>${quoteNumber}_Teklif.pdf</strong> dosyas&#305;nda &#252;r&#252;n detaylar&#305;, birim fiyatlar, KDV hesaplamas&#305;, &#246;deme ko&#351;ullar&#305; ve teslimat bilgilerinin tamam&#305;n&#305; bulabilirsiniz.
</p>

<p style="font-size:14px;line-height:1.8;margin:0 0 24px;color:#475569">
Teklifimizi onaylamak i&#231;in bu e-postay&#305; yan&#305;tlaman&#305;z yeterlidir. Her t&#252;rl&#252; soru ve talepleriniz i&#231;in bizimle ileti&#351;ime ge&#231;mekten l&#252;tfen &#231;ekinmeyiniz.
</p>

<p style="font-size:14px;line-height:1.8;margin:0;color:#1E293B">
Sayg&#305;lar&#305;m&#305;zla,<br>
<strong>${companyName}</strong>
</p>
</td></tr>

<tr><td style="background:#F8FAFC;border-top:1px solid #E2E8F0;padding:16px 36px;text-align:center;font-size:10px;color:#94A3B8">
&copy; ${new Date().getFullYear()} ${companyName} &mdash; Bu e-posta ve ekleri gizlidir, yaln&#305;zca al&#305;c&#305;s&#305;na y&#246;neliktir.
</td></tr>

</table>
</td></tr></table></body></html>`;

    // 7. Generate PDF attachment
    const pdfBuffer = await generateQuotePdf({
      quoteNumber, quoteDate, validityText, currency, currencySymbol,
      companyName, companyAddress, companyPhone, companyEmail, taxOffice, taxNumber, bankDetails,
      customerName: rfq.contactName, customerCompany: rfq.companyName, customerEmail: rfq.email,
      deliveryPoint: rfq.deliveryPoint, deliveryTime, paymentTerms, extraNote,
      items: pricedItems.map(i => ({ name: i.name, quantity: i.quantity, unit: i.unit, price: i.price! })),
      subtotal, kdvRate, kdvAmount, grandTotal,
    });

    // 8. Send email with PDF attachment
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${companyName}" <${process.env.SMTP_USER || "noreply@tuzlasupply.com"}>`,
      to: rfq.email,
      subject: `Fiyat Teklifiniz Hazır — ${quoteNumber} | ${companyName}`,
      html: htmlEmail,
      attachments: [
        {
          filename: `${quoteNumber}_Teklif.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    console.log(`Quote ${quoteNumber} sent to ${rfq.email}`);
    revalidatePath(`/admin/rfqs/${rfqId}`);
    revalidatePath("/admin/rfqs");
    return { success: true };
  } catch (error: any) {
    console.error("QUOTE EMAIL ERROR:", error);
    return { success: false, error: error.message || "E-posta gönderilemedi." };
  }
}
