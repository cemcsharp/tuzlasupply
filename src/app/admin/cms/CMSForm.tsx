"use client";

import styles from "../admin.module.css";
import { updateSiteContent, addHeroSlide, deleteHeroSlide } from "@/app/actions/cms";
import { useState } from "react";

interface Category {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export default function CMSForm({ initialContent, initialSlides = [] }: { initialContent: any, initialSlides: any[] }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState<Category[]>(initialContent.categories);
  const [slides, setSlides] = useState(initialSlides);

  const addCategory = () => {
    const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    setCategories([...categories, { id: newId, title: "Yeni Kategori", description: "Açıklama...", icon: "⚓" }]);
  };

  const removeCategory = (id: number) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const updateCategory = (id: number, field: keyof Category, value: string) => {
    setCategories(categories.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage("");
    
    // Append the updated categories as JSON string
    formData.set("categoriesJson", JSON.stringify(categories));

    const result = await updateSiteContent(formData);
    if (result.success) {
      setMessage("İçerikler başarıyla güncellendi.");
    } else {
      setMessage("Hata: " + result.error);
    }
    setLoading(false);
  }

  return (
    <div style={{ paddingBottom: "4rem" }}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Gelişmiş İçerik Editörü</h1>
        <p style={{ color: "var(--color-text-muted)", marginTop: "0.5rem" }}>
          Sitenizin görsel ve metinsel dünyasını buradan profesyonelce yönetin.
        </p>
      </div>

      <form action={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "2rem", alignItems: "start" }}>
          
          {/* Main Controls */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            {/* 1. Hero Section */}
            <div className={styles.tableCard} style={{ padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "#E0F2FE", color: "#0284C7", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", fontWeight: "bold" }}>01</div>
                <h2 style={{ fontSize: "1.25rem", color: "var(--color-primary)" }}>Hero (Giriş) Bölümü</h2>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ fontWeight: "700", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>ANA BAŞLIK (H1)</label>
                  <input 
                    type="text" 
                    name="heroTitle" 
                    defaultValue={initialContent.heroTitle} 
                    className={styles.formInput}
                    style={{ fontSize: "1.1rem", fontWeight: "600", padding: "0.8rem" }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ fontWeight: "700", fontSize: "0.9rem", color: "var(--color-text-muted)" }}>SLOGAN / ALT METİN</label>
                  <textarea 
                    name="heroSub" 
                    defaultValue={initialContent.heroSub} 
                    className={styles.formInput}
                    style={{ minHeight: "80px", padding: "0.8rem", lineHeight: "1.6" }}
                  />
                </div>
              </div>
            </div>

            {/* 2. Hero Carousel (Dynamic Slides) */}
            <div className={styles.tableCard} style={{ padding: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "#EDE9FE", color: "#7C3AED", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", fontWeight: "bold" }}>02</div>
                  <h2 style={{ fontSize: "1.25rem", color: "var(--color-primary)" }}>Hero Carousel (Görsel Slaytlar)</h2>
                </div>
                <button 
                  type="button" 
                  onClick={async () => {
                    await addHeroSlide({ 
                      title: "Yeni Slayt Başlığı", 
                      subtitle: "Slayt alt başlığı...", 
                      imageUrl: "https://images.unsplash.com/photo-1559139225-421a021395df?q=80&w=1920&auto=format&fit=crop", 
                      order: slides.length 
                    });
                    window.location.reload();
                  }} 
                  className="btn-secondary" 
                  style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", borderColor: "#7C3AED", color: "#7C3AED" }}
                >
                  + Yeni Slayt Ekle
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {slides.length === 0 ? (
                  <div style={{ padding: "2rem", textAlign: "center", border: "2px dashed var(--color-border)", borderRadius: "1rem", color: "var(--color-text-muted)" }}>
                    Henüz slayt eklenmedi. Siteniz varsayılan metinleri kullanıyor.
                  </div>
                ) : (
                  slides.map((slide: any) => (
                    <div key={slide.id} style={{ 
                      padding: "1rem", 
                      borderRadius: "0.75rem", 
                      border: "1px solid var(--color-border)", 
                      display: "grid", 
                      gridTemplateColumns: "120px 1fr 100px", 
                      gap: "1.5rem",
                      alignItems: "center"
                    }}>
                      <div style={{ width: "120px", height: "70px", borderRadius: "6px", overflow: "hidden", backgroundColor: "#000" }}>
                        <img src={slide.imageUrl} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: "600", fontSize: "0.95rem" }}>{slide.title}</div>
                        <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{slide.subtitle}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <button 
                          type="button" 
                          onClick={async () => {
                            if(confirm("Bu slaytı silmek istediğinize emin misiniz?")) {
                              await deleteHeroSlide(slide.id);
                              window.location.reload();
                            }
                          }}
                          style={{ color: "#EF4444", fontSize: "0.85rem", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                        >
                          Slaytı Sil
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 3. About Section */}
            <div className={styles.tableCard} style={{ padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "#F0FDF4", color: "#16A34A", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", fontWeight: "bold" }}>03</div>
                <h2 style={{ fontSize: "1.25rem", color: "var(--color-primary)" }}>Hakkımızda & Vizyon</h2>
              </div>
              <textarea 
                name="aboutText" 
                defaultValue={initialContent.aboutText} 
                className={styles.formInput}
                style={{ minHeight: "120px", padding: "1rem", lineHeight: "1.7" }}
              />
            </div>

            {/* 3. Categories Visual Editor */}
            <div className={styles.tableCard} style={{ padding: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "#FEF2F2", color: "#DC2626", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", fontWeight: "bold" }}>03</div>
                  <h2 style={{ fontSize: "1.25rem", color: "var(--color-primary)" }}>Hizmet Kategorileri</h2>
                </div>
                <button type="button" onClick={addCategory} className="btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", borderColor: "var(--color-accent)", color: "var(--color-accent)" }}>
                  + Yeni Kategori Ekle
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {categories.map((cat) => (
                  <div key={cat.id} style={{ 
                    padding: "1.5rem", 
                    borderRadius: "1rem", 
                    border: "1px solid var(--color-border)", 
                    backgroundColor: "var(--color-background)",
                    position: "relative"
                  }}>
                    <button 
                      type="button" 
                      onClick={() => removeCategory(cat.id)}
                      style={{ position: "absolute", top: "0.5rem", right: "0.5rem", border: "none", background: "none", color: "#EF4444", cursor: "pointer", fontSize: "1.2rem" }}
                    >
                      ×
                    </button>
                    
                    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                      <input 
                        type="text" 
                        value={cat.icon} 
                        onChange={(e) => updateCategory(cat.id, "icon", e.target.value)}
                        style={{ width: "45px", height: "45px", textAlign: "center", fontSize: "1.2rem", borderRadius: "8px", border: "1px solid var(--color-border)" }}
                        placeholder="Icon"
                      />
                      <input 
                        type="text" 
                        value={cat.title} 
                        onChange={(e) => updateCategory(cat.id, "title", e.target.value)}
                        style={{ flex: 1, fontWeight: "600", padding: "0 0.5rem", borderRadius: "8px", border: "1px solid var(--color-border)" }}
                        placeholder="Başlık"
                      />
                    </div>
                    <textarea 
                      value={cat.description} 
                      onChange={(e) => updateCategory(cat.id, "description", e.target.value)}
                      style={{ width: "100%", minHeight: "60px", padding: "0.5rem", borderRadius: "8px", border: "1px solid var(--color-border)", fontSize: "0.85rem", color: "var(--color-text-muted)" }}
                      placeholder="Kısa açıklama..."
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar / Actions */}
          <div style={{ position: "sticky", top: "2rem" }}>
            <div className={styles.tableCard} style={{ padding: "1.5rem" }}>
              <h3 style={{ marginBottom: "1rem", fontSize: "1rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "0.5rem" }}>Yayınla</h3>
              
              {message && (
                <div style={{ 
                  padding: "1rem", 
                  borderRadius: "0.5rem", 
                  backgroundColor: message.startsWith("Hata") ? "#FEE2E2" : "#D1FAE5",
                  color: message.startsWith("Hata") ? "#B91C1C" : "#065F46",
                  fontWeight: "600",
                  marginBottom: "1rem",
                  fontSize: "0.85rem"
                }}>
                  {message}
                </div>
              )}

              <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
                Değişiklikleri kaydettiğinizde ana sayfanızdaki içerikler anında güncellenecektir.
              </p>

              <button 
                type="submit" 
                disabled={loading} 
                className="btn-primary" 
                style={{ width: "100%", padding: "1rem", fontSize: "1rem", fontWeight: "700", boxShadow: "0 4px 12px rgba(2, 132, 199, 0.3)" }}
              >
                {loading ? "Yayına Alınıyor..." : "Değişiklikleri Kaydet"}
              </button>

              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                <a href="/" target="_blank" style={{ fontSize: "0.85rem", color: "var(--color-accent)", textDecoration: "none" }}>
                  Siteyi Görüntüle ↗
                </a>
              </div>
            </div>

            <div style={{ marginTop: "1rem", padding: "1rem", color: "var(--color-text-muted)", fontSize: "0.8rem", textAlign: "center" }}>
              Son güncelleme: {new Date(initialContent.updatedAt).toLocaleString('tr-TR')}
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}
