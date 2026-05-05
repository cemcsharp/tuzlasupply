import styles from "@/app/page.module.css";
import HomeNavbar from "@/components/HomeNavbar";
import { Anchor, Settings, Package, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function ServicesIndex({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang = "tr" } = await searchParams;
  const isTr = lang === "tr";

  const services = [
    {
      slug: "technical-supply",
      title: "Technical Ship Supply",
      titleTr: "Teknik Gemi İkmali",
      desc: "Comprehensive deck, engine, and cabin stores for all vessel types.",
      descTr: "Tüm gemi tipleri için kapsamlı güverte, makine ve kamarot malzemeleri.",
      icon: <Settings size={40} />
    },
    {
      slug: "marine-provisions",
      title: "Marine Provisions",
      titleTr: "Gemi Kumanyası",
      desc: "Fresh, frozen, and dry provisions with global logistics reach.",
      descTr: "Global lojistik erişimi ile taze, dondurulmuş ve kuru gıda ikmali.",
      icon: <Package size={40} />
    },
    {
      slug: "spare-parts",
      title: "Genuine Spare Parts",
      titleTr: "Orijinal Yedek Parça",
      desc: "Specialized sourcing for MAN B&W, Wärtsilä, and Alfa Laval components.",
      descTr: "MAN B&W, Wärtsilä ve Alfa Laval bileşenleri için uzman tedarik.",
      icon: <Anchor size={40} />
    }
  ];

  return (
    <main className={styles.main}>
      <Suspense fallback={null}>
        <HomeNavbar />
      </Suspense>
      
      <div className={styles.serviceDetailHero} style={{ padding: "10rem 0 10rem" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h1 style={{ color: "white", fontSize: "4rem" }}>{isTr ? "Hizmetlerimiz" : "Our Services"}</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.2rem", maxWidth: "700px", margin: "1.5rem auto 0" }}>
            {isTr ? "Tuzla Supply olarak denizcilik sektörünün her alanında profesyonel ve hızlı çözümler sunuyoruz." : "As Tuzla Supply, we provide professional and fast solutions in every field of the maritime sector."}
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: "-5rem", marginBottom: "8rem" }}>
        <div className={styles.insightGrid}>
          {services.map((s) => (
            <Link href={`/services/${s.slug}`} key={s.slug} style={{ textDecoration: "none" }}>
              <div className={styles.serviceMainCard} style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", transition: "transform 0.3s ease" }}>
                <div style={{ color: "#38bdf8", marginBottom: "2rem" }}>{s.icon}</div>
                <h2>{isTr ? s.titleTr : s.title}</h2>
                <p>{isTr ? s.descTr : s.desc}</p>
                <div style={{ marginTop: "auto", color: "#38bdf8", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {isTr ? "Detayları İncele" : "View Details"} <ChevronRight size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
