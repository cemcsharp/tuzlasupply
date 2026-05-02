"use client";

import { useState, useMemo } from "react";
import styles from "../admin.module.css";
import DeleteProductButton from "./DeleteProductButton";
import { 
  Package, Search, Filter, Tag, DollarSign, 
  ArrowUpDown, X, SlidersHorizontal, ChevronRight
} from "lucide-react";

export default function ProductList({ initialProducts }: { initialProducts: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const categories = useMemo(() => ["Tümü", ...Array.from(new Set(initialProducts.map(p => p.category)))], [initialProducts]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = initialProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "Tümü" || p.category === selectedCategory;
      const price = p.price || 0;
      const matchesMinPrice = minPrice === "" || price >= parseFloat(minPrice);
      const matchesMaxPrice = maxPrice === "" || price <= parseFloat(maxPrice);
      
      return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
    });

    result.sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "price-asc") return (a.price || 0) - (b.price || 0);
      if (sortBy === "price-desc") return (b.price || 0) - (a.price || 0);
      return 0;
    });

    return result;
  }, [initialProducts, searchTerm, selectedCategory, minPrice, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("Tümü");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("name-asc");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Stat Cards Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
        {[
          { label: "Toplam Ürün", val: initialProducts.length, icon: <Package size={20}/>, bg: "#E0F2FE", col: "#0284C7" },
          { label: "En Yüksek Fiyat", val: `$${Math.max(...initialProducts.map(p => p.price || 0)).toLocaleString()}`, icon: <DollarSign size={20}/>, bg: "#F0FDF4", col: "#16A34A" },
          { label: "Filtrelenmiş", val: filteredAndSortedProducts.length, icon: <Filter size={20}/>, bg: "#FEF3C7", col: "#D97706" },
          { label: "Aktif Sıralama", val: sortBy === 'price-asc' ? 'Artan' : sortBy === 'price-desc' ? 'Azalan' : 'A-Z', icon: <ArrowUpDown size={20}/>, bg: "#F1F5F9", col: "#475569" }
        ].map((s, i) => (
          <div key={i} className={styles.statCard} style={{ padding: "1.5rem", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p className={styles.premiumLabel} style={{ marginBottom: "0.25rem" }}>{s.label}</p>
                <h4 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#1E293B" }}>{s.val}</h4>
              </div>
              <div style={{ padding: "0.75rem", backgroundColor: s.bg, color: s.col, borderRadius: "14px" }}>
                {s.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Search & Advanced Toggle */}
      <div className={styles.tableCard} style={{ padding: "1.25rem", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)" }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div className={styles.searchWrapper}>
            <input 
              type="text" 
              placeholder="Ürün adı ile hızlı arama..." 
              className={styles.premiumInput} 
              style={{ paddingLeft: "3rem" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className={styles.searchIcon} size={20} />
          </div>
          
          <button 
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            style={{ 
              display: "flex", alignItems: "center", gap: "0.75rem", 
              padding: "0.75rem 1.25rem", borderRadius: "12px", border: "1px solid #E2E8F0",
              backgroundColor: isFilterVisible ? "#0F172A" : "white",
              color: isFilterVisible ? "white" : "#1E293B",
              fontWeight: "700", fontSize: "0.9rem", cursor: "pointer", transition: "all 0.3s"
            }}
          >
            <SlidersHorizontal size={18} />
            {isFilterVisible ? "Filtreleri Kapat" : "Gelişmiş Filtreleme"}
          </button>

          {(searchTerm || selectedCategory !== "Tümü" || minPrice || maxPrice) && (
            <button onClick={resetFilters} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.9rem", fontWeight: "600", marginLeft: "0.5rem" }}>
              <X size={16} /> Sıfırla
            </button>
          )}
        </div>

        {/* Advanced Filter Panel */}
        {isFilterVisible && (
          <div className={styles.filterBox}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr", gap: "2rem" }}>
              <div>
                <label className={styles.premiumLabel}>Kategori</label>
                <select className={`${styles.premiumInput} ${styles.premiumSelect}`} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              
              <div>
                <label className={styles.premiumLabel}>Fiyat Aralığı (USD)</label>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <div style={{ position: "relative", flex: 1 }}>
                    <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8", fontSize: "0.85rem" }}>$</span>
                    <input type="number" placeholder="Min" className={styles.premiumInput} style={{ paddingLeft: "2rem" }} value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                  </div>
                  <ChevronRight size={16} style={{ color: "#CBD5E1" }} />
                  <div style={{ position: "relative", flex: 1 }}>
                    <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8", fontSize: "0.85rem" }}>$</span>
                    <input type="number" placeholder="Max" className={styles.premiumInput} style={{ paddingLeft: "2rem" }} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                  </div>
                </div>
              </div>

              <div>
                <label className={styles.premiumLabel}>Sıralama Ölçütü</label>
                <select className={`${styles.premiumInput} ${styles.premiumSelect}`} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="name-asc">İsim (A-Z)</option>
                  <option value="name-desc">İsim (Z-A)</option>
                  <option value="price-asc">Fiyat (Düşük → Yüksek)</option>
                  <option value="price-desc">Fiyat (Yüksek → Düşük)</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Table */}
      <div className={styles.tableCard} style={{ border: "none", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.03)" }}>
        <div className={styles.tableWrapper}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th style={{ width: "40%", background: "#F8FAFC" }}>Ürün & Referans</th>
                <th style={{ width: "20%", background: "#F8FAFC" }}>Kategori</th>
                <th style={{ width: "15%", background: "#F8FAFC" }}>Birim</th>
                <th style={{ width: "15%", background: "#F8FAFC" }}>Birim Fiyat</th>
                <th style={{ width: "10%", textAlign: "right", background: "#F8FAFC" }}>Aksiyon</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedProducts.length > 0 ? (
                filteredAndSortedProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontWeight: "700", color: "#1E293B", fontSize: "1rem" }}>{product.name}</span>
                        <span style={{ fontSize: "0.7rem", color: "#94A3B8", letterSpacing: "0.05em", marginTop: "2px" }}>REF: {product.id.split('-')[0].toUpperCase()}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ 
                        padding: "0.4rem 0.8rem", 
                        backgroundColor: "#F1F5F9", 
                        borderRadius: "10px", 
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        color: "#475569",
                        textTransform: "uppercase"
                      }}>
                        {product.category}
                      </span>
                    </td>
                    <td style={{ color: "#64748B", fontWeight: "600" }}>{product.unit}</td>
                    <td>
                      <div style={{ fontWeight: "800", color: "#0F172A", fontSize: "1.05rem" }}>
                        ${product.price?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'}
                      </div>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <DeleteProductButton id={product.id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "5rem" }}>
                    <div style={{ display: "inline-flex", padding: "1.5rem", backgroundColor: "#F8FAFC", borderRadius: "50%", marginBottom: "1rem" }}>
                      <Search size={32} style={{ color: "#CBD5E1" }} />
                    </div>
                    <h3 style={{ color: "#1E293B", marginBottom: "0.5rem" }}>Ürün Bulunamadı</h3>
                    <p style={{ color: "#94A3B8", fontSize: "0.9rem" }}>Kriterlerinizi değiştirerek tekrar deneyebilirsiniz.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
