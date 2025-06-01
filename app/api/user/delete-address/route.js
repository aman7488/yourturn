import connectDB from "@/config/db";
import Address from "@/models/Address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    const { userId } = getAuth(request);
    const { searchParams } = new URL(request.url);
    const addressId = searchParams.get("id");

    if (!addressId) {
      return NextResponse.json({ success: false, message: "Address ID is required" }, { status: 400 });
    }

    await connectDB();

    // Find address by ID and userId to ensure ownership
    const deletedAddress = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!deletedAddress) {
      return NextResponse.json({ success: false, message: "Address not found or not authorized" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Address deleted successfully" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
