import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "product",
        label: "Produk",
        path: "content/products",
        format: "json",
        fields: [
          { type: "string", name: "name", label: "Nama Produk", isTitle: true, required: true },
          { type: "number", name: "price", label: "Harga (IDR)", required: true },
          { type: "string", name: "sku", label: "SKU" },
          {
            type: "string",
            name: "category",
            label: "Kategori",
            options: ["T-Shirt", "Topi", "Tote Bag", "Hoodie", "Aksesori"],
          },
          {
            type: "string",
            name: "description",
            label: "Deskripsi Singkat",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "body",
            label: "Deskripsi Lengkap (Markdown)",
            ui: { component: "textarea" },
          },
          { type: "image", name: "image", label: "Gambar Produk" },
          { type: "string", name: "tags", label: "Tags", list: true },
          { type: "boolean", name: "featured", label: "Tampilkan di Hero Slider" },
          { type: "string", name: "seoTitle", label: "SEO Title" },
          {
            type: "string",
            name: "seoDescription",
            label: "SEO Description",
            ui: { component: "textarea" },
          },
        ],
      },
      {
        name: "page",
        label: "Halaman Statis",
        path: "content/pages",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Judul", isTitle: true, required: true },
          {
            type: "string",
            name: "description",
            label: "Deskripsi SEO",
            ui: { component: "textarea" },
          },
          { type: "rich-text", name: "body", label: "Konten", isBody: true },
        ],
      },
    ],
  },
});
