"use client";

import { Globe } from "lucide-react";
import styles from "../app/page.module.css";

export default function MaritimeMap({ lang = "tr" }: { lang?: string }) {
  return (
    <section className="section" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #fff 100%)", overflow: "hidden" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className={styles.sectionSubtitle}>
            {lang === "tr" ? "Global Operasyon Ağı" : "Global Operation Network"}
          </span>
          <h2 className={styles.sectionTitle}>
            {lang === "tr" ? "Stratejik Tedarik Noktaları" : "Strategic Supply Points"}
          </h2>
          <p className={styles.sectionDescCenter} style={{ maxWidth: "700px", margin: "1rem auto" }}>
            {lang === "tr" 
              ? "Dünyanın en yoğun deniz ticaret rotaları üzerinde, stratejik lokasyonlarda güçlü partner ağımızla kesintisiz hizmet veriyoruz."
              : "We provide uninterrupted service with our strong partner network in strategic locations on the world's busiest maritime trade routes."
            }
          </p>
        </div>

        <div style={{ position: "relative", width: "100%", maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
          {/* Stylized SVG Map Overlay */}
          <svg viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", opacity: 0.1 }}>
            <path d="M150 100 Q 300 50 500 100 T 850 150 M100 250 Q 250 200 450 250 T 800 300 M200 400 Q 400 350 600 400 T 900 450" stroke="#0F172A" strokeWidth="2" strokeDasharray="10 10" />
            <circle cx="510" cy="180" r="100" stroke="#0F172A" strokeWidth="1" opacity="0.5" />
          </svg>

          {/* Glowing Points */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
            
            {/* Tuzla / Istanbul */}
            <MapPoint x="51%" y="38%" label="Tuzla / Istanbul" active />
            
            {/* Singapore */}
            <MapPoint x="78%" y="68%" label="Singapore" />
            
            {/* Rotterdam */}
            <MapPoint x="48%" y="28%" label="Rotterdam" />
            
            {/* Houston */}
            <MapPoint x="22%" y="42%" label="Houston" />
            
            {/* Fujairah */}
            <MapPoint x="60%" y="45%" label="Fujairah" />
          </div>

          <div style={{ 
            marginTop: "4rem", display: "flex", justifyContent: "center", gap: "3rem", flexWrap: "wrap" 
          }}>
             <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#64748B", fontSize: "0.9rem", fontWeight: "600" }}>
               <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "var(--color-accent)", boxShadow: "0 0 10px var(--color-accent)" }}></span>
               Merkez Ofis & Depo
             </div>
             <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#64748B", fontSize: "0.9rem", fontWeight: "600" }}>
               <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#94A3B8" }}></span>
               Stratejik Partner Ağı
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapPoint({ x, y, label, active = false }: { x: string, y: string, label: string, active?: boolean }) {
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: "translate(-50%, -50%)", zIndex: 5 }}>
      <div style={{ 
        width: active ? "14px" : "10px", 
        height: active ? "14px" : "10px", 
        borderRadius: "50%", 
        backgroundColor: active ? "var(--color-accent)" : "#94A3B8",
        boxShadow: active ? "0 0 15px var(--color-accent)" : "none",
        position: "relative"
      }}>
        {active && (
          <div style={{ 
            position: "absolute", top: "-5px", left: "-5px", right: "-5px", bottom: "-5px", 
            borderRadius: "50%", border: "2px solid var(--color-accent)",
            animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite"
          }} />
        )}
      </div>
      <div style={{ 
        position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)",
        backgroundColor: "rgba(15, 23, 42, 0.8)", color: "white", padding: "4px 10px",
        borderRadius: "6px", fontSize: "0.7rem", fontWeight: "700", whiteSpace: "nowrap",
        backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.1)"
      }}>
        {label}
      </div>

      <style jsx>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
