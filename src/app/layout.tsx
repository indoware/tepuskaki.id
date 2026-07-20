import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getCategories } from "@/lib/products-data";
import "../styles.css";

export const metadata: Metadata = {
  title: "Satin Store — Merchandise Resmi Tepus Kaki",
  description:
    "Satin Store adalah merchandise resmi Tepus Kaki. Kaos, hoodie, topi, dan tote bag edisi eksklusif komunitas — order cepat via WhatsApp.",
  authors: [{ name: "Satin Store" }],
  openGraph: {
    siteName: "Satin Store",
    type: "website",
    title: "Satin Store — Merchandise Resmi Tepus Kaki",
    description:
      "Merchandise resmi Tepus Kaki — kaos, hoodie, topi, dan tote bag edisi eksklusif. Order via WhatsApp.",
    images: [
      {
        url: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/79db934a-8aed-44b9-b238-becf301f6788/id-preview-690018d7--679efa7d-28b0-42c9-9593-da652076ebf1.lovable.app-1784353538513.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Satin Store — Merchandise Resmi Tepus Kaki",
    description:
      "Merchandise resmi Tepus Kaki — kaos, hoodie, topi, dan tote bag edisi eksklusif. Order via WhatsApp.",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/79db934a-8aed-44b9-b238-becf301f6788/id-preview-690018d7--679efa7d-28b0-42c9-9593-da652076ebf1.lovable.app-1784353538513.png",
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
};

export const viewport = {
  themeColor: "#facc15",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = getCategories();
  return (
    <html lang="id">
      <body>
        <div className="min-h-screen bg-background">
          <div className="mx-auto flex min-h-screen w-full max-w-[700px] flex-col bg-background shadow-2xl">
            <SiteHeader categories={categories} />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
