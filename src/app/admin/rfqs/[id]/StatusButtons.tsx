"use client";

import { useState } from "react";
import { updateRfqStatus } from "@/app/actions/rfq-admin";

export default function StatusButtons({ id, currentStatus }: { id: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    await updateRfqStatus(id, newStatus);
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      {currentStatus !== "pending" && (
        <button 
          onClick={() => handleStatusChange("pending")} 
          disabled={loading}
          className="btn-secondary" 
          style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
        >
          Beklemeye Al
        </button>
      )}
      
      {currentStatus !== "priced" && (
        <button 
          onClick={() => handleStatusChange("priced")} 
          disabled={loading}
          className="btn-primary" 
          style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", backgroundColor: "#0284C7" }}
        >
          Fiyat Verildi İşaretle
        </button>
      )}
      
      {currentStatus !== "approved" && (
        <button 
          onClick={() => handleStatusChange("approved")} 
          disabled={loading}
          className="btn-primary" 
          style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", backgroundColor: "#059669" }}
        >
          Onayla
        </button>
      )}

      {currentStatus !== "rejected" && (
        <button 
          onClick={() => handleStatusChange("rejected")} 
          disabled={loading}
          className="btn-secondary" 
          style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", borderColor: "#DC2626", color: "#DC2626" }}
        >
          Reddet
        </button>
      )}
    </div>
  );
}
