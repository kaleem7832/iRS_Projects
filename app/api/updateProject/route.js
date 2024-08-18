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
      status,
    } = await req.json();
    await connectMongoDB();

    await Project.findOneAndUpdate(
      { confirmit: confirmit },
      {
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
        status,
      }
    );

    return NextResponse.json({ message: "Project updated." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while updating project." },
      { status: 500 }
    );
  }
}