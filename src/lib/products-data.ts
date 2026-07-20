import fs from "fs";
import path from "path";
import { type Product, slugify } from "./products";

import tshirtImg from "@/assets/product-tshirt.jpg";
import capImg from "@/assets/product-cap.jpg";
import toteImg from "@/assets/product-tote.jpg";
import hoodieImg from "@/assets/product-hoodie.jpg";
import stickerImg from "@/assets/product-sticker.jpg";

const bundledImages: Record<string, any> = {
  "/uploads/product-tshirt.jpg": tshirtImg,
  "/uploads/product-cap.jpg": capImg,
  "/uploads/product-tote.jpg": toteImg,
  "/uploads/product-hoodie.jpg": hoodieImg,
  "/uploads/product-sticker.jpg": stickerImg,
};

const getImgSrc = (imgObj: any) => {
  if (!imgObj) return "";
  if (typeof imgObj === "string") return imgObj;
  return imgObj.src || "";
};

export const getProducts = (): Product[] => {
  const dirPath = path.join(process.cwd(), "content/products");
  if (!fs.existsSync(dirPath)) return [];
  const files = fs.readdirSync(dirPath);
  return files
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const slug = file.replace(/\.json$/, "");
      const fullPath = path.join(dirPath, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const data = JSON.parse(fileContents) as Omit<Product, "slug">;
      const image = bundledImages[data.image] ? getImgSrc(bundledImages[data.image]) : data.image;
      return { slug, ...data, image };
    })
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
};

export const getFeaturedProducts = () =>
  getProducts()
    .filter((p) => p.featured)
    .slice(0, 5);

export const getCategories = () => Array.from(new Set(getProducts().map((p) => p.category)));

export const getAllTags = () =>
  Array.from(new Set(getProducts().flatMap((p) => p.tags ?? []))).sort();

export const findCategoryBySlug = (slug: string) =>
  getCategories().find((c) => slugify(c) === slug);

export const productBySlug = (slug: string) => getProducts().find((p) => p.slug === slug);

export const productsByCategorySlug = (slug: string) =>
  getProducts().filter((p) => slugify(p.category) === slug);

export const productsByTag = (tag: string) =>
  getProducts().filter((p) => (p.tags ?? []).map(slugify).includes(slugify(tag)));
