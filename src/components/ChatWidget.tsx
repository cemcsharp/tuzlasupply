"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Minimize2, Maximize2, Paperclip } from "lucide-react";
import styles from "./chat-widget.module.css";
import { chatWithAi } from "@/app/actions/chat";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [leadCollected, setLeadCollected] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", email: "" });
  const [messages, setMessages] = useState<{ role: string, text: string }[]>([
    { role: "assistant", text: "Merhaba! Ben Tuzla AI. Size nasıl yardımcı olabilirim?" }
  ]);

  useEffect(() => {
    // Generate a simple session ID for this visit
    setSessionId(Math.random().toString(36).substring(2, 15));
  }, []);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    // AI'ya gönderilecek geçmişi hazırla (İlk karşılama mesajını hariç tut çünkü Gemini ilk mesajın 'user' olmasını şart koşuyor)
    const history = messages
      .filter((m, i) => i > 0) // İlk mesajı (Merhaba...) atla
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

    setLoading(true);
    setMessages(prev => [...prev, { role: "user", text: `📎 Dosya yüklendi: ${file.name}` }]);
    
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];
        const { parseRfqFileWithAi } = await import("@/app/actions/ai");
        const result = await parseRfqFileWithAi(base64, file.type);

        if (result.success && result.items) {
          const itemsText = result.items.map((it: any) => `- ${it.name} (${it.quantity} ${it.unit})`).join("\n");
          setMessages(prev => [...prev, { 
            role: "assistant", 
            text: `Dosyanızda şu ürünleri buldum:\n${itemsText}\n\nBu ürünleri teklif listenize ekleyeyim mi?` 
          }]);
          
          // Akıllı Eylem Butonu (Basitleştirilmiş simülasyon)
          const confirmAdd = confirm("Bulunan ürünleri listenize eklemek ister misiniz?");
          if (confirmAdd) {
            window.dispatchEvent(new CustomEvent("ADD_RFQ_ITEMS", { detail: result.items }));
            setMessages(prev => [...prev, { role: "assistant", text: "Harika! Ürünleri listenize ekledim. Formu kontrol edip gönderebilirsiniz." }]);
          }
        } else {
          setMessages(prev => [...prev, { role: "assistant", text: "Dosyayı okurken bir hata oluştu, lütfen tekrar deneyin." }]);
        }
        setLoading(false);
      };
    } catch (err) {
      setLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email) return;

    setLoading(true);
    const { saveChatLead } = await import("@/app/actions/chat");
    await saveChatLead({ ...leadForm, sessionId });
    setLeadCollected(true);
    setLoading(false);
  };

  if (!isOpen) {
    return (
      <button className={styles.launcher} onClick={() => setIsOpen(true)}>
        <MessageSquare size={28} />
        <span className={styles.launcherBadge}>AI</span>
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
            <h4>Tuzla AI</h4>
            <span>Çevrimiçi Yardımcı</span>
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
          {!leadCollected ? (
            <div className={styles.leadFormContainer}>
              <div className={styles.leadWelcome}>
                <Bot size={40} className={styles.welcomeBot} />
                <h3>Tuzla AI'ya Hoş Geldiniz</h3>
                <p>Size en iyi şekilde yardımcı olabilmemiz için lütfen iletişim bilgilerinizi belirtin.</p>
              </div>
              <form onSubmit={handleLeadSubmit} className={styles.leadForm}>
                <div className={styles.leadInputGroup}>
                  <label>Adınız Soyadınız *</label>
                  <input 
                    type="text" 
                    placeholder="Örn: Ahmet Yılmaz" 
                    required 
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  />
                </div>
                <div className={styles.leadInputGroup}>
                  <label>E-posta Adresiniz *</label>
                  <input 
                    type="email" 
                    placeholder="ornek@firma.com" 
                    required 
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                  />
                </div>
                <button type="submit" disabled={loading} className={styles.leadSubmitBtn}>
                  {loading ? "Kaydediliyor..." : "Sohbete Başla"}
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className={styles.messageList} ref={scrollRef}>
                {messages.map((m, i) => (
                  <div key={i} className={`${styles.messageWrapper} ${m.role === "assistant" ? styles.assistant : styles.user}`}>
                    <div className={styles.avatar}>
                      {m.role === "assistant" ? <Bot size={14} /> : <User size={14} />}
                    </div>
                    <div className={styles.messageContent}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className={`${styles.messageWrapper} ${styles.assistant}`}>
                    <div className={styles.avatar}><Bot size={14} /></div>
                    <div className={styles.typingIndicator}>
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className={styles.inputArea}>
                <input 
                  type="file" 
                  id="chat-file-upload" 
                  className={styles.hiddenInput} 
                  onChange={handleFileUpload}
                  accept="image/*,.pdf,.xlsx,.xls,.csv,.docx,.doc"
                />
                <label htmlFor="chat-file-upload" className={styles.attachmentBtn}>
                  <Paperclip size={18} />
                </label>
                <form className={styles.inputForm} onSubmit={handleSend}>
                  <input 
                    type="text" 
                    placeholder="Bir şeyler yazın..." 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus
                  />
                  <button type="submit" disabled={!input.trim() || loading}>
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
