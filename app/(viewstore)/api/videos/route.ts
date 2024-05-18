import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Video from "@/models/Video";

export async function GET(req: NextRequest):Promise<any>{
    await dbConnect();
    const videos = await Video.find().limit(20);

    return NextResponse.json({success: true, data: videos});
}