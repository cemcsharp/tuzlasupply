"use client";

import { useState } from "react";
import styles from "./rfq.module.css";
import { submitRfq } from "@/app/actions/rfq";
import Link from "next/link";
import SmartSearch from "@/components/SmartSearch";
import { 
  Check, User, MapPin, Send, Info, Package, X, Layers
} from "lucide-react";

export default function RFQForm() {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [aiLoading, setAiLoading] = useState(false);

  const addItem = (product: any) => {
    if (selectedItems.find(item => item.id === product.id || item.name === product.name)) return;
    setSelectedItems([...selectedItems, { 
      id: product.id || Math.random().toString(36).substr(2, 9), 
      name: product.name, 
      quantity: product.quantity || 1,
      unit: product.unit || "Pcs"
    }]);
  };

  const removeItem = (id: string) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    setSelectedItems(selectedItems.map(item => item.id === id ? { ...item, quantity: Math.max(1, qty) } : item));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);

      // Trigger AI Scanning
      setAiLoading(true);
      try {
        const { parseRfqFileWithAi } = await import("@/app/actions/ai");
        
        for (const file of newFiles) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = async () => {
            const base64 = (reader.result as string).split(',')[1];
            const result = await parseRfqFileWithAi(base64, file.type);
            
            if (result.success && result.items) {
              result.items.forEach((item: any) => {
                addItem(item);
              });
            }
          };
        }
      } catch (err) {
        console.error("AI Scan Error:", err);
      } finally {
        // Short delay to let the animation feel real
        setTimeout(() => setAiLoading(false), 1500);
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    // Inject selected items into formData
    formData.set("itemsJson", JSON.stringify(selectedItems));
    
    // Add our state files to the formData
    formData.delete("attachment"); // clear initial single select
    files.forEach(file => {
      formData.append("attachment", file);
    });

    try {
      const result = await submitRfq(formData);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || "Bir hata oluştu.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setError("Sunucu hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div style={{ textAlign: "center", padding: "5rem 0" }}>
        <div style={{ 
          width: "100px", height: "100px", backgroundColor: "#D1FAE5", 
          borderRadius: "50%", display: "flex", alignItems: "center", 
          justifyContent: "center", margin: "0 auto 2rem", color: "#059669" 
        }}>
          <Check size={50} strokeWidth={3} />
        </div>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#0F172A", marginBottom: "1rem" }}>Talebiniz Alındı!</h1>
        <p style={{ color: "#64748B", fontSize: "1.1rem", maxWidth: "500px", margin: "0 auto 3rem", lineHeight: "1.6" }}>
          Teklif talebiniz başarıyla ulaştı. Ekibimiz seçtiğiniz ürünleri ve dosyalarınızı inceleyerek en kısa sürede size dönüş yapacaktır.
        </p>
        <Link href="/" className="btn-primary" style={{ padding: "1rem 2rem", borderRadius: "16px" }}>
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.formWrapper}>
      <form action={handleSubmit}>
        <div className={styles.formGrid}>
          
          {/* Firma Bilgileri */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>
              <User size={22} style={{ color: "var(--color-accent)" }} /> Firma Bilgileri
            </h3>
            
            <div className={styles.inputGrid}>
              <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                <label className={styles.label}>Firma / Gemi Adı *</label>
                <input type="text" name="companyName" className={styles.input} placeholder="Örn: ABC Maritime" required />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Yetkili Kişi *</label>
                <input type="text" name="contactName" className={styles.input} placeholder="Ad Soyad" required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>E-posta *</label>
                <input type="email" name="email" className={styles.input} placeholder="ornek@firma.com" required />
              </div>

              <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                <label className={styles.label}>Teslimat Noktası *</label>
                <div style={{ position: "relative" }}>
                  <MapPin size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
                  <input type="text" name="deliveryPoint" className={styles.input} style={{ paddingLeft: "3rem" }} placeholder="Liman, Tersane veya Lokasyon" required />
                </div>
              </div>

              <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                <label className={styles.label}>Dosya Ekleri (Opsiyonel)</label>
                <div className={styles.fileUploadZone}>
                  <input 
                    type="file" 
                    className={styles.fileInput} 
                    id="file-upload" 
                    multiple
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload" className={styles.fileLabel} style={{ position: "relative", overflow: "hidden" }}>
                    {aiLoading && (
                      <div style={{
                        position: "absolute", inset: 0, 
                        background: "rgba(0, 163, 255, 0.9)",
                        color: "white", display: "flex", alignItems: "center",
                        justifyContent: "center", gap: "1rem", zIndex: 10,
                        fontWeight: "800", fontSize: "1.1rem",
                        animation: "pulseAi 1.5s infinite"
                      }}>
                        <Layers className={styles.spinning} /> Yapay Zeka Tarafından Akıllı Tarama Yapılıyor...
                      </div>
                    )}
                    <div className={styles.uploadIcon}><Package size={32} /></div>
                    <div>
                      <strong>Dosyalarınızı Ekleyin</strong>
                      <span>Excel, PDF veya Resimler (Birden fazla seçilebilir)</span>
                    </div>
                  </label>
                </div>

                {/* Seçilen Dosya Listesi */}
                {files.length > 0 && (
                  <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                    {files.map((file, index) => (
                      <div key={index} style={{ 
                        display: "flex", alignItems: "center", gap: "0.5rem", 
                        padding: "0.5rem 1rem", backgroundColor: "white", 
                        border: "1px solid #E2E8F0", borderRadius: "12px",
                        fontSize: "0.85rem", color: "#1E293B", fontWeight: "600"
                      }}>
                        <Package size={14} color="var(--color-accent)" />
                        <span style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {file.name}
                        </span>
                        <button type="button" onClick={() => removeFile(index)} style={{ color: "#EF4444", display: "flex", alignItems: "center" }}>
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Akıllı Katalog Seçimi */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>
              <Layers size={22} style={{ color: "var(--color-accent)" }} /> Akıllı Katalog Seçimi
            </h3>
            
            <p style={{ fontSize: "0.9rem", color: "#64748B", marginBottom: "1.5rem" }}>
              Kataloğumuzda yer alan ürünleri isme göre aratıp anında listenize ekleyebilirsiniz.
            </p>

            <SmartSearch onSelect={addItem} />

            {selectedItems.length > 0 && (
              <div style={{ marginTop: "2rem" }}>
                <table className={styles.selectedTable}>
                  <thead>
                    <tr>
                      <th>Ürün Adı</th>
                      <th style={{ textAlign: "center" }}>Miktar</th>
                      <th style={{ textAlign: "right" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedItems.map(item => (
                      <tr key={item.id}>
                        <td style={{ fontWeight: "700", color: "#1E293B" }}>{item.name}</td>
                        <td style={{ textAlign: "center" }}>
                          <input 
                            type="number" 
                            value={item.quantity} 
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            style={{ width: "60px", padding: "0.5rem", borderRadius: "10px", border: "2px solid #E2E8F0", textAlign: "center", fontWeight: "700" }}
                          />
                        </td>
                        <td style={{ textAlign: "right" }}>
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

            <div style={{ marginTop: "3rem" }}>
              <h3 className={styles.sectionTitle}>
                <Info size={22} style={{ color: "var(--color-accent)" }} /> Ek Detaylar
              </h3>
              <textarea 
                name="details"
                className={styles.textarea} 
                style={{ height: "120px" }}
                placeholder="Listede olmayan ürünler veya özel notlarınız..."
                required
              ></textarea>
            </div>
          </div>

        </div>

        {error && (
          <p style={{ color: "#EF4444", fontWeight: "700", textAlign: "center", marginTop: "2rem", padding: "1rem", background: "#FEF2F2", borderRadius: "12px" }}>
            {error}
          </p>
        )}

        <div style={{ marginTop: "4rem", textAlign: "center" }}>
          <button type="submit" disabled={loading} className={styles.submitBtn} style={{ maxWidth: "400px", margin: "0 auto" }}>
            {loading ? "Talebiniz Gönderiliyor..." : "Teklif Talebini Gönder (RFQ)"}
            {!loading && <Send size={20} />}
          </button>
        </div>
      </form>
    </div>
  );
}
