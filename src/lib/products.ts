export type Product = {
  slug: string;
  name: string;
  price: number;
  sku?: string;
  category: string;
  description: string;
  body?: string;
  image: string;
  tags?: string[];
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

export const slugify = (v: string) =>
  v
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const formatIDR = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export const WHATSAPP_NUMBER = "6285729880344";

export const buildWhatsAppLink = (product: Product) => {
  const message = [
    `Halo *Tepus Kaki Merch* 👋`,
    ``,
    `Saya mau order:`,
    `• ${product.name}${product.sku ? ` (${product.sku})` : ""}`,
    `• Harga: ${formatIDR(product.price)}`,
    ``,
    `Apakah produknya ready? Terima kasih!`,
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const waGeneralLink = (msg = "Halo Satin Store, saya mau tanya produk 🙌") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
