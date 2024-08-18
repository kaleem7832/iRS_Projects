import { connectMongoDB } from "@/lib/mongodb";
import Client from "@/models/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { name } = await req.json();
    const user = await Client.findOne({ name }).select("_id");
    console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
