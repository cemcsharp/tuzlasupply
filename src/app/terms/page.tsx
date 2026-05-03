export const dynamic = "force-dynamic";
import HomeNavbar from "@/components/HomeNavbar";
import styles from "@/app/page.module.css";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className={styles.main}>
      <HomeNavbar />
      
      <div className="container" style={{ padding: "8rem 0 5rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--color-primary)", marginBottom: "2rem" }}>
            Kullanım Şartları
          </h1>
          
          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>1. Kabul Edilme</h2>
            <p style={{ color: "var(--color-text-muted)", lineHeight: "1.8" }}>
              Tuzla Supply web sitesine giriş yaparak ve hizmetlerimizi kullanarak, bu kullanım şartlarını 
              ve gizlilik politikamızı kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız, lütfen siteyi kullanmayınız.
            </p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>2. Hizmet Kapsamı</h2>
            <p style={{ color: "var(--color-text-muted)", lineHeight: "1.8" }}>
              Platformumuz, kurumsal tedarik ve endüstriyel ikmal süreçlerini yönetmek, fiyat teklifi toplamak 
              ve sipariş takibi yapmak amacıyla tasarlanmıştır. Verilen bilgiler ticari mahiyet taşır.
            </p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>3. Kullanıcı Sorumlulukları</h2>
            <p style={{ color: "var(--color-text-muted)", lineHeight: "1.8" }}>
              Kullanıcılar, sisteme giriş yaptıkları bilgilerin doğruluğundan sorumludur. Teklif taleplerinde (RFQ) 
              yanıltıcı bilgi verilmesi veya sistemin kötüye kullanılması durumunda erişim kısıtlanabilir.
            </p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>4. Fikri Mülkiyet</h2>
            <p style={{ color: "var(--color-text-muted)", lineHeight: "1.8" }}>
              Sitede yer alan tüm logo, tasarım, metin ve görseller Tuzla Supply mülkiyetindedir. 
              Yazılı izin alınmadan kopyalanması, çoğaltılması veya ticari amaçla kullanılması yasaktır.
            </p>
          </section>

          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #eee" }}>
            <Link href="/" className="btn-primary" style={{ display: "inline-block" }}>
              Anasayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
