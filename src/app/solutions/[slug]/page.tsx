import styles from "@/app/page.module.css";
import HomeNavbar from "@/components/HomeNavbar";
import { Zap, ShieldCheck, Clock, Settings, Cpu, Wrench, Droplets, LifeBuoy, Truck, Layers, Wind, Flame, Warehouse, Package, Anchor } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

const solutionData: any = {
  "ship-electrical": {
    color: "#1e3a8a",
    icon: <Cpu size={40} />,
    title: "Tuzla Marine Electrical & Automation",
    titleTr: "Tuzla Gemi Elektriği & Otomasyon",
    desc: "Comprehensive solutions for marine power systems, control units, and advanced automation troubleshooting in Tuzla and Yalova shipyards.",
    descTr: "Tuzla ve Yalova tersaneler bölgesinde gemi güç sistemleri, kontrol üniteleri ve ileri otomasyon arıza giderme konularında kapsamlı çözümler.",
    features: [
      "Generator & MSB Control Systems", 
      "Navigation & Communication Electronics", 
      "Engine Control Units (ECU) Diagnostic", 
      "Alarm Monitoring Systems (AMS)",
      "UPS, Battery & Charging Infrastructure",
      "Frequency Converter & Soft Starters",
      "Boiler & Purifier Automation Systems",
      "Pneumatic & Hydraulic Control Boards"
    ],
    featuresTr: [
      "Jeneratör ve MSB Kontrol Sistemleri", 
      "Navigasyon ve Haberleşme Elektroniği", 
      "Motor Kontrol Üniteleri (ECU) Diyagnostik", 
      "Alarm İzleme Sistemleri (AMS)",
      "UPS, Batarya ve Şarj Altyapısı",
      "Frekans Konvertörleri ve Soft Starterlar",
      "Kazan ve Purifier Otomasyon Sistemleri",
      "Pnömatik ve Hidrolik Kontrol Panoları"
    ],
    brands: ["ABB", "Schneider", "Siemens", "Danfoss", "Omron", "Kongsbeg", "Noris", "Terasaki"],
    models: ["Power Cabinets", "VFD Units", "PLC Modules", "HMI Panels"]
  },
  "ship-mechanical": {
    color: "#334155",
    icon: <Wrench size={40} />,
    title: "Marine Mechanical Engineering & Repair",
    titleTr: "Gemi Mekanik Mühendislik & Onarım",
    desc: "Heavy mechanical repair, main engine overhaul, and precision component sourcing for international vessel fleets.",
    descTr: "Uluslararası gemi filoları için ağır mekanik onarım, ana makine overhaul ve hassas bileşen tedariği.",
    features: [
      "Main Engine (2-Stroke & 4-Stroke) Overhaul", 
      "Auxiliary Engine Maintenance & Repair", 
      "Centrifugal & Screw Pump Reconditioning", 
      "Heat Exchanger & Cooler Cleaning",
      "Shaft, Propeller & Rudder System Services",
      "Turbocharger Overhaul & Dynamic Balancing",
      "Hydraulic Cylinder & System Repair",
      "Fuel Injection Pump & Valve Timing"
    ],
    featuresTr: [
      "Ana Makine (2-Zamanlı & 4-Zamanlı) Overhaul", 
      "Yardımcı Makine Bakım ve Onarımı", 
      "Santrifüj ve Vidalı Pompa Yenileme", 
      "Isı Eşanjörü ve Soğutucu Temizliği",
      "Şaft, Pervane ve Dümen Sistem Servisleri",
      "Turboşarj Overhaul ve Dinamik Balans",
      "Hidrolik Silindir ve Sistem Onarımı",
      "Yakıt Enjeksiyon Pompası ve Valf Zamanlaması"
    ],
    brands: ["MAN B&W", "Wärtsilä", "Yanmar", "Daihatsu", "Mitsubishi", "Caterpillar", "Alfa Laval"],
    models: ["S50MC", "L23/30", "RT-flex", "Z280", "V32", "DK-20"]
  },
  "ship-painting": {
    color: "#0369a1",
    icon: <Droplets size={40} />,
    title: "Marine Surface Protection & Coating",
    titleTr: "Gemi Yüzey Koruma & Boya Kaplama",
    desc: "Specialized coating solutions, blasting techniques, and anti-corrosion management for dry-docking projects.",
    descTr: "Havuzlama projeleri için uzman kaplama çözümleri, raspa teknikleri ve korozyon önleme yönetimi.",
    features: [
      "Antifouling & Foul Release Coatings", 
      "Ballast Water Tank Specialist Coating", 
      "Hydro-Blasting & Abrasive Sandblasting", 
      "Epoxy & Polyurethane Surface Finishing",
      "Cargo Hold Protection Systems",
      "Hull Integrity Inspections",
      "Anode Replacement & ICCP Services",
      "Marine Paint Logistics & Sourcing"
    ],
    featuresTr: [
      "Antifouling ve Foul Release Kaplamalar", 
      "Balast Tankı Özel Kaplama Çözümleri", 
      "Hydro-Blasting ve Aşındırıcı Raspalama", 
      "Epoksi ve Poliüretan Yüzey İşlemleri",
      "Ambar Koruma Sistemleri",
      "Karina Bütünlük İncelemeleri",
      "Tutya Değişimi ve ICCP Servisleri",
      "Gemi Boyası Lojistiği ve Tedariği"
    ],
    brands: ["Jotun", "Hempel", "International Paint", "Chugoku", "PPG", "Sigma Coatings"],
    models: ["SeaForce", "Hempaguard", "Intershield", "Hardtop", "Ecomax"]
  },
  "ship-safety": {
    color: "#7f1d1d",
    icon: <LifeBuoy size={40} />,
    title: "FFA / LSA Safety Systems & Compliance",
    titleTr: "FFA / LSA Güvenlik Sistemleri & Uyumluluk",
    desc: "Complete SOLAS / MARPOL compliant safety equipment supply and technical inspection support.",
    descTr: "Eksiksiz SOLAS / MARPOL uyumlu güvenlik ekipmanları tedariği ve teknik inceleme desteği.",
    features: [
      "Fixed CO2 & Foam Firefighting Systems", 
      "Life Raft & Lifeboat Technical Supply", 
      "Portable Fire Extinguisher Refilling", 
      "SCBA & EEBD Respiratory Equipment",
      "Gas Detection & Calibration Services",
      "Immersion Suits & Thermal Protection",
      "Pyrotechnics & Distress Signaling",
      "IMO Symbols & Safety Signage"
    ],
    featuresTr: [
      "Sabit CO2 ve Köpüklü Yangın Sistemleri", 
      "Can Salı ve Filika Teknik Tedariği", 
      "Taşınabilir Yangın Tüpü Dolumu", 
      "SCBA ve EEBD Solunum Ekipmanları",
      "Gaz Algılama ve Kalibrasyon Servisleri",
      "Immersion Suit ve Termal Koruma",
      "Piroteknik ve Tehlike İşaretleri",
      "IMO Sembolleri ve Güvenlik Levhaları"
    ],
    brands: ["Lalizas", "Viking", "Survitec", "Dräger", "MSA", "Honeywell", "Scott Safety"],
    models: ["SOLAS Pack", "ISO Certified", "MED Approved", "A-Class", "B-Class"]
  },
  "shipyard-logistics": {
    color: "#065f46",
    icon: <Truck size={40} />,
    title: "Marine Logistics & Customs Warehouse",
    titleTr: "Gemi Lojistiği & Gümrüklü Depolama",
    desc: "End-to-end supply chain management from global manufacturers to your vessel deck in Tuzla.",
    descTr: "Global üreticilerden Tuzla'daki gemi güvertenize kadar uçtan uca tedarik zinciri yönetimi.",
    features: [
      "Bonded Warehouse Management", 
      "Last Mile Port & Shipyard Delivery", 
      "Heavy Lift & Crane Logistics", 
      "Technical Part Inventory Tracking",
      "Customs Clearance Assistance",
      "24/7 Emergency Part Dispatch",
      "Cross-Border Transit Sourcing",
      "Warehousing & Spare Parts Storage"
    ],
    featuresTr: [
      "Gümrüklü Antrepo Yönetimi", 
      "Liman ve Tersane Son Kilometre Teslimatı", 
      "Ağır Yük ve Vinç Lojistiği", 
      "Teknik Parça Envanter Takibi",
      "Gümrük Müşavirliği Desteği",
      "7/24 Acil Parça Gönderimi",
      "Sınır Ötesi Transit Tedarik",
      "Depolama ve Yedek Parça Muhafazası"
    ],
    brands: ["Global Freight", "Customs Bonded", "Door-to-Deck", "AEO Status"],
    models: ["24/7 Dispatch", "Air/Sea Freight", "Local Trucking"]
  },
  "technical-supply": {
    color: "#1e293b",
    icon: <Settings size={40} />,
    title: "Maritime Technical & Deck Supply",
    titleTr: "Denizcilik Teknik & Güverte İkmali",
    desc: "Standardized marine stores according to IMPA and ISSA catalogs for every vessel type.",
    descTr: "Her gemi tipi için IMPA ve ISSA kataloglarına uygun standartlaştırılmış gemi ikmali.",
    features: [
      "General Deck & Cabin Stores", 
      "Marine Engine Consumables", 
      "Pneumatic & Electrical Power Tools", 
      "Mooring Ropes & Steel Wires",
      "Welding Equipment & Gases",
      "Measurement & Precision Instruments",
      "Navigational Charts & Publications",
      "Industrial Cleaning Chemicals"
    ],
    featuresTr: [
      "Genel Güverte ve Kamarot Malzemeleri", 
      "Gemi Makine Sarf Malzemeleri", 
      "Pnömatik ve Elektrikli El Aletleri", 
      "Bağlama Halatları ve Çelik Teller",
      "Kaynak Ekipmanları ve Gazlar",
      "Ölçüm ve Hassas Aletler",
      "Navigasyon Haritaları ve Yayınları",
      "Endüstriyel Temizlik Kimyasalları"
    ],
    brands: ["IMPA", "ISSA", "Unitor", "Drew Marine", "Bosch", "Makita", "3M"],
    models: ["Deck Stores", "Engine Stores", "Cabin Stores", "Technical Spares"]
  },
  "marine-provisions": {
    color: "#0f172a",
    icon: <Package size={40} />,
    title: "Global Marine Provisions & Food Supply",
    titleTr: "Global Gemi Kumanyası & Gıda İkmali",
    desc: "HACCP certified food supply chain ensuring fresh and nutritious provisions for multi-national crews.",
    descTr: "Çok uluslu mürettebat için taze ve besleyici gıda ikmali sağlayan HACCP sertifikalı tedarik zinciri.",
    features: [
      "Fresh Fruit & Vegetable Selection", 
      "Frozen Meat & Seafood Logistics", 
      "Dairy Products & Dry Provisions", 
      "International Ethnic Cuisines",
      "Beverages & Bonded Stores",
      "Hygiene & Galley Cleaning Supplies",
      "Health-Conscious Dietary Options",
      "Last-Minute Emergency Sourcing"
    ],
    featuresTr: [
      "Taze Meyve ve Sebze Seçimi", 
      "Dondurulmuş Et ve Deniz Ürünleri", 
      "Süt Ürünleri ve Kuru Gıda", 
      "Uluslararası Etnik Mutfak Ürünleri",
      "İçecekler ve Gümrüklü Malzemeler",
      "Hijyen ve Mutfak Temizlik Ürünleri",
      "Sağlıklı Diyet Seçenekleri",
      "Son Dakika Acil Tedarik"
    ],
    brands: ["HACCP", "ISO 22000", "Fresh Direct", "Global Logistics"],
    models: ["Dry", "Frozen", "Fresh", "Bonded"]
  },
  "spare-parts": {
    color: "#075985",
    icon: <Anchor size={40} />,
    title: "Genuine Marine Engine Spare Parts",
    titleTr: "Orijinal Gemi Makine Yedek Parçaları",
    desc: "Critical spare part logistics specializing in European and Asian marine engine manufacturers.",
    descTr: "Avrupalı ve Asyalı gemi makine üreticileri konusunda uzmanlaşmış kritik yedek parça lojistiği.",
    features: [
      "MAN B&W & Wärtsilä Components", 
      "Purifier & Separator Spare Parts", 
      "Fuel Pump & Injector Assemblies", 
      "Cylinder Liners & Piston Crowns",
      "Turbocharger Cartridges & Bearings",
      "Air Compressor Replacement Parts",
      "Reconditioned Major Components",
      "OEM & Genuine Certification Support"
    ],
    featuresTr: [
      "MAN B&W ve Wärtsilä Bileşenleri", 
      "Purifier ve Separatör Yedek Parçaları", 
      "Yakıt Pompası ve Enjektör Grupları", 
      "Silindir Gömlekleri ve Piston Kafaları",
      "Turboşarj Kartuşları ve Rulmanları",
      "Hava Kompresörü Yedek Parçaları",
      "Yenilenmiş (Recon) Ana Bileşenler",
      "OEM ve Orijinal Sertifika Desteği"
    ],
    brands: ["MAN B&W", "Wärtsilä", "Yanmar", "Daihatsu", "Mitsubishi", "Alfa Laval", "Westfalia", "Cummins"],
    models: ["L23/30", "L28/32", "S50MC", "S60MC", "RT-Flex", "EY22", "DK-20", "6N18"]
  }
};

