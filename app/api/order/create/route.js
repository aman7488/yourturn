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
  
    //   const amount = await items.reduce(async (accPromise, item) => {
    //     const acc = await accPromise;
    //     const product = await Product.findById(item.product);
    //     return acc + (product.offerPrice * item.quantity);
    //   }, Promise.resolve(0));

      const amount = await items.reduce(async (accPromise, item) => {
        const acc = await accPromise;
        const product = await Product.findById(item.product);
      
        if (!product) {
          throw new Error(`Product not found: ${item.product}`);
        }
      
        return acc + (product.offerPrice * item.quantity);
      }, Promise.resolve(0));
  
      await inngest.send({
        name: "order/created",
        data: {
          userId,
          address,
          items, // items now include size
          amount,
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
  