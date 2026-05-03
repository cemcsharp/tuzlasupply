"use client";

import { useState } from "react";
import styles from "../../admin.module.css";
import { useRouter } from "next/navigation";
import SmartSearch from "@/components/SmartSearch";
import { 
  User, MapPin, Send, Package, X, Layers, 
  ArrowLeft, Building2, Mail, Phone, Plus 
} from "lucide-react";
import Link from "next/link";

export default function NewRFQPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [error, setError] = useState("");

  // Manuel ürün girişi için state'ler
  const [manualName, setManualName] = useState("");
  const [manualQty, setManualQty] = useState(1);
  const [manualUnit, setManualUnit] = useState("Pcs");

  const addItem = (product: any) => {
    setSelectedItems(prev => {
      if (prev.find(item => item.id === product.id || item.name === product.name)) return prev;
      return [...prev, { 
        id: product.id || Math.random().toString(36).substr(2, 9), 
        name: product.name, 
        quantity: product.quantity || 1,
        unit: product.unit || "Pcs"
      }];
    });
  };

  const handleAddManual = () => {
    if (!manualName) return;
    addItem({ name: manualName, quantity: manualQty, unit: manualUnit });
    setManualName("");
    setManualQty(1);
    setManualUnit("Pcs");
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
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/admin/rfqs" style={{ color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", fontWeight: "600" }}>
          <ArrowLeft size={18} /> Taleplere Dön
        </Link>
      </div>

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Manuel RFQ Oluştur</h1>
        <p style={{ color: "var(--color-text-muted)", marginTop: "0.5rem" }}>
          Müşteriden gelen talepleri anında sisteme işleyin.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "2rem" }}>
        
        {/* Firma ve İletişim */}
        <div className={styles.tableCard} style={{ padding: "2rem", height: "fit-content" }}>
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

            <div style={{ marginTop: "1rem" }}>
              <label className={styles.premiumLabel}>Genel Detaylar & Notlar</label>
              <textarea 
                name="details" 
                className={styles.premiumInput} 
                style={{ height: "100px", resize: "none" }}
                placeholder="Ek talepler veya özel notlar..."
                required
              ></textarea>
            </div>
          </div>
        </div>

        {/* Ürün Seçimi */}
        <div className={styles.tableCard} style={{ padding: "2rem" }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--color-primary)", marginBottom: "1.5rem", fontSize: "1.1rem" }}>
            <Layers size={20} /> Ürün Seçimi
          </h3>

          {/* Katalogdan Arama */}
          <div style={{ marginBottom: "2rem" }}>
            <label className={styles.premiumLabel}>Katalogdan Ürün Ara</label>
            <SmartSearch onSelect={addItem} />
          </div>

          <div style={{ height: "1px", backgroundColor: "#E2E8F0", margin: "2rem 0" }} />

          {/* Manuel Ürün Ekleme */}
          <div style={{ marginBottom: "2rem" }}>
            <label className={styles.premiumLabel} style={{ color: "var(--color-accent)" }}>Manuel Ürün / Hizmet Ekle</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 100px auto", gap: "0.75rem", alignItems: "flex-end" }}>
              <div>
                <input 
                  type="text" 
                  placeholder="Ürün Adı" 
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className={styles.premiumInput} 
                />
              </div>
              <div>
                <input 
                  type="number" 
                  value={manualQty}
                  onChange={(e) => setManualQty(parseInt(e.target.value))}
                  className={styles.premiumInput} 
                  style={{ textAlign: "center" }}
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Birim" 
                  value={manualUnit}
                  onChange={(e) => setManualUnit(e.target.value)}
                  className={styles.premiumInput} 
                />
              </div>
              <button 
                type="button"
                onClick={handleAddManual}
                disabled={!manualName}
                style={{ 
                  padding: "0.75rem", borderRadius: "12px", border: "none", 
                  backgroundColor: manualName ? "var(--color-accent)" : "#CBD5E1", 
                  color: "white", cursor: manualName ? "pointer" : "default"
                }}
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Seçilen Ürünler Tablosu */}
          {selectedItems.length > 0 && (
            <div style={{ marginBottom: "2rem", border: "1px solid #E2E8F0", borderRadius: "12px", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                <thead style={{ backgroundColor: "#F8FAFC" }}>
                  <tr>
                    <th style={{ textAlign: "left", padding: "0.85rem", borderBottom: "1px solid #E2E8F0" }}>Seçilen Ürünler</th>
                    <th style={{ textAlign: "center", padding: "0.85rem", borderBottom: "1px solid #E2E8F0" }}>Miktar</th>
                    <th style={{ textAlign: "right", padding: "0.85rem", borderBottom: "1px solid #E2E8F0" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.map(item => (
                    <tr key={item.id}>
                      <td style={{ padding: "0.85rem", borderBottom: "1px solid #F1F5F9", fontWeight: "700", color: "#1E293B" }}>{item.name}</td>
                      <td style={{ padding: "0.85rem", borderBottom: "1px solid #F1F5F9", textAlign: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                          <input 
                            type="number" 
                            value={item.quantity} 
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            style={{ width: "60px", padding: "0.4rem", borderRadius: "8px", border: "1.5px solid #E2E8F0", textAlign: "center", fontWeight: "700" }}
                          />
                          <span style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: "600" }}>{item.unit}</span>
                        </div>
                      </td>
                      <td style={{ padding: "0.85rem", borderBottom: "1px solid #F1F5F9", textAlign: "right" }}>
                        <button type="button" onClick={() => removeItem(item.id)} style={{ color: "#EF4444", background: "none", border: "none", cursor: "pointer" }}>
                          <X size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {error && (
            <div style={{ marginBottom: "1.5rem", padding: "0.75rem", background: "#FEF2F2", color: "#EF4444", borderRadius: "10px", fontSize: "0.85rem", fontWeight: "600" }}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading || selectedItems.length === 0} 
            className={styles.submitBtn} 
            style={{ 
              width: "100%", padding: "1.1rem", borderRadius: "16px", 
              background: "linear-gradient(135deg, #059669 0%, #047857 100%)", 
              color: "white", fontWeight: "800", fontSize: "1rem",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
              boxShadow: "0 10px 15px -3px rgba(5, 150, 105, 0.3)",
              opacity: (loading || selectedItems.length === 0) ? 0.6 : 1
            }}
          >
            {loading ? "Oluşturuluyor..." : <><Send size={20} /> RFQ'yu Kaydet ve Yayınla</>}
          </button>
        </div>
      </form>
    </div>
  );
}
