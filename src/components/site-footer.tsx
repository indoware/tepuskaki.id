import Link from "next/link";
import { Instagram, Mail, MessageCircle } from "lucide-react";

import { slugify, waGeneralLink } from "@/lib/products";
import { getCategories } from "@/lib/products-data";

export function SiteFooter() {
  const categories = getCategories();
  return (
    <footer className="mt-10 border-t border-foreground/10 bg-foreground text-background">
      <div className="space-y-6 px-5 py-8">
        <div>
          <p className="text-lg font-black tracking-tight text-secondary">Satin Store</p>
          <p className="mt-1 text-xs text-background/70">
            Merchandise resmi <strong>Tepus Kaki</strong>. Kaos, hoodie, topi &amp; tote bag edisi
            eksklusif komunitas — dibuat dengan bahan premium.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-secondary">
              Belanja
            </p>
            <ul className="space-y-1.5">
              <li>
                <Link href="/produk" className="hover:text-secondary">
                  Semua Produk
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link href={`/kategori/${slugify(c)}`} className="hover:text-secondary">
                    {c}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/tags" className="hover:text-secondary">
                  Semua Tags
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-secondary">
              Bantuan
            </p>
            <ul className="space-y-1.5">
              <li>
                <Link href="/halaman/tentang" className="hover:text-secondary">
                  Tentang
                </Link>
              </li>
              <li>
                <Link href="/halaman/kontak" className="hover:text-secondary">
                  Kontak
                </Link>
              </li>
              <li>
                <Link href="/halaman/pengiriman" className="hover:text-secondary">
                  Pengiriman
                </Link>
              </li>
              <li>
                <Link href="/halaman/kebijakan" className="hover:text-secondary">
                  Kebijakan Toko
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-secondary">
            Terhubung
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={waGeneralLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-bold text-secondary-foreground"
            >
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
            </a>
            <a
              href="https://instagram.com/Satinstore"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-background/30 px-3 py-1.5 text-xs font-bold"
            >
              <Instagram className="h-3.5 w-3.5" /> Instagram
            </a>
            <a
              href="mailto:hello@Satinstore.id"
              className="inline-flex items-center gap-1.5 rounded-full border border-background/30 px-3 py-1.5 text-xs font-bold"
            >
              <Mail className="h-3.5 w-3.5" /> Email
            </a>
          </div>
        </div>

        <p className="border-t border-background/20 pt-4 text-[10px] uppercase tracking-widest text-background/50">
          © {new Date().getFullYear()} Satin Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
