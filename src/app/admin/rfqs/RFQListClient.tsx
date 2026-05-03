"use client";

import { useState, useMemo } from "react";
import styles from "../admin.module.css";
import Link from "next/link";
import { Search, Filter, Clock, CheckCircle, XCircle, FileText } from "lucide-react";

export default function RFQListClient({ initialRfqs }: { initialRfqs: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRfqs = useMemo(() => {
    return initialRfqs.filter(rfq => {
      const matchesSearch = rfq.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           rfq.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || rfq.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [initialRfqs, searchTerm, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: initialRfqs.length,
      pending: initialRfqs.filter(r => r.status === "pending").length,
      priced: initialRfqs.filter(r => r.status === "priced").length,
      completed: initialRfqs.filter(r => r.status === "approved").length
    };
  }, [initialRfqs]);

  const getBadgeStyle = (status: string) => {
    switch(status) {
      case "pending": return `${styles.badge} ${styles.badgePending}`;
      case "priced": return `${styles.badge} ${styles.badgePriced}`;
      case "approved": return `${styles.badge} ${styles.badgeApproved}`;
      case "rejected": return `${styles.badge} ${styles.badgeRejected}`;
      default: return styles.badge;
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case "pending": return "Bekliyor";
      case "priced": return "Fiyat Verildi";
      case "approved": return "Onaylandı";
      case "rejected": return "Reddedildi";
      default: return "Bilinmiyor";
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      
      {/* Stats Bar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}>
        {[
          { label: "Toplam Talep", val: stats.total, icon: <FileText size={20}/>, bg: "#F1F5F9", col: "#475569" },
          { label: "Bekleyen", val: stats.pending, icon: <Clock size={20}/>, bg: "#FEF3C7", col: "#D97706" },
          { label: "Fiyatlandırılan", val: stats.priced, icon: <CheckCircle size={20}/>, bg: "#E0F2FE", col: "#0284C7" },
          { label: "Onaylanan", val: stats.completed, icon: <CheckCircle size={20}/>, bg: "#F0FDF4", col: "#16A34A" }
        ].map((s, i) => (
          <div key={i} className={styles.statCard} style={{ padding: "1.5rem", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: "800", color: "#94A3B8", textTransform: "uppercase" }}>{s.label}</p>
                <h4 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#1E293B", marginTop: "0.25rem" }}>{s.val}</h4>
              </div>
              <div style={{ padding: "0.75rem", backgroundColor: s.bg, color: s.col, borderRadius: "12px" }}>
                {s.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem" }}>
          <div className={styles.tableTitle}>Gelen Talepler ({filteredRfqs.length})</div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
             <div style={{ position: "relative" }}>
               <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
               <input 
                type="text" 
                placeholder="Firma veya ID Ara..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  padding: "0.6rem 1rem 0.6rem 2.5rem", borderRadius: "10px", 
                  border: "1.5px solid #E2E8F0", fontSize: "0.9rem", width: "250px" 
                }} 
               />
             </div>
             
             <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ 
                padding: "0.6rem 1rem", borderRadius: "10px", 
                border: "1.5px solid #E2E8F0", fontSize: "0.9rem", backgroundColor: "white" 
              }}
             >
               <option value="all">Tüm Durumlar</option>
               <option value="pending">Bekliyor</option>
               <option value="priced">Fiyat Verildi</option>
               <option value="approved">Onaylandı</option>
               <option value="rejected">Reddedildi</option>
             </select>

             <button 
              className="btn-primary" 
              style={{ padding: "0.6rem 1.25rem", fontSize: "0.9rem", borderRadius: "10px" }}
              onClick={() => alert('Manuel RFQ oluşturma formu yakında eklenecek. Şimdilik ana sayfadaki formu kullanabilirsiniz.')}
             >
               Yeni RFQ Ekle (Manuel)
             </button>
          </div>
        </div>
        
        <div className={styles.tableWrapper}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>RFQ ID</th>
                <th>Firma / Gemi Adı</th>
                <th>Tarih</th>
                <th>Teslimat Noktası</th>
                <th>Durum</th>
                <th style={{ textAlign: "right" }}>Aksiyon</th>
              </tr>
            </thead>
            <tbody>
              {filteredRfqs.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "5rem" }}>
                    <div style={{ color: "#94A3B8", marginBottom: "1rem" }}><Search size={48} style={{ opacity: 0.2 }} /></div>
                    <h3 style={{ color: "#1E293B", marginBottom: "0.5rem" }}>Talep Bulunamadı</h3>
                    <p style={{ color: "#94A3B8", fontSize: "0.9rem" }}>Arama kriterlerinizi değiştirerek tekrar deneyebilirsiniz.</p>
                  </td>
                </tr>
              ) : (
                filteredRfqs.map((rfq) => (
                  <tr key={rfq.id}>
                    <td style={{ fontWeight: "700", color: "var(--color-primary)" }}>#{rfq.id.split('-')[0].toUpperCase()}</td>
                    <td style={{ fontWeight: "600" }}>{rfq.companyName}</td>
                    <td style={{ color: "#64748B", fontSize: "0.85rem" }}>{new Date(rfq.createdAt).toLocaleString('tr-TR')}</td>
                    <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{rfq.deliveryPoint}</td>
                    <td><span className={getBadgeStyle(rfq.status)}>{getStatusText(rfq.status)}</span></td>
                    <td style={{ textAlign: "right" }}>
                      <Link href={`/admin/rfqs/${rfq.id}`} className="btn-secondary" style={{ padding: "0.4rem 1rem", fontSize: "0.8rem", textDecoration: "none", display: "inline-block" }}>
                        Detayları Gör
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
