import styles from "./page.module.css";
import Link from "next/link";
import { getSiteContent, getHeroSlides } from "@/app/actions/cms";
import HomeNavbar from "@/components/HomeNavbar";
import HeroCarousel from "@/components/HeroCarousel";
import { Suspense } from "react";
import { 
  Anchor, Zap, Settings, Laptop, ShieldCheck, 
  ShoppingBag, Wrench, Globe, Utensils,
  Mail, Phone, MapPin, Clock, Send,
  Ship, Building2, Handshake, Award, Users, Package, TrendingUp,
  Cpu, HardHat, Truck, Warehouse, Briefcase
} from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";
import { getActiveReferences, getActivePartners, getSectionVisibility } from "@/app/actions/showcase";

export default async function Home({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  try {
    const { lang = "tr" } = await searchParams;
    const [content, slides, references, partners, sectionVis] = await Promise.all([
      getSiteContent(),
      getHeroSlides(),
      getActiveReferences(),
      getActivePartners(),
      getSectionVisibility(),
    ]);
    
    const categories = content.categories;

    const t = {
      heroSubtitle: lang === "tr" ? "Tuzla Supply • Global Kurumsal Tedarik & Endüstriyel Mükemmelik" : "Tuzla Supply • Global Corporate Supply & Industrial Excellence",
      ctaBtn: lang === "tr" ? "Hemen Teklif İste" : "Request Quote Now",
      catalogBtn: lang === "tr" ? "Katalog İncele" : "View Catalog",
      catTitle: lang === "tr" ? "Tedarik Kategorilerimiz" : "Our Supply Categories",
      ctaTitle: lang === "tr" ? "Tedarik Zincirinizi Güçlendirin" : "Strengthen Your Supply Chain",
      ctaDesc: lang === "tr" ? "Firmanıza özel fiyatlandırma, hızlı teslimat ve geniş ürün yelpazesi için bizimle iletişime geçin." : "Contact us for custom pricing, fast delivery, and a wide range of products.",
      regBtn: lang === "tr" ? "Tedarik Portalı'na Kaydol" : "Join Supply Portal",
      contactTitle: lang === "tr" ? "Bize Ulaşın" : "Contact Us",
      contactSub: lang === "tr" ? "Sorularınız için yanınızdayız." : "We're here for your questions.",
      nameLabel: lang === "tr" ? "Adınız" : "Full Name",
      emailLabel: lang === "tr" ? "E-posta" : "Email Address",
      messageLabel: lang === "tr" ? "Mesajınız" : "Your Message",
      sendBtn: lang === "tr" ? "Gönder" : "Send Message"
    };

    const getIcon = (title: string) => {
      const lowerTitle = title.toLowerCase();
      if (lowerTitle.includes("ekipman") || lowerTitle.includes("endüstriyel")) return <Cpu size={32} />;
      if (lowerTitle.includes("kurumsal") || lowerTitle.includes("ofis")) return <Briefcase size={32} />;
      if (lowerTitle.includes("isg") || lowerTitle.includes("koruyucu")) return <HardHat size={32} />;
      if (lowerTitle.includes("bakım") || lowerTitle.includes("teknik")) return <Wrench size={32} />;
      if (lowerTitle.includes("it") || lowerTitle.includes("teknoloji")) return <Laptop size={32} />;
      if (lowerTitle.includes("tüketim") || lowerTitle.includes("gıda")) return <ShoppingBag size={32} />;
      if (lowerTitle.includes("lojistik") || lowerTitle.includes("depo")) return <Warehouse size={32} />;
      return <Package size={32} />;
    };

    return (
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <HomeNavbar />
        </Suspense>
        
        {/* Dynamic Hero Carousel */}
        <HeroCarousel 
          initialTitle={content.heroTitle} 
          initialSub={content.heroSub} 
          slides={slides}
          t={t}
        />

        {/* Categories Section */}
        <section className={`${styles.categories} section`} id="services">
          <div className="container">
            <div className={styles.categoriesHeader}>
              <h2 className="title-section">{t.catTitle}</h2>
              <p className="text-muted" style={{ maxWidth: "600px", margin: "1rem auto 0" }}>{content.aboutText}</p>
            </div>
            
            <div className={styles.categoriesGrid}>
              {categories.map((cat: any) => (
                <div key={cat.id} className={styles.categoryCard}>
                  <div className={styles.categoryBadge}>Global Standards</div>
                  <div className={styles.categoryIcon}>
                    {getIcon(cat.title)}
                  </div>
                  <h3 className={styles.categoryTitle}>{cat.title}</h3>
                  <p className={styles.categoryDesc}>{cat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Bar — conditionally rendered */}
        {sectionVis.showStats ? (
          <section className="section" style={{ padding: "0 0 2rem" }}>
            <div className="container">
              <div className={styles.statsBar}>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>{sectionVis.statOrders}</div>
                  <div className={styles.statLabel}>Tamamlanan Sipariş</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>{sectionVis.statCustomers}</div>
                  <div className={styles.statLabel}>Aktif Müşteri</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>{sectionVis.statExperience}</div>
                  <div className={styles.statLabel}>Yıllık Deneyim</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>{sectionVis.statSupport}</div>
                  <div className={styles.statLabel}>Kesintisiz Hizmet</div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* References — conditionally rendered */}
        {sectionVis.showReferences && references.length > 0 ? (
          <section className={`${styles.references} section`} id="references">
            <div className="container">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 className="title-section">Referanslarımız</h2>
                <div style={{ fontSize: "0.8rem", color: "var(--color-accent)", fontWeight: 700 }}>YANA KAYDIR &rarr;</div>
              </div>
              <p className="text-muted" style={{ maxWidth: "600px", margin: "1rem 0 0" }}>
                Endüstriyel ve kurumsal sektörde güvenilir çözüm ortağı olarak hizmet verdiğimiz bazı referanslarımız.
              </p>
            </div>
            <div className={styles.refGrid}>
              {references.map((ref: any) => {
                const IconMap: any = { Ship, Building2, Anchor, Zap, Wrench, Globe };
                const IconComp = IconMap[ref.icon] || Ship;
                return (
                  <div key={ref.id} className={styles.refCard}>
                    <div className={styles.refLogo}><IconComp size={28} /></div>
                    <div className={styles.refType}>{ref.type}</div>
                    <div className={styles.refName}>{ref.name}</div>
                    <p className={styles.refDesc}>{ref.description}</p>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        {/* Partners — conditionally rendered */}
        {sectionVis.showPartners && partners.length > 0 ? (
          <section className={`${styles.partners} section`} id="partners">
            <div className="container">
              <div className={styles.categoriesHeader}>
                <h2 className="title-section">İş Ortaklarımız & Distribütörlükler</h2>
                <p className="text-muted" style={{ maxWidth: "600px", margin: "1rem auto 0" }}>
                  Global markalarla distribütörlük, bayilik ve stratejik ortaklık anlaşmalarımız.
                </p>
              </div>
              <div className={styles.partnersTrack}>
                {[...partners, ...partners].map((p: any, i: number) => (
                  <div key={`${p.id}-${i}`} className={styles.partnerBadge}>
                    <div className={styles.partnerIcon} style={{ background: p.color }}>
                      {p.name.split(" ").map((w: string) => w[0]).join("").substring(0, 2)}
                    </div>
                    <div>
                      <div className={styles.partnerName}>{p.name}</div>
                      <div className={styles.partnerRole}>{p.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Contact Section */}
        <section className={`${styles.contact} section`} id="contact">
          <div className="container">
            <div className={styles.categoriesHeader}>
              <h2 className="title-section">{t.contactTitle}</h2>
              <p className="text-muted">{t.contactSub}</p>
            </div>

            <div className={styles.contactGrid}>
              {/* Contact Info */}
              <div className={styles.contactInfo}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}><Mail size={24} /></div>
                  <div>
                    <span className={styles.infoLabel}>E-posta</span>
                    <div className={styles.infoValue}>info@tuzlasupply.com</div>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}><Phone size={24} /></div>
                  <div>
                    <span className={styles.infoLabel}>Telefon</span>
                    <div className={styles.infoValue}>+90 (216) 123 45 67</div>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}><MapPin size={24} /></div>
                  <div>
                    <span className={styles.infoLabel}>Merkez Ofis</span>
                    <div className={styles.infoValue}>Aydınlı, Tuzla / İstanbul</div>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}><Clock size={24} /></div>
                  <div>
                    <span className={styles.infoLabel}>Çalışma Saatleri</span>
                    <div className={styles.infoValue}>7 Gün / 24 Saat Kesintisiz Hizmet</div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className={styles.contactForm}>
                <div style={{ marginBottom: "2rem" }}>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#0F172A", marginBottom: "0.5rem" }}>
                    Mesaj Bırakın
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "#64748B" }}>
                    Ekibimiz 24 saat içinde size geri dönüş yapacaktır.
                  </p>
                </div>

                <form action={submitContactForm}>
                  <div className={styles.formGrid}>
                    <div>
                      <label className={styles.premiumLabel}>{t.nameLabel}</label>
                      <input type="text" name="name" required className={styles.premiumInput} placeholder="Ad Soyad" />
                    </div>
                    <div>
                      <label className={styles.premiumLabel}>{t.emailLabel}</label>
                      <input type="email" name="email" required className={styles.premiumInput} placeholder="ornek@firma.com" />
                    </div>
                  </div>
                  <div style={{ marginBottom: "2.5rem" }}>
                    <label className={styles.premiumLabel}>{t.messageLabel}</label>
                    <textarea 
                      name="message" 
                      required 
                      className={styles.premiumInput} 
                      style={{ height: "140px", resize: "none" }}
                      placeholder="Size nasıl yardımcı olabiliriz?"
                    ></textarea>
                  </div>
                  <button type="submit" className={styles.submitBtn}>
                    <Send size={20} /> {t.sendBtn}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`${styles.cta} section`}>
          <div className="container">
            <h2 className={styles.ctaTitle}>{t.ctaTitle}</h2>
            <p className={styles.ctaDesc}>
              {t.ctaDesc}
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/rfq" className="btn-primary" style={{ backgroundColor: "white", color: "var(--color-primary)", padding: "1rem 3rem" }}>
                {t.ctaBtn}
              </Link>
            </div>
          </div>
        </section>

        {/* Professional Footer */}
        <footer className={styles.footer}>
          <div className="container">
            <div className={styles.footerGrid}>
              <div className={styles.footerAbout}>
                <div className={styles.footerLogo}>Tuzla <span>Supply</span></div>
                <p className={styles.footerText}>
                  Global Kurumsal Tedarik ve Endüstriyel Çözümler alanında güvenilir ortağınız. 
                  Yüksek standartlarda ikmal ve profesyonel lojistik ağımızla hizmetinizdeyiz.
                </p>
                <p className={styles.footerSlogan}>"Global Corporate Supply & Industrial Excellence"</p>
              </div>

              <div className={styles.footerLinks}>
                <h4 className={styles.footerTitle}>Hızlı Erişim</h4>
                <ul className={styles.footerList}>
                  <li><Link href="/">Anasayfa</Link></li>
                  <li><Link href="#categories">Hizmetlerimiz</Link></li>
                  <li><Link href="#references">Referanslar</Link></li>
                  <li><Link href="#partners">İş Ortaklarımız</Link></li>
                  <li><Link href="/rfq">Teklif İste</Link></li>
                </ul>
              </div>

              <div className={styles.footerContact}>
                <h4 className={styles.footerTitle}>İletişim</h4>
                <div className={styles.footerContactItem}>
                  <strong>Adres:</strong> Aydınlı, Tuzla / İstanbul
                </div>
                <div className={styles.footerContactItem}>
                  <strong>Telefon:</strong> +90 (216) 123 45 67
                </div>
                <div className={styles.footerContactItem}>
                  <strong>E-posta:</strong> info@tuzlasupply.com
                </div>
                <div className={styles.footerContactItem}>
                  <strong>Çalışma Saatleri:</strong> 7/24 Kesintisiz Hizmet
                </div>
              </div>
            </div>

            <div className={styles.footerBottom}>
              <p>&copy; {new Date().getFullYear()} Tuzla Supply. Tüm hakları saklıdır.</p>
              <div className={styles.footerBottomLinks}>
                <Link href="/privacy">Gizlilik Politikası</Link>
                <Link href="/terms">Kullanım Şartları</Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    );
  } catch (error) {
    console.error("Home Page Error:", error);
    return (
      <div style={{ padding: "5rem", textAlign: "center" }}>
        <h1>Sistem Hatası</h1>
        <p>Lütfen veritabanı bağlantınızı ve ayarlarınızı kontrol edin.</p>
      </div>
    );
  }
}
