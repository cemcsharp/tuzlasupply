"use client";

import styles from "./admin.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Gelen Talepler (RFQ)", href: "/admin/rfqs" },
    { name: "Gelen Mesajlar", href: "/admin/messages" },
    { name: "Müşteriler", href: "/admin/customers" },
    { name: "Ürün Kataloğu", href: "/admin/products" },
    { name: "Referanslar & Partnerlar", href: "/admin/showcase" },
    { name: "Site İçeriği (CMS)", href: "/admin/cms" },
    { name: "Ayarlar", href: "/admin/settings" },
  ];

  return (
    <div className={styles.adminLayout}>
      
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          Tuzla <span>Supply</span>
        </div>
        
        <nav className={styles.sidebarNav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className={styles.sidebarFooter}>
          <p>Yönetici Paneli v1.0</p>
          <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Link href="/" style={{ color: "var(--color-accent)", textDecoration: "underline" }}>Siteye Dön</Link>
            <button 
              onClick={() => logout()} 
              style={{ 
                background: "none", 
                border: "none", 
                color: "#ff4d4d", 
                cursor: "pointer", 
                padding: 0, 
                textAlign: "left",
                fontSize: "0.9rem",
                fontWeight: "600"
              }}
            >
              Güvenli Çıkış
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div className={styles.topbarUser}>
            <span>Yönetici</span>
            <div className={styles.avatar}>Y</div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className={styles.contentBody}>
          {children}
        </div>
      </main>

    </div>
  );
}
