"use client";

import { useState, useEffect } from "react";
import styles from "@/app/page.module.css";
import Link from "next/link";

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export default function HeroCarousel({ 
  initialTitle, 
  initialSub, 
  slides,
  t 
}: { 
  initialTitle: string, 
  initialSub: string, 
  slides: Slide[],
  t: any
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 seconds
    return () => clearInterval(timer);
  }, [slides.length]);

  // Translation Helper for slides (database content)
  const translateSlide = (text: string) => {
    if (t.lang === "tr") return text;
    const dict: any = {
      // Titles
      "Global Tedarik Zinciri Yönetimi": "Global Supply Chain Management",
      "Kurumsal İş Ortaklığı": "Corporate Business Partnership",
      "Industrial Excellence": "Industrial Excellence",
      "Global Tedarik Ağı": "Global Supply Network",
      "Gemi İkmal Çözümleri": "Marine Supply Solutions",
      "Endüstriyel Mükemmellik": "Industrial Excellence",
      
      // Subtitles / Descriptions
      "Endüstriyel tesisler için kesintisiz ve hızlı ikmal çözümleri.": "Uninterrupted and fast supply solutions for industrial facilities.",
      "Profesyonel kadromuzla işletmenizin stratejik çözüm ortağıyız.": "We are your strategic solution partner with our professional team.",
      "En zorlu teknik malzeme taleplerinde global standartlar.": "Global standards for the most demanding technical material requests.",
      "Endüstriyel ve kurumsal ihtiyaçlarınızı teknolojiyle optimize ediyoruz.": "We optimize your industrial and corporate needs with technology.",
      "Denizcilik sektöründe global standartlarda teknik malzeme ve kumanya tedariki.": "Global standards for technical materials and provisions in the maritime sector.",
      "Tüm sektörler için kesintisiz ve dijitalleştirilmiş tedarik zinciri yönetimi.": "Seamless and digitized supply chain management for all industries."
    };
    return dict[text] || text;
  };

  const activeTitle = slides.length > 0 ? translateSlide(slides[current].title) : initialTitle;
  const activeSub = slides.length > 0 ? translateSlide(slides[current].subtitle) : initialSub;

  return (
    <section className={styles.hero}>
      {/* Background Images Layer */}
      <div className={styles.carouselBg}>
        {slides.length === 0 ? (
          <div className={styles.heroBackground}></div>
        ) : (
          slides.map((slide, index) => (
            <div 
              key={slide.id} 
              className={`${styles.slideImage} ${index === current ? styles.slideActive : ""}`}
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            />
          ))
        )}
        <div className={styles.heroOverlay}></div>
      </div>

      <div className={`${styles.heroContent} container`}>
        <span className={styles.heroSubtitle}>{t.heroSubtitle}</span>
        <h1 className="title-main" style={{ color: slides.length > 0 ? "white" : "inherit" }}>
          {activeTitle}
        </h1>
        <p className={styles.heroDescription} style={{ color: slides.length > 0 ? "rgba(255,255,255,0.8)" : "inherit" }}>
          {activeSub}
        </p>
        <div className={styles.heroActions}>
          <Link href="/rfq" className="btn-primary" style={{ padding: "1.25rem 3rem", fontSize: "1.1rem" }}>{t.ctaBtn}</Link>
        </div>
        
        {/* Carousel Indicators */}
        {slides.length > 1 && (
          <div className={styles.indicators}>
            {slides.map((_, i) => (
              <div 
                key={i} 
                className={`${styles.indicator} ${i === current ? styles.indicatorActive : ""}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
