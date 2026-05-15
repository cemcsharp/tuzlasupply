
"use client";

import { useState, useMemo } from "react";
import styles from "./catalog.module.css";
import Link from "next/link";
import { 
  Package, ArrowRight, ChevronRight, 
  Layers, Search, Grid, List 
} from "lucide-react";

export default function CatalogClient({ initialProducts }: { initialProducts: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = useMemo(() => {
    return ["Tümü", ...Array.from(new Set(initialProducts.map(p => p.category)))];
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(p => {
      const matchesCat = selectedCategory === "Tümü" || p.category === selectedCategory;
      const isImpa = p.description?.startsWith("IMPA:");
      const impaCode = isImpa ? p.description.split(":")[1] : "";
      
      const matchesSearch = 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        impaCode.toLowerCase().includes(searchTerm.toLowerCase());
        
      return matchesCat && matchesSearch;
    });
  }, [initialProducts, selectedCategory, searchTerm]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "3rem" }}>
      
      {/* 1. Ürün Ağacı (Sidebar) */}
      <aside style={{ position: "sticky", top: "120px", alignSelf: "start" }}>
        <div style={{ 
          backgroundColor: "white", padding: "1.5rem", borderRadius: "24px", 
          border: "1px solid #E2E8F0", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.03)" 
        }}>
          <h3 style={{ fontSize: "1rem", fontWeight: "800", color: "#0F172A", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Layers size={18} style={{ color: "var(--color-accent)" }} /> Ürün Ağacı
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "0.85rem 1.25rem", borderRadius: "14px", border: "none",
                  backgroundColor: selectedCategory === cat ? "var(--color-primary)" : "transparent",
                  color: selectedCategory === cat ? "white" : "#64748B",
                  fontWeight: selectedCategory === cat ? "700" : "600",
                  fontSize: "0.95rem", cursor: "pointer", transition: "all 0.2s"
                }}
              >
                {cat}
                {selectedCategory === cat && <ChevronRight size={14} />}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "2rem", padding: "1.5rem", backgroundColor: "rgba(0, 163, 255, 0.05)", borderRadius: "20px", border: "1px dashed var(--color-accent)" }}>
          <p style={{ fontSize: "0.85rem", color: "var(--color-primary)", fontWeight: "600", lineHeight: "1.5" }}>
            Aradığınız ürünü bulamadınız mı? Bize doğrudan teknik spesifikasyonlarınızı iletebilirsiniz.
          </p>
          <Link href="/rfq" style={{ display: "block", marginTop: "1rem", color: "var(--color-accent)", fontWeight: "800", fontSize: "0.9rem" }}>
            Özel Teklif İste →
          </Link>
        </div>
      </aside>

      {/* 2. Ürün Listesi */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        
        {/* Search & Stats Bar */}
        <div style={{ 
          display: "flex", justifyContent: "space-between", alignItems: "center", 
          backgroundColor: "white", padding: "1rem 1.5rem", borderRadius: "20px", 
          border: "1px solid #E2E8F0" 
        }}>
          <div style={{ position: "relative", width: "400px" }}>
            <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
            <input 
              type="text" 
              placeholder="Ürün adı veya IMPA kodu ile ara..." 
              style={{ 
                width: "100%", padding: "0.75rem 1rem 0.75rem 2.75rem", borderRadius: "14px", 
                border: "1px solid #F1F5F9", backgroundColor: "#F8FAFC", outline: "none",
                fontSize: "0.95rem"
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ color: "#94A3B8", fontSize: "0.9rem", fontWeight: "600" }}>
            {filteredProducts.length} Ürün Listeleniyor
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className={styles.productGrid}>
            {filteredProducts.map((product) => {
              const isImpa = product.description?.startsWith("IMPA:");
              const impaCode = isImpa ? product.description.split(":")[1] : null;
              
              return (
                <div key={product.id} className={styles.productCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                    <span className={styles.categoryTag}>{product.category}</span>
                    {impaCode && (
                      <span style={{ 
                        fontSize: "0.75rem", fontWeight: "800", color: "#38bdf8", 
                        background: "rgba(56, 189, 248, 0.1)", padding: "0.4rem 0.8rem", 
                        borderRadius: "8px", letterSpacing: "0.05em" 
                      }}>
                        IMPA {impaCode}
                      </span>
                    )}
                  </div>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDesc}>
                    {isImpa ? `${product.category} kategorisinde yüksek performanslı endüstriyel çözüm.` : product.description}
                  </p>
                  <div className={styles.productFooter}>
                    <div style={{ color: "var(--color-accent)", fontWeight: "700", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Package size={16} /> <span>Birim: {product.unit}</span>
                    </div>
                    <Link href="/rfq" className="btn-primary" style={{ padding: "0.75rem 1.25rem", borderRadius: "14px", fontSize: "0.9rem" }}>
                      Fiyat İste <ArrowRight size={16} style={{ marginLeft: "4px" }} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "10rem 0", color: "#94A3B8" }}>
            <Grid size={48} style={{ marginBottom: "1rem", opacity: 0.2 }} />
            <h3>Bu kategoride ürün bulunamadı.</h3>
            <p>Filtreleri sıfırlayarak tekrar deneyebilirsiniz.</p>
          </div>
        )}
      </div>
    </div>
  );
}
