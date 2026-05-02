import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

interface QuoteItem {
  name: string;
  quantity: number;
  unit: string;
  price: number;
}

interface QuotePdfOptions {
  quoteNumber: string;
  quoteDate: string;
  validityText: string;
  currency: string;
  currencySymbol: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  taxOffice: string;
  taxNumber: string;
  bankDetails: string;
  customerName: string;
  customerCompany: string;
  customerEmail: string;
  deliveryPoint: string;
  deliveryTime: string;
  paymentTerms: string;
  extraNote: string;
  items: QuoteItem[];
  subtotal: number;
  kdvRate: number;
  kdvAmount: number;
  grandTotal: number;
}

// StandardFonts only support WinAnsi — sanitize Turkish chars to ASCII equivalents
function s(text: string): string {
  return text
    .replace(/İ/g, "I").replace(/ı/g, "i")
    .replace(/Ş/g, "S").replace(/ş/g, "s")
    .replace(/Ç/g, "C").replace(/ç/g, "c")
    .replace(/Ğ/g, "G").replace(/ğ/g, "g")
    .replace(/Ü/g, "U").replace(/ü/g, "u")
    .replace(/Ö/g, "O").replace(/ö/g, "o")
    .replace(/₺/g, "TL");
}

export async function generateQuotePdf(opts: QuotePdfOptions): Promise<Buffer> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]); // A4
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

  const navy = rgb(15 / 255, 23 / 255, 42 / 255);
  const grayC = rgb(100 / 255, 116 / 255, 139 / 255);
  const black = rgb(0, 0, 0);
  const white = rgb(1, 1, 1);
  const lightBg = rgb(248 / 255, 250 / 255, 252 / 255);
  const borderC = rgb(226 / 255, 232 / 255, 240 / 255);

  const W = 495;
  const L = 50; // left margin
  const R = 545; // right edge
  let y = 792; // start from top (842 - 50 margin)

  // ── HEADER BAR ──
  page.drawRectangle({ x: L, y: y, width: W, height: 6, color: navy });
  y -= 30;

  // ── COMPANY NAME ──
  page.drawText(s(opts.companyName), { x: L, y, font: fontBold, size: 18, color: navy });
  y -= 14;
  page.drawText("GLOBAL CORPORATE SUPPLY & INDUSTRIAL EXCELLENCE", { x: L, y, font, size: 7, color: grayC });

  // Right side: company details
  const rInfo = [s(opts.companyAddress), `Tel: ${opts.companyPhone}`, opts.companyEmail, `V.D: ${s(opts.taxOffice)} / ${opts.taxNumber}`];
  let ry = y + 14;
  rInfo.forEach(line => {
    const tw = font.widthOfTextAtSize(line, 8);
    page.drawText(line, { x: R - tw, y: ry, font, size: 8, color: grayC });
    ry -= 12;
  });

  y -= 16;
  page.drawLine({ start: { x: L, y }, end: { x: R, y }, thickness: 2, color: navy });
  y -= 28;

  // ── TITLE ──
  const title = "FIYAT TEKLIFI";
  const tw1 = fontBold.widthOfTextAtSize(title, 18);
  page.drawText(title, { x: L + (W - tw1) / 2, y, font: fontBold, size: 18, color: navy });
  y -= 16;
  const sub = "QUOTATION / PROFORMA INVOICE";
  const tw2 = font.widthOfTextAtSize(sub, 9);
  page.drawText(sub, { x: L + (W - tw2) / 2, y, font, size: 9, color: grayC });
  y -= 8;
  page.drawLine({ start: { x: L, y }, end: { x: R, y }, thickness: 0.5, color: borderC });
  y -= 22;

  // ── INFO COLUMNS ──
  page.drawText("TEKLIF BILGILERI", { x: L, y, font: fontBold, size: 7, color: grayC });
  page.drawText("MUSTERI BILGILERI", { x: 310, y, font: fontBold, size: 7, color: grayC });
  y -= 16;

  const drawInfoRow = (x: number, yy: number, label: string, value: string) => {
    page.drawText(s(label), { x, y: yy, font, size: 8, color: grayC });
    page.drawText(s(value), { x: x + 85, y: yy, font: fontBold, size: 8, color: navy });
  };

  drawInfoRow(L, y, "Teklif No:", opts.quoteNumber);
  drawInfoRow(L, y - 14, "Tarih:", opts.quoteDate);
  drawInfoRow(L, y - 28, "Gecerlilik:", opts.validityText);
  drawInfoRow(L, y - 42, "Para Birimi:", opts.currency);

  page.drawText(s(opts.customerName), { x: 310, y, font: fontBold, size: 10, color: navy });
  page.drawText(s(opts.customerCompany), { x: 310, y: y - 14, font, size: 9, color: grayC });
  page.drawText(opts.customerEmail, { x: 310, y: y - 28, font, size: 8, color: grayC });
  page.drawText(s(`Teslimat: ${opts.deliveryPoint}`), { x: 310, y: y - 42, font, size: 8, color: grayC });

  y -= 60;
  page.drawLine({ start: { x: L, y }, end: { x: R, y }, thickness: 0.5, color: borderC });
  y -= 18;

  // ── OPENING TEXT ──
  page.drawText(s(`Sayin ${opts.customerName}, talebiniz dogrultusunda hazirlanan fiyat teklifimiz`), { x: L, y, font, size: 9, color: grayC });
  y -= 12;
  page.drawText("asagida bilgilerinize sunulmustur.", { x: L, y, font, size: 9, color: grayC });
  y -= 22;

  // ── TABLE HEADER ──
  const colX = [L, L + 30, L + 230, L + 290, L + 345, L + 420];
  const colW = [30, 200, 60, 55, 75, 75];
  const headers = ["#", "MALZEME / HIZMET", "MIKTAR", "BIRIM", "B.FIYAT", "TUTAR"];
  
  page.drawRectangle({ x: L, y: y - 2, width: W, height: 20, color: navy });
  headers.forEach((h, i) => {
    const align = i >= 4 ? colX[i] + colW[i] - fontBold.widthOfTextAtSize(h, 7) - 4 : colX[i] + 4;
    page.drawText(h, { x: align, y: y + 3, font: fontBold, size: 7, color: white });
  });
  y -= 22;

  // ── TABLE ROWS ──
  opts.items.forEach((item, idx) => {
    const rowH = 18;
    if (idx % 2 === 0) {
      page.drawRectangle({ x: L, y: y - 4, width: W, height: rowH, color: lightBg });
    }

    page.drawText(`${idx + 1}`, { x: colX[0] + 10, y: y + 2, font, size: 8, color: grayC });
    page.drawText(s(item.name.substring(0, 35)), { x: colX[1] + 4, y: y + 2, font: fontBold, size: 8, color: navy });
    page.drawText(`${item.quantity}`, { x: colX[2] + 4, y: y + 2, font, size: 8, color: navy });
    page.drawText(s(item.unit), { x: colX[3] + 4, y: y + 2, font, size: 8, color: navy });
    
    const priceText = s(`${opts.currencySymbol}${item.price.toFixed(2)}`);
    const totalText = s(`${opts.currencySymbol}${(item.price * item.quantity).toFixed(2)}`);
    page.drawText(priceText, { x: colX[4] + colW[4] - font.widthOfTextAtSize(priceText, 8) - 4, y: y + 2, font, size: 8, color: navy });
    page.drawText(totalText, { x: colX[5] + colW[5] - fontBold.widthOfTextAtSize(totalText, 8) - 4, y: y + 2, font: fontBold, size: 8, color: navy });
    
    y -= rowH;
  });

  page.drawLine({ start: { x: L, y }, end: { x: R, y }, thickness: 0.5, color: borderC });
  y -= 16;

  // ── TOTALS ──
  const tX = 380;
  const drawTotal = (label: string, value: string, bold = false, big = false) => {
    const f = bold ? fontBold : font;
    const sz = big ? 12 : 9;
    page.drawText(s(label), { x: tX, y, font: f, size: sz, color: bold ? navy : grayC });
    const vw = f.widthOfTextAtSize(s(value), sz);
    page.drawText(s(value), { x: R - vw, y, font: f, size: sz, color: navy });
    y -= (big ? 20 : 14);
  };

  drawTotal("Ara Toplam:", `${opts.currencySymbol}${opts.subtotal.toFixed(2)}`);
  drawTotal(`KDV (%${opts.kdvRate}):`, `${opts.currencySymbol}${opts.kdvAmount.toFixed(2)}`);
  page.drawLine({ start: { x: tX, y: y + 8 }, end: { x: R, y: y + 8 }, thickness: 1.5, color: navy });
  y -= 4;
  drawTotal("GENEL TOPLAM:", `${opts.currencySymbol}${opts.grandTotal.toFixed(2)}`, true, true);

  // ── TERMS ──
  page.drawRectangle({ x: L, y: y - 64, width: W, height: 76, color: lightBg, borderColor: borderC, borderWidth: 0.5 });
  y -= 0;
  page.drawText("Teklif Kosullari", { x: L + 12, y, font: fontBold, size: 9, color: navy });
  y -= 16;

  const termRow = (label: string, value: string) => {
    page.drawText(s(label), { x: L + 12, y, font, size: 8, color: grayC });
    page.drawText(s(value), { x: L + 130, y, font: fontBold, size: 8, color: navy });
    y -= 13;
  };

  termRow("Teslimat Suresi:", opts.deliveryTime);
  termRow("Odeme Kosullari:", opts.paymentTerms);
  termRow("Teslimat Yeri:", opts.deliveryPoint);
  termRow("Gecerlilik:", opts.validityText);
  y -= 10;

  // ── EXTRA NOTE ──
  if (opts.extraNote) {
    page.drawText(s("Not: " + opts.extraNote.substring(0, 100)), { x: L, y, font, size: 8, color: rgb(120 / 255, 53 / 255, 15 / 255) });
    y -= 18;
  }

  // ── BANK DETAILS ──
  if (opts.bankDetails) {
    page.drawText("Banka Hesap Bilgileri:", { x: L, y, font: fontBold, size: 8, color: rgb(30 / 255, 64 / 255, 175 / 255) });
    y -= 12;
    const bankLines = opts.bankDetails.split("\n").slice(0, 4);
    bankLines.forEach(line => {
      page.drawText(s(line), { x: L, y, font, size: 8, color: rgb(30 / 255, 58 / 255, 95 / 255) });
      y -= 12;
    });
    y -= 8;
  }

  // ── SIGNATURE ──
  y = Math.min(y, 100);
  page.drawText(s(`Isbu teklif mektubu ${opts.companyName} tarafindan`), { x: L, y, font, size: 7, color: grayC });
  page.drawText("elektronik ortamda duzenlenmistir.", { x: L, y: y - 10, font, size: 7, color: grayC });

  page.drawLine({ start: { x: 400, y: y + 6 }, end: { x: R, y: y + 6 }, thickness: 1, color: navy });
  const cw = fontBold.widthOfTextAtSize(s(opts.companyName), 9);
  page.drawText(s(opts.companyName), { x: 400 + (145 - cw) / 2, y: y - 8, font: fontBold, size: 9, color: navy });
  const sw = font.widthOfTextAtSize("Yetkili Imza / Kase", 7);
  page.drawText("Yetkili Imza / Kase", { x: 400 + (145 - sw) / 2, y: y - 20, font, size: 7, color: grayC });

  // ── BOTTOM BAR ──
  page.drawRectangle({ x: L, y: 50, width: W, height: 4, color: navy });

  const pdfBytes = await doc.save();
  return Buffer.from(pdfBytes);
}
