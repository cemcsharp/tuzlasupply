"use client";

import { ClipboardCheck, PackageSearch, Truck, Anchor } from "lucide-react";
import styles from "../app/page.module.css";

export default function SupplyProcess({ lang = "tr" }: { lang?: string }) {
  const steps = [
    {
      icon: <ClipboardCheck size={32} />,
      title: lang === "tr" ? "Akıllı Talep" : "Smart Request",
      desc: lang === "tr" ? "AI destekli sistemimizle talebiniz anında işleme alınır." : "Your request is instantly processed by our AI system."
    },
    {
      icon: <PackageSearch size={32} />,
      title: lang === "tr" ? "Hızlı Tedarik" : "Rapid Sourcing",
      desc: lang === "tr" ? "Geniş stok ağımızdan ürünleriniz özenle hazırlanır." : "Items are carefully prepared from our wide inventory."
    },
    {
      icon: <Truck size={32} />,
      title: lang === "tr" ? "Güvenli Lojistik" : "Secure Logistics",
      desc: lang === "tr" ? "Özel araçlarımızla limana doğru yola çıkar." : "Dispatched to the port via our dedicated fleet."
    },
    {
      icon: <Anchor size={32} />,
      title: lang === "tr" ? "Liman Teslimatı" : "Port Delivery",
      desc: lang === "tr" ? "Geminiz nerede olursa olsun, tam zamanında teslim." : "On-time delivery, wherever your vessel is."
    }
  ];

  return (
    <section className="section" style={{ background: "#f8fafc", padding: "6rem 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 className={styles.sectionTitle}>
            {lang === "tr" ? "Operasyonel Sürecimiz" : "Our Operational Process"}
          </h2>
          <p className={styles.sectionSubtitle}>
            {lang === "tr" ? "Uçtan uca şeffaf ve güvenilir ikmal" : "End-to-end transparent and reliable supply"}
          </p>
        </div>

        <div className={styles.processGrid}>
          {steps.map((step, idx) => (
            <div key={idx} className={styles.processStep}>
              <div className={styles.processIconWrapper}>
                {step.icon}
                <div className={styles.processStepNumber}>{idx + 1}</div>
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
              {idx < steps.length - 1 && <div className={styles.processConnector} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
