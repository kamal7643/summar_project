import dbConnect from "@/lib/dbConnect";
import Article from "@/models/Article";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<any> {
  await dbConnect();
  const articleId = new URL(request.url!).searchParams.get("article_id")!;
  const _id = request.headers.get("_id");
  try {
    const article = await Article.findById(articleId).populate(
      "author",
      "name",
    );
    if (!article) {
      return NextResponse.json(
        { success: false, message: "Article not found" },
        { status: 404 },
      );
    }
    if (
      article.author._id.equals(_id) || // Use equals method to compare ObjectIds
      article.modificationAccessUsers.includes(_id) // Use includes to check if _id is in the array
    ) {
      console.log(
        "User is the author or has modification access. View count not updated.",
      );
    } else {
      console.log(
        "User does not have modification access. Incrementing view count.",
      );
      article.views = (article.views || 0) + 1;
      await article.save();
      console.log("View count updated and article saved.");
    }

    return NextResponse.json({ success: true, article });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
