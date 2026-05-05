import styles from "@/app/page.module.css";
import HomeNavbar from "@/components/HomeNavbar";
import { Briefcase, Zap, Heart, Star, ChevronRight } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

export default async function CareersPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang = "tr" } = await searchParams;
  const isTr = lang === "tr";

  return (
    <main className={styles.main}>
      <Suspense fallback={null}>
        <HomeNavbar />
      </Suspense>
      
      <div className={styles.serviceDetailHero} style={{ padding: "8rem 0 6rem" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h1 className={styles.responsiveH1} style={{ color: "white" }}>{isTr ? "Kariyer" : "Careers"}</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", maxWidth: "700px", margin: "1.5rem auto 0" }}>
            {isTr ? "Geleceğin denizcilik teknolojilerini bizimle inşa edin." : "Build the future of maritime technologies with us."}
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "8rem 0" }}>
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <h2 style={{ fontSize: "2.5rem", color: "#0f172a" }}>{isTr ? "Neden Bizimle Çalışmalısın?" : "Why Join Us?"}</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "3rem" }}>
          <div style={{ textAlign: "center" }}>
            <Zap size={32} color="#38bdf8" style={{ margin: "0 auto 1.5rem" }} />
            <h4 style={{ marginBottom: "1rem", color: "#0f172a" }}>{isTr ? "İnovasyon" : "Innovation"}</h4>
            <p style={{ color: "#64748b" }}>{isTr ? "Denizcilik sektöründe yapılmayanı yapıyoruz." : "We do what hasn't been done in maritime."}</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Heart size={32} color="#38bdf8" style={{ margin: "0 auto 1.5rem" }} />
            <h4 style={{ marginBottom: "1rem", color: "#0f172a" }}>{isTr ? "Ekip Ruhu" : "Team Spirit"}</h4>
            <p style={{ color: "#64748b" }}>{isTr ? "Birlikte öğreniyor, birlikte büyüyoruz." : "We learn together, we grow together."}</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Star size={32} color="#38bdf8" style={{ margin: "0 auto 1.5rem" }} />
            <h4 style={{ marginBottom: "1rem", color: "#0f172a" }}>{isTr ? "Global Vizyon" : "Global Vision"}</h4>
            <p style={{ color: "#64748b" }}>{isTr ? "Yerelden globale bir başarı hikayesi yazıyoruz." : "We are writing a success story from local to global."}</p>
          </div>
        </div>

        <div style={{ marginTop: "8rem", background: "#0f172a", borderRadius: "2rem", padding: "4rem", color: "white", textAlign: "center" }}>
          <h3 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>{isTr ? "Açık Pozisyonumuz Yok mu?" : "No Open Positions?"}</h3>
          <p style={{ fontSize: "1.1rem", opacity: 0.8, marginBottom: "2.5rem", maxWidth: "600px", margin: "0 auto 2.5rem" }}>
            {isTr 
              ? "Her zaman yetenekli ve tutkulu insanlarla tanışmak isteriz. Özgeçmişinizi bize gönderin, uygun bir fırsat olduğunda iletişime geçelim." 
              : "We always want to meet talented and passionate people. Send us your CV, and we'll contact you when there's a suitable opportunity."}
          </p>
          <a href="mailto:hr@tuzlasupply.com" className="btn-primary" style={{ display: "inline-block" }}>
            hr@tuzlasupply.com
          </a>
        </div>
      </div>
    </main>
  );
}
