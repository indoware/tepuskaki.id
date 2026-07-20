import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { slugify } from "@/lib/products";
import { getAllTags, productsByTag } from "@/lib/products-data";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const allTags = getAllTags();
  return allTags.map((t) => ({
    tag: slugify(t),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const allTags = getAllTags();
  const { tag } = await params;
  const actualTag = allTags.find((t) => slugify(t) === tag) || tag;
  return {
    title: `#${actualTag} — Satin Store`,
    description: `Koleksi produk dengan tag #${actualTag} di Satin Store.`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const allTags = getAllTags();
  const { tag } = await params;
  const actualTag = allTags.find((t) => slugify(t) === tag);
  if (!actualTag) {
    notFound();
  }

  const tagProducts = productsByTag(actualTag);

  return (
    <div className="space-y-6 px-5 pb-10 pt-6">
      <header>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Tag</p>
        <h1 className="text-2xl font-black tracking-tight">#{actualTag}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Menampilkan {tagProducts.length} produk dengan tag ini.
        </p>
      </header>

      {tagProducts.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          Belum ada produk dengan tag ini.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {tagProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
