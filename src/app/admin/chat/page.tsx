"use client";

import { useEffect, useState } from "react";
import styles from "../admin.module.css";
import { getChatLeads, getChatLogs } from "@/app/actions/chat";
import { DownloadCloud, FileText } from "lucide-react";

export default function AdminChatPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [leadLoading, setLeadLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLeadLoading(true);
    const result = await getChatLeads();
    if (result.success && result.leads) {
      setLeads(result.leads);
    }
    setLeadLoading(false);
  };

  const fetchLogs = async (sessionId: string) => {
    setLoading(true);
    setSelectedSession(sessionId);
    const result = await getChatLogs(sessionId);
    if (result.success && result.logs) {
      setLogs(result.logs);
    }
    setLoading(false);
  };

  return (
    <div className={styles.chatPage}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Chatbot Kayıtları</h1>
        <p className={styles.statTitle}>Asistan ile yapılan tüm görüşmeleri buradan izleyebilirsiniz.</p>
      </div>

      <div className={styles.chatGrid}>
        {/* Sol Panel: Müşteri Listesi */}
        <div className={styles.chatSidebar}>
          <div className={styles.chatSidebarHeader}>
            Müşteriler ({leads.length})
          </div>
          <div className={styles.leadList}>
            {leadLoading ? (
              <div className={styles.noSelection}>Yükleniyor...</div>
            ) : leads.length === 0 ? (
              <div className={styles.noSelection}>Henüz kayıt yok.</div>
            ) : (
              leads.map((lead) => (
                <div 
                  key={lead.id} 
                  className={`${styles.leadItem} ${selectedSession === lead.sessionId ? styles.leadItemActive : ""}`}
                  onClick={() => fetchLogs(lead.sessionId)}
                >
                  <span className={styles.leadName}>{lead.name}</span>
                  <span className={styles.leadMeta}>{lead.email}</span>
                  {lead.phone && <span className={styles.leadMeta}>{lead.phone}</span>}
                  <span className={styles.messageTime}>
                    {new Date(lead.createdAt).toLocaleString('tr-TR')}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sağ Panel: Sohbet Geçmişi */}
        <div className={styles.chatContent}>
          {selectedSession ? (
            <div className={styles.chatHistory}>
              {loading ? (
                <div className={styles.noSelection}>Mesajlar yükleniyor...</div>
              ) : (
                logs.map((log) => (
                  <div 
                    key={log.id} 
                    className={`${styles.chatMessage} ${log.role === 'user' ? styles.userMessage : styles.aiMessage}`}
                  >
                    <div className={styles.messageContent}>{log.message}</div>
                    
                    {log.fileUrl && (
                      <a 
                        href={log.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.downloadBtn}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginTop: "0.75rem",
                          padding: "0.5rem 0.75rem",
                          background: "rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                          fontSize: "0.8rem",
                          color: log.role === 'user' ? "white" : "var(--color-primary)",
                          textDecoration: "none",
                          border: "1px solid rgba(255,255,255,0.2)"
                        }}
                      >
                        <DownloadCloud size={14} />
                        Dosyayı İndir
                      </a>
                    )}

                    <span className={styles.messageTime}>
                      {new Date(log.createdAt).toLocaleTimeString('tr-TR')}
                    </span>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className={styles.noSelection}>
              <div style={{ fontSize: "3rem", opacity: 0.2 }}>💬</div>
              <p>Görüşme detaylarını görmek için soldan bir müşteri seçin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
