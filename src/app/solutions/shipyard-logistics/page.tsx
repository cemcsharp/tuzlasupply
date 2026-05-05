import styles from "@/app/page.module.css";
import HomeNavbar from "@/components/HomeNavbar";
import { Truck, Warehouse, Clock, Globe, PackageCheck } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

export default async function ShipyardLogisticsPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang = "tr" } = await searchParams;
  const isTr = lang === "tr";

  return (
    <main className={styles.main}>
      <Suspense fallback={null}>
        <HomeNavbar />
      </Suspense>
      
      <div className={styles.serviceDetailHero} style={{ background: "linear-gradient(135deg, #064e3b 0%, #065f46 100%)" }}>
        <div className="container">
          <span style={{ color: "#34d399", fontWeight: 700, letterSpacing: "2px" }}>
            {isTr ? "TUZLA TERSANE LOJİSTİĞİ" : "TUZLA SHIPYARD LOGISTICS"}
          </span>
          <h1 style={{ color: "white", fontSize: "3.5rem", marginTop: "1rem" }}>
            {isTr ? "Tersane Lojistiği & Gemi Parçası Depolama Tuzla" : "Shipyard Logistics & Marine Part Storage Tuzla"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", maxWidth: "800px", marginTop: "1.5rem" }}>
            {isTr 
              ? "Tuzla ve Yalova tersaneler bölgesinde gümrüklü parça transferi, depolama çözümleri ve son mil liman teslimatı."
              : "Bonded part transfer, storage solutions, and last-mile port delivery in the Tuzla and Yalova shipyard region."}
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "6rem 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "4rem" }}>
          <div>
            <h2 style={{ color: "#0f172a", fontSize: "2rem", marginBottom: "1.5rem" }}>
              {isTr ? "Kusursuz Lojistik: Gümrükten Gemiye Güvenli Transfer" : "Seamless Logistics: Safe Transfer from Customs to Ship"}
            </h2>
            <p style={{ color: "#475569", lineHeight: "1.8", marginBottom: "2.5rem" }}>
              {isTr 
                ? "Yurt dışından gelen kritik yedek parçalarınızın gümrükleme sonrası tersanedeki geminize ulaşma sürecini yönetiyoruz. Tuzla ve Gebze antrepolarına yakınlığımız sayesinde parçalarınızı güvenle depoluyor ve tam zamanında gemiye teslim ediyoruz."
                : "We manage the process of your critical spare parts arriving from abroad to your ship in the shipyard after customs clearance. Thanks to our proximity to Tuzla and Gebze warehouses, we safely store your parts and deliver them to the ship right on time."}
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div style={{ padding: "2rem", border: "1px solid #d1fae5", borderRadius: "1.5rem", background: "#f0fdf4" }}>
                <Warehouse color="#10b981" style={{ marginBottom: "1rem" }} />
                <h4 style={{ color: "#0f172a" }}>{isTr ? "Depolama Çözümleri" : "Storage Solutions"}</h4>
                <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
                  {isTr ? "Gemi yedek parçaları için güvenli, organize ve takip edilebilir depo alanı." : "Secure, organized, and traceable storage area for marine spare parts."}
                </p>
              </div>
              <div style={{ padding: "2rem", border: "1px solid #d1fae5", borderRadius: "1.5rem", background: "#f0fdf4" }}>
                <Truck color="#10b981" style={{ marginBottom: "1rem" }} />
                <h4 style={{ color: "#0f172a" }}>{isTr ? "Ekspres Teslimat" : "Express Delivery"}</h4>
                <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
                  {isTr ? "Tersane sahasına ve demirdeki gemilere hızlı ve sorunsuz nakliye." : "Fast and smooth transport to the shipyard area and ships at anchor."}
                </p>
              </div>
            </div>

            <div style={{ marginTop: "4rem", background: "#ecfdf5", padding: "3rem", borderRadius: "2rem", borderLeft: "4px solid #10b981" }}>
              <h3 style={{ color: "#065f46", marginBottom: "1.5rem" }}>{isTr ? "Lojistik Hizmet Portföyümüz" : "Our Logistics Service Portfolio"}</h3>
              <ul style={{ color: "#065f46", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <li>✓ {isTr ? "Gümrüklü Parça Transferi (Transit)" : "Bonded Part Transfer (Transit)"}</li>
                <li>✓ {isTr ? "Tuzla Tersane İçi Lojistik Destek" : "Tuzla Intra-Shipyard Logistics Support"}</li>
                <li>✓ {isTr ? "Ağır Yük ve Vinç Organizasyonu" : "Heavy Lift and Crane Organization"}</li>
                <li>✓ {isTr ? "Uzun Süreli Parça Depolama" : "Long-Term Part Storage"}</li>
                <li>✓ {isTr ? "Liman ve Demir Bölgesi Teslimatı" : "Port and Anchorage Area Delivery"}</li>
                <li>✓ {isTr ? "Envanter Yönetimi ve Raporlama" : "Inventory Management and Reporting"}</li>
              </ul>
            </div>
          </div>

          <div className={styles.serviceSidebar}>
            <div className={styles.sidebarWidget} style={{ background: "#064e3b" }}>
              <h4>{isTr ? "Lojistik Çözüm Ortağı" : "Logistics Solution Partner"}</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
                {isTr ? "Parçalarınızın gümrükten gemiye olan yolculuğunu profesyonelce planlayalım." : "Let us professionally plan your parts' journey from customs to ship."}
              </p>
              <Link href="/rfq" className="btn-primary" style={{ width: "100%", display: "block", textAlign: "center", marginTop: "1.5rem", background: "#10b981" }}>
                {isTr ? "Lojistik Teklifi Alın" : "Get Logistics Quote"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
