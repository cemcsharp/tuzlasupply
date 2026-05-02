"use client";

import styles from "@/app/page.module.css";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export default function HomeNavbar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = searchParams.get("lang") || "tr";

  const toggleLang = (newLang: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("lang", newLang);
    router.push(`?${params.toString()}`);
  };

  return (
    <nav className={styles.navbar}>
      <div className={`${styles.navContainer} container`}>
        <Link href="/" className={styles.logoContainer}>
          <div className={styles.logo}>Tuzla <span>Supply</span></div>
          <div className={styles.sloganSmall}>Global Corporate Supply & Industrial Excellence</div>
        </Link>
        
        <div className={styles.navRight}>
          <div className={styles.langSwitch}>
            <button 
              className={`${styles.langBtn} ${lang === "tr" ? styles.langBtnActive : ""}`}
              onClick={() => toggleLang("tr")}
            >
              TR
            </button>
            <button 
              className={`${styles.langBtn} ${lang === "en" ? styles.langBtnActive : ""}`}
              onClick={() => toggleLang("en")}
            >
              EN
            </button>
          </div>
          <Link href="/login" style={{ fontSize: "0.9rem", color: "var(--color-primary)", fontWeight: "600" }}>
            Admin Girişi
          </Link>
          <Link href="/rfq" className="btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.9rem" }}>
            Teklif İste
          </Link>
        </div>
      </div>
    </nav>
  );
}
