import styles from "@/app/page.module.css";
import HomeNavbar from "@/components/HomeNavbar";
import { Search, ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const insights = [
  {
    id: 1,
    title: "Understanding IMPA Codes: A Guide for Ship Procurement",
    titleTr: "IMPA Kodlarını Anlamak: Gemi Satın Alma Rehberi",
    desc: "How to use the Marine Stores Guide for efficient ordering and inventory management.",
    descTr: "Verimli sipariş ve envanter yönetimi için Marine Stores Guide nasıl kullanılır?",
    category: "Technical",
    image: "/assets/parts.png"
  },
  {
    id: 2,
    title: "Optimizing Engine Overhaul: Genuine vs OEM Spare Parts",
    titleTr: "Makine Overhaul Optimizasyonu: Orijinal vs OEM Yedek Parçalar",
    desc: "A deep dive into the technical and financial implications of part selection in maritime maintenance.",
    descTr: "Gemi bakımında parça seçiminin teknik ve finansal etkilerine derinlemesine bir bakış.",
    category: "Engineering",
    image: "/assets/maritime_pump_exploded_view_1777866638254.png"
  },
  {
    id: 3,
    title: "The Future of Ship Supply in Tuzla: Digitalization & AI",
    titleTr: "Tuzla'da Gemi İkmalinin Geleceği: Dijitalleşme ve Yapay Zeka",
    desc: "How technology is transforming the traditional ship chandling business in Istanbul.",
    descTr: "Teknolojinin İstanbul'daki geleneksel gemi tedarik işini nasıl dönüştürdüğüne dair analiz.",
    category: "Digital Trends",
    image: "/assets/maritime_logistics_delivery_port_1777865482404.png"
  }
];

export default async function InsightsPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang = "tr" } = await searchParams;
  const isTr = lang === "tr";

  return (
    <main className={styles.main} style={{ background: "#f8fafc" }}>
      <Suspense fallback={null}>
        <HomeNavbar />
      </Suspense>
      
      <div className={styles.serviceDetailHero} style={{ background: "linear-gradient(135deg, #0f172a 0%, #075985 100%)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span style={{ color: "#38bdf8", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
            {isTr ? "DENİZCİLİK BİLGİ MERKEZİ" : "MARITIME KNOWLEDGE HUB"}
          </span>
          <h1 style={{ color: "white", fontSize: "3.5rem", marginTop: "1rem" }}>
            {isTr ? "Maritime Insights" : "Industry Insights"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", maxWidth: "600px", margin: "1.5rem auto 0" }}>
            {isTr ? "Sektörel trendler, teknik makaleler ve gemi ikmal dünyasından en son haberler." : "Sector trends, technical articles, and latest news from the world of ship supply."}
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "6rem 0" }}>
        <div className={styles.insightGrid}>
          {insights.map((item) => (
            <div key={item.id} className={styles.insightCard}>
              <div className={styles.insightImage} style={{ backgroundImage: `url(${item.image})` }}>
                <div className={styles.insightCategory}>{item.category}</div>
              </div>
              <div className={styles.insightContent}>
                <h3>{isTr ? item.titleTr : item.title}</h3>
                <p>{isTr ? item.descTr : item.desc}</p>
                <div style={{ marginTop: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f1f5f9", paddingTop: "1.5rem" }}>
                  <div style={{ display: "flex", gap: "1rem", color: "#94a3b8", fontSize: "0.85rem" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}><Clock size={14} /> 5 min read</span>
                  </div>
                  <Link href="#" style={{ color: "#38bdf8", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {isTr ? "Dahası" : "Read More"} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
