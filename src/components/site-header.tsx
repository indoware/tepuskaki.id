"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { slugify } from "@/lib/products";

const staticLinks = [
  { href: "/produk", label: "Semua Produk" },
  { href: "/tags", label: "Tags" },
  { href: "/halaman/tentang", label: "Tentang" },
  { href: "/halaman/kontak", label: "Kontak" },
];

interface SiteHeaderProps {
  categories: string[];
}

export function SiteHeader({ categories = [] }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/95 backdrop-blur">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-3">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Logo Satin Store"
            width={40}
            height={40}
            className="h-20 w-20 rounded-full border border-foreground/10 object-contain p-0.5"
          />
          <div className="leading-none">
            <p className="text-base font-black tracking-tight">
              TEPUS <span className="text-muted-foreground">KAKI</span>
            </p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
              Merchandise Tepus Kaki
            </p>
          </div>
        </Link>
        <div />
        <button
          type="button"
          aria-label="Buka menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-foreground/10 bg-background px-5 py-4">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Kategori
          </p>
          <ul className="mb-4 grid grid-cols-2 gap-2">
            {categories.map((c) => (
              <li key={c}>
                <Link
                  href={`/kategori/${slugify(c)}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg border border-foreground/10 px-3 py-2 text-sm font-semibold hover:bg-secondary hover:text-secondary-foreground"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Halaman
          </p>
          <ul className="grid grid-cols-2 gap-2">
            {staticLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg border border-foreground/10 px-3 py-2 text-sm font-semibold hover:bg-primary hover:text-primary-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
