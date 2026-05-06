import styles from "./rfq.module.css";
import Link from "next/link";
import RFQForm from "./RFQForm";
import HomeNavbar from "@/components/HomeNavbar";
import Footer from "@/components/Footer";
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

      <Footer lang={lang} />
    </main>
  );
}
