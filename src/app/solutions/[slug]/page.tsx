import styles from "@/app/page.module.css";
import HomeNavbar from "@/components/HomeNavbar";
import { Zap, ShieldCheck, Clock, Settings, Cpu, Wrench, Droplets, LifeBuoy, Truck, Layers, Wind, Flame, Warehouse } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

const solutionData: any = {
  "ship-electrical": {
    color: "#1e3a8a",
    icon: <Cpu size={40} />,
    title: "Tuzla Marine Electrical & Automation",
    titleTr: "Tuzla Gemi Elektriği & Otomasyon",
    desc: "24/7 professional support for marine electrical systems, automation faults, and spare parts supply.",
    descTr: "Gemi elektrik sistemleri, otomasyon arızaları ve yedek parça tedariğinde 7/24 profesyonel destek.",
    features: ["Generator Control Systems", "Navigation Equipment Electrical", "Engine Control Units (ECU)", "UPS and Battery Systems"],
    featuresTr: ["Jeneratör Kontrol Sistemleri", "Navigasyon Ekipmanları Elektriği", "Motor Kontrol Üniteleri (ECU)", "UPS ve Batarya Sistemleri"]
  },
  "ship-mechanical": {
    color: "#334155",
    icon: <Wrench size={40} />,
    title: "Marine Mechanical Repair Tuzla",
    titleTr: "Gemi Mekanik Onarım Tuzla",
    desc: "Professional mechanical solutions and spare parts supply for main and auxiliary engines.",
    descTr: "Ana makine, yardımcı makine ve pompa sistemleri için profesyonel mekanik çözümler.",
    features: ["Engine Overhaul", "Pump & Valve Repair", "Shaft & Propeller Systems", "Piping & Welding"],
    featuresTr: ["Makine Overhaul", "Pompa ve Valf Onarımı", "Şaft ve Pervane Sistemleri", "Boru Devreleri ve Kaynak"]
  },
  "ship-painting": {
    color: "#0369a1",
    icon: <Droplets size={40} />,
    title: "Marine Painting & Coating Tuzla",
    titleTr: "Gemi Boya & Kaplama Tuzla",
    desc: "High-quality paint, epoxy coating, and blasting equipment for dry-docking processes.",
    descTr: "Tersane havuzlama süreçleri için yüksek kaliteli boya, kaplama ve raspa çözümleri.",
    features: ["Antifouling Coatings", "Ballast Tank Coatings", "Blasting & Surface Prep", "Dry-Dock Logistics"],
    featuresTr: ["Antifouling Kaplamalar", "Balast Tank Kaplamaları", "Raspa ve Yüzey Hazırlığı", "Havuzlama Lojistiği"]
  },
  "ship-safety": {
    color: "#7f1d1d",
    icon: <LifeBuoy size={40} />,
    title: "Marine Safety & FFA/LSA Tuzla",
    titleTr: "Gemi Güvenlik & FFA/LSA Tuzla",
    desc: "SOLAS compliant life-saving appliances and fire-fighting systems supply.",
    descTr: "SOLAS standartlarına uygun can kurtarma araçları ve yangın söndürme sistemleri.",
    features: ["Life Jackets & Buoys", "Fire Extinguisher Supply", "EEBD & Gas Detectors", "Pilot Ladders"],
    featuresTr: ["Can Yeleği ve Simidi", "Yangın Söndürme Tüpleri", "EEBD ve Gaz Dedektörleri", "Pilot Merdivenleri"]
  },
  "shipyard-logistics": {
    color: "#065f46",
    icon: <Truck size={40} />,
    title: "Shipyard Logistics & Storage Tuzla",
    titleTr: "Tersane Lojistiği & Depolama Tuzla",
    desc: "Bonded part transfer, storage solutions, and last-mile port delivery.",
    descTr: "Gümrüklü parça transferi, depolama çözümleri ve liman teslimatı.",
    features: ["Customs Part Transfer", "Marine Part Storage", "Express Port Delivery", "Inventory Management"],
    featuresTr: ["Gümrüklü Parça Transferi", "Gemi Parçası Depolama", "Ekspres Liman Teslimatı", "Envanter Yönetimi"]
  }
};

export default async function SolutionPage({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ lang?: string }> }) {
  const { slug } = await params;
  const { lang = "tr" } = await searchParams;
  const isTr = lang === "tr";
  const data = solutionData[slug];

  if (!data) return <div style={{ padding: "10rem", textAlign: "center" }}>Solution Not Found</div>;

  return (
    <main className={styles.main}>
      <Suspense fallback={null}>
        <HomeNavbar />
      </Suspense>
      
      <div className={styles.serviceDetailHero} style={{ background: `linear-gradient(135deg, #0f172a 0%, ${data.color} 100%)` }}>
        <div className="container">
          <h1 style={{ color: "white", fontSize: "3.5rem" }}>{isTr ? data.titleTr : data.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", maxWidth: "800px", marginTop: "1.5rem" }}>
            {isTr ? data.descTr : data.desc}
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "6rem 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "4rem" }}>
          <div className={styles.serviceMainCard}>
            <div style={{ color: "#38bdf8", marginBottom: "2rem" }}>{data.icon}</div>
            <h2>{isTr ? "Uzmanlık Alanlarımız" : "Our Expertise Areas"}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginTop: "2rem" }}>
              {(isTr ? data.featuresTr : data.features).map((f: string, i: number) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.5rem", background: "#f8fafc", borderRadius: "1.5rem" }}>
                  <ShieldCheck color="#38bdf8" />
                  <span style={{ fontWeight: 600, color: "#0f172a" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.serviceSidebar}>
            <div className={styles.sidebarWidget} style={{ background: "#0f172a" }}>
              <h4>{isTr ? "Hızlı Destek Hattı" : "Fast Support Line"}</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>{isTr ? "Tuzla bölgesindeki operasyonlarınız için profesyonel destek." : "Professional support for your operations in the Tuzla region."}</p>
              <Link href="/rfq" className="btn-primary" style={{ width: "100%", display: "block", textAlign: "center", marginTop: "1.5rem" }}>
                {isTr ? "Teklif İsteyin" : "Request Quote"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
