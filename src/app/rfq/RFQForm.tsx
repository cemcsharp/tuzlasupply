"use client";

import React, { useState, useEffect } from "react";
import styles from "./rfq.module.css";
import { submitRfq } from "@/app/actions/rfq";
import { parseRfqFileWithAi } from "@/app/actions/ai";
import Link from "next/link";
import SmartSearch from "@/components/SmartSearch";
import { 
  Check, User, MapPin, Send, Info, Package, X, Layers, Plus
} from "lucide-react";

export default function RFQForm() {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [aiLoading, setAiLoading] = useState(false);
  const [modal, setModal] = useState<{
    show: boolean;
    title: string;
    message: string;
    items?: any[];
    onConfirm?: () => void;
    type: "info" | "error" | "success";
  }>({ show: false, title: "", message: "", type: "info" });

  // Manuel ürün girişi state'leri
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);

      // Trigger AI Scanning
      setAiLoading(true);
      try {
        for (const file of newFiles) {
          const fileData = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve((reader.result as string).split(',')[1]);
            reader.readAsDataURL(file);
          });

          const result = await parseRfqFileWithAi(fileData, file.type);
          
          if (result.success && result.items) {
            setModal({
              show: true,
              title: "Ürünler Ayıklandı",
              message: "Yapay zeka dökümanınızda aşağıdaki ürünleri buldu. Listenize eklemek istiyor musunuz?",
              items: result.items,
              type: "success",
              onConfirm: () => {
                result.items.forEach((item: any) => addItem(item));
                setModal(prev => ({ ...prev, show: false }));
              }
            });
          } else if (!result.success) {
            setModal({
              show: true,
              title: "Tarama Hatası",
              message: result.error || "Dosya işlenirken bir sorun oluştu.",
              type: "error"
            });
          }
        }
      } catch (err) {
        setModal({
          show: true,
          title: "Sistem Hatası",
          message: "Dosya okuma sırasında teknik bir aksaklık yaşandı.",
          type: "error"
        });
      } finally {
        setAiLoading(false);
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const handleAddItems = (e: any) => {
      if (e.detail && Array.isArray(e.detail)) {
        e.detail.forEach((item: any) => addItem(item));
      }
    };
    window.addEventListener("ADD_RFQ_ITEMS", handleAddItems);

    const pending = localStorage.getItem("pending_rfq_items");
    if (pending) {
      try {
        const items = JSON.parse(pending);
        if (Array.isArray(items) && items.length > 0) {
          items.forEach(item => addItem(item));
          localStorage.removeItem("pending_rfq_items");
        }
      } catch (e) {
        console.error("Storage Error:", e);
      }
    }

    return () => window.removeEventListener("ADD_RFQ_ITEMS", handleAddItems);
  }, []);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    formData.set("itemsJson", JSON.stringify(selectedItems));
    
    formData.delete("attachment");
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
                    accept="image/*,.pdf,.xlsx,.xls,.csv,.docx,.doc"
                  />
                  <label htmlFor="file-upload" className={styles.fileLabel} style={{ position: "relative", overflow: "hidden" }}>
                    {aiLoading && (
                      <div className={styles.aiOverlay}>
                        <Layers className={styles.spinning} /> Yapay Zeka Tarafından Akıllı Tarama Yapılıyor...
                      </div>
                    )}
                    <div className={styles.uploadIcon}><Package size={32} /></div>
                    <div>
                      <strong>Dosyalarınızı Ekleyin</strong>
                      <span>Excel, Word, PDF veya Resimler</span>
                    </div>
                  </label>
                </div>

                {files.length > 0 && (
                  <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                    {files.map((file, index) => (
                      <div key={index} className={styles.fileTag}>
                        <Package size={14} color="var(--color-accent)" />
                        <span>{file.name}</span>
                        <button type="button" onClick={() => removeFile(index)}><X size={14} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Ürün Seçimi */}
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>
              <Layers size={22} style={{ color: "var(--color-accent)" }} /> Ürün Seçimi
            </h3>
            
            <p style={{ fontSize: "0.9rem", color: "#64748B", marginBottom: "1.5rem" }}>
              Katalogdan arama yapabilir veya listenize manuel ürün ekleyebilirsiniz.
            </p>

            <div style={{ marginBottom: "2rem" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: "800", color: "#94A3B8", textTransform: "uppercase", marginBottom: "0.5rem", display: "block" }}>Katalogdan Arama</label>
              <SmartSearch onSelect={addItem} />
            </div>

            {/* Manuel Ürün Ekleme */}
            <div style={{ padding: "1.25rem", background: "#F8FAFC", borderRadius: "16px", border: "1px dashed #E2E8F0", marginBottom: "2rem" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: "800", color: "var(--color-accent)", textTransform: "uppercase", marginBottom: "1rem", display: "block" }}>Katalogda Olmayan Ürün Ekle</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 80px auto", gap: "0.5rem", alignItems: "center" }}>
                <input 
                  type="text" 
                  placeholder="Ürün Adı" 
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className={styles.input}
                  style={{ padding: "0.6rem 0.8rem", fontSize: "0.85rem" }}
                />
                <input 
                  type="number" 
                  value={manualQty}
                  onChange={(e) => setManualQty(parseInt(e.target.value))}
                  className={styles.input}
                  style={{ padding: "0.6rem 0.5rem", fontSize: "0.85rem", textAlign: "center" }}
                />
                <input 
                  type="text" 
                  placeholder="Birim" 
                  value={manualUnit}
                  onChange={(e) => setManualUnit(e.target.value)}
                  className={styles.input}
                  style={{ padding: "0.6rem 0.5rem", fontSize: "0.85rem" }}
                />
                <button 
                  type="button" 
                  onClick={handleAddManual}
                  disabled={!manualName}
                  style={{ 
                    padding: "0.6rem", borderRadius: "10px", border: "none", 
                    backgroundColor: manualName ? "var(--color-accent)" : "#CBD5E1", 
                    color: "white", cursor: manualName ? "pointer" : "default"
                  }}
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {selectedItems.length > 0 && (
              <div style={{ marginTop: "1rem" }}>
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
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                            <input 
                              type="number" 
                              value={item.quantity} 
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                              style={{ width: "50px", padding: "0.4rem", borderRadius: "8px", border: "2px solid #E2E8F0", textAlign: "center", fontWeight: "700" }}
                            />
                            <span style={{ fontSize: "0.75rem", color: "#64748B" }}>{item.unit}</span>
                          </div>
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

            <div style={{ marginTop: "2rem" }}>
              <h3 className={styles.sectionTitle}>
                <Info size={22} style={{ color: "var(--color-accent)" }} /> Ek Detaylar
              </h3>
              <textarea 
                name="details"
                className={styles.textarea} 
                style={{ height: "100px" }}
                placeholder="Listede olmayan diğer ürünler veya özel notlarınız..."
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

      {/* Modals remain the same... */}
      {modal.show && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={`${styles.modalIcon} ${modal.type === 'error' ? styles.bgError : styles.bgSuccess}`}>
              {modal.type === 'success' ? <Check size={40} color="#059669" /> : <X size={40} color="#DC2626" />}
            </div>
            <h2 className={styles.modalTitle}>{modal.title}</h2>
            <p className={styles.modalMessage}>{modal.message}</p>
            
            {modal.items && modal.items.length > 0 && (
              <div className={styles.modalList}>
                {modal.items.map((item, idx) => (
                  <div key={idx} className={styles.modalListItem}>
                    • {item.name} ({item.quantity} {item.unit})
                  </div>
                ))}
              </div>
            )}

            <div className={styles.modalActions}>
              {modal.onConfirm && (
                <button 
                  onClick={modal.onConfirm}
                  className={`${styles.modalBtn} ${styles.modalBtnConfirm}`}
                >
                  Hepsini Ekle
                </button>
              )}
              <button 
                onClick={() => setModal({ ...modal, show: false })}
                className={`${styles.modalBtn} ${styles.modalBtnCancel}`}
              >
                {modal.onConfirm ? "Vazgeç" : "Tamam"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
