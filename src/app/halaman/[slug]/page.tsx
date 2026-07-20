import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageBySlug, getPages } from "@/lib/pages";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pages = getPages();
  return pages.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = pageBySlug(slug);
  if (!page) return {};
  return {
    title: `${page.title} — Satin Store`,
    description: page.description,
  };
}

export default async function StaticPage({ params }: PageProps) {
  const { slug } = await params;
  const page = pageBySlug(slug);
  if (!page) {
    notFound();
  }

  return (
    <article className="prose prose-sm max-w-none px-5 pb-10 pt-6 prose-headings:font-black prose-h1:text-3xl prose-h2:mt-6 prose-h2:text-xl prose-h3:text-lg prose-a:text-primary">
      <div dangerouslySetInnerHTML={{ __html: page.html }} />
    </article>
  );
}
