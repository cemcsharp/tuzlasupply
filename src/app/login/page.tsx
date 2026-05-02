"use client";

import { useState } from "react";
import { login } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError("");

    const result = await login(formData);

    if (result.success) {
      router.push("/admin");
    } else {
      setError(result.error || "Giriş başarısız.");
    }
    setLoading(false);
  };

  return (
    <main className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.logo}>
          Tuzla <span>Supply</span>
        </div>
        
        <h1 className={styles.title}>Yönetici Girişi</h1>
        <p className={styles.subtitle}>Devam etmek için kimliğinizi doğrulayın.</p>

        <form action={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>E-posta</label>
            <input 
              type="email" 
              name="email" 
              required 
              placeholder="admin@tuzlasupply.com"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Şifre</label>
            <input 
              type="password" 
              name="password" 
              required 
              placeholder="••••••••"
              className={styles.input}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <div className={styles.footer}>
          &copy; 2026 Tuzla Supply | Güvenli Erişim
        </div>
      </div>
    </main>
  );
}
