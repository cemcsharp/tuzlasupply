import styles from "@/app/page.module.css";
import HomeNavbar from "@/components/HomeNavbar";
import { ShieldCheck, Target, Award, Users } from "lucide-react";
import { Suspense } from "react";

export default async function AboutPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang = "tr" } = await searchParams;
  const isTr = lang === "tr";

  return (
    <main className={styles.main}>
      <Suspense fallback={null}>
        <HomeNavbar />
      </Suspense>
      
      <div className={styles.serviceDetailHero} style={{ background: "linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9)), url('/assets/maritime_logistics_delivery_port_1777865482404.png')", backgroundSize: 'cover' }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h1 style={{ color: "white", fontSize: "4rem" }}>{isTr ? "Biz Kimiz?" : "Who Are We?"}</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", maxWidth: "800px", margin: "1.5rem auto 0" }}>
            {isTr ? "Tuzla'nın kalbinden tüm dünyaya uzanan, denizcilik sektöründe dijital dönüşümün ve güvenilir tedariğin öncüsüyüz." : "From the heart of Tuzla to the whole world, we are the pioneers of digital transformation and reliable supply in the maritime sector."}
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "8rem 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "2.5rem", color: "#0f172a", marginBottom: "2rem" }}>
              {isTr ? "Denizcilikte Yeni Nesil Tedarik Ekosistemi" : "Next Generation Supply Ecosystem"}
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#475569", lineHeight: "1.8", marginBottom: "2rem" }}>
              {isTr 
                ? "Tuzla Supply, geleneksel gemi ikmal süreçlerini modern teknolojiyle birleştirmek amacıyla kuruldu. Onlarca yıllık sektörel tecrübemizi, yapay zeka destekli operasyonel süreçlerimizle harmanlayarak müşterilerimize sadece ürün değil, zaman ve verimlilik sunuyoruz." 
                : "Tuzla Supply was founded to combine traditional ship supply processes with modern technology. By blending our decades of sector experience with our AI-powered operational processes, we offer our customers not just products, but time and efficiency."}
            </p>
            <p style={{ fontSize: "1.1rem", color: "#475569", lineHeight: "1.8" }}>
              {isTr 
                ? "Tuzla ve Yalova tersaneler bölgesindeki güçlü lojistik ağımızla, gemilerin ihtiyaç duyduğu her türlü teknik malzeme, yedek parça ve kumanyayı en kısa sürede ve en yüksek standartlarda teslim ediyoruz." 
                : "With our strong logistics network in the Tuzla and Yalova shipyard areas, we deliver all kinds of technical materials, spare parts, and provisions needed by ships as soon as possible and at the highest standards."}
            </p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            <div style={{ padding: "2.5rem", background: "#f8fafc", borderRadius: "1.5rem", textAlign: "center" }}>
              <ShieldCheck size={40} color="#38bdf8" style={{ margin: "0 auto 1rem" }} />
              <h4 style={{ color: "#0f172a" }}>Güven</h4>
            </div>
            <div style={{ padding: "2.5rem", background: "#f8fafc", borderRadius: "1.5rem", textAlign: "center" }}>
              <Target size={40} color="#38bdf8" style={{ margin: "0 auto 1rem" }} />
              <h4 style={{ color: "#0f172a" }}>Hız</h4>
            </div>
            <div style={{ padding: "2.5rem", background: "#f8fafc", borderRadius: "1.5rem", textAlign: "center" }}>
              <Award size={40} color="#38bdf8" style={{ margin: "0 auto 1rem" }} />
              <h4 style={{ color: "#0f172a" }}>Kalite</h4>
            </div>
            <div style={{ padding: "2.5rem", background: "#f8fafc", borderRadius: "1.5rem", textAlign: "center" }}>
              <Users size={40} color="#38bdf8" style={{ margin: "0 auto 1rem" }} />
              <h4 style={{ color: "#0f172a" }}>Uzmanlık</h4>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
