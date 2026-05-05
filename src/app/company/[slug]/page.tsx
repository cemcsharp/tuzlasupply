import styles from "@/app/page.module.css";
import HomeNavbar from "@/components/HomeNavbar";
import { ShieldCheck, Target, Award, Users, Zap, Heart, Star, Settings, Package, Anchor, ChevronRight } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

const companyData: any = {
  "about": {
    title: "About Tuzla Supply",
    titleTr: "Tuzla Supply Hakkında",
    subtitle: "Digitalizing the maritime supply chain with 20+ years of technical experience.",
    subtitleTr: "20 yılı aşkın teknik tecrübemizle denizcilik tedarik zincirini dijitalleştiriyoruz.",
    type: "about"
  },
  "careers": {
    title: "Join Our Fleet",
    titleTr: "Filomuza Katılın",
    subtitle: "Shape the future of marine engineering and digital procurement systems.",
    subtitleTr: "Gemi mühendisliği ve dijital satın alma sistemlerinin geleceğine yön verin.",
    type: "careers"
  },
  "insights": {
    title: "Maritime Knowledge Hub",
    titleTr: "Denizcilik Bilgi Merkezi",
    subtitle: "Technical articles, shipyard trends, and global maritime logistics news.",
    subtitleTr: "Teknik makaleler, tersane trendleri ve global denizcilik lojistiği haberleri.",
    type: "insights"
  },
  "services": {
    title: "Global Supply Solutions",
    titleTr: "Global İkmal Çözümleri",
    subtitle: "From technical stores to engine spares - 24/7 reliability in every port.",
    subtitleTr: "Teknik malzemeden motor yedeğine - Her limanda 7/24 güvenilirlik.",
    type: "services"
  }
};

