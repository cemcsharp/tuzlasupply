import HomeNavbar from "@/components/HomeNavbar";
import styles from "@/app/page.module.css";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className={styles.main}>
      <HomeNavbar />
      
      <div className="container" style={{ padding: "8rem 0 5rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--color-primary)", marginBottom: "2rem" }}>
            Gizlilik Politikası
          </h1>
          
          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>1. Veri Sorumlusu</h2>
            <p style={{ color: "var(--color-text-muted)", lineHeight: "1.8" }}>
              Tuzla Supply olarak, kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz. 
              Bu bilinçle, şirketimiz ile ilişkili tüm şahıslara ait her türlü kişisel verilerin 6698 sayılı 
              Kişisel Verilerin Korunması Kanunu (“KVKK”)’na uygun olarak işlenerek, muhafaza edilmesine büyük önem vermekteyiz.
            </p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>2. Verilerin Toplanması ve İşlenmesi</h2>
            <p style={{ color: "var(--color-text-muted)", lineHeight: "1.8" }}>
              Kişisel verileriniz, şirketimiz tarafından verilen hizmetlerin sağlanması, ticari faaliyetlerin 
              sürdürülmesi ve yasal yükümlülüklerin yerine getirilmesi amacıyla toplanmaktadır. Bu veriler; 
              teklif talepleri (RFQ), iletişim formları ve üyelik süreçleri üzerinden elde edilebilir.
            </p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>3. Veri Güvenliği</h2>
            <p style={{ color: "var(--color-text-muted)", lineHeight: "1.8" }}>
              Toplanan verileriniz, yetkisiz erişim, kayıp veya ifşa risklerine karşı modern teknik altyapımız 
              ve şifreleme yöntemlerimiz ile korunmaktadır. Veritabanlarımız global güvenlik standartlarına uygundur.
            </p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>4. Haklarınız</h2>
            <p style={{ color: "var(--color-text-muted)", lineHeight: "1.8" }}>
              KVKK uyarınca, verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme ve 
              hatalı verilerin düzeltilmesini isteme haklarına sahipsiniz. Talepleriniz için info@tuzlasupply.com 
              adresi üzerinden bizimle iletişime geçebilirsiniz.
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
