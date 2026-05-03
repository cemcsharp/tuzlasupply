"use client";

import { useState } from "react";
import styles from "../admin.module.css";
import { addProduct } from "@/app/actions/products";
import { 
  Plus, X, Package, Layers, Tag, DollarSign, 
  FileText, CheckCircle2, AlertCircle, Save 
} from "lucide-react";

export default function ProductForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError("");
    const result = await addProduct(formData);
    if (result.success) {
      setIsOpen(false);
    } else {
      setError(result.error || "Bir hata oluştu");
    }
    setLoading(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.85rem 1.5rem" }}>
        <Plus size={20} /> Yeni Ürün Ekle
      </button>

      {isOpen && (
        <div style={{ 
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%", 
          backgroundColor: "rgba(15, 23, 42, 0.6)", display: "flex", alignItems: "center", 
          justifyContent: "center", zIndex: 1000, backdropFilter: "blur(8px)"
        }}>
          <div className={styles.tableCard} style={{ 
            width: "650px", 
            padding: "0", 
            position: "relative", 
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}>
            {/* Modal Header */}
            <div style={{ 
              background: "linear-gradient(135deg, #00A3FF 0%, #0066FF 100%)", 
              padding: "2rem", 
              color: "white",
              position: "relative"
            }}>
              <button 
                onClick={() => setIsOpen(false)} 
                style={{ position: "absolute", right: "1.5rem", top: "1.5rem", background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", padding: "0.5rem", color: "white", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ padding: "0.75rem", background: "rgba(255,255,255,0.2)", borderRadius: "12px" }}>
                  <Package size={28} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "800" }}>Yeni Ürün Kaydı</h2>
                  <p style={{ margin: "0.25rem 0 0", fontSize: "0.9rem", opacity: 0.8 }}>Envanterinize yeni bir kalem ekleyin.</p>
                </div>
              </div>
            </div>
            
            <form action={handleSubmit} style={{ padding: "2.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                
                {/* Sol Kolon */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div className={styles.formGroup}>
                    <label style={{ 
                      fontSize: "0.75rem", 
                      fontWeight: "800", 
                      color: "#94A3B8", 
                      textTransform: "uppercase", 
                      letterSpacing: "0.05em", 
                      marginBottom: "0.5rem",
                      marginLeft: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    }}>
                      <Tag size={14} color="var(--color-accent)" /> Ürün Adı *
                    </label>
                    <input type="text" name="name" className={styles.input} required placeholder="Örn: Sintine Vanası" />
                  </div>

                  <div className={styles.formGroup}>
                    <label style={{ 
                      fontSize: "0.75rem", 
                      fontWeight: "800", 
                      color: "#94A3B8", 
                      textTransform: "uppercase", 
                      letterSpacing: "0.05em", 
                      marginBottom: "0.5rem",
                      marginLeft: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    }}>
                      <Layers size={14} color="var(--color-accent)" /> Kategori *
                    </label>
                    <select name="category" className={styles.input} required style={{ appearance: "none", cursor: "pointer" }}>
                      <option value="Mekanik">Mekanik Parçalar</option>
                      <option value="Elektrik">Elektrik & Aydınlatma</option>
                      <option value="Hidrolik">Hidrolik Sistemler</option>
                      <option value="Vana">Vanalar & Boru Ekleri</option>
                      <option value="Güverte">Güverte Malzemeleri</option>
                      <option value="Kumanya">Kumanya & İkmal</option>
                      <option value="Diğer">Diğer</option>
                    </select>
                  </div>
                </div>

                {/* Sağ Kolon */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div className={styles.formGroup}>
                    <label style={{ 
                      fontSize: "0.75rem", 
                      fontWeight: "800", 
                      color: "#94A3B8", 
                      textTransform: "uppercase", 
                      letterSpacing: "0.05em", 
                      marginBottom: "0.5rem",
                      marginLeft: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    }}>
                      <DollarSign size={14} color="var(--color-accent)" /> Birim Fiyat (USD)
                    </label>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8", fontWeight: "700" }}>$</span>
                      <input type="number" step="0.01" name="price" className={styles.input} style={{ paddingLeft: "2.5rem" }} placeholder="0.00" />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label style={{ 
                      fontSize: "0.75rem", 
                      fontWeight: "800", 
                      color: "#94A3B8", 
                      textTransform: "uppercase", 
                      letterSpacing: "0.05em", 
                      marginBottom: "0.5rem",
                      marginLeft: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    }}>
                      <Package size={14} color="var(--color-accent)" /> Birim *
                    </label>
                    <input type="text" name="unit" className={styles.input} required defaultValue="Adet" />
                  </div>
                </div>

                {/* Tam Genişlik */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <div className={styles.formGroup}>
                    <label style={{ 
                      fontSize: "0.75rem", 
                      fontWeight: "800", 
                      color: "#94A3B8", 
                      textTransform: "uppercase", 
                      letterSpacing: "0.05em", 
                      marginBottom: "0.5rem",
                      marginLeft: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    }}>
                      <FileText size={14} color="var(--color-accent)" /> Ürün Açıklaması & Teknik Detaylar
                    </label>
                    <textarea 
                      name="description" 
                      className={styles.textarea} 
                      style={{ height: "120px", fontSize: "0.95rem" }}
                      placeholder="Malzemenin teknik özelliklerini, markasını veya kullanım alanlarını buraya yazabilirsiniz..."
                    ></textarea>
                  </div>
                </div>
              </div>

              {error && (
                <div style={{ 
                  marginTop: "1.5rem", 
                  padding: "1rem", 
                  background: "#FEF2F2", 
                  borderRadius: "12px", 
                  color: "#EF4444", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.75rem",
                  fontSize: "0.9rem",
                  fontWeight: "600"
                }}>
                  <AlertCircle size={18} /> {error}
                </div>
              )}

              <div style={{ display: "flex", gap: "1.5rem", marginTop: "2.5rem" }}>
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)} 
                  className="btn-secondary" 
                  style={{ flex: 1, padding: "1rem", borderRadius: "14px", fontWeight: "700" }}
                >
                  Vazgeç
                </button>
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="btn-primary" 
                  style={{ 
                    flex: 2, 
                    padding: "1rem", 
                    borderRadius: "14px", 
                    fontWeight: "800",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.75rem",
                    boxShadow: "0 10px 15px -3px rgba(0, 163, 255, 0.3)"
                  }}
                >
                  {loading ? "Kaydediliyor..." : <><Save size={20} /> Ürünü Kataloğa Ekle</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
