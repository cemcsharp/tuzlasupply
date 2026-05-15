
import HomeNavbar from "@/components/HomeNavbar";
import Footer from "@/components/Footer";
import { 
  MapPin, Anchor, Phone, Mail, Clock, Ship, 
  Truck, CheckCircle2, ChevronRight, ArrowRight, ShieldCheck,
  AlertCircle, Activity
} from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const port = resolvedParams.slug?.[0] || "tuzla";
  const portName = port.charAt(0).toUpperCase() + port.slice(1);

  return {
    title: `Ship Supply & Chandler Services in ${portName} Port | Tuzla Supply`,
    description: `Professional 24/7 ship supply, provisions, and technical stores delivery in ${portName} Port and shipyards. Trusted maritime logistics since 1994.`
  }
}

export default async function PortServicePage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ slug?: string[] }>,
  searchParams: Promise<{ lang?: string }> 
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.[0] || "tuzla";
  const { lang = "tr" } = await searchParams;

  const portData: Record<string, any> = {
    "tuzla": {
      name: "Tuzla Shipyard Region",
      desc: lang === "tr" ? "Tuzla tersaneler bölgesindeki tüm havuz ve rıhtımlara 15 dakikada ikmal." : "Supply to all docks and berths in Tuzla shipyard region within 15 minutes.",
      image: "https://images.unsplash.com/photo-1559139225-3327c8a66bc9?q=80&w=2070",
      stats: { trucks: "08 Units", response: "15 Min", coverage: "All Shipyards" }
    },
    "yalova": {
      name: "Yalova Shipyards (Altinova)",
      desc: lang === "tr" ? "Yalova bölgesindeki tüm yeni inşa ve tamir tersanelerine 7/24 kesintisiz hizmet." : "24/7 continuous service to all new building and repair yards in Yalova region.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070",
      stats: { trucks: "05 Units", response: "30 Min", coverage: "Altinova Region" }
    },
    "istanbul": {
      name: "Istanbul Anchorage & Piers",
      desc: lang === "tr" ? "İstanbul boğazı demirleme sahaları ve tüm şehir rıhtımlarına denizden ve karadan ikmal." : "Supply by sea and land to Istanbul Strait anchorage areas and all city piers.",
      image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2070",
      stats: { trucks: "06 Units", response: "1 Hour", coverage: "Strait & Anchorage" }
    }
  };

  const current = portData[slug];
  if (!current) return notFound();

  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <HomeNavbar />
      
      <section style={{ 
        padding: '160px 0 80px', 
        background: '#0f172a', 
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.7)), url('${current.image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff'
      }}>
        <div className="container">
           <div style={{ maxWidth: '800px' }}>
              <h1 style={{ fontSize: '4rem', fontWeight: 950, marginBottom: '2rem', letterSpacing: '-0.04em' }}>{current.name} <br/><span style={{ color: '#38bdf8' }}>Ship Supply</span></h1>
              <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{current.desc}</p>
           </div>
        </div>
      </section>

      <section style={{ padding: '100px 0' }}>
         <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'center' }}>
               <div>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 950, color: '#0f172a', marginBottom: '2rem' }}>Operational Dominance in {current.name}</h2>
                  <div style={{ display: 'grid', gap: '1.5rem' }}>
                     {[
                       { t: "Provision Supply", d: "Daily fresh vegetables, fruits, meats and frozen goods delivered directly." },
                       { t: "Technical Stores", d: "Full range of deck and engine stores based on IMPA/ISSA requirements." },
                       { t: "Spare Parts Handling", d: "Expert handling, customs clearance and last-mile delivery." }
                     ].map((item, i) => (
                       <div key={i} style={{ display: 'flex', gap: '1.5rem' }}>
                          <CheckCircle2 size={24} color="#38bdf8" />
                          <div>
                             <div style={{ fontWeight: 950, color: '#0f172a' }}>{item.t}</div>
                             <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{item.d}</div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
               <div style={{ background: '#f8fafc', padding: '3rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontWeight: 950, fontSize: '1.2rem', marginBottom: '2rem' }}>Regional Port Information</h4>
                  <div style={{ display: 'grid', gap: '1.5rem', fontSize: '0.9rem' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Operations Mode:</span>
                        <span style={{ fontWeight: 800, color: '#22c55e' }}>24/7 ACTIVE</span>
                     </div>
                     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Anchorage Delivery:</span>
                        <span style={{ fontWeight: 800 }}>YES</span>
                     </div>
                  </div>
                  <Link href="/company/contact" style={{ display: 'block', textAlign: 'center', background: '#0f172a', color: '#fff', padding: '1.2rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 950, fontSize: '0.85rem', marginTop: '3rem' }}>
                     GET LOCAL QUOTATION
                  </Link>
               </div>
            </div>
         </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
