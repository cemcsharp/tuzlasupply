import styles from "@/app/page.module.css";
import HomeNavbar from "@/components/HomeNavbar";
import { ShieldCheck, Target, Award, Users, Zap, Heart, Star } from "lucide-react";
import { Suspense } from "react";

const companyData: any = {
  "about": {
    title: "About Us",
    titleTr: "Hakkımızda",
    subtitle: "Tuzla Supply represents trust and quality in the maritime industry.",
    subtitleTr: "Tuzla Supply, denizcilik sektöründe güven ve kaliteyi temsil eder.",
    type: "about"
  },
  "careers": {
    title: "Careers",
    titleTr: "Kariyer",
    subtitle: "Build the future of maritime technologies with us.",
    subtitleTr: "Geleceğin denizcilik teknolojilerini bizimle inşa edin.",
    type: "careers"
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
                  : "Tuzla Supply was founded to combine traditional ship supply processes with modern technology."}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div style={{ padding: "1.5rem", background: "#f8fafc", borderRadius: "1rem" }}><ShieldCheck color="#38bdf8" /> <h4>Güven</h4></div>
                <div style={{ padding: "1.5rem", background: "#f8fafc", borderRadius: "1rem" }}><Target color="#38bdf8" /> <h4>Hız</h4></div>
              </div>
            </div>
            <div style={{ background: "#0f172a", borderRadius: "2rem", padding: "4rem", color: "white" }}>
              <h3>{isTr ? "Vizyonumuz" : "Our Vision"}</h3>
              <p>{isTr ? "Dünya denizcilik sektöründe dijital dönüşümün öncüsü olmak." : "To be the pioneer of digital transformation in the global maritime sector."}</p>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "3rem" }}>
              <div style={{ textAlign: "center", padding: "2rem", background: "#f8fafc", borderRadius: "2rem" }}>
                <Zap size={32} color="#38bdf8" style={{ margin: "0 auto 1.5rem" }} />
                <h4>{isTr ? "İnovasyon" : "Innovation"}</h4>
                <p>{isTr ? "Sektörde fark yaratıyoruz." : "We make a difference in the sector."}</p>
              </div>
              <div style={{ textAlign: "center", padding: "2rem", background: "#f8fafc", borderRadius: "2rem" }}>
                <Heart size={32} color="#38bdf8" style={{ margin: "0 auto 1.5rem" }} />
                <h4>{isTr ? "Ekip Ruhu" : "Team Spirit"}</h4>
                <p>{isTr ? "Birlikte büyüyoruz." : "We grow together."}</p>
              </div>
            </div>
            <div style={{ marginTop: "4rem", background: "#0f172a", borderRadius: "2rem", padding: "4rem", color: "white", textAlign: "center" }}>
              <h3>{isTr ? "Bize Katılın" : "Join Us"}</h3>
              <p>hr@tuzlasupply.com</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
