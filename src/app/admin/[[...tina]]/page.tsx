"use client";

export default function AdminPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Halaman Admin</h1>
      <p>Untuk menggunakan halaman admin Tina CMS, Anda perlu:</p>
      <ol style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <li>Mendaftarkan proyek di <a href="https://app.tina.io/" target="_blank" rel="noopener noreferrer">Tina Cloud</a></li>
        <li>Mengkonfigurasi variabel lingkungan <code>NEXT_PUBLIC_TINA_CLIENT_ID</code> dan <code>TINA_TOKEN</code></li>
        <li>Menjalankan <code>tinacms build</code> untuk menghasilkan file admin</li>
      </ol>
      <p>Untuk saat ini, Anda bisa mengedit konten langsung di folder <code>content/</code> di repositori.</p>
    </div>
  );
}
