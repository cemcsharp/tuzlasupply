"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react";
import styles from "./chat-widget.module.css";
import { chatWithAi } from "@/app/actions/chat";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState("");
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

          {/* Input */}
          <form className={styles.inputArea} onSubmit={handleSend}>
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
        </>
      )}
    </div>
  );
}
