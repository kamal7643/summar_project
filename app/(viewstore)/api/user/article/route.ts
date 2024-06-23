import dbConnect from "@/lib/dbConnect";
import Article from "@/models/Article";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<any> {
  await dbConnect();
  // get user Id
  const _id = req.headers.get("_id");
  const user = await User.findById(_id);

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User ID is required" },
      { status: 400 },
    );
  }

  const results = await Article.find({ author: _id });

  return NextResponse.json({ success: true, data: results });
}
