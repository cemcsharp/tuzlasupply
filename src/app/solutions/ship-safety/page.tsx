import styles from "@/app/page.module.css";
import HomeNavbar from "@/components/HomeNavbar";
import { ShieldAlert, ShieldCheck, Clock, LifeBuoy, Flame } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

export default async function ShipSafetyPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang = "tr" } = await searchParams;
  const isTr = lang === "tr";

  return (
    <main className={styles.main}>
      <Suspense fallback={null}>
        <HomeNavbar />
      </Suspense>
      
      <div className={styles.serviceDetailHero} style={{ background: "linear-gradient(135deg, #450a0a 0%, #7f1d1d 100%)" }}>
        <div className="container">
          <span style={{ color: "#f87171", fontWeight: 700, letterSpacing: "2px" }}>
            {isTr ? "TUZLA GEMİ GÜVENLİK" : "TUZLA MARINE SAFETY"}
          </span>
          <h1 style={{ color: "white", fontSize: "3.5rem", marginTop: "1rem" }}>
            {isTr ? "Gemi Güvenlik Ekipmanları & FFA/LSA Tuzla" : "Marine Safety Equipment & FFA/LSA Tuzla"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", maxWidth: "800px", marginTop: "1.5rem" }}>
            {isTr 
              ? "Tuzla Tersaneler Bölgesi'nde SOLAS standartlarına uygun can kurtarma araçları, yangın söndürme sistemleri ve ISG ekipmanları tedariği."
              : "Supply of life-saving appliances, fire-fighting systems, and occupational safety equipment compliant with SOLAS standards in the Tuzla Shipyard Region."}
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "6rem 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "4rem" }}>
          <div>
            <h2 style={{ color: "#0f172a", fontSize: "2rem", marginBottom: "1.5rem" }}>
              {isTr ? "Denizde Güvenlik: Sertifikalı ve Güvenilir Çözümler" : "Safety at Sea: Certified and Reliable Solutions"}
            </h2>
            <p style={{ color: "#475569", lineHeight: "1.8", marginBottom: "2.5rem" }}>
              {isTr 
                ? "Tuzla'daki operasyonlarınızda gemi güvenliğini en üst seviyede tutuyoruz. Life-Saving Appliances (LSA) ve Fire Fighting Appliances (FFA) ekipmanlarında, uluslararası sertifikasyonlara (MED, SOLAS) uygun ürünlerle hizmet veriyoruz."
                : "We maintain ship safety at the highest level in your operations in Tuzla. We serve with products compliant with international certifications (MED, SOLAS) in Life-Saving Appliances (LSA) and Fire Fighting Appliances (FFA) equipment."}
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div style={{ padding: "2rem", border: "1px solid #fee2e2", borderRadius: "1.5rem", background: "#fffaf0" }}>
                <LifeBuoy color="#ef4444" style={{ marginBottom: "1rem" }} />
                <h4 style={{ color: "#0f172a" }}>{isTr ? "Can Kurtarma (LSA)" : "Life Saving (LSA)"}</h4>
                <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
                  {isTr ? "Can yelekleri, filika ekipmanları, işaret fişekleri ve can salları." : "Life jackets, lifeboat equipment, flares, and life rafts."}
                </p>
              </div>
              <div style={{ padding: "2rem", border: "1px solid #fee2e2", borderRadius: "1.5rem", background: "#fffaf0" }}>
                <Flame color="#ef4444" style={{ marginBottom: "1rem" }} />
                <h4 style={{ color: "#0f172a" }}>{isTr ? "Yangınla Mücadele (FFA)" : "Fire Fighting (FFA)"}</h4>
                <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
                  {isTr ? "Yangın söndürücüler, hortumlar, nozzle sistemleri ve SCBA setleri." : "Fire extinguishers, hoses, nozzle systems, and SCBA sets."}
                </p>
              </div>
            </div>

            <div style={{ marginTop: "4rem", background: "#fef2f2", padding: "3rem", borderRadius: "2rem", borderLeft: "4px solid #ef4444" }}>
              <h3 style={{ color: "#7f1d1d", marginBottom: "1.5rem" }}>{isTr ? "Güvenlik & ISG Envanterimiz" : "Our Safety & HSE Inventory"}</h3>
              <ul style={{ color: "#7f1d1d", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <li>✓ {isTr ? "Can Yeleği & Can Simidi İkmali" : "Life Jacket & Lifebuoy Supply"}</li>
                <li>✓ {isTr ? "Yangın Söndürme Tüpü Dolum/Tedarik" : "Fire Extinguisher Refilling/Supply"}</li>
                <li>✓ {isTr ? "Tuzla Gemi ISG Malzemeleri" : "Tuzla Marine HSE Materials"}</li>
                <li>✓ {isTr ? "EEBD ve Gaz Ölçüm Cihazları" : "EEBD and Gas Detectors"}</li>
                <li>✓ {isTr ? "Pilot ve Borda Merdivenleri" : "Pilot and Embarkation Ladders"}</li>
                <li>✓ {isTr ? "İmo Sembolleri ve Levhalar" : "IMO Symbols and Signs"}</li>
              </ul>
            </div>
          </div>

          <div className={styles.serviceSidebar}>
            <div className={styles.sidebarWidget} style={{ background: "#450a0a" }}>
              <h4>{isTr ? "Sertifikalı Güvenlik Desteği" : "Certified Safety Support"}</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
                {isTr ? "Denetimler (Vetting) öncesi eksik güvenlik ekipmanlarınızın hızlı ikmali." : "Rapid supply of your missing safety equipment before inspections (Vetting)."}
              </p>
              <Link href="/rfq" className="btn-primary" style={{ width: "100%", display: "block", textAlign: "center", marginTop: "1.5rem", background: "#ef4444" }}>
                {isTr ? "Teklif İsteyin" : "Request Quote"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
