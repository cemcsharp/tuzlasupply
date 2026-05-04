"use client";

import { useState } from "react";
import { Search, FileText, Settings, ShieldCheck, ArrowRight, CheckCircle } from "lucide-react";
import styles from "../app/page.module.css";

export default function TechnicalFinder({ lang = "tr" }: { lang?: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any>(null);

  const mockData = [
    { id: "601.02.04", name: "Fuel Pump Impeller", brand: "MAN B&W", model: "L23/30H", status: "In Stock" },
    { id: "WR-99-AF", name: "Cylinder Liner Gasket", brand: "Wartsila", model: "W32", status: "Available" },
    { id: "S-55421", name: "Sealing Ring", brand: "Alfa Laval", model: "S-Type", status: "In Stock" }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;
    setIsSearching(true);
    
    // Simulate search
    setTimeout(() => {
      const found = mockData.find(item => item.id.includes(searchTerm) || item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setResult(found || "not_found");
      setIsSearching(false);
    }, 800);
  };

  return (
    <section className="section" style={{ background: "#0f172a", color: "#fff", padding: "8rem 0" }}>
      <div className="container">
        <div className={styles.techFinderHeader}>
          <div style={{ maxWidth: "600px" }}>
            <span className={styles.techSubtitle}>
              {lang === "tr" ? "TEKNİK VERİ MERKEZİ" : "TECHNICAL DATA HUB"}
            </span>
            <h2 className={styles.techTitle}>
              {lang === "tr" ? "Parça No ile Ara, Teknik Detayı Doğrula" : "Search by Part No, Verify Technical Detail"}
            </h2>
            <p className={styles.techDesc}>
              {lang === "tr" 
                ? "Binlerce gemi makinesi ve ekipmanının parça numaralarını, teknik şemalarını ve güncel stok durumlarını anında sorgulayın." 
                : "Instantly query part numbers, technical diagrams, and current stock status for thousands of marine engines and equipment."}
            </p>
          </div>
          
          <div className={styles.techStats}>
            <div className={styles.techStatItem}>
              <strong>50K+</strong>
              <span>{lang === "tr" ? "Parça Kaydı" : "Part Records"}</span>
            </div>
            <div className={styles.techStatItem}>
              <strong>12K+</strong>
              <span>{lang === "tr" ? "Teknik Şema" : "Technical Diagrams"}</span>
            </div>
          </div>
        </div>

        <div className={styles.techSearchBox}>
          <form onSubmit={handleSearch} className={styles.techSearchForm}>
            <Search className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder={lang === "tr" ? "Parça No, Marka veya Model yazın..." : "Type Part No, Brand or Model..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" disabled={isSearching}>
              {isSearching ? (lang === "tr" ? "Aranıyor..." : "Searching...") : (lang === "tr" ? "Sorgula" : "Query")}
            </button>
          </form>

          {result && (
            <div className={styles.searchResult}>
              {result === "not_found" ? (
                <p>{lang === "tr" ? "Sonuç bulunamadı, ancak uzman ekibimiz sizin için araştırabilir." : "No results found, but our expert team can research for you."}</p>
              ) : (
                <div className={styles.resultCard}>
                  <div className={styles.resultInfo}>
                    <CheckCircle color="#22c55e" size={20} />
                    <div>
                      <strong>{result.name}</strong>
                      <span>{result.brand} - {result.model} (PN: {result.id})</span>
                    </div>
                  </div>
                  <div className={styles.resultStatus}>{result.status}</div>
                  <button className={styles.addBtn}>{lang === "tr" ? "Talebe Ekle" : "Add to RFQ"}</button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.techPreviewGrid}>
          <div className={styles.techVisualSide}>
            <div className={styles.diagramBadge}>{lang === "tr" ? "İNTERAKTİF ŞEMA" : "INTERACTIVE DIAGRAM"}</div>
            <img src="/assets/pump_diagram.png" alt="Exploded View" className={styles.diagramImg} />
            <div className={styles.diagramOverlay}>
              <div className={styles.hotspot} style={{ top: "40%", left: "30%" }} title="Bearing" />
              <div className={styles.hotspot} style={{ top: "60%", left: "50%" }} title="Impeller" />
              <div className={styles.hotspot} style={{ top: "35%", left: "70%" }} title="Mechanical Seal" />
            </div>
          </div>
          
          <div className={styles.techInfoSide}>
            <div className={styles.techStep}>
              <div className={styles.stepNum}>01</div>
              <div>
                <h4>{lang === "tr" ? "Parçayı Tanımla" : "Identify Part"}</h4>
                <p>{lang === "tr" ? "Parça numarası veya makine modeli ile arama yapın." : "Search by part number or machinery model."}</p>
              </div>
            </div>
            <div className={styles.techStep}>
              <div className={styles.stepNum}>02</div>
              <div>
                <h4>{lang === "tr" ? "Detayı Doğrula" : "Verify Detail"}</h4>
                <p>{lang === "tr" ? "Patlatılmış şemalar üzerinden doğru parçayı seçin." : "Select the correct part via exploded diagrams."}</p>
              </div>
            </div>
            <div className={styles.techStep}>
              <div className={styles.stepNum}>03</div>
              <div>
                <h4>{lang === "tr" ? "Hızlı Teklif İste" : "Request Fast Quote"}</h4>
                <p>{lang === "tr" ? "Doğrulanan parçayı saniyeler içinde RFQ listesine ekleyin." : "Add verified part to RFQ list in seconds."}</p>
              </div>
            </div>
            
            <button className={styles.fullLibraryBtn}>
              {lang === "tr" ? "Tüm Teknik Kütüphaneye Göz At" : "Browse Full Technical Library"} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
