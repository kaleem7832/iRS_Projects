import { connectMongoDB } from "@/lib/mongodb";
import Project from "@/models/project";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(req) {
  try {
    const { query, currentPage } = await req.json();
    console.log({ query, currentPage });
    const regex = new RegExp("^" + query, "i");
    await connectMongoDB();

    const projects = await Project.find({
      client: { $regex: regex },
    }).select(
      "client title confirmit programmer1 received delivery manager status methodology"
    );

    return NextResponse.json(projects.reverse());
  } catch (error) {
    console.log(error);
  }
}
