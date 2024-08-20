import { connectMongoDB } from "@/lib/mongodb";
import Project from "@/models/project";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { confirmit } = await req.json();
    await connectMongoDB();

    await Project.findOneAndDelete({ confirmit: confirmit });

    return NextResponse.json({ message: "Project Deleted." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while deleting project." },
      { status: 500 }
    );
  }
}
