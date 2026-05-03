"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  MessageSquare, X, Send, Bot, User, Minimize2, Maximize2, 
  Paperclip, ShieldCheck, Search, CheckCircle2, Loader2, Sparkles 
} from "lucide-react";
import styles from "./chat-widget.module.css";
import { chatWithAi } from "@/app/actions/chat";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [leadCollected, setLeadCollected] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Lead, 2: Chat/Upload, 3: Confirm
  const [isScanning, setIsScanning] = useState(false);
  
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "" });
  const [messages, setMessages] = useState<{ role: string, text: string }[]>([
    { role: "assistant", text: "Merhaba! Ben Tuzla AI. Size bugün nasıl yardımcı olabilirim?" }
  ]);

  useEffect(() => {
    setSessionId(Math.random().toString(36).substring(2, 15));
  }, []);

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{
    show: boolean;
    title: string;
    message: string;
    items?: any[];
    onConfirm?: () => void;
  }>({ show: false, title: "", message: "" });
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, isScanning, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    const history = messages
      .filter((m, i) => i > 0)
      .map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.text }]
      }));

    const result = await chatWithAi(userMessage, history as any, sessionId);

    if (result.success && result.text) {
      setMessages(prev => [...prev, { role: "assistant", text: result.text! }]);
    } else {
      setMessages(prev => [...prev, { role: "assistant", text: "Hata: " + (result.error || "Bilinmeyen bir sorun oluştu.") }]);
    }
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setCurrentStep(2);
    
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];
        const { parseRfqFileWithAi } = await import("@/app/actions/ai");
        const { logChatMessage, uploadChatFile } = await import("@/app/actions/chat");
        
        const formData = new FormData();
        formData.append("file", file);
        const uploadResult = await uploadChatFile(formData);
        const fileUrl = uploadResult.success ? uploadResult.url : undefined;

        const result = await parseRfqFileWithAi(base64, file.type);
        await logChatMessage(sessionId, "user", `📎 Dosya yüklendi: ${file.name}`, fileUrl);

        if (result.success && result.items) {
          setCurrentStep(3);
          const itemsText = result.items.map((it: any) => `- ${it.name} (${it.quantity} ${it.unit})`).join("\n");
          const assistantMsg = `Dosyanızda şu ürünleri buldum:\n${itemsText}\n\nBu ürünleri teklif listenize ekleyeyim mi?`;
          
          setMessages(prev => [...prev, { role: "assistant", text: assistantMsg }]);
          await logChatMessage(sessionId, "assistant", assistantMsg);
          
          setModal({
            show: true,
            title: "Ürünler Eklensin mi?",
            message: "Yapay zeka dökümanınızda bulunan ürünleri teklif listenize aktarmak ister misiniz?",
            items: result.items,
            onConfirm: () => {
              const existing = JSON.parse(localStorage.getItem("pending_rfq_items") || "[]");
              localStorage.setItem("pending_rfq_items", JSON.stringify([...existing, ...result.items]));
              window.dispatchEvent(new CustomEvent("ADD_RFQ_ITEMS", { detail: result.items }));
              setMessages(prev => [...prev, { role: "assistant", text: "Harika! Ürünleri listenize ekledim. Formu kontrol edip gönderebilirsiniz." }]);
              setModal(prev => ({ ...prev, show: false }));
              setCurrentStep(2);
            }
          });
        } else {
          setMessages(prev => [...prev, { role: "assistant", text: "Dosyayı okurken bir hata oluştu, lütfen tekrar deneyin." }]);
        }
        setIsScanning(false);
      };
    } catch (err) {
      setIsScanning(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email) return;

    setLoading(true);
    const { saveChatLead } = await import("@/app/actions/chat");
    await saveChatLead({ ...leadForm, sessionId });
    setLeadCollected(true);
    setCurrentStep(2);
    setLoading(false);
  };

  if (!isOpen) {
    return (
      <button className={styles.launcher} onClick={() => setIsOpen(true)}>
        <MessageSquare size={28} />
        <span className={styles.launcherBadge}>AI ACTIVE</span>
      </button>
    );
  }

  return (
    <div className={`${styles.container} ${isMinimized ? styles.minimized : ""}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <div className={styles.aiAvatar}>
            <Bot size={20} />
            <span className={styles.onlineIndicator} />
          </div>
          <div>
            <h4>Tuzla AI Asistan</h4>
            <span>War Room Monitoring</span>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button onClick={() => setIsMinimized(!isMinimized)}>
            {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>
          <button onClick={() => setIsOpen(false)}>
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Progress Stepper */}
          <div className={styles.stepper}>
            <div className={`${styles.step} ${currentStep >= 1 ? styles.stepActive : ""}`}>
              <div className={styles.stepIcon}>{currentStep > 1 ? <CheckCircle2 size={12} /> : "1"}</div> Bilgi
            </div>
            <div className={`${styles.step} ${currentStep >= 2 ? styles.stepActive : ""}`}>
              <div className={styles.stepIcon}>{currentStep > 2 ? <CheckCircle2 size={12} /> : "2"}</div> Danışma
            </div>
            <div className={`${styles.step} ${currentStep >= 3 ? styles.stepActive : ""}`}>
              <div className={styles.stepIcon}>3</div> Onay
            </div>
          </div>

          <div style={{ flex: 1, position: "relative", display: "flex", flexDirection: "column" }}>
            
            {/* AI Scan Overlay */}
            {isScanning && (
              <div className={styles.scanOverlay}>
                <div className={styles.scanRadar} />
                <div className={styles.scanText}>Yapay Zeka Tarıyor...</div>
                <div className={styles.scanSubtext}>Dökümanınızdaki kalemler tek tek ayıklanıyor.</div>
              </div>
            )}

            {!leadCollected ? (
              <div className={styles.leadFormContainer}>
                <div className={styles.leadWelcome}>
                  <Sparkles size={40} color="var(--color-accent)" style={{ marginBottom: "1rem" }} />
                  <h3>Akıllı Asistan Devrede</h3>
                  <p>Hizmet kalitemizi korumak için kısa bir bilgi rica ediyoruz.</p>
                </div>
                <form onSubmit={handleLeadSubmit} className={styles.leadForm}>
                  <div className={styles.leadInputGroup}>
                    <input 
                      type="text" placeholder="Adınız Soyadınız" required 
                      value={leadForm.name} onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    />
                  </div>
                  <div className={styles.leadInputGroup}>
                    <input 
                      type="email" placeholder="Kurumsal E-posta" required 
                      value={leadForm.email} onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    />
                  </div>
                  <button type="submit" disabled={loading} className={styles.leadSubmitBtn}>
                    {loading ? "Bağlanıyor..." : "Sohbeti Başlat"}
                  </button>
                </form>
              </div>
            ) : (
              <>
                <div className={styles.messageList} ref={scrollRef}>
                  {messages.map((m, i) => (
                    <div key={i} className={`${styles.messageWrapper} ${m.role === "assistant" ? styles.assistant : styles.user}`}>
                      <div className={styles.avatar}>
                        {m.role === "assistant" ? <Bot size={16} /> : <User size={16} />}
                      </div>
                      <div className={styles.messageContent}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className={`${styles.messageWrapper} ${styles.assistant}`}>
                      <div className={styles.avatar}><Bot size={16} /></div>
                      <div className={styles.typingIndicator}>
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className={styles.inputArea}>
                  <input 
                    type="file" id="chat-file-upload" className={styles.hiddenInput} 
                    onChange={handleFileUpload} accept="image/*,.pdf,.xlsx,.xls,.csv,.docx,.doc"
                  />
                  <label htmlFor="chat-file-upload" className={styles.attachmentBtn}>
                    <Paperclip size={20} />
                  </label>
                  <form className={styles.inputForm} onSubmit={handleSend}>
                    <input 
                      type="text" placeholder="Mesajınızı yazın..." 
                      value={input} onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit" disabled={!input.trim() || loading}>
                      <Send size={18} />
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* Modal - same but with better styles from CSS */}
      {modal.show && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>{modal.title}</h3>
            <p className={styles.modalMessage}>{modal.message}</p>
            {modal.items && (
              <div className={styles.modalList}>
                {modal.items.map((it: any, idx: number) => (
                  <div key={idx} className={styles.modalListItem}>
                    • {it.name} ({it.quantity} {it.unit})
                  </div>
                ))}
              </div>
            )}
            <div className={styles.modalActions}>
              <button onClick={modal.onConfirm} className={styles.modalBtnConfirm}>Ekle</button>
              <button onClick={() => setModal({ ...modal, show: false })} className={styles.modalBtnCancel}>Vazgeç</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
