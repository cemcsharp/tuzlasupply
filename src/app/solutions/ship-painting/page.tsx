import styles from "@/app/page.module.css";
import HomeNavbar from "@/components/HomeNavbar";
import { Droplets, ShieldCheck, Clock, Layers, Wind } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

export default async function ShipPaintingPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang = "tr" } = await searchParams;
  const isTr = lang === "tr";

  return (
    <main className={styles.main}>
      <Suspense fallback={null}>
        <HomeNavbar />
      </Suspense>
      
      <div className={styles.serviceDetailHero} style={{ background: "linear-gradient(135deg, #0f172a 0%, #0369a1 100%)" }}>
        <div className="container">
          <span style={{ color: "#38bdf8", fontWeight: 700, letterSpacing: "2px" }}>
            {isTr ? "TUZLA GEMİ BOYA" : "TUZLA MARINE COATING"}
          </span>
          <h1 style={{ color: "white", fontSize: "3.5rem", marginTop: "1rem" }}>
            {isTr ? "Gemi Boya, Kaplama & Raspa Çözümleri Tuzla" : "Marine Painting, Coating & Blasting Solutions Tuzla"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", maxWidth: "800px", marginTop: "1.5rem" }}>
            {isTr 
              ? "Tuzla tersaneler bölgesinde gemi havuzlama (dry-docking) süreçleri için yüksek kaliteli boya, epoksi kaplama ve raspa ekipmanları tedariği."
              : "High-quality paint, epoxy coating, and blasting equipment supply for dry-docking processes in the Tuzla shipyard region."}
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "6rem 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "4rem" }}>
          <div>
            <h2 style={{ color: "#0f172a", fontSize: "2rem", marginBottom: "1.5rem" }}>
              {isTr ? "Tuzla'da Korozyon Kontrolü ve Yüzey Hazırlığı" : "Corrosion Control & Surface Preparation in Tuzla"}
            </h2>
            <p style={{ color: "#475569", lineHeight: "1.8", marginBottom: "2.5rem" }}>
              {isTr 
                ? "Deniz suyunun yıpratıcı etkilerine karşı gemilerinizi koruyoruz. International, Jotun ve Hempel gibi dünya markalarının ürünlerini Tuzla'daki tersanelerde en hızlı şekilde organize ediyoruz."
                : "We protect your vessels against the corrosive effects of seawater. We organize products of world brands such as International, Jotun, and Hempel in shipyards in Tuzla as quickly as possible."}
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div style={{ padding: "2rem", border: "1px solid #e2e8f0", borderRadius: "1.5rem" }}>
                <Layers color="#38bdf8" style={{ marginBottom: "1rem" }} />
                <h4 style={{ color: "#0f172a" }}>{isTr ? "Antifouling Kaplamalar" : "Antifouling Coatings"}</h4>
                <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
                  {isTr ? "Yakıt tasarrufu sağlayan ve kekamoz oluşumunu engelleyen modern çözümler." : "Modern solutions that save fuel and prevent fouling."}
                </p>
              </div>
              <div style={{ padding: "2rem", border: "1px solid #e2e8f0", borderRadius: "1.5rem" }}>
                <Wind color="#38bdf8" style={{ marginBottom: "1rem" }} />
                <h4 style={{ color: "#0f172a" }}>{isTr ? "Raspa & Ekipman" : "Blasting & Equipment"}</h4>
                <p style={{ fontSize: "0.9rem", color: "#64748b" }}>
                  {isTr ? "Grit, kumlama ekipmanları ve yüksek basınçlı yıkama sistemleri." : "Grit, blasting equipment, and high-pressure washing systems."}
                </p>
              </div>
            </div>

            <div style={{ marginTop: "4rem", background: "#f0f9ff", padding: "3rem", borderRadius: "2rem" }}>
              <h3 style={{ color: "#0c4a6e", marginBottom: "1.5rem" }}>{isTr ? "Boya & Kaplama Hizmet Alanlarımız" : "Painting & Coating Service Areas"}</h3>
              <ul style={{ color: "#0c4a6e", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <li>✓ {isTr ? "Balast Tank Kaplamaları" : "Ballast Tank Coatings"}</li>
                <li>✓ {isTr ? "Güverte ve Ambar Boyaları" : "Deck and Hold Paints"}</li>
                <li>✓ {isTr ? "Tuzla Raspa Ekipman Tedariği" : "Tuzla Blasting Equipment Supply"}</li>
                <li>✓ {isTr ? "Su Altı Epoksi Uygulamaları" : "Underwater Epoxy Applications"}</li>
                <li>✓ {isTr ? "Özel Kaplama Kimyasalları" : "Special Coating Chemicals"}</li>
                <li>✓ {isTr ? "Havuzlama (Dry-Dock) Lojistiği" : "Dry-Dock Logistics"}</li>
              </ul>
            </div>
          </div>

          <div className={styles.serviceSidebar}>
            <div className={styles.sidebarWidget} style={{ background: "#0f172a" }}>
              <h4>{isTr ? "Boya Teknik Desteği" : "Painting Technical Support"}</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
                {isTr ? "Metraj hesaplama ve ürün seçimi için teknik ekibimizle görüşün." : "Consult with our technical team for area calculation and product selection."}
              </p>
              <Link href="/rfq" className="btn-primary" style={{ width: "100%", display: "block", textAlign: "center", marginTop: "1.5rem" }}>
                {isTr ? "Fiyat Alın" : "Get Price"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
