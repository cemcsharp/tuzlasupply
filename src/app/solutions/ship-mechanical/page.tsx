import styles from "@/app/page.module.css";
import HomeNavbar from "@/components/HomeNavbar";
import { Wrench, ShieldCheck, Clock, Settings, Hammer } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

export default async function ShipMechanicalPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang = "tr" } = await searchParams;
  const isTr = lang === "tr";

  return (
    <main className={styles.main}>
      <Suspense fallback={null}>
        <HomeNavbar />
      </Suspense>
      
      <div className={styles.serviceDetailHero} style={{ background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)" }}>
        <div className="container">
          <span style={{ color: "#38bdf8", fontWeight: 700, letterSpacing: "2px" }}>
            {isTr ? "TUZLA GEMİ MEKANİK" : "TUZLA MARINE MECHANICAL"}
          </span>
          <h1 style={{ color: "white", fontSize: "3.5rem", marginTop: "1rem" }}>
            {isTr ? "Gemi Mekanik Onarım & Makine Bakım Tuzla" : "Marine Mechanical Repair & Engine Maintenance Tuzla"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", maxWidth: "800px", marginTop: "1.5rem" }}>
            {isTr 
              ? "Tuzla Tersaneler Bölgesi'nde ana makine, yardımcı makine, pompa ve vana sistemleri için profesyonel mekanik çözümler ve yedek parça tedariği."
              : "Professional mechanical solutions and spare parts supply for main engines, auxiliary engines, pump and valve systems in Tuzla Shipyard Region."}
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "6rem 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "4rem" }}>
          <div>
            <h2 style={{ color: "#0f172a", fontSize: "2rem", marginBottom: "1.5rem" }}>
              {isTr ? "Teknik Otorite: Mekanik ve Onarım Hizmetleri" : "Technical Authority: Mechanical & Repair Services"}
            </h2>
            <p style={{ color: "#475569", lineHeight: "1.8", marginBottom: "2.5rem" }}>
              {isTr 
                ? "Gemi makinelerinin ömrünü uzatan, verimliliği artıran mekanik çözümler sunuyoruz. MAN, Wärtsilä, Caterpillar ve Yanmar gibi markaların tüm mekanik aksamlarında Tuzla lokasyonunda hızlı müdahale kapasitesine sahibiz."
                : "We offer mechanical solutions that extend the life of marine engines and increase efficiency. We have fast response capacity in Tuzla location for all mechanical components of brands such as MAN, Wärtsilä, Caterpillar, and Yanmar."}
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div style={{ padding: "2rem", border: "1px solid #e2e8f0", borderRadius: "1.5rem" }}>
                <Settings color="#38bdf8" style={{ marginBottom: "1rem" }} />
                <h4 style={{ color: "#0f172a" }}>{isTr ? "Makine Overhaul" : "Engine Overhaul"}</h4>
                <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
                  {isTr ? "Piston, liner, yatak değişimi ve genel makine revizyonları." : "Piston, liner, bearing replacement and general engine overhauls."}
                </p>
              </div>
              <div style={{ padding: "2rem", border: "1px solid #e2e8f0", borderRadius: "1.5rem" }}>
                <Wrench color="#38bdf8" style={{ marginBottom: "1rem" }} />
                <h4 style={{ color: "#0f172a" }}>{isTr ? "Pompa & Valf Onarımı" : "Pump & Valve Repair"}</h4>
                <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
                  {isTr ? "Tüm tip pompaların ve vana sistemlerinin bakımı ve testi." : "Maintenance and testing of all types of pumps and valve systems."}
                </p>
              </div>
            </div>

            <div style={{ marginTop: "4rem", background: "#f8fafc", padding: "3rem", borderRadius: "2rem", borderLeft: "4px solid #38bdf8" }}>
              <h3 style={{ color: "#0f172a", marginBottom: "1.5rem" }}>{isTr ? "Mekanik Uzmanlık Alanlarımız" : "Our Mechanical Expertise"}</h3>
              <ul style={{ color: "#475569", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <li>✓ {isTr ? "Ana Makine & Jeneratör Bakımı" : "Main Engine & Generator Maintenance"}</li>
                <li>✓ {isTr ? "Separatör ve Kompresör Onarımı" : "Separator and Compressor Repair"}</li>
                <li>✓ {isTr ? "Şaft ve Pervane Sistemleri" : "Shaft and Propeller Systems"}</li>
                <li>✓ {isTr ? "Tuzla Gemi Mekanik Yedek Parça" : "Tuzla Marine Mechanical Spare Parts"}</li>
                <li>✓ {isTr ? "Boru Devreleri ve Kaynak İşleri" : "Piping and Welding Works"}</li>
                <li>✓ {isTr ? "Hidrolik Sistem Arıza Giderme" : "Hydraulic System Troubleshooting"}</li>
              </ul>
            </div>
          </div>

          <div className={styles.serviceSidebar}>
            <div className={styles.sidebarWidget} style={{ background: "#0f172a" }}>
              <h4>{isTr ? "Teknik Servis Randevusu" : "Technical Service Request"}</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
                {isTr ? "Tersane veya liman operasyonlarınız için mekanik uzman desteği talep edin." : "Request mechanical expert support for your shipyard or port operations."}
              </p>
              <Link href="/rfq" className="btn-primary" style={{ width: "100%", display: "block", textAlign: "center", marginTop: "1.5rem" }}>
                {isTr ? "Teklif Alın" : "Get Quote"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
