"use client";

import { Cpu, Globe, ShieldCheck, Clock, Zap, Anchor } from "lucide-react";
import styles from "../app/page.module.css";

export default function BentoFeatures({ lang = "tr" }: { lang?: string }) {
  const t = {
    title: lang === "tr" ? "Neden Tuzla Supply?" : "Why Tuzla Supply?",
    subtitle: lang === "tr" ? "Geleceğin Tedarik Ekosistemi" : "Supply Ecosystem of the Future",
    card1: {
      title: lang === "tr" ? "Yapay Zeka Destekli Analiz" : "AI-Powered Analysis",
      desc: lang === "tr" ? "Karmaşık listeleri ve el yazılarını saniyeler içinde dijital siparişlere dönüştürür." : "Converts complex lists and handwriting into digital orders in seconds."
    },
    card2: {
      title: lang === "tr" ? "Global Lojistik Ağı" : "Global Logistics Network",
      desc: lang === "tr" ? "Tuzla'dan Singapur'a her limanda." : "At every port from Tuzla to Singapore."
    },
    card3: {
      title: lang === "tr" ? "7/24 Kesintisiz Destek" : "24/7 Uninterrupted Support",
      desc: lang === "tr" ? "Acil ihtiyaçlarda yanınızdayız." : "By your side for urgent needs."
    },
    card4: {
      title: lang === "tr" ? "Kurumsal Güvenlik" : "Enterprise Security",
      desc: lang === "tr" ? "Verileriniz bizimle güvende." : "Your data is safe with us."
    }
  };

  return (
    <section className="section" style={{ background: "#fff", paddingBottom: "6rem" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className={styles.sectionSubtitle}>{t.subtitle}</span>
          <h2 className={styles.sectionTitle}>{t.title}</h2>
        </div>

        <div className={styles.bentoGrid}>
          {/* Big Card - AI */}
          <div className={`${styles.bentoCard} ${styles.bentoWide} ${styles.glassEffect}`}>
            <div className={styles.bentoIcon} style={{ background: "rgba(0, 163, 255, 0.1)", color: "var(--color-accent)" }}>
              <Cpu size={32} />
            </div>
            <div className={styles.bentoContent}>
              <h3>{t.card1.title}</h3>
              <p>{t.card1.desc}</p>
              <div className={styles.aiVisual}>
                <div className={styles.aiLine} />
                <div className={styles.aiLine} style={{ animationDelay: "1s" }} />
                <div className={styles.aiLine} style={{ animationDelay: "2s" }} />
              </div>
            </div>
          </div>

          {/* Tall Card - Global */}
          <div className={`${styles.bentoCard} ${styles.bentoTall} ${styles.darkBento}`}>
            <div className={styles.bentoIcon} style={{ color: "#fff" }}>
              <Globe size={32} />
            </div>
            <div className={styles.bentoContent}>
              <h3 style={{ color: "#fff" }}>{t.card2.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.7)" }}>{t.card2.desc}</p>
            </div>
            <div className={styles.oceanGrid} />
          </div>

          {/* Square - Support */}
          <div className={styles.bentoCard}>
            <div className={styles.bentoIcon} style={{ background: "#fef2f2", color: "#ef4444" }}>
              <Clock size={28} />
            </div>
            <div className={styles.bentoContent}>
              <h3>{t.card3.title}</h3>
              <p>{t.card3.desc}</p>
            </div>
          </div>

          {/* Square - Security */}
          <div className={styles.bentoCard}>
            <div className={styles.bentoIcon} style={{ background: "#f0fdf4", color: "#22c55e" }}>
              <ShieldCheck size={28} />
            </div>
            <div className={styles.bentoContent}>
              <h3>{t.card4.title}</h3>
              <p>{t.card4.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
