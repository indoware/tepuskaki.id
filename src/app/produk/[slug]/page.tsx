import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MessageCircle, Tag } from "lucide-react";
import { marked } from "marked";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { ShareButton } from "@/components/share-button";
import { buildWhatsAppLink, formatIDR, slugify } from "@/lib/products";
import { productBySlug, getProducts } from "@/lib/products-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) return {};
  const title = p.seoTitle ?? `${p.name} — Satin Store`;
  const description = p.seoDescription ?? p.description;
  const url = `/produk/${slug}`;
  const thumbnailUrl = `/api/thumbnail?slug=${slug}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: thumbnailUrl }],
    },
    twitter: {
      title,
      description,
      images: [thumbnailUrl],
    },
  };
}

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function ProductDetail({ params }: PageProps) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) {
    notFound();
  }

  const bodyHtml = await marked.parse(product.body ?? "");
  const products = getProducts();
  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: product.image,
            description: product.description,
            sku: product.sku,
            brand: {
              "@type": "Brand",
              name: "Tepus Kaki Merch",
            },
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "IDR",
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />
      <article className="space-y-6 px-5 pb-10 pt-4">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:underline">
                Beranda
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/kategori/${slugify(product.category)}`} className="hover:underline">
                {product.category}
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-foreground">{product.name}</li>
          </ol>
        </nav>

      <div className="overflow-hidden rounded-3xl bg-muted relative aspect-square w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <header className="space-y-2">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
          {product.category}
          {product.sku ? ` · SKU ${product.sku}` : ""}
        </p>
        <h1 className="text-2xl font-black leading-tight">{product.name}</h1>
        <p className="text-2xl font-black text-primary">{formatIDR(product.price)}</p>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </header>

      <div className="flex flex-wrap gap-2">
        <Button
          asChild
          size="lg"
          className="flex-1 rounded-full bg-primary font-bold text-primary-foreground hover:bg-primary/90"
        >
          <a href={buildWhatsAppLink(product)} target="_blank" rel="noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" /> Order via WhatsApp
          </a>
        </Button>
        <ShareButton name={product.name} description={product.description} />
      </div>

      {product.tags && product.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <Tag className="h-3.5 w-3.5 text-muted-foreground" />
          {product.tags.map((t: string) => (
            <Link
              key={t}
              href={`/tags/${slugify(t)}`}
              className="rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-secondary-foreground hover:opacity-90"
            >
              #{t}
            </Link>
          ))}
        </div>
      )}

      <section
        className="prose prose-sm max-w-none prose-headings:font-black prose-h2:mt-4 prose-h2:text-lg prose-h3:text-base prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />

      <section className="rounded-2xl border border-dashed border-foreground/20 bg-muted/40 p-5 text-sm">
        <h2 className="text-sm font-black uppercase tracking-widest">Info Pengiriman</h2>
        <p className="mt-2 text-muted-foreground">
          Dikirim dari Madiun, Jawa Timur via JNE / J&T / SiCepat. Estimasi 1–7 hari kerja. Lihat{" "}
          <Link href="/halaman/pengiriman" className="font-bold text-foreground underline">
            info pengiriman lengkap
          </Link>
          .
        </p>
      </section>

      {related.length > 0 && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-black tracking-tight">Produk Serupa</h2>
            <Badge variant="outline" className="text-[10px] uppercase tracking-widest">
              {product.category}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {related.map((r) => (
              <ProductCard key={r.slug} product={r} />
            ))}
          </div>
        </section>
      )}
      </article>
    </>
  );
}
