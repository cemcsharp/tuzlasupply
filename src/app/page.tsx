
import HomeNavbar from "@/components/HomeNavbar";
import Footer from "@/components/Footer";
import { 
  ShieldCheck, Truck, Clock, Anchor, 
  ChevronRight, ArrowRight, CheckCircle2, 
  Settings, Globe, Ship, Activity, 
  Box, Droplets, Utensils
} from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";

import { Suspense } from "react";

export default function HomePage() {
  const isTr = true; // Defaulting to TR for the user's focus

  return (
    <main className={styles.main}>
      <Suspense fallback={null}>
        <HomeNavbar />
      </Suspense>

      {/* 1. INDUSTRIAL HERO SECTION */}
      <section className={styles.industrialHero}>
        <div className={styles.heroOverlay}></div>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.trustBadge}>
              <ShieldCheck size={16} /> TRUSTED MARITIME PARTNER SINCE 1994
            </div>
            <h1 className={styles.heroTitle}>
              {isTr ? "Denizcilikte Fiziksel Güç," : "Physical Power,"} <br/>
              <span className={styles.accentText}>{isTr ? "Dijital Hassasiyet." : "Digital Precision."}</span>
            </h1>
            <p className={styles.heroDesc}>
              {isTr 
                ? "Tuzla ve Yalova tersaneler bölgesinde, dev araç filomuz ve modern depolama tesislerimizle 7/24 eksiksiz gemi ikmali sağlıyoruz." 
                : "Providing 24/7 complete ship supply in Tuzla and Yalova regions with our large fleet and modern warehouse facilities."}
            </p>
            <div className={styles.heroActions}>
              <Link href="/rfq" className="btn-primary">
                {isTr ? "TEKLİF İSTE" : "REQUEST QUOTE"} <ArrowRight size={18} />
              </Link>
              <Link href="/catalog" className={styles.btnSecondary}>
                {isTr ? "DİJİTAL KATALOG" : "DIGITAL CATALOG"}
              </Link>
            </div>
          </div>
        </div>
        
        {/* CERTIFICATION BAR */}
        <div className={styles.certBar}>
          <div className="container">
            <div className={styles.certGrid}>
              <span>IMPA MEMBER</span>
              <span className={styles.certDivider}>|</span>
              <span>ISSA MEMBER</span>
              <span className={styles.certDivider}>|</span>
              <span>ISO 9001:2015</span>
              <span className={styles.certDivider}>|</span>
              <span>ISO 14001</span>
              <span className={styles.certDivider}>|</span>
              <span>ISO 45001</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OPERATIONAL STATS (THE "PHYSICAL" PROOF) */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3>12+</h3>
              <p>{isTr ? "Özel Lojistik Aracı" : "Specialized Vehicles"}</p>
            </div>
            <div className={styles.statCard}>
              <h3>5000m²</h3>
              <p>{isTr ? "Modern Depolama Alanı" : "Modern Warehouse Area"}</p>
            </div>
            <div className={styles.statCard}>
              <h3>15dk</h3>
              <p>{isTr ? "Tersane Bölgesi Yanıt Hızı" : "Shipyard Region Response"}</p>
            </div>
            <div className={styles.statCard}>
              <h3>24/7</h3>
              <p>{isTr ? "Kesintisiz Operasyon" : "Continuous Operations"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES WITH REAL AUTHORITY */}
      <section className={styles.servicesSection}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">{isTr ? "ANA HİZMETLERİMİZ" : "CORE SERVICES"}</h2>
            <p className="section-subtitle" style={{ margin: '0 auto 4rem' }}>
              {isTr 
                ? "En yüksek kalite standartlarında, IMPA ve ISSA normlarına tam uyumlu ürün gamı." 
                : "Full range of products in compliance with the highest quality standards, IMPA and ISSA norms."}
            </p>
          </div>

          <div className={styles.serviceGrid}>
            {[
              { 
                t: isTr ? "Kumanya İkmali" : "Provision Supply", 
                d: isTr ? "Günlük taze meyve, sebze, et ve dondurulmuş ürünler." : "Daily fresh fruits, vegetables, meat and frozen goods.",
                icon: <Utensils size={32} />,
                img: "/fresh_provisions_quality_1778816573961.png"
              },
              { 
                t: isTr ? "Teknik Malzemeler" : "Technical Stores", 
                d: isTr ? "Gemi makine, güverte ve kabin malzemeleri (IMPA/ISSA)." : "Engine, deck and cabin stores (IMPA/ISSA).",
                icon: <Settings size={32} />,
                img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070"
              },
              { 
                t: isTr ? "Emniyet Ekipmanları" : "Safety Equipment", 
                d: isTr ? "LSA ve FFA ekipmanları, servis ve sertifikasyon." : "LSA and FFA equipment, service and certification.",
                icon: <ShieldCheck size={32} />,
                img: "https://images.unsplash.com/photo-1513467655676-561b7d489a88?q=80&w=2070"
              }
            ].map((s, i) => (
              <div key={i} className={styles.serviceCard}>
                <div className={styles.serviceImage} style={{ backgroundImage: `url(${s.img})` }}></div>
                <div className={styles.serviceContent}>
                  <div className={styles.serviceIcon}>{s.icon}</div>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                  <Link href="/catalog" className={styles.serviceLink}>
                    {isTr ? "İncele" : "Explore"} <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NAVIS AI: THE QUALITY GUARANTEE */}
      <section className={styles.aiSection}>
        <div className="container">
          <div className={styles.aiContentGrid}>
            <div className={styles.aiImageArea}>
              <div className={styles.aiGlow}></div>
              <Activity size={120} className={styles.aiIconMain} />
            </div>
            <div className={styles.aiTextArea}>
              <h2 className="section-title" style={{ color: '#fff' }}>NAVIS AI: {isTr ? "SIFIR HATA GARANTİSİ" : "ZERO ERROR GUARANTEE"}</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', marginBottom: '2rem' }}>
                {isTr 
                  ? "Sadece hızlı değil, %100 doğru ikmal. Navis AI, teknik spesifikasyonlarınızı analiz eder ve yanlış ürün riskini ortadan kaldırır." 
                  : "Not just fast, 100% accurate supply. Navis AI analyzes your technical specs and eliminates the risk of wrong products."}
              </p>
              <div className={styles.aiFeatureList}>
                <div className={styles.aiFeatureItem}>
                  <CheckCircle2 size={24} color="#38bdf8" />
                  <span>{isTr ? "Otomatik IMPA/ISSA Eşleştirme" : "Automatic IMPA/ISSA Matching"}</span>
                </div>
                <div className={styles.aiFeatureItem}>
                  <CheckCircle2 size={24} color="#38bdf8" />
                  <span>{isTr ? "Teknik Çizim Analizi" : "Technical Drawing Analysis"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer lang="tr" />
    </main>
  );
}
