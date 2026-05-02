"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PDFExportButton({ fileName = "teklif.pdf", elementId }: { fileName?: string, elementId: string }) {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    const element = document.getElementById(elementId);
    if (!element) return;

    setExporting(true);
    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(fileName);
    } catch (error) {
      console.error("PDF Export Error:", error);
      alert("PDF oluşturulurken bir hata oluştu.");
    }
    setExporting(false);
  };

  return (
    <button 
      onClick={handleExport} 
      disabled={exporting}
      className="btn-primary"
      style={{ 
        padding: "0.6rem 1.25rem", 
        fontSize: "0.9rem", 
        display: "flex", 
        alignItems: "center", 
        gap: "0.5rem",
        backgroundColor: "#059669",
        borderColor: "#059669"
      }}
    >
      {exporting ? (
        "Oluşturuluyor..."
      ) : (
        <>
          <span>📥</span> Profesyonel PDF İndir
        </>
      )}
    </button>
  );
}
