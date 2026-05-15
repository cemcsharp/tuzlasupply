
import HomeNavbar from "@/components/HomeNavbar";
import Footer from "@/components/Footer";
import { 
  Clock, User, ChevronRight, Share2, 
  BookOpen, Anchor, ShieldCheck, Activity
} from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from 'next';

const blogPosts: Record<string, any> = {
  "understanding-impa-codes": {
    title: "Understanding IMPA & ISSA Codes",
    date: "May 10, 2026",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070",
    content: "IMPA codes are the universal language of ship supply. Using the Marine Stores Guide correctly reduces ordering errors by 40%..."
  },
  "engine-overhaul-optimization": {
    title: "Engine Overhaul Optimization",
    date: "May 12, 2026",
    category: "Engineering",
    image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=2070",
    content: "When it comes to engine maintenance, the choice between Genuine, OEM, and Replacement parts is critical for long-term reliability..."
  }
  // ... more posts can be mapped here
};

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.[0];
  const post = slug ? blogPosts[slug] : null;

  return {
    title: post ? `${post.title} | Tuzla Supply Insights` : "Maritime Insights & Technical Guides",
    description: post ? post.content.substring(0, 160) : "Expert analysis on ship supply, technical standards, and maritime logistics."
  }
}

export default async function InsightPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ slug?: string[] }>,
  searchParams: Promise<{ lang?: string }> 
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.[0];
  const { lang = "tr" } = await searchParams;

  // If no slug, show the list
  if (!slug) {
    return (
      <main style={{ background: '#f8fafc', minHeight: '100vh' }}>
        <HomeNavbar />
        <section style={{ padding: '160px 0 80px', background: '#0f172a', color: '#fff' }}>
          <div className="container">
            <h1 style={{ fontSize: '3.5rem', fontWeight: 950, marginBottom: '1.5rem' }}>Maritime <span style={{ color: '#38bdf8' }}>Insights</span></h1>
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)' }}>Technical knowledge base for the modern fleet manager.</p>
          </div>
        </section>
        
        <section style={{ padding: '80px 0' }}>
           <div className="container">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                 {Object.entries(blogPosts).map(([key, post]) => (
                   <Link key={key} href={`/company/insights/${key}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', transition: '0.3s' }}>
                         <img src={post.image} style={{ width: '100%', height: '240px', objectFit: 'cover' }} alt={post.title} />
                         <div style={{ padding: '2.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#38bdf8', fontWeight: 800, marginBottom: '1rem', textTransform: 'uppercase' }}>
                               <span>{post.category}</span>
                               <span style={{ color: '#cbd5e1' }}>|</span>
                               <span style={{ color: '#64748b' }}>{post.date}</span>
                            </div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 950, color: '#0f172a', marginBottom: '1rem' }}>{post.title}</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 900, color: '#0f172a', fontSize: '0.85rem' }}>
                               READ ARTICLE <ChevronRight size={16} color="#38bdf8" />
                            </div>
                         </div>
                      </div>
                   </Link>
                 ))}
              </div>
           </div>
        </section>
        <Footer lang={lang} />
      </main>
    );
  }

  const post = blogPosts[slug];
  if (!post) return notFound();

  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <HomeNavbar />
      <article style={{ padding: '160px 0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ marginBottom: '3rem' }}>
             <span style={{ color: '#38bdf8', fontWeight: 950, fontSize: '0.9rem', letterSpacing: '0.1em' }}>{post.category}</span>
             <h1 style={{ fontSize: '3.5rem', fontWeight: 950, color: '#0f172a', marginTop: '1rem', lineHeight: 1.1 }}>{post.title}</h1>
             <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem', color: '#64748b', fontWeight: 600 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={18}/> {post.date}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={18}/> Editorial Team</span>
             </div>
          </div>
          <img src={post.image} style={{ width: '100%', borderRadius: '12px', marginBottom: '4rem' }} alt={post.title} />
          <div style={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#334155' }}>
             {post.content}
             {/* Content can be expanded with more realistic text */}
          </div>
        </div>
      </article>
      <Footer lang={lang} />
    </main>
  );
}
