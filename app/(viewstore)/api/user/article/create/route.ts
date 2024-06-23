import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Article from "@/models/Article";
import User from "@/models/User";

export async function POST(req: NextRequest): Promise<any> {
  await dbConnect();

  try {
    // get user Id
    const _id = req.headers.get("_id");
    const user = await User.findById(_id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 },
      );
    }

    // Parse the request body
    const body = await req.json();
    // Validate the required fields
    if (!body.title || !body.content || !Array.isArray(body.content)) {
      return NextResponse.json(
        { success: false, message: "Title and content are required" },
        { status: 400 },
      );
    }

    // Create a new article
    const newArticle = new Article({
      title: body.title,
      content: body.content,
      author: _id,
      admins: [_id], // Set the author as the initial admin
    });

    // Save the article to the database
    await newArticle.save();

    return NextResponse.json(
      { success: true, data: newArticle },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { success: false, message: "Error creating article" },
      { status: 500 },
    );
  }
}
