import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
const searchIndexToken = process.env.TINA_SEARCH_TOKEN;

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
  ...(searchIndexToken
    ? {
        search: {
          tina: {
            indexerToken: searchIndexToken,
            fuzzyEnabled: true,
            stopwordLanguages: ["eng", "ind"],
          },
          indexBatchSize: 100,
          maxSearchIndexFieldLength: 80,
        },
      }
    : {}),
  schema: {
    collections: [
      {
        name: "product",
        label: "Produk",
        path: "content/products",
        format: "json",
        ui: {
          createDocument: {
            label: "Add Produk",
          },
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Nama Produk",
            isTitle: true,
            required: true,
            searchable: true,
          },
          {
            type: "number",
            name: "price",
            label: "Harga (IDR)",
            required: true,
            searchable: false,
          },
          { type: "string", name: "sku", label: "SKU", searchable: true },
          {
            type: "string",
            name: "category",
            label: "Kategori",
            options: ["T-Shirt"],
            searchable: true,
          },
          {
            type: "string",
            name: "description",
            label: "Deskripsi Singkat",
            searchable: false,
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "body",
            label: "Deskripsi Lengkap (Markdown)",
            searchable: false,
            ui: { component: "textarea" },
          },
          { type: "image", name: "image", label: "Gambar Produk" },
          { type: "string", name: "tags", label: "Tags", list: true, searchable: true },
          {
            type: "boolean",
            name: "featured",
            label: "Tampilkan di Hero Slider",
            searchable: false,
          },
          { type: "string", name: "seoTitle", label: "SEO Title", searchable: false },
          {
            type: "string",
            name: "seoDescription",
            label: "SEO Description",
            searchable: false,
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
          {
            type: "string",
            name: "title",
            label: "Judul",
            isTitle: true,
            required: true,
            searchable: true,
          },
          {
            type: "string",
            name: "description",
            label: "Deskripsi SEO",
            searchable: false,
            ui: { component: "textarea" },
          },
          { type: "rich-text", name: "body", label: "Konten", isBody: true, searchable: false },
        ],
      },
    ],
  },
});
