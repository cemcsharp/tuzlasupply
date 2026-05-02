"use client";

import { useState } from "react";
import { sendQuoteEmail } from "@/app/actions/quote";
import { DollarSign, Send, CheckCircle2, AlertCircle, FileText, Clock, CreditCard, Truck, Percent } from "lucide-react";

const labelStyle = {
  display: "flex", alignItems: "center", gap: "0.5rem",
  fontSize: "0.7rem", fontWeight: "800" as const, color: "#94A3B8",
  textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: "0.5rem"
};

const inputStyle = {
  width: "100%",
  padding: "0.7rem 0.85rem",
  border: "1.5px solid #E2E8F0",
  borderRadius: "10px",
  fontSize: "0.9rem",
  fontWeight: "500" as const,
  backgroundColor: "#F8FAFC",
  fontFamily: "inherit"
};

export default function QuotePanel({ rfqId, items, customerEmail }: {
  rfqId: string;
  items: any[];
  customerEmail: string;
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    try {
      const result = await sendQuoteEmail(rfqId, formData);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || "Gönderim başarısız.");
      }
    } catch (e: any) {
      setError(e.message || "Sunucu hatası.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div style={{
        padding: "2.5rem",
        background: "linear-gradient(135deg, #D1FAE5, #F0FDF4)",
        borderRadius: "16px",
        textAlign: "center",
        border: "1px solid #BBF7D0"
      }}>
        <CheckCircle2 size={48} color="#059669" style={{ marginBottom: "1rem" }} />
        <h3 style={{ color: "#065F46", marginBottom: "0.5rem" }}>Teklif Gönderildi!</h3>
        <p style={{ color: "#047857", fontSize: "0.9rem" }}>
          Resmi fiyat teklifi <strong>{customerEmail}</strong> adresine başarıyla iletildi.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      border: "2px solid #00A3FF",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 10px 25px -5px rgba(0, 163, 255, 0.15)"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #00A3FF 0%, #0066FF 100%)",
        padding: "1.25rem 1.5rem",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <DollarSign size={22} />
          <h3 style={{ margin: 0, fontWeight: "800", fontSize: "1.1rem" }}>Resmi Teklif Oluştur</h3>
        </div>
        <span style={{ fontSize: "0.8rem", opacity: 0.8 }}>→ {customerEmail}</span>
      </div>

      <form action={handleSubmit} style={{ padding: "1.5rem" }}>

        {/* Ürün Fiyatları */}
        {items.length > 0 && (
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1.5rem" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "0.75rem", fontSize: "0.7rem", color: "#94A3B8", textTransform: "uppercase", fontWeight: "800", letterSpacing: "0.05em", borderBottom: "2px solid #F1F5F9" }}>Ürün</th>
                <th style={{ textAlign: "center", padding: "0.75rem", fontSize: "0.7rem", color: "#94A3B8", textTransform: "uppercase", fontWeight: "800", letterSpacing: "0.05em", borderBottom: "2px solid #F1F5F9" }}>Miktar</th>
                <th style={{ textAlign: "right", padding: "0.75rem", fontSize: "0.7rem", color: "#94A3B8", textTransform: "uppercase", fontWeight: "800", letterSpacing: "0.05em", borderBottom: "2px solid #F1F5F9" }}>Birim Fiyat</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: any) => (
                <tr key={item.id}>
                  <td style={{ padding: "0.75rem", borderBottom: "1px solid #F1F5F9", fontWeight: "600", color: "#1E293B" }}>{item.name}</td>
                  <td style={{ padding: "0.75rem", borderBottom: "1px solid #F1F5F9", textAlign: "center", color: "#64748B" }}>{item.quantity} {item.unit}</td>
                  <td style={{ padding: "0.75rem", borderBottom: "1px solid #F1F5F9", textAlign: "right" }}>
                    <input type="number" step="0.01" name={`price-${item.id}`} defaultValue={item.price || ""} placeholder="0.00" required
                      style={{ width: "120px", padding: "0.6rem", border: "1.5px solid #E2E8F0", borderRadius: "10px", fontSize: "0.95rem", fontWeight: "700", textAlign: "right", backgroundColor: "#F8FAFC" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Teklif Detayları Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem", padding: "1.25rem", background: "#F8FAFC", borderRadius: "14px", border: "1px solid #E2E8F0" }}>
          <div>
            <label style={labelStyle}><Percent size={14} /> KDV Oranı (%)</label>
            <select name="kdvRate" defaultValue="20" style={inputStyle}>
              <option value="0">KDV Hariç (%0)</option>
              <option value="1">%1</option>
              <option value="10">%10</option>
              <option value="20">%20</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}><DollarSign size={14} /> Para Birimi</label>
            <select name="currency" style={inputStyle}>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="TRY">TRY (₺)</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}><Clock size={14} /> Teklif Geçerlilik Süresi</label>
            <input type="text" name="validity" defaultValue="15 gün" placeholder="Örn: 30 gün, 1 Haziran'a kadar" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}><Truck size={14} /> Tahmini Teslimat</label>
            <input type="text" name="deliveryTime" defaultValue="3-5 iş günü" style={inputStyle} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}><CreditCard size={14} /> Ödeme Koşulları</label>
            <input type="text" name="paymentTerms" defaultValue="Sipariş ile birlikte %50 peşin, teslimat öncesi %50" style={inputStyle} />
          </div>
        </div>

        {/* Ek Not */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}><FileText size={14} /> Ek Notlar & Özel Koşullar (Opsiyonel)</label>
          <textarea name="extraNote" placeholder="Garanti süresi, kargo detayları, özel koşullar..."
            style={{ ...inputStyle, height: "80px", resize: "none" as const }}
          />
        </div>

        {error && (
          <div style={{ padding: "0.75rem 1rem", background: "#FEF2F2", borderRadius: "10px", color: "#EF4444", fontSize: "0.85rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <button type="submit" disabled={loading}
          style={{
            width: "100%", padding: "1rem",
            background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
            color: "white", border: "none", borderRadius: "14px",
            fontSize: "1rem", fontWeight: "800",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
            boxShadow: "0 10px 15px -3px rgba(5, 150, 105, 0.3)"
          }}
        >
          {loading ? "Gönderiliyor..." : <><Send size={18} /> Resmi Teklifi Müşteriye Gönder</>}
        </button>
      </form>
    </div>
  );
}
