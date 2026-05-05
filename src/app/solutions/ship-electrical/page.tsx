import styles from "@/app/page.module.css";
import HomeNavbar from "@/components/HomeNavbar";
import { Zap, ShieldCheck, Clock, Settings, Cpu } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

export default async function ShipElectricalPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang = "tr" } = await searchParams;
  const isTr = lang === "tr";

  return (
    <main className={styles.main}>
      <Suspense fallback={null}>
        <HomeNavbar />
      </Suspense>
      
      <div className={styles.serviceDetailHero} style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)" }}>
        <div className="container">
          <span style={{ color: "#38bdf8", fontWeight: 700, letterSpacing: "2px" }}>
            {isTr ? "TUZLA GEMİ ELEKTRİĞİ" : "TUZLA MARINE ELECTRICAL"}
          </span>
          <h1 style={{ color: "white", fontSize: "3.5rem", marginTop: "1rem" }}>
            {isTr ? "Tuzla Gemi Elektriği & Otomasyon Çözümleri" : "Tuzla Marine Electrical & Automation Solutions"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", maxWidth: "800px", marginTop: "1.5rem" }}>
            {isTr 
              ? "Tuzla tersaneler bölgesinde gemi elektrik sistemleri, otomasyon arızaları ve yedek parça tedariğinde 7/24 profesyonel destek." 
              : "24/7 professional support for marine electrical systems, automation faults, and spare parts supply in Tuzla shipyard region."}
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "6rem 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "4rem" }}>
          <div>
            <h2 style={{ color: "#0f172a", fontSize: "2rem", marginBottom: "1.5rem" }}>
              {isTr ? "Tuzla'da Gemi Elektriği Bizim İşimiz" : "Marine Electrical is Our Expertise in Tuzla"}
            </h2>
            <p style={{ color: "#475569", lineHeight: "1.8", marginBottom: "2.5rem" }}>
              {isTr 
                ? "Denizcilik sektörünün kalbi Tuzla'da, gemilerinizin elektrik ve otomasyon ihtiyaçlarına anında yanıt veriyoruz. Sedef Tersanesi, TK Tuzla, Gemak ve Desan gibi bölgedeki tüm ana tersanelerde aktif hizmet sunmaktayız."
                : "In the heart of the maritime industry, Tuzla, we respond instantly to your vessels' electrical and automation needs. We provide active service in all major shipyards such as Sedef, TK Tuzla, Gemak, and Desan."}
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div style={{ padding: "2rem", border: "1px solid #e2e8f0", borderRadius: "1.5rem" }}>
                <Cpu color="#38bdf8" style={{ marginBottom: "1rem" }} />
                <h4 style={{ color: "#0f172a" }}>{isTr ? "Otomasyon Sistemleri" : "Automation Systems"}</h4>
                <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
                  {isTr ? "Alarm izleme, kontrol sistemleri ve sensor değişimi." : "Alarm monitoring, control systems, and sensor replacements."}
                </p>
              </div>
              <div style={{ padding: "2rem", border: "1px solid #e2e8f0", borderRadius: "1.5rem" }}>
                <Zap color="#38bdf8" style={{ marginBottom: "1rem" }} />
                <h4 style={{ color: "#0f172a" }}>{isTr ? "Pano & Kablaj" : "Switchboard & Cabling"}</h4>
                <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
                  {isTr ? "Güç panoları, aydınlatma ve kablo yenileme hizmetleri." : "Power panels, lighting, and cable renewal services."}
                </p>
              </div>
            </div>

            <div style={{ marginTop: "4rem", background: "#f0f9ff", padding: "3rem", borderRadius: "2rem" }}>
              <h3 style={{ color: "#0c4a6e", marginBottom: "1.5rem" }}>{isTr ? "Hedeflediğimiz Çözümler" : "Targeted Solutions"}</h3>
              <ul style={{ color: "#0c4a6e", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <li>✓ {isTr ? "Jeneratör Kontrol Sistemleri" : "Generator Control Systems"}</li>
                <li>✓ {isTr ? "Navigasyon Ekipmanları Elektriği" : "Navigation Equipment Electrical"}</li>
                <li>✓ {isTr ? "Motor Kontrol Üniteleri (ECU)" : "Engine Control Units (ECU)"}</li>
                <li>✓ {isTr ? "Tuzla Acil Elektrik Arıza Servisi" : "Tuzla Emergency Electrical Service"}</li>
                <li>✓ {isTr ? "Gemi Elektrik Yedek Parça İkmal" : "Marine Electrical Spare Parts"}</li>
                <li>✓ {isTr ? "UPS ve Batarya Sistemleri" : "UPS and Battery Systems"}</li>
              </ul>
            </div>
          </div>

          <div className={styles.serviceSidebar}>
            <div className={styles.sidebarWidget} style={{ background: "#0f172a" }}>
              <h4>{isTr ? "Acil Elektrik Destek" : "Emergency Electrical Support"}</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
                {isTr ? "Tuzla bölgesindeki geminiz için acil elektrik ve otomasyon desteği." : "Emergency electrical and automation support for your vessel in Tuzla region."}
              </p>
              <Link href="/rfq" className="btn-primary" style={{ width: "100%", display: "block", textAlign: "center", marginTop: "1.5rem" }}>
                {isTr ? "Hemen Ulaşın" : "Contact Now"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
