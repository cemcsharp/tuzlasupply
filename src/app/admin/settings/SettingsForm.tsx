"use client";

import styles from "../admin.module.css";
import { updateSettings } from "@/app/actions/settings";
import { useState } from "react";

export default function SettingsForm({ settings }: { settings: any }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage("");
    const result = await updateSettings(formData);
    if (result.success) {
      setMessage("Ayarlar başarıyla güncellendi.");
    } else {
      setMessage("Hata: " + result.error);
    }
    setLoading(false);
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Kurumsal Ayarlar</h1>
        <p style={{ color: "var(--color-text-muted)", marginTop: "0.5rem" }}>
          Tekliflerde ve sitede görünen firma bilgilerinizi buradan düzenleyin.
        </p>
      </div>

      <div className={styles.tableCard} style={{ padding: "2rem", maxWidth: "800px" }}>
        <form action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {message && (
            <div style={{ 
              padding: "1rem", 
              borderRadius: "0.5rem", 
              backgroundColor: message.startsWith("Hata") ? "#FEE2E2" : "#D1FAE5",
              color: message.startsWith("Hata") ? "#B91C1C" : "#065F46",
              fontWeight: "600"
            }}>
              {message}
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: "600", fontSize: "0.9rem" }}>Firma Ünvanı</label>
              <input 
                type="text" 
                name="companyName" 
                defaultValue={settings.companyName} 
                className="btn-secondary" 
                style={{ textAlign: "left", cursor: "text" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: "600", fontSize: "0.9rem" }}>E-posta</label>
              <input 
                type="email" 
                name="email" 
                defaultValue={settings.email || ""} 
                className="btn-secondary" 
                style={{ textAlign: "left", cursor: "text" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: "600", fontSize: "0.9rem" }}>Telefon</label>
              <input 
                type="text" 
                name="phone" 
                defaultValue={settings.phone || ""} 
                className="btn-secondary" 
                style={{ textAlign: "left", cursor: "text" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: "600", fontSize: "0.9rem" }}>Vergi Dairesi</label>
              <input 
                type="text" 
                name="taxOffice" 
                defaultValue={settings.taxOffice || ""} 
                className="btn-secondary" 
                style={{ textAlign: "left", cursor: "text" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontWeight: "600", fontSize: "0.9rem" }}>Vergi Numarası</label>
            <input 
              type="text" 
              name="taxNumber" 
              defaultValue={settings.taxNumber || ""} 
              className="btn-secondary" 
              style={{ textAlign: "left", cursor: "text" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontWeight: "600", fontSize: "0.9rem" }}>Adres</label>
            <textarea 
              name="address" 
              defaultValue={settings.address || ""} 
              className="btn-secondary" 
              style={{ textAlign: "left", cursor: "text", minHeight: "80px", padding: "0.75rem" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontWeight: "600", fontSize: "0.9rem" }}>Banka & IBAN Bilgileri</label>
            <textarea 
              name="bankDetails" 
              defaultValue={settings.bankDetails || ""} 
              placeholder="Örn: TR00 0000 0000..."
              className="btn-secondary" 
              style={{ textAlign: "left", cursor: "text", minHeight: "100px", padding: "0.75rem" }}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: "1rem" }}>
            {loading ? "Kaydediliyor..." : "Ayarları Kaydet"}
          </button>
        </form>
      </div>
    </div>
  );
}