export default async function SolutionPage({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ lang?: string }> }) {
  const { slug } = await params;
  const { lang = "tr" } = await searchParams;
  const isTr = lang === "tr";
  const data = solutionData[slug];

  if (!data) return <div style={{ padding: "10rem", textAlign: "center" }}>Solution Not Found</div>;

  return (
    <main className={styles.main}>
      <Suspense fallback={null}>
        <HomeNavbar />
      </Suspense>
      
      <div className={styles.serviceDetailHero} style={{ background: `linear-gradient(135deg, #0f172a 0%, ${data.color} 100%)` }}>
        <div className="container">
          <h1 style={{ color: "white", fontSize: "3.5rem" }}>{isTr ? data.titleTr : data.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", maxWidth: "800px", marginTop: "1.5rem" }}>
            {isTr ? data.descTr : data.desc}
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "4rem 0" }}>
        <div className={styles.serviceDetailGrid} style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "4rem" }}>
          <div className={styles.serviceMainCard}>
            <div style={{ color: "#38bdf8", marginBottom: "2rem" }}>{data.icon}</div>
            <h2 style={{ marginBottom: "2rem" }}>{isTr ? "Uzmanlık Alanlarımız" : "Our Expertise Areas"}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              {(isTr ? data.featuresTr : data.features).map((f: string, i: number) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.2rem", background: "#f8fafc", borderRadius: "1rem", border: "1px solid #e2e8f0" }}>
                  <ShieldCheck color="#38bdf8" size={20} />
                  <span style={{ fontWeight: 600, color: "#0f172a", fontSize: "0.95rem" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.serviceSidebar}>
            <div className={styles.sidebarWidget} style={{ background: "#0f172a" }}>
              <h4>{isTr ? "Hızlı Destek Hattı" : "Fast Support Line"}</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>{isTr ? "Tuzla ve Yalova bölgesindeki operasyonlarınız için profesyonel teknik destek." : "Professional technical support for your operations in Tuzla and Yalova regions."}</p>
              <Link href="/rfq" className="btn-primary" style={{ width: "100%", display: "block", textAlign: "center", marginTop: "1.5rem" }}>
                {isTr ? "Teklif İsteyin" : "Request Quote"}
              </Link>
            </div>

            {/* Technical Scope Widget */}
            <div className={styles.sidebarWidget} style={{ marginTop: "2rem", background: "white", border: "1px solid #e2e8f0" }}>
              <h4 style={{ color: "#0f172a", borderBottom: "2px solid #38bdf8", paddingBottom: "1rem" }}>{isTr ? "Teknik Kapsam" : "Technical Scope"}</h4>
              <div style={{ marginTop: "1.5rem" }}>
                <p style={{ fontWeight: 800, fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", marginBottom: "1rem" }}>{isTr ? "DESTEKLENEN MARKALAR" : "SUPPORTED BRANDS"}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {data.brands?.map((b: string) => (
                    <span key={b} style={{ padding: "0.4rem 0.8rem", background: "#f1f5f9", borderRadius: "0.5rem", fontSize: "0.75rem", fontWeight: 700, color: "#1e293b" }}>{b}</span>
                  ))}
                </div>
                
                <p style={{ fontWeight: 800, fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", marginTop: "2rem", marginBottom: "1rem" }}>{isTr ? "POPÜLER MODELLER" : "POPULAR MODELS"}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {data.models?.map((m: string) => (
                    <span key={m} style={{ padding: "0.4rem 0.8rem", border: "1px solid #e2e8f0", borderRadius: "0.5rem", fontSize: "0.75rem", fontWeight: 600, color: "#64748b" }}>{m}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Downloads Widget */}
            <div className={styles.sidebarWidget} style={{ marginTop: "2rem", background: "#f8fafc", border: "1px dashed #cbd5e1" }}>
              <h4 style={{ color: "#0f172a", marginBottom: "1rem" }}>{isTr ? "Dokümanlar" : "Downloads"}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <Link href="#" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#334155", textDecoration: "none" }}>
                  <Layers size={16} /> {isTr ? "Şirket Profili (PDF)" : "Company Profile (PDF)"}
                </Link>
                <Link href="#" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#334155", textDecoration: "none" }}>
                  <Layers size={16} /> {isTr ? "Teknik Kapsam (PDF)" : "Technical Scope (PDF)"}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Operations Gallery */}
        <div style={{ marginTop: "8rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
            <div>
              <p style={{ color: "#38bdf8", fontWeight: 800, fontSize: "0.8rem", letterSpacing: "2px", marginBottom: "0.5rem" }}>{isTr ? "SAHADAN KARELER" : "FROM THE FIELD"}</p>
              <h2 style={{ fontSize: "2.2rem" }}>{isTr ? "Son Operasyonlar" : "Recent Operations"}</h2>
            </div>
            <Link href="/company/insights" style={{ color: "#38bdf8", fontWeight: 700, textDecoration: "none" }}>{isTr ? "Tümünü Gör" : "View All"}</Link>
          </div>
          <div className={styles.insightGrid} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {[
              { img: "https://images.unsplash.com/photo-1590579491624-f98f36d4c763?q=80&w=800", title: isTr ? "Ana Makine Parça Teslimatı" : "Main Engine Part Delivery" },
              { img: "https://images.unsplash.com/photo-1540946484063-a40da2134fe0?q=80&w=800", title: isTr ? "Gemi Güverte İkmali" : "Vessel Deck Supply" },
              { img: "https://images.unsplash.com/photo-1454165833222-38d722578571?q=80&w=800", title: isTr ? "Teknik Servis Operasyonu" : "Technical Service Operation" }
            ].map((op, i) => (
              <div key={i} style={{ borderRadius: "1.5rem", overflow: "hidden", background: "#f1f5f9", aspectRatio: "16/10", position: "relative", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}>
                <img src={op.img} alt={op.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem", background: "rgba(15, 23, 42, 0.85)", backdropFilter: "blur(8px)", padding: "1.2rem", borderRadius: "1.2rem", color: "white" }}>
                  <p style={{ fontSize: "0.7rem", fontWeight: 800, color: "#38bdf8", marginBottom: "0.3rem", textTransform: "uppercase" }}>TUZLA / ISTANBUL</p>
                  <p style={{ fontSize: "0.95rem", fontWeight: 700 }}>{op.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality & Class Logos */}
        <div style={{ marginTop: "6rem", paddingTop: "4rem", borderTop: "1px solid #e2e8f0" }}>
          <p style={{ textAlign: "center", fontWeight: 800, fontSize: "0.85rem", color: "#94a3b8", letterSpacing: "2px", marginBottom: "3rem" }}>
            {isTr ? "ULUSLARARASI KALİTE VE KLAS STANDARTLARI" : "INTERNATIONAL QUALITY & CLASS STANDARDS"}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "4rem", opacity: 0.5, filter: "grayscale(1)" }}>
            {["ISO 9001", "ISO 14001", "IMPA", "ISSA", "DNV", "ABS", "Lloyd's Register", "Bureau Veritas"].map(logo => (
              <div key={logo} style={{ fontSize: "1.2rem", fontWeight: 900, color: "#475569" }}>{logo}</div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "6rem" }}>
          <h2 style={{ textAlign: "center", marginBottom: "4rem" }}>{isTr ? "Neden Tuzla Supply?" : "Why Choose Tuzla Supply?"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "3rem" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", background: "#f0f9ff", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                <Clock color="#38bdf8" size={32} />
              </div>
              <h4 style={{ marginBottom: "1rem" }}>{isTr ? "7/24 Teknik Servis" : "24/7 Technical Service"}</h4>
              <p style={{ fontSize: "0.9rem", color: "#64748b" }}>{isTr ? "Acil ihtiyaçlarınız için günün her saati müdahale ekibimiz hazırdır." : "Our intervention team is ready at any time of the day for your emergency needs."}</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", background: "#f0f9ff", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                <ShieldCheck color="#38bdf8" size={32} />
              </div>
              <h4 style={{ marginBottom: "1rem" }}>{isTr ? "Sertifikalı Çözümler" : "Certified Solutions"}</h4>
              <p style={{ fontSize: "0.9rem", color: "#64748b" }}>{isTr ? "Tüm parça ve hizmetlerimiz uluslararası klas kuruluşu standartlarındadır." : "All our parts and services are in international class society standards."}</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", background: "#f0f9ff", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                <Truck color="#38bdf8" size={32} />
              </div>
              <h4 style={{ marginBottom: "1rem" }}>{isTr ? "Hızlı Lojistik" : "Fast Logistics"}</h4>
              <p style={{ fontSize: "0.9rem", color: "#64748b" }}>{isTr ? "Tersane ve liman bölgelerine doğrudan, gümrüklü teslimat ağı." : "Direct, bonded delivery network to shipyard and port areas."}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
