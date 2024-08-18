import { connectMongoDB } from "@/lib/mongodb";
import Project from "@/models/project";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { confirmit } = await req.json();

    const project = await Project.findOne({ confirmit });

    return NextResponse.json(project);
  } catch (error) {
    console.log(error);
  }
}
