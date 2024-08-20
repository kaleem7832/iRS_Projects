import { connectMongoDB } from "@/lib/mongodb";
import Client from "@/models/client";
import { NextResponse } from "next/server";
export const revalidate = 0;
export async function GET(req) {
  try {
    await connectMongoDB();

    const clients = await Client.find().select("name");

    return NextResponse.json(clients);
  } catch (error) {
    console.log(error);
  }
}
