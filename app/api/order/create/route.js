import { inngest } from "@/config/inngest";
import Product from "@/models/Product";
import User from "@/models/User";
import Order from "@/models/Order";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { address, items } = await request.json();

    if (!address || items.length === 0) {
      return NextResponse.json({ success: false, message: "Address and items are required" }, { status: 400 });
    }

    let productTotal = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new Error(`Product not found: ${item.product}`);
      }
      productTotal += product.offerPrice * item.quantity;
    }
    const shippingFee = productTotal === 0 ? 0 : (productTotal <= 1000 ? 45 : 65);
    const tax = Math.floor(productTotal * 0.03);
    const totalAmount = productTotal + shippingFee + tax;

    await inngest.send({
      name: "order/created",
      data: {
        userId,
        address,
        items, // items now include size
        amount: totalAmount,
        date: Date.now(),
      }
    });

    // Clear user's cart
    const user = await User.findById(userId);
    user.cartItems = {};
    await user.save();

    return NextResponse.json({ success: true, message: "Order Placed" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
