import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req, { params }) {
  await connectDB();
  const product = await Product.findById(params.id);
  if (!product) {
    return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, product });
}

export async function PUT(req, { params }) {
  try {
    const { userId } = getAuth(req);
    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json({ success: false, message: "Not authorized" }, { status: 403 });
    }

    const body = await req.json();
    const updates = {
      name: body.name,
      description: body.description,
      brand: body.brand,
      category: body.category,
      color: body.color,
      price: body.price,
      offerPrice: body.offerPrice,
      itemType: body.itemType,
      size: body.size,
      variants: body.variants || []
    };

    await connectDB();
    const updatedProduct = await Product.findByIdAndUpdate(params.id, updates, { new: true });

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (err) {
    console.error("PUT /api/product/:id failed", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
