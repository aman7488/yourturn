import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Order from "@/models/Order";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(req, context) {
    try {
      const { userId } = getAuth(req);
      const isSeller = await authSeller(userId);
      if (!isSeller) {
        return NextResponse.json({ success: false, message: "Not authorized" }, { status: 403 });
      }
  
      const { id } = context.params;
      const { paymentStatus } = await req.json();
  
      await connectDB();
  
      const order = await Order.findById(id);
      if (!order) {
        return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
      }
  
      // Insert field if not present
      order.paymentStatus = paymentStatus || "Not Paid";
      await order.save();
  
      return NextResponse.json({ success: true, message: "Payment status updated" });
    } catch (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }
  