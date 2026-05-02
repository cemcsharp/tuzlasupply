"use client";

import { deleteProduct } from "@/app/actions/products";
import { useState } from "react";

export default function DeleteProductButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    
    setLoading(true);
    await deleteProduct(id);
    setLoading(false);
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      style={{ 
        background: "none", 
        border: "none", 
        color: "#EF4444", 
        cursor: "pointer", 
        fontSize: "0.85rem",
        fontWeight: "600"
      }}
    >
      {loading ? "..." : "Sil"}
    </button>
  );
}