export default async function CompanyPage({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ lang?: string }> }) {
  const { slug } = await params;
  const { lang = "tr" } = await searchParams;
  const isTr = lang === "tr";
  const data = companyData[slug];

  if (!data) return <div style={{ padding: "10rem", textAlign: "center" }}>Page Not Found</div>;

  return (
    <main className={styles.main}>
      <Suspense fallback={null}>
        <HomeNavbar />
      </Suspense>
      
      <div className={styles.serviceDetailHero} style={{ padding: "8rem 0 6rem" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h1 className={styles.responsiveH1} style={{ color: "white" }}>{isTr ? data.titleTr : data.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", maxWidth: "700px", margin: "1.5rem auto 0" }}>
            {isTr ? data.subtitleTr : data.subtitle}
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "6rem 0" }}>
        {data.type === "about" ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className={styles.serviceDetailGrid}>
            <div>
              <h2 style={{ fontSize: "2.5rem", color: "#0f172a", marginBottom: "2rem" }}>
                {isTr ? "Denizcilikte Yeni Nesil Tedarik Ekosistemi" : "Next Generation Supply Ecosystem"}
              </h2>
              <p style={{ fontSize: "1.1rem", color: "#475569", lineHeight: "1.8", marginBottom: "2rem" }}>
                {isTr 
                  ? "Tuzla Supply, geleneksel gemi ikmal süreçlerini modern teknolojiyle birleştirmek amacıyla kuruldu. Onlarca yıllık sektörel tecrübemizi, yapay zeka destekli operasyonel süreçlerimizle harmanlayarak müşterilerimize sadece ürün değil, zaman ve verimlilik sunuyoruz." 
                  : "Tuzla Supply was founded to combine traditional ship supply processes with modern technology. By blending our technical experience with digital operational processes, we offer our customers not just products, but time and reliability."}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
                <div style={{ padding: "1.5rem", background: "#f8fafc", borderRadius: "1.2rem", border: "1px solid #e2e8f0" }}>
                  <ShieldCheck color="#38bdf8" style={{ marginBottom: "0.5rem" }} /> 
                  <h4 style={{ fontSize: "0.9rem" }}>{isTr ? "Sertifikalı Tedarik" : "Certified Supply"}</h4>
                </div>
                <div style={{ padding: "1.5rem", background: "#f8fafc", borderRadius: "1.2rem", border: "1px solid #e2e8f0" }}>
                  <Target color="#38bdf8" style={{ marginBottom: "0.5rem" }} /> 
                  <h4 style={{ fontSize: "0.9rem" }}>{isTr ? "Tam Zamanında" : "Just-in-Time"}</h4>
                </div>
              </div>
            </div>
            <div style={{ background: "#0f172a", borderRadius: "2rem", padding: "4rem", color: "white", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "1.5rem", color: "#38bdf8" }}>{isTr ? "Vizyonumuz" : "Our Vision"}</h3>
              <p style={{ opacity: 0.8, lineHeight: "1.8", fontSize: "1.1rem" }}>
                {isTr ? "Dünya denizcilik sektöründe dijital dönüşümün öncüsü olarak, Tuzla'dan tüm dünya limanlarına uzanan en güvenilir ve en hızlı tedarik ağını kurmak." : "To establish the most reliable and fastest supply network extending from Tuzla to all world ports as the pioneer of digital transformation in the global maritime sector."}
              </p>
            </div>
          </div>
        ) : data.type === "careers" ? (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "3rem" }}>
              <div style={{ textAlign: "center", padding: "2.5rem", background: "#f8fafc", borderRadius: "2rem", border: "1px solid #e2e8f0" }}>
                <Zap size={32} color="#38bdf8" style={{ margin: "0 auto 1.5rem" }} />
                <h4 style={{ marginBottom: "1rem" }}>{isTr ? "İnovasyon Odaklı" : "Innovation Driven"}</h4>
                <p style={{ fontSize: "0.9rem", color: "#64748b" }}>{isTr ? "Eski usul işleri yeni nesil teknolojilerle çözüyoruz." : "We solve old-school tasks with next-generation technologies."}</p>
              </div>
              <div style={{ textAlign: "center", padding: "2.5rem", background: "#f8fafc", borderRadius: "2rem", border: "1px solid #e2e8f0" }}>
                <Heart size={32} color="#38bdf8" style={{ margin: "0 auto 1.5rem" }} />
                <h4 style={{ marginBottom: "1rem" }}>{isTr ? "Büyük Bir Aile" : "A Big Family"}</h4>
                <p style={{ fontSize: "0.9rem", color: "#64748b" }}>{isTr ? "Başarımızın arkasındaki en büyük güç ekibimizdir." : "The biggest power behind our success is our team."}</p>
              </div>
            </div>
            <div style={{ marginTop: "4rem", background: "#0f172a", borderRadius: "2rem", padding: "4rem", color: "white", textAlign: "center" }}>
              <h3>{isTr ? "Bize Katılın" : "Join Us"}</h3>
              <p>hr@tuzlasupply.com</p>
            </div>
          </div>
        ) : data.type === "insights" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "2.5rem" }}>
            {[
              { 
                t: "Technical Guide: Main Engine Maintenance", 
                tTr: "Teknik Rehber: Ana Makine Bakımı", 
                d: "Step-by-step guide for 2-stroke engine overhaul during dry-docking.", 
                dTr: "Havuzlama sırasında 2 zamanlı makinelerin overhaul süreçleri için adım adım rehber.",
                tag: "Technical"
              },
              { 
                t: "Logistics: Bonded Transfer in Tuzla", 
                tTr: "Lojistik: Tuzla'da Gümrüklü Transfer", 
                d: "Understanding the customs process for urgent marine spare parts delivery.", 
                dTr: "Acil gemi yedek parçası teslimatında gümrük süreçlerini anlamak.",
                tag: "Logistics"
              },
              { 
                t: "Future: AI in Marine Procurement", 
                tTr: "Gelecek: Gemi Tedariğinde Yapay Zeka", 
                d: "How AI is changing the RFQ to PO lifecycle in the maritime industry.", 
                dTr: "Yapay zekanın denizcilik sektöründe RFQ'dan PO'ya döngüsünü nasıl değiştirdiği.",
                tag: "Digital"
              }
            ].map((post, i) => (
              <div key={i} className={styles.insightCard} style={{ padding: "2.5rem", border: "1px solid #e2e8f0", background: "white", borderRadius: "1.5rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "1px" }}>{post.tag}</span>
                <h3 style={{ marginTop: "1rem", marginBottom: "1rem", fontSize: "1.3rem" }}>{isTr ? post.tTr : post.t}</h3>
                <p style={{ fontSize: "0.95rem", color: "#64748b", lineHeight: "1.6", marginBottom: "1.5rem" }}>{isTr ? post.dTr : post.d}</p>
                <Link href="#" style={{ color: "#0f172a", fontWeight: 700, fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {isTr ? "Devamını Oku" : "Read More"} <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem" }}>
            {[
              { slug: "technical-supply", title: "Technical Ship Supply", titleTr: "Teknik Gemi İkmali", icon: <Settings size={40} /> },
              { slug: "marine-provisions", title: "Marine Provisions", titleTr: "Gemi Kumanyası", icon: <Package size={40} /> },
              { slug: "spare-parts", title: "Genuine Spare Parts", titleTr: "Orijinal Yedek Parça", icon: <Anchor size={40} /> }
            ].map((s) => (
              <div key={s.slug} style={{ padding: "3rem", background: "white", borderRadius: "2rem", textAlign: "center", border: "1px solid #e2e8f0" }}>
                <div style={{ color: "#38bdf8", marginBottom: "1.5rem" }}>{s.icon}</div>
                <h3 style={{ marginBottom: "1rem" }}>{isTr ? s.titleTr : s.title}</h3>
                <Link href={`/solutions/${s.slug}`} style={{ color: "#38bdf8", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  {isTr ? "İncele" : "Explore"} <ChevronRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
