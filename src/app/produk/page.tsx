import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/products-data";

export const metadata: Metadata = {
  title: "Semua Produk — Tepus Kaki",
  description:
    "Katalog lengkap merchandise Tepus Kaki: kaos, hoodie, topi, dan tote bag premium. Order via WhatsApp.",
  openGraph: {
    title: "Semua Produk — Tepus Kaki",
    url: "/produk",
  },
};

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default function ProductsPage() {
  const products = getProducts();
  return (
    <div className="space-y-6 px-5 pb-10 pt-6">
      <header>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Katalog</p>
        <h1 className="text-2xl font-black tracking-tight">Semua Produk</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {products.length} item siap kamu order via WhatsApp.
        </p>
      </header>
      <div className="grid grid-cols-2 gap-4">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
