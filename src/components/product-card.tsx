import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { buildWhatsAppLink, formatIDR, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden rounded-2xl border-foreground/10 p-0 shadow-none transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link href={`/produk/${product.slug}`} className="block">
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full object-cover"
          />
          <span className="absolute left-2 top-2 rounded-full bg-secondary px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-secondary-foreground">
            {product.category}
          </span>
        </div>
      </Link>
      <CardContent className="space-y-3 p-3">
        <Link href={`/produk/${product.slug}`} className="block min-h-[2.5rem]">
          <h3 className="line-clamp-2 text-sm font-bold leading-tight hover:underline">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm font-black">{formatIDR(product.price)}</p>
        <Button
          asChild
          size="sm"
          className="w-full rounded-full bg-primary text-xs font-bold text-primary-foreground hover:bg-primary/90"
        >
          <a href={buildWhatsAppLink(product)} target="_blank" rel="noreferrer">
            <MessageCircle className="mr-1.5 h-3.5 w-3.5" /> Order WA
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
