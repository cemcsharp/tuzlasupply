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

export const dynamic = "force-dynamic";

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
      sendBtn: lang === "tr" ? "Gönder" : "Send Message",
      catSubtitle: lang === "tr" ? "Çözüm Alanlarımız" : "Our Solution Areas",
      catMarineTitle: lang === "tr" ? "Denizcilik & Filo" : "Marine & Fleet",
      catMarineDesc: lang === "tr" ? "Global gemi ikmal, teknik malzeme ve tersane operasyon çözümleri." : "Global ship supply, technical materials, and shipyard solutions.",
      catMarineItems: lang === "tr" ? ["Güverte & Makine", "Kumanya & İkmal", "Tersane Ekipmanları"] : ["Deck & Engine", "Provisions & Supply", "Shipyard Equipment"],
      catIndTitle: lang === "tr" ? "Endüstri & Fabrika" : "Industry & Factory",
      catIndDesc: lang === "tr" ? "Üretim tesisleri ve ağır sanayi için kesintisiz yedek parça ve sarf malzeme." : "Uninterrupted spare parts and consumables for production plants.",
      catIndItems: lang === "tr" ? ["Hidrolik & Pnömatik", "Güç Aktarım", "Üretim Hattı Destek"] : ["Hydraulic & Pneumatic", "Power Transmission", "Production Line Support"],
      catTechTitle: lang === "tr" ? "Kurumsal & Teknoloji" : "Corporate & Tech",
      catTechDesc: lang === "tr" ? "Modern iş dünyası için IT altyapısı, iş güvenliği ve ofis çözümleri." : "IT infrastructure, occupational safety, and office solutions.",
      catTechItems: lang === "tr" ? ["IT Donanım & Yazılım", "İş Sağlığı ve Güvenliği", "Kurumsal Sarf Malzeme"] : ["IT Hardware & Software", "Health & Safety", "Corporate Consumables"],
      footerDesc: lang === "tr" ? "Yeni nesil dijital tedarik ekosistemi. Endüstriyel ve kurumsal ihtiyaçlarınızı teknolojiyle optimize ediyoruz." : "Next-gen digital supply ecosystem. We optimize your industrial and corporate needs with technology.",
      footerRegion: lang === "tr" ? "Hizmet Bölgesi" : "Service Region",
      footerNewsletter: lang === "tr" ? "Haber bülteni için e-posta" : "Email for newsletter",
      // Stats Labels
      statOrders: lang === "tr" ? "Tamamlanan Sipariş" : "Completed Orders",
      statCustomers: lang === "tr" ? "Aktif Müşteri" : "Active Customers",
      statExperience: lang === "tr" ? "Yıllık Deneyim" : "Years of Experience",
      statSupport: lang === "tr" ? "Kesintisiz Hizmet" : "24/7 Support",
      // References & Partners
      refTitle: lang === "tr" ? "Referanslarımız" : "Our References",
      refSwipe: lang === "tr" ? "YANA KAYDIR" : "SWIPE LEFT",
      refSub: lang === "tr" ? "Endüstriyel ve kurumsal sektörde güvenilir çözüm ortağı olarak hizmet verdiğimiz bazı referanslarımız." : "Some of our references where we serve as a reliable solution partner in the industrial and corporate sectors.",
      partnerTitle: lang === "tr" ? "İş Ortaklarımız & Distribütörlükler" : "Our Business Partners & Distributorships",
      partnerSub: lang === "tr" ? "Global markalarla distribütörlük, bayilik ve stratejik ortaklık anlaşmalarımız." : "Our distributorship, dealership and strategic partnership agreements with global brands.",
      // Form placeholders
      formNamePl: lang === "tr" ? "Ad Soyad" : "Your Full Name",
      formEmailPl: lang === "tr" ? "ornek@firma.com" : "example@company.com",
      formMsgPl: lang === "tr" ? "Size nasıl yardımcı olabiliriz?" : "How can we help you?",
      formSuccess: lang === "tr" ? "Mesaj Bırakın" : "Leave a Message",
      formSuccessSub: lang === "tr" ? "Ekibimiz 24 saat içinde size geri dönüş yapacaktır." : "Our team will get back to you within 24 hours.",
      contactEmail: lang === "tr" ? "E-posta" : "Email",
      contactPhone: lang === "tr" ? "Telefon" : "Phone",
      contactOffice: lang === "tr" ? "Merkez Ofis" : "Headquarters",
      contactHours: lang === "tr" ? "Çalışma Saatleri" : "Working Hours",
      contactHoursVal: lang === "tr" ? "7 Gün / 24 Saat Kesintisiz Hizmet" : "24/7 Uninterrupted Service",
      privacy: lang === "tr" ? "Gizlilik Politikası" : "Privacy Policy",
      terms: lang === "tr" ? "Kullanım Şartları" : "Terms of Use",
      lang: lang
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

        {/* Categories Section - Industry & Marine Balance */}
        <section id="categories" className="section" style={{ backgroundColor: "#f8fafc" }}>
          <div className="container">
            <div className={styles.sectionHeaderCenter}>
              <span className={styles.sectionSubtitle}>{t.catSubtitle}</span>
              <h2 className={styles.sectionTitle}>{t.catTitle}</h2>
              <p className={styles.sectionDescCenter}>
                {lang === "tr" 
                  ? "Denizcilikten ağır sanayiye, kurumsal ofislerden teknoloji merkezlerine kadar tüm sektörler için dijital ve fiziksel tedarik çözümleri sunuyoruz."
                  : "We offer digital and physical supply solutions for all sectors, from maritime to heavy industry, corporate offices to technology centers."
                }
              </p>
            </div>

            <div className={styles.categoryGrid}>
              {/* Marine Block */}
              <div className={styles.categoryCardPremium}>
                <div className={styles.categoryIconMain}><Ship size={32} /></div>
                <h3>{t.catMarineTitle}</h3>
                <p>{t.catMarineDesc}</p>
                <ul className={styles.categorySubList}>
                  {t.catMarineItems.map((item: string) => <li key={item}>{item}</li>)}
                </ul>
              </div>

              {/* Industrial Block */}
              <div className={styles.categoryCardPremium}>
                <div className={styles.categoryIconMain}><Building2 size={32} /></div>
                <h3>{t.catIndTitle}</h3>
                <p>{t.catIndDesc}</p>
                <ul className={styles.categorySubList}>
                  {t.catIndItems.map((item: string) => <li key={item}>{item}</li>)}
                </ul>
              </div>

              {/* Technology & Safety Block */}
              <div className={styles.categoryCardPremium}>
                <div className={styles.categoryIconMain}><Zap size={32} /></div>
                <h3>{t.catTechTitle}</h3>
                <p>{t.catTechDesc}</p>
                <ul className={styles.categorySubList}>
                  {t.catTechItems.map((item: string) => <li key={item}>{item}</li>)}
                </ul>
              </div>
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
                  <div className={styles.statLabel}>{t.statOrders}</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>{sectionVis.statCustomers}</div>
                  <div className={styles.statLabel}>{t.statCustomers}</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>{sectionVis.statExperience}</div>
                  <div className={styles.statLabel}>{t.statExperience}</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>{sectionVis.statSupport}</div>
                  <div className={styles.statLabel}>{t.statSupport}</div>
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
                <h2 className="title-section">{t.refTitle}</h2>
                <div style={{ fontSize: "0.8rem", color: "var(--color-accent)", fontWeight: 700 }}>{t.refSwipe} &rarr;</div>
              </div>
              <p className="text-muted" style={{ maxWidth: "600px", margin: "1rem 0 0" }}>
                {t.refSub}
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
                <h2 className="title-section">{t.partnerTitle}</h2>
                <p className="text-muted" style={{ maxWidth: "600px", margin: "1rem auto 0" }}>
                  {t.partnerSub}
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
                    <span className={styles.infoLabel}>{t.contactEmail}</span>
                    <div className={styles.infoValue}>info@tuzlasupply.com</div>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}><Phone size={24} /></div>
                  <div>
                    <span className={styles.infoLabel}>{t.contactPhone}</span>
                    <div className={styles.infoValue}>+90 (216) 123 45 67</div>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}><MapPin size={24} /></div>
                  <div>
                    <span className={styles.infoLabel}>{t.contactOffice}</span>
                    <div className={styles.infoValue}>Aydınlı, Tuzla / İstanbul</div>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}><Clock size={24} /></div>
                  <div>
                    <span className={styles.infoLabel}>{t.contactHours}</span>
                    <div className={styles.infoValue}>{t.contactHoursVal}</div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className={styles.contactForm}>
                <div style={{ marginBottom: "2rem" }}>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#0F172A", marginBottom: "0.5rem" }}>
                    {t.formSuccess}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "#64748B" }}>
                    {t.formSuccessSub}
                  </p>
                </div>

                <form action={submitContactForm}>
                  <div className={styles.formGrid}>
                    <div>
                      <label className={styles.premiumLabel}>{t.nameLabel}</label>
                      <input type="text" name="name" required className={styles.premiumInput} placeholder={t.formNamePl} />
                    </div>
                    <div>
                      <label className={styles.premiumLabel}>{t.emailLabel}</label>
                      <input type="email" name="email" required className={styles.premiumInput} placeholder={t.formEmailPl} />
                    </div>
                  </div>
                  <div style={{ marginBottom: "2.5rem" }}>
                    <label className={styles.premiumLabel}>{t.messageLabel}</label>
                    <textarea 
                      name="message" 
                      required 
                      className={styles.premiumInput} 
                      style={{ height: "140px", resize: "none" }}
                      placeholder={t.formMsgPl}
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

        <footer className={styles.ultraFooter}>
          <div className="container">
            <div className={styles.footerMain}>
              <div className={styles.footerBrand}>
                <h3 className={styles.footerBrandName}>Tuzla <span>Supply</span></h3>
                <p className={styles.footerBrandDesc}>
                  {t.footerDesc}
                </p>
                <div className={styles.footerSocials}>
                  <a href="#">LN</a>
                  <a href="#">TW</a>
                  <a href="#">IG</a>
                  <a href="#">BE</a>
                </div>
              </div>

              <div className={styles.footerNavGroup}>
                <div className={styles.footerNavCol}>
                  <h5>Platform</h5>
                  <Link href="/catalog">{lang === "tr" ? "Katalog" : "Catalog"}</Link>
                  <Link href="/rfq">{lang === "tr" ? "Hızlı Teklif" : "Quick Quote"}</Link>
                  <Link href="/services">{lang === "tr" ? "Çözümler" : "Solutions"}</Link>
                </div>
                <div className={styles.footerNavCol}>
                  <h5>{lang === "tr" ? "Şirket" : "Company"}</h5>
                  <Link href="#about">{lang === "tr" ? "Biz kimiz?" : "Who are we?"}</Link>
                  <Link href="/contact">{lang === "tr" ? "İletişim" : "Contact"}</Link>
                  <Link href="/careers">{lang === "tr" ? "Kariyer" : "Careers"}</Link>
                </div>
              </div>

              <div className={styles.footerAction}>
                <h5>{t.footerRegion}</h5>
                <div className={styles.locationTag}>
                  <Globe size={14} /> Global / İstanbul, TR
                </div>
                <div className={styles.newsletterMinimal}>
                  <input type="email" placeholder={t.footerNewsletter} />
                  <button><Send size={18} /></button>
                </div>
              </div>
            </div>

            <div className={styles.footerLegal}>
              <div className={styles.legalLeft}>
                <span>&copy; {new Date().getFullYear()} Tuzla Supply Platform.</span>
                <Link href="/privacy">{lang === "tr" ? "Gizlilik" : "Privacy"}</Link>
                <Link href="/terms">{lang === "tr" ? "Şartlar" : "Terms"}</Link>
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
