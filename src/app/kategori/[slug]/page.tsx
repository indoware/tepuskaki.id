import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { slugify } from "@/lib/products";
import { findCategoryBySlug, productsByCategorySlug, getProducts } from "@/lib/products-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getProducts();
  const categories = Array.from(new Set(products.map((p) => p.category)));
  return categories.map((c) => ({
    slug: slugify(c),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = findCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category} — Satin Store`,
    description: `Koleksi produk kategori ${category} di Satin Store.`,
  };
}

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = findCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  const categoryProducts = productsByCategorySlug(slug);

  return (
    <div className="space-y-6 px-5 pb-10 pt-6">
      <header>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Kategori</p>
        <h1 className="text-2xl font-black tracking-tight">{category}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Menampilkan {categoryProducts.length} produk pilihan.
        </p>
      </header>

      {categoryProducts.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          Belum ada produk di kategori ini.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {categoryProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
