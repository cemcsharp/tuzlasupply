"use client";

import { useState } from "react";
import styles from "../../admin.module.css";
import { useRouter } from "next/navigation";
import { prisma } from "@/lib/prisma";
import SmartSearch from "@/components/SmartSearch";
import { 
  User, MapPin, Send, Package, X, Layers, 
  Info, ArrowLeft, Building2, Mail, Phone 
} from "lucide-react";
import Link from "next/link";

export default function NewRFQPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [error, setError] = useState("");

  const addItem = (product: any) => {
    setSelectedItems(prev => {
      if (prev.find(item => item.id === product.id || item.name === product.name)) return prev;
      return [...prev, { 
        id: product.id || Math.random().toString(36).substr(2, 9), 
        name: product.name, 
        quantity: 1,
        unit: product.unit || "Pcs"
      }];
    });
  };

  const removeItem = (id: string) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    setSelectedItems(selectedItems.map(item => item.id === id ? { ...item, quantity: Math.max(1, qty) } : item));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.set("itemsJson", JSON.stringify(selectedItems));

    try {
      const { submitRfq } = await import("@/app/actions/rfq");
      const result = await submitRfq(formData);
      
      if (result.success) {
        router.push("/admin/rfqs");
        router.refresh();
      } else {
        setError(result.error || "Bir hata oluştu.");
      }
    } catch (err) {
      setError("Sunucu hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/admin/rfqs" style={{ color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", fontWeight: "600" }}>
          <ArrowLeft size={18} /> Taleplere Dön
        </Link>
      </div>

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Manuel RFQ Oluştur</h1>
        <p style={{ color: "var(--color-text-muted)", marginTop: "0.5rem" }}>
          Müşteriden telefon veya e-posta ile gelen talepleri sisteme işleyin.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        
        {/* Firma ve İletişim */}
        <div className={styles.tableCard} style={{ padding: "2rem" }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--color-primary)", marginBottom: "1.5rem", fontSize: "1.1rem" }}>
            <Building2 size={20} /> Firma & İletişim Bilgileri
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label className={styles.premiumLabel}>Firma / Gemi Adı *</label>
              <input type="text" name="companyName" required className={styles.premiumInput} placeholder="Örn: ABC Denizcilik" />
            </div>
            <div>
              <label className={styles.premiumLabel}>Yetkili Kişi *</label>
              <div style={{ position: "relative" }}>
                <User size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
                <input type="text" name="contactName" required className={styles.premiumInput} style={{ paddingLeft: "2.5rem" }} placeholder="Ad Soyad" />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label className={styles.premiumLabel}>E-posta *</label>
                <div style={{ position: "relative" }}>
                  <Mail size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
                  <input type="email" name="email" required className={styles.premiumInput} style={{ paddingLeft: "2.5rem" }} placeholder="ornek@firma.com" />
                </div>
              </div>
              <div>
                <label className={styles.premiumLabel}>Telefon</label>
                <div style={{ position: "relative" }}>
                  <Phone size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
                  <input type="tel" name="phone" className={styles.premiumInput} style={{ paddingLeft: "2.5rem" }} placeholder="+90 ..." />
                </div>
              </div>
            </div>
            <div>
              <label className={styles.premiumLabel}>Teslimat Noktası *</label>
              <div style={{ position: "relative" }}>
                <MapPin size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
                <input type="text" name="deliveryPoint" required className={styles.premiumInput} style={{ paddingLeft: "2.5rem" }} placeholder="Liman, Tersane veya Lokasyon" />
              </div>
            </div>
          </div>
        </div>

        {/* Ürün Seçimi ve Detaylar */}
        <div className={styles.tableCard} style={{ padding: "2rem" }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--color-primary)", marginBottom: "1.5rem", fontSize: "1.1rem" }}>
            <Layers size={20} /> Ürün Seçimi & Detaylar
          </h3>

          <div style={{ marginBottom: "1.5rem" }}>
            <label className={styles.premiumLabel}>Katalogdan Ürün Ara</label>
            <SmartSearch onSelect={addItem} />
          </div>

          {selectedItems.length > 0 && (
            <div style={{ marginBottom: "2rem", maxHeight: "300px", overflowY: "auto", border: "1px solid #E2E8F0", borderRadius: "12px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead style={{ backgroundColor: "#F8FAFC", position: "sticky", top: 0 }}>
                  <tr>
                    <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid #E2E8F0" }}>Ürün</th>
                    <th style={{ textAlign: "center", padding: "0.75rem", borderBottom: "1px solid #E2E8F0" }}>Miktar</th>
                    <th style={{ textAlign: "right", padding: "0.75rem", borderBottom: "1px solid #E2E8F0" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.map(item => (
                    <tr key={item.id}>
                      <td style={{ padding: "0.75rem", borderBottom: "1px solid #F1F5F9", fontWeight: "600" }}>{item.name}</td>
                      <td style={{ padding: "0.75rem", borderBottom: "1px solid #F1F5F9", textAlign: "center" }}>
                        <input 
                          type="number" 
                          value={item.quantity} 
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          style={{ width: "50px", padding: "0.3rem", borderRadius: "6px", border: "1px solid #CBD5E1", textAlign: "center" }}
                        />
                      </td>
                      <td style={{ padding: "0.75rem", borderBottom: "1px solid #F1F5F9", textAlign: "right" }}>
                        <button type="button" onClick={() => removeItem(item.id)} style={{ color: "#EF4444", background: "none", border: "none", cursor: "pointer" }}>
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div>
            <label className={styles.premiumLabel}>Genel Detaylar & Notlar</label>
            <textarea 
              name="details" 
              className={styles.premiumInput} 
              style={{ height: "120px", resize: "none" }}
              placeholder="Ek talepler veya özel notlar..."
              required
            ></textarea>
          </div>

          {error && (
            <div style={{ marginTop: "1rem", padding: "0.75rem", background: "#FEF2F2", color: "#EF4444", borderRadius: "10px", fontSize: "0.85rem", fontWeight: "600" }}>
              {error}
            </div>
          )}

          <div style={{ marginTop: "2rem" }}>
            <button 
              type="submit" 
              disabled={loading} 
              className={styles.submitBtn} 
              style={{ width: "100%", padding: "1rem", borderRadius: "14px", background: "linear-gradient(135deg, var(--color-primary) 0%, #1e293b 100%)", color: "white", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}
            >
              {loading ? "Oluşturuluyor..." : <><Send size={18} /> Talebi Kaydet ve Listeye Ekle</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
