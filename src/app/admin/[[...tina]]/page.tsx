"use client";

import { TinaAdmin } from "tinacms";
import config from "../../../../tina/config";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Client-side error:", event.error);
      setHasError(true);
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return (
      <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1>Terjadi Kesalahan</h1>
        <p>Maaf, terjadi kesalahan saat memuat halaman admin.</p>
        <p>Pastikan variabel lingkungan Tina CMS telah dikonfigurasi dengan benar.</p>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px" }}>
          NEXT_PUBLIC_TINA_CLIENT_ID={process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "NOT SET"}
        </pre>
      </div>
    );
  }

  return <TinaAdmin config={config} />;
}
