import styles from "@/app/page.module.css";
import HomeNavbar from "@/components/HomeNavbar";
import { Suspense } from "react";
import Link from "next/link";

const legalData: any = {
  "privacy": {
    title: "Privacy Policy",
    titleTr: "Gizlilik Politikası",
    sections: [
      { h: "1. Data Controller", hTr: "1. Veri Sorumlusu", p: "We take maximum care of your security.", pTr: "Kişisel verilerinizin güvenliğine azami hassasiyet gösteriyoruz." },
      { h: "2. Data Safety", hTr: "2. Veri Güvenliği", p: "Data is protected by modern encryption.", pTr: "Verileriniz modern şifreleme yöntemleriyle korunmaktadır." }
    ]
  },
  "terms": {
    title: "Terms of Use",
    titleTr: "Kullanım Şartları",
    sections: [
      { h: "1. Acceptance", hTr: "1. Kabul Edilme", p: "By using this site, you accept terms.", pTr: "Siteyi kullanarak şartları kabul etmiş sayılırsınız." },
      { h: "2. IP Rights", hTr: "2. Fikri Mülkiyet", p: "All content belongs to Tuzla Supply.", pTr: "Tüm içerik Tuzla Supply mülkiyetindedir." }
    ]
  }
};

export default async function LegalPage({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ lang?: string }> }) {
  const { slug } = await params;
  const { lang = "tr" } = await searchParams;
  const isTr = lang === "tr";
  const data = legalData[slug];

  if (!data) return <div style={{ padding: "10rem", textAlign: "center" }}>Page Not Found</div>;

  return (
    <main className={styles.main}>
      <Suspense fallback={null}><HomeNavbar /></Suspense>
      <div className="container" style={{ padding: "10rem 0 5rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "3rem", color: "#0f172a" }}>{isTr ? data.titleTr : data.title}</h1>
          {data.sections.map((s: any, i: number) => (
            <section key={i} style={{ marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#1e293b" }}>{isTr ? s.hTr : s.h}</h2>
              <p style={{ color: "#64748b", lineHeight: "1.8" }}>{isTr ? s.pTr : s.p}</p>
            </section>
          ))}
          <Link href="/" className="btn-primary" style={{ marginTop: "2rem", display: "inline-block" }}>
            {isTr ? "Anasayfa" : "Home"}
          </Link>
        </div>
      </div>
    </main>
  );
}
