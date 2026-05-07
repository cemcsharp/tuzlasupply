"use server";

import Link from "next/link";
import { Globe } from "lucide-react";
import styles from "@/app/page.module.css";
import { getSettings } from "@/app/actions/showcase";

export default async function Footer({ lang = "en" }: { lang?: string }) {
  const settings = await getSettings();
  const isTr = lang === "tr";

  return (
    <footer className={styles.ultraFooter}>
      <div className="container">
        <div className={styles.footerMain}>
          <div className={styles.footerBrand}>
            <h3 className={styles.footerBrandName}>Tuzla <span>Supply</span></h3>
            <p className={styles.footerBrandDesc}>
              {isTr 
                ? "Tuzla merkezli yeni nesil dijital ship supply ekosistemi. Denizcilik ve teknik ikmal ihtiyaçlarınızı AI teknolojisiyle optimize ediyoruz." 
                : "Next-gen digital ship supply ecosystem in Tuzla. We optimize your maritime and technical procurement with AI technology."}
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
              <h5>{isTr ? "Hizmetler" : "Solutions"}</h5>
              <Link href="/solutions/ship-electrical">{isTr ? "Gemi Elektriği" : "Ship Electrical"}</Link>
              <Link href="/solutions/ship-mechanical">{isTr ? "Gemi Mekanik" : "Ship Mechanical"}</Link>
              <Link href="/solutions/ship-painting">{isTr ? "Gemi Boya" : "Ship Painting"}</Link>
              <Link href="/solutions/ship-safety">{isTr ? "Gemi Güvenlik" : "Ship Safety"}</Link>
              <Link href="/solutions/shipyard-logistics">{isTr ? "Lojistik" : "Logistics"}</Link>
            </div>
            <div className={styles.footerNavCol}>
              <h5>{isTr ? "Hızlı Erişim" : "Quick Links"}</h5>
              <Link href="/catalog">{isTr ? "Dijital Katalog" : "Digital Catalog"}</Link>
              <Link href="/rfq">{isTr ? "Teklif İste" : "Request Quote"}</Link>
              <Link href="/admin/login">{isTr ? "Müşteri Paneli" : "Customer Portal"}</Link>
              <Link href="/company/insights">{isTr ? "Insights" : "Insights"}</Link>
            </div>
            <div className={styles.footerNavCol}>
              <h5>{isTr ? "Şirket" : "Company"}</h5>
              <Link href="/company/about">{isTr ? "Biz kimiz?" : "Who are we?"}</Link>
              <Link href="/#contact">{isTr ? "İletişim" : "Contact"}</Link>
              <Link href="/company/careers">{isTr ? "Kariyer" : "Careers"}</Link>
            </div>
          </div>

          <div className={styles.footerAction}>
            <h5>{isTr ? "Hizmet Bölgesi" : "Service Region"}</h5>
            <div className={styles.locationTag}>
              <Globe size={14} /> Global / İstanbul, TR
            </div>
            <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
              {settings.address}
            </p>
            <div className={styles.footerLegal}>
              <Link href="/legal/privacy">{isTr ? "Gizlilik" : "Privacy"}</Link>
              <Link href="/legal/terms">{isTr ? "Şartlar" : "Terms"}</Link>
            </div>
          </div>
        </div>

        <div className={styles.footerLegal}>
          <div className={styles.legalLeft}>
            <span>&copy; {new Date().getFullYear()} Tuzla Supply Platform.</span>
            <span>{settings.email} | {settings.phone}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
