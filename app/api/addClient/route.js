import { connectMongoDB } from "@/lib/mongodb";
import Client from "@/models/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name } = await req.json();
    await connectMongoDB();
    await Client.create({
      name,
    });

    return NextResponse.json({ message: "Client added." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while adding Client." },
      { status: 500 }
    );
  }
}
