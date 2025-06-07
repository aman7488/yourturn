import { v2 as cloudinary } from "cloudinary";
import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import connectDB from "@/config/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {

        const { userId } = getAuth(req);

        const isSeller = await authSeller(userId);

        if (!isSeller) {
            return NextResponse.json({ success: false, message: "You are not authorized as a seller" }, { status: 403 });
        }

        const formData = await req.formData();
        const name = formData.get("name");
        const description = formData.get("description");
        const brand = formData.get("brand");
        const color = formData.get("color");
        const price = formData.get("price");
        const category = formData.get("category");
        const offerPrice = formData.get("offerPrice");
        const itemType = formData.get("itemType");
        const size = formData.getAll("size");
        const files = formData.getAll("images");
        const variants = formData.getAll("variants");
        if (!files || files.length === 0) {
            return NextResponse.json({ success: false, message: "No files uploaded" }, { status: 400 });
        }

        const result = await Promise.all(
            files.map( async (file) => {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { resource_type: "auto" },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                    stream.end(buffer);
                });
            })
        );

        const images = result.map((result) => result.secure_url);         

        await connectDB();
        const newProduct = await Product.create({
            userId,
            name,
            description,
            brand,
            color,
            variants: variants.filter(v => v.trim() !== ''),
            price: Number(price),
            category,
            offerPrice: Number(offerPrice),
            itemType,
            image: images,
            date: Date.now(),
            size,
        })

        return NextResponse.json({ success: true, message: "Product added successfully", newProduct }, { status: 201 });

    } catch (error) {
        console.error("POST /api/product/add failed:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
