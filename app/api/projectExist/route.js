import { connectMongoDB } from "@/lib/mongodb";
import Project from "@/models/project";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { confirmit } = await req.json();
    const user = await Project.findOne({ confirmit }).select("_id");
    console.log("project: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
