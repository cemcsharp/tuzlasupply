import styles from "@/app/page.module.css";
import HomeNavbar from "@/components/HomeNavbar";
import { Wrench, ShieldCheck, Clock, Settings, Hammer } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

export default function ShipMechanicalPage() {
  return (
    <main className={styles.main}>
      <Suspense fallback={null}>
        <HomeNavbar />
      </Suspense>
      
      <div className={styles.serviceDetailHero} style={{ background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)" }}>
        <div className="container">
          <span style={{ color: "#38bdf8", fontWeight: 700, letterSpacing: "2px" }}>TUZLA MARİNE MECHANICAL</span>
          <h1 style={{ color: "white", fontSize: "3.5rem", marginTop: "1rem" }}>Gemi Mekanik Onarım & Makine Bakım Tuzla</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", maxWidth: "800px", marginTop: "1.5rem" }}>
            Tuzla Tersaneler Bölgesi'nde ana makine, yardımcı makine, pompa ve vana sistemleri için profesyonel mekanik çözümler ve yedek parça tedariği.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "6rem 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "4rem" }}>
          <div>
            <h2 style={{ color: "#0f172a", fontSize: "2rem", marginBottom: "1.5rem" }}>Teknik Otorite: Mekanik ve Onarım Hizmetleri</h2>
            <p style={{ color: "#475569", lineHeight: "1.8", marginBottom: "2.5rem" }}>
              Gemi makinelerinin ömrünü uzatan, verimliliği artıran mekanik çözümler sunuyoruz. 
              <strong> MAN, Wärtsilä, Caterpillar ve Yanmar </strong> gibi markaların tüm mekanik aksamlarında Tuzla lokasyonunda hızlı müdahale kapasitesine sahibiz.
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div style={{ padding: "2rem", border: "1px solid #e2e8f0", borderRadius: "1.5rem" }}>
                <Settings color="#38bdf8" style={{ marginBottom: "1rem" }} />
                <h4 style={{ color: "#0f172a" }}>Makine Overhaul</h4>
                <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Piston, liner, yatak değişimi ve genel makine revizyonları.</p>
              </div>
              <div style={{ padding: "2rem", border: "1px solid #e2e8f0", borderRadius: "1.5rem" }}>
                <Wrench color="#38bdf8" style={{ marginBottom: "1rem" }} />
                <h4 style={{ color: "#0f172a" }}>Pompa & Valf Onarımı</h4>
                <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Tüm tip pompaların ve vana sistemlerinin bakımı ve testi.</p>
              </div>
            </div>

            <div style={{ marginTop: "4rem", background: "#f8fafc", padding: "3rem", borderRadius: "2rem", borderLeft: "4px solid #38bdf8" }}>
              <h3 style={{ color: "#0f172a", marginBottom: "1.5rem" }}>Mekanik Uzmanlık Alanlarımız</h3>
              <ul style={{ color: "#475569", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <li>✓ Ana Makine & Jeneratör Bakımı</li>
                <li>✓ Separatör ve Kompresör Onarımı</li>
                <li>✓ Şaft ve Pervane Sistemleri</li>
                <li>✓ Tuzla Gemi Mekanik Yedek Parça</li>
                <li>✓ Boru Devreleri ve Kaynak İşleri</li>
                <li>✓ Hidrolik Sistem Arıza Giderme</li>
              </ul>
            </div>
          </div>

          <div className={styles.serviceSidebar}>
            <div className={styles.sidebarWidget} style={{ background: "#0f172a" }}>
              <h4>Teknik Servis Randevusu</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>Tersane veya liman operasyonlarınız için mekanik uzman desteği talep edin.</p>
              <Link href="/rfq" className="btn-primary" style={{ width: "100%", display: "block", textAlign: "center", marginTop: "1.5rem" }}>
                Teklif Alın
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
