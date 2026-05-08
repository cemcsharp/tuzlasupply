"use client";

import styles from "@/app/page.module.css";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { 
  ChevronDown, 
  Cpu, 
  Wrench, 
  Anchor, 
  Truck, 
  ShieldCheck, 
  Globe,
  Zap,
  Package
} from "lucide-react";

export default function HomeNavbar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = searchParams.get("lang") || "tr";
  const [showSolutions, setShowSolutions] = useState(false);

  const toggleLang = (newLang: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("lang", newLang);
    router.push(`?${params.toString()}`);
  };

  const solutions = [
    { 
      slug: "ship-electrical", 
      title: lang === "tr" ? "Gemi Elektriği" : "Ship Electrical", 
      icon: <Zap size={18} />,
      desc: lang === "tr" ? "Otomasyon & Güç Sistemleri" : "Automation & Power Systems"
    },
    { 
      slug: "ship-mechanical", 
      title: lang === "tr" ? "Mekanik Servis" : "Mechanical Service", 
      icon: <Wrench size={18} />,
      desc: lang === "tr" ? "Motor & Overhaul" : "Engine & Overhaul"
    },
    { 
      slug: "spare-parts", 
      title: lang === "tr" ? "Yedek Parça" : "Spare Parts", 
      icon: <Anchor size={18} />,
      desc: lang === "tr" ? "Global Tedarik Zinciri" : "Global Supply Chain"
    },
    { 
      slug: "shipyard-logistics", 
      title: lang === "tr" ? "Lojistik & Depo" : "Logistics & Warehouse", 
      icon: <Truck size={18} />,
      desc: lang === "tr" ? "Gümrüklü Teslimat" : "Bonded Delivery"
    }
  ];

  return (
    <nav className={styles.navbar}>
      <div className={`${styles.navContainer} container`}>
        <Link href="/" className={styles.logoContainer}>
          <div className={styles.brandColumn}>
            <div className={styles.logoText}>
              Tuzla <span>Supply</span>
            </div>
            <div className={styles.navSlogan}>
              {lang === "tr" ? "Navis AI Destekli Tedarik" : "Navis AI Powered Supply"}
            </div>
          </div>
        </Link>
        
        <div className={styles.navLinks}>
          <Link href={`/catalog?lang=${lang}`} className={styles.navLink}>
            {lang === "tr" ? "Katalog" : "Catalog"}
          </Link>
          
          <div 
            className={styles.navItemWithDropdown}
            onMouseEnter={() => setShowSolutions(true)}
            onMouseLeave={() => setShowSolutions(false)}
          >
            <span className={`${styles.navLink} ${showSolutions ? styles.active : ""}`}>
              {lang === "tr" ? "Çözümler" : "Solutions"} <ChevronDown size={14} className={styles.chevron} />
            </span>
            
            {showSolutions && (
              <div className={styles.megaMenu}>
                <div className={styles.megaMenuGrid}>
                  {solutions.map((item) => (
                    <Link 
                      key={item.slug} 
                      href={`/solutions/${item.slug}?lang=${lang}`}
                      className={styles.megaMenuItem}
                    >
                      <div className={styles.megaMenuIcon}>{item.icon}</div>
                      <div className={styles.megaMenuContent}>
                        <div className={styles.megaMenuTitle}>{item.title}</div>
                        <div className={styles.megaMenuDesc}>{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href={`/#references?lang=${lang}`} className={styles.navLink}>
            {lang === "tr" ? "Referanslar" : "References"}
          </Link>
          <Link href={`/company/insights?lang=${lang}`} className={styles.navLink}>
            {lang === "tr" ? "Insights" : "Insights"}
          </Link>
          <Link href={`/#contact?lang=${lang}`} className={styles.navLink}>
            {lang === "tr" ? "İletişim" : "Contact"}
          </Link>
        </div>
        
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
          <Link href="/rfq" className={`${styles.navCta} btn-primary`}>
            {lang === "tr" ? "Teklif İste" : "Get Quote"}
          </Link>
        </div>
      </div>
    </nav>
  );
}
