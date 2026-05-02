import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function sendAdminNewRFQEmail(rfq: any) {
  const mailOptions = {
    from: `"Tuzla Supply System" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL || "admin@tuzlasupply.com",
    subject: `⚓ Yeni Teklif Talebi: ${rfq.companyName}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0F172A; padding: 24px; text-align: center;">
          <h1 style="color: #00A3FF; margin: 0; font-size: 24px;">Yeni Talep Alındı</h1>
        </div>
        <div style="padding: 24px; color: #1E293B;">
          <p>Merhaba Admin,</p>
          <p>Sistem üzerinden yeni bir <strong>Teklif Talebi (RFQ)</strong> oluşturuldu. Detaylar aşağıdadır:</p>
          
          <div style="background-color: #F8FAFC; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 4px 0;"><strong>Firma / Gemi:</strong> ${rfq.companyName}</p>
            <p style="margin: 4px 0;"><strong>Yetkili:</strong> ${rfq.contactName}</p>
            <p style="margin: 4px 0;"><strong>Liman:</strong> ${rfq.deliveryPoint}</p>
            <p style="margin: 4px 0;"><strong>Tarih:</strong> ${new Date(rfq.createdAt).toLocaleString('tr-TR')}</p>
          </div>

          <p>Talebi incelemek ve fiyatlandırmak için aşağıdaki butona tıklayabilirsiniz:</p>
          
          <div style="text-align: center; margin-top: 32px;">
            <a href="${SITE_URL}/admin/rfqs/${rfq.id}" style="background-color: #00A3FF; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Talebi Görüntüle</a>
          </div>
        </div>
        <div style="background-color: #F1F5F9; padding: 16px; text-align: center; font-size: 12px; color: #64748B;">
          Tuzla Supply ERP • Otomatik Bildirim Sistemi
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}

export async function sendCustomerPriceReadyEmail(rfq: any) {
  const mailOptions = {
    from: `"Tuzla Supply" <${process.env.SMTP_USER}>`,
    to: rfq.email,
    subject: `🚢 Teklifiniz Hazır: ${rfq.id.split('-')[0].toUpperCase()}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #0F172A; padding: 24px; text-align: center;">
          <h1 style="color: #00A3FF; margin: 0; font-size: 24px;">Teklifiniz Hazırlandı</h1>
        </div>
        <div style="padding: 24px; color: #1E293B;">
          <p>Sayın ${rfq.contactName},</p>
          <p><strong>${rfq.companyName}</strong> adına iletmiş olduğunuz teklif talebi uzman ekibimiz tarafından fiyatlandırılmıştır.</p>
          
          <p>Teklif detaylarını görüntülemek ve proformayı indirmek için portalımızı ziyaret edebilirsiniz:</p>
          
          <div style="text-align: center; margin-top: 32px;">
            <a href="${SITE_URL}/rfq" style="background-color: #00A3FF; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Teklifi Görüntüle</a>
          </div>

          <p style="margin-top: 32px; font-size: 0.9rem;">Sorularınız için bizimle her zaman iletişime geçebilirsiniz.</p>
          <p style="font-size: 0.9rem;"><strong>Tuzla Supply Ekibi</strong></p>
        </div>
        <div style="background-color: #F1F5F9; padding: 16px; text-align: center; font-size: 12px; color: #64748B;">
          Bu e-posta otomatik olarak gönderilmiştir.
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}
