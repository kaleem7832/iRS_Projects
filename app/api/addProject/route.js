import { connectMongoDB } from "@/lib/mongodb";
import Project from "@/models/project";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      received,
      client,
      title,
      programmer1,
      programmer2,
      tester,
      scriptqc,
      manager,
      launch,
      delivery,
      size,
      confirmit,
      methodology,
      status,
    } = await req.json();
    await connectMongoDB();

    await Project.create({
      received,
      client,
      title,
      programmer1,
      programmer2,
      tester,
      scriptqc,
      manager,
      launch,
      delivery,
      size,
      confirmit,
      methodology,
      status,
    });

    return NextResponse.json({ message: "Project added." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while adding project." },
      { status: 500 }
    );
  }
}
