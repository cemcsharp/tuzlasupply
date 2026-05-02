"use client";
import styles from "./print.module.css";

export default function PrintButton() {
  return (
    <button className={styles.printBtn} onClick={() => window.print()}>
      🖨️ PDF / Yazdır
    </button>
  );
}
