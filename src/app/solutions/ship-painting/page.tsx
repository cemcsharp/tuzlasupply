import styles from "@/app/page.module.css";
import HomeNavbar from "@/components/HomeNavbar";
import { Droplets, ShieldCheck, Clock, Layers, Wind } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

export default function ShipPaintingPage() {
  return (
    <main className={styles.main}>
      <Suspense fallback={null}>
        <HomeNavbar />
      </Suspense>
      
      <div className={styles.serviceDetailHero} style={{ background: "linear-gradient(135deg, #0f172a 0%, #0369a1 100%)" }}>
        <div className="container">
          <span style={{ color: "#38bdf8", fontWeight: 700, letterSpacing: "2px" }}>TUZLA MARINE COATING</span>
          <h1 style={{ color: "white", fontSize: "3.5rem", marginTop: "1rem" }}>Gemi Boya, Kaplama & Raspa Çözümleri Tuzla</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", maxWidth: "800px", marginTop: "1.5rem" }}>
            Tuzla tersaneler bölgesinde gemi havuzlama (dry-docking) süreçleri için yüksek kaliteli boya, epoksi kaplama ve raspa ekipmanları tedariği.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "6rem 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "4rem" }}>
          <div>
            <h2 style={{ color: "#0f172a", fontSize: "2rem", marginBottom: "1.5rem" }}>Tuzla'da Korozyon Kontrolü ve Yüzey Hazırlığı</h2>
            <p style={{ color: "#475569", lineHeight: "1.8", marginBottom: "2.5rem" }}>
              Deniz suyunun yıpratıcı etkilerine karşı gemilerinizi koruyoruz. 
              <strong> International, Jotun ve Hempel </strong> gibi dünya markalarının ürünlerini Tuzla'daki tersanelerde (Kuzey, Selah, Kuzey Star vb.) en hızlı şekilde organize ediyoruz.
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div style={{ padding: "2rem", border: "1px solid #e2e8f0", borderRadius: "1.5rem" }}>
                <Layers color="#38bdf8" style={{ marginBottom: "1rem" }} />
                <h4 style={{ color: "#0f172a" }}>Antifouling Kaplamalar</h4>
                <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Yakıt tasarrufu sağlayan ve kekamoz oluşumunu engelleyen modern çözümler.</p>
              </div>
              <div style={{ padding: "2rem", border: "1px solid #e2e8f0", borderRadius: "1.5rem" }}>
                <Wind color="#38bdf8" style={{ marginBottom: "1rem" }} />
                <h4 style={{ color: "#0f172a" }}>Raspa & Ekipman</h4>
                <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Grit, kumlama ekipmanları ve yüksek basınçlı yıkama sistemleri.</p>
              </div>
            </div>

            <div style={{ marginTop: "4rem", background: "#f0f9ff", padding: "3rem", borderRadius: "2rem" }}>
              <h3 style={{ color: "#0c4a6e", marginBottom: "1.5rem" }}>Boya & Kaplama Hizmet Alanlarımız</h3>
              <ul style={{ color: "#0c4a6e", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <li>✓ Balast Tank Kaplamaları</li>
                <li>✓ Güverte ve Ambar Boyaları</li>
                <li>✓ Tuzla Raspa Ekipman Tedariği</li>
                <li>✓ Su Altı Epoksi Uygulamaları</li>
                <li>✓ Özel Kaplama Kimyasalları</li>
                <li>✓ Havuzlama (Dry-Dock) Lojistiği</li>
              </ul>
            </div>
          </div>

          <div className={styles.serviceSidebar}>
            <div className={styles.sidebarWidget} style={{ background: "#0f172a" }}>
              <h4>Boya Teknik Desteği</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>Metraj hesaplama ve ürün seçimi için teknik ekibimizle görüşün.</p>
              <Link href="/rfq" className="btn-primary" style={{ width: "100%", display: "block", textAlign: "center", marginTop: "1.5rem" }}>
                Fiyat Alın
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
