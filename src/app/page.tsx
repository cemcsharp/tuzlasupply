
import HomeNavbar from "@/components/HomeNavbar";
import Footer from "@/components/Footer";
import { 
  ShieldCheck, Truck, Clock, Anchor, 
  ChevronRight, ArrowRight, CheckCircle2, 
  Settings, Globe, Ship, Activity, 
  Zap, Wrench, Droplets, Wind, Waves, 
  Flame, Compass, Radio, Shield, 
  Trash2, Coffee, Beer, Paintbrush, 
  Hammer, Package, Box
} from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";
import { Suspense } from "react";

export default function HomePage() {
  const isTr = true;

  const technicalServices = [
    { name: isTr ? "Gemi Elektrik" : "Electrical Equipment", icon: <Zap size={20}/>, key: "electrical" },
    { name: isTr ? "Gemi Mekanik" : "Mechanical Equipment", icon: <Wrench size={20}/>, key: "mechanical" },
    { name: isTr ? "Gemi Hidrolik" : "Hydraulic Equipment", icon: <Droplets size={20}/>, key: "hydraulic" },
    { name: isTr ? "Gemi Havalandırma" : "Ventilation Equipment", icon: <Wind size={20}/>, key: "ventilation" },
    { name: isTr ? "Gemi Su Arıtma" : "Water Treatment", icon: <Waves size={20}/>, key: "water" },
    { name: isTr ? "Gemi Boya" : "Coatings & Paints", icon: <Paintbrush size={20}/>, key: "paint" },
    { name: isTr ? "Gemi Vinç" : "Lifting Equipment", icon: <Hammer size={20}/>, key: "lifting" },
    { name: isTr ? "Yangın Söndürme" : "Firefighting", icon: <Flame size={20}/>, key: "fire" },
    { name: isTr ? "Navigasyon" : "Navigational", icon: <Compass size={20}/>, key: "nav" },
    { name: isTr ? "Gemi İletişim" : "Communication", icon: <Radio size={20}/>, key: "comm" },
    { name: isTr ? "Gemi Güvenlik" : "Safety & Security", icon: <Shield size={20}/>, key: "safety" },
    { name: isTr ? "Gemi Temizlik" : "Cleaning Services", icon: <Trash2 size={20}/>, key: "cleaning" },
    { name: isTr ? "Gemi Yiyecek" : "Food Supplies", icon: <Coffee size={20}/>, key: "food" },
    { name: isTr ? "Gemi İçecek" : "Beverage Supplies", icon: <Beer size={20}/>, key: "beverage" },
  ];

  return (
    <main className={styles.main}>
      <Suspense fallback={null}>
        <HomeNavbar />
      </Suspense>

      {/* 1. DYNAMIC HERO SECTION WITH PARALLAX FEEL */}
      <section className={styles.industrialHero}>
        <div className={styles.heroOverlay}></div>
        <div className="container">
          <div className={`${styles.heroContent} reveal reveal-1`}>
            <div className={styles.trustBadge}>
              <ShieldCheck size={16} /> GLOBAL MARITIME SUPPLY CHAIN MANAGEMENT
            </div>
            <h1 className={styles.heroTitle}>
              {isTr ? "Denizcilikte Dev" : "Maritime"} <br/>
              <span className={styles.accentText}>{isTr ? "Operasyonel Güç." : "Operational Power."}</span>
            </h1>
            <p className={styles.heroDesc}>
              {isTr 
                ? "Tuzla, İstanbul ve tüm Türkiye limanlarında; gemi elektrikten mekaniğe, kumanyadan emniyet ekipmanlarına kadar 7/24 profesyonel ship chandler hizmetleri." 
                : "Professional ship chandler services 24/7 in Tuzla, Istanbul and all Turkish ports; from electrical to mechanical, provisions to safety equipment."}
            </p>
            <div className={styles.heroActions}>
              <Link href="/rfq" className="btn-primary">
                {isTr ? "TEKLİF İSTE" : "REQUEST QUOTE"} <ArrowRight size={18} />
              </Link>
              <Link href="/catalog" className={styles.btnSecondary}>
                {isTr ? "HİZMETLERİMİZ" : "OUR SERVICES"}
              </Link>
            </div>
          </div>
        </div>
        
        <div className={`${styles.certBar} reveal reveal-3`}>
          <div className="container">
            <div className={styles.certGrid}>
              <span>SHIP CHANDLER</span>
              <span className={styles.certDivider}>|</span>
              <span>MARINE LOGISTICS</span>
              <span className={styles.certDivider}>|</span>
              <span>PORT SERVICES</span>
              <span className={styles.certDivider}>|</span>
              <span>BUNKER SERVICES</span>
              <span className={styles.certDivider}>|</span>
              <span>SHIPPING AGENCY</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPREHENSIVE SERVICE CLOUD (SEO & VISUAL HUB) */}
      <section className={styles.serviceCloudSection}>
        <div className="container">
          <div className="reveal reveal-1" style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="section-title">{isTr ? "360° GEMİ İKMAL VE SERVİS" : "360° SHIP SUPPLY & SERVICE"}</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              {isTr 
                ? "Tek bir noktadan tüm teknik ve operasyonel ihtiyaçlarınız için profesyonel çözümler." 
                : "Professional solutions for all your technical and operational needs from a single point."}
            </p>
          </div>

          <div className={styles.serviceCloudGrid}>
            {technicalServices.map((service, idx) => (
              <div key={service.key} className={`${styles.serviceMiniCard} hover-lift reveal reveal-${(idx % 4) + 1}`}>
                <div className={styles.serviceMiniIcon}>{service.icon}</div>
                <span>{service.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OPERATIONAL EXCELLENCE WITH MOTION */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className="reveal reveal-1">
              <div className={styles.statCard}>
                <h3>500+</h3>
                <p>{isTr ? "Tamamlanan Proje" : "Projects Completed"}</p>
              </div>
            </div>
            <div className="reveal reveal-2">
              <div className={styles.statCard}>
                <h3>24/7</h3>
                <p>{isTr ? "Liman Operasyonu" : "Port Operations"}</p>
              </div>
            </div>
            <div className="reveal reveal-3">
              <div className={styles.statCard}>
                <h3>150+</h3>
                <p>{isTr ? "Mutlu Armatör" : "Happy Owners"}</p>
              </div>
            </div>
            <div className="reveal reveal-4">
              <div className={styles.statCard}>
                <h3>100%</h3>
                <p>{isTr ? "Teknik Doğruluk" : "Technical Accuracy"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NAVIS AI: SMART SUPPLY CHAIN */}
      <section className={styles.aiSection}>
        <div className="container">
          <div className={styles.aiContentGrid}>
            <div className={`${styles.aiImageArea} reveal reveal-1`}>
              <div className={styles.aiGlow}></div>
              <Activity size={120} className={styles.aiIconMain} />
              <div className={styles.aiDataNode} style={{ top: '10%', left: '10%' }}><Box size={20}/></div>
              <div className={styles.aiDataNode} style={{ bottom: '20%', right: '15%' }}><Truck size={20}/></div>
            </div>
            <div className={`${styles.aiTextArea} reveal reveal-2`}>
              <h2 className="section-title" style={{ color: '#fff' }}>NAVIS AI: {isTr ? "AKILLI TEDARİK ZİNCİRİ" : "SMART SUPPLY CHAIN"}</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', marginBottom: '2rem' }}>
                {isTr 
                  ? "Supply Chain Management artık daha akıllı. Navis AI, liman servislerinden teknik ikmale kadar tüm süreci optimize eder." 
                  : "Supply Chain Management is now smarter. Navis AI optimizes the entire process from port services to technical supply."}
              </p>
              <Link href="/rfq" className="btn-primary" style={{ background: '#38bdf8', color: '#0a192f' }}>
                {isTr ? "SİSTEMİ DENEYİN" : "TRY THE SYSTEM"} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer lang="tr" />
    </main>
  );
}
