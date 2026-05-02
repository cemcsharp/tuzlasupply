"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Plus, Package, X, Loader2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  price?: number;
}

export default function SmartSearch({ onSelect }: { onSelect: (product: Product) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const searchProducts = useCallback(async (q: string) => {
    if (!q || q.length < 2) {
      setResults([]);
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`/api/products/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchProducts(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, searchProducts]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div style={{ position: "relative" }}>
        <Search size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
        <input
          type="text"
          placeholder="Katalogdan ürün ara (Örn: Boya, Halat...)"
          style={{
            width: "100%",
            padding: "1rem 1rem 1rem 3rem",
            borderRadius: "16px",
            border: "2px solid #F1F5F9",
            backgroundColor: "#F8FAFC",
            fontSize: "1rem",
            fontWeight: "500",
            transition: "all 0.3s ease"
          }}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        {loading && (
          <Loader2 size={18} className="animate-spin" style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--color-accent)" }} />
        )}
      </div>

      {open && (query.length >= 2 || results.length > 0) && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          left: 0,
          right: 0,
          backgroundColor: "white",
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          zIndex: 100,
          maxHeight: "300px",
          overflowY: "auto",
          padding: "0.5rem"
        }}>
          {results.length === 0 && !loading ? (
            <div style={{ padding: "1.5rem", textAlign: "center", color: "#94A3B8", fontSize: "0.9rem" }}>
              Ürün bulunamadı. <br/> <span style={{ fontSize: "0.75rem" }}>Aradığınızı aşağıdaki detay kısmına manuel yazabilirsiniz.</span>
            </div>
          ) : (
            <>
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelect(product);
                    setQuery("");
                    setOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.85rem 1rem",
                    borderRadius: "12px",
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#F8FAFC"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ padding: "0.5rem", background: "#F1F5F9", borderRadius: "8px", color: "#64748B" }}>
                      <Package size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: "700", color: "#1E293B", fontSize: "0.9rem" }}>{product.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>{product.category}</div>
                    </div>
                  </div>
                  <Plus size={18} color="var(--color-accent)" />
                </div>
              ))}
              <div style={{ 
                padding: "1rem", 
                borderTop: "1px solid #F1F5F9", 
                marginTop: "0.5rem", 
                fontSize: "0.8rem", 
                color: "#64748B",
                textAlign: "center"
              }}>
                Aradığınızı bulamadınız mı? <strong>Aşağıdaki detay kısmına manuel yazabilirsiniz.</strong>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
