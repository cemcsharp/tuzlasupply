"use client";

import { useState } from "react";
import { createReference, createPartner, toggleReference, togglePartner, deleteReference, deletePartner, toggleSectionVisibility, updateStats } from "@/app/actions/showcase";
import { Eye, EyeOff, Plus, Trash2, Ship, Building2, Anchor, Zap, Wrench, Globe, ToggleLeft, ToggleRight, Save, BarChart3 } from "lucide-react";

interface Props {
  references: any[];
  partners: any[];
  visibility: { 
    showReferences: boolean; 
    showPartners: boolean; 
    showStats: boolean;
    statOrders: string;
    statCustomers: string;
    statExperience: string;
    statSupport: string;
  };
}

const iconOptions = ["Ship", "Building2", "Anchor", "Zap", "Wrench", "Globe"];

const cardStyle: React.CSSProperties = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "16px",
  padding: "2rem",
  marginBottom: "2rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: "10px",
  border: "1px solid #E2E8F0",
  fontSize: "0.9rem",
  background: "#F8FAFC",
  color: "#0F172A",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8rem",
  fontWeight: 700,
  color: "#64748B",
  marginBottom: "0.4rem",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
};

const btnPrimary: React.CSSProperties = {
  padding: "0.7rem 1.5rem",
  background: "linear-gradient(135deg, #0F172A, #1E293B)",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontWeight: 700,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "0.85rem",
};

