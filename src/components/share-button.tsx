"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareButton({ name, description }: { name: string; description: string }) {
  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: name, text: description, url });
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert("Link produk disalin!");
      }
    } catch {
      /* dibatalkan */
    }
  };

  return (
    <Button
      type="button"
      size="lg"
      variant="outline"
      onClick={share}
      className="rounded-full border-foreground/20 font-bold"
      aria-label="Bagikan produk"
    >
      <Share2 className="h-4 w-4" />
    </Button>
  );
}
