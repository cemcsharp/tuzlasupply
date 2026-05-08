"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  MessageSquare, X, Send, Bot, User, Minimize2, Maximize2, 
  Paperclip, CheckCircle2, Sparkles, Wand2 
} from "lucide-react";
import styles from "./chat-widget.module.css";
import { chatWithAi } from "@/app/actions/chat";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [leadCollected, setLeadCollected] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "" });
  const [messages, setMessages] = useState<{ role: string, text: string }[]>([
    { role: "assistant", text: "Merhaba! Ben Navis AI. Size bugün nasıl yardımcı olabilirim?" }
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
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];
        const { parseRfqFileWithAi } = await import("@/app/actions/ai");
        const result = await parseRfqFileWithAi(base64, file.type);
        if (result.success && result.items) {
          triggerConfirmation(result.items, "Döküman Analizi");
        }
        setIsScanning(false);
      };
    } catch (err) {
      setIsScanning(false);
    }
  };

  const handleFinalizeChat = async () => {
    if (messages.length < 2 || loading) return;
    
    setIsScanning(true);
    try {
      const { extractItemsFromChatHistory } = await import("@/app/actions/ai");
      const result = await extractItemsFromChatHistory(messages);
      
      if (result.success && result.items && result.items.length > 0) {
        triggerConfirmation(result.items, "Sohbet Analizi");
      } else {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          text: "Üzgünüm, sohbetimizde henüz net bir ürün talebi yakalayamadım. Lütfen neye ihtiyacınız olduğunu belirtebilir misiniz?" 
        }]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  const triggerConfirmation = (items: any[], source: string) => {
    setCurrentStep(3);
    setModal({
      show: true,
      title: `${source}: Ürünler Hazır`,
      message: `${source} sonucunda aşağıdaki ürünleri tespit ettim. Teklif listenize eklemek istiyor musunuz?`,
      items: items,
      onConfirm: () => {
        const existing = JSON.parse(localStorage.getItem("pending_rfq_items") || "[]");
        localStorage.setItem("pending_rfq_items", JSON.stringify([...existing, ...items]));
        window.dispatchEvent(new CustomEvent("ADD_RFQ_ITEMS", { detail: items }));
        setMessages(prev => [...prev, { role: "assistant", text: "Harika! Ürünleri listenize ekledim. Teklif formundan kontrol edebilirsiniz." }]);
        setModal({ show: false, title: "", message: "" });
        setCurrentStep(2);
      }
    });
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        <span className={styles.launcherBadge}>NAVIS AI</span>
      </button>
    );
  }

  return (
    <div className={`${styles.container} ${isMinimized ? styles.minimized : ""}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <div className={styles.aiAvatar}>
            <Bot size={20} /><span className={styles.onlineIndicator} />
          </div>
          <div><h4>Navis AI</h4><span>Çevrimiçi</span></div>
        </div>
        <div className={styles.headerActions}>
          <button onClick={() => setIsMinimized(!isMinimized)}>{isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}</button>
          <button onClick={() => setIsOpen(false)}><X size={18} /></button>
        </div>
      </div>

      {!isMinimized && (
        <div className={styles.body}>
          <div className={styles.stepper}>
            <div className={`${styles.step} ${currentStep >= 1 ? styles.stepActive : ""}`}><div className={styles.stepIcon}>1</div> Bilgi</div>
            <div className={`${styles.step} ${currentStep >= 2 ? styles.stepActive : ""}`}><div className={styles.stepIcon}>2</div> Danışma</div>
            <div className={`${styles.step} ${currentStep >= 3 ? styles.stepActive : ""}`}><div className={styles.stepIcon}>3</div> Onay</div>
          </div>

          <div className={styles.contentArea}>
            {isScanning && (
              <div className={styles.scanOverlay}>
                <div className={styles.scanRadar} />
                <div className={styles.scanText}>Navis AI Analiz Ediyor...</div>
                <div className={styles.scanSubtext}>Talepleriniz Navis AI tarafından ayıklanıyor.</div>
              </div>
            )}

            {!leadCollected ? (
              <div className={styles.leadFormContainer}>
                <div className={styles.leadWelcome}><Sparkles size={32} color="var(--color-accent)" /><h3>Navis AI Asistan</h3></div>
                <form onSubmit={handleLeadSubmit} className={styles.leadForm}>
                  <div className={styles.leadInputGroup}><input type="text" placeholder="Ad Soyad" required value={leadForm.name} onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })} /></div>
                  <div className={styles.leadInputGroup}><input type="email" placeholder="E-posta" required value={leadForm.email} onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })} /></div>
                  <button type="submit" disabled={loading} className={styles.leadSubmitBtn}>Bağlan</button>
                </form>
              </div>
            ) : (
              <div className={styles.chatArea}>
                <div className={styles.messageList}>
                  {messages.map((m, i) => (
                    <div key={i} className={`${styles.messageWrapper} ${m.role === "assistant" ? styles.assistant : styles.user}`}>
                      <div className={styles.avatar}>{m.role === "assistant" ? <Bot size={16} /> : <User size={16} />}</div>
                      <div className={styles.messageContent}>{m.text}</div>
                    </div>
                  ))}
                  {loading && <div className={styles.typingIndicator}><span></span><span></span><span></span></div>}
                  <div ref={messagesEndRef} />
                </div>
                <div className={styles.inputArea}>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <input type="file" id="chat-file" className={styles.hiddenInput} onChange={handleFileUpload} />
                    <label htmlFor="chat-file" className={styles.attachmentBtn} title="Dosya Yükle"><Paperclip size={20} /></label>
                    <button 
                      onClick={handleFinalizeChat} 
                      className={styles.attachmentBtn} 
                      style={{ color: "var(--color-accent)" }}
                      title="Sohbetten Teklif Oluştur"
                      disabled={isScanning || messages.length < 2}
                    >
                      <Wand2 size={20} />
                    </button>
                  </div>
                  <form className={styles.inputForm} onSubmit={handleSend}>
                    <input type="text" placeholder="Yazın..." value={input} onChange={(e) => setInput(e.target.value)} />
                    <button type="submit" disabled={!input.trim() || loading}><Send size={18} /></button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
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
              <button onClick={modal.onConfirm} className={styles.modalBtnConfirm}>Listeye Ekle</button>
              <button onClick={() => setModal({ show: false, title: "", message: "" })} className={styles.modalBtnCancel}>Vazgeç</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
