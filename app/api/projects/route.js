import { connectMongoDB } from "@/lib/mongodb";
import Project from "@/models/project";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(req) {
  try {
    const { query, currentPage } = await req.json();
    const per_page = 10;
    const regex = new RegExp("^" + query, "i");
    await connectMongoDB();
    const start = (currentPage - 1) * per_page;
    const end = start + per_page;

    const projects = await Project.find({
      client: { $regex: regex },
    }).select(
      "client title confirmit programmer1 received delivery manager status methodology"
    );
    var filterProjects = projects.reverse().slice(start, end);
    var totalPages = Math.ceil(projects.length / per_page);
    return NextResponse.json({ filterProjects, totalPages });
  } catch (error) {
    console.log(error);
  }
}
