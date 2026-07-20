import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink, formatIDR } from "@/lib/products";
import { getFeaturedProducts } from "@/lib/products-data";

export function HeroSlider() {
  const featuredProducts = getFeaturedProducts();
  if (featuredProducts.length === 0) return null;
  return (
    <section aria-label="Produk pilihan">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-black tracking-tight">Produk Pilihan</h2>
          <p className="text-xs text-muted-foreground">
            Geser untuk lihat {featuredProducts.length} item unggulan
          </p>
        </div>
        <Badge
          variant="outline"
          className="border-foreground/20 text-[10px] uppercase tracking-widest"
        >
          Featured
        </Badge>
      </div>

      <div className="-mx-5 overflow-x-auto scroll-smooth snap-x snap-mandatory">
        <ul className="flex gap-4 px-5 pb-2">
          {featuredProducts.map((p) => (
            <li key={p.slug} className="w-[85%] shrink-0 snap-start">
              <article className="overflow-hidden rounded-3xl bg-primary text-primary-foreground">
                <Link href={`/produk/${p.slug}`} className="block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover"
                      sizes="85vw"
                    />
                    <div className="absolute left-4 top-4">
                      <Badge className="rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-secondary-foreground hover:bg-secondary">
                        {p.category}
                      </Badge>
                    </div>
                  </div>
                </Link>
                <div className="space-y-3 p-5">
                  <Link href={`/produk/${p.slug}`} className="block space-y-1">
                    <h3 className="text-lg font-black leading-tight">{p.name}</h3>
                    <p className="line-clamp-2 text-sm text-primary-foreground/70">
                      {p.description}
                    </p>
                  </Link>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-lg font-black text-secondary">{formatIDR(p.price)}</p>
                    <Button
                      asChild
                      size="sm"
                      className="rounded-full bg-secondary font-bold text-secondary-foreground hover:bg-secondary/90"
                    >
                      <a href={buildWhatsAppLink(p)} target="_blank" rel="noreferrer">
                        <MessageCircle className="mr-1.5 h-4 w-4" /> Order
                      </a>
                    </Button>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
