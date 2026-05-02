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

  const activeTitle = slides.length > 0 ? slides[current].title : initialTitle;
  const activeSub = slides.length > 0 ? slides[current].subtitle : initialSub;

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
