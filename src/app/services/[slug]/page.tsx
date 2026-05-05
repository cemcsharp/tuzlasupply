import styles from "@/app/page.module.css";
import HomeNavbar from "@/components/HomeNavbar";
import { ChevronRight, ShieldCheck, Clock, Globe, Anchor, Settings, Package } from "lucide-react";
import Link from "next/link";

const serviceData: any = {
  "technical-supply": {
    title: "Technical Ship Supply & Engineering",
    titleTr: "Teknik Gemi İkmali ve Mühendislik",
    desc: "Comprehensive technical stores, deck and engine supplies for all vessel types.",
    descTr: "Tüm gemi tipleri için kapsamlı teknik mağaza, güverte ve makine malzemeleri.",
    content: "Tuzla Supply provides high-quality technical ship stores and equipment at the Port of Tuzla and all major Turkish ports. Our range includes everything from basic deck hardware to complex engine room components.",
    contentTr: "Tuzla Supply, Tuzla Limanı ve tüm ana Türkiye limanlarında yüksek kaliteli teknik gemi mağazaları ve ekipmanları sunar. Yelpazemiz temel güverte donanımından karmaşık makine dairesi bileşenlerine kadar her şeyi içerir.",
    features: ["Deck & Engine Stores", "Electrical Supplies", "Cabin & Galley Equipment", "Hand & Power Tools"],
    featuresTr: ["Güverte ve Makine Malzemeleri", "Elektrik Malzemeleri", "Kamarot ve Mutfak Ekipmanları", "El ve Elektrikli Aletler"]
  },
  "marine-provisions": {
    title: "Marine Provisions & Logistics",
    titleTr: "Gemi Kumanyası ve Lojistik",
    desc: "Fresh, frozen, and dry provisions with bonded store services.",
    descTr: "Taze, dondurulmuş ve kuru gıda ikmali ile gümrüklü ambar hizmetleri.",
    content: "We understand that crew welfare starts with good food. We source the freshest local produce and international brands to ensure your crew stays healthy and satisfied during long voyages.",
    contentTr: "Mürettebat refahının iyi yemekle başladığını biliyoruz. Mürettebatınızın uzun yolculuklarda sağlıklı ve memnun kalmasını sağlamak için en taze yerel ürünleri ve uluslararası markaları tedarik ediyoruz.",
    features: ["Fresh Fruit & Vegetables", "Frozen Meats & Poultry", "Dry & Canned Goods", "Bonded Stores (Tobacco & Spirits)"],
    featuresTr: ["Taze Meyve ve Sebze", "Dondurulmuş Et ve Kümes Hayvanları", "Kuru ve Konserve Gıdalar", "Gümrüklü Ürünler"]
  },
  "spare-parts": {
    title: "Genuine Marine Spare Parts",
    titleTr: "Orijinal Gemi Yedek Parçaları",
    desc: "Specialized in MAN, Wärtsilä, and Alfa Laval engine and separator parts.",
    descTr: "MAN, Wärtsilä ve Alfa Laval makine ve separatör parçalarında uzmanlaşmış tedarik.",
    content: "As a technical authority in Tuzla, we specialize in sourcing and delivering genuine spare parts for major marine brands. Our database of over 50,000 part numbers ensures accuracy and speed.",
    contentTr: "Tuzla'daki teknik otorite olarak, büyük deniz markaları için orijinal yedek parça tedariği ve teslimatı konusunda uzmanız. 50.000'den fazla parça numarasından oluşan veritabanımız doğruluk ve hız sağlar.",
    features: ["MAN B&W Engine Parts", "Wärtsilä Spare Parts", "Alfa Laval Separators", "Pump & Valve Spares"],
    featuresTr: ["MAN B&W Makine Parçaları", "Wärtsilä Yedek Parçaları", "Alfa Laval Separatörler", "Pompa ve Valf Yedekleri"]
  }
};

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceData[slug];

  if (!service) return <div>Service Not Found</div>;

  const isTr = true; // Temporary simplification for language

  return (
    <main className={styles.main}>
      <HomeNavbar />
      
      <div className={styles.serviceDetailHero}>
        <div className="container">
          <Link href="/" style={{ color: "#38bdf8", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem", textDecoration: "none" }}>
            <ChevronRight size={20} style={{ transform: "rotate(180deg)" }} />
            {isTr ? "Ana Sayfaya Dön" : "Back to Home"}
          </Link>
          <h1 style={{ color: "white", fontSize: "3.5rem", marginBottom: "1rem" }}>{isTr ? service.titleTr : service.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", maxWidth: "700px" }}>{isTr ? service.descTr : service.desc}</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.serviceGrid}>
          <div className={styles.serviceMainCard}>
            <h2>{isTr ? "Hizmet Detayları" : "Service Details"}</h2>
            <p>{isTr ? service.contentTr : service.content}</p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "3rem" }}>
              {(isTr ? service.featuresTr : service.features).map((f: string, i: number) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.5rem", background: "#f8fafc", borderRadius: "1rem" }}>
                  <ShieldCheck color="#38bdf8" />
                  <span style={{ fontWeight: 600 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.serviceSidebar}>
            <div className={styles.sidebarWidget} style={{ background: "#0f172a" }}>
              <h4>{isTr ? "Hızlı Teklif İste" : "Request Fast Quote"}</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.7, marginBottom: "1.5rem" }}>
                {isTr ? "İhtiyacınız olan parçayı veya malzemeyi bize bildirin, 1 saat içinde fiyatlandıralım." : "Let us know the part you need, we'll price it within 1 hour."}
              </p>
              <Link href="/rfq" className="btn-primary" style={{ width: "100%", display: "block", textAlign: "center" }}>
                {isTr ? "Teklif Formu" : "Quote Form"}
              </Link>
            </div>

            <div className={styles.sidebarWidget}>
              <h4>{isTr ? "Neden Tuzla Supply?" : "Why Tuzla Supply?"}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.9rem" }}>
                <li style={{ display: "flex", gap: "0.75rem" }}><Clock size={18} color="#38bdf8" /> 7/24 Kesintisiz Hizmet</li>
                <li style={{ display: "flex", gap: "0.75rem" }}><Globe size={18} color="#38bdf8" /> Global Lojistik Ağı</li>
                <li style={{ display: "flex", gap: "0.75rem" }}><Anchor size={18} color="#38bdf8" /> Tüm Türkiye Limanları</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
