
"use client";

import { useState, useEffect } from "react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';
import styles from "./admin.module.css";
import { 
  FileText, Users, Clock, CheckCircle, AlertCircle, TrendingUp 
} from "lucide-react";

const COLORS = ['#00A3FF', '#10B981', '#F59E0B', '#EF4444'];

export default function DashboardCharts({ data }: { data: any }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div style={{ height: '600px', width: '100%', background: '#f8fafc', borderRadius: '24px' }} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      
      {/* 1. Stat Cards Row */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p className={styles.statTitle}>TOPLAM TALEP</p>
              <h3 className={styles.statValue}>{data.stats.totalRfqs}</h3>
            </div>
            <div style={{ padding: "0.75rem", backgroundColor: "#E0F2FE", color: "#0284C7", borderRadius: "12px" }}>
              <FileText size={24} />
            </div>
          </div>
          <p style={{ fontSize: "0.85rem", color: "#10B981", marginTop: "1rem", fontWeight: "600" }}>
            <TrendingUp size={14} style={{ marginRight: "4px", display: "inline" }} />
            Aktif Sistem
          </p>
        </div>

        <div className={styles.statCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p className={styles.statTitle}>BEKLEYEN TALEPLER</p>
              <h3 className={styles.statValue}>{data.stats.pendingRfqs}</h3>
            </div>
            <div style={{ padding: "0.75rem", backgroundColor: "#FEF3C7", color: "#D97706", borderRadius: "12px" }}>
              <Clock size={24} />
            </div>
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginTop: "1rem" }}>
            Aksiyon Bekleyen
          </p>
        </div>

        <div className={styles.statCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p className={styles.statTitle}>KAYITLI MÜŞTERİ</p>
              <h3 className={styles.statValue}>{data.stats.totalCustomers}</h3>
            </div>
            <div style={{ padding: "0.75rem", backgroundColor: "#F0FDF4", color: "#16A34A", borderRadius: "12px" }}>
              <Users size={24} />
            </div>
          </div>
          <p style={{ fontSize: "0.85rem", color: "#10B981", marginTop: "1rem", fontWeight: "600" }}>
            Global Ağ
          </p>
        </div>
      </div>

      {/* 2. Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
        
        {/* Monthly Trend */}
        <div className={styles.tableCard} style={{ padding: "1.5rem" }}>
          <h3 style={{ marginBottom: "1.5rem", fontSize: "1.1rem", fontWeight: "600" }}>Talep Trendi (Son 6 Ay)</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={data.chartData}>
                <defs>
                  <linearGradient id="colorTalep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00A3FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00A3FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="talep" stroke="#00A3FF" strokeWidth={3} fillOpacity={1} fill="url(#colorTalep)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className={styles.tableCard} style={{ padding: "1.5rem" }}>
          <h3 style={{ marginBottom: "1.5rem", fontSize: "1.1rem", fontWeight: "600" }}>Durum Dağılımı</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data.statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.statusData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Recent Activity Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h3 className={styles.tableTitle}>Son Teklif Talepleri</h3>
          <a href="/admin/rfqs" style={{ fontSize: "0.85rem", color: "var(--color-accent)", textDecoration: "none" }}>Tümünü Gör →</a>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Referans</th>
                <th>Firma / Gemi</th>
                <th>Tarih</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {data.recentRfqs.map((rfq: any) => (
                <tr key={rfq.id}>
                  <td style={{ fontWeight: "600" }}>#{rfq.id.split('-')[0].toUpperCase()}</td>
                  <td>{rfq.companyName}</td>
                  <td>{new Date(rfq.createdAt).toLocaleDateString('tr-TR')}</td>
                  <td>
                    <span className={`${styles.badge} ${
                      rfq.status === 'pending' ? styles.badgePending :
                      rfq.status === 'priced' ? styles.badgePriced :
                      rfq.status === 'approved' ? styles.badgeApproved : styles.badgeRejected
                    }`}>
                      {rfq.status === 'pending' ? 'Bekliyor' : 
                       rfq.status === 'priced' ? 'Fiyat Verildi' :
                       rfq.status === 'approved' ? 'Onaylandı' : 'Reddedildi'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
