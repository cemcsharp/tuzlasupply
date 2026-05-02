import { getContactMessages } from "@/app/actions/contact";
import styles from "../admin.module.css";
import { Mail, Clock, User, CheckCircle } from "lucide-react";

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Gelen Mesajlar</h1>
        <p style={{ color: "var(--color-text-muted)", marginTop: "0.5rem" }}>
          Web sitesi üzerinden gelen tüm iletişim talepleri.
        </p>
      </div>

      <div className={styles.tableCard} style={{ padding: "1rem" }}>
        {messages.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#94A3B8" }}>
            <Mail size={48} style={{ marginBottom: "1rem", opacity: 0.2 }} />
            <p>Henüz gelen bir mesaj bulunmuyor.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                style={{ 
                  padding: "1.5rem", 
                  borderRadius: "16px", 
                  border: "1px solid #E2E8F0",
                  backgroundColor: msg.isRead ? "white" : "rgba(0, 163, 255, 0.03)",
                  position: "relative"
                }}
              >
                {!msg.isRead && (
                  <div style={{ 
                    position: "absolute", top: "1.5rem", right: "1.5rem", 
                    backgroundColor: "var(--color-accent)", color: "white", 
                    fontSize: "0.7rem", fontWeight: "800", padding: "0.2rem 0.6rem", 
                    borderRadius: "20px", textTransform: "uppercase" 
                  }}>
                    Yeni
                  </div>
                )}
                
                <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#1E293B", fontWeight: "700" }}>
                    <User size={16} style={{ color: "#94A3B8" }} />
                    {msg.name}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#64748B" }}>
                    <Mail size={16} style={{ color: "#94A3B8" }} />
                    {msg.email}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#94A3B8", fontSize: "0.85rem" }}>
                    <Clock size={16} />
                    {new Date(msg.createdAt).toLocaleString('tr-TR')}
                  </div>
                </div>

                <div style={{ 
                  backgroundColor: "#F8FAFC", 
                  padding: "1rem", 
                  borderRadius: "12px", 
                  color: "#334155",
                  lineHeight: "1.6",
                  fontSize: "0.95rem"
                }}>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
