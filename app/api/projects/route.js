import { connectMongoDB } from "@/lib/mongodb";
import Project from "@/models/project";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req) {
  try {
    await connectMongoDB();

    const projects = await Project.find().select(
      "client title confirmit programmer1 received delivery manager status methodology"
    );

    return NextResponse.json(projects);
  } catch (error) {
    console.log(error);
  }
}
