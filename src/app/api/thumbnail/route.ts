import { NextRequest, NextResponse } from "next/server";
import { productBySlug } from "@/lib/products-data";

// For now, we'll return a simple redirect to the product image
// In a real implementation, you would use a library like canvas or sharp
// to generate the composite image
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");

  if (!slug) {
    return new NextResponse("Missing slug parameter", { status: 400 });
  }

  const product = productBySlug(slug);

  if (!product) {
    return new NextResponse("Product not found", { status: 404 });
  }

  // Return redirect to product image for now
  // Later we can implement actual composite image generation
  return NextResponse.redirect(new URL(product.image, request.url));
}
