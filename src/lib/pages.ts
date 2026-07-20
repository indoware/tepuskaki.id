import fs from "fs";
import path from "path";
import { marked } from "marked";

export type PageDoc = {
  slug: string;
  title: string;
  description: string;
  html: string;
  raw: string;
};

function parseFrontmatter(src: string): { data: Record<string, string>; body: string } {
  const match = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: src };
  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (m) data[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return { data, body: match[2] };
}

marked.setOptions({ gfm: true, breaks: false });

export const getPages = (): PageDoc[] => {
  const dirPath = path.join(process.cwd(), "content/pages");
  if (!fs.existsSync(dirPath)) return [];
  const files = fs.readdirSync(dirPath);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(dirPath, file);
      const src = fs.readFileSync(fullPath, "utf8");
      const { data, body } = parseFrontmatter(src);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        html: marked.parse(body) as string,
        raw: body,
      };
    });
};

export const pageBySlug = (slug: string) => getPages().find((p) => p.slug === slug);
