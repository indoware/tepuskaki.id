import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeroSlider } from "@/components/hero-slider";
import { ProductCard } from "@/components/product-card";
import { slugify, waGeneralLink } from "@/lib/products";
import { getCategories, getProducts } from "@/lib/products-data";

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default function StorePage() {
  const categories = getCategories();
  const products = getProducts();

  return (
    <div className="space-y-8 px-5 pb-10 pt-6">
      <section className="rounded-3xl bg-primary p-6 text-primary-foreground">
        <Badge className="rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-secondary-foreground hover:bg-secondary">
          Merchandise Resmi Tepus Kaki
        </Badge>
        <h1 className="mt-3 text-3xl font-black leading-tight">
          Eling, Kuat, <span className="text-secondary">Slamet.</span>
        </h1>
        <p className="mt-2 text-sm text-primary-foreground/80">
          Koleksi resmi <strong>Tepus Kaki By Satine Store</strong> — kaos, hoodie, topi, dan tote
          bag premium buat kamu yang berani tampil beda.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            asChild
            className="rounded-full bg-secondary font-bold text-secondary-foreground hover:bg-secondary/90"
          >
            <Link href="/produk">
              Belanja Sekarang <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-secondary bg-transparent font-bold text-secondary hover:bg-secondary hover:text-secondary-foreground"
          >
            <a href={waGeneralLink()} target="_blank" rel="noreferrer">
              <MessageCircle className="mr-1.5 h-4 w-4" /> Tanya Admin
            </a>
          </Button>
        </div>
      </section>

      <HeroSlider />

      <section>
        <h2 className="mb-3 text-xl font-black tracking-tight">Kategori</h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((c) => (
            <Link
              key={c}
              href={`/kategori/${slugify(c)}`}
              className="group rounded-2xl border border-foreground/10 bg-muted/40 p-4 transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-primary-foreground/70">
                Kategori
              </p>
              <p className="mt-1 text-base font-black">{c}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-xl font-black tracking-tight">Semua Produk</h2>
          <Link
            href="/produk"
            className="text-xs font-bold text-muted-foreground hover:text-foreground"
          >
            Lihat semua →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
