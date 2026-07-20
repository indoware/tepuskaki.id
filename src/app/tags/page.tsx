import type { Metadata } from "next";
import Link from "next/link";
import { Tag } from "lucide-react";
import { slugify } from "@/lib/products";
import { getAllTags } from "@/lib/products-data";

export const metadata: Metadata = {
  title: "Semua Tags — Satin Store",
  description: "Daftar tag produk yang tersedia di Satin Store.",
};

export default function TagsPage() {
  const allTags = getAllTags();
  return (
    <div className="space-y-6 px-5 pb-10 pt-6">
      <header>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Eksplorasi</p>
        <h1 className="text-2xl font-black tracking-tight">Semua Tags</h1>
        <p className="mt-1 text-sm text-muted-foreground">Cari produk berdasarkan tag komunitas.</p>
      </header>

      {allTags.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          Belum ada tag yang terdaftar.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2 pt-2">
          {allTags.map((t) => (
            <Link
              key={t}
              href={`/tags/${slugify(t)}`}
              className="flex items-center gap-1.5 rounded-full border border-foreground/10 bg-muted/40 px-4 py-2 text-sm font-semibold transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Tag className="h-3.5 w-3.5" />
              <span>#{t}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