export default function ShowcaseClient({ references, partners, visibility }: Props) {
  const [showRefForm, setShowRefForm] = useState(false);
  const [showPartnerForm, setShowPartnerForm] = useState(false);

  return (
    <div>
      <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.5rem" }}>
        Referanslar & İş Ortakları
      </h1>
      <p style={{ color: "#64748B", marginBottom: "2rem" }}>
        Anasayfada gösterilecek referansları, iş ortaklarını ve bölüm görünürlüklerini yönetin.
      </p>

      {/* Section Visibility Toggles */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", marginBottom: "1rem" }}>
          📋 Bölüm Görünürlüğü
        </h2>
        <p style={{ fontSize: "0.85rem", color: "#64748B", marginBottom: "1.5rem" }}>
          Anasayfada hangi bölümlerin görünür olacağını kontrol edin. Hazır olduğunuzda aktif edin.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {([
            { key: "showStats" as const, label: "📊 İstatistikler" },
            { key: "showReferences" as const, label: "⚓ Referanslar" },
            { key: "showPartners" as const, label: "🤝 İş Ortakları" },
          ]).map(item => (
            <form key={item.key} action={() => toggleSectionVisibility(item.key)}>
              <button
                type="submit"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.8rem 1.5rem",
                  border: `2px solid ${visibility[item.key] ? "#10B981" : "#E2E8F0"}`,
                  borderRadius: "12px",
                  background: visibility[item.key] ? "rgba(16, 185, 129, 0.05)" : "#F8FAFC",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  color: visibility[item.key] ? "#059669" : "#94A3B8",
                  transition: "all 0.2s",
                }}
              >
                {visibility[item.key] ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                {item.label}
                <span style={{
                  fontSize: "0.7rem",
                  padding: "2px 8px",
                  borderRadius: "6px",
                  background: visibility[item.key] ? "#D1FAE5" : "#F1F5F9",
                  color: visibility[item.key] ? "#065F46" : "#94A3B8",
                  fontWeight: 800,
                }}>
                  {visibility[item.key] ? "AKTİF" : "PASİF"}
                </span>
              </button>
            </form>
          ))}
        </div>
      </div>
      {/* Dynamic Stats Management */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <BarChart3 size={20} /> 📊 Rakamlarla Biz (İstatistikler)
        </h2>
        <p style={{ fontSize: "0.85rem", color: "#64748B", marginBottom: "1.5rem" }}>
          Anasayfadaki başarı rakamlarını buradan güncelleyebilirsiniz. Değişiklikleri kaydetmeyi unutmayın.
        </p>
        <form action={updateStats}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "1.5rem" }}>
            <div>
              <label style={labelStyle}>Tamamlanan Sipariş</label>
              <input name="statOrders" defaultValue={visibility.statOrders} style={inputStyle} placeholder="Örn: 500+" />
            </div>
            <div>
              <label style={labelStyle}>Aktif Müşteri</label>
              <input name="statCustomers" defaultValue={visibility.statCustomers} style={inputStyle} placeholder="Örn: 150+" />
            </div>
            <div>
              <label style={labelStyle}>Yıllık Deneyim</label>
              <input name="statExperience" defaultValue={visibility.statExperience} style={inputStyle} placeholder="Örn: 25+" />
            </div>
            <div>
              <label style={labelStyle}>Destek Süresi</label>
              <input name="statSupport" defaultValue={visibility.statSupport} style={inputStyle} placeholder="Örn: 7/24" />
            </div>
          </div>
          <button type="submit" style={btnPrimary}>
            <Save size={16} /> Değişiklikleri Kaydet
          </button>
        </form>
      </div>

      {/* ══════════ REFERENCES ══════════ */}
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A" }}>⚓ Referanslar</h2>
            <p style={{ fontSize: "0.8rem", color: "#64748B", marginTop: "0.25rem" }}>{references.length} referans kayıtlı</p>
          </div>
          <button style={btnPrimary} onClick={() => setShowRefForm(!showRefForm)}>
            <Plus size={16} /> Referans Ekle
          </button>
        </div>

        {showRefForm && (
          <form action={async (formData) => { await createReference(formData); setShowRefForm(false); }}
            style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "1.5rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={labelStyle}>Firma Adı</label>
                <input name="name" required style={inputStyle} placeholder="Örn: Arkas Denizcilik" />
              </div>
              <div>
                <label style={labelStyle}>Sektör / Tip</label>
                <input name="type" required style={inputStyle} placeholder="Örn: Gemi İşletmeciliği" />
              </div>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Açıklama</label>
              <input name="description" style={inputStyle} placeholder="Kısa açıklama..." />
            </div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
              <div>
                <label style={labelStyle}>İkon</label>
                <select name="icon" style={inputStyle}>
                  {iconOptions.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <button type="submit" style={btnPrimary}>Kaydet</button>
            </div>
          </form>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {references.map(ref => (
            <div key={ref.id} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1rem 1.25rem",
              background: ref.isActive ? "#fff" : "#F8FAFC",
              border: `1px solid ${ref.isActive ? "#E2E8F0" : "#F1F5F9"}`,
              borderRadius: "12px",
              opacity: ref.isActive ? 1 : 0.6,
              transition: "all 0.2s",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "10px",
                  background: "linear-gradient(135deg, rgba(0,163,255,0.1), rgba(0,102,255,0.05))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#00A3FF",
                }}>
                  <Anchor size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#0F172A", fontSize: "0.95rem" }}>{ref.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748B" }}>{ref.type} {ref.description ? `• ${ref.description.substring(0, 50)}...` : ""}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <form action={() => toggleReference(ref.id)}>
                  <button type="submit" title={ref.isActive ? "Pasif Yap" : "Aktif Yap"} style={{
                    padding: "0.5rem", border: "none", borderRadius: "8px", cursor: "pointer",
                    background: ref.isActive ? "#D1FAE5" : "#FEE2E2",
                    color: ref.isActive ? "#059669" : "#DC2626",
                  }}>
                    {ref.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </form>
                <form action={() => deleteReference(ref.id)}>
                  <button type="submit" style={{
                    padding: "0.5rem", border: "none", borderRadius: "8px", cursor: "pointer",
                    background: "#FEF2F2", color: "#DC2626",
                  }}>
                    <Trash2 size={16} />
                  </button>
                </form>
              </div>
            </div>
          ))}
          {references.length === 0 && (
            <p style={{ textAlign: "center", color: "#94A3B8", padding: "2rem", fontSize: "0.9rem" }}>
              Henüz referans eklenmemiş. Yukarıdaki butona tıklayarak başlayın.
            </p>
          )}
        </div>
      </div>

      {/* ══════════ PARTNERS ══════════ */}
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A" }}>🤝 İş Ortakları & Distribütörlükler</h2>
            <p style={{ fontSize: "0.8rem", color: "#64748B", marginTop: "0.25rem" }}>{partners.length} partner kayıtlı</p>
          </div>
          <button style={btnPrimary} onClick={() => setShowPartnerForm(!showPartnerForm)}>
            <Plus size={16} /> Partner Ekle
          </button>
        </div>

        {showPartnerForm && (
          <form action={async (formData) => { await createPartner(formData); setShowPartnerForm(false); }}
            style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "1.5rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 120px", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={labelStyle}>Firma / Marka</label>
                <input name="name" required style={inputStyle} placeholder="Örn: SKF Bearings" />
              </div>
              <div>
                <label style={labelStyle}>İlişki Türü</label>
                <input name="role" required style={inputStyle} placeholder="Örn: Yetkili Distribütör" />
              </div>
              <div>
                <label style={labelStyle}>Renk</label>
                <input name="color" type="color" defaultValue="#0072CE" style={{ ...inputStyle, height: "42px", padding: "4px" }} />
              </div>
            </div>
            <button type="submit" style={btnPrimary}>Kaydet</button>
          </form>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          {partners.map(p => (
            <div key={p.id} style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem 1rem",
              background: p.isActive ? "#fff" : "#F8FAFC",
              border: `1px solid ${p.isActive ? "#E2E8F0" : "#F1F5F9"}`,
              borderRadius: "12px",
              opacity: p.isActive ? 1 : 0.5,
              transition: "all 0.2s",
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: "8px",
                background: p.color, display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 800, fontSize: "0.7rem",
              }}>
                {p.name.split(" ").map((w: string) => w[0]).join("").substring(0, 2)}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#0F172A" }}>{p.name}</div>
                <div style={{ fontSize: "0.7rem", color: "#64748B" }}>{p.role}</div>
              </div>
              <div style={{ display: "flex", gap: "0.25rem", marginLeft: "0.5rem" }}>
                <form action={() => togglePartner(p.id)}>
                  <button type="submit" style={{
                    padding: "4px", border: "none", borderRadius: "6px", cursor: "pointer",
                    background: p.isActive ? "#D1FAE5" : "#FEE2E2",
                    color: p.isActive ? "#059669" : "#DC2626",
                  }}>
                    {p.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                </form>
                <form action={() => deletePartner(p.id)}>
                  <button type="submit" style={{
                    padding: "4px", border: "none", borderRadius: "6px", cursor: "pointer",
                    background: "#FEF2F2", color: "#DC2626",
                  }}>
                    <Trash2 size={14} />
                  </button>
                </form>
              </div>
            </div>
          ))}
          {partners.length === 0 && (
            <p style={{ textAlign: "center", color: "#94A3B8", padding: "2rem", fontSize: "0.9rem", width: "100%" }}>
              Henüz partner eklenmemiş. Yukarıdaki butona tıklayarak başlayın.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
