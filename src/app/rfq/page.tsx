import styles from "./rfq.module.css";
import Link from "next/link";
import RFQForm from "./RFQForm";
import HomeNavbar from "@/components/HomeNavbar";
import { ArrowLeft, Globe, Send } from "lucide-react";
import { Suspense } from "react";

export default async function RFQPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang = "tr" } = await searchParams;

  const t = {
    back: lang === "tr" ? "Ana Sayfaya Dön" : "Back to Home",
    title: lang === "tr" ? "Hızlı Teklif Talebi (RFQ)" : "Quick Request for Quote (RFQ)",
    desc: lang === "tr" 
      ? "İhtiyaç listenizi dosya olarak yükleyin veya aşağıdaki alana yazın. Uzman ekibimiz talebinizi inceleyerek en kısa sürede fiyatlandırma ile size dönüş yapacaktır."
      : "Upload your requirements list or type in the area below. Our expert team will review your request and get back to you with pricing as soon as possible.",
    footerDesc: lang === "tr" ? "Yeni nesil dijital tedarik ekosistemi. Endüstriyel ve kurumsal ihtiyaçlarınızı teknolojiyle optimize ediyoruz." : "Next-gen digital supply ecosystem. We optimize your industrial and corporate needs with technology.",
    footerRegion: lang === "tr" ? "Hizmet Bölgesi" : "Service Region",
    footerNewsletter: lang === "tr" ? "Haber bülteni için e-posta" : "Email for newsletter",
    privacy: lang === "tr" ? "Gizlilik" : "Privacy",
    terms: lang === "tr" ? "Şartlar" : "Terms",
  };

  return (
    <main className={styles.rfqContainer}>
      <Suspense fallback={null}>
        <HomeNavbar />
      </Suspense>

      <div className="container">
        <Link href={`/?lang=${lang}`} className={styles.backLink}>
          <ArrowLeft size={18} /> {t.back}
        </Link>

        <div className={styles.rfqHeader}>
          <h1 className="title-section">{t.title}</h1>
          <p className={styles.headerDesc}>
            {t.desc}
          </p>
        </div>

        <RFQForm />
      </div>

      <footer className={styles.ultraFooter}>
        <div className="container">
          <div className={styles.footerMain}>
            <div className={styles.footerBrand}>
              <h3 className={styles.footerBrandName}>Tuzla <span>Supply</span></h3>
              <p className={styles.footerBrandDesc}>
                {t.footerDesc}
              </p>
            </div>

            <div className={styles.footerNavGroup}>
              <div className={styles.footerNavCol}>
                <h5>Platform</h5>
                <Link href="/catalog">{lang === "tr" ? "Katalog" : "Catalog"}</Link>
                <Link href="/rfq">{lang === "tr" ? "Hızlı Teklif" : "Quick Quote"}</Link>
              </div>
              <div className={styles.footerNavCol}>
                <h5>{lang === "tr" ? "Şirket" : "Company"}</h5>
                <Link href="/#contact">{lang === "tr" ? "İletişim" : "Contact"}</Link>
              </div>
            </div>

            <div className={styles.footerAction}>
              <h5>{t.footerRegion}</h5>
              <div className={styles.locationTag}>
                <Globe size={14} /> Global / İstanbul, TR
              </div>
            </div>
          </div>

          <div className={styles.footerLegal}>
            <div className={styles.legalLeft}>
              <span>&copy; {new Date().getFullYear()} Tuzla Supply Platform.</span>
              <Link href="/privacy">{t.privacy}</Link>
              <Link href="/terms">{t.terms}</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
